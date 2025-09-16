export function DashboardEditContainer({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className=" p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20 border rounded-lg ">
      <h3 className="text-xl font-semibold mb-4 text-primary">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
