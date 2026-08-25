export type OperatingMode = 'connected' | 'standalone';

export type ContentAction =
  | 'create_new_page'
  | 'create_supporting_article'
  | 'update_existing_page'
  | 'expand_existing_section'
  | 'add_new_section'
  | 'merge_overlapping_pages'
  | 'redirect_duplicate_page'
  | 'repurpose_existing_page'
  | 'improve_internal_links_only'
  | 'no_new_content_required'
  | 'further_validation_required';

export type TargetContentStatus =
  | 'Unknown'
  | 'New content'
  | 'Existing content update'
  | 'Add section'
  | 'Merge'
  | 'Repurpose'
  | 'Uncovered Gap'
  | 'Thin Existing Page'
  | 'Well Covered'
  | 'Duplicate Overlap';

export type OutputGoal =
  | 'decision_only'
  | 'content_brief'
  | 'content_outline'
  | 'full_brief_and_outline';

export type BriefStatus =
  | 'Draft'
  | 'Evidence incomplete'
  | 'Human input required'
  | 'Ready for review'
  | 'Approved'
  | 'Ready for writing'
  | 'Rejected'
  | 'Archived';

export type HumanApprovalStatus = 'Approved' | 'Pending Review' | 'Pending' | 'Rejected' | 'Needs SME Review' | 'Excluded';

export type QueryClassification =
  | 'Observed Gemini Search Query'
  | 'AI-Predicted Fan-out'
  | 'SERP-Validated Query'
  | 'GSC-Observed Query'
  | 'Human-Approved Opportunity';

export type EvidenceLabel =
  | 'Observed API Data'
  | 'Extracted Page Evidence'
  | 'Cross-run Pattern'
  | 'Comparative Finding'
  | 'Likely Citation Factor'
  | 'Unverified Hypothesis'
  | 'Unable to Determine';

export type EntityPriority =
  | 'Essential'
  | 'Supporting'
  | 'Optional'
  | 'Irrelevant'
  | 'Requires Verification'
  | 'Critical'
  | 'Recommended';

export type OutlineFormatType =
  | 'direct_answer'
  | 'short_paragraph'
  | 'bullet_list'
  | 'comparison_table'
  | 'step_by_step'
  | 'itinerary'
  | 'seasonal_breakdown'
  | 'local_insight_box'
  | 'practical_tip'
  | 'faq'
  | 'decision_guide'
  | 'call_to_action'
  | 'Factual Summary'
  | 'Step-by-Step Guide'
  | 'Comparative Matrix Table'
  | 'Bullet Advice Checklist'
  | 'Interactive FAQ Block'
  | 'Commercial Callout Box'
  | 'Local Secret Callout';

export interface ProjectMetadata {
  id: string;
  name: string;
  destinationOrSubject: string;
  proposedTopic: string;
  targetAudience: string;
  targetDomain: string;
  country: string;
  language: string;
  businessObjective: string;
  preferredConversionAction: string;
  existingTargetUrl?: string;
  proposedPageType?: string;
  targetContentStatus: TargetContentStatus;
  mode: OperatingMode;
  outputGoal: OutputGoal;
  manualNotes: string;
  supportingUrls: string[];
  smeInsights: string[];
  brandGuidelines: string[];
  updatedAt: string;
  owner: string;
}

export interface SiteArchitectureEvidenceItem {
  id: string;
  projectId: string;
  opportunityId: string;
  destinationOrSubject: string;
  topic: string;
  contentCluster: string;
  existingUrls: string[];
  pageTypes: string[];
  coverageStatus: 'Uncovered Gap' | 'Thin Coverage' | 'Overlapping Coverage' | 'Outdated Coverage' | 'Complete Coverage';
  structuralGap: string;
  topicGap: string;
  intentGap: string;
  entityGap: string;
  internalLinkGap: string;
  competitorUrls: string[];
  duplicateOverlapFindings: string;
  preliminaryRecommendation: ContentAction;
  preliminaryPriority: 'High' | 'Medium' | 'Low';
  supportingEvidence: string;
  humanApprovalStatus: 'Approved' | 'Pending Review' | 'Rejected';
  confidence: number;
  dateCollected: string;
  sourceApp: 'Site Content Architecture & Gap Auditor';
}

export interface QueryFanOutEvidenceItem {
  id: string;
  projectId: string;
  promptId: string;
  seedPrompt: string;
  query: string;
  queryClassification: QueryClassification;
  queryCluster: string;
  searchIntent: 'Informational' | 'Commercial Investigation' | 'Transactional' | 'Navigational' | 'Local / Planning';
  journeyStage: 'Early Planning' | 'Destination Discovery' | 'Logistics & Transit' | 'Booking / Decision' | 'In-Destination Experience';
  relevantEntities: string[];
  expectedAnswerType: 'Direct Answer' | 'Comparative Table' | 'Step-by-Step Guide' | 'Local Guide Tips' | 'Transit Map / Fare Table';
  observationFrequency: number;
  businessRelevance: 'High' | 'Medium' | 'Low';
  recommendedContentFormat: string;
  coverageStatus: 'Covered' | 'Missing' | 'Cannibalized';
  approvedTestPrompts: string[];
  humanApprovalStatus: 'Approved' | 'Pending Review' | 'Excluded';
  priority: 'High' | 'Medium' | 'Low';
  includeInOutline: boolean;
  excludeReason?: string;
  dateCollected: string;
  sourceApp: 'Query Fan-out Explorer';
}

export interface CitationEvidenceItem {
  id: string;
  projectId: string;
  promptId: string;
  platform: 'Google Gemini Search' | 'ChatGPT Search' | 'Perplexity' | 'Google AI Overviews';
  model: string;
  testPrompt: string;
  searchQuery: string;
  retrievedSources: string[];
  citedSources: string[];
  mentionedCompetitors: string[];
  citedClaims: string[];
  citedPassages: string[];
  retrievalFrequency: number;
  citationFrequency: number;
  citationConversionRate: number;
  crossPlatformPresence: string;
  competitorPage: string;
  closestTargetPage: string;
  observedDifference: string;
  likelyCitationBarrier: string;
  recommendedExperiment: string;
  evidenceLabel: EvidenceLabel;
  confidence: number;
  humanApprovalStatus: 'Approved' | 'Pending Review' | 'Rejected';
  dateCollected: string;
  sourceApp: 'AI Citation Reverse Engineering';
}

export interface EvidenceConflictItem {
  id: string;
  title: string;
  findingA: {
    source: string;
    claim: string;
    precedenceRank: number;
  };
  findingB: {
    source: string;
    claim: string;
    precedenceRank: number;
  };
  conflictType:
    | 'Action Conflict'
    | 'Page Type Mismatch'
    | 'Canonical URL Ambiguity'
    | 'Intent Conflict'
    | 'Competitor Gap vs Real User Demand'
    | 'Outdated Evidence vs Fresh SERP';
  recommendedResolution: string;
  confidence: number;
  status: 'Unresolved' | 'Accepted Recommendation' | 'Manually Overridden';
  humanDecisionRequired: boolean;
  resolutionNotes?: string;
}

export interface ContentDecision {
  action: ContentAction;
  recommendedTargetUrl: string;
  existingUrlsAffected: string[];
  canonicalKeepUrl: string;
  urlsToMergeOrRedirect: string[];
  recommendedPageType: string;
  reason: string;
  supportingEvidence: string;
  alternativeConsidered: string;
  whyAlternativeRejected: string;
  confidence: number;
  humanApprovalStatus: 'Pending' | 'Approved' | 'Rejected' | 'Needs SME Review';
  approvedBy?: string;
  approvalDate?: string;
}

export interface AudienceAndIntent {
  primaryAudience: string;
  secondaryAudience: string;
  travellerContext: string;
  primaryNeed: string;
  secondaryNeeds: string[];
  primarySearchIntent: string;
  supportingIntents: string[];
  journeyStage: string;
  desiredNextAction: string;
  relevantConstraints: {
    ageAndMobility: string;
    firstTimeVisit: string;
    tripDuration: string;
    seasonAndWeather: string;
    budget: string;
    transportationRealities: string;
    dietaryOrAccessibility: string;
  };
  questionsMustAnswer: string[];
  questionsBelongElsewhere: {
    question: string;
    targetPage: string;
    reason: string;
  }[];
}

export interface QueryMapCluster {
  id: string;
  clusterName: string;
  representativeQuery: string;
  supportingQueries: string[];
  classification: QueryClassification;
  searchIntent: string;
  journeyStage: string;
  evidenceSource: string;
  observationFrequency: number;
  recommendedPlacement: string;
  priority: 'High' | 'Medium' | 'Low';
  includeInOutline: boolean;
  excludeReason?: string;
  expectedAnswerType?: string;
  businessRelevance?: string;
}

export interface EntityPlanItem {
  id: string;
  entity: string;
  entityType: 'Destination' | 'Neighbourhood' | 'Transit System' | 'Ticket / Pass' | 'Attraction' | 'Organization' | 'Constraint';
  relationship: string;
  relevantQueryClusters: string[];
  userValue: string;
  existingCoverage: string;
  competitorCoverage: string;
  recommendedSection: string;
  evidenceRequired: string;
  priority: EntityPriority;
  verified: boolean;
}

export interface CompetitorInsightItem {
  id: string;
  competitor: string;
  url: string;
  pageType: string;
  userNeedAddressed: string;
  triggeringQuery: string;
  retrievedOrCitationStatus: 'Cited & Retrieved' | 'Retrieved Only' | 'Ranked on SERP' | 'Uncited';
  claimSupported: string;
  contentCharacteristic: string;
  targetSiteDifference: string;
  isTrueGap: boolean;
  recommendedResponse: string;
  evidenceLabel: EvidenceLabel;
  confidence: number;
}

export interface InformationGainItem {
  id: string;
  informationNeed: string;
  proposedUniqueContribution: string;
  potentialSource: string;
  evidenceStatus: 'Verified Local Knowledge' | 'Requires SME Verification' | 'Internal Data Available' | 'Preliminary Observation';
  relevantSection: string;
  expertInputRequired: boolean;
  verificationStatus: 'Pending SME Input' | 'Verified by Local Guide' | 'Drafted with Placeholder' | 'Desk Research Needed';
  placeholderTag?: string;
}

export interface InternalLinkItem {
  id: string;
  sourceUrl?: string;
  targetUrl: string;
  direction: 'Inbound' | 'Outbound' | 'Cross-link' | 'Inbound from Parent' | 'Outbound to Child' | 'Outbound to Commercial' | 'Lateral Cross-Link';
  relationship: string;
  suggestedSection?: string;
  suggestedAnchorConcept: string;
  userBenefit: string;
  existingLinkStatus: 'Existing' | 'Missing' | 'Planned URL' | 'Proposed New' | 'Already Linked' | 'Needs Update';
  priority?: 'High' | 'Medium' | 'Low';
}

export interface ContentBrief {
  contentDecision: ContentDecision;
  contentObjective: {
    userGoal: string;
    businessObjective: string;
    desiredNextAction: string;
    roleInSiteArchitecture: string;
  };
  audience: {
    primary: string;
    secondary: string;
    situationAndConstraints: string;
    existingKnowledge: string;
    keyConcerns: string;
  };
  intent: {
    primaryIntent: string;
    supportingIntents: string[];
    journeyStage: string;
    userQuestions: string[];
  };
  topicScope: {
    topicsToCover: string[];
    topicsToMentionBriefly: string[];
    topicsToExclude: string[];
    topicsCoveredByOtherPages: { topic: string; targetUrl: string }[];
    overlapRisks: string[];
  };
  evidenceRequirements: {
    timeSensitiveFacts: {
      fact: string;
      sourceUrl?: string;
      publisher?: string;
      lastVerified?: string;
      freshnessRisk: 'High' | 'Medium' | 'Low';
    }[];
    statementsRequiringVerification: string[];
    localInsightRequirements: string[];
  };
  editorialRequirements: {
    tone: string;
    canadianSpellingEnforced: boolean;
    brandTerminologyRules: string[];
    prohibitedLanguage: string[];
    scannabilityStandards: string[];
  };
  successCriteria: string[];
}

export interface OutlineSection {
  id: string;
  heading: string;
  level: 'H2' | 'H3';
  sectionObjective: string;
  questionsAnswered: string[];
  queryCluster: string;
  searchIntent?: string;
  relevantEntities?: string[];
  keyPoints: string[];
  evidence: string;
  informationGain: string;
  internalLinks: string[];
  approximateDepth: 'Concise (100-150 words)' | 'Standard (200-300 words)' | 'Comprehensive (350-500 words)' | 'Brief (<150 words)' | 'Moderate (150-300 words)' | 'Deep (>300 words)';
  formatType: OutlineFormatType | string;
  writerNotes: string;
  topicsToAvoidDuplicating: string;
}

export interface ContentOutline {
  proposedH1: string;
  introPurpose: string;
  sections: OutlineSection[];
}

export interface UpdateBriefData {
  existingUrl: string;
  existingPageType: string;
  sectionsToKeep: string[];
  sectionsToRevise: string[];
  sectionsToRemove: string[];
  sectionsToAdd: string[];
  outdatedFacts: string[];
  missingQueries: string[];
  missingEntities: string[];
  missingInternalLinks: string[];
  duplicateContent: string[];
  informationGainOpportunities: string[];
  redirectOrCanonicalImplications: string;
  preservationRisks: string[];
}

export interface MergeBriefData {
  canonicalKeepUrl: string;
  sourceUrlsToMerge: {
    url: string;
    title: string;
    uniqueInformationToPreserve: string[];
    contentToRemove: string[];
    internalLinksToUpdate: string[];
  }[];
  redirectMapping: { from: string; to: string; status: '301 Permanent' }[];
  duplicationRisks: string[];
  humanApprovalRequired: boolean;
  approvalNotes?: string;
}

export interface SectionBriefData {
  targetParentUrl: string;
  recommendedPlacement: string;
  proposedHeading: string;
  userNeed: string;
  queries: string[];
  entities: string[];
  keyPoints: string[];
  evidenceRequired: string;
  internalLinks: string[];
  approximateDepth: string;
  whySeparatePageUnnecessary: string;
}

export interface EditorialQACheckItem {
  id: string;
  category: 'User Need & Intent' | 'Evidence & Provenance' | 'Site Architecture & Cannibalization' | 'Information Gain & SME' | 'ToursByLocals Editorial Compliance' | 'Source Freshness & Safety';
  title: string;
  description: string;
  status: 'pass' | 'warning' | 'blocker';
  details: string;
  remediation?: string;
}

export interface EvidenceCompletenessScore {
  totalScore: number;
  breakdown: {
    siteArchitecture: number;
    existingContent: number;
    queryEvidence: number;
    intentEvidence: number;
    entityEvidence: number;
    competitorEvidence: number;
    citationEvidence: number;
    internalLinkEvidence: number;
    smeExpertise: number;
    sourceVerification: number;
  };
  availableEvidence: string[];
  missingEvidence: string[];
  blockingGaps: string[];
  nonBlockingGaps: string[];
  recommendedNextActions: string[];
}

export interface BriefVersionItem {
  version: string;
  createdAt: string;
  createdBy: string;
  changeSummary: string;
  reviewerNotes?: string;
  snapshotState: FullBriefProjectState;
}

export interface SavedBriefVersion {
  id: string;
  versionNumber: number;
  timestamp: string;
  author: string;
  summary: string;
  status: BriefStatus;
  data: FullBriefProjectState;
  reviewerNotes: {
    author: string;
    date: string;
    note: string;
  }[];
}

export interface FullBriefProjectState {
  project: ProjectMetadata;
  status: BriefStatus;
  siteEvidence: SiteArchitectureEvidenceItem[];
  queryEvidence: QueryFanOutEvidenceItem[];
  citationEvidence: CitationEvidenceItem[];
  conflicts: EvidenceConflictItem[];
  decision: ContentDecision;
  audienceAndIntent: AudienceAndIntent;
  queryClusters: QueryMapCluster[];
  entityPlan: EntityPlanItem[];
  competitorInsights: CompetitorInsightItem[];
  informationGainPlan: InformationGainItem[];
  internalLinkPlan: InternalLinkItem[];
  contentBrief: ContentBrief;
  contentOutline: ContentOutline;
  updateBrief: UpdateBriefData;
  mergeBrief: MergeBriefData;
  sectionBrief: SectionBriefData;
  versions: BriefVersionItem[];
  lastModified?: string;
}

// Aliases for compatibility
export type ContentOutlineSection = OutlineSection;
export type QueryClusterMapItem = QueryMapCluster;
export type InformationGainPlanItem = InformationGainItem;
export type InternalLinkPlanItem = InternalLinkItem;
