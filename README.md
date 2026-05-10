# 🎬 SyncRence — Premium Social Media Downloader

> **Download videos and extract MP3 audio from any social media platform — no ads, no watermarks, completely free.**

🌐 **Live Demo:** [syncrence.vercel.app](https://syncrence.vercel.app)

---

## 📖 About

**SyncRence** is a sleek, modern web application that allows users to download videos and extract audio from popular social media platforms. Built with a premium dark-themed UI featuring glassmorphism effects, smooth animations, and a cinematic background — SyncRence delivers a high-end user experience that rivals professional tools.

Paste any video link, click Download, and get the file directly — no redirects, no ads, no sign-ups required.

---

## ✨ Features

- 🎥 **Video Download** — Download videos in up to **1080p** quality as MP4
- 🎵 **MP3 Extraction** — Extract audio from any video as **320kbps MP3**
- 🌍 **Multi-Platform Support** — Works with 10+ social media platforms
- ⚡ **Multi-Instance Failover** — Automatically cycles through multiple extraction servers for maximum reliability
- 🎨 **Premium UI** — Dark theme with glassmorphism, parallax backgrounds, and micro-animations
- 📱 **Fully Responsive** — Optimized for desktop, tablet, and mobile devices
- 🔒 **Privacy First** — No data logging, no tracking, no accounts required
- 🚫 **No Ads** — Clean, ad-free experience

---

## 🌐 Supported Platforms

| Platform | Video | Audio |
|----------|:-----:|:-----:|
| YouTube | ✅ | ✅ |
| TikTok | ✅ | ✅ |
| Instagram | ✅ | ✅ |
| Facebook | ✅ | ✅ |
| Twitter / X | ✅ | ✅ |
| Reddit | ✅ | ✅ |
| Pinterest | ✅ | ✅ |
| SoundCloud | ✅ | ✅ |
| Twitch Clips | ✅ | ✅ |
| Vimeo | ✅ | ✅ |
| Dailymotion | ✅ | ✅ |
| Bilibili | ✅ | ✅ |

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| **Next.js 16** | React framework with App Router & Server-Side Rendering |
| **React 19** | UI component library |
| **Tailwind CSS 4** | Utility-first CSS framework |
| **Framer Motion** | Smooth page transitions and micro-animations |
| **Lucide React** | Beautiful, consistent icon system |

### Backend
| Technology | Purpose |
|-----------|---------|
| **Next.js API Routes** | Serverless backend endpoints |
| **Cobalt API (v10)** | Open-source media extraction engine |
| **Multi-Instance Failover** | 10+ extraction servers for high availability |

### Infrastructure
| Technology | Purpose |
|-----------|---------|
| **Vercel** | Hosting, CI/CD, and edge deployment |
| **GitHub** | Version control and repository hosting |

### Design System
| Element | Details |
|---------|---------|
| **Theme** | Dark mode with warm bronze (`#d4a373`) accents |
| **Effects** | Glassmorphism, backdrop blur, parallax backgrounds |
| **Typography** | Inter (Google Fonts), serif headings |
| **Animations** | Spring-based drawer, fade-in sections, hover micro-interactions |

---

## 📁 Project Structure

```
social-saver/
├── public/
│   ├── bg.png              # Cinematic background image
│   └── logo.png            # SyncRence logo
├── src/
│   ├── app/
│   │   ├── api/extract/    # Serverless extraction API
│   │   ├── about/          # About page
│   │   ├── terms/          # Terms & Privacy page
│   │   ├── contact/        # Contact page
│   │   ├── credits/        # Credits & attributions page
│   │   ├── globals.css     # Global styles & design tokens
│   │   ├── layout.js       # Root layout with metadata
│   │   └── page.js         # Home page (main downloader)
│   └── components/
│       ├── Navbar.js       # Navigation bar with slide-out drawer
│       ├── Footer.js       # Footer with legal notices
│       ├── VideoResult.js  # Download result card with quality picker
│       └── Platforms.js    # Supported platforms ticker
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Zaitonic/syncrence.git

# Navigate to the project
cd syncrence

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be running at `http://localhost:3000`

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Zaitonic/syncrence)

---

## ⚖️ Legal Notice

> **Respect copyright laws.** Downloading or distributing copyrighted works without explicit permission from the content creator is strictly prohibited by law. This tool is intended for personal use only — downloading your own content, content you have permission to download, or content in the public domain.

> **Use responsibly.** SyncRence does not host any media files. We act as a bridge between the source platform and your device. Users are solely responsible for compliance with the terms of service of the original content provider.

---

## 👤 Author

**MarkRence**

- GitHub: [@Zaitonic](https://github.com/Zaitonic)
- Instagram: [@markrence_31](https://instagram.com/markrence_31)
- Facebook: [Mark Laurence](https://www.facebook.com/mark.laurence.305159)

---

## 📄 License

This project is for educational and personal use only. All referenced marks, logos, and brands are the property of their respective owners. No affiliation is implied.

---

<p align="center">
  <b>SyncRence Protocol // v1.0</b><br>
  <sub>Premium Extraction Engine — Made by MarkRence</sub>
</p>
