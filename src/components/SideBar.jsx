import React from "react";
import Logo from "../assets/logo.svg";
import ThemesToggle from "./ThemesToggle";
import { useAppStore } from "../lib/zustand";
import Form from "./Form";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../app/features/userSlice";
import { useNavigate } from "react-router-dom";

export default function SideBar() {
  const { sheetOpen, setSheetOpen, editedData } = useAppStore();

  // inside component:
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <>
      <div
        className="bg-[#373B53] 
      flex items-center justify-between md:flex-col md:h-full md:fixed md:left-0 md:top-0 md:bottom-0 md:z-[999] "
      >
        <img width={75} src={Logo} />
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          <LogOut />
        </button>
        <div className="mr-5 md:mr-0 md:mb-5">
          <ThemesToggle />
        </div>
      </div>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent
          className="ml-[72px] min-w-[calc(80%-72px)] min-h-[calc(100%-56px)] overflow-y-scroll"
          side="left"
        >
          <SheetHeader className="sticky top-0 w-full bg-white border-b">
            <SheetTitle>Are you absolutely sure?</SheetTitle>
          </SheetHeader>
          <Form setSheetOpen={setSheetOpen} info={editedData} />
        </SheetContent>
      </Sheet>
    </>
  );
}
