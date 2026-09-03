export function normalizePollDates({ startsAt, endsAt }: { startsAt: string; endsAt: string }) {
  const now = new Date();

  const inputStartsAt = new Date(`${startsAt}T00:00`);
  inputStartsAt.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());

  const inputEndsAt = new Date(`${endsAt}T23:59`);

  return { inputStartsAt, inputEndsAt };
}
