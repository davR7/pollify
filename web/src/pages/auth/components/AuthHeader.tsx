export function AuthHeader({ description }: { description: string }) {
  return (
    <div className="flex flex-col items-center mb-7">
      <img src="/pollify-logo.png" className="h-22 w-24 md:h-32 md:w-34 mt-5 mb-4" alt="Pollify" />
      <p className="text-sm text-center leading-6 text-slate-400">{description}</p>
    </div>
  );
}
