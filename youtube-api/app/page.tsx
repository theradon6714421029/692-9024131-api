"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import VideoCard from "@/components/VideoCard";

type Video = {
  id: { videoId: string };
  snippet: {
    title: string;
    description: string;
    channelTitle: string;
    publishedAt: string;
    thumbnails: {
      high?: { url: string };
      medium?: { url: string };
      default?: { url: string };
    };
  };
};

export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError("");
    setSearched(true);
    setVideos([]);

    try {
      const response = await fetch(
        `/api/youtube?q=${encodeURIComponent(query)}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "ไม่สามารถค้นหาวิดีโอได้");
      }

      setVideos(data.items || []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "เกิดข้อผิดพลาดในการค้นหา"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fff8f5] text-[#51445c]">
      <header className="border-b border-[#f3e4ed] bg-white/90 px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="rounded-2xl border border-[#f0ddec] bg-white px-5 py-2 shadow-[0_4px_12px_rgba(183,121,168,0.15)] transition hover:-translate-y-0.5 hover:shadow-md">
            <h1 className="text-2xl font-extrabold tracking-tight text-[#b779a8]">
              🌷 MellowTube
            </h1>
          </div>

          <span className="rounded-full bg-[#f8eafa] px-4 py-2 text-sm text-[#a477b5]">
            Discover something lovely ♡
          </span>
        </div>
      </header>

      <section className="px-6 py-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center rounded-[2rem] border border-white/80 bg-gradient-to-br from-[#fce8f1] via-[#f7edff] to-[#eaf4ff] px-6 py-16 text-center shadow-[0_8px_25px_rgba(183,121,168,0.10)]">
          <h2 className="text-3xl font-bold leading-relaxed text-[#735b82] sm:text-4xl">
            ค้นพบวิดีโอที่คุณชื่นชอบ
            <br />
            <span className="text-[#d58bb3]">
              ในพื้นที่เล็ก ๆ ของคุณ ♡
            </span>
          </h2>

          <p className="mb-8 mt-5 text-sm text-[#9886a1] sm:text-base">
            ค้นหาวิดีโอที่น่าสนใจจาก YouTube ได้ง่าย ๆ
          </p>

          <SearchBar onSearch={handleSearch} loading={loading} />

          <p className="mt-5 text-xs text-[#aa96b2]">
            Made for your little moments 🌸
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        {loading && (
          <div className="py-16 text-center text-[#ad8eb8]">
            <p className="text-4xl">🌸</p>
            <p className="mt-3">กำลังค้นหาวิดีโอ...</p>
          </div>
        )}

        {error && (
          <div className="rounded-2xl bg-[#ffe9ed] p-5 text-center text-[#cf7189]">
            {error}
          </div>
        )}

        {!loading && !error && searched && videos.length === 0 && (
          <div className="py-16 text-center text-[#ad8eb8]">
            <p className="text-4xl">🥺</p>
            <p className="mt-3">ไม่พบวิดีโอที่ค้นหา ลองคำอื่นดูนะ</p>
          </div>
        )}

        {!loading && videos.length > 0 && (
          <>
            <div className="mb-7">
              <h2 className="text-2xl font-bold text-[#80658d]">
                วิดีโอที่ค้นพบ 🌷
              </h2>
              <p className="mt-1 text-sm text-[#ad9bb4]">
                พบวิดีโอทั้งหมด {videos.length} รายการ
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {videos.map((video) => (
                <VideoCard key={video.id.videoId} video={video} />
              ))}
            </div>
          </>
        )}

        {!searched && (
          <div className="py-10 text-center">
            <p className="text-5xl">🧸</p>
            <p className="mt-4 font-medium text-[#9d85a8]">
              วันนี้อยากค้นพบวิดีโอแบบไหนนะ?
            </p>
          </div>
        )}
      </section>

      <footer className="border-t border-[#f3e4ed] bg-white py-6 text-center text-sm text-[#b29db8]">
        Made with ♡ MellowTube
      </footer>
    </main>
  );
}