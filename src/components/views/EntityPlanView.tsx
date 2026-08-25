import React, { useState } from 'react';
import {
  Network,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Layers,
  Sparkles,
  Check
} from 'lucide-react';
import { FullBriefProjectState, EntityPlanItem } from '../../types';

interface EntityPlanViewProps {
  state: FullBriefProjectState;
  onUpdateState: (updater: (prev: FullBriefProjectState) => FullBriefProjectState) => void;
}

export const EntityPlanView: React.FC<EntityPlanViewProps> = ({
  state,
  onUpdateState
}) => {
  const { entityPlan } = state;
  const [newEntity, setNewEntity] = useState('');
  const [newType, setNewType] = useState<EntityPlanItem['entityType']>('Transit System');
  const [newRelationship, setNewRelationship] = useState('');
  const [newSection, setNewSection] = useState('Section 2: The STM Metro & Bus System');
  const [newPriority, setNewPriority] = useState<EntityPlanItem['priority']>('Recommended');

  const handleAddEntity = () => {
    if (!newEntity.trim()) return;
    const newItem: EntityPlanItem = {
      id: `ent_${Date.now()}`,
      entity: newEntity.trim(),
      entityType: newType,
      relationship: newRelationship.trim() || 'Directly relevant to destination logistics',
      relevantQueryClusters: ['Montreal Transit Overview'],
      userValue: 'Essential orientation for mature travellers.',
      existingCoverage: 'Partial',
      competitorCoverage: 'High',
      recommendedSection: newSection,
      evidenceRequired: 'Confirmed STM documentation',
      priority: newPriority,
      verified: true
    };

    onUpdateState(prev => ({
      ...prev,
      entityPlan: [...prev.entityPlan, newItem]
    }));

    setNewEntity('');
    setNewRelationship('');
  };

  const handleToggleVerified = (id: string) => {
    onUpdateState(prev => ({
      ...prev,
      entityPlan: prev.entityPlan.map(e => e.id === id ? { ...e, verified: !e.verified } : e)
    }));
  };

  const handleRemoveEntity = (id: string) => {
    onUpdateState(prev => ({
      ...prev,
      entityPlan: prev.entityPlan.filter(e => e.id !== id)
    }));
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Network className="w-5 h-5 text-teal-600" />
            Entity Plan & Semantic Relationships
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Explicitly maps essential real-world entities, places, systems, and concepts that establish semantic authority and factual grounding.
          </p>
        </div>

        <div className="text-xs px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200">
          {entityPlan.length} Entities Mapped ({entityPlan.filter(e => e.verified).length} Verified)
        </div>
      </div>

      {/* Entity Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <th className="py-2.5 px-3">Entity Name</th>
                <th className="py-2.5 px-3">Type</th>
                <th className="py-2.5 px-3">Semantic Relationship</th>
                <th className="py-2.5 px-3">Target Section</th>
                <th className="py-2.5 px-3 text-center">Priority</th>
                <th className="py-2.5 px-3 text-center">Verified</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {entityPlan.map((ent) => (
                <tr key={ent.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-slate-900">
                    {ent.entity}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium whitespace-nowrap">
                      {ent.entityType}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 max-w-xs">
                    {ent.relationship}
                  </td>
                  <td className="py-2.5 px-3 text-teal-700 font-medium">
                    {ent.recommendedSection}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span className={`text-[11px] px-2 py-0.5 rounded font-semibold ${
                      ent.priority === 'Essential' || ent.priority === 'Critical'
                        ? 'bg-rose-100 text-rose-800'
                        : ent.priority === 'Supporting' || ent.priority === 'Recommended'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {ent.priority}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <button
                      onClick={() => handleToggleVerified(ent.id)}
                      className={`text-xs px-2 py-0.5 rounded font-semibold cursor-pointer ${
                        ent.verified ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {ent.verified ? 'Verified' : 'Pending'}
                    </button>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      onClick={() => handleRemoveEntity(ent.id)}
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

      {/* Add Entity Form */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Add New Semantic Entity</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2 text-xs">
          <input
            type="text"
            value={newEntity}
            onChange={(e) => setNewEntity(e.target.value)}
            placeholder="Entity name (e.g. OPUS Card)"
            className="p-2 border border-slate-300 rounded bg-white text-xs"
          />
          <select
            value={newType}
            onChange={(e) => setNewType(e.target.value as any)}
            className="p-2 border border-slate-300 rounded bg-white text-xs"
          >
            <option value="Transit System">Transit System</option>
            <option value="Place / Neighborhood">Place / Neighborhood</option>
            <option value="Organization / Operator">Organization / Operator</option>
            <option value="Fare / Pass Concept">Fare / Pass Concept</option>
            <option value="Mobility / Accessibility Concept">Mobility / Accessibility Concept</option>
          </select>
          <input
            type="text"
            value={newRelationship}
            onChange={(e) => setNewRelationship(e.target.value)}
            placeholder="Relationship (e.g. Primary transit smartcard)"
            className="p-2 border border-slate-300 rounded bg-white text-xs"
          />
          <input
            type="text"
            value={newSection}
            onChange={(e) => setNewSection(e.target.value)}
            placeholder="Section (e.g. Section 3)"
            className="p-2 border border-slate-300 rounded bg-white text-xs"
          />
          <button
            onClick={handleAddEntity}
            className="p-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded text-xs transition-colors cursor-pointer"
          >
            Add Entity
          </button>
        </div>
      </div>
    </div>
  );
};
