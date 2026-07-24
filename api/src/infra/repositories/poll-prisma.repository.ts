import { PersistedPollProps, PollOptionProps, PollProps } from "@/entities/poll/poll.props";
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
  async getPollById(id: string): Promise<PersistedPollProps | null> {
    const poll = await prisma.poll.findUnique({
      where: { id },
      include: {
        options: true,
      },
    });
    return poll;
  }
}

export { PollPrismaRepository };
