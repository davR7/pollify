export function FormError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-800 font-bold shadow-sm">
      {message}
    </div>
  );
}
