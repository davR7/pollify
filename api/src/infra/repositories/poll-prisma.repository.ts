import { Poll } from "@/entities/poll/poll.entity";
import { PollProps } from "@/entities/poll/poll.props";
import { PollMapper } from "@/mappers/poll.mapper";
import { FindManyOptions, PollRepository } from "@/repositories/poll.repository";
import { prisma } from "../database/prisma";
import { PollWithAuthor } from "./ports/poll-with-author";
import { PollWithVotes } from "./ports/poll-with-votes";
import { PollStatus } from "@/entities/poll/poll-status";

class PollPrismaRepository implements PollRepository {
  async create(input: Poll): Promise<Poll> {
    const newPoll = await prisma.poll.create({
      data: {
        id: input.id,
        title: input.title,
        status: input.status,
        startsAt: input.startsAt,
        endsAt: input.endsAt,
        userId: input.userId,
        createdAt: input.createdAt,
        options: {
          create: input.options.map((option) => ({
            id: option.id,
            text: option.text,
            createdAt: option.createdAt,
          })),
        },
      },
      include: {
        options: true,
      },
    });
    return PollMapper.toDomain(newPoll);
  }

  async findMany({ filter, includeUser }: FindManyOptions): Promise<PollWithAuthor[]> {
    const polls = await prisma.poll.findMany({
      select: {
        id: true,
        title: true,
        status: true,
        startsAt: true,
        endsAt: true,
        user: includeUser
          ? {
              select: {
                id: true,
                fullname: true,
              },
            }
          : undefined,
      },
      where: {
        id: filter?.id,
        userId: filter?.userId,
        status: Array.isArray(filter?.status) ? { in: filter?.status } : filter?.status,
      },
    });
    return polls;
  }

  async findById(id: string): Promise<PollWithVotes | null> {
    const poll = await prisma.poll.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        status: true,
        startsAt: true,
        endsAt: true,
        _count: {
          select: {
            votes: true,
          },
        },
        options: {
          select: {
            id: true,
            text: true,
            _count: {
              select: { votes: true },
            },
            createdAt: true,
          },
          orderBy: {
            text: "asc",
          },
        },
      },
    });

    if (!poll) return null;

    const { _count, ...pollData } = poll;

    return {
      ...pollData,
      totalVotes: poll._count.votes,
      options: pollData.options.map((option) => {
        const { _count, ...optionData } = option;
        return { ...optionData, votes: option._count.votes };
      }),
    };
  }

  async update(id: string, input: Partial<PollProps>): Promise<Poll> {
    const poll = await prisma.poll.update({
      where: { id },
      data: {
        status: input.status,
        startsAt: input.startsAt,
        endsAt: input.endsAt,
      },
      include: {
        options: true,
      },
    });
    return PollMapper.toDomain(poll);
  }

  async deleteById(id: string): Promise<void> {
    await prisma.poll.delete({ where: { id } });
  }

  async findExpiredByStatus(status: PollStatus): Promise<void> {
    await prisma.poll.updateMany({
      where: {
        status,
        endsAt: {
          lte: new Date(),
        },
      },
      data: {
        status: "CLOSED",
      },
    });
  }
}

export { PollPrismaRepository };
