import { Link } from "react-router-dom";

interface PollCardProps {
  title: string;
  author?: string;
  startsAt: string;
  endAt: string;
  id: string;
}

export function PollCard({ id, title, author, startsAt, endAt }: PollCardProps) {
  return (
    <Link to={`/polls/${id}`}>
      <article className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md mt-6 cursor-pointer">
        <h2 className="text-lg font-semibold leading-snug text-gray-900">{title}</h2>
        {author && (
          <p className="text-base mt-4">
            <strong className="font-medium text-gray-700">Autor:</strong> {author}
          </p>
        )}
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <img src="/calendar-icon.png" alt="calendar icon" className="h-6" />
            <span>
              <strong className="font-medium text-gray-700">Início:</strong> {startsAt}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <img src="/calendar-icon.png" alt="calendar icon" className="h-6" />
            <span>
              <strong className="font-medium text-gray-700">Término:</strong> {endAt}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
