import { PipelineEvaluator } from "@/components/pipeline-evaluator"
import { PipelineVisualizer } from "@/components/pipeline-visualizer"
import { EvaluationMetrics } from "@/components/evaluation-metrics"
import { AgentEvaluationPanel } from "@/components/agent-evaluation-panel"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                Intelligent Pipeline Generator Evaluation
              </h1>
              <p className="mt-1 text-lg text-gray-500">
                Automated evaluation framework for GStreamer pipeline generation
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                Evaluation Framework
              </span>
            </div>
          </div>
          <div className="mt-6 border-b border-gray-200"></div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <section className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-blue-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z"
                    clipRule="evenodd"
                  />
                </svg>
                Pipeline Visualization
              </h2>
            </div>
            <div className="px-6 pb-6">
              <PipelineVisualizer />
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-blue-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 000 2h10a1 1 0 100-2H3zm0 4a1 1 0 000 2h6a1 1 0 100-2H3zm0 4a1 1 0 100 2h8a1 1 0 100-2H3z"
                    clipRule="evenodd"
                  />
                </svg>
                Evaluation Metrics
              </h2>
            </div>
            <div className="px-6 pb-6">
              <EvaluationMetrics />
            </div>
          </section>
        </div>

        <section className="bg-white rounded-xl shadow-sm border overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-blue-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 005 10a1 1 0 10-2 0c0 2.34 1.235 4.391 3.088 5.545A6.977 6.977 0 0010 18a6.977 6.977 0 004.912-1.455A7.025 7.025 0 0017 10a1 1 0 10-2 0 5.03 5.03 0 01-.532 2.251 5 5 0 00-4.468-2.251z"
                  clipRule="evenodd"
                />
              </svg>
              Agent-Based Evaluation
            </h2>
          </div>
          <div className="px-6 pb-6">
            <AgentEvaluationPanel />
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-blue-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
              Pipeline Evaluator
            </h2>
          </div>
          <div className="px-6 pb-6">
            <PipelineEvaluator />
          </div>
        </section>
      </div>
    </main>
  )
}
