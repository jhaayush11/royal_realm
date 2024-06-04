"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BookOpenCheck, ChevronsUpDown, Hotel, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export function NavMenu() {
  const route = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <ChevronsUpDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className='cursor-pointer flex gap-2 items-center' onClick={() => route.push("/hotel/new")}>
          <PlusIcon size={15} /> <span>Add Hotel</span>
        </DropdownMenuItem>
        <DropdownMenuItem className='cursor-pointer flex gap-2 items-center' onClick={() => route.push("/my-hotels")}>
          <Hotel size={15} /> <span>My Hotels</span>
        </DropdownMenuItem>
        <DropdownMenuItem className='cursor-pointer flex gap-2 items-center' onClick={() => route.push("/my-bookings")}>
          <BookOpenCheck size={15}/><span>My Bookings</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
