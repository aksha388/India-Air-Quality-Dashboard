import React from 'react';
import { MapPin } from 'lucide-react';
import type { AirQualityData } from '../types';

interface Props {
  data: AirQualityData[];
}

const getAQIColor = (aqi: number): string => {
  if (aqi <= 50) return 'bg-green-500';
  if (aqi <= 100) return 'bg-yellow-500';
  if (aqi <= 150) return 'bg-orange-500';
  if (aqi <= 200) return 'bg-red-500';
  if (aqi <= 300) return 'bg-purple-500';
  return 'bg-red-900';
};

export const AQIMap: React.FC<Props> = ({ data }) => {
  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1600&q=80"
        alt="India Map"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-20">
        {data.map((city, index) => (
          <div
            key={index}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            style={{
              // Approximate positions - in a real app, use actual coordinates
              left: `${30 + Math.random() * 40}%`,
              top: `${30 + Math.random() * 40}%`,
            }}
          >
            <MapPin className="w-6 h-6 text-white" />
            <div className={`${getAQIColor(city.aqi)} w-3 h-3 rounded-full absolute -right-1 -top-1`} />
            <div className="hidden group-hover:block absolute top-full left-1/2 transform -translate-x-1/2 bg-white p-2 rounded shadow-lg z-10 w-48">
              <p className="font-bold">{city.city}</p>
              <p>AQI: {city.aqi}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}