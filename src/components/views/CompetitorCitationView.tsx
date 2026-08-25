import React from 'react';
import {
  Eye,
  ShieldAlert,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  FileCheck
} from 'lucide-react';
import { FullBriefProjectState } from '../../types';

interface CompetitorCitationViewProps {
  state: FullBriefProjectState;
  onUpdateState: (updater: (prev: FullBriefProjectState) => FullBriefProjectState) => void;
}

export const CompetitorCitationView: React.FC<CompetitorCitationViewProps> = ({
  state
}) => {
  const { competitorInsights, citationEvidence } = state;

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Eye className="w-5 h-5 text-teal-600" />
            Competitor & Citation Learnings
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Analyzes competitor strengths and AI citation patterns to uncover true editorial gaps, without copying.
          </p>
        </div>

        <span className="text-xs px-3 py-1.5 rounded-lg bg-teal-50 text-teal-800 font-semibold border border-teal-200">
          Anti-Copying Guardrail Active
        </span>
      </div>

      {/* Mandatory Anti-Copying Warning Card */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block mb-0.5">Strict Anti-Copying Strategic Guardrail</span>
          <p className="text-amber-800 leading-relaxed">
            Competitor findings must <strong>never</strong> be used as a mandate to copy headings, mimic word counts, or rewrite competitor paragraphs. They must be used strictly to identify unserved traveller questions, vague generic claims, missing local nuances, and formatting superiority opportunities.
          </p>
        </div>
      </div>

      {/* Competitor Insights Grid */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-900">1. Competitor Gap Analysis & Differentiation Plan</h3>
        <div className="space-y-3">
          {competitorInsights.map((comp) => (
            <div key={comp.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{comp.competitor}</span>
                    <a
                      href={comp.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] text-teal-600 hover:underline flex items-center gap-0.5"
                    >
                      <span>{comp.url}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <span className="text-xs text-slate-500 mt-0.5 block">
                    Supported Claim: "{comp.claimSupported}"
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-1.5">
                  <span className="font-semibold text-slate-700 block">Observed Difference vs Our Site:</span>
                  <p className="text-slate-600 leading-relaxed">
                    {comp.targetSiteDifference}
                  </p>
                </div>

                <div className="bg-teal-50/60 p-3 rounded-lg border border-teal-100 space-y-1.5">
                  <span className="font-bold text-teal-900 block">Recommended Strategic Response (Do NOT Copy):</span>
                  <p className="text-teal-800 leading-relaxed font-medium">
                    {comp.recommendedResponse}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Citation Findings & Overcoming Retrieval Barriers */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-900">2. AI Citation Reverse Engineering Insights</h3>

        <div className="space-y-3">
          {citationEvidence.map((cit) => (
            <div key={cit.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">{cit.platform}</span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                    {cit.evidenceLabel}
                  </span>
                </div>
                <span className="text-xs text-slate-500">
                  Prompt: "{cit.testPrompt}"
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="font-semibold text-slate-700 block mb-1">Frequently Cited Competitors:</span>
                  <p className="text-slate-800 font-medium">{cit.mentionedCompetitors.join(', ') || 'None'}</p>
                </div>

                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="font-semibold text-slate-700 block mb-1">Observed Citation Barrier:</span>
                  <p className="text-slate-600">{cit.likelyCitationBarrier}</p>
                </div>

                <div className="bg-indigo-50/50 p-3 rounded-lg border border-indigo-100">
                  <span className="font-semibold text-indigo-900 block mb-1">Brief Countermeasure:</span>
                  <p className="text-indigo-800 font-medium">{cit.recommendedExperiment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
