# OUR LITTLE UNIVERSE 💗
### An Interactive 3D Romantic Proposal Experience

A handcrafted, deeply personal, cinematic 3D romantic proposal website crafted with React, TypeScript, Three.js, Framer Motion, and Tailwind CSS.

---

## 🌸 Visual Identity & Emotional Atmosphere

- **Blush Pink**: `#FFD6E7`
- **Rose Pink**: `#FF8FB8`
- **Lavender**: `#DCD6FF`
- **Deep Lavender**: `#A99AEF`
- **Soft Cream**: `#FFF8FC`
- **Midnight Purple**: `#21172F`

**Features**:
- 🌌 **3D Glass Heart Universe**: Parametric 3D extruded glass heart with realistic transmission, IOR, inner core glow, and orbital star particles.
- 🌠 **Cosmic Parallax & Touch Interaction**: Interactive camera response to mouse movement on desktop and touch on mobile.
- 💌 **Unfolding 3D Handwritten Letter**: Realistic wax-sealed envelope with 3D tilt, realistic flap lifting, and vintage unfolding paper stationery.
- 🫧 **Interactive Memory Garden**: 6 glowing translucent bubbles with blooming flowers, heart sparkles, and quotes celebrating her worth and individuality.
- 🌹 **Twilight Garden & Heart Portal**: Illuminated pathway, cherry blossom petal drifts, fireflies, and lavender crescent moon.
- 💍 **Respectful & Safe Proposal**: Both options ("Yes… let's write our love story 💖" and "Can I take my time? 🥹") are treated with dignity, warmth, and equal beauty.
- 🎶 **Procedural Celestial Audio**: Built-in Web Audio API synthesizer that generates warm celestial chords, music box chimes, and ambient pads with ZERO external network dependence or loading errors (also supports custom mp3 via config).
- ♿ **Full Accessibility**: WebGL fallback canvas, reduced-motion detection, keyboard navigation, and responsive layouts for all device viewports.

---

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite + TypeScript
- **3D Graphics**: Three.js (WebGL with ACESFilmic tone mapping)
- **UI Motion**: Framer Motion
- **Icons**: Lucide React
- **Celebration**: Canvas Confetti
- **Styles**: Tailwind CSS + Custom Glassmorphism

---

## ⚙️ Personalization Guide

All personal memories, names, messages, and settings are configured in one single file:

📁 **`src/config/proposal.ts`**

```typescript
export const proposalConfig = {
  herName: "My Favorite Human",       // Her name
  herNickname: "Besty",               // Her nickname
  myName: "Someone Who Cares",        // Your name
  showNames: false,                   // Set true to show explicit names instead of universal terms
  musicUrl: "",                       // Optional custom MP3 audio path (leave empty for procedural audio)
  // ... customized opening lines, letter paragraphs, memory bubbles, and responses
};
```

---

## 🚀 Running Locally

1. Open your terminal in this directory:
   ```bash
   cd d:\Special
   ```

2. Start the Vite development server:
   ```bash
   npm run dev
   ```

3. Open the displayed URL in your browser (typically `http://localhost:5173`).

---

## 📦 Building for Production

To create an optimized production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 🌐 Deploying to Vercel

### Option 1: Vercel CLI (Fastest)

1. Install the Vercel CLI globally (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. Run the deployment command inside `d:\Special`:
   ```bash
   vercel
   ```

3. Follow the interactive prompts (keep defaults). For production release:
   ```bash
   vercel --prod
   ```

### Option 2: Deploying via GitHub & Vercel Dashboard

1. Initialize a git repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Our Little Universe proposal website"
   ```

2. Push to your GitHub repository (public or private).
3. Visit [vercel.com/new](https://vercel.com/new).
4. Import your GitHub repository.
5. Vercel will automatically detect **Vite** as the framework with output directory `dist`.
6. Click **Deploy**. Your custom proposal website will be live in seconds with HTTPS!

---

*Made with all my heart 💗*
