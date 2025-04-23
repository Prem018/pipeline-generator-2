"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"

// Sample pipeline definition
const samplePipelineDefinition = `# GStreamer Pipeline Definition
v4l2src device=/dev/video0 ! 
  videoconvert ! 
  videoscale ! 
  video/x-raw,width=1280,height=720 ! 
  x264enc tune=zerolatency ! 
  mp4mux ! 
  filesink location=output.mp4`

export function PipelineEvaluator() {
  const [pipelineDefinition, setPipelineDefinition] = useState(samplePipelineDefinition)
  const [evaluationResults, setEvaluationResults] = useState(null)
  const [isEvaluating, setIsEvaluating] = useState(false)
  const [evaluationProgress, setEvaluationProgress] = useState(0)
  const [activeTab, setActiveTab] = useState("pipeline")

  // Reset evaluation
  const resetEvaluation = () => {
    setEvaluationResults(null)
    setEvaluationProgress(0)
    setActiveTab("pipeline")
  }

  // Run evaluation with progress updates
  const runEvaluation = () => {
    resetEvaluation()
    setIsEvaluating(true)
    setEvaluationProgress(0)

    // Simulate evaluation process with progress updates
    const progressInterval = setInterval(() => {
      setEvaluationProgress((prev) => {
        const newProgress = prev + 5
        if (newProgress >= 100) {
          clearInterval(progressInterval)

          // Set results after progress reaches 100%
          setTimeout(() => {
            setEvaluationResults({
              valid: true,
              score: 87,
              issues: [
                {
                  type: "warning",
                  message:
                    "No queue elements found. Consider adding queue elements for better performance on multi-core systems.",
                  line: 3,
                },
                {
                  type: "info",
                  message: "Consider using hardware acceleration if available on target device.",
                  line: 5,
                },
              ],
              suggestions: [
                "Add queue elements between processing stages",
                "Consider using hardware-accelerated encoders if available",
                "Add rate control parameters to x264enc for better quality/size tradeoff",
              ],
            })
            setIsEvaluating(false)
            setActiveTab("results")
          }, 500)
        }
        return newProgress
      })
    }, 100)
  }

  // Highlight specific lines in the pipeline definition
  const highlightPipeline = () => {
    if (!evaluationResults) return pipelineDefinition

    const lines = pipelineDefinition.split("\n")
    const highlightedLines = lines.map((line, index) => {
      const lineNumber = index + 1
      const issue = evaluationResults.issues.find((i) => i.line === lineNumber)

      if (issue) {
        const className = issue.type === "warning" ? "highlight-warning" : "highlight-info"
        return `<span class="${className}">${line}</span>`
      }
      return line
    })

    return highlightedLines.join("\n")
  }

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="pipeline">Pipeline Definition</TabsTrigger>
          <TabsTrigger value="results" disabled={!evaluationResults && !isEvaluating}>
            Evaluation Results
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pipeline" className="space-y-4">
          <Textarea
            value={pipelineDefinition}
            onChange={(e) => setPipelineDefinition(e.target.value)}
            className="font-mono h-[200px] border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            placeholder="Enter GStreamer pipeline definition..."
          />

          <div className="flex gap-2">
            <Button
              onClick={runEvaluation}
              disabled={isEvaluating || !pipelineDefinition.trim()}
              className="flex-1 shadow-sm"
            >
              {isEvaluating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Evaluating...
                </>
              ) : (
                "Evaluate Pipeline"
              )}
            </Button>

            {evaluationResults && (
              <Button onClick={resetEvaluation} variant="outline" className="shadow-sm">
                Reset
              </Button>
            )}
          </div>

          {isEvaluating && (
            <div className="evaluation-progress">
              <div className="flex justify-between text-sm">
                <span>Analyzing pipeline...</span>
                <span>{evaluationProgress}%</span>
              </div>
              <Progress value={evaluationProgress} className="h-2 my-2" />
              <div className="evaluation-step active">
                {evaluationProgress < 30 && "Parsing pipeline structure..."}
                {evaluationProgress >= 30 && evaluationProgress < 60 && "Analyzing element configurations..."}
                {evaluationProgress >= 60 && evaluationProgress < 90 && "Evaluating performance characteristics..."}
                {evaluationProgress >= 90 && "Generating recommendations..."}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="results">
          {isEvaluating ? (
            <div className="h-[300px] flex flex-col items-center justify-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              <div className="text-center">
                <div className="font-medium">Evaluating Pipeline</div>
                <div className="text-sm text-gray-500">This may take a moment...</div>
              </div>
              <Progress value={evaluationProgress} className="w-64 h-2" />
              <div className="text-xs text-gray-500">{evaluationProgress}%</div>
            </div>
          ) : (
            evaluationResults && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md border">
                  {evaluationResults.valid ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  )}
                  <span className="font-medium">{evaluationResults.valid ? "Valid Pipeline" : "Invalid Pipeline"}</span>
                  <div className="ml-auto bg-blue-100 px-3 py-1 rounded-full text-sm font-medium text-blue-800">
                    Score: {evaluationResults.score}/100
                  </div>
                </div>

                <Card className="p-4 overflow-auto shadow-sm">
                  <h3 className="text-sm font-medium mb-2">Pipeline Analysis</h3>
                  <pre
                    className="text-xs font-mono bg-gray-50 p-3 rounded whitespace-pre-wrap border"
                    dangerouslySetInnerHTML={{ __html: highlightPipeline() }}
                  />
                </Card>

                {evaluationResults.issues.length > 0 && (
                  <Card className="p-4 shadow-sm">
                    <h3 className="text-sm font-medium mb-2">Issues & Warnings</h3>
                    <div className="space-y-2">
                      {evaluationResults.issues.map((issue, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm">
                          <div
                            className={`mt-0.5 h-2 w-2 rounded-full ${issue.type === "warning" ? "bg-yellow-500" : "bg-blue-500"}`}
                          />
                          <div>
                            <p>{issue.message}</p>
                            <p className="text-xs text-gray-500">Line {issue.line}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {evaluationResults.suggestions.length > 0 && (
                  <Card className="p-4 shadow-sm">
                    <h3 className="text-sm font-medium mb-2">Optimization Suggestions</h3>
                    <ul className="space-y-1 text-sm">
                      {evaluationResults.suggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-gray-400">•</span>
                          <span>{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                )}
              </div>
            )
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
