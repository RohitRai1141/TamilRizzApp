import React from 'react';
import { SparklesIcon, LoaderIcon } from './Icons';

interface InputAreaProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const InputArea: React.FC<InputAreaProps> = ({ value, onChange, onSubmit, isLoading }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-700">
      <label htmlFor="prompt-input" className="block text-md font-medium text-gray-300 mb-2">
        What's the situation?
      </label>
      <div className="relative">
        <textarea
          id="prompt-input"
          rows={4}
          className="w-full bg-gray-900/70 border border-gray-600 rounded-lg p-3 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200 resize-none"
          placeholder="e.g., She texted 'Heyy'. What should I say back?"
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
      </div>
      <button
        onClick={onSubmit}
        disabled={isLoading || !value.trim()}
        className="mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
      >
        {isLoading ? (
          <>
            <LoaderIcon className="animate-spin h-5 w-5" />
            Generating...
          </>
        ) : (
          <>
            <SparklesIcon className="h-5 w-5" />
            Generate Rizz
          </>
        )}
      </button>
    </div>
  );
};

export default InputArea;
