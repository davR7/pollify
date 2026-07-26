import {
  PersistedPoll,
  PersistedPollProps,
  PollOptionProps,
  PollProps,
} from "@/entities/poll/poll.props";
import { PollRepository } from "@/repositories/poll.repository";
import { prisma } from "../database/prisma";

class PollPrismaRepository implements PollRepository {
  async create(input: PollProps): Promise<PersistedPollProps> {
    const newPoll = await prisma.poll.create({
      data: {
        ...input,
        options: {
          create: input.options.map((option: PollOptionProps) => ({ text: option.text })),
        },
      },
      include: {
        options: true,
      },
    });
    return newPoll;
  }
  async findAll(): Promise<PersistedPoll[]> {
    const polls = await prisma.poll.findMany();
    return polls;
  }
  async findById(id: string): Promise<PersistedPollProps | null> {
    const poll = await prisma.poll.findUnique({
      where: { id },
      include: {
        options: true,
      },
    });
    return poll;
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
