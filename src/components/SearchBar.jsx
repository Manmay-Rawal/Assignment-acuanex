import React from "react";

export default function SearchBar({ setSearchTerm }) {
  return (
    <input
      type="text"
      placeholder="Search widgets..."
      onChange={(e) => setSearchTerm(e.target.value)}
      className="mb-6 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}
