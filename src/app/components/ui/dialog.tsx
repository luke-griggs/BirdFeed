"use client"

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/app/utils/cn";
import { HiX } from "react-icons/hi";

interface DialogProps {
  children: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(true);  // Dialog is open by default

  const closeDialog = () => setIsOpen(false);

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className="fixed inset-0 z-50 bg-black/80"
        />
        <DialogPrimitive.Content
          className="fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg rounded-lg"
        >
          {children}
          <DialogPrimitive.Close className="absolute right-4 top-4" onClick={closeDialog}> {/* pass this down to bird-card maybe */}
            <HiX className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default Dialog;