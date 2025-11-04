import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ControlPanel } from './components/ControlPanel';
import { LoadingIndicator } from './components/LoadingIndicator';
import { Rain } from './components/Rain';
import { EnhancementSettings, MimeType, OriginalImage } from './types';
import { enhanceImage } from './services/geminiService';
import { ImageGrid } from './components/ImageGrid';

const App: React.FC = () => {
  const [originalImages, setOriginalImages] = useState<OriginalImage[]>([]);
  const [enhancedImages, setEnhancedImages] = useState<Map<string, string>>(new Map());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [settings, setSettings] = useState<EnhancementSettings>({
    enhancementLevel: 'Medium',
    colorize: false,
    noiseReduction: 50,
    sciFiMode: false,
  });

  const handleImageUpload = (files: FileList) => {
    const fileArray = Array.from(files);
    const imagePromises = fileArray.map(file => {
      return new Promise<OriginalImage>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve({
            id: `${file.name}-${file.lastModified}`,
            file,
            dataUrl: reader.result as string,
          });
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises)
      .then(newImages => {
        setOriginalImages(newImages);
        setEnhancedImages(new Map());
        setError(null);
      })
      .catch(() => {
        setError("Failed to read one or more image files.");
      });
  };
  
  const handleEnhanceWithSettings = useCallback(async (currentSettings: EnhancementSettings) => {
    if (originalImages.length === 0) {
      setError("Please upload images first.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setEnhancedImages(new Map());

    try {
      const enhancementPromises = originalImages.map(async (image) => {
        const base64Data = image.dataUrl.split(',')[1];
        const resultBase64 = await enhanceImage(base64Data, image.file.type as MimeType, currentSettings);
        const enhancedUrl = `data:${image.file.type};base64,${resultBase64}`;
        return { id: image.id, url: enhancedUrl };
      });

      const results = await Promise.all(enhancementPromises);

      const newMap = new Map<string, string>();
      results.forEach(result => newMap.set(result.id, result.url));
      setEnhancedImages(newMap);

    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : "An unknown error occurred during batch processing.";
      setError(`Enhancement failed: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [originalImages]);
  
  const handleEnhance = () => {
    handleEnhanceWithSettings(settings);
  };

  const handleSmartAuto = () => {
    const autoSettings: EnhancementSettings = {
      enhancementLevel: 'Medium',
      colorize: true,
      noiseReduction: 60,
      sciFiMode: false,
    };
    setSettings(autoSettings);
    handleEnhanceWithSettings(autoSettings);
  };

  return (
    <div className="min-h-screen bg-[#0c0a1a] text-gray-200 overflow-hidden relative">
      <Rain />
      <div className="relative z-10 flex flex-col items-center p-4 md:p-8">
        <Header />
        <main className="w-full max-w-7xl mx-auto mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 xl:col-span-3">
             <ControlPanel 
              settings={settings} 
              setSettings={setSettings} 
              onEnhance={handleEnhance}
              onSmartAuto={handleSmartAuto}
              isDisabled={isLoading || originalImages.length === 0}
            />
          </div>
          <div className="lg:col-span-8 xl:col-span-9 flex flex-col items-center justify-center min-h-[400px] lg:min-h-0">
            {isLoading ? (
              <LoadingIndicator />
            ) : error ? (
              <div className="w-full h-full glass-ui rounded-lg flex flex-col items-center justify-center p-4 border border-red-500/50">
                <p className="text-red-400 text-center">{error}</p>
                <button 
                  onClick={() => { setError(null); setOriginalImages([]); }} 
                  className="mt-4 px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Clear and Start Over
                </button>
              </div>
            ) : originalImages.length > 0 ? (
                <ImageGrid originalImages={originalImages} enhancedImages={enhancedImages} />
            ) : (
              <ImageUploader onImageUpload={handleImageUpload} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
