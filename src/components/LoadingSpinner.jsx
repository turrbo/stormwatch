import { Loader2 } from 'lucide-react';

export default function LoadingSpinner({ message = 'Loading weather data...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-32 animate-fade-in">
      <Loader2 size={40} className="text-red-400 animate-spin mb-4" />
      <p className="text-neutral-400 text-sm">{message}</p>
    </div>
  );
}
