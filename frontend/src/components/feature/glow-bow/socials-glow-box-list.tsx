"use client";

import Link from "next/link";
import { SafeImage } from "@/components/ui/safe-image";
import { GlowBoxItem } from "@/components/feature/glow-bow/glow-box-item";
import { useSocialMedia } from "@/hooks/useSocialMedia";
import { LoadingSpinner } from "@/components/feature/loading/loading-spinner";

export function SocialsGlowBoxList() {
  const { socialMedia, loading, error } = useSocialMedia();

  if (loading) {
    return (
      <div className="flex flex-col gap-3 text-foreground justify-center items-center">
        <h3 className="text-2xl font-bold text-primary uppercase">Socials</h3>
        <div className="flex items-center justify-center gap-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          <div className="text-center p-4">Loading social media...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-3 text-foreground justify-center items-center">
        <h3 className="text-2xl font-bold text-primary uppercase">Socials</h3>
        <div className="text-red-500 text-center">
          <p>Error loading social media</p>
          <p className="text-sm text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  if (socialMedia.length === 0) {
    return (
      <div className="flex flex-col gap-3 text-foreground justify-center items-center">
        <h3 className="text-2xl font-bold text-primary uppercase">Socials</h3>
        <p className="text-gray-500">No social media links available</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 text-foreground justify-center items-center">
      <h3 className="text-2xl font-bold text-primary uppercase">Socials</h3>
      <nav>
        <ul className="flex gap-4 flex-wrap justify-center">
          {socialMedia.map((item) => (
            <GlowBoxItem
              key={item.id}
              color={item.color}
              content={item.description}
            >
              <Link href={item.link} target="_blank" rel="noopener noreferrer">
                <SafeImage
                  src={item.image_url}
                  alt={item.description}
                  width={50}
                  height={50}
                  loading="lazy"
                  sizes="50px"
                  fallbackSrc="/file.svg"
                  className="h-[50px] w-[50px] object-cover rounded-md"
                />
              </Link>
            </GlowBoxItem>
          ))}
        </ul>
      </nav>
    </div>
  );
}
