import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ArrowBigDown, Moon } from "lucide-react";
import { Button } from "./ui/button";
import { useAppStore } from "../lib/zustand";
import { Sun } from "lucide-react";

export default function ThemesToggle() {
  const { themes } = useAppStore();

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "default"
  );
  function handleTheme(type, mode) {
    const html = document.documentElement;
    let isDark;
    if (html.dataset.theme.startsWith("dark-")) {
      isDark = true;
    } else {
      isDark = false;
    }

    if (mode === "theme") {
      if (isDark) {
        html.dataset.theme = `dark-${type}`;
        setTheme(`dark-${type}`);
      } else {
        html.dataset.theme = type;
        setTheme(type);
      }
    } else if (mode === "dark") {
      if (type.startsWith("dark-")) {
        html.dataset.theme = type.replace("dark-", "");
        setTheme(type.replace("dark-", ""));
      } else {
        html.dataset.theme = `dark-${type}`;
        setTheme(`dark-${type}`);
      }
    }
  }
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, []);

  return (
    <div className="flex gap-5 md:flex-col md:items-start  ">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">
            <span className={"md:hidden"}>Change theme</span>
            <ArrowBigDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 ml-[80px]">
          <DropdownMenuLabel>Themes</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="flex flex-col">
            {themes.map((el) => {
              return (
                <Button
                  key={el}
                  onClick={() => {
                    handleTheme(el, "theme");
                  }}
                  className={"justify-start"}
                  variant="ghost"
                >
                  {el}
                </Button>
              );
            })}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button
        size={"icon"}
        onClick={() => {
          handleTheme(theme, "dark");
        }}
      >
        {theme.startsWith("dark-") ? <Sun /> : <Moon />}
      </Button>
    </div>
  );
}
