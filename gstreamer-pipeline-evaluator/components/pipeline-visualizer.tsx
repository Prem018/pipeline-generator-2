"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Circle, Play, Square } from "lucide-react"

// Sample pipeline data
const samplePipeline = {
  name: "Video Processing Pipeline",
  elements: [
    { id: "source", type: "v4l2src", properties: { device: "/dev/video0" } },
    { id: "convert", type: "videoconvert", properties: {} },
    { id: "scale", type: "videoscale", properties: {} },
    { id: "encode", type: "x264enc", properties: { tune: "zerolatency" } },
    { id: "mux", type: "mp4mux", properties: {} },
    { id: "sink", type: "filesink", properties: { location: "output.mp4" } },
  ],
  links: [
    { from: "source", to: "convert" },
    { from: "convert", to: "scale" },
    { from: "scale", to: "encode" },
    { from: "encode", to: "mux" },
    { from: "mux", to: "sink" },
  ],
}

export function PipelineVisualizer() {
  const [pipeline, setPipeline] = useState(samplePipeline)
  const [isRunning, setIsRunning] = useState(false)
  const [activeElement, setActiveElement] = useState<number | null>(null)

  const togglePipeline = () => {
    setIsRunning(!isRunning)
    if (!isRunning) {
      // Reset active element when starting
      setActiveElement(null)
    }
  }

  // Simulate data flowing through the pipeline when running
  useEffect(() => {
    if (!isRunning) {
      setActiveElement(null)
      return
    }

    const interval = setInterval(() => {
      setActiveElement((prev) => {
        if (prev === null) return 0
        return (prev + 1) % pipeline.elements.length
      })
    }, 800)

    return () => clearInterval(interval)
  }, [isRunning, pipeline.elements.length])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Button
          onClick={togglePipeline}
          variant={isRunning ? "destructive" : "default"}
          size="sm"
          className="shadow-sm"
        >
          {isRunning ? <Square className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
          {isRunning ? "Stop Pipeline" : "Run Pipeline"}
        </Button>
        <div className="ml-auto flex items-center gap-2">
          <div className={`status-indicator ${isRunning ? "running" : "pending"}`}>
            <Circle
              className={`h-3 w-3 mr-1 ${isRunning ? "text-blue-500" : "text-gray-400"}`}
              fill={isRunning ? "currentColor" : "none"}
            />
            <span>{isRunning ? "Running" : "Stopped"}</span>
          </div>
        </div>
      </div>

      <div className="border rounded-md p-4 bg-gradient-to-b from-gray-50 to-white shadow-sm">
        <div className="flex flex-wrap gap-4 items-center">
          {pipeline.elements.map((element, index) => (
            <div key={element.id} className="flex items-center">
              <Card className={`pipeline-element ${isRunning && activeElement === index ? "active" : ""}`}>
                <div className="text-sm font-medium">{element.type}</div>
                <div className="text-xs text-gray-500">{element.id}</div>
                {isRunning && activeElement === index && (
                  <div className="mt-1 text-xs text-blue-600">Processing...</div>
                )}
              </Card>

              {index < pipeline.elements.length - 1 && (
                <div className="pipeline-connector">
                  <ArrowRight className="text-gray-400" />
                  {isRunning && activeElement !== null && index === activeElement && (
                    <div className="pipeline-connector-dot"></div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-2">
        <h3 className="text-sm font-medium mb-2">Pipeline Command:</h3>
        <pre className="pipeline-command">
          {`gst-launch-1.0 v4l2src device=/dev/video0 ! videoconvert ! videoscale ! x264enc tune=zerolatency ! mp4mux ! filesink location=output.mp4`}
        </pre>
      </div>

      {isRunning && (
        <div className="mt-2 p-3 bg-blue-50 border border-blue-100 rounded-md">
          <div className="text-sm text-blue-700 flex items-center">
            <Circle className="h-2 w-2 mr-2 animate-pulse fill-current" />
            <span>
              {activeElement !== null
                ? `Processing at: ${pipeline.elements[activeElement]?.type}`
                : "Initializing pipeline..."}
            </span>
          </div>
          <div className="mt-1 text-xs text-blue-600">
            {isRunning && "Pipeline is actively processing data. Monitor metrics in real-time."}
          </div>
        </div>
      )}
    </div>
  )
}
