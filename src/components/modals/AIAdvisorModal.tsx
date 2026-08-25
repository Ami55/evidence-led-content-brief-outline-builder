import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Bot,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ShieldCheck,
  RefreshCw,
  ArrowRight,
  Layers
} from 'lucide-react';
import { FullBriefProjectState } from '../../types';
import { askEvidenceAdvisor } from '../../lib/api';

interface AIAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: FullBriefProjectState;
  onApplyAISynthesis: (synthesisResult: any) => void;
}

export const AIAdvisorModal: React.FC<AIAdvisorModalProps> = ({
  isOpen,
  onClose,
  state,
  onApplyAISynthesis
}) => {
  const [activeTab, setActiveTab] = useState<'synthesize' | 'info_gain'>('synthesize');
  const [loading, setLoading] = useState(false);
  const [synthesisOutput, setSynthesisOutput] = useState<any | null>(null);
  const [infoGainOutput, setInfoGainOutput] = useState<any[] | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleRunSynthesis = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const data = await askEvidenceAdvisor('synthesize-brief', {
          project: state.project,
          siteEvidence: state.siteEvidence,
          queryEvidence: state.queryEvidence,
          citationEvidence: state.citationEvidence
        
      });
      if (data.status === 'success') {
        setSynthesisOutput(data.result);
      } else {
        setErrorMsg(data.error || 'Failed to synthesize brief.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'API request failed');
    } finally {
      setLoading(false);
    }
  };

  const handleRunInfoGain = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const data = await askEvidenceAdvisor('generate-info-gain', {
          topic: state.project.proposedTopic,
          destination: state.project.destinationOrSubject,
          audience: state.project.targetAudience
        
      });
      setInfoGainOutput(data.suggestions || []);
    } catch (err: any) {
      setErrorMsg(err.message || 'API request failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Evidence Brief AI Strategist</h2>
              <span className="text-[11px] text-slate-500">Powered by Gemini 3.7 Flash (Server-Side)</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto text-xs">
          {/* Sub-tab pills */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
            <button
              onClick={() => setActiveTab('synthesize')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                activeTab === 'synthesize' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Synthesize Evidence-Led Brief
            </button>
            <button
              onClick={() => setActiveTab('info_gain')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                activeTab === 'info_gain' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Brainstorm Guide Info-Gain
            </button>
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* TAB 1: SYNTHESIZE */}
          {activeTab === 'synthesize' && (
            <div className="space-y-4">
              <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-200 space-y-2">
                <span className="font-bold text-indigo-900 block">AI Strategic Synthesis Protocol:</span>
                <p className="text-indigo-800 leading-relaxed">
                  Analyzes your {state.siteEvidence.length} site architecture findings, {state.queryEvidence.length} query clusters, and {state.citationEvidence.length} citation reverse engineering records to generate a unified, non-cannibalizing brief recommendation with Canadian spelling enforcement.
                </p>
                <button
                  onClick={handleRunSynthesis}
                  disabled={loading}
                  className="mt-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                  <span>{loading ? 'Synthesizing with Gemini 3.7...' : 'Run Evidence-Led Synthesis'}</span>
                </button>
              </div>

              {synthesisOutput && (
                <div className="bg-slate-900 text-slate-100 p-5 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="font-bold text-teal-400 text-xs uppercase tracking-wider">
                      Gemini 3.7 Synthesis Result
                    </span>
                    <button
                      onClick={() => {
                        onApplyAISynthesis(synthesisOutput);
                        onClose();
                      }}
                      className="px-3 py-1 bg-teal-600 hover:bg-teal-700 text-white rounded font-bold text-xs cursor-pointer"
                    >
                      Apply to Current Brief
                    </button>
                  </div>

                  <pre className="text-[11px] font-mono whitespace-pre-wrap overflow-x-auto max-h-72 text-slate-300">
                    {JSON.stringify(synthesisOutput, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: INFO GAIN */}
          {activeTab === 'info_gain' && (
            <div className="space-y-4">
              <div className="p-4 bg-teal-50/50 rounded-xl border border-teal-200 space-y-2">
                <span className="font-bold text-teal-900 block">Brainstorm Authentic Local Guide Secrets:</span>
                <p className="text-teal-800 leading-relaxed">
                  Generates unique local knowledge hooks (e.g. metro elevator shortcuts, hill avoidance routes, ticketing nuances) that prevent generic regurgitated content.
                </p>
                <button
                  onClick={handleRunInfoGain}
                  disabled={loading}
                  className="mt-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-bold rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{loading ? 'Consulting Gemini...' : 'Generate Information-Gain Hooks'}</span>
                </button>
              </div>

              {infoGainOutput && (
                <div className="space-y-2">
                  {infoGainOutput.map((item, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                      <span className="font-bold text-slate-900 block">{item.need || `Insight ${idx + 1}`}</span>
                      <p className="text-slate-700">{item.contribution || item.insight}</p>
                      {item.placeholder && (
                        <span className="text-[10px] font-mono text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 inline-block">
                          {item.placeholder}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
