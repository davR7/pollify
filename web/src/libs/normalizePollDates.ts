export function normalizePollDates({ startsAt, endsAt }: { startsAt: string; endsAt: string }) {
  const now = new Date();

  const inputStartsAt = new Date(startsAt);
  inputStartsAt.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());

  const inputEndsAt = new Date(endsAt);
  inputEndsAt.setHours(23, 59, 0, 0);

  return { inputStartsAt, inputEndsAt };
}
