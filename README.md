# 🌍 Interactive 3D Globe

A beautiful, interactive 3D globe built with Next.js, TypeScript, and the Cobe library. Features smooth animations, drag-to-rotate functionality, and customizable markers.

![Globe Preview](https://img.shields.io/badge/Next.js-15.4.3-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?logo=tailwind-css)

## ✨ Features

- **Interactive 3D Globe**: Drag to rotate with smooth animations
- **WebGL Rendering**: High-performance 3D graphics using the Cobe library
- **Responsive Design**: Adapts to all screen sizes and devices
- **Touch Support**: Works seamlessly on mobile and tablet devices
- **Performance Optimized**: WebGL fallback detection for unsupported browsers
- **Customizable Markers**: Add location markers with custom sizes and colors
- **Dark Theme**: Stylish dark globe with customizable appearance
- **TypeScript**: Full type safety and excellent developer experience

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd 3d-globe
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Customization

### Adding Markers

Markers represent locations on the globe. Add them to your component:

```typescript
const markers = [
  { location: [37.7749, -122.4194], size: 0.03 }, // San Francisco
  { location: [40.7128, -74.006], size: 0.05 }, // New York
  { location: [51.5074, -0.1278], size: 0.04 }, // London
  { location: [35.6762, 139.6503], size: 0.06 }, // Tokyo
  { location: [-33.8688, 151.2093], size: 0.04 }, // Sydney
]

;<GlobeClient markers={markers} />
```

### Globe Configuration

Customize the globe appearance in `src/components/globe/globe-client.tsx`:

```typescript
const globe = createGlobe(canvasRef.current, {
  phi: -0.5, // Horizontal rotation
  theta: 0.15, // Vertical tilt
  dark: 1.0, // Dark mode (0-1)
  mapSamples: 8000, // Detail level
  mapBrightness: 6.0, // Landmass brightness
  baseColor: [0.235, 0.235, 0.235], // Globe surface color
  markerColor: [1, 0, 0.5], // Marker color (hot pink)
  glowColor: [1, 1, 1], // Glow effect color
  opacity: 0.6, // Globe transparency
  scale: 1.0, // Globe size
  // ... more options
})
```

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page with globe
├── components/
│   ├── globe/
│   │   └── globe-client.tsx # Main globe component
│   └── shared/
│       └── icons.tsx        # Icon components
└── lib/
    └── hooks/
        └── use-intersection-observer.ts # Performance optimization hook
```

## 🛠️ Built With

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Cobe](https://github.com/shuding/cobe)** - WebGL globe rendering library
- **[React Spring](https://www.react-spring.dev/)** - Physics-based animations
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework

## ⚡ Performance Features

- **WebGL Detection**: Graceful fallback for unsupported browsers
- **Optimized Rendering**: Uses `contain: "layout paint size"` for better performance
- **Responsive Canvas**: Automatically adjusts to container size
- **Spring Animations**: Smooth, physics-based interactions

## 🎮 Interactions

- **Drag to Rotate**: Click and drag to spin the globe
- **Touch Support**: Pinch and drag on mobile devices
- **Auto Rotation**: Globe slowly rotates automatically
- **Smooth Animations**: Physics-based spring animations for natural feel

## 🔧 Configuration Options

| Property        | Type            | Default | Description               |
| --------------- | --------------- | ------- | ------------------------- |
| `markers`       | `MarkerProps[]` | `[]`    | Array of location markers |
| `phi`           | `number`        | `-0.5`  | Horizontal rotation angle |
| `theta`         | `number`        | `0.15`  | Vertical tilt angle       |
| `dark`          | `number`        | `1.0`   | Dark mode intensity (0-1) |
| `mapSamples`    | `number`        | `8000`  | Rendering detail level    |
| `mapBrightness` | `number`        | `6.0`   | Landmass brightness       |
| `opacity`       | `number`        | `0.6`   | Globe transparency        |

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers with WebGL support

## 🚀 Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Inspiration: [dubinc/dub globe-client.tsx](https://github.com/dubinc/dub/blob/37634e5c1fdfb8a614e1f634c20447451370fc0d/app/ui/home/globe-client.tsx#L60)
