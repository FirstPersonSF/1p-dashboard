export interface Tool {
  name: string
  description: string
  url: string
  icon: string
}

export const tools: Tool[] = [
  {
    name: "Mission Control",
    description: "Operations dashboard",
    url: "https://mc2.1p.is",
    icon: "gauge",
  },
  {
    name: "Estimator",
    description: "Project estimation tool",
    url: "https://estimator.1p.is",
    icon: "estimator",
  },
  {
    name: "Markdown to Google Docs",
    description: "Convert markdown to Google Docs",
    url: "https://gdocs.1p.is",
    icon: "document",
  },
  {
    name: "Persona Panel",
    description: "First-person feedback from synthetic B2B personas",
    url: "https://persona.1p.is",
    icon: "users",
  },
  {
    name: "Video Narrative Analyzer",
    description: "AI-powered video narrative analysis",
    url: "https://video.tools.1p.is",
    icon: "film",
  },
  {
    name: "Fathom Meeting",
    description: "Meeting analysis dashboard",
    url: "https://fathom.1p.is",
    icon: "microphone",
  },
  {
    name: "Social Builder",
    description: "Social media content builder",
    url: "https://socialbuilder.1p.is",
    icon: "megaphone",
  },
]
