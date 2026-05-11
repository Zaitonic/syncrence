import { NextResponse } from 'next/server';

// Working Cobalt API endpoints (these are the actual API URLs, NOT frontend URLs)
// Sourced from https://cobalt.directory/api/working?type=api
const COBALT_INSTANCES = [
  "https://api.cobalt.tools",
  "https://cobalt.moe/api",
  "https://cobaltapi.kittycat.boo",
  "https://nuko-c.meowing.de",
  "https://api.qwkuns.me",
  "https://cobaltapi.squair.xyz",
  "https://grapefruit.clxxped.lol",
  "https://apicobalt.mgytr.top",
  "https://api.cobalt.liubquanti.click",
  "https://dog.kittycat.boo",
  "https://fox.kittycat.boo",
  "https://lime.clxxped.lol",
];

async function callCobalt(url, downloadMode = "auto") {
  const body = {
    url: url,
    videoQuality: "1080",
    vQuality: "1080",          // Explicit quality
    youtubeVideoCodec: "h264", // Ensure MP4 compatibility
    vCodec: "h264",            // Alias
    audioFormat: "best",
    aFormat: "best",           // Best audio for video merging
    audioBitrate: "320",
    downloadMode: downloadMode,
    filenameStyle: "pretty",
    youtubeHls: false,         // Progressive streams are more stable for long videos
  };

  for (const instance of COBALT_INSTANCES) {
    try {
      console.log(`[Cobalt] Trying ${instance}...`);
      const res = await fetch(instance, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(60000), // Increased to 60s for longer videos
      });

      const data = await res.json();

      if (data.status === "error") {
        console.error(`[Cobalt ${instance}] Error:`, data.error?.code || JSON.stringify(data.error));
        continue;
      }

      console.log(`[Cobalt] Success from ${instance}, status: ${data.status}`);
      return data;
    } catch (err) {
      console.error(`[Cobalt ${instance}] Failed:`, err.message);
      continue;
    }
  }

  return null;
}

export async function POST(req) {
  try {
    const { url, mode } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const platform = detectPlatform(url);
    if (!platform) {
      return NextResponse.json({ error: "Unsupported platform or invalid URL" }, { status: 400 });
    }

    const downloadMode = mode === "audio" ? "audio" : "auto";
    const cobaltData = await callCobalt(url, downloadMode);

    if (!cobaltData) {
      return NextResponse.json({
        error: "All extraction servers are currently busy. Please try again in a moment."
      }, { status: 503 });
    }

    let qualities = [];
    let downloadUrl = "";
    let filename = cobaltData.filename || `download_${Date.now()}`;

    if (cobaltData.status === "tunnel" || cobaltData.status === "redirect") {
      downloadUrl = cobaltData.url;
      const label = downloadMode === "audio" ? "MP3 Audio (320kbps)" : "High Quality Video (1080p)";
      qualities = [{ label, size: "Auto", default: true, url: cobaltData.url }];
    } else if (cobaltData.status === "picker") {
      qualities = cobaltData.picker.map((item, i) => ({
        label: item.type === "video" ? `Video ${i + 1}` : item.type === "photo" ? `Photo ${i + 1}` : `Item ${i + 1}`,
        size: "Auto",
        default: i === 0,
        url: item.url,
        thumb: item.thumb || null,
      }));
      if (cobaltData.audio) {
        qualities.push({
          label: "Background Audio (MP3)",
          size: "Auto",
          default: false,
          url: cobaltData.audio,
        });
      }
      downloadUrl = qualities[0]?.url || "";
    }

    const finalData = {
      title: filename,
      thumbnail: cobaltData.picker?.[0]?.thumb || cobaltData.thumbnail || `https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80`,
      duration: cobaltData.duration ? formatDuration(cobaltData.duration) : "Full Video",
      platform: platform.charAt(0).toUpperCase() + platform.slice(1),
      qualities: qualities,
      downloadUrl: downloadUrl,
      isDemo: false,
    };

    return NextResponse.json(finalData);
  } catch (error) {
    console.error("Extraction error:", error);
    return NextResponse.json({ error: "Failed to extract. Please check the URL and try again." }, { status: 500 });
  }
}

function formatDuration(seconds) {
  if (!seconds) return "Full Video";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function detectPlatform(url) {
  const u = url.toLowerCase();
  if (u.includes('tiktok.com')) return 'tiktok';
  if (u.includes('instagram.com')) return 'instagram';
  if (u.includes('facebook.com') || u.includes('fb.watch') || u.includes('fb.com')) return 'facebook';
  if (u.includes('twitter.com') || u.includes('x.com')) return 'twitter';
  if (u.includes('youtube.com') || u.includes('youtu.be')) return 'youtube';
  if (u.includes('pinterest.com')) return 'pinterest';
  if (u.includes('reddit.com')) return 'reddit';
  if (u.includes('vimeo.com')) return 'vimeo';
  if (u.includes('linkedin.com')) return 'linkedin';
  if (u.includes('soundcloud.com')) return 'soundcloud';
  if (u.includes('twitch.tv')) return 'twitch';
  if (u.includes('dailymotion.com')) return 'dailymotion';
  if (u.includes('bilibili.com')) return 'bilibili';
  if (u.includes('tumblr.com')) return 'tumblr';
  return null;
}
