"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Bot, Check, Clock, RefreshCw, X } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const initialAgents = [
  {
    id: 1,
    name: "Performance Evaluator",
    description: "Evaluates pipeline performance metrics",
    status: "pending",
    progress: 0,
    score: null,
    feedback: null,
  },
  {
    id: 2,
    name: "Correctness Validator",
    description: "Validates pipeline output correctness",
    status: "pending",
    progress: 0,
    score: null,
    feedback: null,
  },
  {
    id: 3,
    name: "Resource Optimizer",
    description: "Suggests optimizations for resource usage",
    status: "pending",
    progress: 0,
    score: null,
    feedback: null,
  },
  {
    id: 4,
    name: "Edge Compatibility Checker",
    description: "Checks compatibility with edge devices",
    status: "pending",
    progress: 0,
    score: null,
    feedback: null,
  },
]

const feedbackMessages = [
  "Pipeline shows good performance characteristics with acceptable CPU and memory usage. Latency is within acceptable range for real-time processing.",
  "Pipeline correctly processes the video stream with proper element connections. All format conversions are handled appropriately.",
  "Resource usage is optimized, but consider adding queue elements between processing stages for better performance on multi-core systems.",
  "Pipeline is compatible with most edge devices, but hardware acceleration could be utilized more effectively on supported platforms.",
]

export function AgentEvaluationPanel() {
  const [agents, setAgents] = useState(initialAgents)
  const [isRunningAll, setIsRunningAll] = useState(false)
  const [currentAgent, setCurrentAgent] = useState<number | null>(null)

  // Reset agents to initial state
  const resetAgents = () => {
    setAgents(initialAgents)
    setCurrentAgent(null)
  }

  // Run a single agent evaluation
  const runSingleAgent = (agentId: number) => {
    if (isRunningAll) return

    setAgents((prev) =>
      prev.map((agent) => (agent.id === agentId ? { ...agent, status: "in-progress", progress: 0 } : agent)),
    )
    setCurrentAgent(agentId)

    // Simulate progress updates
    const progressInterval = setInterval(() => {
      setAgents((prev) => {
        const updatedAgents = prev.map((agent) => {
          if (agent.id === agentId && agent.status === "in-progress") {
            const newProgress = Math.min(agent.progress + 10, 100)
            return {
              ...agent,
              progress: newProgress,
              status: newProgress === 100 ? "completed" : "in-progress",
              score: newProgress === 100 ? Math.floor(Math.random() * 20) + 75 : null,
              feedback: newProgress === 100 ? feedbackMessages[agent.id - 1] : null,
            }
          }
          return agent
        })

        // Check if the current agent is complete
        const currentAgent = updatedAgents.find((a) => a.id === agentId)
        if (currentAgent?.status === "completed") {
          clearInterval(progressInterval)
          setCurrentAgent(null)
        }

        return updatedAgents
      })
    }, 300)

    return () => clearInterval(progressInterval)
  }

  // Run all agent evaluations
  const runAllEvaluations = () => {
    resetAgents()
    setIsRunningAll(true)

    // Run agents in sequence
    const runAgentsInSequence = async () => {
      for (let i = 0; i < agents.length; i++) {
        const agentId = agents[i].id
        setCurrentAgent(agentId)

        setAgents((prev) =>
          prev.map((agent) => (agent.id === agentId ? { ...agent, status: "in-progress", progress: 0 } : agent)),
        )

        // Simulate agent evaluation with progress
        for (let progress = 0; progress <= 100; progress += 5) {
          await new Promise((resolve) => setTimeout(resolve, 100))

          setAgents((prev) =>
            prev.map((agent) =>
              agent.id === agentId
                ? {
                    ...agent,
                    progress,
                    status: progress === 100 ? "completed" : "in-progress",
                    score: progress === 100 ? Math.floor(Math.random() * 20) + 75 : null,
                    feedback: progress === 100 ? feedbackMessages[agent.id - 1] : null,
                  }
                : agent,
            ),
          )
        }
      }

      setCurrentAgent(null)
      setIsRunningAll(false)
    }

    runAgentsInSequence()
  }

  const getStatusIcon = (status, progress) => {
    switch (status) {
      case "completed":
        return <Check className="h-5 w-5 text-green-500" />
      case "in-progress":
        return <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />
      case "failed":
        return <X className="h-5 w-5 text-red-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-400" />
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          {agents.filter((a) => a.status === "completed").length} of {agents.length} evaluations completed
        </div>
        <div className="flex gap-2">
          <Button onClick={resetAgents} variant="outline" size="sm" disabled={isRunningAll} className="shadow-sm">
            Reset
          </Button>
          <Button onClick={runAllEvaluations} disabled={isRunningAll} size="sm" className="shadow-sm">
            {isRunningAll ? "Running..." : "Run All Evaluations"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {agents.map((agent) => (
          <Card key={agent.id} className="p-4 relative overflow-hidden agent-card">
            {agent.status === "in-progress" && (
              <div className="agent-progress-bar" style={{ width: `${agent.progress}%` }}></div>
            )}

            <div className="flex items-start gap-3">
              <div className="bg-gray-100 p-2 rounded-full">
                <Bot className="h-5 w-5 text-gray-600" />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{agent.name}</h3>
                  {getStatusIcon(agent.status, agent.progress)}
                </div>
                <p className="text-sm text-gray-500 mt-1">{agent.description}</p>

                {agent.status === "in-progress" && (
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Evaluating...</span>
                      <span>{agent.progress}%</span>
                    </div>
                    <Progress value={agent.progress} className="h-1" />
                  </div>
                )}

                {agent.status === "completed" && (
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Score:</span>
                      <span className="font-medium text-blue-600">{agent.score}/100</span>
                    </div>
                    <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded border border-gray-100">
                      {agent.feedback}
                    </p>
                  </div>
                )}

                {agent.status === "pending" && (
                  <div className="mt-3">
                    <Button
                      onClick={() => runSingleAgent(agent.id)}
                      variant="outline"
                      size="sm"
                      className="w-full shadow-sm hover:bg-blue-50"
                      disabled={isRunningAll || currentAgent !== null}
                    >
                      Run Evaluation
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
