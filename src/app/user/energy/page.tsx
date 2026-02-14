"use client";

export default function UserEnergyPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Energy Monitoring</h1>

      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="text-6xl mb-4">⚡</div>
        <h2 className="text-xl font-semibold mb-2">No Energy Data</h2>
        <p className="text-gray-600">
          Connect PZEM-004T devices to start monitoring energy consumption.
        </p>
      </div>
    </div>
  );
}
