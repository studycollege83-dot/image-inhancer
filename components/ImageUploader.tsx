import React, { useCallback, useState } from 'react';
import { UploadIcon } from './Icons';

interface ImageUploaderProps {
  onImageUpload: (files: FileList) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onImageUpload(e.target.files);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onImageUpload(e.dataTransfer.files);
    }
  }, [onImageUpload]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };


  return (
    <div 
        className={`w-full max-w-2xl h-96 glass-ui rounded-lg border-2 border-dashed flex flex-col items-center justify-center p-8 transition-all duration-300 ${isDragging ? 'border-orange-400 glow-orange' : 'border-purple-400/50'}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
    >
      <input
        type="file"
        id="image-upload"
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
        onChange={handleFileChange}
        multiple
      />
      <label htmlFor="image-upload" className="cursor-pointer text-center flex flex-col items-center">
        <UploadIcon className="w-16 h-16 mb-4 text-purple-300 transition-transform duration-300 group-hover:scale-110" />
        <p className="text-xl font-semibold text-gray-200">
          <span className="text-orange-400 font-bold">Upload image(s)</span> or drag and drop
        </p>
        <p className="text-gray-400 mt-2">PNG, JPG, WEBP</p>
      </label>
    </div>
  );
};
