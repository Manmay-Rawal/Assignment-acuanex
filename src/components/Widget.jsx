import React from "react";
import { useWidgetContext } from "../context/WidgetContext";
import { X } from "lucide-react";
import ChartRenderer from "./ChartRenderer";

export default function Widget({ widget, categoryName }) {
  const { dispatch } = useWidgetContext();

  const handleRemove = () => {
    dispatch({
      type: "REMOVE_WIDGET",
      category: categoryName,
      name: widget.name,
    });
  };

  return (
    <div className=" bg-white p-4 rounded-2xl shadow-md relative hover:shadow-lg transition-shadow duration-200">
      <button
        onClick={handleRemove}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
        title="Remove widget"
      >
        <X size={18} />
      </button>

      <h3 className="font-semibold text-lg text-gray-800 mb-1">
        {widget.name}
      </h3>
      <p className="text-gray-600 mb-4">{widget.text}</p>

      {widget.chartType && widget.chartData && (
        <ChartRenderer type={widget.chartType} data={widget.chartData} />
      )}
    </div>
  );
}
