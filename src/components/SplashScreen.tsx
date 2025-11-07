import { useEffect, useState } from 'react';

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000); // Show splash screen for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-600">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-4">
          State Global Logistics
        </h1>
        <div className="animate-pulse">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
        <p className="text-white mt-4 text-lg">Connecting the world, one package at a time</p>
      </div>
    </div>
  );
}