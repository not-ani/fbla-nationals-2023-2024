"use client";

import { toast } from "sonner";

import { UploadDropzone } from "@/lib/uploadthing";
import { type ourFileRouter } from "@/app/api/uploadthing/core";
import React from "react";

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
};

export const FileUpload = ({
  onChange,
  endpoint
}: FileUploadProps) => {
  return (
    <div className="relative h-[10px]">
      <UploadDropzone
        className="w-max-[600px] h-[50px]"
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          // @ts-expect-error
          onChange(res![0].url);
        }}
        onUploadError={(error: Error) => {
          toast.error(`${error?.message}`);
        }}
      />
    </div>
  )
}
