import React from 'react';
import {
  Scale,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Layers,
  HelpCircle,
  Clock,
  Check,
  X
} from 'lucide-react';
import { FullBriefProjectState, EvidenceConflictItem } from '../../types';

interface EvidenceReconciliationViewProps {
  state: FullBriefProjectState;
  onResolveConflict: (conflictId: string, resolutionStatus: 'Accepted Recommendation' | 'Manually Overridden', notes?: string) => void;
}

export const EvidenceReconciliationView: React.FC<EvidenceReconciliationViewProps> = ({
  state,
  onResolveConflict
}) => {
  const { conflicts } = state;

  const precedenceRanks = [
    { rank: 1, label: 'Human-Approved Decisions', desc: 'Highest authority; explicit strategic overrides' },
    { rank: 2, label: 'Verified Target-Site Evidence', desc: 'Crawled URLs, existing taxonomy & status' },
    { rank: 3, label: 'GSC-Observed Queries', desc: 'Actual real-world impressions & click data' },
    { rank: 4, label: 'Observed API & Grounded-Search Data', desc: 'Live Gemini & search engine API citations' },
    { rank: 5, label: 'Repeated Cross-Run Patterns', desc: 'Multi-run consistent query & citation frequencies' },
    { rank: 6, label: 'SERP-Validated Evidence', desc: 'Competitor URLs ranking in live SERP snapshots' },
    { rank: 7, label: 'Extracted Competitor Evidence', desc: 'On-page competitor word counts & structures' },
    { rank: 8, label: 'Predicted Fan-Out', desc: 'Algorithmic or simulated query expansions' },
    { rank: 9, label: 'Unverified Hypotheses', desc: 'Lowest confidence; requires human/SME validation' }
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Scale className="w-5 h-5 text-teal-600" />
            Evidence Reconciliation & Conflict Matrix
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Surfaces conflicting page-types, action discrepancies, and canonical ambiguities. Material conflicts are never resolved silently.
          </p>
        </div>

        <div className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 font-semibold text-slate-700">
          {conflicts.filter(c => c.status === 'Unresolved').length} Unresolved Conflicts
        </div>
      </div>

      {/* Precedence Hierarchy Reference Banner */}
      <div className="bg-slate-900 text-white rounded-xl p-5 shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-3 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4" />
          Evidence Precedence Hierarchy (Rule-Based Arbitration)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
          {precedenceRanks.map((p) => (
            <div key={p.rank} className="bg-slate-800/80 border border-slate-700/60 p-2 rounded flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-teal-900/80 text-teal-300 font-bold flex items-center justify-center text-[10px] shrink-0">
                {p.rank}
              </span>
              <div className="truncate">
                <span className="font-semibold text-slate-100 block truncate">{p.label}</span>
                <span className="text-[10px] text-slate-400 truncate block">{p.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Conflicts List */}
      <div className="space-y-4">
        {conflicts.map((c) => (
          <div
            key={c.id}
            className={`bg-white border rounded-xl p-5 shadow-2xs space-y-4 transition-all ${
              c.status === 'Unresolved'
                ? 'border-amber-300 ring-1 ring-amber-200'
                : 'border-slate-200'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900">{c.title}</span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                  {c.conflictType}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                  c.status === 'Accepted Recommendation'
                    ? 'bg-emerald-100 text-emerald-800'
                    : c.status === 'Manually Overridden'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  Status: {c.status}
                </span>
              </div>
            </div>

            {/* Finding A vs Finding B Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800">Finding A</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-100 text-teal-800 font-bold">
                    Rank {c.findingA.precedenceRank}
                  </span>
                </div>
                <span className="text-slate-500 block text-[11px]">Source: {c.findingA.source}</span>
                <p className="text-slate-700 leading-relaxed font-medium">
                  {c.findingA.claim}
                </p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800">Finding B</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-100 text-purple-800 font-bold">
                    Rank {c.findingB.precedenceRank}
                  </span>
                </div>
                <span className="text-slate-500 block text-[11px]">Source: {c.findingB.source}</span>
                <p className="text-slate-700 leading-relaxed font-medium">
                  {c.findingB.claim}
                </p>
              </div>
            </div>

            {/* Recommended Resolution & Action Controls */}
            <div className="bg-teal-50/50 border border-teal-200 rounded-lg p-3.5 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="font-bold text-teal-900 block mb-0.5">Recommended Precedence Resolution:</span>
                <p className="text-teal-800">{c.recommendedResolution}</p>
                {c.resolutionNotes && (
                  <p className="text-[11px] text-teal-700 mt-1 italic">Note: {c.resolutionNotes}</p>
                )}
              </div>

              {c.status === 'Unresolved' && (
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onResolveConflict(c.id, 'Accepted Recommendation', 'Resolution accepted based on precedence rules.')}
                    className="text-xs px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded transition-colors cursor-pointer"
                  >
                    Accept Resolution
                  </button>
                  <button
                    onClick={() => onResolveConflict(c.id, 'Manually Overridden', 'Manual override by content strategist.')}
                    className="text-xs px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-medium rounded transition-colors cursor-pointer"
                  >
                    Override
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
