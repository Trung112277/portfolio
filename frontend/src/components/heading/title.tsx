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
      <span className="text-[170px] text-fill-transparent block -mt-20 text-fill-transparent">{secondary}</span>
    </h2>
  );
}
