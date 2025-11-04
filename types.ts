export type EnhancementLevel = 'Low' | 'Medium' | 'Ultra';
export type MimeType = 'image/jpeg' | 'image/png' | 'image/webp';

export interface EnhancementSettings {
  enhancementLevel: EnhancementLevel;
  colorize: boolean;
  noiseReduction: number;
  sciFiMode: boolean;
}

export interface OriginalImage {
  id: string;
  file: File;
  dataUrl: string;
}
