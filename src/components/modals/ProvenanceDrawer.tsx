import React from 'react';
import { X, ShieldCheck, Database, Layers, CheckCircle2, Copy, Check } from 'lucide-react';

interface ProvenanceDrawerProps {
  item: any | null;
  onClose: () => void;
}

export const ProvenanceDrawer: React.FC<ProvenanceDrawerProps> = ({ item, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!item) return null;

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(item, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-2xs flex justify-end">
      <div className="bg-white w-full max-w-md h-full shadow-2xl border-l border-slate-200 flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-teal-600" />
            <h3 className="text-sm font-bold text-slate-900">Evidence Provenance Inspector</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 overflow-y-auto flex-1 text-xs">
          <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800">Originating Application</span>
            <p className="text-xs font-bold text-teal-950">{item.sourceApp || 'Connected Content Workflow'}</p>
          </div>

          <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">Record ID:</span>
              <span className="font-mono font-medium text-slate-800">{item.id || item.opportunityId || item.promptId || 'N/A'}</span>
            </div>

            {item.projectId && (
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Project ID:</span>
                <span className="font-mono font-medium text-slate-800">{item.projectId}</span>
              </div>
            )}

            {item.promptId && (
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Prompt ID:</span>
                <span className="font-mono font-medium text-slate-800">{item.promptId}</span>
              </div>
            )}

            {item.opportunityId && (
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Opportunity ID:</span>
                <span className="font-mono font-medium text-slate-800">{item.opportunityId}</span>
              </div>
            )}

            {item.queryClassification && (
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Query Classification:</span>
                <span className="font-semibold text-indigo-700">{item.queryClassification}</span>
              </div>
            )}

            {item.evidenceLabel && (
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Evidence Label:</span>
                <span className="font-semibold text-teal-700">{item.evidenceLabel}</span>
              </div>
            )}

            {item.confidence !== undefined && (
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Confidence Score:</span>
                <span className="font-bold text-slate-900">{(item.confidence * 100).toFixed(0)}%</span>
              </div>
            )}

            {item.dateCollected && (
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Date Collected:</span>
                <span className="text-slate-800">{item.dateCollected}</span>
              </div>
            )}

            {item.humanApprovalStatus && (
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Approval Status:</span>
                <span className="font-bold text-emerald-700">{item.humanApprovalStatus}</span>
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-slate-700">Raw Evidence Payload</span>
              <button
                onClick={handleCopyJson}
                className="text-[11px] text-teal-600 hover:text-teal-800 flex items-center gap-1"
              >
                {copied ? <Check className="w-3 h-3 text-teal-600" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy JSON'}</span>
              </button>
            </div>
            <pre className="p-3 bg-slate-900 text-slate-200 rounded-xl text-[11px] font-mono overflow-x-auto max-h-60">
              {JSON.stringify(item, null, 2)}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
