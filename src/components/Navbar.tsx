import React from 'react';
import {
  Sparkles,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Download,
  History,
  Settings,
  FolderOpen,
  HelpCircle,
  Layers,
  ArrowRight
} from 'lucide-react';
import { FullBriefProjectState, BriefStatus } from '../types';

interface NavbarProps {
  state: FullBriefProjectState;
  completenessScore: number;
  onOpenProjectSetup: () => void;
  onOpenVersionHistory: () => void;
  onOpenExportModal: () => void;
  onOpenAIModal: () => void;
  onLoadDemo: () => void;
  onUpdateStatus: (status: BriefStatus) => void;
  onBuildBrief: () => void;
  onOpenHowItWorks: () => void;
  isGenerating?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  state,
  completenessScore,
  onOpenProjectSetup,
  onOpenVersionHistory,
  onOpenExportModal,
  onOpenAIModal,
  onLoadDemo,
  onUpdateStatus,
  onBuildBrief,
  onOpenHowItWorks,
  isGenerating
}) => {
  const statusColors: Record<BriefStatus, string> = {
    'Draft': 'bg-slate-100 text-slate-700 border-slate-300',
    'Evidence incomplete': 'bg-amber-50 text-amber-800 border-amber-300',
    'Human input required': 'bg-blue-50 text-blue-800 border-blue-300',
    'Ready for review': 'bg-indigo-50 text-indigo-800 border-indigo-300',
    'Approved': 'bg-emerald-50 text-emerald-800 border-emerald-300',
    'Ready for writing': 'bg-teal-50 text-teal-800 border-teal-300 font-semibold',
    'Rejected': 'bg-rose-50 text-rose-800 border-rose-300',
    'Archived': 'bg-gray-100 text-gray-500 border-gray-300'
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-xs px-4 sm:px-6 py-2.5">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 max-w-7xl mx-auto">
        {/* Left: Brand & Project Name */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold text-lg shadow-xs">
            EB
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-semibold text-slate-900 text-base tracking-tight leading-tight">
                {state.project.name || 'Untitled Content Brief'}
              </h1>
              <span className={`text-xs px-2 py-0.5 rounded-full border ${state.project.mode === 'connected' ? 'bg-teal-50 text-teal-700 border-teal-200' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>
                {state.project.mode === 'connected' ? 'Connected Evidence Mode' : 'Standalone Mode'}
              </span>
            </div>
            <p className="text-xs text-slate-500 truncate max-w-md">
              {state.project.proposedTopic || 'No topic configured'} • {state.project.targetDomain || 'Domain unset'}
            </p>
          </div>
        </div>

        {/* Center/Right: Actions & Metrics */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button onClick={onOpenHowItWorks} className="text-xs px-2.5 py-1 bg-white hover:bg-slate-50 text-slate-700 font-medium rounded-md border border-slate-300 transition-colors flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5 text-teal-600" /> How It Works
          </button>
          {/* Completeness Badge */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md text-xs">
            <span className="text-slate-500">Evidence:</span>
            <div className="w-16 bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  completenessScore >= 80 ? 'bg-teal-600' : completenessScore >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                }`}
                style={{ width: `${completenessScore}%` }}
              />
            </div>
            <span className="font-semibold text-slate-800">{completenessScore}%</span>
          </div>

          {/* Status Dropdown */}
          <div className="relative inline-block">
            <select
              value={state.status}
              onChange={(e) => onUpdateStatus(e.target.value as BriefStatus)}
              className={`text-xs px-2.5 py-1 rounded-md border font-medium cursor-pointer appearance-none pr-6 focus:outline-none focus:ring-1 focus:ring-teal-500 ${statusColors[state.status]}`}
            >
              <option value="Draft">Draft</option>
              <option value="Evidence incomplete">Evidence incomplete</option>
              <option value="Human input required">Human input required</option>
              <option value="Ready for review">Ready for review</option>
              <option value="Approved">Approved</option>
              <option value="Ready for writing">Ready for writing</option>
              <option value="Rejected">Rejected</option>
              <option value="Archived">Archived</option>
            </select>
          </div>

          {/* Demo Project Button */}
          <button
            onClick={onLoadDemo}
            className="text-xs px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-md border border-slate-300 transition-colors flex items-center gap-1"
            title="Load Montreal Transit Senior Guide Demo"
          >
            <FolderOpen className="w-3.5 h-3.5 text-teal-600" />
            <span>Montreal Demo</span>
          </button>

          {/* AI Synthesis / Assistance */}
          <button
            onClick={onOpenAIModal}
            className="text-xs px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium rounded-md border border-indigo-200 transition-colors flex items-center gap-1"
            title="Consult AI Brief Strategist (Gemini 3.7)"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>AI Advisor</span>
          </button>

          {/* Version History */}
          <button
            onClick={onOpenVersionHistory}
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md border border-slate-200 transition-colors"
            title="Version History & Diff Viewer"
          >
            <History className="w-4 h-4" />
          </button>

          {/* Export Button */}
          <button
            onClick={onOpenExportModal}
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md border border-slate-200 transition-colors"
            title="Export Brief & Outline"
          >
            <Download className="w-4 h-4" />
          </button>

          {/* Project Settings */}
          <button
            onClick={onOpenProjectSetup}
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md border border-slate-200 transition-colors"
            title="Project Setup & Input Evidence"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Main Action: Build Evidence-Led Brief */}
          <button
            onClick={onBuildBrief}
            disabled={isGenerating}
            className="text-xs px-3 py-1.5 bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-medium rounded-md shadow-xs transition-all flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{isGenerating ? 'Building...' : 'Build Evidence-Led Brief'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
