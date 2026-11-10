import Link from "next/link";

type VideoCardProps = {
  video: {
    id: {
      videoId: string;
    };
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
};

export default function VideoCard({ video }: VideoCardProps) {
  const { videoId } = video.id;

  const {
    title,
    description,
    channelTitle,
    publishedAt,
    thumbnails,
  } = video.snippet;

  const thumbnail =
    thumbnails.high?.url ||
    thumbnails.medium?.url ||
    thumbnails.default?.url;

  return (
    <Link
      href={`/video/${videoId}`}
      className="group block overflow-hidden rounded-3xl border border-[#f0e3ed] bg-white shadow-[0_4px_12px_rgba(183,121,168,0.06)] transition-all duration-300 hover:-translate-y-2 hover:border-[#e4c5df] hover:shadow-[0_14px_28px_rgba(183,121,168,0.18)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#f2d8eb]"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-[#f8edf7]">
        {thumbnail && (
          <img
            src={thumbnail}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
        )}

        {/* Pink overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#735b82]/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-12 w-12 translate-y-3 items-center justify-center rounded-full bg-white/90 text-xl text-[#d58bb3] opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            ▶
          </div>
        </div>
      </div>

      {/* Video information */}
      <div className="p-5">
        <h3 className="mb-3 line-clamp-2 font-bold leading-relaxed text-[#705a7b] transition-colors duration-300 group-hover:text-[#c17da8]">
          {title}
        </h3>

        <p className="mb-2 text-sm text-[#bd83aa]">
          ♡ {channelTitle}
        </p>

        <p className="line-clamp-2 text-xs leading-relaxed text-[#a99bad]">
          {description}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-[#f5edf4] pt-3">
          <p className="text-xs text-[#b5a4b8]">
            📅 {new Date(publishedAt).toLocaleDateString("th-TH")}
          </p>

          <span className="text-sm text-[#d99cbd] transition-transform duration-300 group-hover:translate-x-1">
            ดูวิดีโอ →
          </span>
        </div>
      </div>
    </Link>
  );
}