import React, { useState } from 'react';
import {
  Users,
  CheckCircle2,
  AlertTriangle,
  Compass,
  ArrowRight,
  Plus,
  Trash2,
  Layers,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { FullBriefProjectState } from '../../types';

interface AudienceIntentViewProps {
  state: FullBriefProjectState;
  onUpdateState: (updater: (prev: FullBriefProjectState) => FullBriefProjectState) => void;
}

export const AudienceIntentView: React.FC<AudienceIntentViewProps> = ({
  state,
  onUpdateState
}) => {
  const { audienceAndIntent } = state;
  const [newQuestion, setNewQuestion] = useState('');
  const [newScopeQuestion, setNewScopeQuestion] = useState('');
  const [newScopeTarget, setNewScopeTarget] = useState('');
  const [newScopeReason, setNewScopeReason] = useState('');

  const handleAddQuestion = () => {
    if (!newQuestion.trim()) return;
    onUpdateState(prev => ({
      ...prev,
      audienceAndIntent: {
        ...prev.audienceAndIntent,
        questionsMustAnswer: [...prev.audienceAndIntent.questionsMustAnswer, newQuestion.trim()]
      }
    }));
    setNewQuestion('');
  };

  const handleRemoveQuestion = (index: number) => {
    onUpdateState(prev => ({
      ...prev,
      audienceAndIntent: {
        ...prev.audienceAndIntent,
        questionsMustAnswer: prev.audienceAndIntent.questionsMustAnswer.filter((_, i) => i !== index)
      }
    }));
  };

  const handleAddScopeQuestion = () => {
    if (!newScopeQuestion.trim() || !newScopeTarget.trim()) return;
    onUpdateState(prev => ({
      ...prev,
      audienceAndIntent: {
        ...prev.audienceAndIntent,
        questionsBelongElsewhere: [
          ...prev.audienceAndIntent.questionsBelongElsewhere,
          {
            question: newScopeQuestion.trim(),
            targetPage: newScopeTarget.trim(),
            reason: newScopeReason.trim() || 'Covered on dedicated commercial or hub page.'
          }
        ]
      }
    }));
    setNewScopeQuestion('');
    setNewScopeTarget('');
    setNewScopeReason('');
  };

  const handleRemoveScopeQuestion = (index: number) => {
    onUpdateState(prev => ({
      ...prev,
      audienceAndIntent: {
        ...prev.audienceAndIntent,
        questionsBelongElsewhere: prev.audienceAndIntent.questionsBelongElsewhere.filter((_, i) => i !== index)
      }
    }));
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-teal-600" />
            Audience & Intent Profile
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Defines the exact traveller profile, physical constraints, questions the page must answer, and strict scope boundaries.
          </p>
        </div>
      </div>

      {/* Target Audiences & Context */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900">1. Audience Definition & Context</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Primary Audience:</label>
            <input
              type="text"
              value={audienceAndIntent.primaryAudience}
              onChange={(e) => onUpdateState(prev => ({
                ...prev,
                audienceAndIntent: { ...prev.audienceAndIntent, primaryAudience: e.target.value }
              }))}
              className="w-full p-2.5 border border-slate-300 rounded-lg text-xs bg-slate-50 focus:bg-white"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Secondary Audience:</label>
            <input
              type="text"
              value={audienceAndIntent.secondaryAudience}
              onChange={(e) => onUpdateState(prev => ({
                ...prev,
                audienceAndIntent: { ...prev.audienceAndIntent, secondaryAudience: e.target.value }
              }))}
              className="w-full p-2.5 border border-slate-300 rounded-lg text-xs bg-slate-50 focus:bg-white"
            />
          </div>

          <div className="md:col-span-2">
            <label className="font-semibold text-slate-700 block mb-1">Traveller / Customer Context:</label>
            <textarea
              value={audienceAndIntent.travellerContext}
              onChange={(e) => onUpdateState(prev => ({
                ...prev,
                audienceAndIntent: { ...prev.audienceAndIntent, travellerContext: e.target.value }
              }))}
              rows={2}
              className="w-full p-2.5 border border-slate-300 rounded-lg text-xs bg-slate-50 focus:bg-white"
            />
          </div>
        </div>
      </div>

      {/* Need, Intent & Journey Stage */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900">2. User Need, Intent & Next Action</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Primary Search Intent:</label>
            <select
              value={audienceAndIntent.primarySearchIntent}
              onChange={(e) => onUpdateState(prev => ({
                ...prev,
                audienceAndIntent: { ...prev.audienceAndIntent, primarySearchIntent: e.target.value as any }
              }))}
              className="w-full p-2.5 border border-slate-300 rounded-lg text-xs bg-slate-50 focus:bg-white font-medium"
            >
              <option value="Informational">Informational</option>
              <option value="Commercial Investigation">Commercial Investigation</option>
              <option value="Transactional">Transactional</option>
              <option value="Navigational">Navigational</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Journey Stage:</label>
            <select
              value={audienceAndIntent.journeyStage}
              onChange={(e) => onUpdateState(prev => ({
                ...prev,
                audienceAndIntent: { ...prev.audienceAndIntent, journeyStage: e.target.value as any }
              }))}
              className="w-full p-2.5 border border-slate-300 rounded-lg text-xs bg-slate-50 focus:bg-white font-medium"
            >
              <option value="Awareness">Awareness</option>
              <option value="Planning">Planning</option>
              <option value="Comparison">Comparison</option>
              <option value="Booking">Booking</option>
              <option value="In-Destination">In-Destination</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Desired Next Action:</label>
            <input
              type="text"
              value={audienceAndIntent.desiredNextAction}
              onChange={(e) => onUpdateState(prev => ({
                ...prev,
                audienceAndIntent: { ...prev.audienceAndIntent, desiredNextAction: e.target.value }
              }))}
              className="w-full p-2.5 border border-slate-300 rounded-lg text-xs bg-slate-50 focus:bg-white font-medium text-teal-800"
            />
          </div>

          <div className="md:col-span-3">
            <label className="font-semibold text-slate-700 block mb-1">Primary User Need Statement:</label>
            <textarea
              value={audienceAndIntent.primaryNeed}
              onChange={(e) => onUpdateState(prev => ({
                ...prev,
                audienceAndIntent: { ...prev.audienceAndIntent, primaryNeed: e.target.value }
              }))}
              rows={2}
              className="w-full p-2.5 border border-slate-300 rounded-lg text-xs bg-slate-50 focus:bg-white"
            />
          </div>
        </div>
      </div>

      {/* Physical & Environmental Constraints */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900">3. Physical & Environmental Constraints</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Age & Mobility Constraints:</label>
            <input
              type="text"
              value={audienceAndIntent.relevantConstraints.ageAndMobility}
              onChange={(e) => onUpdateState(prev => ({
                ...prev,
                audienceAndIntent: {
                  ...prev.audienceAndIntent,
                  relevantConstraints: { ...prev.audienceAndIntent.relevantConstraints, ageAndMobility: e.target.value }
                }
              }))}
              className="w-full p-2.5 border border-slate-300 rounded-lg text-xs bg-slate-50"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">First-Time Visit Realities:</label>
            <input
              type="text"
              value={audienceAndIntent.relevantConstraints.firstTimeVisit}
              onChange={(e) => onUpdateState(prev => ({
                ...prev,
                audienceAndIntent: {
                  ...prev.audienceAndIntent,
                  relevantConstraints: { ...prev.audienceAndIntent.relevantConstraints, firstTimeVisit: e.target.value }
                }
              }))}
              className="w-full p-2.5 border border-slate-300 rounded-lg text-xs bg-slate-50"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Season & Weather Factors:</label>
            <input
              type="text"
              value={audienceAndIntent.relevantConstraints.seasonAndWeather}
              onChange={(e) => onUpdateState(prev => ({
                ...prev,
                audienceAndIntent: {
                  ...prev.audienceAndIntent,
                  relevantConstraints: { ...prev.audienceAndIntent.relevantConstraints, seasonAndWeather: e.target.value }
                }
              }))}
              className="w-full p-2.5 border border-slate-300 rounded-lg text-xs bg-slate-50"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Transportation & Topography Realities:</label>
            <input
              type="text"
              value={audienceAndIntent.relevantConstraints.transportationRealities}
              onChange={(e) => onUpdateState(prev => ({
                ...prev,
                audienceAndIntent: {
                  ...prev.audienceAndIntent,
                  relevantConstraints: { ...prev.audienceAndIntent.relevantConstraints, transportationRealities: e.target.value }
                }
              }))}
              className="w-full p-2.5 border border-slate-300 rounded-lg text-xs bg-slate-50"
            />
          </div>
        </div>
      </div>

      {/* Questions Content Must Answer */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">4. Questions This Content Must Answer</h3>
            <p className="text-xs text-slate-500">Every outline section must directly answer at least one of these.</p>
          </div>
          <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-1 rounded">
            {audienceAndIntent.questionsMustAnswer.length} Questions
          </span>
        </div>

        <div className="space-y-2">
          {audienceAndIntent.questionsMustAnswer.map((q, idx) => (
            <div key={idx} className="flex items-center justify-between gap-2 p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs">
              <span className="font-medium text-slate-800 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                {q}
              </span>
              <button
                onClick={() => handleRemoveQuestion(idx)}
                className="text-slate-400 hover:text-rose-600 p-1 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          <div className="flex items-center gap-2 pt-2">
            <input
              type="text"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="Add another mandatory question (e.g. Is Uber or a flat-rate taxi better from Trudeau airport?)..."
              className="flex-1 p-2 border border-slate-300 rounded-lg text-xs"
              onKeyDown={(e) => e.key === 'Enter' && handleAddQuestion()}
            />
            <button
              onClick={handleAddQuestion}
              className="text-xs px-3 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>

      {/* Scope Boundaries: Questions That Belong Elsewhere */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">5. Scope Boundaries (Questions That Belong Elsewhere)</h3>
            <p className="text-xs text-slate-500">
              Prevents topic dilution and keyword cannibalization by explicitly routing related queries to existing pages.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {audienceAndIntent.questionsBelongElsewhere.map((item, idx) => (
            <div key={idx} className="p-3 bg-amber-50/50 border border-amber-200 rounded-lg text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900">"{item.question}"</span>
                <button
                  onClick={() => handleRemoveScopeQuestion(idx)}
                  className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-slate-600">
                <span className="text-slate-500">Route to:</span>
                <code className="text-teal-800 bg-white px-2 py-0.5 rounded border border-amber-200 font-mono">
                  {item.targetPage}
                </code>
                <span className="text-slate-500">• Reason: {item.reason}</span>
              </div>
            </div>
          ))}

          {/* Add Scope boundary form */}
          <div className="p-3 border border-slate-200 rounded-lg bg-slate-50 space-y-2 text-xs">
            <span className="font-semibold text-slate-700 block">Add Out-of-Scope Query & Routing Target:</span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <input
                type="text"
                value={newScopeQuestion}
                onChange={(e) => setNewScopeQuestion(e.target.value)}
                placeholder="Question (e.g. Best nightlife in Old Montreal)"
                className="p-2 border border-slate-300 rounded bg-white text-xs"
              />
              <input
                type="text"
                value={newScopeTarget}
                onChange={(e) => setNewScopeTarget(e.target.value)}
                placeholder="Target URL / Page"
                className="p-2 border border-slate-300 rounded bg-white text-xs"
              />
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newScopeReason}
                  onChange={(e) => setNewScopeReason(e.target.value)}
                  placeholder="Routing Reason"
                  className="flex-1 p-2 border border-slate-300 rounded bg-white text-xs"
                />
                <button
                  onClick={handleAddScopeQuestion}
                  className="text-xs px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white font-medium rounded cursor-pointer shrink-0"
                >
                  Add Scope
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
