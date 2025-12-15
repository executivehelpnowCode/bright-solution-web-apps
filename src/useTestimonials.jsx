import { useEffect, useState } from "react";
import Papa from "papaparse";

// 1. Import the avatar assets
import female1 from "./assets/female1.svg";
import female2 from "./assets/female2.svg";
import male1 from "./assets/male1.svg";
import male2 from "./assets/male2.svg";

// 2. Define the array of available avatars outside the function
const AVATAR_POOL = [
  female1,
  female2,
  male1,
  male2,
];

// Helper function to pick a random avatar path
const getRandomAvatar = () => {
  const randomIndex = Math.floor(Math.random() * AVATAR_POOL.length);
  return AVATAR_POOL[randomIndex];
};

export function useTestimonials() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const SHEET_URL =
      "https://docs.google.com/spreadsheets/d/1OcQt_Grh2MePL9amlriy3CCQSrzYTt721CFkZ6WHizQ/export?format=csv&gid=496488766";

    Papa.parse(SHEET_URL, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        // Find the key for permission dynamically to avoid newline/space issues
        const allKeys = results.data.length > 0 ? Object.keys(results.data[0]) : [];
        const permissionKey = allKeys.find(k => k.includes("PERMISSION TO SHARE FEEDBACK"));
        const usabilityKey = allKeys.find(k => k.includes("USABILITY AND PERFORMANCE"));
        const usageKey = allKeys.find(k => k.includes("USAGE FEEDBACK"));
        const ratingKey = allKeys.find(k => k.includes("Overall usability and performance experience"));

        const mapped = results.data
          .filter((row) => {
            const val = row[permissionKey]?.toLowerCase() || "";
            return val.includes("yes");
          })
          .map((row, index) => ({
            id: index + 1,
            name: row["Name"]?.trim() || "Anonymous",
            // 3. Use the getRandomAvatar function here
            avatar: getRandomAvatar(),
            // Use unary plus or Number() and handle the specific key
            rating: Number(row[ratingKey]) || 5,
            message: [
              row[usabilityKey],
              row[usageKey],
            ]
              .filter(Boolean)
              .join(", "),
          }));

        setData(mapped);
      },
      error: (err) => console.error("CSV ERROR:", err),
    });
  }, []);

  return data;
}