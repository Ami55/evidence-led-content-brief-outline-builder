import React, { useState } from 'react';
import {
  X,
  History,
  GitCompare,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Layers,
  Check
} from 'lucide-react';
import { FullBriefProjectState, BriefVersionItem } from '../../types';

interface VersionHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: FullBriefProjectState;
  onRestoreVersion: (version: BriefVersionItem) => void;
  onSaveNewVersion: (summary: string) => void;
}

export const VersionHistoryModal: React.FC<VersionHistoryModalProps> = ({
  isOpen,
  onClose,
  state,
  onRestoreVersion,
  onSaveNewVersion
}) => {
  const [newSummary, setNewSummary] = useState('');
  const [selectedVersionA, setSelectedVersionA] = useState<string>(
    state.versions.length > 0 ? state.versions[state.versions.length - 1].version : 'v1.0'
  );
  const [selectedVersionB, setSelectedVersionB] = useState<string>(
    state.versions.length > 1 ? state.versions[state.versions.length - 2].version : 'v1.0'
  );

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSummary.trim()) return;
    onSaveNewVersion(newSummary.trim());
    setNewSummary('');
  };

  const vA = state.versions.find(v => v.version === selectedVersionA) || state.versions[0];
  const vB = state.versions.find(v => v.version === selectedVersionB) || state.versions[0];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-teal-600" />
            <h2 className="text-base font-bold text-slate-900">Version History & Diff Comparator</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto text-xs">
          {/* Save snapshot form */}
          <form onSubmit={handleSave} className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <input
              type="text"
              value={newSummary}
              onChange={(e) => setNewSummary(e.target.value)}
              placeholder="Commit summary for this brief version..."
              className="flex-1 p-2 border border-slate-300 rounded bg-white text-xs"
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded text-xs transition-colors cursor-pointer shrink-0"
            >
              Save Version
            </button>
          </form>

          {/* Timeline List */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">Saved Versions ({state.versions.length})</h3>
            {state.versions.map((ver) => (
              <div
                key={ver.version}
                className="p-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {ver.version}
                    </span>
                    <span className="text-slate-500 font-medium">{ver.createdAt}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-700 font-semibold">{ver.createdBy}</span>
                  </div>
                  <p className="text-slate-600 mt-1">{ver.changeSummary}</p>
                </div>

                <button
                  onClick={() => {
                    onRestoreVersion(ver);
                    onClose();
                  }}
                  className="px-3 py-1.5 bg-white hover:bg-slate-200 border border-slate-300 rounded font-medium text-slate-700 flex items-center gap-1 cursor-pointer shrink-0"
                >
                  <RotateCcw className="w-3 h-3 text-teal-600" />
                  <span>Restore</span>
                </button>
              </div>
            ))}
          </div>

          {/* Side by side diff */}
          {state.versions.length >= 2 && vA && vB && (
            <div className="pt-4 border-t border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                  <GitCompare className="w-4 h-4 text-indigo-600" />
                  Version Comparison
                </span>

                <div className="flex items-center gap-2">
                  <select
                    value={selectedVersionA}
                    onChange={(e) => setSelectedVersionA(e.target.value)}
                    className="p-1 border border-slate-300 rounded bg-white font-medium"
                  >
                    {state.versions.map(v => (
                      <option key={v.version} value={v.version}>{v.version}</option>
                    ))}
                  </select>
                  <span>vs</span>
                  <select
                    value={selectedVersionB}
                    onChange={(e) => setSelectedVersionB(e.target.value)}
                    className="p-1 border border-slate-300 rounded bg-white font-medium"
                  >
                    {state.versions.map(v => (
                      <option key={v.version} value={v.version}>{v.version}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                  <span className="font-bold text-slate-900 block">{vA.version} ({vA.createdAt})</span>
                  <p className="text-slate-600">Action: {vA.snapshotState.decision.action}</p>
                  <p className="text-slate-600">H1: {vA.snapshotState.contentOutline.proposedH1}</p>
                  <p className="text-slate-600">Sections: {vA.snapshotState.contentOutline.sections.length}</p>
                </div>
                <div className="p-3.5 bg-indigo-50 border border-indigo-200 rounded-xl space-y-1.5">
                  <span className="font-bold text-indigo-900 block">{vB.version} ({vB.createdAt})</span>
                  <p className="text-indigo-800">Action: {vB.snapshotState.decision.action}</p>
                  <p className="text-indigo-800">H1: {vB.snapshotState.contentOutline.proposedH1}</p>
                  <p className="text-indigo-800">Sections: {vB.snapshotState.contentOutline.sections.length}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
