"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const [mounted, setMounted] = React.useState(false)
  const { theme, setTheme } = useTheme()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-[72px] h-9 bg-muted/30 rounded-full animate-pulse" />
  }

  return (
    <div className="flex items-center bg-muted/30 rounded-full border shadow-sm p-0.5">
      <Button 
        type="button"
        variant="ghost" 
        size="icon" 
        className={`rounded-full h-8 w-8 transition-colors ${theme === 'light' ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground' : 'hover:bg-muted/50'}`}
        onClick={(e) => {
          e.preventDefault();
          setTheme("light");
        }}
      >
        <Sun className="h-4 w-4" />
        <span className="sr-only">Light Theme</span>
      </Button>
      <Button 
        type="button"
        variant="ghost" 
        size="icon" 
        className={`rounded-full h-8 w-8 transition-colors ${theme === 'dark' ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground' : 'hover:bg-muted/50'}`}
        onClick={(e) => {
          e.preventDefault();
          setTheme("dark");
        }}
      >
        <Moon className="h-4 w-4" />
        <span className="sr-only">Dark Theme</span>
      </Button>
    </div>
  )
}
