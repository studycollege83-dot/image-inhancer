import React from 'react';
import { DownloadIcon, ShareIcon } from './Icons';

interface DownloadShareProps {
    enhancedImage: string;
}

export const DownloadShare: React.FC<DownloadShareProps> = ({ enhancedImage }) => {

    const handleDownload = (format: 'png' | 'jpeg') => {
        const link = document.createElement('a');
        link.href = enhancedImage;
        link.download = `neorevived-image.${format}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleShare = async () => {
        if (!navigator.share) {
            alert("Web Share API is not available on your browser.");
            return;
        }

        try {
            const response = await fetch(enhancedImage);
            const blob = await response.blob();
            const file = new File([blob], 'neorevived-image.png', { type: blob.type });

            await navigator.share({
                title: 'Image Enhanced by NeoRevive',
                text: 'Check out this photo I enhanced with NeoRevive!',
                files: [file],
            });
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };


    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-4 mt-4">
             <button
                onClick={() => handleDownload('png')}
                className="flex-1 w-full sm:w-auto flex items-center justify-center gap-2 bg-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:bg-purple-700 glow-purple disabled:bg-gray-600 disabled:opacity-50"
            >
                <DownloadIcon className="w-5 h-5" />
                Download PNG
            </button>
             <button
                onClick={() => handleDownload('jpeg')}
                className="flex-1 w-full sm:w-auto flex items-center justify-center gap-2 bg-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:bg-purple-700 glow-purple disabled:bg-gray-600 disabled:opacity-50"
            >
                <DownloadIcon className="w-5 h-5" />
                Download JPG
            </button>
            {navigator.share && (
                <button
                    onClick={handleShare}
                    className="flex-1 w-full sm:w-auto flex items-center justify-center gap-2 bg-orange-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:bg-orange-600 glow-orange disabled:bg-gray-600 disabled:opacity-50"
                >
                    <ShareIcon className="w-5 h-5" />
                    Share
                </button>
            )}
        </div>
    );
};
