import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { buttonVariants } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import {
  ArrowBigDown,
  LucideArrowDown,
  LucideArrowUp,
  PlusCircleIcon,
} from "lucide-react";
import { useAppStore } from "../lib/zustand";
import { queryGenerator } from "../lib/utils";
//

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { setSheetOpen } = useAppStore();
  const { setFilter } = useAppStore();
  const [items, setItems] = useState({
    draft: false,
    paid: false,
    pending: false,
  });

  function handleChange(key) {
    setItems((prev) => {
      return { ...prev, [key]: !prev[key] };
    });
  }

  useEffect(() => {
    const query = queryGenerator(items);
    setFilter(query);
  }, [JSON.stringify(items)]);

  return (
    <header>
      <div className="base-container flex items-center justify-between py-10">
        <div>
          <h1 className="font-bold text-[20px]">Invoices</h1>
          <p>There are 7 total invoices</p>
        </div>
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button className={"ml-auto mr-10"} variant="ghost">
              Filter by status
              {isOpen ? (
                <LucideArrowUp className="text-[#7C5DFA]" />
              ) : (
                <LucideArrowDown className="text-[#7C5DFA]" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Statuses</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="flex flex-col">
              {Object.entries(items).map(([key, value]) => {
                return (
                  <label
                    key={key}
                    className={`${buttonVariants({ variant: "ghost" })} 
            justify-start capitalize`}
                    htmlFor={key}
                  >
                    <Checkbox
                      className="bg-[#DFE3FA] data-[state=checked]:bg-[#7C5DFA] data-[state=checked]:border-[#7C5DFA]"
                      value={key}
                      checked={value}
                      onCheckedChange={() => handleChange(key)}
                      id={key}
                    />
                    {key}
                  </label>
                );
              })}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          className="bg-[#7C5DFA] w-[150px] h-12 rounded-3xl cursor-pointer hover:bg-[#9277FF] text-white"
          onClick={setSheetOpen}
        >
          <PlusCircleIcon className="w-2.5 h-2.5 stroke-[#7C5DFA] fill-white text-[10px] text-white" />
          New Invoice
        </Button>
      </div>
    </header>
  );
}
