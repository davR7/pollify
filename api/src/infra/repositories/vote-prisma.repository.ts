import { Vote } from "@/entities/vote/vote.entity";
import { VoteMapper } from "@/mappers/vote.mapper";
import { VoteRepository } from "@/repositories/vote.repository";
import { prisma } from "../database/prisma";

class VotePrismaRepository implements VoteRepository {
  async create(input: Vote): Promise<Vote> {
    const newVote = await prisma.vote.create({
      data: {
        id: input.id,
        optionId: input.optionId,
        pollId: input.pollId,
        userId: input.userId,
        createdAt: input.createdAt,
      },
    });
    const test = VoteMapper.toDomain(newVote);
    console.log(test);
    return test;
  }

  async findById(id: string): Promise<Vote | null> {
    const vote = await prisma.vote.findUnique({ where: { id } });
    if (!vote) return null;
    return VoteMapper.toDomain(vote);
  }

  async findByPollAndUser(pollId: string, userId: string): Promise<Vote | null> {
    const vote = await prisma.vote.findFirst({ where: { pollId, userId } });
    if (!vote) return null;
    return VoteMapper.toDomain(vote);
  }
}

export { VotePrismaRepository };
