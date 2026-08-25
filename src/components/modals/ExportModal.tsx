import React, { useState } from 'react';
import {
  X,
  Download,
  FileText,
  FileSpreadsheet,
  FileJson,
  Copy,
  Check,
  Printer,
  Sparkles
} from 'lucide-react';
import { FullBriefProjectState } from '../../types';
import {
  exportFullBriefMarkdown,
  exportOutlineOnlyMarkdown,
  exportToCSV,
  exportToJSON
} from '../../utils/exportHelpers';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: FullBriefProjectState;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  state
}) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleDownloadMd = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Download className="w-5 h-5 text-teal-600" />
            <h2 className="text-base font-bold text-slate-900">Export Content Brief & Outline</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
          {/* Option 1: Full Brief Markdown */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 block">Full Content Brief (Markdown)</span>
                <span className="text-[11px] text-slate-500">Includes metadata, intent, entities, sources, and full outline</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(exportFullBriefMarkdown(state), 'full_md')}
                  className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 rounded font-medium text-slate-700 flex items-center gap-1 cursor-pointer"
                >
                  {copiedType === 'full_md' ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedType === 'full_md' ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  onClick={() => handleDownloadMd(exportFullBriefMarkdown(state), `${state.project.proposedTopic.replace(/\s+/g, '_')}_brief`)}
                  className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .md</span>
                </button>
              </div>
            </div>
          </div>

          {/* Option 2: Outline Only */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 block">Content Outline Only (Markdown)</span>
                <span className="text-[11px] text-slate-500">Pure H1/H2 structure with question bullets and guide notes</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(exportOutlineOnlyMarkdown(state), 'outline_md')}
                  className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 rounded font-medium text-slate-700 flex items-center gap-1 cursor-pointer"
                >
                  {copiedType === 'outline_md' ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedType === 'outline_md' ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  onClick={() => handleDownloadMd(exportOutlineOnlyMarkdown(state), `${state.project.proposedTopic.replace(/\s+/g, '_')}_outline`)}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .md</span>
                </button>
              </div>
            </div>
          </div>

          {/* Option 3: CSV Spreadsheets */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <span className="font-bold text-slate-900 block">Download CSV Datasets</span>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => exportToCSV(state.queryClusters, 'query_clusters')}
                className="p-2 bg-white hover:bg-slate-100 border border-slate-200 rounded font-medium text-slate-700 text-left flex items-center justify-between cursor-pointer"
              >
                <span>Query Clusters ({state.queryClusters.length})</span>
                <Download className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                onClick={() => exportToCSV(state.entityPlan, 'entity_plan')}
                className="p-2 bg-white hover:bg-slate-100 border border-slate-200 rounded font-medium text-slate-700 text-left flex items-center justify-between cursor-pointer"
              >
                <span>Entity Plan ({state.entityPlan.length})</span>
                <Download className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                onClick={() => exportToCSV(state.competitorInsights, 'competitors')}
                className="p-2 bg-white hover:bg-slate-100 border border-slate-200 rounded font-medium text-slate-700 text-left flex items-center justify-between cursor-pointer"
              >
                <span>Competitors ({state.competitorInsights.length})</span>
                <Download className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                onClick={() => exportToCSV(state.internalLinkPlan, 'internal_links')}
                className="p-2 bg-white hover:bg-slate-100 border border-slate-200 rounded font-medium text-slate-700 text-left flex items-center justify-between cursor-pointer"
              >
                <span>Internal Links ({state.internalLinkPlan.length})</span>
                <Download className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Option 4: Full JSON State */}
          <div className="p-4 bg-teal-50/60 border border-teal-200 rounded-xl flex items-center justify-between">
            <div>
              <span className="font-bold text-teal-950 block">Complete JSON State Backup</span>
              <span className="text-[11px] text-teal-800">Export full project data for re-import or version control</span>
            </div>
            <button
              onClick={() => exportToJSON(state, `brief_state_${Date.now()}`)}
              className="px-3 py-1.5 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
