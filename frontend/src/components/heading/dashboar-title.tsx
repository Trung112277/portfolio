export function DashboardTitle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-4 text-primary">
        {title}
      </h2>
      <p className="text-foreground">
        {description}
      </p>
    </div>
  );
}
