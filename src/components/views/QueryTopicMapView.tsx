import React, { useState } from 'react';
import {
  Search,
  CheckCircle2,
  AlertCircle,
  Filter,
  Plus,
  Trash2,
  Layers,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { FullBriefProjectState, QueryClusterMapItem, QueryClassification } from '../../types';

interface QueryTopicMapViewProps {
  state: FullBriefProjectState;
  onUpdateState: (updater: (prev: FullBriefProjectState) => FullBriefProjectState) => void;
}

export const QueryTopicMapView: React.FC<QueryTopicMapViewProps> = ({
  state,
  onUpdateState
}) => {
  const { queryClusters } = state;
  const [searchTerm, setSearchTerm] = useState('');
  const [classificationFilter, setClassificationFilter] = useState<string>('all');

  const queryClassColors: Record<QueryClassification, string> = {
    'Observed Gemini Search Query': 'bg-indigo-50 text-indigo-700 border-indigo-200',
    'AI-Predicted Fan-out': 'bg-purple-50 text-purple-700 border-purple-200',
    'SERP-Validated Query': 'bg-blue-50 text-blue-700 border-blue-200',
    'GSC-Observed Query': 'bg-teal-50 text-teal-700 border-teal-200',
    'Human-Approved Opportunity': 'bg-emerald-50 text-emerald-700 border-emerald-200'
  };

  const filteredClusters = queryClusters.filter((c) => {
    const matchesSearch =
      c.clusterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.representativeQuery.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.supportingQueries.some((sq) => sq.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesClass =
      classificationFilter === 'all' || c.classification === classificationFilter;

    return matchesSearch && matchesClass;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Search className="w-5 h-5 text-teal-600" />
            Query & Topic Map
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Groups queries into semantic clusters with explicit provenance classification, search intent, and outline placement.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search queries..."
              className="text-xs pl-8 pr-3 py-1.5 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white"
            />
          </div>

          <select
            value={classificationFilter}
            onChange={(e) => setClassificationFilter(e.target.value)}
            className="text-xs px-2.5 py-1.5 border border-slate-300 rounded-lg bg-slate-50 font-medium"
          >
            <option value="all">All Classifications</option>
            <option value="Observed Gemini Search Query">Observed Gemini Search Query</option>
            <option value="AI-Predicted Fan-out">AI-Predicted Fan-out</option>
            <option value="SERP-Validated Query">SERP-Validated Query</option>
            <option value="GSC-Observed Query">GSC-Observed Query</option>
            <option value="Human-Approved Opportunity">Human-Approved Opportunity</option>
          </select>
        </div>
      </div>

      {/* Cluster Grid */}
      <div className="space-y-4">
        {filteredClusters.map((cluster) => (
          <div key={cluster.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900">{cluster.clusterName}</span>
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded border ${queryClassColors[cluster.classification] || 'bg-slate-100'}`}>
                    {cluster.classification}
                  </span>
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Representative Query: <code className="text-teal-800 font-mono font-medium">"{cluster.representativeQuery}"</code>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right text-xs">
                  <span className="text-slate-400 block text-[10px]">Observation Freq.</span>
                  <span className="font-bold text-slate-800">{cluster.observationFrequency.toLocaleString()}</span>
                </div>
                <div className="text-right text-xs">
                  <span className="text-slate-400 block text-[10px]">Intent</span>
                  <span className="font-semibold text-slate-700">{cluster.searchIntent}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <span className="font-semibold text-slate-700 block mb-1">Supporting Fan-Out Queries:</span>
                <ul className="list-disc list-inside space-y-0.5 text-slate-600">
                  {cluster.supportingQueries.map((sq, i) => (
                    <li key={i} className="truncate" title={sq}>{sq}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <span className="font-semibold text-slate-700 block mb-1">Expected Answer Format:</span>
                <p className="text-slate-800 font-medium">{cluster.expectedAnswerType}</p>
                <span className="text-slate-500 block text-[11px] mt-1">
                  Relevance: {cluster.businessRelevance}
                </span>
              </div>

              <div className="bg-teal-50/50 p-3 rounded-lg border border-teal-100 flex flex-col justify-between">
                <div>
                  <span className="font-semibold text-teal-900 block mb-1">Recommended Outline Placement:</span>
                  <p className="text-teal-800 font-medium">{cluster.recommendedPlacement}</p>
                </div>
                <span className="text-[11px] text-teal-600 font-semibold mt-2">
                  Mapped to Outline Section
                </span>
              </div>
            </div>
          </div>
        ))}

        {filteredClusters.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-500 text-xs">
            No query clusters match your search criteria.
          </div>
        )}
      </div>
    </div>
  );
};
