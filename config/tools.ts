export interface Tool {
  name: string
  description: string
  url: string
}

export const tools: Tool[] = [
  { name: "Social Builder", description: "Social media content builder", url: "https://socialbuilder.1p.is" },
  { name: "Fathom Meeting", description: "Meeting analysis dashboard", url: "https://dashboard2-production-faa3.up.railway.app" },
  { name: "Markdown to Google Docs", description: "Convert markdown to Google Docs", url: "https://md-to-gdocs-frontend-production.up.railway.app" },
  { name: "Mission Control", description: "Operations dashboard", url: "https://mc2.1p.is" },
  { name: "Video Narrative Analyzer", description: "AI-powered video narrative analysis", url: "https://video.tools.1p.is" },
]
