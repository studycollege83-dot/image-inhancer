import React from 'react';
import { EnhancementSettings, EnhancementLevel } from '../types';
import { SparklesIcon, ZapIcon } from './Icons';

interface ControlPanelProps {
  settings: EnhancementSettings;
  setSettings: React.Dispatch<React.SetStateAction<EnhancementSettings>>;
  onEnhance: () => void;
  onSmartAuto: () => void;
  isDisabled: boolean;
}

const SettingsButton: React.FC<{
  onClick: () => void;
  isActive: boolean;
  children: React.ReactNode;
}> = ({ onClick, isActive, children }) => (
  <button
    onClick={onClick}
    className={`flex-1 px-3 py-2 text-sm rounded-md transition-all duration-300 font-semibold border ${
      isActive
        ? 'bg-purple-600 border-purple-400 text-white glow-purple'
        : 'bg-black/20 border-purple-800 hover:bg-purple-900/50 hover:border-purple-600'
    }`}
  >
    {children}
  </button>
);

const ToggleSwitch: React.FC<{
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}> = ({ label, checked, onChange }) => (
    <label className="flex items-center justify-between cursor-pointer">
      <span className="text-gray-300 font-medium">{label}</span>
      <div className="relative">
        <input type="checkbox" className="sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        <div className={`block w-12 h-6 rounded-full transition-colors ${checked ? 'bg-purple-600' : 'bg-gray-600'}`}></div>
        <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${checked ? 'transform translate-x-6' : ''}`}></div>
      </div>
    </label>
);


export const ControlPanel: React.FC<ControlPanelProps> = ({
  settings,
  setSettings,
  onEnhance,
  onSmartAuto,
  isDisabled,
}) => {
  const handleSettingChange = <K extends keyof EnhancementSettings>(key: K, value: EnhancementSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const enhancementLevels: EnhancementLevel[] = ['Low', 'Medium', 'Ultra'];

  return (
    <div className="glass-ui rounded-lg p-6 space-y-6">
      <h2 className="font-orbitron text-2xl font-bold text-glow-purple text-purple-300 text-center">
        ENHANCEMENT CONTROLS
      </h2>

      <div className="space-y-4">
        <p className="text-gray-300 font-semibold">Enhancement Level</p>
        <div className="flex space-x-2">
            {enhancementLevels.map((level) => (
                <SettingsButton
                    key={level}
                    onClick={() => handleSettingChange('enhancementLevel', level)}
                    isActive={settings.enhancementLevel === level}
                >
                    {level}
                </SettingsButton>
            ))}
        </div>
      </div>

      <div className="space-y-4">
        <ToggleSwitch
            label="Auto-Colorize B&W"
            checked={settings.colorize}
            onChange={(checked) => handleSettingChange('colorize', checked)}
        />
         <ToggleSwitch
            label="Sci-Fi Mode"
            checked={settings.sciFiMode}
            onChange={(checked) => handleSettingChange('sciFiMode', checked)}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="noise-reduction" className="block text-gray-300 font-semibold">
          Noise Reduction: {settings.noiseReduction}%
        </label>
        <input
          id="noise-reduction"
          type="range"
          min="0"
          max="100"
          value={settings.noiseReduction}
          onChange={(e) => handleSettingChange('noiseReduction', parseInt(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
        />
      </div>

      <div className="pt-4 space-y-3">
        <button
          onClick={onSmartAuto}
          disabled={isDisabled}
          className="w-full flex items-center justify-center gap-2 bg-orange-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 hover:bg-orange-600 glow-orange disabled:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
        >
          <ZapIcon className="w-5 h-5" />
          Smart Auto Mode
        </button>
        <button
          onClick={onEnhance}
          disabled={isDisabled}
          className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 hover:bg-purple-700 glow-purple disabled:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
        >
          <SparklesIcon className="w-5 h-5"/>
          Enhance Image
        </button>
      </div>
    </div>
  );
};
