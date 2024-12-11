"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ImagePlus, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function ImageUploader() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    maxFiles: 1,
  });

  const handleGenerate = async () => {
    if (!image) return;
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
  };

  return (
    <div className="space-y-4 w-full max-w-2xl mx-auto p-4">
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-gray-300 hover:border-primary"
        )}
      >
        <input {...getInputProps()} />
        {image ? (
          <div className="relative w-full aspect-video">
            <Image
              src={image}
              alt="Uploaded image"
              fill
              className="object-contain rounded-lg"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <ImagePlus className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-sm text-gray-600">
              Drag & drop an image here, or click to select
            </p>
          </div>
        )}
      </div>

      <Button
        className="w-full py-6 text-lg"
        size="lg"
        onClick={handleGenerate}
        disabled={!image || loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Generating caption...
          </>
        ) : (
          "Generate Caption"
        )}
      </Button>

      {loading && (
        <div className="text-center text-sm text-gray-500">
          Our AI is analyzing your image...
        </div>
      )}
    </div>
  );
}