"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
        <Sun className="w-5 h-5" />
      </button>
    )
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-10 h-10 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors flex items-center justify-center"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-secondary-foreground" />
      ) : (
        <Moon className="w-5 h-5 text-secondary-foreground" />
      )}
    </button>
  )
}
