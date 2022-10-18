import React, { useState, useEffect } from "react";

function BoxCard({ item }) {
  useEffect(() => {}, []);
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg h-fit ">
      <img
        className="w-full "
        src={item.properties.image.description}
        alt={item.properties.name.description}
      />

      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">
          {item.properties.name.description}
        </div>
        <p className="text-gray-700 text-base">
          {item.properties.description.description}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #photography
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #travel
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #winter
        </span>
      </div>
    </div>
  );
}

export default BoxCard;
