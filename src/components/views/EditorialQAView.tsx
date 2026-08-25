import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Sparkles,
  BookOpen,
  Check,
  Layers,
  ArrowRight
} from 'lucide-react';
import { FullBriefProjectState } from '../../types';
import { runEditorialQA } from '../../utils/editorialValidator';

interface EditorialQAViewProps {
  state: FullBriefProjectState;
  onUpdateState: (updater: (prev: FullBriefProjectState) => FullBriefProjectState) => void;
  onMarkReadyForWriting: () => void;
}

export const EditorialQAView: React.FC<EditorialQAViewProps> = ({
  state,
  onUpdateState,
  onMarkReadyForWriting
}) => {
  const qaResult = runEditorialQA(state);

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-teal-600" />
              Editorial QA & Writing Readiness Gate
            </h2>
            <span className={`text-xs px-2.5 py-0.5 rounded font-semibold border ${
              qaResult.isReadyForWriting
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-rose-50 text-rose-800 border-rose-300'
            }`}>
              {qaResult.isReadyForWriting ? 'Gate Open: Ready for Writing' : `${qaResult.blockerCount} Blocker(s)`}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Automated compliance auditor ensuring Canadian spelling, ToursByLocals phrasing rules, and absence of generic travel clichés.
          </p>
        </div>

        <div>
          {qaResult.isReadyForWriting ? (
            <button
              onClick={onMarkReadyForWriting}
              className="text-xs px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Mark "Ready for Writing"</span>
            </button>
          ) : (
            <div className="text-xs px-3 py-1.5 bg-rose-50 text-rose-800 border border-rose-200 rounded-lg font-medium flex items-center gap-1.5">
              <XCircle className="w-4 h-4 text-rose-600" />
              <span>Resolve blockers below to unlock writing status</span>
            </div>
          )}
        </div>
      </div>

      {/* Compliance Audits Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        {/* Card 1: Canadian Spelling */}
        <div className={`p-4 rounded-xl border ${
          qaResult.canadianSpellingIssues.length === 0 ? 'bg-emerald-50/50 border-emerald-200' : 'bg-amber-50/60 border-amber-200'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-slate-900">Canadian Spelling</span>
            {qaResult.canadianSpellingIssues.length === 0 ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-amber-600" />
            )}
          </div>
          <p className="text-slate-600">
            {qaResult.canadianSpellingIssues.length === 0
              ? 'All text adheres to Canadian English (traveller, neighbourhood, favourite, centre, colour).'
              : `Found ${qaResult.canadianSpellingIssues.length} US spelling variants to fix.`}
          </p>
        </div>

        {/* Card 2: Banned Clichés */}
        <div className={`p-4 rounded-xl border ${
          qaResult.bannedPhrasesFound.length === 0 ? 'bg-emerald-50/50 border-emerald-200' : 'bg-rose-50/60 border-rose-200'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-slate-900">Banned Clichés</span>
            {qaResult.bannedPhrasesFound.length === 0 ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-rose-600" />
            )}
          </div>
          <p className="text-slate-600">
            {qaResult.bannedPhrasesFound.length === 0
              ? 'Zero banned travel clichés detected (no "nestled", "vibrant", "hidden gem").'
              : `Found ${qaResult.bannedPhrasesFound.length} clichés in text.`}
          </p>
        </div>

        {/* Card 3: Brand Rules */}
        <div className={`p-4 rounded-xl border ${
          qaResult.brandViolations.length === 0 ? 'bg-emerald-50/50 border-emerald-200' : 'bg-rose-50/60 border-rose-200'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-slate-900">Brand Phrasing Rules</span>
            {qaResult.brandViolations.length === 0 ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <XCircle className="w-4 h-4 text-rose-600" />
            )}
          </div>
          <p className="text-slate-600">
            {qaResult.brandViolations.length === 0
              ? 'Complies with independent guide platform phrasing ("guides on ToursByLocals").'
              : `Detected forbidden phrasing ("our guides" / "our tours").`}
          </p>
        </div>
      </div>

      {/* Detailed Check Items List */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-xs text-slate-800 uppercase tracking-wider">
          Complete Pre-Writing Verification Checks ({qaResult.checks.length})
        </div>

        <div className="divide-y divide-slate-200 text-xs">
          {qaResult.checks.map((c) => (
            <div key={c.id} className="p-4 hover:bg-slate-50/60 transition-colors flex items-start gap-3">
              {c.status === 'pass' && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />}
              {c.status === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />}
              {c.status === 'blocker' && <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />}

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{c.title}</span>
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                    c.status === 'pass'
                      ? 'bg-emerald-100 text-emerald-800'
                      : c.status === 'warning'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}>
                    {c.status}
                  </span>
                </div>
                <p className="text-slate-500 text-[11px]">{c.description}</p>
                <p className="text-slate-700 font-medium">{c.details}</p>
                {c.status !== 'pass' && (
                  <p className="text-rose-700 text-[11px] font-semibold">Remediation: {c.remediation}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
