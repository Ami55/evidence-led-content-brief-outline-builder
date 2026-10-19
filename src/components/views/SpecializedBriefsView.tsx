import React, { useState } from 'react';
import {
  FileCode2,
  RefreshCw,
  GitMerge,
  Layers,
  Copy,
  Check,
  Download,
  AlertTriangle,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { FullBriefProjectState } from '../../types';

interface SpecializedBriefsViewProps {
  state: FullBriefProjectState;
  onUpdateState: (updater: (prev: FullBriefProjectState) => FullBriefProjectState) => void;
}

export const SpecializedBriefsView: React.FC<SpecializedBriefsViewProps> = ({
  state,
  onUpdateState
}) => {
  const [activeFormat, setActiveFormat] = useState<'update' | 'section' | 'merge'>('update');
  const [copied, setCopied] = useState(false);

  const { decision, project, contentBrief } = state;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header & Format Toggle */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FileCode2 className="w-5 h-5 text-teal-600" />
            Specialized Brief Generators
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Tailored brief formats for Content Updates, Modular Section Additions, and URL Merges & Consolidations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveFormat('update')}
            className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              activeFormat === 'update' ? 'bg-teal-600 text-white shadow-2xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Update Brief
          </button>
          <button
            onClick={() => setActiveFormat('section')}
            className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              activeFormat === 'section' ? 'bg-teal-600 text-white shadow-2xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Section Brief
          </button>
          <button
            onClick={() => setActiveFormat('merge')}
            className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              activeFormat === 'merge' ? 'bg-teal-600 text-white shadow-2xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Merge / Consolidation Brief
          </button>
        </div>
      </div>

      {/* 1. UPDATE BRIEF */}
      {activeFormat === 'update' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Format 1</span>
              <h3 className="text-base font-bold text-slate-900">Existing Page Content Update Brief</h3>
            </div>
            <button
              onClick={() => handleCopy(`CONTENT UPDATE BRIEF: ${decision.recommendedTargetUrl}\nTarget: ${project.proposedTopic}`)}
              className="text-xs px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy Update Brief</span>
            </button>
          </div>

          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-semibold text-slate-700 block mb-1">Target Existing URL:</span>
                <code className="text-teal-800 font-mono font-medium">{decision.recommendedTargetUrl}</code>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-semibold text-slate-700 block mb-1">Update Trigger / Reason:</span>
                <p className="text-slate-600">Freshness decay, outdated STM pass prices, and missing AI citation entities.</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 bg-emerald-50/60 border border-emerald-200 rounded-lg">
                <span className="font-bold text-emerald-900 block mb-1">Sections to Keep Unchanged:</span>
                <p className="text-emerald-800">Introduction to Montreal layout, general transit network overview, and historical context.</p>
              </div>

              <div className="p-3.5 bg-amber-50/60 border border-amber-200 rounded-lg">
                <span className="font-bold text-amber-900 block mb-1">Sections to Rewrite or Expand:</span>
                <p className="text-amber-800">
                  Fare purchase workflow (add contactless bank card tapping), accessibility elevators list, and airport express bus vs fixed taxi comparison table.
                </p>
              </div>

              <div className="p-3.5 bg-rose-50/60 border border-rose-200 rounded-lg">
                <span className="font-bold text-rose-900 block mb-1">Outdated Facts to Remove:</span>
                <p className="text-rose-800">
                  Remove obsolete 2021 STM flat fares ($3.50 &rarr; update to current $3.75), old cash fare payment on buses, and unverified shuttle references.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. SECTION BRIEF */}
      {activeFormat === 'section' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Format 2</span>
              <h3 className="text-base font-bold text-slate-900">Modular Section Brief (Embed in Existing Page)</h3>
            </div>
            <button
              onClick={() => handleCopy(`SECTION BRIEF: ${project.proposedTopic}\nHost URL: https://example.com/montreal-travel-guide`)}
              className="text-xs px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy Section Brief</span>
            </button>
          </div>

          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-semibold text-slate-700 block mb-1">Host Page URL:</span>
                <code className="text-teal-800 font-mono font-medium">https://example.com/montreal-travel-guide</code>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-semibold text-slate-700 block mb-1">Target Section Heading (H2):</span>
                <p className="text-slate-800 font-semibold">"Senior Transit & Mobility Essentials in Montreal"</p>
              </div>
            </div>

            <div className="p-3.5 bg-indigo-50/60 border border-indigo-200 rounded-lg text-xs space-y-1">
              <span className="font-bold text-indigo-900 block">Why Embed as a Section Rather than Standalone URL:</span>
              <p className="text-indigo-800">
                Search demand is tightly clustered around broader Montreal destination planning; embedding a high-utility 400-word section strengthens the host page's topical authority without creating a thin secondary URL.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
              <span className="font-semibold text-slate-700 block">Insertion Point & Word Budget:</span>
              <p className="text-slate-600">Insert immediately below "Getting Around Montreal" and before "Top Neighbourhoods". Word Budget: 350–450 words.</p>
            </div>
          </div>
        </div>
      )}

      {/* 3. MERGE BRIEF */}
      {activeFormat === 'merge' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Format 3</span>
              <h3 className="text-base font-bold text-slate-900">Merge & URL Consolidation Brief</h3>
            </div>
            <button
              onClick={() => handleCopy(`MERGE BRIEF: Canonical Keep: ${decision.canonicalKeepUrl}`)}
              className="text-xs px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy Merge Brief</span>
            </button>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-lg space-y-2">
              <span className="font-bold text-amber-900 block">Primary Canonical Keep URL:</span>
              <code className="text-teal-900 font-mono font-bold text-xs">{decision.canonicalKeepUrl}</code>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
              <span className="font-semibold text-slate-700 block">URLs to Deprecate and 301-Redirect:</span>
              <ul className="list-disc list-inside space-y-1 font-mono text-[11px] text-rose-700">
                <li>https://example.com/montreal-metro-tips-old (301 &rarr; Canonical)</li>
                <li>https://example.com/montreal-transit-guide-2022 (301 &rarr; Canonical)</li>
              </ul>
            </div>

            <div className="p-3.5 bg-teal-50/60 border border-teal-200 rounded-lg space-y-1">
              <span className="font-bold text-teal-900 block">Content Migration Checklist:</span>
              <ul className="list-disc list-inside space-y-0.5 text-teal-800">
                <li>Migrate the high-performing Underground City exit map from the old URL.</li>
                <li>Migrate existing inbound backlinks and preserve relevant internal anchor links.</li>
                <li>Verify 301 server response headers after DNS/CMS update.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
