"use client";

export function SkipLink() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10000] bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg transition-all duration-200 focus:scale-105 hover:scale-105"
      onClick={handleClick}
    >
      Skip to content
    </a>
  );
}