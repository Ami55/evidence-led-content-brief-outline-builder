import React, { useState } from 'react';
import {
  X,
  Settings,
  Database,
  FileText,
  CheckCircle2,
  Sparkles,
  Link,
  BookOpen
} from 'lucide-react';
import { FullBriefProjectState, ProjectMetadata } from '../../types';

interface ProjectSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectMetadata;
  onSave: (updatedProject: ProjectMetadata) => void;
}

export const ProjectSetupModal: React.FC<ProjectSetupModalProps> = ({
  isOpen,
  onClose,
  project,
  onSave
}) => {
  const [formData, setFormData] = useState<ProjectMetadata>(project);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-teal-600" />
            <h2 className="text-base font-bold text-slate-900">Project Configuration & Evidence Mode</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
          {/* Mode Switcher */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <span className="font-bold text-slate-800 block">Operating Mode:</span>
            <div className="grid grid-cols-2 gap-3">
              <label
                className={`p-3 rounded-lg border flex items-start gap-2 cursor-pointer transition-all ${
                  formData.mode === 'connected'
                    ? 'bg-teal-50 border-teal-600 text-teal-900 font-semibold'
                    : 'bg-white border-slate-200 text-slate-700'
                }`}
              >
                <input
                  type="radio"
                  name="mode"
                  checked={formData.mode === 'connected'}
                  onChange={() => setFormData({ ...formData, mode: 'connected' })}
                  className="mt-0.5 text-teal-600"
                />
                <div>
                  <span className="block text-xs font-bold">Connected Evidence Mode</span>
                  <span className="block text-[11px] text-slate-500 font-normal">
                    Reconciles site architecture, query fan-out & citation findings.
                  </span>
                </div>
              </label>

              <label
                className={`p-3 rounded-lg border flex items-start gap-2 cursor-pointer transition-all ${
                  formData.mode === 'standalone'
                    ? 'bg-teal-50 border-teal-600 text-teal-900 font-semibold'
                    : 'bg-white border-slate-200 text-slate-700'
                }`}
              >
                <input
                  type="radio"
                  name="mode"
                  checked={formData.mode === 'standalone'}
                  onChange={() => setFormData({ ...formData, mode: 'standalone' })}
                  className="mt-0.5 text-teal-600"
                />
                <div>
                  <span className="block text-xs font-bold">Standalone Brief Mode</span>
                  <span className="block text-[11px] text-slate-500 font-normal">
                    Manual entry for standalone brief planning without upstream imports.
                  </span>
                </div>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Project Name:</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2.5 border border-slate-300 rounded-lg text-xs"
                required
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Target Domain:</label>
              <input
                type="text"
                value={formData.targetDomain}
                onChange={(e) => setFormData({ ...formData, targetDomain: e.target.value })}
                className="w-full p-2.5 border border-slate-300 rounded-lg text-xs"
                required
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Destination / Subject:</label>
              <input
                type="text"
                value={formData.destinationOrSubject}
                onChange={(e) => setFormData({ ...formData, destinationOrSubject: e.target.value })}
                className="w-full p-2.5 border border-slate-300 rounded-lg text-xs"
                required
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Target Content Status:</label>
              <select
                value={formData.targetContentStatus}
                onChange={(e) => setFormData({ ...formData, targetContentStatus: e.target.value as any })}
                className="w-full p-2.5 border border-slate-300 rounded-lg text-xs bg-white font-medium"
              >
                <option value="Uncovered Gap">Uncovered Gap</option>
                <option value="Thin Existing Page">Thin Existing Page</option>
                <option value="Well Covered">Well Covered</option>
                <option value="Duplicate Overlap">Duplicate Overlap</option>
                <option value="Unknown">Unknown</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="font-semibold text-slate-700 block mb-1">Proposed Topic:</label>
              <input
                type="text"
                value={formData.proposedTopic}
                onChange={(e) => setFormData({ ...formData, proposedTopic: e.target.value })}
                className="w-full p-2.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-900"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="font-semibold text-slate-700 block mb-1">Target Audience:</label>
              <input
                type="text"
                value={formData.targetAudience}
                onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                className="w-full p-2.5 border border-slate-300 rounded-lg text-xs"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="font-semibold text-slate-700 block mb-1">Business Objective:</label>
              <textarea
                value={formData.businessObjective}
                onChange={(e) => setFormData({ ...formData, businessObjective: e.target.value })}
                rows={2}
                className="w-full p-2.5 border border-slate-300 rounded-lg text-xs"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="font-semibold text-slate-700 block mb-1">Existing Target URL (if updating):</label>
              <input
                type="text"
                value={formData.existingTargetUrl || ''}
                onChange={(e) => setFormData({ ...formData, existingTargetUrl: e.target.value })}
                placeholder="https://example.com/..."
                className="w-full p-2.5 border border-slate-300 rounded-lg font-mono text-xs"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg text-xs transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg text-xs transition-colors shadow-xs"
            >
              Save Project Setup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
