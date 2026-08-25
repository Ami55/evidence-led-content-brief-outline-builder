import React, { useState } from 'react';
import {
  Database,
  Upload,
  Search,
  CheckCircle2,
  AlertCircle,
  FileJson,
  FileSpreadsheet,
  Info,
  ExternalLink,
  Plus,
  Trash2,
  Eye,
  Layers,
  Sparkles,
  Link,
  BookOpen
} from 'lucide-react';
import {
  FullBriefProjectState,
  SiteArchitectureEvidenceItem,
  QueryFanOutEvidenceItem,
  CitationEvidenceItem,
  QueryClassification,
  EvidenceLabel
} from '../../types';

interface ImportedEvidenceViewProps {
  state: FullBriefProjectState;
  onUpdateState: (updater: (prev: FullBriefProjectState) => FullBriefProjectState) => void;
  onInspectProvenance: (item: any) => void;
}

export const ImportedEvidenceView: React.FC<ImportedEvidenceViewProps> = ({
  state,
  onUpdateState,
  onInspectProvenance
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'site' | 'queries' | 'citations' | 'sme' | 'raw_import'>('site');
  const [searchFilter, setSearchFilter] = useState('');

  // Classification styling
  const queryClassColors: Record<QueryClassification, string> = {
    'Observed Gemini Search Query': 'bg-indigo-50 text-indigo-700 border-indigo-200',
    'AI-Predicted Fan-out': 'bg-purple-50 text-purple-700 border-purple-200',
    'SERP-Validated Query': 'bg-blue-50 text-blue-700 border-blue-200',
    'GSC-Observed Query': 'bg-teal-50 text-teal-700 border-teal-200',
    'Human-Approved Opportunity': 'bg-emerald-50 text-emerald-700 border-emerald-200'
  };

  const citationLabelColors: Record<EvidenceLabel, string> = {
    'Observed API Data': 'bg-teal-50 text-teal-700 border-teal-200',
    'Extracted Page Evidence': 'bg-blue-50 text-blue-700 border-blue-200',
    'Cross-run Pattern': 'bg-indigo-50 text-indigo-700 border-indigo-200',
    'Comparative Finding': 'bg-cyan-50 text-cyan-700 border-cyan-200',
    'Likely Citation Factor': 'bg-amber-50 text-amber-700 border-amber-200',
    'Unverified Hypothesis': 'bg-rose-50 text-rose-700 border-rose-200',
    'Unable to Determine': 'bg-slate-50 text-slate-700 border-slate-200'
  };

  // CSV/JSON File Parser
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'site' | 'queries' | 'citations') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        if (file.name.endsWith('.json')) {
          const parsed = JSON.parse(text);
          const arrayData = Array.isArray(parsed) ? parsed : [parsed];
          onUpdateState((prev) => {
            if (target === 'site') return { ...prev, siteEvidence: [...prev.siteEvidence, ...arrayData] };
            if (target === 'queries') return { ...prev, queryEvidence: [...prev.queryEvidence, ...arrayData] };
            return { ...prev, citationEvidence: [...prev.citationEvidence, ...arrayData] };
          });
        } else if (file.name.endsWith('.csv')) {
          // Simple CSV parser
          const lines = text.split('\n').filter(l => l.trim().length > 0);
          const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
          const rows = lines.slice(1).map(line => {
            const values = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));
            const obj: any = {};
            headers.forEach((h, i) => {
              obj[h] = values[i] || '';
            });
            return obj;
          });

          onUpdateState((prev) => {
            if (target === 'site') {
              const items: SiteArchitectureEvidenceItem[] = rows.map((r, i) => ({
                id: `site_import_${Date.now()}_${i}`,
                projectId: prev.project.id,
                opportunityId: r.opportunityId || `opp_${i}`,
                destinationOrSubject: r.destinationOrSubject || prev.project.destinationOrSubject,
                topic: r.topic || r.proposedTopic || 'Imported Topic',
                contentCluster: r.contentCluster || 'General',
                existingUrls: r.existingUrls ? r.existingUrls.split(';') : [],
                pageTypes: r.pageTypes ? r.pageTypes.split(';') : ['Article'],
                coverageStatus: (r.coverageStatus as any) || 'Uncovered Gap',
                structuralGap: r.structuralGap || '',
                topicGap: r.topicGap || '',
                intentGap: r.intentGap || '',
                entityGap: r.entityGap || '',
                internalLinkGap: r.internalLinkGap || '',
                competitorUrls: r.competitorUrls ? r.competitorUrls.split(';') : [],
                duplicateOverlapFindings: r.duplicateOverlapFindings || '',
                preliminaryRecommendation: (r.preliminaryRecommendation as any) || 'create_supporting_article',
                preliminaryPriority: (r.preliminaryPriority as any) || 'High',
                supportingEvidence: r.supportingEvidence || 'CSV import',
                humanApprovalStatus: 'Approved',
                confidence: parseFloat(r.confidence) || 0.9,
                dateCollected: new Date().toISOString().split('T')[0],
                sourceApp: 'Site Content Architecture & Gap Auditor'
              }));
              return { ...prev, siteEvidence: [...prev.siteEvidence, ...items] };
            } else if (target === 'queries') {
              const items: QueryFanOutEvidenceItem[] = rows.map((r, i) => ({
                id: `q_import_${Date.now()}_${i}`,
                projectId: prev.project.id,
                promptId: r.promptId || `prompt_${i}`,
                seedPrompt: r.seedPrompt || prev.project.proposedTopic,
                query: r.query || r.Query || 'Imported Query',
                queryClassification: (r.queryClassification as any) || 'SERP-Validated Query',
                queryCluster: r.queryCluster || 'Imported Cluster',
                searchIntent: (r.searchIntent as any) || 'Informational',
                journeyStage: (r.journeyStage as any) || 'Planning',
                relevantEntities: r.relevantEntities ? r.relevantEntities.split(';') : [],
                expectedAnswerType: (r.expectedAnswerType as any) || 'Direct Answer',
                observationFrequency: parseInt(r.observationFrequency) || 500,
                businessRelevance: (r.businessRelevance as any) || 'High',
                recommendedContentFormat: r.recommendedContentFormat || 'Article',
                coverageStatus: (r.coverageStatus as any) || 'Missing',
                approvedTestPrompts: [],
                humanApprovalStatus: 'Approved',
                priority: (r.priority as any) || 'High',
                includeInOutline: true,
                dateCollected: new Date().toISOString().split('T')[0],
                sourceApp: 'Query Fan-out Explorer'
              }));
              return { ...prev, queryEvidence: [...prev.queryEvidence, ...items] };
            } else {
              const items: CitationEvidenceItem[] = rows.map((r, i) => ({
                id: `cit_import_${Date.now()}_${i}`,
                projectId: prev.project.id,
                promptId: r.promptId || `cit_prompt_${i}`,
                platform: (r.platform as any) || 'Google Gemini Search',
                model: r.model || 'gemini-2.5-flash',
                testPrompt: r.testPrompt || 'Test prompt',
                searchQuery: r.searchQuery || 'Search query',
                retrievedSources: r.retrievedSources ? r.retrievedSources.split(';') : [],
                citedSources: r.citedSources ? r.citedSources.split(';') : [],
                mentionedCompetitors: r.mentionedCompetitors ? r.mentionedCompetitors.split(';') : [],
                citedClaims: r.citedClaims ? r.citedClaims.split(';') : [],
                citedPassages: r.citedPassages ? r.citedPassages.split(';') : [],
                retrievalFrequency: parseInt(r.retrievalFrequency) || 1,
                citationFrequency: parseInt(r.citationFrequency) || 1,
                citationConversionRate: parseFloat(r.citationConversionRate) || 1,
                crossPlatformPresence: r.crossPlatformPresence || '',
                competitorPage: r.competitorPage || '',
                closestTargetPage: r.closestTargetPage || '',
                observedDifference: r.observedDifference || '',
                likelyCitationBarrier: r.likelyCitationBarrier || '',
                recommendedExperiment: r.recommendedExperiment || '',
                evidenceLabel: (r.evidenceLabel as any) || 'Observed API Data',
                confidence: parseFloat(r.confidence) || 0.9,
                humanApprovalStatus: 'Approved',
                dateCollected: new Date().toISOString().split('T')[0],
                sourceApp: 'AI Citation Reverse Engineering'
              }));
              return { ...prev, citationEvidence: [...prev.citationEvidence, ...items] };
            }
          });
        }
      } catch (err) {
        alert('Failed to parse file: ' + err);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Database className="w-5 h-5 text-teal-600" />
            Imported Evidence Repository
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Preserves complete source provenance, confidence scores, and raw findings from connected systems.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Sub-tab pills */}
          <button
            onClick={() => setActiveSubTab('site')}
            className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              activeSubTab === 'site'
                ? 'bg-teal-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Site Architecture ({state.siteEvidence.length})
          </button>
          <button
            onClick={() => setActiveSubTab('queries')}
            className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              activeSubTab === 'queries'
                ? 'bg-teal-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Query Fan-Out ({state.queryEvidence.length})
          </button>
          <button
            onClick={() => setActiveSubTab('citations')}
            className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              activeSubTab === 'citations'
                ? 'bg-teal-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            AI Citations ({state.citationEvidence.length})
          </button>
          <button
            onClick={() => setActiveSubTab('sme')}
            className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              activeSubTab === 'sme'
                ? 'bg-teal-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            SME Insights ({state.project.smeInsights.length})
          </button>
          <button
            onClick={() => setActiveSubTab('raw_import')}
            className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              activeSubTab === 'raw_import'
                ? 'bg-teal-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            + Upload Files
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: SITE ARCHITECTURE EVIDENCE */}
      {activeSubTab === 'site' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700">
              Site Content Architecture & Gap Auditor Findings ({state.siteEvidence.length})
            </span>
          </div>

          {state.siteEvidence.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-500">
              <Database className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="font-medium text-sm text-slate-700">No site architecture evidence imported.</p>
              <p className="text-xs text-slate-500 mt-1">Upload a CSV/JSON export or operate in Standalone Mode.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {state.siteEvidence.map((item) => (
                <div key={item.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{item.topic}</span>
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                          {item.coverageStatus}
                        </span>
                        <span className="text-[11px] text-slate-500">Opp ID: {item.opportunityId}</span>
                      </div>
                      <span className="text-xs text-slate-500 mt-0.5 block">Cluster: {item.contentCluster}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-1 rounded">
                        Action: {item.preliminaryRecommendation}
                      </span>
                      <button
                        onClick={() => onInspectProvenance(item)}
                        className="text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Provenance</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="font-semibold text-slate-700 block mb-1">Structural & Topic Gaps:</span>
                      <p className="text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded border border-slate-100">
                        {item.structuralGap} {item.topicGap}
                      </p>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-700 block mb-1">Entity & Intent Gap:</span>
                      <p className="text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded border border-slate-100">
                        {item.entityGap || 'None specified'} • {item.intentGap}
                      </p>
                    </div>
                  </div>

                  <div className="text-xs text-slate-600 pt-1 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100">
                    <div>
                      <span className="font-medium text-slate-700">Existing Target URLs: </span>
                      {item.existingUrls.map((u, i) => (
                        <a key={i} href={u} target="_blank" rel="noreferrer" className="text-teal-600 hover:underline mr-2">
                          {u.replace('https://www.toursbylocals.com', '')}
                        </a>
                      ))}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Confidence: {(item.confidence * 100).toFixed(0)}% • Collected: {item.dateCollected}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 2: QUERY FAN-OUT EVIDENCE */}
      {activeSubTab === 'queries' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700">
              Imported Query Fan-out Explorer Findings ({state.queryEvidence.length})
            </span>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold sticky top-0">
                    <th className="py-2.5 px-3">Query</th>
                    <th className="py-2.5 px-3">Classification</th>
                    <th className="py-2.5 px-3">Cluster</th>
                    <th className="py-2.5 px-3">Intent / Stage</th>
                    <th className="py-2.5 px-3 text-right">Frequency</th>
                    <th className="py-2.5 px-3 text-center">Outline Status</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {state.queryEvidence.map((q) => (
                    <tr key={q.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-2.5 px-3 font-medium text-slate-900 max-w-xs truncate" title={q.query}>
                        {q.query}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={`text-[11px] px-2 py-0.5 rounded border font-medium whitespace-nowrap ${queryClassColors[q.queryClassification] || 'bg-slate-100 text-slate-700'}`}>
                          {q.queryClassification}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-slate-600">{q.queryCluster}</td>
                      <td className="py-2.5 px-3 text-slate-600">
                        {q.searchIntent} <span className="text-slate-400">({q.journeyStage})</span>
                      </td>
                      <td className="py-2.5 px-3 text-right font-semibold text-slate-800">
                        {q.observationFrequency ? q.observationFrequency.toLocaleString() : '-'}
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <button
                          onClick={() => {
                            onUpdateState(prev => ({
                              ...prev,
                              queryEvidence: prev.queryEvidence.map(item =>
                                item.id === q.id ? { ...item, includeInOutline: !item.includeInOutline } : item
                              )
                            }));
                          }}
                          className={`text-[11px] px-2 py-0.5 rounded font-medium transition-colors cursor-pointer ${
                            q.includeInOutline ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          {q.includeInOutline ? 'Included' : 'Excluded'}
                        </button>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <button
                          onClick={() => onInspectProvenance(q)}
                          className="text-xs text-teal-600 hover:text-teal-800 font-medium cursor-pointer"
                        >
                          Provenance
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: AI CITATION EVIDENCE */}
      {activeSubTab === 'citations' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700">
              AI Citation Reverse Engineering Findings ({state.citationEvidence.length})
            </span>
          </div>

          <div className="space-y-3">
            {state.citationEvidence.map((cit) => (
              <div key={cit.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{cit.platform}</span>
                      <span className={`text-[11px] font-medium px-2 py-0.5 rounded border ${citationLabelColors[cit.evidenceLabel] || 'bg-slate-100 text-slate-700'}`}>
                        {cit.evidenceLabel}
                      </span>
                      <span className="text-[11px] text-slate-500">Model: {cit.model}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 italic">
                      Test Prompt: "{cit.testPrompt}"
                    </p>
                  </div>

                  <button
                    onClick={() => onInspectProvenance(cit)}
                    className="text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer self-start sm:self-auto"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Provenance</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-2">
                    <span className="font-semibold text-slate-700 block">Cited Claims & Passages:</span>
                    <ul className="list-disc list-inside space-y-1 text-slate-600">
                      {cit.citedClaims.map((claim, idx) => (
                        <li key={idx}>{claim}</li>
                      ))}
                    </ul>
                    {cit.citedPassages.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-slate-200 text-slate-500 italic">
                        {cit.citedPassages[0]}
                      </div>
                    )}
                  </div>

                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-2">
                    <span className="font-semibold text-slate-700 block">Competitor Difference & Citation Barrier:</span>
                    <p className="text-slate-600">
                      <span className="font-medium text-slate-800">Observed Difference: </span>
                      {cit.observedDifference}
                    </p>
                    <p className="text-slate-600">
                      <span className="font-medium text-slate-800">Likely Barrier: </span>
                      {cit.likelyCitationBarrier}
                    </p>
                    <p className="text-teal-700 font-medium">
                      Recommended Action: {cit.recommendedExperiment}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 border-t border-slate-100 pt-2">
                  <div>
                    Cited Competitors: <span className="font-semibold text-slate-700">{cit.mentionedCompetitors.join(', ') || 'None'}</span>
                  </div>
                  <div>
                    Citation Frequency: {cit.citationFrequency}/{cit.retrievalFrequency} ({(cit.citationConversionRate * 100).toFixed(0)}%)
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 4: SME & GUIDE INSIGHTS */}
      {activeSubTab === 'sme' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700">
              Subject-Matter Expert & Local Guide Insights ({state.project.smeInsights.length})
            </span>
          </div>

          <div className="space-y-3">
            {state.project.smeInsights.map((insight, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs text-xs flex items-start gap-3">
                <BookOpen className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-slate-800 leading-relaxed font-medium">{insight}</p>
                </div>
              </div>
            ))}

            {state.project.smeInsights.length === 0 && (
              <div className="bg-white border border-slate-200 rounded-xl p-6 text-center text-slate-500 text-xs">
                No guide or SME insights uploaded yet. Add manual notes or upload expert transcripts.
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUB-TAB 5: RAW UPLOAD / CSV / JSON IMPORTER */}
      {activeSubTab === 'raw_import' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Upload Upstream Evidence Exports</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Supports CSV and JSON files exported from Site Content Architecture, Query Fan-out, and Citation Reverse Engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Slot 1: Site Architecture */}
            <div className="border border-dashed border-slate-300 hover:border-teal-500 rounded-xl p-5 text-center transition-colors bg-slate-50/50">
              <Database className="w-8 h-8 text-teal-600 mx-auto mb-2" />
              <h4 className="font-semibold text-xs text-slate-800">1. Site Architecture Export</h4>
              <p className="text-[11px] text-slate-500 mt-1 mb-3">Upload .json or .csv findings</p>
              <label className="text-xs px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 rounded font-medium text-slate-700 cursor-pointer shadow-2xs">
                Choose File
                <input
                  type="file"
                  accept=".csv,.json"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, 'site')}
                />
              </label>
            </div>

            {/* Slot 2: Query Fan-out */}
            <div className="border border-dashed border-slate-300 hover:border-teal-500 rounded-xl p-5 text-center transition-colors bg-slate-50/50">
              <Search className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
              <h4 className="font-semibold text-xs text-slate-800">2. Query Fan-Out Export</h4>
              <p className="text-[11px] text-slate-500 mt-1 mb-3">Upload .json or .csv queries</p>
              <label className="text-xs px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 rounded font-medium text-slate-700 cursor-pointer shadow-2xs">
                Choose File
                <input
                  type="file"
                  accept=".csv,.json"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, 'queries')}
                />
              </label>
            </div>

            {/* Slot 3: Citation Reverse Engineering */}
            <div className="border border-dashed border-slate-300 hover:border-teal-500 rounded-xl p-5 text-center transition-colors bg-slate-50/50">
              <Eye className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h4 className="font-semibold text-xs text-slate-800">3. Citation Reverse Eng.</h4>
              <p className="text-[11px] text-slate-500 mt-1 mb-3">Upload .json or .csv citations</p>
              <label className="text-xs px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 rounded font-medium text-slate-700 cursor-pointer shadow-2xs">
                Choose File
                <input
                  type="file"
                  accept=".csv,.json"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, 'citations')}
                />
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
