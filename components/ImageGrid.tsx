import React from 'react';
import { OriginalImage } from '../types';
import { ImageComparator } from './ImageComparator';
import { DownloadShare } from './DownloadShare';

interface ImageGridProps {
  originalImages: OriginalImage[];
  enhancedImages: Map<string, string>;
}

export const ImageGrid: React.FC<ImageGridProps> = ({ originalImages, enhancedImages }) => {
  return (
    <div className="w-full h-full overflow-y-auto max-h-[80vh] p-1">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {originalImages.map((image) => {
          const enhancedImage = enhancedImages.get(image.id);

          return (
            <div key={image.id} className="glass-ui rounded-lg p-4 flex flex-col gap-4">
              <h3 className="text-sm text-gray-400 truncate font-mono" title={image.file.name}>
                {image.file.name}
              </h3>
              {enhancedImage ? (
                <>
                  <ImageComparator original={image.dataUrl} enhanced={enhancedImage} />
                  <DownloadShare enhancedImage={enhancedImage} />
                </>
              ) : (
                <div className="w-full aspect-video flex items-center justify-center bg-black/20 rounded-lg overflow-hidden">
                    <img
                        src={image.dataUrl}
                        alt={image.file.name}
                        className="max-w-full max-h-full object-contain"
                    />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
