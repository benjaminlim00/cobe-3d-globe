"use client"

// Import necessary React hooks and libraries
import { useEffect, useRef, useState } from "react"
import createGlobe from "cobe" // 3D globe rendering library
import { useSpring } from "react-spring" // Animation library for smooth interactions

// Define the structure for globe markers (points on the globe)
interface MarkerProps {
  location: [number, number] // [latitude, longitude] coordinates
  size: number // Size of the marker dot
}

/**
 * Only renders the globe when WebGL is supported
 */
export default function GlobeClient({ markers }: { markers: MarkerProps[] }) {
  // State to track if user's browser supports WebGL (required for 3D rendering)
  const [webglSupported, setWebglSupported] = useState(true)

  // Check WebGL support on component mount
  useEffect(() => {
    try {
      // Create a test canvas to check WebGL support
      const canvas = window.document.createElement("canvas")
      const ctx =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl")

      // Try to access WebGL methods to confirm support
      if (ctx && "getSupportedExtensions" in ctx) {
        ;(ctx as WebGLRenderingContext).getSupportedExtensions()
      }
    } catch {
      // If any error occurs, WebGL is not supported
      setWebglSupported(false)
      return
    }
  }, [])

  return (
    <>
      {/* Only render globe if WebGL is supported and component is visible */}
      {webglSupported ? (
        <GlobeAnimation markers={markers || []} />
      ) : (
        "This browser does not support WebGL"
      )}
    </>
  )
}

/**
 * The actual 3D globe animation component
 * Handles globe rendering, user interactions, and smooth animations
 */
const GlobeAnimation = ({ markers }: { markers: MarkerProps[] }) => {
  // Reference to the canvas element where the globe is drawn
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Track mouse/touch interaction state for drag rotation
  const pointerInteracting = useRef<number | null>(null) // X position when drag started
  const pointerInteractionMovement = useRef(0) // Current drag distance

  // React Spring animation for smooth globe rotation during user interaction
  const [{ r }, api] = useSpring(() => ({
    r: 0, // Rotation value (radians)
    config: {
      mass: 1, // Animation mass (affects momentum)
      tension: 280, // Spring tension (affects speed)
      friction: 60, // Friction (affects damping)
      precision: 0.001, // Animation precision threshold
    },
  }))

  // Main effect that creates and configures the 3D globe
  useEffect(() => {
    if (!canvasRef.current) return

    // Globe rotation angle (phi controls horizontal rotation)
    let phi = -0.5 // Initial rotation position
    let width = 0 // Canvas width (updated on resize)

    // Handle window resize to keep globe responsive
    const onResize = () =>
      canvasRef.current && (width = canvasRef.current.offsetWidth)
    window.addEventListener("resize", onResize)
    onResize() // Set initial width

    // Create the globe with configuration options
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 1, // Pixel density (1 = standard, 2 = high DPI)
      width, // Canvas width
      height: width, // Canvas height (square aspect ratio)
      phi, // Initial horizontal rotation
      theta: 0.15, // Vertical tilt angle
      dark: 1.0, // Dark mode (0 = light, 1 = dark)
      diffuse: 1.2, // Light diffusion intensity
      scale: 1.0, // Globe scale (zoom level)
      mapSamples: 8000, // Number of points to render (higher = more detail)
      mapBrightness: 6.0, // Brightness of the landmasses
      baseColor: [0.235, 0.235, 0.235], // RGB color of the globe surface (#3c3c3c)
      markerColor: [1, 0, 0.5], // Hot pink color for markers (#ff0080)
      offset: [0, 0], // Globe position offset [x, y]
      glowColor: [1, 1, 1], // White glow effect (#ffffff)
      opacity: 0.6, // Globe opacity
      markers: markers || [], // Array of markers to display on globe

      // Animation loop - called on every frame
      onRender: (state) => {
        phi += 0.002 // Auto-rotate the globe slowly
        state.phi = phi + r.get() // Add user interaction rotation
        state.width = width // Update canvas dimensions
        state.height = width
      },
    })

    // Fade in the globe after it's created
    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1"
      }
    })

    // Cleanup: destroy globe when component unmounts or dependencies change
    return () => globe.destroy()
  }, [markers, r]) // Re-run when markers or rotation animation changes

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 1000, // Maximum globe size
        aspectRatio: "1", // Keep it perfectly square
      }}
    >
      {/* The HTML5 canvas where the 3D globe is rendered */}
      <canvas
        ref={canvasRef}
        // {/* Mouse/Touch Event Handlers for Interactive Rotation */}
        // When user starts dragging (mouse down or touch start)
        onPointerDown={(e) => {
          // Record the starting X position for drag calculation
          pointerInteracting.current =
            e.clientX - pointerInteractionMovement.current
          // Change cursor to indicate dragging state
          if (canvasRef.current) {
            canvasRef.current.style.cursor = "grabbing"
          }
        }}
        // When user releases drag (mouse up or touch end)
        onPointerUp={() => {
          pointerInteracting.current = null // Stop tracking drag
          // Reset cursor to grab state
          if (canvasRef.current) {
            canvasRef.current.style.cursor = "grab"
          }
        }}
        // When pointer leaves the canvas area
        onPointerOut={() => {
          pointerInteracting.current = null // Stop tracking drag
          // Reset cursor to grab state
          if (canvasRef.current) {
            canvasRef.current.style.cursor = "grab"
          }
        }}
        // Handle mouse movement during drag (desktop)
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            // Calculate how far the mouse has moved since drag started
            const delta = e.clientX - pointerInteracting.current
            pointerInteractionMovement.current = delta
            // Update the spring animation with new rotation value
            // Divide by 200 to make rotation less sensitive on desktop
            api.start({
              r: delta / 200,
            })
          }
        }}
        // Handle touch movement during drag (mobile/tablet)
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            // Calculate touch movement distance
            const delta = e.touches[0].clientX - pointerInteracting.current
            pointerInteractionMovement.current = delta
            // Update spring animation - divide by 100 for more sensitivity on touch
            api.start({
              r: delta / 100,
            })
          }
        }}
        style={{
          width: "100%",
          height: "100%",
          contain: "layout paint size", // Optimize rendering performance
          opacity: 0, // Start invisible (faded in by setTimeout)
          transition: "opacity 1s ease", // Smooth fade-in transition
        }}
      />
    </div>
  )
}
