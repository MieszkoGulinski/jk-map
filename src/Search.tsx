import { memo, useEffect, useRef, useState } from "react";
import type { LabeledPoint } from "./types";
import L from "leaflet";
import { useMap } from "react-leaflet";

interface SearchProps {
  points: LabeledPoint[];
}

function Search({ points }: SearchProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const searchTermLowercase = searchTerm.toLowerCase();
  const matchingPoints = points.filter(
    (point) =>
      point.name.toLowerCase().includes(searchTermLowercase) ||
      point.code.toLowerCase().includes(searchTermLowercase),
  );

  const containerRef = useRef<HTMLDivElement>(null);

  // Prevent map scrolling when scrolling search results
  useEffect(() => {
    if (!containerRef.current) return;

    L.DomEvent.disableClickPropagation(containerRef.current);
    L.DomEvent.disableScrollPropagation(containerRef.current);
  }, []);

  const map = useMap();

  const onSelectPoint = (point: LabeledPoint) => {
    setSearchTerm("");
    map.setView([point.lat, point.lng], 14);
  };

  return (
    <div id="search" ref={containerRef}>
      <input
        type="text"
        placeholder="Szukaj..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {searchTerm.length > 0 && (
        <div id="search-list">
          {matchingPoints.map((point) => (
            <div
              key={point.code}
              className="search-item"
              onClick={() => onSelectPoint(point)}
            >
              {point.name} ({point.code})
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default memo(Search);
