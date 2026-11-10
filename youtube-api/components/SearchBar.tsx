"use client";

import { useState, type FormEvent } from "react";

type SearchBarProps = {
  onSearch: (query: string) => void;
  loading: boolean;
};

export default function SearchBar({
  onSearch,
  loading,
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!query.trim()) return;

    onSearch(query.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-2xl gap-3"
    >
      <input
        type="text"
        placeholder="ลองค้นหาสิ่งที่คุณสนใจ..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="min-w-0 flex-1 rounded-full border border-[#ead8eb] bg-white px-6 py-4 text-sm text-[#735b82] shadow-sm outline-none transition placeholder:text-[#c2b0c9] focus:border-[#d6a4cf] focus:ring-4 focus:ring-[#f7e7f5]"
      />

      <button
        type="submit"
        disabled={loading || !query.trim()}
        className="rounded-full bg-[#d99cbd] px-7 py-4 font-semibold text-white shadow-sm transition hover:bg-[#c887ad] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "รอแป๊บ..." : "ค้นหา ♡"}
      </button>
    </form>
  );
}