"use client";

export default function UserHomesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Homes</h1>

      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="text-6xl mb-4">🏡</div>
        <h2 className="text-xl font-semibold mb-2">No Homes Yet</h2>
        <p className="text-gray-600 mb-6">
          Create your first home to organize your devices by location.
        </p>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Create Home
        </button>
      </div>
    </div>
  );
}
