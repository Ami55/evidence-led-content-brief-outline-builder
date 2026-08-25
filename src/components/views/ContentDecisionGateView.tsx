import React, { useState } from 'react';
import {
  GitFork,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Link2,
  ShieldCheck,
  Check,
  Layers,
  ArrowRight,
  Info
} from 'lucide-react';
import { FullBriefProjectState, ContentAction, HumanApprovalStatus } from '../../types';

interface ContentDecisionGateViewProps {
  state: FullBriefProjectState;
  onUpdateDecision: (updater: (prev: FullBriefProjectState['decision']) => FullBriefProjectState['decision']) => void;
  onUpdateState: (updater: (prev: FullBriefProjectState) => FullBriefProjectState) => void;
}

export const ContentDecisionGateView: React.FC<ContentDecisionGateViewProps> = ({
  state,
  onUpdateDecision,
  onUpdateState
}) => {
  const { decision, project } = state;
  const [approverName, setApproverName] = useState(decision.approvedBy || 'Senior Content Strategist');

  const actionsList: { value: ContentAction; title: string; desc: string }[] = [
    {
      value: 'create_supporting_article',
      title: 'Create Supporting Article',
      desc: 'Distinct topic & intent that supports a parent commercial hub or destination without cannibalizing it.'
    },
    {
      value: 'create_new_page',
      title: 'Create New Page',
      desc: 'Brand new major destination hub or standalone commercial topic.'
    },
    {
      value: 'update_existing_page',
      title: 'Update Existing Page',
      desc: 'Existing page targets this exact query/intent but needs refreshing, deeper entities, or updated facts.'
    },
    {
      value: 'expand_existing_section',
      title: 'Expand Existing Section',
      desc: 'Sub-topic is too narrow for a standalone URL and belongs as an expanded section on an existing page.'
    },
    {
      value: 'add_new_section',
      title: 'Add New Section',
      desc: 'Add a distinct new modular section or FAQ block to an existing URL.'
    },
    {
      value: 'merge_overlapping_pages',
      title: 'Merge Overlapping Pages',
      desc: 'Multiple thin or duplicate URLs exist; consolidate the best content into one canonical page.'
    },
    {
      value: 'redirect_duplicate_page',
      title: 'Redirect Duplicate Page',
      desc: 'Direct duplicate URL with no unique value should 301-redirect to primary canonical.'
    },
    {
      value: 'repurpose_existing_page',
      title: 'Repurpose Existing Page',
      desc: 'Pivot underperforming URL to capture a broader or more qualified query intent.'
    },
    {
      value: 'improve_internal_links_only',
      title: 'Improve Internal Links Only',
      desc: 'Content exists and is accurate; ranking/citation gap is purely internal connectivity.'
    },
    {
      value: 'no_new_content_required',
      title: 'No New Content Required',
      desc: 'Topic already fully covered with dominant search and citation performance.'
    },
    {
      value: 'further_validation_required',
      title: 'Further Validation Required',
      desc: 'Insufficient evidence to justify production effort.'
    }
  ];

  const handleApprove = () => {
    onUpdateDecision((prev) => ({
      ...prev,
      humanApprovalStatus: 'Approved',
      approvedBy: approverName,
      approvalDate: new Date().toISOString().split('T')[0]
    }));
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <GitFork className="w-5 h-5 text-teal-600" />
            Content Decision Gate
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Every brief begins with a conscious decision: Create, Update, Merge, Add Section, or Do Not Create.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {decision.humanApprovalStatus === 'Approved' ? (
            <span className="flex items-center gap-1 text-xs font-semibold text-emerald-800 bg-emerald-100 border border-emerald-300 px-3 py-1.5 rounded-lg">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Approved by {decision.approvedBy} ({decision.approvalDate})
            </span>
          ) : (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={approverName}
                onChange={(e) => setApproverName(e.target.value)}
                placeholder="Reviewer name"
                className="text-xs px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white"
              />
              <button
                onClick={handleApprove}
                className="text-xs px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Sign & Approve Gate
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Primary Action Selector */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900">1. Select Strategic Action</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {actionsList.map((act) => {
            const isSelected = decision.action === act.value;
            return (
              <div
                key={act.value}
                onClick={() => onUpdateDecision((prev) => ({ ...prev, action: act.value }))}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-teal-600 bg-teal-50/50 ring-1 ring-teal-600'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-bold ${isSelected ? 'text-teal-900' : 'text-slate-900'}`}>
                    {act.title}
                  </span>
                  {isSelected && <Check className="w-4 h-4 text-teal-600 font-bold" />}
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">{act.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Decision Rationale & Alternative Considered */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900">2. Decision Rationale & Cannibalization Defense</h3>

        <div className="space-y-3 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Decision Rationale:</label>
            <textarea
              value={decision.reason}
              onChange={(e) => onUpdateDecision((prev) => ({ ...prev, reason: e.target.value }))}
              rows={2}
              className="w-full p-2.5 border border-slate-300 rounded-lg text-xs bg-slate-50 focus:bg-white"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Supporting Evidence Summary:</label>
            <textarea
              value={decision.supportingEvidence}
              onChange={(e) => onUpdateDecision((prev) => ({ ...prev, supportingEvidence: e.target.value }))}
              rows={2}
              className="w-full p-2.5 border border-slate-300 rounded-lg text-xs bg-slate-50 focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Alternative Action Considered:</label>
              <input
                type="text"
                value={decision.alternativeConsidered}
                onChange={(e) => onUpdateDecision((prev) => ({ ...prev, alternativeConsidered: e.target.value }))}
                className="w-full p-2.5 border border-slate-300 rounded-lg text-xs bg-slate-50 focus:bg-white"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Why Alternative Was Rejected:</label>
              <input
                type="text"
                value={decision.whyAlternativeRejected}
                onChange={(e) => onUpdateDecision((prev) => ({ ...prev, whyAlternativeRejected: e.target.value }))}
                className="w-full p-2.5 border border-slate-300 rounded-lg text-xs bg-slate-50 focus:bg-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Target URLs & Canonical Configuration */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900">3. Target URL & Canonical Assignment</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Recommended Target URL:</label>
            <input
              type="text"
              value={decision.recommendedTargetUrl}
              onChange={(e) => onUpdateDecision((prev) => ({ ...prev, recommendedTargetUrl: e.target.value }))}
              className="w-full p-2.5 border border-slate-300 rounded-lg font-mono text-xs text-teal-800"
            />
          </div>
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Canonical Keep URL:</label>
            <input
              type="text"
              value={decision.canonicalKeepUrl}
              onChange={(e) => onUpdateDecision((prev) => ({ ...prev, canonicalKeepUrl: e.target.value }))}
              className="w-full p-2.5 border border-slate-300 rounded-lg font-mono text-xs text-indigo-800"
            />
          </div>
        </div>

        {decision.action === 'merge_overlapping_pages' && (
          <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-lg text-xs space-y-2">
            <span className="font-bold text-amber-900 block">URLs to Merge or 301-Redirect:</span>
            <input
              type="text"
              value={decision.urlsToMergeOrRedirect.join(', ')}
              onChange={(e) => onUpdateDecision((prev) => ({
                ...prev,
                urlsToMergeOrRedirect: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
              }))}
              placeholder="https://example.com/url-1, https://example.com/url-2"
              className="w-full p-2 border border-amber-300 rounded bg-white"
            />
          </div>
        )}
      </div>
    </div>
  );
};
