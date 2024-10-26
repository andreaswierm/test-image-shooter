import { FC } from "react";

type ImageViewerModalProps = {
  src: string;
  onClose: () => void;
};

export const ImageViewerModal: FC<ImageViewerModalProps> = ({
  onClose,
  src,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative w-full h-full">
        <img
          src={src}
          alt="Full screen image"
          className="w-full h-full object-contain"
        />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white bg-opacity-50 rounded-full hover:bg-opacity-75 transition-opacity"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
