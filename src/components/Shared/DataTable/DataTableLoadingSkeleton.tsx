import React from "react";

const DataTableLoadingSkeleton = ({ rows = 5, columns = 4 }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border-spacing-0">
        {/* Table Head */}
        <thead>
          <tr>
            {Array.from({ length: columns }).map((_, index) => (
              <th key={index} className="px-4 py-2 text-left">
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <td key={colIndex} className="px-4 py-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTableLoadingSkeleton;
