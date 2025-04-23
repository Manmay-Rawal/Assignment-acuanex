import React, { createContext, useReducer, useContext } from "react";

const WidgetContext = createContext();

const initialState = [
  {
    category: "CSPM Executive Dashboard",
    widgets: [
      {
        name: "Widget 1",
        text: "Sample text 1",
        chartType: "Bar",
        chartData: {
          labels: ["A", "B", "C"],
          datasets: [
            {
              label: "Data 1",
              data: [10, 20, 30],
              backgroundColor: ["#3b82f6", "#10b981", "#f59e0b"],
            },
          ],
        },
      },
    ],
  },
  {
    category: "CWPP Dashboard",
    widgets: [
      {
        name: "Widget 1",
        text: "Sample text 1",
        chartType: "Bar",
        chartData: {
          labels: ["A", "B", "C"],
          datasets: [
            {
              label: "Data 1",
              data: [10, 20, 30],
              backgroundColor: ["#3b82f6", "#10b981", "#f59e0b"],
            },
          ],
        },
      },
    ],
  },
  {
    category: "Image Dashboard",
    widgets: [],
  },
  {
    category: "Ticket Dashboard",
    widgets: [],
  },
];

function widgetReducer(state, action) {
  switch (action.type) {
    case "ADD_WIDGET": {
      return state.map((cat) =>
        cat.category === action.category
          ? {
              ...cat,
              widgets: [
                ...cat.widgets,
                {
                  name: action.name,
                  text: action.text,
                  chartType: action.chartType,
                  chartData: action.chartData,
                },
              ],
            }
          : cat
      );
    }

    case "REMOVE_WIDGET": {
      return state.map((cat) =>
        cat.category === action.category
          ? {
              ...cat,
              widgets: cat.widgets.filter(
                (widget) => widget.name !== action.name
              ),
            }
          : cat
      );
    }

    default:
      return state;
  }
}

export function WidgetProvider({ children }) {
  const [state, dispatch] = useReducer(widgetReducer, initialState);
  return (
    <WidgetContext.Provider value={{ state, dispatch }}>
      {children}
    </WidgetContext.Provider>
  );
}

export function useWidgetContext() {
  return useContext(WidgetContext);
}
