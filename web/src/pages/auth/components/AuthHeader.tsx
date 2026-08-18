export function AuthHeader({ description }: { description: string }) {
  return (
    <div className="flex flex-col items-center mb-7">
      <img src="/pollify-logo.png" className="h-52 w-56 mt-5" alt="Pollify" />
      <p className="mt-8 mb-2 text-sm text-center leading-6 text-slate-400">{description}</p>
    </div>
  );
}
