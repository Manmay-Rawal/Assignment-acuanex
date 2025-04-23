import React from "react";
import Dashboard from "./components/Dashboard";
import { WidgetProvider } from "./context/WidgetContext";
import AddWidgetForm from "./components/AddWidgetForm";

export default function App() {
  return (
    <WidgetProvider>
      <div className="p-4">
        {/* Title and AddWidgetForm in same row */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Dashboard Assignment</h1>
          <AddWidgetForm />
        </div>

        {/* Main Dashboard */}
        <Dashboard />
      </div>
    </WidgetProvider>
  );
}

