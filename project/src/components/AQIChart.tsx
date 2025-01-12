import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { AirQualityData } from '../types';

interface Props {
  data: AirQualityData[];
}

export const AQIChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="city" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="aqi" fill="#8884d8" name="Air Quality Index" />
          <Bar dataKey="pm25" fill="#82ca9d" name="PM2.5" />
          <Bar dataKey="pm10" fill="#ffc658" name="PM10" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}