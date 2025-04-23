import React from "react";
import Widget from "./Widget";

export default function Category({ category, searchTerm }) {
  const filteredWidgets = category.widgets.filter(
    (w) =>
      w.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mb-10 p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-blue-600 mb-4 border-b pb-2">
        {category.category}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredWidgets.length > 0 ? (
          filteredWidgets.map((widget, i) => (
            <Widget key={i} widget={widget} categoryName={category.category} />
          ))
        ) : (
          <p className="text-gray-500 col-span-full">
            No widgets found in this category.
          </p>
        )}
      </div>
    </div>
  );
}
