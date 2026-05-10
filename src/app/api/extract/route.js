import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase (User needs to add these env vars for logging to work)
const supabase = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
  ? createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
  : null;

export async function POST(req) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Platform detection
    const platform = detectPlatform(url);
    if (!platform) {
      return NextResponse.json({ error: "Unsupported platform or invalid link" }, { status: 400 });
    }

    // Call Cobalt API with better headers
    let finalData = null;
    try {
      const cobaltResponse = await fetch("https://api.cobalt.tools/api/json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
        body: JSON.stringify({
          url: url,
          videoQuality: "1080",
          audioFormat: "mp3",
          isAudioOnly: false,
          a11y: false
        }),
      });

      const cobaltData = await cobaltResponse.json();

      if (cobaltResponse.ok && cobaltData.status !== "error") {
        // Map Cobalt response to our UI format
        let qualities = [];
        let downloadUrl = "";
        let title = cobaltData.filename || `Video - ${new URL(url).hostname}`;

        if (cobaltData.status === "stream" || cobaltData.status === "redirect") {
          downloadUrl = cobaltData.url;
          qualities = [{ label: "High Quality", size: "Auto", default: true, url: cobaltData.url }];
        } else if (cobaltData.status === "picker") {
          qualities = cobaltData.picker.map(item => ({
            label: item.type === "video" ? `${item.quality || 'HD'} Video` : "Audio",
            size: "Auto",
            default: false,
            url: item.url
          }));
          downloadUrl = qualities[0]?.url || "";
        }

        finalData = {
          title: title,
          thumbnail: `https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80`,
          duration: "Original",
          platform: platform.charAt(0).toUpperCase() + platform.slice(1),
          qualities: qualities,
          downloadUrl: downloadUrl,
          isDemo: false
        };
      }
    } catch (e) {
      console.error("Cobalt API Error:", e);
    }

    // Fallback to Smart Mock if API fails (Ensures UI always works for Demo)
    if (!finalData) {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate work
      finalData = {
        title: `Social Video - ${new URL(url).hostname}`,
        thumbnail: `https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80`,
        duration: "00:45",
        platform: platform.charAt(0).toUpperCase() + platform.slice(1),
        qualities: [
          { label: "1080p (HQ)", size: "24.5 MB", default: true, url: "#demo" },
          { label: "720p (HD)", size: "12.2 MB", default: false, url: "#demo" }
        ],
        downloadUrl: "#demo",
        isDemo: true,
        note: "System is in Demo Mode. Connect a private extraction server for live downloads."
      };
    }

    // Log to Supabase if configured
    if (supabase) {
      await supabase.from('downloads').insert({
        platform,
        url_hash: Buffer.from(url).toString('base64').slice(0, 20),
        timestamp: new Date().toISOString()
      });
    }

    return NextResponse.json(finalData);
  } catch (error) {
    console.error("Extraction error:", error);
    return NextResponse.json({ error: "Failed to extract video information. Please try again later." }, { status: 500 });
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
  return null;
}
