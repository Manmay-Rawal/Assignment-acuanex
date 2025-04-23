import React, { useState } from "react";
import { useWidgetContext } from "../context/WidgetContext";
import { X } from "lucide-react";
import ChartRenderer from "./ChartRenderer";

export default function AddWidgetSidebar() {
  const { state, dispatch } = useWidgetContext();
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState(state[0]?.category || "");
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [chartType, setChartType] = useState("Bar");

  const [labels, setLabels] = useState("Jan,Feb,Mar");
  const [data, setData] = useState("12,19,3");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category || !name || !text || !chartType || !labels || !data) return;

    const labelArray = labels.split(",").map((label) => label.trim());
    const dataArray = data
      .split(",")
      .map((value) => parseInt(value.trim(), 10));

    const chartData = {
      labels: labelArray,
      datasets: [
        {
          label: text,
          data: dataArray,
          backgroundColor: ["#3b82f6", "#10b981", "#f59e0b"],
        },
      ],
    };

    const existingWidget = state
      .find((cat) => cat.category === category)
      ?.widgets.find((w) => w.name === name);

    if (existingWidget) {
      dispatch({
        type: "ADD_WIDGET_ENTRY",
        category,
        name,
        text,
        chartType,
        chartData,
      });
    } else {
      dispatch({
        type: "ADD_WIDGET",
        category,
        name,
        text,
        chartType,
        chartData,
      });
    }

    // Reset form
    setName("");
    setText("");
    setChartType("Bar");
    setLabels("Jan,Feb,Mar");
    setData("12,19,3");
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
      >
        + Add New Widget
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-opacity-30"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative w-80 h-full bg-white shadow-2xl border-l border-gray-200 p-6 overflow-y-auto">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            >
              <X />
            </button>

            <form onSubmit={handleSubmit} className="flex flex-col h-full mt-8">
              <h3 className="font-semibold text-xl text-gray-800 mb-4 text-center">
                Add New Widget
              </h3>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mb-4 p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-500"
              >
                {state.map((cat, i) => (
                  <option key={i} value={cat.category}>
                    {cat.category}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Widget Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mb-4 p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                placeholder="Entry Text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="mb-4 p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-500"
              />

              <select
                value={chartType}
                onChange={(e) => setChartType(e.target.value)}
                className="mb-6 p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-500"
              >
                <option value="Bar">Bar</option>
                <option value="Line">Line</option>
                <option value="Pie">Pie</option>
              </select>

              {/* Input fields for labels and data */}
              <input
                type="text"
                placeholder="Labels (comma-separated)"
                value={labels}
                onChange={(e) => setLabels(e.target.value)}
                className="mb-4 p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                placeholder="Data (comma-separated)"
                value={data}
                onChange={(e) => setData(e.target.value)}
                className="mb-4 p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-500"
              />

              {/* Chart Preview */}
              <div className="mb-6">
                <ChartRenderer
                  type={chartType}
                  data={{
                    labels: labels.split(",").map((label) => label.trim()),
                    datasets: [
                      {
                        label: text,
                        data: data
                          .split(",")
                          .map((value) => parseInt(value.trim(), 10)),
                        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b"],
                      },
                    ],
                  }}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 mt-auto"
              >
                + Add Widget Entry
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
