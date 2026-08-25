import React from 'react';
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  ArrowRight,
  Sparkles,
  Layers,
  MapPin,
  ExternalLink,
  ShieldAlert,
  HelpCircle,
  TrendingUp,
  Target
} from 'lucide-react';
import { FullBriefProjectState, ContentAction } from '../../types';
import { EvidenceCompletenessScore } from '../../types';

interface OverviewViewProps {
  state: FullBriefProjectState;
  completeness: EvidenceCompletenessScore;
  onNavigateTab: (tab: any) => void;
  onApproveDecision: () => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  state,
  completeness,
  onNavigateTab,
  onApproveDecision
}) => {
  const { project, decision, audienceAndIntent, queryClusters, entityPlan, siteEvidence, competitorInsights, citationEvidence, informationGainPlan, internalLinkPlan } = state;

  const actionLabels: Record<ContentAction, { title: string; color: string }> = {
    create_new_page: { title: 'Create New Page', color: 'bg-emerald-50 text-emerald-800 border-emerald-300' },
    create_supporting_article: { title: 'Create Supporting Article', color: 'bg-teal-50 text-teal-800 border-teal-300' },
    update_existing_page: { title: 'Update Existing Page', color: 'bg-blue-50 text-blue-800 border-blue-300' },
    expand_existing_section: { title: 'Expand Existing Section', color: 'bg-indigo-50 text-indigo-800 border-indigo-300' },
    add_new_section: { title: 'Add New Section', color: 'bg-purple-50 text-purple-800 border-purple-300' },
    merge_overlapping_pages: { title: 'Merge Overlapping Pages', color: 'bg-amber-50 text-amber-800 border-amber-300' },
    redirect_duplicate_page: { title: 'Redirect Duplicate Page', color: 'bg-orange-50 text-orange-800 border-orange-300' },
    repurpose_existing_page: { title: 'Repurpose Existing Page', color: 'bg-cyan-50 text-cyan-800 border-cyan-300' },
    improve_internal_links_only: { title: 'Improve Internal Links Only', color: 'bg-sky-50 text-sky-800 border-sky-300' },
    no_new_content_required: { title: 'No New Content Required', color: 'bg-gray-50 text-gray-800 border-gray-300' },
    further_validation_required: { title: 'Further Validation Required', color: 'bg-rose-50 text-rose-800 border-rose-300' }
  };

  const actionMeta = actionLabels[decision.action] || { title: decision.action, color: 'bg-slate-100 text-slate-800 border-slate-300' };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Top Banner: Project Title & Mode */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                Content Strategy Blueprint
              </span>
              <span className="text-xs text-slate-500">• {project.destinationOrSubject}</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              {project.proposedTopic}
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl">
              Target Audience: <span className="font-medium text-slate-800">{project.targetAudience}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className={`px-3 py-1.5 rounded-lg border text-xs font-semibold ${actionMeta.color}`}>
              Action: {actionMeta.title}
            </div>
            {decision.humanApprovalStatus === 'Approved' ? (
              <span className="flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Gate Approved
              </span>
            ) : (
              <button
                onClick={onApproveDecision}
                className="flex items-center gap-1.5 text-xs font-medium text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-300 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Approve Decision Gate</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Answer-First Executive Summary Card */}
      <div className="bg-slate-900 text-white rounded-xl p-6 shadow-md border border-slate-800">
        <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-4 h-4" />
          Answer-First Executive Summary
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="space-y-3">
            <div>
              <span className="text-slate-400 block text-xs font-medium">1. What should be created or changed:</span>
              <p className="text-slate-100 font-medium">
                {decision.action === 'create_supporting_article'
                  ? `Publish a comprehensive, supporting planning article at ${decision.recommendedTargetUrl}`
                  : `${decision.reason.slice(0, 140)}...`}
              </p>
            </div>
            <div>
              <span className="text-slate-400 block text-xs font-medium">2. Why it is needed:</span>
              <p className="text-slate-200">
                {decision.reason}
              </p>
            </div>
            <div>
              <span className="text-slate-400 block text-xs font-medium">3. Which user need it addresses:</span>
              <p className="text-slate-200">
                {audienceAndIntent.primaryNeed}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-slate-400 block text-xs font-medium">4. Role in Site Architecture:</span>
              <p className="text-slate-200">
                Acts as a logistical pillar connecting the parent <code className="text-teal-300 text-xs bg-slate-800 px-1 py-0.5 rounded">Montreal Destination Hub</code> to high-converting <code className="text-teal-300 text-xs bg-slate-800 px-1 py-0.5 rounded">Private Tours on ToursByLocals</code>.
              </p>
            </div>
            <div>
              <span className="text-slate-400 block text-xs font-medium">5. What makes it different (Information Gain):</span>
              <p className="text-slate-200">
                Contributes first-hand guide secrets on avoiding steep hill climbs, senior metro elevator cheat-sheets, and airport 747 vs taxi pricing comparisons that competitors omit.
              </p>
            </div>
            <div>
              <span className="text-slate-400 block text-xs font-medium">6. Immediate Next Step:</span>
              <p className="text-teal-300 font-medium">
                {completeness.blockingGaps.length > 0
                  ? `Resolve ${completeness.blockingGaps.length} blocking gap(s) before marking Ready for Writing.`
                  : 'Review the Content Brief and Outline, then hand off to the content writer.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Key Metadata Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-2xs">
          <span className="text-[11px] text-slate-500 font-medium block">Target URL</span>
          <span className="text-xs font-semibold text-slate-900 truncate block mt-1" title={decision.recommendedTargetUrl}>
            {decision.recommendedTargetUrl.replace('https://www.toursbylocals.com', '') || 'Unassigned'}
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-2xs">
          <span className="text-[11px] text-slate-500 font-medium block">Search Intent</span>
          <span className="text-xs font-semibold text-slate-900 block mt-1">
            {audienceAndIntent.primarySearchIntent || 'Informational'}
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-2xs">
          <span className="text-[11px] text-slate-500 font-medium block">Journey Stage</span>
          <span className="text-xs font-semibold text-slate-900 block mt-1">
            {audienceAndIntent.journeyStage || 'Planning'}
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-2xs">
          <span className="text-[11px] text-slate-500 font-medium block">Query Clusters</span>
          <span className="text-base font-bold text-teal-700 block mt-0.5">
            {queryClusters.length} clusters
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-2xs">
          <span className="text-[11px] text-slate-500 font-medium block">Entities Mapped</span>
          <span className="text-base font-bold text-indigo-700 block mt-0.5">
            {entityPlan.length} entities
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-2xs">
          <span className="text-[11px] text-slate-500 font-medium block">Evidence Score</span>
          <span className={`text-base font-bold block mt-0.5 ${completeness.totalScore >= 80 ? 'text-teal-700' : 'text-amber-700'}`}>
            {completeness.totalScore}/100
          </span>
        </div>
      </div>

      {/* Evidence Completeness Breakdown */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Evidence Completeness Breakdown</h3>
            <p className="text-xs text-slate-500">Scored based on material requirements for this content decision.</p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 text-slate-800">
            {completeness.totalScore}% Complete
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs mb-4">
          <div className="p-2.5 rounded border border-slate-100 bg-slate-50">
            <span className="text-slate-500 block">Site Architecture</span>
            <span className="font-semibold text-slate-800">{completeness.breakdown.siteArchitecture} / 10 pts</span>
          </div>
          <div className="p-2.5 rounded border border-slate-100 bg-slate-50">
            <span className="text-slate-500 block">Queries & Intent</span>
            <span className="font-semibold text-slate-800">{completeness.breakdown.queryEvidence + completeness.breakdown.intentEvidence} / 25 pts</span>
          </div>
          <div className="p-2.5 rounded border border-slate-100 bg-slate-50">
            <span className="text-slate-500 block">Entity Plan</span>
            <span className="font-semibold text-slate-800">{completeness.breakdown.entityEvidence} / 10 pts</span>
          </div>
          <div className="p-2.5 rounded border border-slate-100 bg-slate-50">
            <span className="text-slate-500 block">Competitor & Citations</span>
            <span className="font-semibold text-slate-800">{completeness.breakdown.competitorEvidence + completeness.breakdown.citationEvidence} / 20 pts</span>
          </div>
          <div className="p-2.5 rounded border border-slate-100 bg-slate-50">
            <span className="text-slate-500 block">SME & Local Guides</span>
            <span className="font-semibold text-slate-800">{completeness.breakdown.smeExpertise + completeness.breakdown.sourceVerification} / 15 pts</span>
          </div>
        </div>

        {/* Blocking Gaps Callout */}
        {completeness.blockingGaps.length > 0 ? (
          <div className="p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block mb-0.5">Blocking Gaps Identified:</span>
              <ul className="list-disc list-inside space-y-0.5 text-rose-700">
                {completeness.blockingGaps.map((gap, i) => (
                  <li key={i}>{gap}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>All essential evidence foundations are validated. No blocking gaps detected.</span>
          </div>
        )}
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => onNavigateTab('content-brief')}
          className="p-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-left transition-all shadow-2xs hover:shadow-xs group cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
              <FileText className="w-4 h-4" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600 group-hover:translate-x-0.5 transition-all" />
          </div>
          <h4 className="font-semibold text-slate-900 text-sm">Review Content Brief</h4>
          <p className="text-xs text-slate-500 mt-1">
            Complete strategic brief with objectives, scope boundaries, and evidence requirements.
          </p>
        </button>

        <button
          onClick={() => onNavigateTab('content-outline')}
          className="p-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-left transition-all shadow-2xs hover:shadow-xs group cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
              <Layers className="w-4 h-4" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
          </div>
          <h4 className="font-semibold text-slate-900 text-sm">Review Content Outline</h4>
          <p className="text-xs text-slate-500 mt-1">
            {state.contentOutline.sections.length} structured sections with questions answered and local guide callouts.
          </p>
        </button>

        <button
          onClick={() => onNavigateTab('editorial-qa')}
          className="p-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-left transition-all shadow-2xs hover:shadow-xs group cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-0.5 transition-all" />
          </div>
          <h4 className="font-semibold text-slate-900 text-sm">Editorial QA & Gates</h4>
          <p className="text-xs text-slate-500 mt-1">
            Verify Canadian spelling, brand phrasing ("guides on ToursByLocals"), and cliché-free copy.
          </p>
        </button>
      </div>
    </div>
  );
};
