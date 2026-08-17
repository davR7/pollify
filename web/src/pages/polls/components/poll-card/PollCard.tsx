import { Button } from "@/components/ui/Button";
import { LinkButton } from "@/components/ui/LinkButton";
import { formatToDisplayDateTime } from "@/libs/format-date";
import type { PollCardProps } from "./poll-card.props";

export function PollCard({ poll, showAuthor = true, onEdit }: PollCardProps) {
  return (
    <div key={poll.id}>
      <article className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md mt-6 cursor-pointer">
        <h2 className="text-base sm:text-lg font-semibold leading-snug text-gray-900">
          {poll?.title}
        </h2>
        {poll?.status !== "DRAFT" && (
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <img src="/calendar-icon.png" alt="calendar icon" className="h-6" />
              <span>
                <strong className="font-medium text-gray-700">Início:</strong>{" "}
                {formatToDisplayDateTime(poll?.startsAt)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <img src="/calendar-icon.png" alt="calendar icon" className="h-6" />
              <span>
                <strong className="font-medium text-gray-700">Término:</strong>{" "}
                {formatToDisplayDateTime(poll?.endsAt)}
              </span>
            </div>
          </div>
        )}
        <footer className="flex justify-between items-center gap-2 mt-4 border-t border-slate-200 pt-4">
          {showAuthor && (
            <div className="">
              <p className="text-sm sm:text-base text-gray-700">Autor:</p>
              <p className="text-base font-medium">{poll?.user?.fullname}</p>
            </div>
          )}

          {poll?.status === "DRAFT" && onEdit && (
            <Button type="button" onClick={() => onEdit()}>
              Publicar
            </Button>
          )}
          {poll.status !== "DRAFT" && (
            <LinkButton to={`/polls/${poll.id}/votes`}>Detalhes</LinkButton>
          )}
        </footer>
      </article>
    </div>
  );
}
