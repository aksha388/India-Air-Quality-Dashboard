import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Wind } from 'lucide-react';
import { AQIMap } from './components/AQIMap';
import { AQIChart } from './components/AQIChart';
import type { AirQualityData } from './types';

// Simulated data - in a real app, this would come from an API
const mockData: AirQualityData[] = [
  {
    city: "Delhi",
    aqi: 185,
    pm25: 85,
    pm10: 120,
    no2: 45,
    so2: 30,
    co: 2.5,
    timestamp: new Date().toISOString()
  },
  {
    city: "Mumbai",
    aqi: 125,
    pm25: 55,
    pm10: 90,
    no2: 35,
    so2: 25,
    co: 1.8,
    timestamp: new Date().toISOString()
  },
  {
    city: "Bangalore",
    aqi: 95,
    pm25: 45,
    pm10: 70,
    no2: 25,
    so2: 20,
    co: 1.5,
    timestamp: new Date().toISOString()
  },
  {
    city: "Chennai",
    aqi: 110,
    pm25: 50,
    pm10: 80,
    no2: 30,
    so2: 22,
    co: 1.7,
    timestamp: new Date().toISOString()
  },
  {
    city: "Kolkata",
    aqi: 155,
    pm25: 70,
    pm10: 100,
    no2: 40,
    so2: 28,
    co: 2.2,
    timestamp: new Date().toISOString()
  }
];

function App() {
  const [data, setData] = useState<AirQualityData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API call
    const fetchData = async () => {
      try {
        // In a real app, replace this with actual API call
        // const response = await axios.get('your-api-endpoint');
        // setData(response.data);
        setData(mockData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin">
          <Wind className="w-8 h-8 text-blue-500" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Wind className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-900">
              India Air Quality Dashboard
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: 'Cities Monitored', value: data.length },
              {
                label: 'Average AQI',
                value: Math.round(
                  data.reduce((acc, curr) => acc + curr.aqi, 0) / data.length
                ),
              },
              {
                label: 'Highest AQI',
                value: Math.max(...data.map((city) => city.aqi)),
              },
              {
                label: 'Lowest AQI',
                value: Math.min(...data.map((city) => city.aqi)),
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow p-6"
              >
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Map View */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Geographic Distribution</h2>
            <AQIMap data={data} />
          </div>

          {/* Chart View */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Air Quality Comparison</h2>
            <AQIChart data={data} />
          </div>

          {/* Detailed Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    City
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    AQI
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    PM2.5
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    PM10
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((city, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {city.city}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          city.aqi <= 50
                            ? 'bg-green-100 text-green-800'
                            : city.aqi <= 100
                            ? 'bg-yellow-100 text-yellow-800'
                            : city.aqi <= 150
                            ? 'bg-orange-100 text-orange-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {city.aqi}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {city.pm25}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {city.pm10}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(city.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;