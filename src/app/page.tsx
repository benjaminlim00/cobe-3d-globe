import GlobeClient from "@/components/globe/globe-client"

export default function Home() {
  const sampleMarkers = [
    { location: [37.7749, -122.4194] as [number, number], size: 0.03 }, // San Francisco
    { location: [40.7128, -74.006] as [number, number], size: 0.05 }, // New York
    { location: [51.5074, -0.1278] as [number, number], size: 0.04 }, // London
    { location: [35.6762, 139.6503] as [number, number], size: 0.06 }, // Tokyo
    { location: [-33.8688, 151.2093] as [number, number], size: 0.04 }, // Sydney
  ]

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <GlobeClient markers={sampleMarkers} />
    </div>
  )
}
