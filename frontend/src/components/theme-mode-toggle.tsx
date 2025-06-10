"use client";
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  
  // Função para alternar o tema
  const toggleTheme = React.useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return (
    <div className="flex items-center w-full">
      {theme === "dark" ? (
        <Sun className="mr-2 h-4 w-4" />
      ) : (
        <Moon className="mr-2 h-4 w-4" />
      )}
      <span>{theme === "dark" ? "Tema Escuro" : "Tema Claro"}</span>
      <input 
        type="checkbox" 
        className="hidden"
        checked={theme === "dark"}
        onChange={toggleTheme}
        id="theme-toggle" 
      />
    </div>
  );
}