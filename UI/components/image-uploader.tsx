"use client";



import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ImagePlus, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import axios from "axios";

export function ImageUploader() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [caption, setCaption] = useState<string | null>(null);
  const [path, setPath] = useState<string | null>(null);

  const [file, setFile] = useState<File | null>(null);



  //Detect the image and call the resizing service (response : url of the image)
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    setImage(URL.createObjectURL(selectedFile));
    setFile(selectedFile);

    // Trigger generation automatically
    console.log("File loaded!");

    setLoading(true);
    setCaption(null);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("id", "100"); // Replace with dynamic ID if needed

    try {
      const response = await axios.post(
        "http://localhost:8222/image-processing/upload-image/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const originalPath = response.data.filepath; // E.g., "C:\\Users\\pc\\Desktop\\MyGitProjects\\My-Story-Init_Microservices_arch\\Image-Processing-Service\\uploads\\12345\\1734118485496-OrangeLores.png";
      const processedPath = originalPath
        .replace(/\\/g, '/') // Replace backslashes with forward slashes
        .replace(/^.*\/Image-Processing-Service/, '../Image-Processing-Service') // Extract relative path
        .replace(/\/\d+\//, '/100/'); // Replace folder name with "100" if u need to make it dynamic

      console.log("Processed Path:", processedPath);
      setPath(processedPath);
    } catch (error) {
      console.error("Error generating caption:", error);
    } finally {
      setLoading(false);
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
    if (!file) return;
    setLoading(true);
    
    try {



      // Step 2: Use the processed path to call the predict endpoint
      const predictResponse = await axios.post(
        "http://localhost:5000/predict",
        {
          image_paths: [path],
          userId: 100,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const prediction = predictResponse.data.predictions[0]; // Assuming the response contains a 'caption' field
      setCaption(prediction);
      console.log(caption)

    } catch (error) {
      console.error("Error generating caption:", error);
    } finally {
      setLoading(false);
    }
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
          Generating caption...
        </div>
      )}

      {caption && (
        <div className="p-4 border border-gray-200 rounded-lg">
          <p className="text-lg font-semibold text-gray-800">Caption:</p>
          <p className="text-gray-600">{caption}</p>
        </div>
      )}
    </div>
  );
}
