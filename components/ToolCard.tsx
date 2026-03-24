import { Tool } from '@/config/tools'
import { ToolIcon } from './ToolIcon'

export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <a
      href={tool.url}
      className="group block rounded-xl border border-white/10 bg-white/5 p-6 transition-all hover:border-white/25 hover:bg-white/10"
    >
      <ToolIcon
        name={tool.icon}
        className="w-8 h-8 text-gray-400 group-hover:text-blue-400 transition-colors mb-4"
      />
      <h2 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
        {tool.name}
      </h2>
      <p className="mt-2 text-sm text-gray-400">
        {tool.description}
      </p>
    </a>
  )
}
