import React, { useState, useEffect } from 'react';
import { CopyIcon, CheckIcon } from './Icons';

interface ResponseDisplayProps {
  response: string;
  isLoading: boolean;
  error: string | null;
}

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ response, isLoading, error }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (response) {
      setCopied(false);
    }
  }, [response]);
  
  const handleCopy = () => {
    if (response) {
      navigator.clipboard.writeText(response);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const renderContent = () => {
    if (isLoading && !response) {
      return (
        <div className="space-y-3 animate-pulse">
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        </div>
      );
    }

    if (error) {
      return <p className="text-red-400">{error}</p>;
    }

    if (response) {
      return (
        <div className="relative group">
          <p className="text-lg text-gray-200 whitespace-pre-wrap pr-10">{response}</p>
          <button
            onClick={handleCopy}
            className="absolute top-0 right-0 p-2 text-gray-400 hover:text-white transition-opacity duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label="Copy to clipboard"
          >
            {copied ? <CheckIcon className="h-5 w-5 text-green-400" /> : <CopyIcon className="h-5 w-5" />}
          </button>
        </div>
      );
    }
    
    return (
        <p className="text-gray-500">Your perfect reply will appear here...</p>
    );
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-700 min-h-[120px] flex items-center justify-center transition-all duration-300">
      {renderContent()}
    </div>
  );
};

export default ResponseDisplay;