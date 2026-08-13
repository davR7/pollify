import { Link } from "react-router-dom";
import { formatToDisplayDateTime } from "@/libs/format-date";
import type { PollCardProps } from "./poll-card.props";

export function PollCard({ poll, showAuthor = true, onEdit }: PollCardProps) {
  return (
    <div key={poll.id}>
      <article className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md mt-6 cursor-pointer">
        <h2 className="text-lg font-semibold leading-snug text-gray-900">{poll?.title}</h2>
        {showAuthor && (
          <p className="text-base mt-4">
            <strong className="font-medium text-gray-700">Autor:</strong> {poll?.user?.fullname}
          </p>
        )}
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
        <div className="flex justify-end gap-2 mt-4">
          {poll?.status === "DRAFT" && onEdit && (
            <button
              type="button"
              onClick={() => onEdit()}
              className="
    inline-block h-12 rounded-lg bg-primary-600
    px-6 text-sm font-semibold leading-12 text-white
    shadow-sm transition
    hover:bg-primary-700
    focus:outline-none focus:ring-4 focus:ring-[#27aabd]/20
    active:scale-[0.99]
    cursor-pointer
  "
            >
              Publicar
            </button>
          )}
          {poll.status !== "DRAFT" && (
            <Link
              to={`/polls/${poll.id}`}
              className="
    inline-block h-12 rounded-lg bg-primary-600
    px-6 text-sm font-semibold leading-12 text-white
    shadow-sm transition
    hover:bg-primary-700
    focus:outline-none focus:ring-4 focus:ring-[#27aabd]/20
    active:scale-[0.99]
  "
            >
              Detalhes
            </Link>
          )}
        </div>
      </article>
    </div>
  );
}
