import fs from "node:fs";
import { parse } from "csv-parse/sync";

const csv = fs.readFileSync("jeziora_kaszubskie_2018v1.csv", "utf-8");
const lines = parse(csv, {
  skip_empty_lines: true,
});

function convertCoordinates(coordinates) {
  // XX means XX degrees (integer, no minutes)
  // XX,YY means XX degrees and YY minutes
  // XX YY.ZZ means XX degrees and YY.ZZ minutes (ZZ decimal)
  // all coordinates are positive (northern and eastern hemispheres)

  const [deg, min] = coordinates
    .toString()
    .trim()
    .replaceAll(" ", ",")
    .split(",")
    .map((partStr) => parseFloat(partStr));

  if (min === undefined) {
    return deg;
  }

  return deg + min / 60;
}

const formattedLines = lines
  .filter((line) => {
    return line[6] !== "" && line[7] !== "";
  })
  .filter((line) => {
    // line separators
    return line[6] !== "N";
  })
  .filter((line) => {
    // deleted?
    return !(line[8] || "").toLowerCase().includes("usunięte");
  })
  .map((line) => {
    return {
      code: line[3],
      name: line[2],
      lat: convertCoordinates(line[6]),
      lng: convertCoordinates(line[7]),
    };
  });

fs.writeFileSync("./src/points.json", JSON.stringify(formattedLines, null, 2));
