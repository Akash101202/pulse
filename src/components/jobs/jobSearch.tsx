"use client";

export default function JobSearch({ onSearch }: any) {
  return (
    <input
      className="search-bar border p-2 w-full"
      placeholder="Search jobs..."
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}