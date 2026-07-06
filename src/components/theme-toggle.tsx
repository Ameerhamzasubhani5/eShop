"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  // resolvedTheme, not theme: with defaultTheme="system" the raw theme is
  // "system" until the user picks one, which would make the first toggle a no-op.
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
    >
      {/* Sun Icon: Visible in light mode, shrinks/rotates away in dark mode */}
      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />

      {/* Moon Icon: Hidden in light mode, scales up/rotates in in dark mode */}
      <Moon className="absolute top-2 left-2 h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />

      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
