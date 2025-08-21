import { Fugaz_One } from "next/font/google";
import { AuroraText } from "../ui/aura-text";
import { BouncyText } from "../ui/bouncy-text";
import ResizeHandle from "../ui/resize-handle";
import { THEME_COLORS } from "@/constant/theme-colors";

const fugazOne = Fugaz_One({
  weight: "400",
  subsets: ["latin"],
});

export function MainHeader() {
  return (
    <h1 className={` font-bold text-center inline-block italic ${fugazOne.className}`}>
      <BouncyText 
        text="Hello, I'm"
        className="text-3xl md:text-5xl font-bold text-center"
      />
      <AuroraText
        speed={1}
        colors={THEME_COLORS.gradients.mainHeader}
        className="text-5xl md:text-8xl lg:text-9xl font-black uppercase my-5"
      >
        Nhat Trung
      </AuroraText>
      <ResizeHandle />
    </h1>
  );
}
