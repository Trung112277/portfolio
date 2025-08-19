import { AuroraText } from "../ui/aura-text";
import { BouncyText } from "../ui/bouncy-text";
import ResizeHandle from "../ui/resize-handle";

export function MainHeader() {
  return (
    <h1 className="text-4xl font-bold text-center inline-block italic">
      <BouncyText text="Hello, I'm" />
      <AuroraText
        speed={1}
        colors={["#38BDF8", "#3B82F6", "#EC4899"]}
        className="text-9xl font-black uppercase my-5"
      >
        Nhat Trung
      </AuroraText>
      <ResizeHandle />
    </h1>
  );
}
