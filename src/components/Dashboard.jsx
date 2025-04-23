import React, { useState } from "react";
import { useWidgetContext } from "../context/WidgetContext";
import SearchBar from "./SearchBar";
import ChartRenderer from "./ChartRenderer";

export default function Dashboard() {
  const { state } = useWidgetContext();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 bg-gray-50 rounded-lg shadow-md">
      {/* Search Bar */}
      <SearchBar setSearchTerm={setSearchTerm} />

      <div className="space-y-8">
        {state.map((cat, i) => (
          <div key={i}>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              {cat.category}
            </h2>
            <div className="flex flex-wrap gap-4">
              {cat.widgets
                .filter(
                  (widget) =>
                    widget.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    widget.text.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((widget, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-4 rounded-xl shadow-md w-[48%] h-[250px] mb-4"
                  >
                    <h4 className="text-lg font-semibold text-gray-800">
                      {widget.name}
                    </h4>
                    <p className="text-gray-600 mb-3">{widget.text}</p>
                    <ChartRenderer
                      type={widget.chartType}
                      data={widget.chartData}
                    />
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
