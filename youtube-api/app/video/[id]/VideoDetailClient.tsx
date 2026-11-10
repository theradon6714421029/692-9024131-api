"use client";

import { useEffect, useState } from "react";

type VideoDetail = {
  id: string;
  snippet: {
    title: string;
    description: string;
    channelTitle: string;
    publishedAt: string;
    thumbnails: {
      high?: { url: string };
    };
  };
  statistics: {
    viewCount?: string;
    likeCount?: string;
  };
  contentDetails: {
    duration: string;
  };
};

function formatDuration(duration: string) {
  const match = duration.match(
    /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/
  );

  if (!match) return "ไม่ระบุ";

  const hours = Number(match[1] || 0);
  const minutes = Number(match[2] || 0);
  const seconds = Number(match[3] || 0);

  const totalMinutes = hours * 60 + minutes;

  return [
    totalMinutes,
    seconds.toString().padStart(2, "0"),
  ].join(":");
}

export default function VideoDetailClient({ id }: { id: string }) {
  const [video, setVideo] = useState<VideoDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchVideo() {
      try {
        const response = await fetch(
          `/api/youtube?id=${encodeURIComponent(id)}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "ไม่สามารถโหลดวิดีโอได้");
        }

        if (!data.items || data.items.length === 0) {
          throw new Error("ไม่พบวิดีโอนี้");
        }

        setVideo(data.items[0]);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "เกิดข้อผิดพลาด"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchVideo();
  }, [id]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fff8f5] text-[#ad8eb8]">
        <div className="text-center">
          <p className="text-5xl">🌸</p>
          <p className="mt-4">กำลังโหลดข้อมูลวิดีโอ...</p>
        </div>
      </main>
    );
  }

  if (error || !video) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fff8f5] px-6 text-center">
        <div className="rounded-3xl border border-[#f0e3ed] bg-white p-10 shadow-sm">
          <p className="text-5xl">🥺</p>
          <p className="mt-4 text-[#cf7189]">
            {error || "ไม่พบวิดีโอ"}
          </p>
          <a
            href="/"
            className="mt-6 inline-block rounded-full bg-[#d99cbd] px-6 py-3 text-white transition hover:bg-[#c887ad]"
          >
            กลับหน้าค้นหา ♡
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fff8f5] px-5 py-8 text-[#51445c] sm:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex items-center justify-between">
          <div className="rounded-2xl border border-[#f0ddec] bg-white px-4 py-2 shadow-sm">
            <span className="text-xl font-extrabold text-[#b779a8]">
              🌷 MellowTube
            </span>
          </div>

          <a
            href="/"
            className="rounded-full border border-[#ead8eb] bg-white px-5 py-2 text-sm text-[#a477b5] shadow-sm transition hover:bg-[#f8eafa]"
          >
            ← กลับหน้าค้นหา
          </a>
        </header>

        <div className="overflow-hidden rounded-[2rem] border border-[#f0e3ed] bg-white shadow-[0_8px_25px_rgba(183,121,168,0.10)]">
          <div className="aspect-video overflow-hidden bg-[#f8edf7]">
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${video.id}`}
              title={video.snippet.title}
              allowFullScreen
            />
          </div>

          <div className="p-6 sm:p-9">
            <h1 className="text-xl font-bold leading-relaxed text-[#735b82] sm:text-2xl">
              {video.snippet.title}
            </h1>

            <p className="mt-3 text-sm text-[#bd83aa]">
              ♡ {video.snippet.channelTitle}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-2xl bg-[#fff1f5] p-4">
                <p className="text-xs text-[#bd83aa]">👁 ยอดวิว</p>
                <p className="mt-2 font-semibold text-[#80658d]">
                  {Number(video.statistics.viewCount || 0).toLocaleString("th-TH")}
                </p>
              </div>

              <div className="rounded-2xl bg-[#f8efff] p-4">
                <p className="text-xs text-[#a477b5]">👍 ไลก์</p>
                <p className="mt-2 font-semibold text-[#80658d]">
                  {Number(video.statistics.likeCount || 0).toLocaleString("th-TH")}
                </p>
              </div>

              <div className="rounded-2xl bg-[#eff5ff] p-4">
                <p className="text-xs text-[#8b9fc4]">📅 เผยแพร่</p>
                <p className="mt-2 text-sm font-semibold text-[#80658d]">
                  {new Date(video.snippet.publishedAt).toLocaleDateString("th-TH")}
                </p>
              </div>

              <div className="rounded-2xl bg-[#f1f8f1] p-4">
                <p className="text-xs text-[#8bad91]">⏱ ความยาว</p>
                <p className="mt-2 font-semibold text-[#80658d]">
                  {formatDuration(video.contentDetails.duration)}
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-3xl bg-gradient-to-br from-[#fff5f8] to-[#f7f0ff] p-6">
              <h2 className="mb-4 text-lg font-bold text-[#80658d]">
                รายละเอียดวิดีโอ ♡
              </h2>

              <p className="whitespace-pre-wrap text-sm leading-8 text-[#927f9b]">
                {video.snippet.description}
              </p>
            </div>
          </div>
        </div>

        <footer className="py-8 text-center text-sm text-[#b29db8]">
          Made with ♡ MellowTube
        </footer>
      </div>
    </main>
  );
}