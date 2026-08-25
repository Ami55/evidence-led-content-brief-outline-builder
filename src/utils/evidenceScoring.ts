import { FullBriefProjectState, EvidenceCompletenessScore } from '../types';

export function calculateEvidenceCompleteness(state: FullBriefProjectState): EvidenceCompletenessScore {
  const { siteEvidence, queryEvidence, citationEvidence, project, audienceAndIntent, entityPlan, internalLinkPlan, informationGainPlan, contentBrief } = state;

  let siteArchitectureScore = 0;
  let existingContentScore = 0;
  let queryEvidenceScore = 0;
  let intentEvidenceScore = 0;
  let entityEvidenceScore = 0;
  let competitorEvidenceScore = 0;
  let citationEvidenceScore = 0;
  let internalLinkEvidenceScore = 0;
  let smeExpertiseScore = 0;
  let sourceVerificationScore = 0;

  // 1. Site Architecture (10 pts)
  if (siteEvidence.length > 0) {
    siteArchitectureScore = 10;
  } else if (project.targetContentStatus !== 'Unknown') {
    siteArchitectureScore = 5;
  }

  // 2. Existing Content / Target URL (10 pts)
  if (project.existingTargetUrl && project.existingTargetUrl.length > 5) {
    existingContentScore = 10;
  } else if (siteEvidence.some(s => s.existingUrls.length > 0)) {
    existingContentScore = 8;
  } else {
    existingContentScore = 4;
  }

  // 3. Query Evidence (15 pts)
  if (queryEvidence.length >= 4) {
    queryEvidenceScore = 15;
  } else if (queryEvidence.length > 0) {
    queryEvidenceScore = queryEvidence.length * 3.5;
  }

  // 4. Intent & Audience (10 pts)
  if (audienceAndIntent.primaryNeed && audienceAndIntent.primaryAudience && audienceAndIntent.questionsMustAnswer.length > 0) {
    intentEvidenceScore = 10;
  } else if (project.targetAudience && project.businessObjective) {
    intentEvidenceScore = 6;
  }

  // 5. Entity Plan (10 pts)
  if (entityPlan.length >= 5) {
    entityEvidenceScore = 10;
  } else if (entityPlan.length > 0) {
    entityEvidenceScore = entityPlan.length * 2;
  }

  // 6. Competitor Evidence (10 pts)
  const hasCompetitorData = state.competitorInsights.length > 0 || citationEvidence.some(c => c.mentionedCompetitors.length > 0);
  if (hasCompetitorData) {
    competitorEvidenceScore = 10;
  } else if (project.supportingUrls.length > 0) {
    competitorEvidenceScore = 5;
  }

  // 7. Citation Evidence (10 pts)
  if (citationEvidence.length >= 2) {
    citationEvidenceScore = 10;
  } else if (citationEvidence.length === 1) {
    citationEvidenceScore = 6;
  }

  // 8. Internal Link Plan (10 pts)
  if (internalLinkPlan.length >= 3) {
    internalLinkEvidenceScore = 10;
  } else if (internalLinkPlan.length > 0) {
    internalLinkEvidenceScore = internalLinkPlan.length * 3;
  }

  // 9. SME & Guide Expertise (10 pts)
  if (informationGainPlan.some(i => i.verificationStatus === 'Verified by Local Guide') || project.smeInsights.length > 0) {
    smeExpertiseScore = 10;
  } else if (informationGainPlan.length > 0) {
    smeExpertiseScore = 6;
  }

  // 10. Source Verification & Freshness (5 pts)
  if (contentBrief.evidenceRequirements?.timeSensitiveFacts?.length > 0) {
    sourceVerificationScore = 5;
  } else if (project.supportingUrls.length > 0) {
    sourceVerificationScore = 3;
  }

  const totalScore = Math.min(
    100,
    Math.round(
      siteArchitectureScore +
      existingContentScore +
      queryEvidenceScore +
      intentEvidenceScore +
      entityEvidenceScore +
      competitorEvidenceScore +
      citationEvidenceScore +
      internalLinkEvidenceScore +
      smeExpertiseScore +
      sourceVerificationScore
    )
  );

  const availableEvidence: string[] = [];
  const missingEvidence: string[] = [];
  const blockingGaps: string[] = [];
  const nonBlockingGaps: string[] = [];
  const recommendedNextActions: string[] = [];

  if (siteEvidence.length > 0) {
    availableEvidence.push(`${siteEvidence.length} Site Content Architecture findings imported`);
  } else {
    missingEvidence.push('Site Content Architecture export missing (operating in standalone mode)');
    nonBlockingGaps.push('No upstream gap audit imported; target status set manually.');
  }

  if (queryEvidence.length > 0) {
    availableEvidence.push(`${queryEvidence.length} Query Fan-out findings imported with cluster classifications`);
  } else {
    missingEvidence.push('Query Fan-out findings missing');
    blockingGaps.push('Cannot validate search demand without query clusters.');
    recommendedNextActions.push('Import Query Fan-out CSV/JSON or manually define at least 3 core queries.');
  }

  if (citationEvidence.length > 0) {
    availableEvidence.push(`${citationEvidence.length} AI Citation Reverse Engineering findings imported`);
  } else {
    missingEvidence.push('AI Citation Reverse Engineering findings missing');
    nonBlockingGaps.push('Competitor AI citations not analyzed.');
    recommendedNextActions.push('Run citation reverse engineering to uncover competitor passage patterns.');
  }

  if (project.smeInsights.length > 0 || informationGainPlan.some(i => i.verificationStatus === 'Verified by Local Guide')) {
    availableEvidence.push('First-hand local guide / SME insights captured');
  } else {
    missingEvidence.push('No first-hand SME or local guide insights attached');
    nonBlockingGaps.push('Content risks reading like generic web summaries without authentic guide insights.');
    recommendedNextActions.push('Interview a local guide or subject matter expert for unique information gain.');
  }

  if (contentBrief.evidenceRequirements?.timeSensitiveFacts?.some(f => f.freshnessRisk === 'High' && !f.sourceUrl)) {
    blockingGaps.push('High-risk time-sensitive facts (e.g. taxi fares, transit pass prices) missing authoritative source URLs.');
    recommendedNextActions.push('Add official source URLs for all time-sensitive pricing and transit rules.');
  }

  return {
    totalScore,
    breakdown: {
      siteArchitecture: siteArchitectureScore,
      existingContent: existingContentScore,
      queryEvidence: queryEvidenceScore,
      intentEvidence: intentEvidenceScore,
      entityEvidence: entityEvidenceScore,
      competitorEvidence: competitorEvidenceScore,
      citationEvidence: citationEvidenceScore,
      internalLinkEvidence: internalLinkEvidenceScore,
      smeExpertise: smeExpertiseScore,
      sourceVerification: sourceVerificationScore
    },
    availableEvidence,
    missingEvidence,
    blockingGaps,
    nonBlockingGaps,
    recommendedNextActions
  };
}
