// src/pages/NotFound.tsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <Link to="/" className="text-blue-500 mt-4">Go Back Home</Link>
    </div>
  );
}
