"use client";

import { useAuthorName } from "@/hooks/useAuthorName";

export default function Intro() {
  const { authorName } = useAuthorName();

  return (
    <div className="text-center text-xl py-5 md:py-10 px-5 md:px-15 bg-primary/10 rounded-lg flex flex-col gap-3">
      <p>👋 Hey, I&apos;m {authorName}, a Frontend Developer.</p>
      <p>
        I&apos;ve been working with <strong>React</strong> and <strong>Node</strong> for the past one year,
        building web applications that are fast, scalable and user-friendly.
      </p>
      <p>
        I like solving problems, learning new things, and experimenting with
        different technologies. When I&apos;m not coding, I&apos;m probably
        working on a side project or exploring something new.
      </p>
    </div>
  );
}
