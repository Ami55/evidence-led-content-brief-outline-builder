import React, { useState } from 'react';
import {
  Download,
  FileText,
  FileSpreadsheet,
  FileJson,
  Copy,
  Check,
  Printer,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { FullBriefProjectState } from '../../types';
import {
  exportFullBriefMarkdown,
  exportOutlineOnlyMarkdown,
  exportToCSV,
  exportToJSON
} from '../../utils/exportHelpers';

interface ReportsExportsViewProps {
  state: FullBriefProjectState;
}

export const ReportsExportsView: React.FC<ReportsExportsViewProps> = ({ state }) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleDownloadMarkdown = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Download className="w-5 h-5 text-teal-600" />
            Reports & Export Center
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Export structured Markdown, segmented CSV tables, JSON backups, or printable editorial handoffs.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="text-xs px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save PDF</span>
        </button>
      </div>

      {/* Main Export Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Card 1: Full Brief Document (Markdown & Text) */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Full Content Brief (Markdown)</h3>
              <p className="text-xs text-slate-500">Complete strategic brief with objectives, metadata, entities & outline.</p>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
            <button
              onClick={() => handleCopy(exportFullBriefMarkdown(state), 'full_brief')}
              className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {copiedType === 'full_brief' ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedType === 'full_brief' ? 'Copied' : 'Copy Markdown'}</span>
            </button>

            <button
              onClick={() => handleDownloadMarkdown(exportFullBriefMarkdown(state), `${state.project.proposedTopic.replace(/\s+/g, '_')}_brief`)}
              className="flex-1 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .md</span>
            </button>
          </div>
        </div>

        {/* Card 2: Outline Only (Markdown) */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Content Outline Only (Markdown)</h3>
              <p className="text-xs text-slate-500">Pure H1/H2/H3 hierarchy with questions answered and guide notes.</p>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
            <button
              onClick={() => handleCopy(exportOutlineOnlyMarkdown(state), 'outline_only')}
              className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {copiedType === 'outline_only' ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedType === 'outline_only' ? 'Copied' : 'Copy Outline'}</span>
            </button>

            <button
              onClick={() => handleDownloadMarkdown(exportOutlineOnlyMarkdown(state), `${state.project.proposedTopic.replace(/\s+/g, '_')}_outline`)}
              className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .md</span>
            </button>
          </div>
        </div>
      </div>

      {/* Segmented CSV Exports */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <div>
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            Segmented CSV Spreadsheets
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">Download individual datasets for analysis in Google Sheets or Excel.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <button
            onClick={() => exportToCSV(state.queryClusters, 'queries_clusters')}
            className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-left text-xs transition-colors flex items-center justify-between group cursor-pointer"
          >
            <div>
              <span className="font-bold text-slate-800 block">Query & Topic Map</span>
              <span className="text-[11px] text-slate-500">{state.queryClusters.length} rows</span>
            </div>
            <Download className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
          </button>

          <button
            onClick={() => exportToCSV(state.entityPlan, 'entity_plan')}
            className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-left text-xs transition-colors flex items-center justify-between group cursor-pointer"
          >
            <div>
              <span className="font-bold text-slate-800 block">Entity Plan</span>
              <span className="text-[11px] text-slate-500">{state.entityPlan.length} rows</span>
            </div>
            <Download className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
          </button>

          <button
            onClick={() => exportToCSV(state.competitorInsights, 'competitor_insights')}
            className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-left text-xs transition-colors flex items-center justify-between group cursor-pointer"
          >
            <div>
              <span className="font-bold text-slate-800 block">Competitor Findings</span>
              <span className="text-[11px] text-slate-500">{state.competitorInsights.length} rows</span>
            </div>
            <Download className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
          </button>

          <button
            onClick={() => exportToCSV(state.internalLinkPlan, 'internal_link_mesh')}
            className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-left text-xs transition-colors flex items-center justify-between group cursor-pointer"
          >
            <div>
              <span className="font-bold text-slate-800 block">Internal-Link Mesh</span>
              <span className="text-[11px] text-slate-500">{state.internalLinkPlan.length} rows</span>
            </div>
            <Download className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
          </button>

          <button
            onClick={() => exportToCSV(state.contentBrief.evidenceRequirements.timeSensitiveFacts, 'source_requirements')}
            className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-left text-xs transition-colors flex items-center justify-between group cursor-pointer"
          >
            <div>
              <span className="font-bold text-slate-800 block">Time-Sensitive Sources</span>
              <span className="text-[11px] text-slate-500">{state.contentBrief.evidenceRequirements.timeSensitiveFacts.length} rows</span>
            </div>
            <Download className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
          </button>

          <button
            onClick={() => exportToJSON(state, `evidence_brief_backup_${Date.now()}`)}
            className="p-3 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg text-left text-xs transition-colors flex items-center justify-between group cursor-pointer"
          >
            <div>
              <span className="font-bold text-teal-900 block">Full JSON State Backup</span>
              <span className="text-[11px] text-teal-700">Restore or re-import</span>
            </div>
            <FileJson className="w-4 h-4 text-teal-700" />
          </button>
        </div>
      </div>
    </div>
  );
};
