export function Loading() {
  return (
    <div className="relative size-12">
      <div className="absolute inset-0 rounded-full border-8 border-gray-200" />
      <div className="absolute inset-0 animate-spin rounded-full border-8 border-primary-600 border-t-transparent" />
    </div>
  );
}
