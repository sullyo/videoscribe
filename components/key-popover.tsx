"use client";

import { apiKeyAtom } from "@/atoms";
import { useAtom } from "jotai";
import { Settings2 } from "lucide-react";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function KeyPopover() {
  const [apiKey, setApiKey] = useAtom(apiKeyAtom);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="text-slate-700 dark:text-slate-400"
          size="sm"
          variant="outline"
        >
          Api Key
          {/* <Icons.settings className="h-5 w-5" /> */}
          <span className="sr-only">Open popover</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">OpenAI API Key</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Add your OpenAI API key to use the whisper API.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Key</Label>
              <Input
                id="width"
                // defaultValue={apiKey}
                value={apiKey}
                className="col-span-2 h-8"
                onChange={(e) => {
                  setApiKey(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
