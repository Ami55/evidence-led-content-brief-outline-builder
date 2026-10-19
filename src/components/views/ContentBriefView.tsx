import React, { useState } from 'react';
import {
  FileText,
  Copy,
  Check,
  Download,
  Printer,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  BookOpen,
  Calendar
} from 'lucide-react';
import { FullBriefProjectState } from '../../types';
import { exportFullBriefMarkdown } from '../../utils/exportHelpers';

interface ContentBriefViewProps {
  state: FullBriefProjectState;
  onUpdateState: (updater: (prev: FullBriefProjectState) => FullBriefProjectState) => void;
  onOpenExportModal: () => void;
}

export const ContentBriefView: React.FC<ContentBriefViewProps> = ({
  state,
  onUpdateState,
  onOpenExportModal
}) => {
  const { contentBrief, project, decision, audienceAndIntent } = state;
  const [copied, setCopied] = useState(false);

  const handleCopyMarkdown = () => {
    const md = exportFullBriefMarkdown(state);
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleCriterion = (index: number) => {
    // Just a visual toggle in state if needed or local
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header & Quick Actions */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-teal-600" />
              Content Brief
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded bg-teal-50 text-teal-800 font-semibold border border-teal-200">
              Writer Ready
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            The canonical planning document with explicit intent, boundaries, source requirements, and editorial guardrails.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyMarkdown}
            className="text-xs px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Brief' : 'Copy Brief (Markdown)'}</span>
          </button>
          <button
            onClick={onOpenExportModal}
            className="text-xs px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Brief</span>
          </button>
        </div>
      </div>

      {/* Brief Document Container */}
      <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-xs space-y-8">
        {/* Document Title Header */}
        <div className="border-b border-slate-200 pb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-700 block mb-1">
            Editorial Planning Document
          </span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            {project.proposedTopic}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-3">
            <span><strong>Target Domain:</strong> {project.targetDomain}</span>
            <span><strong>Action:</strong> {decision.action}</span>
            <span><strong>Target URL:</strong> {decision.recommendedTargetUrl}</span>
            <span><strong>Canonical:</strong> {decision.canonicalKeepUrl}</span>
          </div>
        </div>

        {/* Section 1: Executive Purpose & Strategic Objective */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-teal-800 flex items-center gap-2">
            1. Strategic Objective & Role
          </h3>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
            <p className="text-slate-800 leading-relaxed font-medium">
              <strong>Core Objective: </strong>{project.businessObjective}
            </p>
            <p className="text-slate-600 leading-relaxed">
              <strong>Site Architecture Role: </strong>Acts as a high-utility logistical asset for mature travellers and seniors visiting Montreal. Resolves high-friction transit, pass, and elevation questions, positioning private guided transport as the premier stress-free upgrade.
            </p>
          </div>
        </div>

        {/* Section 2: Audience & Intent Profile */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-teal-800 flex items-center gap-2">
            2. Audience & Intent Profile
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
              <span className="font-bold text-slate-800 block">Primary Audience:</span>
              <p className="text-slate-700">{audienceAndIntent.primaryAudience}</p>
              <span className="font-bold text-slate-800 block mt-2">Traveller Context:</span>
              <p className="text-slate-600">{audienceAndIntent.travellerContext}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
              <span className="font-bold text-slate-800 block">Primary Search Intent:</span>
              <p className="text-slate-700">{audienceAndIntent.primarySearchIntent} ({audienceAndIntent.journeyStage} stage)</p>
              <span className="font-bold text-slate-800 block mt-2">Desired Action:</span>
              <p className="text-teal-800 font-medium">{audienceAndIntent.desiredNextAction}</p>
            </div>
          </div>
        </div>

        {/* Section 3: Scope Boundaries */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-teal-800 flex items-center gap-2">
            3. Scope Boundaries (In-Scope vs Out-of-Scope)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200 space-y-2">
              <span className="font-bold text-emerald-900 block">Must Answer (In-Scope):</span>
              <ul className="list-disc list-inside space-y-1 text-emerald-800">
                {audienceAndIntent.questionsMustAnswer.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200 space-y-2">
              <span className="font-bold text-amber-900 block">Belongs Elsewhere (Out-of-Scope):</span>
              <ul className="space-y-1 text-amber-800">
                {audienceAndIntent.questionsBelongElsewhere.map((item, i) => (
                  <li key={i}>
                    <strong>"{item.question}"</strong> → Route to <code>{item.targetPage}</code>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Section 4: Editorial Standards & Independent Guide Platform Rules */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-teal-800 flex items-center gap-2">
            4. Editorial & Style Guidelines
          </h3>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <span className="font-bold text-slate-800 block mb-1">Tone of Voice:</span>
                <p className="text-slate-600">{contentBrief.editorialRequirements.tone}</p>
              </div>
              <div>
                <span className="font-bold text-slate-800 block mb-1">Canadian Spelling:</span>
                <p className="text-teal-700 font-medium">
                  {contentBrief.editorialRequirements.canadianSpellingEnforced
                    ? 'Strictly Enforced (traveller, neighbourhood, favourite, centre, colour, etc.)'
                    : 'Standard'}
                </p>
              </div>
              <div>
                <span className="font-bold text-slate-800 block mb-1">Brand Phrasing:</span>
                <p className="text-slate-700">
                  Use "local guides" or "independent guides". NEVER use "our guides" or "our tours".
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200">
              <span className="font-bold text-slate-800 block mb-1">Prohibited Travel Clichés:</span>
              <p className="text-rose-700 font-mono text-[11px]">
                {contentBrief.editorialRequirements.prohibitedLanguage.join(', ')}
              </p>
            </div>
          </div>
        </div>

        {/* Section 5: Time-Sensitive Facts & Sources */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-teal-800 flex items-center gap-2">
            5. Evidence & Freshness Requirements
          </h3>
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                  <th className="py-2.5 px-3">Fact / Claim to Verify</th>
                  <th className="py-2.5 px-3">Official Source</th>
                  <th className="py-2.5 px-3">Last Verified</th>
                  <th className="py-2.5 px-3 text-center">Freshness Risk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {contentBrief.evidenceRequirements.timeSensitiveFacts.map((f, i) => (
                  <tr key={i} className="hover:bg-slate-50/70">
                    <td className="py-2.5 px-3 font-medium text-slate-900">{f.fact}</td>
                    <td className="py-2.5 px-3">
                      <a
                        href={f.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-teal-600 hover:underline flex items-center gap-1 font-mono text-[11px]"
                      >
                        <span>{f.publisher}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                    <td className="py-2.5 px-3 text-slate-600">{f.lastVerified}</td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                        f.freshnessRisk === 'High' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {f.freshnessRisk}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 6: Success Criteria Checklist */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-teal-800 flex items-center gap-2">
            6. Editorial Success Criteria
          </h3>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
            {contentBrief.successCriteria.map((crit, idx) => (
              <div key={idx} className="flex items-center gap-2 text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>{crit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
