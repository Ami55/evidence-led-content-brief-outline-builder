import React, { useState } from 'react';
import {
  ListTree,
  Copy,
  Check,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Sparkles,
  BookOpen,
  Link2,
  CheckCircle2,
  AlertTriangle,
  Layers,
  FileText
} from 'lucide-react';
import { FullBriefProjectState, ContentOutlineSection } from '../../types';
import { exportOutlineOnlyMarkdown } from '../../utils/exportHelpers';

interface ContentOutlineViewProps {
  state: FullBriefProjectState;
  onUpdateState: (updater: (prev: FullBriefProjectState) => FullBriefProjectState) => void;
}

export const ContentOutlineView: React.FC<ContentOutlineViewProps> = ({
  state,
  onUpdateState
}) => {
  const { contentOutline } = state;
  const [copied, setCopied] = useState(false);
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);

  const handleCopyOutline = () => {
    const md = exportOutlineOnlyMarkdown(state);
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMoveSection = (index: number, direction: 'up' | 'down') => {
    const newSections = [...contentOutline.sections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newSections.length) return;

    const temp = newSections[index];
    newSections[index] = newSections[targetIndex];
    newSections[targetIndex] = temp;

    onUpdateState(prev => ({
      ...prev,
      contentOutline: {
        ...prev.contentOutline,
        sections: newSections
      }
    }));
  };

  const handleAddSection = () => {
    const newSection: ContentOutlineSection = {
      id: `sec_${Date.now()}`,
      heading: 'New Section Heading',
      level: 'H2',
      formatType: 'Factual Summary',
      approximateDepth: 'Moderate (150-300 words)',
      sectionObjective: 'Provide clear actionable guidance.',
      questionsAnswered: ['How should travellers handle this?'],
      queryCluster: 'General',
      keyPoints: ['Key point 1', 'Key point 2'],
      evidence: 'Imported findings',
      informationGain: 'Local Guide tip',
      internalLinks: ['/montreal-tours'],
      writerNotes: 'Follow Canadian spelling and avoid travel clichés.',
      topicsToAvoidDuplicating: 'Do not repeat introductory airport guidance.'
    };

    onUpdateState(prev => ({
      ...prev,
      contentOutline: {
        ...prev.contentOutline,
        sections: [...prev.contentOutline.sections, newSection]
      }
    }));
    setEditingSectionId(newSection.id);
  };

  const handleRemoveSection = (id: string) => {
    onUpdateState(prev => ({
      ...prev,
      contentOutline: {
        ...prev.contentOutline,
        sections: prev.contentOutline.sections.filter(s => s.id !== id)
      }
    }));
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <ListTree className="w-5 h-5 text-indigo-600" />
              Content Outline
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded bg-indigo-50 text-indigo-800 font-semibold border border-indigo-200">
              {contentOutline.sections.length} Sections
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Hierarchical blueprint with questions answered, formatting specifications, and guide information-gain callouts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyOutline}
            className="text-xs px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Outline' : 'Copy Outline Only'}</span>
          </button>
          <button
            onClick={handleAddSection}
            className="text-xs px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Section</span>
          </button>
        </div>
      </div>

      {/* Proposed H1 & Intro Container */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
            Proposed H1 Headline
          </label>
          <input
            type="text"
            value={contentOutline.proposedH1}
            onChange={(e) => onUpdateState(prev => ({
              ...prev,
              contentOutline: { ...prev.contentOutline, proposedH1: e.target.value }
            }))}
            className="w-full p-2.5 border border-slate-300 rounded-lg text-base font-bold text-slate-900 bg-slate-50 focus:bg-white"
          />
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
            Introduction Purpose & Immediate Answer
          </label>
          <textarea
            value={contentOutline.introPurpose}
            onChange={(e) => onUpdateState(prev => ({
              ...prev,
              contentOutline: { ...prev.contentOutline, introPurpose: e.target.value }
            }))}
            rows={2}
            className="w-full p-2.5 border border-slate-300 rounded-lg text-xs bg-slate-50 focus:bg-white text-slate-700 leading-relaxed"
          />
        </div>
      </div>

      {/* Outline Sections List */}
      <div className="space-y-4">
        {contentOutline.sections.map((sec, idx) => (
          <div
            key={sec.id}
            className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4 hover:border-slate-300 transition-all"
          >
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-md bg-indigo-50 text-indigo-700 font-bold text-xs flex items-center justify-center">
                  {idx + 1}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{sec.heading}</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] font-semibold text-slate-500">{sec.level}</span>
                    <span className="text-[11px] text-slate-400">•</span>
                    <span className="text-[11px] font-medium text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                      Format: {sec.formatType}
                    </span>
                    <span className="text-[11px] text-slate-500">({sec.approximateDepth})</span>
                  </div>
                </div>
              </div>

              {/* Controls: Reorder / Delete */}
              <div className="flex items-center gap-1 self-end sm:self-auto">
                <button
                  disabled={idx === 0}
                  onClick={() => handleMoveSection(idx, 'up')}
                  className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                  title="Move Up"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  disabled={idx === contentOutline.sections.length - 1}
                  onClick={() => handleMoveSection(idx, 'down')}
                  className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                  title="Move Down"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleRemoveSection(sec.id)}
                  className="p-1 text-slate-400 hover:text-rose-600 transition-colors ml-2 cursor-pointer"
                  title="Delete Section"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Section Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-2">
                <div>
                  <span className="font-semibold text-slate-700 block mb-0.5">Section Objective:</span>
                  <p className="text-slate-600 bg-slate-50 p-2 rounded border border-slate-100">{sec.sectionObjective}</p>
                </div>

                <div>
                  <span className="font-semibold text-slate-700 block mb-0.5">Questions Answered:</span>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-700 bg-slate-50 p-2 rounded border border-slate-100">
                    {sec.questionsAnswered.map((q, i) => (
                      <li key={i}>{q}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="font-semibold text-slate-700 block mb-0.5">Key Content Points:</span>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-700 bg-slate-50 p-2 rounded border border-slate-100">
                    {sec.keyPoints.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-2">
                <div className="bg-teal-50/70 p-3 rounded-lg border border-teal-200 space-y-1">
                  <span className="font-bold text-teal-900 block flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-teal-700" />
                    Information-Gain / Guide Callout:
                  </span>
                  <p className="text-teal-800 leading-relaxed font-medium">
                    {sec.informationGain}
                  </p>
                </div>

                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-1">
                  <span className="font-semibold text-slate-700 block">Writer Notes & Phrasing:</span>
                  <p className="text-slate-600">{sec.writerNotes}</p>
                </div>

                <div className="bg-rose-50/60 p-2.5 rounded-lg border border-rose-200 text-rose-800 space-y-0.5">
                  <span className="font-semibold block text-[11px]">Avoid Duplicating / Cannibalizing:</span>
                  <p className="text-[11px]">{sec.topicsToAvoidDuplicating}</p>
                </div>
              </div>
            </div>

            {/* Internal Links to Embed */}
            {sec.internalLinks.length > 0 && (
              <div className="flex items-center gap-2 text-xs text-slate-600 border-t border-slate-100 pt-2.5">
                <Link2 className="w-3.5 h-3.5 text-teal-600" />
                <span className="font-medium">Mandatory Internal Links:</span>
                <span className="font-mono text-teal-800">{sec.internalLinks.join(', ')}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
