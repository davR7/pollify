interface SectionHeaderProps {
  title: string;
  description?: string;
}

export function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <header className="flex flex-col items-center mb-6">
      <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
      {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
    </header>
  );
}
