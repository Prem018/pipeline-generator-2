// Pipeline Types
export interface PipelineElement {
  id: string
  type: string
  properties: Record<string, any>
}

export interface PipelineLink {
  from: string
  to: string
}

export interface Pipeline {
  name: string
  elements: PipelineElement[]
  links: PipelineLink[]
}

// Evaluation Types
export interface EvaluationIssue {
  type: "error" | "warning" | "info"
  message: string
  line?: number
}

export interface EvaluationResult {
  valid: boolean
  score: number
  issues: EvaluationIssue[]
  suggestions: string[]
}

export interface EvaluationAgent {
  id: number
  name: string
  description: string
  status: "pending" | "in-progress" | "completed" | "failed"
  score: number | null
  feedback: string | null
}
