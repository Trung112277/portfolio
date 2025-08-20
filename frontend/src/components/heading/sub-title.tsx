export default function SubTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-2xl md:text-4xl font-black italic text-foreground uppercase line-clamp-1">{children}</h3>;
}