import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { GoCircleSlash } from "react-icons/go";
import { LuCalendarDays, LuVote } from "react-icons/lu";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { SectionSpace } from "@/components/layout/section-space";
import { Container } from "@/components/ui/Container";
import { Loading } from "@/components/ui/Loading";
import { formatToDisplayDateTime } from "@/libs/format-date";
import { queryClient } from "@/libs/react-query";
import { getPollVoteDetails, votePoll } from "@/services/poll.service";

export function PollVotePage() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const { pollId } = useParams<{ pollId: string }>();

  const { data: poll, isPending } = useQuery({
    queryKey: ["poll", pollId],
    queryFn: () => getPollVoteDetails(pollId!),
    enabled: Boolean(pollId),
  });

  const { mutate } = useMutation({
    mutationFn: votePoll,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["poll"] });
      toast.success("Você votou na enquete com sucesso!");
    },
  });

  const hasVoted = Boolean(poll?.userVote?.optionId);

  function handleVote() {
    if (!pollId || !selectedOption) return;
    mutate({ pollId, optionId: selectedOption });
  }

  if (isPending) return <Loading />;

  return (
    <Container className="flex-1">
      <SectionSpace>
        <div className="mx-auto w-full max-w-xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <header className="bg-primary-600 px-6 py-6 sm:px-8 sm:py-10">
            <h1 className="font-medium leading-tight text-white text-xl sm:text-2xl">
              {poll?.title}
            </h1>
          </header>
          <div className="space-y-4 px-6 py-6 sm:px-8">
            {poll?.options.map((option) => {
              const isSelected = selectedOption === option.id;
              const isVoted = option.id === poll.userVote?.optionId;

              return (
                <button
                  key={option.id}
                  disabled={hasVoted && !isVoted}
                  type="button"
                  onClick={() => setSelectedOption(option.id)}
                  className={`
                cursor-pointer flex w-full items-center rounded-xl border-2 px-5 py-5
                text-left text-sm sm:text-base lg:text-lg transition
                ${
                  isSelected || isVoted
                    ? "border-primary-600 bg-primary-50 text-primary-700 hover:border-primary-300 hover:bg-primary-50/50"
                    : "border-slate-200 bg-slate-50 text-slate-800"
                }
              `}
                >
                  <span
                    className={`
                  mr-4 flex h-5 w-5 shrink-0 items-center justify-center
                  rounded-full border-2
                  ${isSelected || isVoted ? "border-primary-600" : "border-slate-400"}
                `}
                  >
                    {(isSelected || isVoted) && (
                      <span className="h-2.5 w-2.5 rounded-full bg-primary-600" />
                    )}
                  </span>
                  <div className="flex flex-row justify-between w-full">
                    <div>{option.text}</div>
                    <div>{option.votes}</div>
                  </div>
                </button>
              );
            })}
          </div>
          <footer className="border-t border-slate-100 px-6 py-6 sm:px-8">
            <div className="mb-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:justify-between w-full">
                <div className="flex">
                  <LuCalendarDays className="h-5 w-5 font-medium text-slate-500" />
                  <p className="pl-1 text-sm text-slate-500">
                    Término:{" "}
                    <strong className="font-medium text-slate-700">
                      {formatToDisplayDateTime(poll?.endsAt)}
                    </strong>
                  </p>
                </div>
                <div className="flex">
                  <LuVote className="h-5 w-5 font-medium text-slate-500" />
                  <p className="pl-1 text-sm text-slate-500">
                    Total de votos:{" "}
                    <strong className="font-medium text-slate-700">{poll?.totalVotes}</strong>
                  </p>
                </div>
              </div>
            </div>
            {poll?.status === "CLOSED" ? (
              <p className="flex items-center justify-center gap-2 py-3.5 text-sm font-medium text-red-500">
                <GoCircleSlash className="h-5 w-5" />
                Enquete encerrada
              </p>
            ) : hasVoted ? (
              <p className="flex items-center justify-center gap-2 py-3.5 text-sm font-medium text-green-600">
                <FaCheckCircle className="h-5 w-5" />
                Você já votou nesta enquete
              </p>
            ) : (
              <button
                type="button"
                onClick={handleVote}
                className="
      w-full rounded-lg bg-primary-600 px-6 py-3.5
      cursor-pointer text-sm font-semibold text-white
      shadow-sm transition
      hover:bg-primary-700
      focus:outline-none focus:ring-4 focus:ring-primary-200
    "
              >
                Votar
              </button>
            )}
          </footer>
        </div>
      </SectionSpace>
    </Container>
  );
}
