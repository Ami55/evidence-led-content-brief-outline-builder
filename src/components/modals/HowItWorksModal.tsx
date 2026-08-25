import React from 'react';
import { Database, GitMerge, ListChecks, SearchCheck, X } from 'lucide-react';

export const HowItWorksModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const steps = [
    [Database, '1. Configure the project', 'Set the proposed topic, target domain, audience, destination or subject, and choose standalone or connected evidence mode.'],
    [SearchCheck, '2. Import and score evidence', 'Add site architecture, query fan-out, citation, competitor, and source evidence. Review its freshness, provenance, and confidence.'],
    [GitMerge, '3. Reconcile the evidence', 'Resolve conflicts, decide whether to create, update, merge, or expand content, then map intent, entities, information gain, and internal links.'],
    [ListChecks, '4. Build, review, and export', 'Generate the brief and outline, run editorial QA, save a version, obtain approval, and export only when blockers are resolved.'],
  ] as const;
  return <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm p-4 flex items-center justify-center" onMouseDown={onClose}>
    <section role="dialog" aria-modal="true" aria-labelledby="how-title" onMouseDown={e => e.stopPropagation()} className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
      <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-5 flex justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-700">Instructions & framework</p><h2 id="how-title" className="mt-1 text-2xl font-bold text-slate-950">How the Evidence-Led Brief Builder works</h2></div><button onClick={onClose} aria-label="Close instructions" className="p-2 rounded-lg hover:bg-slate-100"><X className="w-5 h-5" /></button></div>
      <div className="p-6 space-y-6 text-sm text-slate-700">
        <div className="grid sm:grid-cols-2 gap-4">{steps.map(([Icon,title,copy]) => <div key={title} className="rounded-xl border border-slate-200 bg-slate-50 p-4"><Icon className="w-5 h-5 text-teal-700"/><h3 className="mt-3 font-bold text-slate-900">{title}</h3><p className="mt-1 leading-6">{copy}</p></div>)}</div>
        <div className="rounded-xl bg-slate-950 text-slate-100 p-5"><h3 className="font-bold text-base">Evidence-led decision framework</h3><p className="mt-2 leading-6 text-slate-300">Provenance → confidence and freshness → conflict resolution → content decision → audience and intent → query and entity coverage → information gain → internal links → brief and outline → editorial QA and approval.</p></div>
        <div><h3 className="font-bold text-slate-900">Using the AI Advisor</h3><p className="mt-1 leading-6">AI synthesis uses the evidence currently stored in the project. It should support—not replace—editorial judgment. Verify factual claims, preserve source references, resolve blockers, and record human overrides before marking a brief ready for writing.</p></div>
      </div>
    </section>
  </div>;
};
