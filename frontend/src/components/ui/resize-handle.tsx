"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Fugaz_One } from "next/font/google";
import { FlipWords } from "./flip-words";
import { DEVELOPER_ROLES } from "@/constant/developer-roles";

const fugazOne = Fugaz_One({
  weight: "400",
  subsets: ["latin"],
});

interface SelectionHandleProps {
  position: string;
}

const SelectionHandle = memo(({ position }: SelectionHandleProps) => {
  return <div className={`absolute w-3 h-3 ${position}`} />;
});

SelectionHandle.displayName = "SelectionHandle";

const ResizeHandle = memo(() => {
  return (
    <div className={`flex flex-col items-center justify-center font-sans text-center overflow-hidden italic ${fugazOne.className}`}>
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="relative inline-block my-2"
      >
        <div className="font-phudu text-3xl  md:text-5xl lg:text-7xl font-bold tracking-tight text-white dark:text-gray-200 py-1 px-4 flex items-center justify-center uppercase relative">
          <FlipWords words={DEVELOPER_ROLES} duration={3000} />
          <span className="ml-2">DEVELOPER</span>
        </div>

        {/* Corner handles */}
        <SelectionHandle position="-top-2 -left-2" />
        <SelectionHandle position="-top-2 -right-2" />
        <SelectionHandle position="-bottom-2 -left-2" />
        <SelectionHandle position="-bottom-2 -right-2" />
      </motion.div>
    </div>
  );
});

ResizeHandle.displayName = "ResizeHandle";

export default ResizeHandle;
