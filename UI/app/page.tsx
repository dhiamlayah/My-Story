import Authenticate from "@/components/Authenticate";
import { ImageUploader } from "@/components/image-uploader";
import { Sidebar } from "@/components/sidebar";

export default function Home() {
  return (
    <div className="h-full flex relative">
      <div className="border-r bg-gray-50/40">
        <Sidebar />
      </div>
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="absolute top-0 right-0 p-4">
          <Authenticate />
        </div>
        <ImageUploader />
      </main>
    </div>
  );
}
