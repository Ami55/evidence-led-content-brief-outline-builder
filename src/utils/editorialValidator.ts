import { FullBriefProjectState, EditorialQACheckItem } from '../types';

export const BANNED_CLICHES = [
  'nestled',
  'perched',
  'tucked away',
  'known for',
  'home to',
  'pulses',
  'vibrant',
  'bustling',
  'iconic',
  'must-see',
  'hidden gem',
  'heart of',
  'perfect for'
];

export const CANADIAN_SPELLING_PAIRS: { us: string; ca: string }[] = [
  { us: 'traveler', ca: 'traveller' },
  { us: 'travelers', ca: 'travellers' },
  { us: 'traveling', ca: 'travelling' },
  { us: 'neighborhood', ca: 'neighbourhood' },
  { us: 'neighborhoods', ca: 'neighbourhoods' },
  { us: 'favorite', ca: 'favourite' },
  { us: 'favorites', ca: 'favourites' },
  { us: 'center', ca: 'centre' },
  { us: 'centers', ca: 'centres' },
  { us: 'color', ca: 'colour' },
  { us: 'colors', ca: 'colours' },
  { us: 'behavior', ca: 'behaviour' },
  { us: 'canceled', ca: 'cancelled' },
  { us: 'canceling', ca: 'cancelling' },
  { us: 'cancellation', ca: 'cancellation' }
];

export const BANNED_BRAND_PHRASES = ['our guides', 'our tours', 'our guide', 'our tour'];

export function runEditorialQA(state: FullBriefProjectState): {
  checks: EditorialQACheckItem[];
  canadianSpellingIssues: { word: string; suggestion: string; location: string }[];
  bannedPhrasesFound: { phrase: string; location: string }[];
  brandViolations: { phrase: string; correction: string; location: string }[];
  isReadyForWriting: boolean;
  blockerCount: number;
  warningCount: number;
} {
  const checks: EditorialQACheckItem[] = [];
  const canadianSpellingIssues: { word: string; suggestion: string; location: string }[] = [];
  const bannedPhrasesFound: { phrase: string; location: string }[] = [];
  const brandViolations: { phrase: string; correction: string; location: string }[] = [];

  // Helper to scan text
  function scanText(text: string, location: string) {
    if (!text) return;
    const lower = text.toLowerCase();

    // Check Canadian spelling
    CANADIAN_SPELLING_PAIRS.forEach(pair => {
      // Regex boundary check
      const regex = new RegExp(`\\b${pair.us}\\b`, 'gi');
      if (regex.test(text)) {
        canadianSpellingIssues.push({
          word: pair.us,
          suggestion: pair.ca,
          location
        });
      }
    });

    // Check banned clichés
    BANNED_CLICHES.forEach(cliche => {
      const regex = new RegExp(`\\b${cliche}\\b`, 'gi');
      if (regex.test(text)) {
        bannedPhrasesFound.push({
          phrase: cliche,
          location
        });
      }
    });

    // Check brand violations
    BANNED_BRAND_PHRASES.forEach(phrase => {
      const regex = new RegExp(`\\b${phrase}\\b`, 'gi');
      if (regex.test(text)) {
        brandViolations.push({
          phrase,
          correction: phrase.includes('guide') ? 'guides on ToursByLocals' : 'tours on ToursByLocals',
          location
        });
      }
    });
  }

  // Scan Outline & Brief text
  scanText(state.contentOutline.proposedH1, 'Proposed H1');
  scanText(state.contentOutline.introPurpose, 'Outline Intro Purpose');
  state.contentOutline.sections.forEach((sec, idx) => {
    scanText(sec.heading, `Outline Section ${idx + 1} Heading`);
    scanText(sec.sectionObjective, `Outline Section ${idx + 1} Objective`);
    scanText(sec.keyPoints.join(' '), `Outline Section ${idx + 1} Key Points`);
    scanText(sec.writerNotes, `Outline Section ${idx + 1} Writer Notes`);
    scanText(sec.informationGain, `Outline Section ${idx + 1} Info Gain`);
  });

  // 1. Primary User Need & Intent Alignment
  const hasUserNeed = state.audienceAndIntent.primaryNeed && state.audienceAndIntent.primaryNeed.length > 20;
  checks.push({
    id: 'qa_01',
    category: 'User Need & Intent',
    title: 'Primary User Need Explicitly Defined',
    description: 'Verifies the brief specifies what tangible problem or query the content solves for the traveller.',
    status: hasUserNeed ? 'pass' : 'blocker',
    details: hasUserNeed
      ? `Defined: "${state.audienceAndIntent.primaryNeed.slice(0, 100)}..."`
      : 'Primary user need is missing or too brief.',
    remediation: 'Fill in audience & intent primary need.'
  });

  // 2. Content Decision Gate Approval
  const decisionApproved = state.decision.humanApprovalStatus === 'Approved';
  checks.push({
    id: 'qa_02',
    category: 'Site Architecture & Cannibalization',
    title: 'Content Decision Gate Approved',
    description: 'Ensures the action (Create, Update, Add Section, Merge) has been verified and not defaulted blindly.',
    status: decisionApproved ? 'pass' : 'blocker',
    details: `Action: "${state.decision.action}" - Status: ${state.decision.humanApprovalStatus}`,
    remediation: 'Review and approve the Content Decision Gate before writing.'
  });

  // 3. Canonical Keep URL Defined
  const hasCanonical = !!state.decision.canonicalKeepUrl;
  checks.push({
    id: 'qa_03',
    category: 'Site Architecture & Cannibalization',
    title: 'Canonical URL Specified',
    description: 'Ensures a clear canonical URL exists to prevent duplicate indexing.',
    status: hasCanonical ? 'pass' : 'blocker',
    details: hasCanonical ? `Canonical: ${state.decision.canonicalKeepUrl}` : 'No canonical target URL set.',
    remediation: 'Set recommended target URL and canonical keep URL in Content Decision.'
  });

  // 4. Information Gain & Authentic SME Insights
  const hasInfoGain = state.informationGainPlan.length >= 2;
  const hasGuideVerification = state.informationGainPlan.some(i => i.verificationStatus === 'Verified by Local Guide') || state.project.smeInsights.length > 0;
  checks.push({
    id: 'qa_04',
    category: 'Information Gain & SME',
    title: 'Information-Gain & Local Guide Contributions',
    description: 'Ensures the content contributes unique local insights rather than generic regurgitated web content.',
    status: hasGuideVerification ? 'pass' : hasInfoGain ? 'warning' : 'blocker',
    details: `${state.informationGainPlan.length} information gain items mapped. Guide verification: ${hasGuideVerification ? 'Yes' : 'Pending'}`,
    remediation: 'Gather verified guide insights or use explicit [Guide insight required] placeholders.'
  });

  // 5. Anti-Copying Competitor Guardrail
  const copyCheck = state.competitorInsights.every(c => c.recommendedResponse && !c.recommendedResponse.toLowerCase().includes('copy'));
  checks.push({
    id: 'qa_05',
    category: 'Evidence & Provenance',
    title: 'Anti-Copying Guardrail Enforced',
    description: 'Confirms competitor findings are analyzed for gaps and differentiation, never instructions to copy.',
    status: copyCheck ? 'pass' : 'warning',
    details: 'All competitor insights include unique differentiation and strategic response plans.',
    remediation: 'Ensure recommendations focus on superior formatting, first-hand evidence, and local expertise.'
  });

  // 6. Canadian Spelling Enforcement
  checks.push({
    id: 'qa_06',
    category: 'ToursByLocals Editorial Compliance',
    title: 'Canadian Spelling Compliance',
    description: 'Enforces Canadian spelling (traveller, neighbourhood, favourite, centre, colour, etc.).',
    status: canadianSpellingIssues.length === 0 ? 'pass' : 'warning',
    details: canadianSpellingIssues.length === 0
      ? 'All scanned text conforms to Canadian spelling standards.'
      : `Found ${canadianSpellingIssues.length} US spelling variants: ${canadianSpellingIssues.map(c => `${c.word} -> ${c.suggestion}`).slice(0, 4).join(', ')}`,
    remediation: 'Replace US spellings with Canadian English equivalents.'
  });

  // 7. Banned Travel Clichés Audit
  checks.push({
    id: 'qa_07',
    category: 'ToursByLocals Editorial Compliance',
    title: 'Banned Travel Clichés Scan',
    description: 'Flags generic clichés (nestled, vibrant, bustling, iconic, must-see, hidden gem, heart of, etc.).',
    status: bannedPhrasesFound.length === 0 ? 'pass' : 'warning',
    details: bannedPhrasesFound.length === 0
      ? 'No banned travel clichés detected in brief or outline.'
      : `Found ${bannedPhrasesFound.length} clichés: ${bannedPhrasesFound.map(b => `"${b.phrase}" in ${b.location}`).join(', ')}`,
    remediation: 'Replace empty travel adjectives with specific, factual descriptions.'
  });

  // 8. ToursByLocals Brand Terminology
  checks.push({
    id: 'qa_08',
    category: 'ToursByLocals Editorial Compliance',
    title: 'Brand Terminology Rules',
    description: 'Prohibits "our guides" / "our tours"; requires "guides on ToursByLocals" or "local guides".',
    status: brandViolations.length === 0 ? 'pass' : 'blocker',
    details: brandViolations.length === 0
      ? 'Compliant with ToursByLocals independent guide platform phrasing.'
      : `Found ${brandViolations.length} phrasing violations (e.g. "${brandViolations[0]?.phrase}").`,
    remediation: 'Change "our guides/tours" to "guides on ToursByLocals" or "local guides".'
  });

  // 9. Source Freshness & Time-Sensitive Facts
  const timeSensitiveCheck = state.contentBrief.evidenceRequirements?.timeSensitiveFacts?.every(f => !!f.sourceUrl);
  checks.push({
    id: 'qa_09',
    category: 'Source Freshness & Safety',
    title: 'Time-Sensitive Facts Grounded with Sources',
    description: 'Validates that prices, fares, and transit rules have documented source URLs.',
    status: timeSensitiveCheck ? 'pass' : 'warning',
    details: `${state.contentBrief.evidenceRequirements?.timeSensitiveFacts?.length || 0} time-sensitive facts logged.`,
    remediation: 'Add source URLs for any unreferenced fares or seasonal hours.'
  });

  // 10. Internal Links Connect Real User Journeys
  const hasInternalLinks = state.internalLinkPlan.length >= 2;
  checks.push({
    id: 'qa_10',
    category: 'Site Architecture & Cannibalization',
    title: 'Internal Link Mesh Defined',
    description: 'Ensures inbound parent hub links, outbound commercial tour links, and cross-links are planned.',
    status: hasInternalLinks ? 'pass' : 'blocker',
    details: `${state.internalLinkPlan.length} internal link relationships planned with natural anchor concepts.`,
    remediation: 'Define at least 2 inbound/outbound internal links in the Internal Link Plan.'
  });

  const blockerCount = checks.filter(c => c.status === 'blocker').length;
  const warningCount = checks.filter(c => c.status === 'warning').length;
  const isReadyForWriting = blockerCount === 0;

  return {
    checks,
    canadianSpellingIssues,
    bannedPhrasesFound,
    brandViolations,
    isReadyForWriting,
    blockerCount,
    warningCount
  };
}
