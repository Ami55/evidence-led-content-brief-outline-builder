import React, { useState } from 'react';
import {
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Plus,
  Trash2,
  BookOpen,
  HelpCircle,
  Tag
} from 'lucide-react';
import { FullBriefProjectState, InformationGainPlanItem } from '../../types';

interface InformationGainPlanViewProps {
  state: FullBriefProjectState;
  onUpdateState: (updater: (prev: FullBriefProjectState) => FullBriefProjectState) => void;
  onGenerateAISuggestions?: () => void;
}

export const InformationGainPlanView: React.FC<InformationGainPlanViewProps> = ({
  state,
  onUpdateState,
  onGenerateAISuggestions
}) => {
  const { informationGainPlan } = state;
  const [newContribution, setNewContribution] = useState('');
  const [newSource, setNewSource] = useState('Local ToursByLocals guide interview');
  const [newStatus, setNewStatus] = useState<InformationGainPlanItem['verificationStatus']>('Verified by Local Guide');
  const [newSection, setNewSection] = useState('Section 3: Buying Passes & Fares');
  const [newTag, setNewTag] = useState('[Guide secret verified]');

  const handleAdd = () => {
    if (!newContribution.trim()) return;
    const newItem: InformationGainPlanItem = {
      id: `ig_${Date.now()}`,
      informationNeed: newContribution.trim().slice(0, 50),
      proposedUniqueContribution: newContribution.trim(),
      potentialSource: newSource,
      evidenceStatus: 'Verified Local Knowledge',
      expertInputRequired: newStatus === 'Pending SME Input',
      verificationStatus: newStatus,
      relevantSection: newSection,
      placeholderTag: newTag
    };

    onUpdateState(prev => ({
      ...prev,
      informationGainPlan: [...prev.informationGainPlan, newItem]
    }));

    setNewContribution('');
  };

  const handleRemove = (id: string) => {
    onUpdateState(prev => ({
      ...prev,
      informationGainPlan: prev.informationGainPlan.filter(i => i.id !== id)
    }));
  };

  const handleToggleStatus = (id: string, status: InformationGainPlanItem['verificationStatus']) => {
    onUpdateState(prev => ({
      ...prev,
      informationGainPlan: prev.informationGainPlan.map(item =>
        item.id === id ? { ...item, verificationStatus: status } : item
      )
    }));
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-teal-600" />
            Information-Gain & Local Expertise Plan
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Mandates unique, first-hand local guide insights, physical navigation secrets, and authentic advice unavailable on generic competitor pages.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1.5 rounded-lg bg-teal-50 text-teal-700 font-semibold border border-teal-200">
            {informationGainPlan.filter(i => i.verificationStatus === 'Verified by Local Guide').length} Verified Guide Secrets
          </span>
        </div>
      </div>

      {/* Guide Insights Cards */}
      <div className="space-y-3">
        {informationGainPlan.map((item) => (
          <div key={item.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-teal-600" />
                <span className="text-xs font-bold text-slate-900">{item.relevantSection}</span>
                {item.placeholderTag && (
                  <span className="text-[10px] font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded border">
                    {item.placeholderTag}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={item.verificationStatus}
                  onChange={(e) => handleToggleStatus(item.id, e.target.value as any)}
                  className={`text-xs px-2.5 py-1 rounded font-semibold border cursor-pointer ${
                    item.verificationStatus === 'Verified by Local Guide'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      : item.verificationStatus === 'Desk Research Needed'
                      ? 'bg-amber-50 text-amber-800 border-amber-300'
                      : 'bg-blue-50 text-blue-800 border-blue-300'
                  }`}
                >
                  <option value="Verified by Local Guide">Verified by Local Guide</option>
                  <option value="Desk Research Needed">Desk Research Needed</option>
                  <option value="Pending SME Input">Pending SME Input</option>
                  <option value="Drafted with Placeholder">Drafted with Placeholder</option>
                </select>

                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-800 font-medium leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
              "{item.proposedUniqueContribution}"
            </p>

            <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1">
              <span>Source Authority: <strong className="text-slate-700">{item.potentialSource}</strong></span>
              <span className="text-teal-700 font-medium">Distinct from generic AI search summaries</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Information Gain Form */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Add Information-Gain Insight</h3>
        <div className="space-y-3 text-xs">
          <textarea
            value={newContribution}
            onChange={(e) => setNewContribution(e.target.value)}
            placeholder="Unique insight / local secret (e.g. In winter, take the Underground City route between Peel and Central Station to avoid icy sidewalks)..."
            rows={2}
            className="w-full p-2.5 border border-slate-300 rounded bg-white text-xs"
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            <input
              type="text"
              value={newSource}
              onChange={(e) => setNewSource(e.target.value)}
              placeholder="Source (e.g. Local Guide)"
              className="p-2 border border-slate-300 rounded bg-white text-xs"
            />
            <input
              type="text"
              value={newSection}
              onChange={(e) => setNewSection(e.target.value)}
              placeholder="Target Section"
              className="p-2 border border-slate-300 rounded bg-white text-xs"
            />
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Placeholder Tag"
              className="p-2 border border-slate-300 rounded bg-white text-xs"
            />
            <button
              onClick={handleAdd}
              className="p-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded text-xs transition-colors cursor-pointer"
            >
              Add Insight
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
