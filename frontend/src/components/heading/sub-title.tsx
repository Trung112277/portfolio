export default function SubTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-4xl font-black italic text-foreground uppercase">{children}</h3>;
}