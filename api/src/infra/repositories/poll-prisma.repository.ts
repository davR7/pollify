import {
  PersistedPoll,
  PersistedPollProps,
  PollOptionProps,
  PollProps,
} from "@/entities/poll/poll.props";
import { FindManyOptions, PollRepository } from "@/repositories/poll.repository";
import { prisma } from "../database/prisma";

class PollPrismaRepository implements PollRepository {
  async create(input: PollProps): Promise<PersistedPoll> {
    const newPoll = await prisma.poll.create({
      data: {
        ...input,
        options: {
          create: input.options.map((option: PollOptionProps) => ({
            text: option.text,
          })),
        },
      },
      include: {
        options: true,
      },
    });
    return newPoll;
  }
  async findAll(): Promise<PersistedPoll[]> {
    const polls = await prisma.poll.findMany({
      include: {
        user: {
          select: {
            id: true,
            fullname: true,
          },
        },
      },
    });
    return polls;
  }
  async findMany({ filter, includeUser }: FindManyOptions): Promise<PersistedPoll[]> {
    const polls = await prisma.poll.findMany({
      where: {
        id: filter?.id,
        userId: filter?.userId,
        status: Array.isArray(filter?.status) ? { in: filter?.status } : filter?.status,
      },
      include: includeUser
        ? {
            user: {
              select: {
                id: true,
                fullname: true,
              },
            },
          }
        : undefined,
    });
    return polls;
  }
  async findById(id: string): Promise<PersistedPollProps | null> {
    const poll = await prisma.poll.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        status: true,
        startsAt: true,
        endsAt: true,
        createdAt: true,
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
  async update(id: string, input: Partial<PollProps>): Promise<PersistedPoll> {
    const poll = await prisma.poll.update({
      where: { id },
      data: {
        status: input.status,
        startsAt: input.startsAt,
        endsAt: input.endsAt,
      },
    });
    return poll;
  }
  async deleteById(id: string): Promise<void> {
    await prisma.poll.delete({ where: { id } });
  }
}

export { PollPrismaRepository };
