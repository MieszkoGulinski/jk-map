import { memo, useState } from "react";
import type { LabeledPoint } from "./types";

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

  return (
    <div id="search">
      <input
        type="text"
        placeholder="Szukaj..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {searchTerm.length > 0 && (
        <div id="search-list">
          {matchingPoints.map((point) => (
            <div key={point.code}>
              {point.name} ({point.code})
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default memo(Search);
