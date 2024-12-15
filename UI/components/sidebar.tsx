"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { History, ImageIcon, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";

interface HistoryItem {
  id: string;
  image: string;
  caption: string;
  date: string;
}

export function Sidebar() {
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: "1",
      image: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba",
      caption: "A beautiful sunset over mountains",
      date: "2024-03-20",
    },
    {
      id: "2",
      image: "https://images.unsplash.com/photo-1682687220063-4742bd7fd538",
      caption: "A city skyline at night",
      date: "2024-03-19",
    },
  ]);

  return (
    <div className="pb-12 w-64">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2 flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight">My-Story</h2>
          <ThemeToggle />
        </div>
        <div className="px-3 py-2">
          <div className="space-y-1">
            <Button variant="secondary" className="w-full justify-start">
              <Plus className="mr-2 h-4 w-4" />
              New Caption
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            History
          </h2>
          <ScrollArea className="h-[calc(100vh-180px)]">
            <div className="space-y-1">
              {history.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  className="w-full justify-start font-normal"
                >
                  <ImageIcon className="mr-2 h-4 w-4" />
                  {item.caption.substring(0, 20)}...
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}