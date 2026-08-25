import React, { useState } from 'react';
import {
  BookmarkCheck,
  History,
  GitCompare,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Clock,
  ArrowRight,
  ShieldCheck,
  Check,
  X
} from 'lucide-react';
import { FullBriefProjectState, BriefVersionItem } from '../../types';

interface SavedBriefsViewProps {
  state: FullBriefProjectState;
  onRestoreVersion: (version: BriefVersionItem) => void;
  onSaveNewVersion: (summary: string) => void;
}

export const SavedBriefsView: React.FC<SavedBriefsViewProps> = ({
  state,
  onRestoreVersion,
  onSaveNewVersion
}) => {
  const [newVersionSummary, setNewVersionSummary] = useState('');
  const [selectedVersionA, setSelectedVersionA] = useState<string>(
    state.versions.length > 0 ? state.versions[state.versions.length - 1].version : 'v1.0'
  );
  const [selectedVersionB, setSelectedVersionB] = useState<string>(
    state.versions.length > 1 ? state.versions[state.versions.length - 2].version : 'v1.0'
  );

  const handleSave = () => {
    if (!newVersionSummary.trim()) return;
    onSaveNewVersion(newVersionSummary.trim());
    setNewVersionSummary('');
  };

  const vA = state.versions.find(v => v.version === selectedVersionA) || state.versions[0];
  const vB = state.versions.find(v => v.version === selectedVersionB) || state.versions[0];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <BookmarkCheck className="w-5 h-5 text-teal-600" />
            Saved Briefs & Version Comparison
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit trail of brief iterations, reviewer approvals, diff comparisons, and upstream re-import change detection.
          </p>
        </div>

        <span className="text-xs px-3 py-1.5 rounded-lg bg-teal-50 text-teal-700 font-semibold border border-teal-200">
          {state.versions.length} Saved Snapshots
        </span>
      </div>

      {/* Save New Snapshot Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Save Snapshot to Version History</h3>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newVersionSummary}
            onChange={(e) => setNewVersionSummary(e.target.value)}
            placeholder="Change summary (e.g. Added Guide Beaver Hall elevator route and updated 747 bus fare)..."
            className="flex-1 p-2 border border-slate-300 rounded-lg text-xs bg-slate-50 focus:bg-white"
          />
          <button
            onClick={handleSave}
            className="text-xs px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors cursor-pointer shrink-0"
          >
            Save Snapshot
          </button>
        </div>
      </div>

      {/* Version Timeline */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Version Timeline & Reviewer Approvals</h3>

        <div className="space-y-3">
          {state.versions.map((ver) => (
            <div
              key={ver.version}
              className="p-4 bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-xl transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {ver.version}
                  </span>
                  <span className="text-slate-500 font-medium">{ver.createdAt}</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-700 font-semibold">{ver.createdBy}</span>
                </div>
                <p className="text-slate-700">{ver.changeSummary}</p>
                {ver.reviewerNotes && (
                  <p className="text-[11px] text-teal-700 font-medium">Reviewer Note: {ver.reviewerNotes}</p>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => onRestoreVersion(ver)}
                  className="px-3 py-1.5 bg-white hover:bg-slate-200 text-slate-700 border border-slate-300 rounded font-medium transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3 text-teal-600" />
                  <span>Restore</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Side-by-Side Diff Viewer */}
      {state.versions.length >= 2 && vA && vB && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <GitCompare className="w-4 h-4 text-indigo-600" />
              Side-by-Side Version Diff
            </h3>

            <div className="flex items-center gap-2 text-xs">
              <div className="flex items-center gap-1">
                <span className="text-slate-500">Version A:</span>
                <select
                  value={selectedVersionA}
                  onChange={(e) => setSelectedVersionA(e.target.value)}
                  className="p-1 border border-slate-300 rounded font-medium bg-white"
                >
                  {state.versions.map(v => (
                    <option key={v.version} value={v.version}>{v.version}</option>
                  ))}
                </select>
              </div>

              <span className="text-slate-400">vs</span>

              <div className="flex items-center gap-1">
                <span className="text-slate-500">Version B:</span>
                <select
                  value={selectedVersionB}
                  onChange={(e) => setSelectedVersionB(e.target.value)}
                  className="p-1 border border-slate-300 rounded font-medium bg-white"
                >
                  {state.versions.map(v => (
                    <option key={v.version} value={v.version}>{v.version}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Version A Card */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 block border-b border-slate-200 pb-1">
                Snapshot {vA.version} ({vA.createdAt})
              </span>
              <p className="text-slate-600"><strong>Target Action:</strong> {vA.snapshotState.decision.action}</p>
              <p className="text-slate-600"><strong>Proposed H1:</strong> {vA.snapshotState.contentOutline.proposedH1}</p>
              <p className="text-slate-600"><strong>Outline Sections:</strong> {vA.snapshotState.contentOutline.sections.length}</p>
              <p className="text-slate-600"><strong>Entity Count:</strong> {vA.snapshotState.entityPlan.length}</p>
            </div>

            {/* Version B Card */}
            <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-200 space-y-2">
              <span className="font-bold text-indigo-900 block border-b border-indigo-200 pb-1">
                Snapshot {vB.version} ({vB.createdAt})
              </span>
              <p className="text-slate-600"><strong>Target Action:</strong> {vB.snapshotState.decision.action}</p>
              <p className="text-slate-600"><strong>Proposed H1:</strong> {vB.snapshotState.contentOutline.proposedH1}</p>
              <p className="text-slate-600"><strong>Outline Sections:</strong> {vB.snapshotState.contentOutline.sections.length}</p>
              <p className="text-slate-600"><strong>Entity Count:</strong> {vB.snapshotState.entityPlan.length}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
