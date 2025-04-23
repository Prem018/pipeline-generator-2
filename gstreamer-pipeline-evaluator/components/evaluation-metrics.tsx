"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample performance data
const performanceData = [
  { name: "CPU Usage", value: 35 },
  { name: "Memory", value: 42 },
  { name: "Latency", value: 28 },
  { name: "Throughput", value: 85 },
  { name: "Error Rate", value: 12 },
]

// Sample time series data
const timeSeriesData = [
  { time: "0s", cpu: 10, memory: 20 },
  { time: "10s", cpu: 25, memory: 30 },
  { time: "20s", cpu: 35, memory: 35 },
  { time: "30s", cpu: 30, memory: 40 },
  { time: "40s", cpu: 40, memory: 45 },
  { time: "50s", cpu: 35, memory: 42 },
  { time: "60s", cpu: 30, memory: 40 },
]

export function EvaluationMetrics() {
  const [activeTab, setActiveTab] = useState("performance")
  const [isLoading, setIsLoading] = useState(true)
  const [currentData, setCurrentData] = useState(performanceData)
  const [timeData, setTimeData] = useState(timeSeriesData)
  const [refreshInterval, setRefreshInterval] = useState<NodeJS.Timeout | null>(null)

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Simulate real-time data updates
  useEffect(() => {
    if (activeTab === "timeseries" && !refreshInterval) {
      const interval = setInterval(() => {
        setTimeData((prev) => {
          const newPoint = {
            time: `${Number.parseInt(prev[prev.length - 1].time) + 10}s`,
            cpu: Math.floor(Math.random() * 20) + 25,
            memory: Math.floor(Math.random() * 15) + 35,
          }
          return [...prev.slice(1), newPoint]
        })
      }, 2000)
      setRefreshInterval(interval)
    } else if (activeTab !== "timeseries" && refreshInterval) {
      clearInterval(refreshInterval)
      setRefreshInterval(null)
    }

    return () => {
      if (refreshInterval) clearInterval(refreshInterval)
    }
  }, [activeTab, refreshInterval])

  // Render performance bar chart
  const renderPerformanceChart = () => {
    return (
      <div className="h-[300px] flex items-end space-x-2 pt-6">
        {currentData.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div className="w-full bg-blue-100 rounded-t relative" style={{ height: `${item.value * 2}px` }}>
              <div
                className="absolute bottom-0 w-full bg-blue-500 transition-all duration-1000 ease-out rounded-t"
                style={{ height: `${item.value * 2}px` }}
              ></div>
            </div>
            <div className="text-xs font-medium mt-2 text-center">{item.name}</div>
            <div className="text-xs text-gray-500">{item.value}%</div>
          </div>
        ))}
      </div>
    )
  }

  // Render time series chart
  const renderTimeSeriesChart = () => {
    const maxValue = Math.max(...timeData.flatMap((d) => [d.cpu, d.memory])) * 1.2

    return (
      <div className="h-[300px] relative pt-4">
        <div className="absolute top-0 right-0 bg-blue-100 text-xs px-2 py-1 rounded-full text-blue-800 font-medium">
          Live updating...
        </div>

        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 w-10 flex flex-col justify-between text-xs text-gray-500 py-6">
          <div>100%</div>
          <div>75%</div>
          <div>50%</div>
          <div>25%</div>
          <div>0%</div>
        </div>

        {/* Chart grid */}
        <div className="ml-10 h-full flex flex-col justify-between">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="border-t border-gray-200 w-full h-0"></div>
          ))}
        </div>

        {/* CPU line */}
        <svg
          className="absolute top-0 left-10 right-0 bottom-0 h-full w-[calc(100%-2.5rem)]"
          viewBox={`0 0 ${timeData.length - 1} 100`}
          preserveAspectRatio="none"
        >
          <polyline
            points={timeData.map((d, i) => `${i}, ${100 - (d.cpu / maxValue) * 100}`).join(" ")}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
          />
        </svg>

        {/* Memory line */}
        <svg
          className="absolute top-0 left-10 right-0 bottom-0 h-full w-[calc(100%-2.5rem)]"
          viewBox={`0 0 ${timeData.length - 1} 100`}
          preserveAspectRatio="none"
        >
          <polyline
            points={timeData.map((d, i) => `${i}, ${100 - (d.memory / maxValue) * 100}`).join(" ")}
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
          />
        </svg>

        {/* X-axis labels */}
        <div className="absolute left-10 right-0 bottom-0 flex justify-between text-xs text-gray-500">
          {timeData
            .filter((_, i) => i % 2 === 0)
            .map((d, i) => (
              <div key={i}>{d.time}</div>
            ))}
        </div>

        {/* Legend */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
            <span>CPU</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
            <span>Memory</span>
          </div>
        </div>
      </div>
    )
  }

  // Render evaluation scores
  const renderScores = () => {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 metric-card">
            <div className="text-sm text-gray-500">Overall Score</div>
            <div className="text-3xl font-bold mt-1 text-blue-600">87/100</div>
          </Card>
          <Card className="p-4 metric-card">
            <div className="text-sm text-gray-500">Efficiency Rating</div>
            <div className="text-3xl font-bold mt-1 text-blue-600">A-</div>
          </Card>
        </div>

        <div className="space-y-4 mt-6">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Performance</span>
              <span className="text-sm font-medium">85%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-blue-500 h-2.5 rounded-full transition-all duration-1000 shadow-inner"
                style={{ width: isLoading ? "0%" : "85%" }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Correctness</span>
              <span className="text-sm font-medium">92%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-green-500 h-2.5 rounded-full transition-all duration-1000 shadow-inner"
                style={{ width: isLoading ? "0%" : "92%" }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Resource Usage</span>
              <span className="text-sm font-medium">78%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-yellow-500 h-2.5 rounded-full transition-all duration-1000 shadow-inner"
                style={{ width: isLoading ? "0%" : "78%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Tabs defaultValue="performance" className="w-full" onValueChange={setActiveTab}>
      <TabsList className="grid grid-cols-3 mb-4">
        <TabsTrigger value="performance">Performance</TabsTrigger>
        <TabsTrigger value="timeseries">Time Series</TabsTrigger>
        <TabsTrigger value="scores">Evaluation Scores</TabsTrigger>
      </TabsList>

      <TabsContent value="performance" className="min-h-[300px]">
        {isLoading ? (
          <div className="h-[300px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          renderPerformanceChart()
        )}
      </TabsContent>

      <TabsContent value="timeseries" className="min-h-[300px]">
        {isLoading ? (
          <div className="h-[300px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          renderTimeSeriesChart()
        )}
      </TabsContent>

      <TabsContent value="scores" className="min-h-[300px]">
        {isLoading ? (
          <div className="h-[300px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          renderScores()
        )}
      </TabsContent>
    </Tabs>
  )
}
