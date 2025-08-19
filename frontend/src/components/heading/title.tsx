export function Title({
  primary,
  secondary,
}: {
  primary: string;
  secondary: string;
}) {
  return (
    <h2 className="text-9xl font-black uppercase italic text-end w-fit">
      <span className="text-foreground block">{primary}</span>
      <span className="text-[170px] text-fill-transparent block -translate-y-1/2 text-fill-transparent">{secondary}</span>
    </h2>
  );
}
