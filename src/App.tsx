import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar, ActiveTab } from './components/Sidebar';
import { OverviewView } from './components/views/OverviewView';
import { ImportedEvidenceView } from './components/views/ImportedEvidenceView';
import { EvidenceReconciliationView } from './components/views/EvidenceReconciliationView';
import { ContentDecisionGateView } from './components/views/ContentDecisionGateView';
import { AudienceIntentView } from './components/views/AudienceIntentView';
import { QueryTopicMapView } from './components/views/QueryTopicMapView';
import { EntityPlanView } from './components/views/EntityPlanView';
import { CompetitorCitationView } from './components/views/CompetitorCitationView';
import { InformationGainPlanView } from './components/views/InformationGainPlanView';
import { InternalLinkPlanView } from './components/views/InternalLinkPlanView';
import { ContentBriefView } from './components/views/ContentBriefView';
import { ContentOutlineView } from './components/views/ContentOutlineView';
import { SpecializedBriefsView } from './components/views/SpecializedBriefsView';
import { EditorialQAView } from './components/views/EditorialQAView';
import { ReportsExportsView } from './components/views/ReportsExportsView';
import { SavedBriefsView } from './components/views/SavedBriefsView';

import { ProjectSetupModal } from './components/modals/ProjectSetupModal';
import { ProvenanceDrawer } from './components/modals/ProvenanceDrawer';
import { AIAdvisorModal } from './components/modals/AIAdvisorModal';
import { ExportModal } from './components/modals/ExportModal';
import { VersionHistoryModal } from './components/modals/VersionHistoryModal';
import { HowItWorksModal } from './components/modals/HowItWorksModal';
import { Footer } from './components/Footer';

import { demoMontrealProject } from './data/demoMontreal';
import { FullBriefProjectState, BriefStatus, BriefVersionItem } from './types';
import { calculateEvidenceCompleteness } from './utils/evidenceScoring';
import { runEditorialQA } from './utils/editorialValidator';
import confetti from 'canvas-confetti';

export function App() {
  const [state, setState] = useState<FullBriefProjectState>(demoMontrealProject);
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');

  // Modals & Drawers
  const [projectSetupOpen, setProjectSetupOpen] = useState(false);
  const [versionHistoryOpen, setVersionHistoryOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [inspectingItem, setInspectingItem] = useState<any | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [isBuilding, setIsBuilding] = useState(false);
  const [howItWorksOpen, setHowItWorksOpen] = useState(false);

  const triggerToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Calculations
  const completeness = useMemo(() => calculateEvidenceCompleteness(state), [state]);
  const qaResult = useMemo(() => runEditorialQA(state), [state]);

  const unresolvedConflictCount = state.conflicts.filter(c => c.status === 'Unresolved').length;

  // Handlers
  const handleLoadDemo = () => {
    setState(demoMontrealProject);
    setActiveTab('overview');
    triggerToast('Loaded Montreal Senior Transit & Mobility Demo Project');
  };

  const handleUpdateStatus = (newStatus: BriefStatus) => {
    if (newStatus === 'Ready for writing' && !qaResult.isReadyForWriting) {
      alert(`Cannot mark "Ready for writing". There are ${qaResult.blockerCount} unresolved blocker(s) in Editorial QA.`);
      setActiveTab('editorial-qa');
      return;
    }
    setState(prev => ({ ...prev, status: newStatus, lastModified: new Date().toISOString() }));
    triggerToast(`Status updated to: ${newStatus}`);
    if (newStatus === 'Ready for writing' || newStatus === 'Approved') {
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
    }
  };

  const handleApproveDecision = () => {
    setState(prev => ({
      ...prev,
      decision: {
        ...prev.decision,
        humanApprovalStatus: 'Approved',
        approvedBy: 'Senior Content Strategist',
        approvalDate: new Date().toISOString().split('T')[0]
      }
    }));
    triggerToast('Content Decision Gate approved!');
    confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
  };

  const handleBuildBrief = () => {
    setIsBuilding(true);
    setTimeout(() => {
      setIsBuilding(false);
      setActiveTab('content-brief');
      triggerToast('Evidence-Led Brief synthesized and ready for review!');
      confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
    }, 600);
  };

  const handleResolveConflict = (conflictId: string, resolutionStatus: 'Accepted Recommendation' | 'Manually Overridden', notes?: string) => {
    setState(prev => ({
      ...prev,
      conflicts: prev.conflicts.map(c =>
        c.id === conflictId
          ? { ...c, status: resolutionStatus, resolutionNotes: notes || c.resolutionNotes }
          : c
      )
    }));
    triggerToast(`Conflict ${resolutionStatus}`);
  };

  const handleSaveNewVersion = (summary: string) => {
    const newVerNum = `v1.${state.versions.length}`;
    const newVer: BriefVersionItem = {
      version: newVerNum,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      createdBy: 'Editorial Strategist',
      changeSummary: summary,
      snapshotState: JSON.parse(JSON.stringify(state))
    };
    setState(prev => ({
      ...prev,
      versions: [...prev.versions, newVer]
    }));
    triggerToast(`Snapshot ${newVerNum} saved to version history`);
  };

  const handleRestoreVersion = (ver: BriefVersionItem) => {
    setState(ver.snapshotState);
    triggerToast(`Restored snapshot ${ver.version}`);
  };

  const handleApplyAISynthesis = (synth: any) => {
    if (!synth) return;
    setState(prev => ({
      ...prev,
      decision: {
        ...prev.decision,
        reason: synth.justification || prev.decision.reason
      }
    }));
    triggerToast('AI synthesis applied to brief!');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900 antialiased selection:bg-teal-100 selection:text-teal-900">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-medium border border-slate-800 animate-in fade-in slide-in-from-bottom duration-200 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-teal-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        state={state}
        completenessScore={completeness.totalScore}
        onOpenProjectSetup={() => setProjectSetupOpen(true)}
        onOpenVersionHistory={() => setVersionHistoryOpen(true)}
        onOpenExportModal={() => setExportModalOpen(true)}
        onOpenAIModal={() => setAiModalOpen(true)}
        onLoadDemo={handleLoadDemo}
        onUpdateStatus={handleUpdateStatus}
        onBuildBrief={handleBuildBrief}
        isGenerating={isBuilding}
        onOpenHowItWorks={() => setHowItWorksOpen(true)}
      />

      {/* Main Workspace Layout */}
      <div className="flex-1 flex flex-col md:flex-row max-w-[1600px] w-full mx-auto">
        {/* Left Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          state={state}
          unresolvedConflictCount={unresolvedConflictCount}
          qaBlockerCount={qaResult.blockerCount}
        />

        {/* Center Workspace View Container */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto max-h-[calc(100vh-60px)]">
          {activeTab === 'overview' && (
            <OverviewView
              state={state}
              completeness={completeness}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onApproveDecision={handleApproveDecision}
            />
          )}

          {activeTab === 'imported-evidence' && (
            <ImportedEvidenceView
              state={state}
              onUpdateState={setState}
              onInspectProvenance={(item) => setInspectingItem(item)}
            />
          )}

          {activeTab === 'evidence-reconciliation' && (
            <EvidenceReconciliationView
              state={state}
              onResolveConflict={handleResolveConflict}
            />
          )}

          {activeTab === 'content-decision' && (
            <ContentDecisionGateView
              state={state}
              onUpdateDecision={(updater) => setState(prev => ({ ...prev, decision: updater(prev.decision) }))}
              onUpdateState={setState}
            />
          )}

          {activeTab === 'audience-intent' && (
            <AudienceIntentView
              state={state}
              onUpdateState={setState}
            />
          )}

          {activeTab === 'query-topic-map' && (
            <QueryTopicMapView
              state={state}
              onUpdateState={setState}
            />
          )}

          {activeTab === 'entity-plan' && (
            <EntityPlanView
              state={state}
              onUpdateState={setState}
            />
          )}

          {activeTab === 'competitor-citation' && (
            <CompetitorCitationView
              state={state}
              onUpdateState={setState}
            />
          )}

          {activeTab === 'information-gain' && (
            <InformationGainPlanView
              state={state}
              onUpdateState={setState}
              onGenerateAISuggestions={() => setAiModalOpen(true)}
            />
          )}

          {activeTab === 'internal-links' && (
            <InternalLinkPlanView
              state={state}
              onUpdateState={setState}
            />
          )}

          {activeTab === 'content-brief' && (
            <ContentBriefView
              state={state}
              onUpdateState={setState}
              onOpenExportModal={() => setExportModalOpen(true)}
            />
          )}

          {activeTab === 'content-outline' && (
            <ContentOutlineView
              state={state}
              onUpdateState={setState}
            />
          )}

          {activeTab === 'specialized-briefs' && (
            <SpecializedBriefsView
              state={state}
              onUpdateState={setState}
            />
          )}

          {activeTab === 'editorial-qa' && (
            <EditorialQAView
              state={state}
              onUpdateState={setState}
              onMarkReadyForWriting={() => handleUpdateStatus('Ready for writing')}
            />
          )}

          {activeTab === 'reports-exports' && (
            <ReportsExportsView
              state={state}
            />
          )}

          {activeTab === 'saved-briefs' && (
            <SavedBriefsView
              state={state}
              onRestoreVersion={handleRestoreVersion}
              onSaveNewVersion={handleSaveNewVersion}
            />
          )}
        </main>
      </div>

      <Footer />

      {/* Modals & Slide-Out Drawers */}
      <ProjectSetupModal
        isOpen={projectSetupOpen}
        onClose={() => setProjectSetupOpen(false)}
        project={state.project}
        onSave={(updated) => {
          setState(prev => ({ ...prev, project: updated }));
          triggerToast('Project settings updated.');
        }}
      />

      <ProvenanceDrawer
        item={inspectingItem}
        onClose={() => setInspectingItem(null)}
      />

      <AIAdvisorModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        state={state}
        onApplyAISynthesis={handleApplyAISynthesis}
      />

      <ExportModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        state={state}
      />

      <VersionHistoryModal
        isOpen={versionHistoryOpen}
        onClose={() => setVersionHistoryOpen(false)}
        state={state}
        onRestoreVersion={handleRestoreVersion}
        onSaveNewVersion={handleSaveNewVersion}
      />
      <HowItWorksModal isOpen={howItWorksOpen} onClose={() => setHowItWorksOpen(false)} />
    </div>
  );
}

export default App;
