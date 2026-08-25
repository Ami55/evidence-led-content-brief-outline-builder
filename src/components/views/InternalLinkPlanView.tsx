import React, { useState } from 'react';
import {
  Link2,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  Plus,
  Trash2,
  ExternalLink
} from 'lucide-react';
import { FullBriefProjectState, InternalLinkPlanItem } from '../../types';

interface InternalLinkPlanViewProps {
  state: FullBriefProjectState;
  onUpdateState: (updater: (prev: FullBriefProjectState) => FullBriefProjectState) => void;
}

export const InternalLinkPlanView: React.FC<InternalLinkPlanViewProps> = ({
  state,
  onUpdateState
}) => {
  const { internalLinkPlan } = state;
  const [newTargetUrl, setNewTargetUrl] = useState('https://www.toursbylocals.com/montreal-tours');
  const [newDirection, setNewDirection] = useState<InternalLinkPlanItem['direction']>('Outbound to Commercial');
  const [newAnchor, setNewAnchor] = useState('private Montreal driving tours');
  const [newRel, setNewRel] = useState('Commercial conversion');
  const [newBenefit, setNewBenefit] = useState('Offers seniors a personalized door-to-door vehicle option.');

  const handleAdd = () => {
    if (!newTargetUrl.trim() || !newAnchor.trim()) return;
    const newItem: InternalLinkPlanItem = {
      id: `link_${Date.now()}`,
      targetUrl: newTargetUrl.trim(),
      direction: newDirection,
      relationship: newRel,
      suggestedAnchorConcept: newAnchor.trim(),
      userBenefit: newBenefit,
      existingLinkStatus: 'Proposed New'
    };

    onUpdateState(prev => ({
      ...prev,
      internalLinkPlan: [...prev.internalLinkPlan, newItem]
    }));

    setNewAnchor('');
  };

  const handleRemove = (id: string) => {
    onUpdateState(prev => ({
      ...prev,
      internalLinkPlan: prev.internalLinkPlan.filter(l => l.id !== id)
    }));
  };

  const directionColors: Record<string, string> = {
    'Inbound from Parent': 'bg-blue-50 text-blue-700 border-blue-200',
    'Outbound to Child': 'bg-teal-50 text-teal-700 border-teal-200',
    'Outbound to Commercial': 'bg-emerald-50 text-emerald-800 border-emerald-200 font-semibold',
    'Lateral Cross-Link': 'bg-purple-50 text-purple-700 border-purple-200',
    'Inbound': 'bg-blue-50 text-blue-700 border-blue-200',
    'Outbound': 'bg-teal-50 text-teal-700 border-teal-200',
    'Cross-link': 'bg-purple-50 text-purple-700 border-purple-200'
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Link2 className="w-5 h-5 text-teal-600" />
            Internal-Link Architecture Plan
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Defines inbound parent hub links, lateral topic meshes, and natural anchor concepts to commercial tour pages.
          </p>
        </div>

        <div className="text-xs px-3 py-1.5 rounded-lg bg-teal-50 text-teal-700 font-semibold border border-teal-200">
          {internalLinkPlan.length} Planned Internal Connections
        </div>
      </div>

      {/* Internal Links Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <th className="py-2.5 px-3">Direction</th>
                <th className="py-2.5 px-3">Target URL</th>
                <th className="py-2.5 px-3">Anchor Concept</th>
                <th className="py-2.5 px-3">Relationship / User Benefit</th>
                <th className="py-2.5 px-3 text-center">Status</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {internalLinkPlan.map((l) => (
                <tr key={l.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-2.5 px-3">
                    <span className={`text-[11px] px-2 py-0.5 rounded border whitespace-nowrap ${directionColors[l.direction]}`}>
                      {l.direction}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-teal-800 font-medium max-w-xs truncate" title={l.targetUrl}>
                    {l.targetUrl.replace('https://www.toursbylocals.com', '')}
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">
                    "{l.suggestedAnchorConcept}"
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">
                    <span className="font-medium text-slate-800">{l.relationship}: </span>
                    {l.userBenefit}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 font-medium text-slate-700">
                      {l.existingLinkStatus}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      onClick={() => handleRemove(l.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Internal Link Form */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Add Internal Link Relationship</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2 text-xs">
          <select
            value={newDirection}
            onChange={(e) => setNewDirection(e.target.value as any)}
            className="p-2 border border-slate-300 rounded bg-white text-xs font-medium"
          >
            <option value="Outbound to Commercial">Outbound to Commercial</option>
            <option value="Inbound from Parent">Inbound from Parent</option>
            <option value="Outbound to Child">Outbound to Child</option>
            <option value="Lateral Cross-Link">Lateral Cross-Link</option>
          </select>
          <input
            type="text"
            value={newTargetUrl}
            onChange={(e) => setNewTargetUrl(e.target.value)}
            placeholder="Target URL"
            className="p-2 border border-slate-300 rounded bg-white text-xs font-mono"
          />
          <input
            type="text"
            value={newAnchor}
            onChange={(e) => setNewAnchor(e.target.value)}
            placeholder="Anchor Concept (e.g. customized walking tours)"
            className="p-2 border border-slate-300 rounded bg-white text-xs"
          />
          <input
            type="text"
            value={newBenefit}
            onChange={(e) => setNewBenefit(e.target.value)}
            placeholder="User Benefit"
            className="p-2 border border-slate-300 rounded bg-white text-xs"
          />
          <button
            onClick={handleAdd}
            className="p-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded text-xs transition-colors cursor-pointer"
          >
            Add Link
          </button>
        </div>
      </div>
    </div>
  );
};
