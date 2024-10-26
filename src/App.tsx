import { useEffect, useRef, useState } from "react";
import { ImageViewerModal } from "./components/ImageViewerModal";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ImageCapture: any;
  }
}

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const imageCapture = useRef<typeof window.ImageCapture | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const startCamera = async () => {
    if (videoRef.current) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        videoRef.current.srcObject = stream;

        // Create ImageCapture object
        const track = stream.getVideoTracks()[0];
        imageCapture.current = new window.ImageCapture(track);
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    }
  };

  const capturePhoto = async () => {
    if (imageCapture.current) {
      try {
        const blob = await imageCapture.current.takePhoto();
        const photoUrl = URL.createObjectURL(blob);
        setPhotos((prevPhotos) => [...prevPhotos, photoUrl]);
      } catch (error) {
        console.error("Error capturing photo:", error);
      }
    }
  };

  useEffect(() => {
    startCamera();
  }, []);

  return (
    <>
      {selectedPhoto && (
        <ImageViewerModal
          src={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
        />
      )}

      <div className="flex flex-col h-screen w-screen">
        <div className="flex-shrink-0 p-2">header</div>

        <div className="flex-grow px-2">
          <video
            ref={videoRef}
            className="h-full w-full rounded-md bg-slate-100"
            autoPlay
          />
        </div>

        <div className="flex-shrink-0 flex">
          <div className="flex-grow p-2 flex flex-row gap-1 overflow-x-auto">
            {photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`photo ${index + 1}`}
                className="max-w-16 max-h-16 object-cover rounded border shadow"
                onClick={() => setSelectedPhoto(photo)}
              />
            ))}
          </div>

          <div className="flex-shrink-0 flex justify-center items-center p-2">
            <button
              onClick={capturePhoto}
              className="w-16 h-16 bg-red-500 border rounded-full"
            />
          </div>

          <div className="flex-grow"></div>
        </div>
      </div>
    </>
  );
}

export default App;
