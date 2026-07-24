import { PersistedVoteProps, VoteProps } from "@/entities/vote/vote.props";
import { VoteRepository } from "@/repositories/vote.repository";
import { prisma } from "../database/prisma";

class VotePrismaRepository implements VoteRepository {
  async create(input: VoteProps): Promise<PersistedVoteProps> {
    const newVote = await prisma.vote.create({
      data: input,
    });
    return newVote;
  }

  async findById(id: string): Promise<PersistedVoteProps | null> {
    const vote = await prisma.vote.findUnique({ where: { id } });
    return vote;
  }

  async findByPollAndUser(pollId: string, userId: string): Promise<PersistedVoteProps | null> {
    const vote = await prisma.vote.findFirst({ where: { pollId, userId } });
    return vote;
  }
}

export { VotePrismaRepository };
