import { NextResponse } from 'next/server';

// ============================================================
// VERIFIED WORKING Cobalt v11 API instances (NO Turnstile required)
// Source: https://cobalt.directory/api/working?type=api
// Last verified: 2026-05-11
//
// Instances WITH turnstileSitekey are EXCLUDED because they
// require a browser-side captcha solve, which we can't do
// from a server-side API route.
// ============================================================
const COBALT_INSTANCES = [
  "https://cobaltapi.kittycat.boo",
  "https://cobaltapi.squair.xyz",
  "https://dog.kittycat.boo",
  "https://fox.kittycat.boo",
  "https://api.dl.woof.monster",
  "https://cobalt.alpha.wolfy.love",
  "https://cobalt.omega.wolfy.love",
  "https://api.cobalt.liubquanti.click",
  "https://apicobalt.mgytr.top",
  "https://grapefruit.clxxped.lol",
  "https://melon.clxxped.lol",
  "https://lime.clxxped.lol",
  "https://api.qwkuns.me",
  "https://cobaltapi.cjs.nz",
  "https://api.cobalt.blackcat.sweeux.org",
];

// Shuffle array to distribute load across instances
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

async function callCobalt(url, downloadMode = "auto") {
  // Cobalt v11 API schema — only documented keys
  const body = {
    url: url,
    videoQuality: "1080",
    youtubeVideoCodec: "h264",
    audioFormat: "mp3",
    audioBitrate: "320",
    downloadMode: downloadMode,
    filenameStyle: "pretty",
    youtubeHLS: false,
    tiktokFullAudio: true,
  };

  const instances = shuffle(COBALT_INSTANCES);

  for (const instance of instances) {
    try {
      console.log(`[Cobalt] Trying ${instance}...`);
      const res = await fetch(instance, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(30000),
      });

      if (!res.ok) {
        const status = res.status;
        const text = await res.text().catch(() => "");
        console.error(`[Cobalt ${instance}] HTTP ${status}: ${text.slice(0, 200)}`);
        continue;
      }

      const data = await res.json();

      if (data.status === "error") {
        const code = data.error?.code || JSON.stringify(data.error);
        console.error(`[Cobalt ${instance}] Error: ${code}`);

        // If it's an auth error (turnstile required), skip this instance
        if (code.includes("auth")) continue;

        // For other errors (like content.video.unavailable), no point trying more
        if (code.includes("content.")) {
          return { _error: code };
        }
        continue;
      }

      console.log(`[Cobalt] ✓ Success from ${instance}, status: ${data.status}`);
      return data;
    } catch (err) {
      console.error(`[Cobalt ${instance}] Failed: ${err.message}`);
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

    // Handle content-level errors from cobalt
    if (cobaltData._error) {
      return NextResponse.json({
        error: `This content is unavailable for download (${cobaltData._error}).`
      }, { status: 422 });
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
      thumbnail: cobaltData.picker?.[0]?.thumb || `https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80`,
      duration: "Full Video",
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
  if (u.includes('tiktok.com') || u.includes('vt.tiktok')) return 'tiktok';
  if (u.includes('instagram.com')) return 'instagram';
  if (u.includes('facebook.com') || u.includes('fb.watch') || u.includes('fb.com')) return 'facebook';
  if (u.includes('twitter.com') || u.includes('x.com')) return 'twitter';
  if (u.includes('youtube.com') || u.includes('youtu.be')) return 'youtube';
  if (u.includes('pinterest.com') || u.includes('pin.it')) return 'pinterest';
  if (u.includes('reddit.com')) return 'reddit';
  if (u.includes('vimeo.com')) return 'vimeo';
  if (u.includes('soundcloud.com')) return 'soundcloud';
  if (u.includes('twitch.tv')) return 'twitch';
  if (u.includes('dailymotion.com')) return 'dailymotion';
  if (u.includes('bilibili.com')) return 'bilibili';
  if (u.includes('tumblr.com')) return 'tumblr';
  if (u.includes('snapchat.com')) return 'snapchat';
  if (u.includes('streamable.com')) return 'streamable';
  return null;
}
