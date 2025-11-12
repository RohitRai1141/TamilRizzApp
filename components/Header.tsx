import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
        RizzMate
      </h1>
      <p className="mt-2 text-lg text-gray-300">Your AI Wingman for the perfect reply.</p>
    </header>
  );
};

export default Header;
