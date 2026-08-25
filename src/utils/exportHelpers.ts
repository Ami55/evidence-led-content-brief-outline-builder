import { FullBriefProjectState } from '../types';

export function exportFullBriefMarkdown(state: FullBriefProjectState): string {
  const { project, decision, audienceAndIntent, queryClusters, entityPlan, competitorInsights, informationGainPlan, internalLinkPlan, contentBrief, contentOutline } = state;

  return `# Content Brief & Outline: ${project.proposedTopic}
**Destination / Subject:** ${project.destinationOrSubject}  
**Target Domain:** ${project.targetDomain}  
**Status:** ${state.status} | **Target Action:** ${decision.action.toUpperCase()}  
**Target URL:** ${decision.recommendedTargetUrl}  
**Canonical Keep URL:** ${decision.canonicalKeepUrl}  
**Generated:** ${new Date().toISOString()}  

---

## Required Editorial Disclaimer
> "This application transforms observable site, query, competitor and citation evidence into editorial recommendations. Recommendations are not proof of ranking or citation outcomes and require human editorial review before implementation."

---

## 1. Content Decision Gate
- **Action:** \`${decision.action}\`
- **Recommended Page Type:** ${decision.recommendedPageType}
- **Recommended Target URL:** ${decision.recommendedTargetUrl}
- **Canonical Keep URL:** ${decision.canonicalKeepUrl}
- **Existing URLs Affected:** ${decision.existingUrlsAffected.join(', ') || 'None'}
- **URLs to Merge/Redirect:** ${decision.urlsToMergeOrRedirect.join(', ') || 'None'}
- **Decision Rationale:** ${decision.reason}
- **Supporting Evidence:** ${decision.supportingEvidence}
- **Alternative Considered:** ${decision.alternativeConsidered}
- **Why Alternative Was Rejected:** ${decision.whyAlternativeRejected}
- **Confidence:** ${(decision.confidence * 100).toFixed(0)}%
- **Human Approval Status:** ${decision.humanApprovalStatus} (Approved by: ${decision.approvedBy || 'Pending'})

---

## 2. Audience & Intent Profile
- **Primary Audience:** ${audienceAndIntent.primaryAudience}
- **Secondary Audience:** ${audienceAndIntent.secondaryAudience}
- **Traveller / Customer Context:** ${audienceAndIntent.travellerContext}
- **Primary User Need:** ${audienceAndIntent.primaryNeed}
- **Primary Search Intent:** ${audienceAndIntent.primarySearchIntent}
- **Journey Stage:** ${audienceAndIntent.journeyStage}
- **Desired Next Action:** ${audienceAndIntent.desiredNextAction}

### Key Constraints:
- **Age & Mobility:** ${audienceAndIntent.relevantConstraints.ageAndMobility}
- **First-Time Visit Realities:** ${audienceAndIntent.relevantConstraints.firstTimeVisit}
- **Trip Duration:** ${audienceAndIntent.relevantConstraints.tripDuration}
- **Season & Weather:** ${audienceAndIntent.relevantConstraints.seasonAndWeather}
- **Transportation Realities:** ${audienceAndIntent.relevantConstraints.transportationRealities}

### Questions Content Must Answer:
${audienceAndIntent.questionsMustAnswer.map(q => `- [x] ${q}`).join('\n')}

### Questions That Belong Elsewhere (Scope Boundaries):
${audienceAndIntent.questionsBelongElsewhere.map(q => `- **${q.question}** -> Route to \`${q.targetPage}\` (${q.reason})`).join('\n')}

---

## 3. Query & Topic Map
| Cluster | Representative Query | Classification | Intent | Frequency | Placement |
| :--- | :--- | :--- | :--- | :--- | :--- |
${queryClusters.map(q => `| **${q.clusterName}** | \`${q.representativeQuery}\` | ${q.classification} | ${q.searchIntent} | ${q.observationFrequency} | ${q.recommendedPlacement} |`).join('\n')}

---

## 4. Entity Plan & Semantic Relationships
| Entity | Type | Relationship to Subject | Section | Priority | Verified |
| :--- | :--- | :--- | :--- | :--- | :--- |
${entityPlan.map(e => `| **${e.entity}** | ${e.entityType} | ${e.relationship} | ${e.recommendedSection} | ${e.priority} | ${e.verified ? '✅ Yes' : '⚠️ Pending'} |`).join('\n')}

---

## 5. Information-Gain Plan (Authentic Local Expertise)
| Unique Contribution / Local Secret | Potential Source | Status | Section | Placeholder |
| :--- | :--- | :--- | :--- | :--- |
${informationGainPlan.map(i => `| ${i.proposedUniqueContribution} | ${i.potentialSource} | ${i.verificationStatus} | ${i.relevantSection} | \`${i.placeholderTag || 'None'}\` |`).join('\n')}

---

## 6. Competitor & Citation Learnings (Anti-Copying)
| Competitor & URL | Claim / Topic Supported | Observed Target Difference | Strategic Response (Do NOT Copy) |
| :--- | :--- | :--- | :--- |
${competitorInsights.map(c => `| [${c.competitor}](${c.url}) | ${c.claimSupported} | ${c.targetSiteDifference} | **${c.recommendedResponse}** |`).join('\n')}

---

## 7. Internal-Link Mesh
| Direction | Target URL | Relationship | Anchor Concept | User Benefit | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
${internalLinkPlan.map(l => `| ${l.direction} | \`${l.targetUrl}\` | ${l.relationship} | "${l.suggestedAnchorConcept}" | ${l.userBenefit} | ${l.existingLinkStatus} |`).join('\n')}

---

## 8. Editorial & Freshness Requirements
- **Tone:** ${contentBrief.editorialRequirements.tone}
- **Canadian Spelling Enforced:** ${contentBrief.editorialRequirements.canadianSpellingEnforced ? 'Yes (traveller, neighbourhood, favourite, centre, colour, etc.)' : 'No'}
- **Brand Terminology Rule:** Use "guides on ToursByLocals" or "local guides". NEVER use "our guides" or "our tours".
- **Banned Clichés:** ${contentBrief.editorialRequirements.prohibitedLanguage.join(', ')}

### Time-Sensitive Facts & Sources:
${contentBrief.evidenceRequirements.timeSensitiveFacts.map(f => `- **${f.fact}** (Source: [${f.publisher || 'Official Source'}](${f.sourceUrl || '#'}) | Verified: ${f.lastVerified || 'Pending'} | Risk: ${f.freshnessRisk})`).join('\n')}

---

## 9. Content Outline (Structured Hierarchy)

# ${contentOutline.proposedH1}

> **Introduction Purpose:** ${contentOutline.introPurpose}

${contentOutline.sections.map((sec, idx) => `
### Section ${idx + 1}: ${sec.heading} (${sec.level})
- **Format Type:** \`${sec.formatType}\` | **Depth:** ${sec.approximateDepth}
- **Section Objective:** ${sec.sectionObjective}
- **Questions Answered:** ${sec.questionsAnswered.join(', ')}
- **Query Cluster:** ${sec.queryCluster}
- **Key Points:**
${sec.keyPoints.map(p => `  * ${p}`).join('\n')}
- **Evidence / Citations:** ${sec.evidence}
- **Information Gain Callout:** ${sec.informationGain}
- **Internal Links:** ${sec.internalLinks.join(', ') || 'None'}
- **Writer Notes:** ${sec.writerNotes}
- **Topics to Avoid Duplicating:** ${sec.topicsToAvoidDuplicating}
`).join('\n---\n')}

---

## Success Criteria Checklist
${contentBrief.successCriteria.map(s => `- [ ] ${s}`).join('\n')}

---
*© 2026 Evidence-Led Content Brief & Outline Builder. Created by Ami Saeednia. All rights reserved.*
`;
}

export function exportOutlineOnlyMarkdown(state: FullBriefProjectState): string {
  const { contentOutline, project } = state;
  return `# ${contentOutline.proposedH1}
**Topic:** ${project.proposedTopic}  
**Audience:** ${project.targetAudience}  

**Introduction Purpose:**  
${contentOutline.introPurpose}

${contentOutline.sections.map((sec, idx) => `
## ${idx + 1}. ${sec.heading}
* **Format:** ${sec.formatType} (${sec.approximateDepth})
* **Objective:** ${sec.sectionObjective}
* **Questions Answered:**
${sec.questionsAnswered.map(q => `  - ${q}`).join('\n')}
* **Key Content Points:**
${sec.keyPoints.map(p => `  - ${p}`).join('\n')}
* **Local Guide Information Gain:** ${sec.informationGain}
* **Internal Links:** ${sec.internalLinks.join(', ') || 'None'}
* **Writer Guidance:** ${sec.writerNotes}
`).join('\n')}
`;
}

export function exportToCSV(data: any[], filename: string) {
  if (!data || data.length === 0) return;
  const headers = Object.keys(data[0]);
  const rows = data.map(obj =>
    headers.map(header => {
      let val = obj[header];
      if (Array.isArray(val)) val = val.join('; ');
      if (typeof val === 'object' && val !== null) val = JSON.stringify(val);
      val = String(val ?? '').replace(/"/g, '""');
      return `"${val}"`;
    }).join(',')
  );

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportToJSON(data: any, filename: string) {
  const jsonStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
  const link = document.createElement('a');
  link.setAttribute('href', jsonStr);
  link.setAttribute('download', `${filename}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
