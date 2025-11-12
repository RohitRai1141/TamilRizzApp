import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import InputArea from './components/InputArea';
import ResponseDisplay from './components/ResponseDisplay';
import { generateRizzReplyStream } from './services/geminiService';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async () => {
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setResponse('');

    try {
      const stream = generateRizzReplyStream(prompt);
      for await (const chunk of stream) {
        setResponse((prev) => prev + chunk);
      }
    } catch (err) {
      setError('Oops! Something went wrong. Maybe my rizz is off today. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [prompt, isLoading]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/40 to-gray-900 text-white flex flex-col items-center p-4 sm:p-6">
      <div className="w-full max-w-2xl mx-auto">
        <Header />
        <main className="mt-8 space-y-8">
          <InputArea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
          <ResponseDisplay
            response={response}
            isLoading={isLoading}
            error={error}
          />
        </main>
         <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} RizzMate. Crafted with ❤️ and a bit of AI charm.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;