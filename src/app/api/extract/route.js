import { NextResponse } from 'next/server';

// Community Cobalt instances (v10+ API) - ordered by reliability score
const COBALT_INSTANCES = [
  "https://cobalt.canine.tools",
  "https://cobalt.meowing.de",
  "https://cobalt.clxxped.lol",
  "https://cobalt.kittycat.boo",
  "https://cobalt.squair.xyz",
];

async function callCobalt(url, downloadMode = "auto") {
  const body = {
    url: url,
    videoQuality: "1080",
    audioFormat: "mp3",
    audioBitrate: "320",
    downloadMode: downloadMode, // "auto" for video, "audio" for MP3 only
    filenameStyle: "basic",
  };

  // Try each instance until one works
  for (const instance of COBALT_INSTANCES) {
    try {
      const res = await fetch(instance, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(15000), // 15 second timeout per instance
      });

      const data = await res.json();
      
      if (data.status === "error") {
        console.error(`[Cobalt ${instance}] Error:`, data.error?.code);
        continue; // Try next instance
      }

      console.log(`[Cobalt] Success from ${instance}, status: ${data.status}`);
      return data;
    } catch (err) {
      console.error(`[Cobalt ${instance}] Connection failed:`, err.message);
      continue; // Try next instance
    }
  }

  return null; // All instances failed
}

export async function POST(req) {
  try {
    const { url, mode } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Platform detection
    const platform = detectPlatform(url);
    if (!platform) {
      return NextResponse.json({ error: "Unsupported platform or invalid URL" }, { status: 400 });
    }

    // Determine download mode: "auto" = video, "audio" = mp3
    const downloadMode = mode === "audio" ? "audio" : "auto";

    // Call Cobalt API with failover across multiple instances
    const cobaltData = await callCobalt(url, downloadMode);

    if (!cobaltData) {
      return NextResponse.json({ 
        error: "All extraction servers are currently busy. Please try again in a moment." 
      }, { status: 503 });
    }

    // Map Cobalt response to our UI format
    let qualities = [];
    let downloadUrl = "";
    let filename = cobaltData.filename || `download_${Date.now()}`;

    if (cobaltData.status === "tunnel" || cobaltData.status === "redirect") {
      downloadUrl = cobaltData.url;
      const label = downloadMode === "audio" ? "MP3 Audio (320kbps)" : "High Quality Video (1080p)";
      qualities = [{ label, size: "Auto", default: true, url: cobaltData.url }];
    } else if (cobaltData.status === "picker") {
      // Multiple items (e.g., Instagram carousel, TikTok slideshow)
      qualities = cobaltData.picker.map((item, i) => ({
        label: item.type === "video" ? `Video ${i + 1}` : item.type === "photo" ? `Photo ${i + 1}` : `Item ${i + 1}`,
        size: "Auto",
        default: i === 0,
        url: item.url,
        thumb: item.thumb || null,
      }));
      // If there's background audio (e.g., TikTok slideshow), add it as an option
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
      thumbnail: cobaltData.picker?.[0]?.thumb || `https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80`,
      duration: "Original",
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

function detectPlatform(url) {
  const u = url.toLowerCase();
  if (u.includes('tiktok.com')) return 'tiktok';
  if (u.includes('instagram.com')) return 'instagram';
  if (u.includes('facebook.com') || u.includes('fb.watch')) return 'facebook';
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
