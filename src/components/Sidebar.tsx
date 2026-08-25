import React from 'react';
import {
  LayoutDashboard,
  Database,
  Scale,
  GitFork,
  Users,
  Search,
  Network,
  Eye,
  Lightbulb,
  Link2,
  FileText,
  ListTree,
  FileCode2,
  ShieldCheck,
  Download,
  BookmarkCheck,
  AlertCircle
} from 'lucide-react';
import { FullBriefProjectState } from '../types';

export type ActiveTab =
  | 'overview'
  | 'imported-evidence'
  | 'evidence-reconciliation'
  | 'content-decision'
  | 'audience-intent'
  | 'query-topic-map'
  | 'entity-plan'
  | 'competitor-citation'
  | 'information-gain'
  | 'internal-links'
  | 'content-brief'
  | 'content-outline'
  | 'specialized-briefs'
  | 'editorial-qa'
  | 'reports-exports'
  | 'saved-briefs';

interface SidebarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  state: FullBriefProjectState;
  unresolvedConflictCount: number;
  qaBlockerCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  state,
  unresolvedConflictCount,
  qaBlockerCount
}) => {
  const totalEvidenceCount =
    state.siteEvidence.length + state.queryEvidence.length + state.citationEvidence.length;

  const navItems: {
    id: ActiveTab;
    label: string;
    icon: React.ElementType;
    badge?: string | number;
    badgeColor?: string;
  }[] = [
    { id: 'overview', label: '1. Overview', icon: LayoutDashboard },
    {
      id: 'imported-evidence',
      label: '2. Imported Evidence',
      icon: Database,
      badge: totalEvidenceCount > 0 ? totalEvidenceCount : undefined,
      badgeColor: 'bg-slate-100 text-slate-700'
    },
    {
      id: 'evidence-reconciliation',
      label: '3. Evidence Reconciliation',
      icon: Scale,
      badge: unresolvedConflictCount > 0 ? `${unresolvedConflictCount} conflicts` : undefined,
      badgeColor: 'bg-amber-100 text-amber-800'
    },
    {
      id: 'content-decision',
      label: '4. Content Decision',
      icon: GitFork,
      badge: state.decision.humanApprovalStatus === 'Approved' ? 'Approved' : 'Pending',
      badgeColor:
        state.decision.humanApprovalStatus === 'Approved'
          ? 'bg-emerald-100 text-emerald-800'
          : 'bg-amber-100 text-amber-800'
    },
    { id: 'audience-intent', label: '5. Audience & Intent', icon: Users },
    {
      id: 'query-topic-map',
      label: '6. Query & Topic Map',
      icon: Search,
      badge: state.queryClusters.length > 0 ? state.queryClusters.length : undefined,
      badgeColor: 'bg-slate-100 text-slate-700'
    },
    {
      id: 'entity-plan',
      label: '7. Entity Plan',
      icon: Network,
      badge: state.entityPlan.length > 0 ? state.entityPlan.length : undefined,
      badgeColor: 'bg-slate-100 text-slate-700'
    },
    {
      id: 'competitor-citation',
      label: '8. Competitor & Citation',
      icon: Eye,
      badge: state.competitorInsights.length > 0 ? state.competitorInsights.length : undefined,
      badgeColor: 'bg-slate-100 text-slate-700'
    },
    {
      id: 'information-gain',
      label: '9. Information-Gain Plan',
      icon: Lightbulb,
      badge: state.informationGainPlan.length > 0 ? `${state.informationGainPlan.length} insights` : undefined,
      badgeColor: 'bg-teal-100 text-teal-800'
    },
    {
      id: 'internal-links',
      label: '10. Internal-Link Plan',
      icon: Link2,
      badge: state.internalLinkPlan.length > 0 ? state.internalLinkPlan.length : undefined,
      badgeColor: 'bg-slate-100 text-slate-700'
    },
    { id: 'content-brief', label: '11. Content Brief', icon: FileText },
    {
      id: 'content-outline',
      label: '12. Content Outline',
      icon: ListTree,
      badge: state.contentOutline.sections.length > 0 ? `${state.contentOutline.sections.length} sec` : undefined,
      badgeColor: 'bg-indigo-100 text-indigo-800'
    },
    { id: 'specialized-briefs', label: '13. Update / Merge / Section', icon: FileCode2 },
    {
      id: 'editorial-qa',
      label: '14. Editorial QA & Gates',
      icon: ShieldCheck,
      badge: qaBlockerCount > 0 ? `${qaBlockerCount} issues` : 'Passed',
      badgeColor: qaBlockerCount > 0 ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
    },
    { id: 'reports-exports', label: '15. Reports & Exports', icon: Download },
    { id: 'saved-briefs', label: '16. Saved Briefs & Diff', icon: BookmarkCheck }
  ];

  return (
    <aside className="w-full md:w-64 shrink-0 bg-slate-50/80 border-r border-slate-200 flex flex-col justify-between p-3 overflow-y-auto max-h-[calc(100vh-60px)]">
      <div className="space-y-1">
        <div className="px-2 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Planning Workflow
        </div>
        <nav className="space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full text-left px-2.5 py-2 rounded-md text-xs font-medium transition-all flex items-center justify-between group cursor-pointer ${
                  isActive
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-200/70 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-semibold shrink-0 ml-1.5 ${
                      isActive ? 'bg-white/20 text-white' : item.badgeColor
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Required Disclaimer in sidebar */}
      <div className="mt-4 pt-3 border-t border-slate-200 px-2 text-[11px] text-slate-500 leading-relaxed">
        <p className="font-semibold text-slate-700 flex items-center gap-1 mb-1">
          <AlertCircle className="w-3 h-3 text-teal-600" />
          Evidence-Led Protocol
        </p>
        <p className="text-[10px] text-slate-500">
          Every brief separates imported facts, hypotheses, and human decisions.
        </p>
      </div>
    </aside>
  );
};
