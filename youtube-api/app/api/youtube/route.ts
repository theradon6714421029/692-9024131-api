import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const query = searchParams.get("q");
    const videoId = searchParams.get("id");

    const apiKey = process.env.YOUTUBE_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "ไม่พบ YouTube API Key" },
        { status: 500 }
      );
    }

    // กรณีดึงรายละเอียดวิดีโอ
    if (videoId) {
      const detailUrl = new URL(
        "https://www.googleapis.com/youtube/v3/videos"
      );

      detailUrl.searchParams.set(
        "part",
        "snippet,statistics,contentDetails"
      );
      detailUrl.searchParams.set("id", videoId);
      detailUrl.searchParams.set("key", apiKey);

      const detailResponse = await fetch(detailUrl.toString());
      const detailData = await detailResponse.json();

      if (!detailResponse.ok) {
        return NextResponse.json(
          {
            error:
              detailData.error?.message ||
              "ไม่สามารถดึงรายละเอียดวิดีโอได้",
          },
          { status: detailResponse.status }
        );
      }

      return NextResponse.json(detailData);
    }

    // กรณีค้นหาวิดีโอ
    if (!query || !query.trim()) {
      return NextResponse.json(
        { error: "กรุณาระบุคำค้นหา" },
        { status: 400 }
      );
    }

    const url = new URL(
      "https://www.googleapis.com/youtube/v3/search"
    );

    url.searchParams.set("part", "snippet");
    url.searchParams.set("q", query);
    url.searchParams.set("type", "video");
    url.searchParams.set("maxResults", "12");
    url.searchParams.set("key", apiKey);

    const response = await fetch(url.toString());
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            data.error?.message ||
            "ไม่สามารถเรียกใช้งาน YouTube API ได้",
        },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("YouTube API Error:", error);

    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการเชื่อมต่อ API" },
      { status: 500 }
    );
  }
}