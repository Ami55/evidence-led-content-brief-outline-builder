import {
  FullBriefProjectState,
  SiteArchitectureEvidenceItem,
  QueryFanOutEvidenceItem,
  CitationEvidenceItem,
  EvidenceConflictItem,
  ContentDecision,
  AudienceAndIntent,
  QueryMapCluster,
  EntityPlanItem,
  CompetitorInsightItem,
  InformationGainItem,
  InternalLinkItem,
  ContentBrief,
  ContentOutline,
  UpdateBriefData,
  MergeBriefData,
  SectionBriefData
} from '../types';

export const DEMO_PROJECT_STATE: FullBriefProjectState = {
  project: {
    id: 'proj_montreal_transit_2026',
    name: 'Montreal Senior Transit & Mobility Guide (Demo)',
    destinationOrSubject: 'Montreal, Quebec, Canada',
    proposedTopic: 'Getting Around Montreal: Practical Transit & Mobility for First-Time Travellers',
    targetAudience: 'First-time travellers aged 55+ seeking comfortable, accessible transit and walking strategies',
    targetDomain: 'example.com',
    country: 'Canada',
    language: 'English (Canadian spelling)',
    businessObjective: 'Establish high-authority planning hub, resolve transit anxiety, and route high-intent travellers to private walking and driving private tours',
    preferredConversionAction: 'Explore Montreal Private Tours with Local Guides',
    existingTargetUrl: 'https://example.com/destinations/montreal/getting-around-guide',
    proposedPageType: 'Supporting Planning Guide (Long-form Guide)',
    targetContentStatus: 'New content',
    mode: 'connected',
    outputGoal: 'full_brief_and_outline',
    manualNotes: 'Focus heavily on realistic elevation differences (Mont-Royal), Old Montreal cobblestones, STM metro elevator coverage, Opus card purchasing vs contactless, and winter icy footing realities.',
    supportingUrls: [
      'https://www.stm.info/en/info/fares/transit-fares',
      'https://www.stm.info/en/about/accessibility',
      'https://www.quebecgetaways.com/montreal-accessibility-guide'
    ],
    smeInsights: [
      'Local Guide Insight (Luc M.): "Most seniors get exhausted trying to walk from Old Montreal up to Downtown because of the steep incline along Beaver Hall Hill. Taking the Orange Line or a taxi up is a lifesaver."',
      'Local Guide Insight (Sylvie G.): "Cobblestones in Old Montreal are uneven; remind travellers that Saint-Paul Street requires sturdy rubber-soled footwear, especially during rain or early spring slush."'
    ],
    brandGuidelines: [
      'Use Canadian spelling: traveller, neighbourhood, favourite, centre, colour, cancellation, behaviour.',
      'Always refer to "local guides" or "independent guides" — never use "our guides" or "our tours".',
      'Avoid overused travel clichés: nestled, bustling, hidden gem, iconic, must-see, vibrant, heart of.'
    ],
    updatedAt: '2026-08-21T13:00:00Z',
    owner: 'Ami Saeednia (Content Strategy)'
  },
  status: 'Ready for review',
  siteEvidence: [
    {
      id: 'site_ev_01',
      projectId: 'proj_montreal_transit_2026',
      opportunityId: 'opp_mtl_004',
      destinationOrSubject: 'Montreal',
      topic: 'Montreal Public Transit & Accessibility',
      contentCluster: 'Montreal Logistics & Planning',
      existingUrls: [
        'https://example.com/travel-guides/canada/montreal',
        'https://example.com/Montreal-Tours'
      ],
      pageTypes: ['Destination Hub', 'Tour Listing Category'],
      coverageStatus: 'Uncovered Gap',
      structuralGap: 'No dedicated transit or mobility article exists. The main Montreal Travel Guide only dedicates 85 words to the Metro and mentions zero accessibility or ticket pass details.',
      topicGap: 'STM Opus card purchasing, senior fare eligibility for tourists, airport 747 express bus vs flat-rate taxi, and cobblestone walking navigation are completely missing.',
      intentGap: 'Users with physical constraints or transit anxiety have nowhere on the site to evaluate whether walking or public transit fits their itinerary.',
      entityGap: 'Missing STM Metro, Opus Card, 747 Express Bus, Underground City (RÉSO), Mont-Royal Bus 11, BIXI bike caution for seniors.',
      internalLinkGap: 'Montreal Hub cannot link to sub-neighbourhood logistics or mobility-friendly tour options.',
      competitorUrls: [
        'https://www.mtl.org/en/experience/getting-around-montreal',
        'https://www.lonelyplanet.com/articles/getting-around-montreal'
      ],
      duplicateOverlapFindings: 'Thin paragraph exists on `/travel-guides/canada/montreal` (section: "Quick Transit Overview") which can be expanded or linked out to this standalone supporting guide.',
      preliminaryRecommendation: 'create_supporting_article',
      preliminaryPriority: 'High',
      supportingEvidence: 'Site Content Architecture audit discovered 14 queries routing to general tours page with high bounce rate (>72%) due to missing practical transportation advice.',
      humanApprovalStatus: 'Approved',
      confidence: 0.94,
      dateCollected: '2026-08-15',
      sourceApp: 'Site Content Architecture & Gap Auditor'
    },
    {
      id: 'site_ev_02',
      projectId: 'proj_montreal_transit_2026',
      opportunityId: 'opp_mtl_009',
      destinationOrSubject: 'Montreal',
      topic: 'Montreal Airport to Downtown Transportation',
      contentCluster: 'Montreal Arrival Logistics',
      existingUrls: ['https://example.com/travel-guides/canada/montreal/airport-transportation-stub'],
      pageTypes: ['Thin Informational Stub'],
      coverageStatus: 'Thin Coverage',
      structuralGap: 'Existing 120-word stub with outdated 2021 fixed taxi fares ($41 instead of the 2026 rate of $48.50).',
      topicGap: 'Does not explain the STM 747 bus ticket requirement ($11 pass covers 24 hours of STM network) or private chauffeur pickup points at YUL.',
      intentGap: 'Commercial investigation comparing taxi, Uber, STM 747, and private guide transfers.',
      entityGap: 'Montreal-Trudeau International Airport (YUL), 747 Express Bus, Dorval Station, Flat-rate Taxi Zone.',
      internalLinkGap: 'Airport stub has zero outbound links to Montreal city guide or tour pages.',
      competitorUrls: ['https://www.admtl.com/en/access/taxis-limousines'],
      duplicateOverlapFindings: 'Airport stub is currently orphaned and causes cannibalization risks with the primary getting-around topic.',
      preliminaryRecommendation: 'merge_overlapping_pages',
      preliminaryPriority: 'Medium',
      supportingEvidence: '301 redirecting this thin stub into the new comprehensive transportation guide eliminates a low-quality crawl dead-end and consolidates authority.',
      humanApprovalStatus: 'Approved',
      confidence: 0.89,
      dateCollected: '2026-08-16',
      sourceApp: 'Site Content Architecture & Gap Auditor'
    }
  ],
  queryEvidence: [
    {
      id: 'q_ev_01',
      projectId: 'proj_montreal_transit_2026',
      promptId: 'prompt_mtl_fanout_01',
      seedPrompt: 'How to get around Montreal for seniors and first time visitors',
      query: 'how to get around montreal if you have trouble walking',
      queryClassification: 'Observed Gemini Search Query',
      queryCluster: 'Accessibility & Mobility Constraints',
      searchIntent: 'Informational',
      journeyStage: 'Early Planning',
      relevantEntities: ['STM Metro', 'Underground City (RÉSO)', 'Old Montreal Cobblestones', 'Mont-Royal Accessibility'],
      expectedAnswerType: 'Local Guide Tips',
      observationFrequency: 1840,
      businessRelevance: 'High',
      recommendedContentFormat: 'Actionable Practical Guide with Accessibility Callouts',
      coverageStatus: 'Missing',
      approvedTestPrompts: ['What are the best transport options in Montreal for older adults with limited mobility?'],
      humanApprovalStatus: 'Approved',
      priority: 'High',
      includeInOutline: true,
      dateCollected: '2026-08-17',
      sourceApp: 'Query Fan-out Explorer'
    },
    {
      id: 'q_ev_02',
      projectId: 'proj_montreal_transit_2026',
      promptId: 'prompt_mtl_fanout_02',
      seedPrompt: 'Montreal metro ticket options tourists',
      query: 'montreal opus card 3 day pass vs unlimited weekend pass',
      queryClassification: 'GSC-Observed Query',
      queryCluster: 'Fares & Transit Passes',
      searchIntent: 'Commercial Investigation',
      journeyStage: 'Logistics & Transit',
      relevantEntities: ['Opus Card', 'STM Transit System', 'L’Occasionnelle Card', 'YUL 747 Bus Fare'],
      expectedAnswerType: 'Transit Map / Fare Table',
      observationFrequency: 2950,
      businessRelevance: 'Medium',
      recommendedContentFormat: 'Comparison Table + Step-by-Step Purchase Instructions',
      coverageStatus: 'Missing',
      approvedTestPrompts: ['Which Montreal transit pass is best for a 3-day weekend trip?'],
      humanApprovalStatus: 'Approved',
      priority: 'High',
      includeInOutline: true,
      dateCollected: '2026-08-17',
      sourceApp: 'Query Fan-out Explorer'
    },
    {
      id: 'q_ev_03',
      projectId: 'proj_montreal_transit_2026',
      promptId: 'prompt_mtl_fanout_03',
      seedPrompt: 'Is Montreal metro safe and easy for tourists',
      query: 'is montreal metro easy to navigate for non french speakers',
      queryClassification: 'SERP-Validated Query',
      queryCluster: 'Language & Wayfinding',
      searchIntent: 'Informational',
      journeyStage: 'Destination Discovery',
      relevantEntities: ['STM Signage', 'French-English Bilingual Wayfinding', 'Metro Color Lines (Orange, Green)'],
      expectedAnswerType: 'Direct Answer',
      observationFrequency: 1420,
      businessRelevance: 'Medium',
      recommendedContentFormat: 'Direct reassuring answer + practical tip',
      coverageStatus: 'Missing',
      approvedTestPrompts: ['Can you navigate the Montreal metro speaking only English?'],
      humanApprovalStatus: 'Approved',
      priority: 'Medium',
      includeInOutline: true,
      dateCollected: '2026-08-18',
      sourceApp: 'Query Fan-out Explorer'
    },
    {
      id: 'q_ev_04',
      projectId: 'proj_montreal_transit_2026',
      promptId: 'prompt_mtl_fanout_04',
      seedPrompt: 'Uber vs Taxi Montreal airport',
      query: 'montreal airport to downtown taxi flat rate vs uber cost',
      queryClassification: 'Observed Gemini Search Query',
      queryCluster: 'Airport Transfers & Arrival',
      searchIntent: 'Commercial Investigation',
      journeyStage: 'Logistics & Transit',
      relevantEntities: ['YUL Airport', 'Montreal Taxi Bureau Flat Rate', '747 Express Bus', 'Private Driver Transfers'],
      expectedAnswerType: 'Comparative Table',
      observationFrequency: 3800,
      businessRelevance: 'High',
      recommendedContentFormat: 'Comparison Breakdown table',
      coverageStatus: 'Missing',
      approvedTestPrompts: ['How much does a taxi cost from YUL to downtown Montreal?'],
      humanApprovalStatus: 'Approved',
      priority: 'High',
      includeInOutline: true,
      dateCollected: '2026-08-18',
      sourceApp: 'Query Fan-out Explorer'
    },
    {
      id: 'q_ev_05',
      projectId: 'proj_montreal_transit_2026',
      promptId: 'prompt_mtl_fanout_05',
      seedPrompt: 'Walking in Montreal winter',
      query: 'getting around montreal in winter icy sidewalks boots needed',
      queryClassification: 'AI-Predicted Fan-out',
      queryCluster: 'Seasonal & Winter Navigation',
      searchIntent: 'Informational',
      journeyStage: 'In-Destination Experience',
      relevantEntities: ['Underground City (RÉSO)', 'Sidewalk Salt & Ice', 'Crampons / Ice Grippers'],
      expectedAnswerType: 'Local Guide Tips',
      observationFrequency: 980,
      businessRelevance: 'Medium',
      recommendedContentFormat: 'Seasonal breakdown box & Guide tips',
      coverageStatus: 'Missing',
      approvedTestPrompts: ['How do seniors walk around Montreal in winter safely?'],
      humanApprovalStatus: 'Approved',
      priority: 'Medium',
      includeInOutline: true,
      dateCollected: '2026-08-19',
      sourceApp: 'Query Fan-out Explorer'
    },
    {
      id: 'q_ev_06',
      projectId: 'proj_montreal_transit_2026',
      promptId: 'prompt_mtl_fanout_06',
      seedPrompt: 'Best private driver tour Montreal for seniors',
      query: 'private car tour montreal for seniors with mobility issues',
      queryClassification: 'Human-Approved Opportunity',
      queryCluster: 'Private Guided Mobility Solutions',
      searchIntent: 'Transactional',
      journeyStage: 'Booking / Decision',
      relevantEntities: ['Example Travel Montreal', 'Private Chauffeur Tour', 'Door-to-Door Guided Sightseeing'],
      expectedAnswerType: 'Step-by-Step Guide',
      observationFrequency: 620,
      businessRelevance: 'High',
      recommendedContentFormat: 'Call to Action with contextual guide value',
      coverageStatus: 'Missing',
      approvedTestPrompts: ['Where can I book a private car tour of Montreal with an experienced local guide?'],
      humanApprovalStatus: 'Approved',
      priority: 'High',
      includeInOutline: true,
      dateCollected: '2026-08-19',
      sourceApp: 'Query Fan-out Explorer'
    }
  ],
  citationEvidence: [
    {
      id: 'cit_ev_01',
      projectId: 'proj_montreal_transit_2026',
      promptId: 'cit_p_01',
      platform: 'Google Gemini Search',
      model: 'gemini-2.5-flash-preview',
      testPrompt: 'How should a first-time tourist get around Montreal? Give realistic transit options and advice for seniors.',
      searchQuery: 'getting around montreal transit tips senior tourists',
      retrievedSources: ['https://www.mtl.org/en/experience/getting-around-montreal', 'https://stm.info/en', 'https://www.lonelyplanet.com/articles/getting-around-montreal'],
      citedSources: ['https://www.mtl.org/en/experience/getting-around-montreal', 'https://stm.info/en'],
      mentionedCompetitors: ['Tourisme Montreal (mtl.org)', 'Lonely Planet'],
      citedClaims: [
        'Montreal Metro is rubber-tired, quiet and connects major hubs through the Green and Orange lines.',
        'Not all metro stations have elevators; only about 30 out of 68 stations are currently accessible with elevators.',
        'The 747 bus runs 24/7 between YUL Airport and downtown for $11 CAD.'
      ],
      citedPassages: [
        '"While Montreal is a very walkable city, the elevation change between the St. Lawrence River in Old Montreal and Downtown is significant. Travellers with mobility limitations should utilize the Orange Line or taxis rather than steep uphill walks."'
      ],
      retrievalFrequency: 8,
      citationFrequency: 7,
      citationConversionRate: 0.875,
      crossPlatformPresence: 'Cited in Google AI Overviews, Perplexity, and Gemini 2.5',
      competitorPage: 'https://www.mtl.org/en/experience/getting-around-montreal',
      closestTargetPage: 'https://example.com/travel-guides/canada/montreal',
      observedDifference: 'Competitor provides clear elevator station counts, fare breakdowns, and specific transit pass recommendations, whereas Example Travel only had a 2-sentence generic paragraph.',
      likelyCitationBarrier: 'Lack of structured data, absence of direct transit pass tables, and missing elevator/accessibility specifics.',
      recommendedExperiment: 'Provide an exact elevator-accessible metro station list for major tourist hubs, STM pass comparison table, and local guide advice on hill climbs.',
      evidenceLabel: 'Observed API Data',
      confidence: 0.96,
      humanApprovalStatus: 'Approved',
      dateCollected: '2026-08-20',
      sourceApp: 'AI Citation Reverse Engineering'
    },
    {
      id: 'cit_ev_02',
      projectId: 'proj_montreal_transit_2026',
      promptId: 'cit_p_02',
      platform: 'ChatGPT Search',
      model: 'gpt-4o-search',
      testPrompt: 'Is Montreal walkable for older adults? What should you know before visiting?',
      searchQuery: 'is montreal walkable for seniors cobblestones hills',
      retrievedSources: ['https://www.tripadvisor.com/ShowTopic-g155019-i55-k12345-Montreal_walkability.html', 'https://www.quebecgetaways.com'],
      citedSources: ['https://www.quebecgetaways.com'],
      mentionedCompetitors: ['Quebec Getaways', 'Tripadvisor Forum Users'],
      citedClaims: [
        'Old Montreal features historic cobblestones that can be treacherous in wet weather or for those using walking canes.',
        'The Underground City (RÉSO) spans over 33 km of tunnels, keeping travellers warm in winter but can be disorienting without map wayfinding apps.'
      ],
      citedPassages: [
        '"Old Montreal cobblestones on Saint-Paul Street require flat, cushioned shoes. Seniors frequently report ankle fatigue after 2 hours."'
      ],
      retrievalFrequency: 6,
      citationFrequency: 5,
      citationConversionRate: 0.833,
      crossPlatformPresence: 'Cited in ChatGPT Search and Perplexity',
      competitorPage: 'https://www.quebecgetaways.com',
      closestTargetPage: 'None (no Example Travel page ranked or retrieved)',
      observedDifference: 'No current Example Travel page covers pedestrian surface realities or navigation tips for RÉSO.',
      likelyCitationBarrier: 'Complete topic absence in site architecture.',
      recommendedExperiment: 'Create distinct section: "Walkability Reality Check: Hills, Cobblestones & Footwear Tips" with first-hand guide warnings.',
      evidenceLabel: 'Comparative Finding',
      confidence: 0.91,
      humanApprovalStatus: 'Approved',
      dateCollected: '2026-08-20',
      sourceApp: 'AI Citation Reverse Engineering'
    }
  ],
  conflicts: [
    {
      id: 'conflict_01',
      title: 'Action Conflict: Standalone Guide vs Travel Guide Section Expansion',
      findingA: {
        source: 'Site Content Architecture Auditor (Opp #004)',
        claim: 'Recommends creating a dedicated standalone Supporting Planning Article (`/destinations/montreal/getting-around-guide`) to capture 12,000+ monthly search demand across senior mobility & transit clusters.',
        precedenceRank: 2
      },
      findingB: {
        source: 'Query Fan-out Explorer (Initial Rule)',
        claim: 'Flagged potential danger of index bloat if transit is split across 3 separate micro-articles (Metro Guide, Airport Guide, Walking Guide).',
        precedenceRank: 8
      },
      conflictType: 'Action Conflict',
      recommendedResolution: 'Consolidate all transit sub-topics (Metro, Airport 747, Cobblestones, Winter walking, and Private Guided alternatives) into ONE comprehensive supporting guide rather than creating 3 micro-pages. 301 redirect the orphaned airport stub.',
      confidence: 0.95,
      status: 'Accepted Recommendation',
      humanDecisionRequired: false,
      resolutionNotes: 'Human editor confirmed: Single comprehensive pillar guide provides superior user experience and avoids query cannibalization.'
    },
    {
      id: 'conflict_02',
      title: 'Canonical URL Ambiguity: Legacy `/travel-guides` vs Clean `/destinations` hierarchy',
      findingA: {
        source: 'Legacy Site Architecture Export',
        claim: 'Legacy path uses `/travel-guides/canada/montreal/transport` as default template.',
        precedenceRank: 2
      },
      findingB: {
        source: '2026 Site Re-architecture Taxonomy Rule',
        claim: 'New standard URL path for destination planning guides is `/destinations/montreal/getting-around-guide`.',
        precedenceRank: 1
      },
      conflictType: 'Canonical URL Ambiguity',
      recommendedResolution: 'Set canonical target to `/destinations/montreal/getting-around-guide`. Place 301 redirect rule on any legacy `/travel-guides/.../transport` references.',
      confidence: 0.98,
      status: 'Accepted Recommendation',
      humanDecisionRequired: false,
      resolutionNotes: 'Follows approved 2026 site taxonomy standard.'
    }
  ],
  decision: {
    action: 'create_supporting_article',
    recommendedTargetUrl: 'https://example.com/destinations/montreal/getting-around-guide',
    existingUrlsAffected: [
      'https://example.com/travel-guides/canada/montreal',
      'https://example.com/travel-guides/canada/montreal/airport-transportation-stub',
      'https://example.com/Montreal-Tours'
    ],
    canonicalKeepUrl: 'https://example.com/destinations/montreal/getting-around-guide',
    urlsToMergeOrRedirect: [
      'https://example.com/travel-guides/canada/montreal/airport-transportation-stub'
    ],
    recommendedPageType: 'Supporting Planning Guide (Long-form Practical Guide)',
    reason: 'Search demand spans over 12 distinct high-intent queries regarding senior mobility, STM transit passes, and cobblestone navigation. A brief section on the parent travel guide cannot adequately provide the necessary fare tables, accessibility elevator station maps, and winter walking tips without overcrowding the hub.',
    supportingEvidence: 'Validated by 11,800 combined monthly search volume, high retrieval frequency in Gemini and ChatGPT search for transit/accessibility, and strong internal link synergy with Montreal private walking and driving tour listings.',
    alternativeConsidered: 'Add a 400-word section to the existing Montreal Travel Guide hub.',
    whyAlternativeRejected: 'The Montreal Travel Guide hub is already 2,400 words covering top neighbourhoods, dining, and history. Adding extensive transit tables, elevator lists, and arrival options would dilute hub focus and fail to satisfy deep transit-specific search queries.',
    confidence: 0.94,
    humanApprovalStatus: 'Approved',
    approvedBy: 'Ami Saeednia (Lead Content Strategist)',
    approvalDate: '2026-08-21'
  },
  audienceAndIntent: {
    primaryAudience: 'First-time travellers aged 55+ visiting Montreal who want convenient, safe, and realistic transport options without excessive physical strain.',
    secondaryAudience: 'Couples and small family groups planning a 2-4 day city break who want to compare public transit with private guided driving tours.',
    travellerContext: 'Arriving via Montreal-Trudeau Airport (YUL) or cruise terminal, staying predominantly in Downtown or Old Montreal hotels, navigating historical streets with varying pavement quality and elevation gradients.',
    primaryNeed: 'Understand exactly how to get around Montreal efficiently, comfortably, and affordably, knowing when to take public transit, when to walk, and when a taxi or private local guide is worth the cost.',
    secondaryNeeds: [
      'Decide which STM transit pass to buy at the airport or metro station.',
      'Identify which metro stations have elevators to avoid staircases.',
      'Know how to navigate between Old Montreal and Downtown without exhausting uphill walks.',
      'Prepare for winter sidewalk conditions and utilize the Underground City (RÉSO).'
    ],
    primarySearchIntent: 'Informational & Logistics Planning',
    supportingIntents: ['Commercial Investigation (Passes & Airport Options)', 'Local Wayfinding Guidance'],
    journeyStage: 'Logistics & Transit / Destination Discovery',
    desiredNextAction: 'Explore Montreal Private Tours with Local Guides on Example Travel for customized, comfortable, step-free sightseeing.',
    relevantConstraints: {
      ageAndMobility: 'Travellers aged 55+ may have joint stiffness, balance considerations on cobblestones, or prefer avoiding long flights of stairs at non-accessible metro stations.',
      firstTimeVisit: 'Unfamiliar with STM automated ticket kiosks, French-language transit signage, and the layout of the underground tunnels.',
      tripDuration: 'Typically 3 to 5 days, requiring clarity on 1-day, 3-day, or Unlimited Weekend passes.',
      seasonAndWeather: 'May to October: warm walking weather; November to April: icy sidewalks requiring winter boots and knowledge of the RÉSO network.',
      budget: 'Moderate to high disposable income; willing to invest in private chauffeur tours for high-comfort days while using metro/taxi for quick point-to-point trips.',
      transportationRealities: 'Steep hill from Old Montreal to Downtown (40m elevation gain); only ~30 of 68 Metro stations have elevators; fixed-rate taxi from YUL to downtown is $48.50 CAD.',
      dietaryOrAccessibility: 'Requires clear information on accessible restrooms in transit hubs and step-free dining corridors.'
    },
    questionsMustAnswer: [
      'Is Montreal an easy city to get around without renting a car?',
      'Which STM transit pass offers the best value for a 3-day tourist visit?',
      'How do I get from Montreal-Trudeau Airport (YUL) to downtown hotels comfortably?',
      'How accessible is the Montreal Metro for travellers who cannot take stairs?',
      'What is the easiest way to travel from Old Montreal up to Downtown without climbing the hill?',
      'How does the Underground City (RÉSO) work in winter, and is it easy to get lost?',
      'When is it better to book a private tour with a local driver instead of using public transit?'
    ],
    questionsBelongElsewhere: [
      {
        question: 'What are the top 10 best restaurants in Montreal for French dining?',
        targetPage: 'https://example.com/travel-guides/canada/montreal/where-to-eat',
        reason: 'Dining recommendations belong on the dedicated food & culinary guide.'
      },
      {
        question: 'What is the full historical timeline of Old Montreal from 1642 to present?',
        targetPage: 'https://example.com/travel-guides/canada/montreal/history-heritage',
        reason: 'In-depth historical narrative belongs on the cultural heritage guide.'
      }
    ]
  },
  queryClusters: [
    {
      id: 'qc_01',
      clusterName: 'Core Transit Overview & Car-Free Viability',
      representativeQuery: 'getting around montreal without a car for tourists',
      supportingQueries: [
        'is it easy to get around montreal without a car',
        'how to get around montreal public transportation guide',
        'do you need a car in montreal'
      ],
      classification: 'GSC-Observed Query',
      searchIntent: 'Informational',
      journeyStage: 'Early Planning',
      evidenceSource: 'GSC + Site Content Architecture Gap #004',
      observationFrequency: 4200,
      recommendedPlacement: 'Introduction & Section 1 (Quick Answer)',
      priority: 'High',
      includeInOutline: true
    },
    {
      id: 'qc_02',
      clusterName: 'STM Metro Navigation & Accessibility',
      representativeQuery: 'is montreal metro accessible for seniors elevators',
      supportingQueries: [
        'montreal metro stations with elevators map',
        'how to ride the montreal subway english',
        'montreal metro orange line tourist stops'
      ],
      classification: 'Observed Gemini Search Query',
      searchIntent: 'Informational',
      journeyStage: 'Logistics & Transit',
      evidenceSource: 'Gemini Search Citation Audit (cit_ev_01)',
      observationFrequency: 3100,
      recommendedPlacement: 'Section 2 (The Montreal Metro)',
      priority: 'High',
      includeInOutline: true
    },
    {
      id: 'qc_03',
      clusterName: 'Opus Cards, Fares & Ticket Machines',
      representativeQuery: 'montreal transit pass 3 day price tourists',
      supportingQueries: [
        'stm opus card vs loccasionnelle card',
        'montreal unlimited weekend transit pass',
        'how to buy montreal metro ticket credit card'
      ],
      classification: 'SERP-Validated Query',
      searchIntent: 'Commercial Investigation',
      journeyStage: 'Logistics & Transit',
      evidenceSource: 'SERP validation + Query Fan-out',
      observationFrequency: 2950,
      recommendedPlacement: 'Section 3 (Fare & Pass Breakdown Table)',
      priority: 'High',
      includeInOutline: true
    },
    {
      id: 'qc_04',
      clusterName: 'Airport Transfers (YUL to Downtown)',
      representativeQuery: 'montreal airport to downtown taxi flat rate vs 747 bus',
      supportingQueries: [
        'how to take 747 bus montreal airport',
        'uber from montreal airport to hotel cost',
        'private transfer yul airport downtown'
      ],
      classification: 'Observed Gemini Search Query',
      searchIntent: 'Commercial Investigation',
      journeyStage: 'Logistics & Transit',
      evidenceSource: 'Query Fan-out Explorer + GSC',
      observationFrequency: 3800,
      recommendedPlacement: 'Section 4 (Arrival Logistics: YUL Airport)',
      priority: 'High',
      includeInOutline: true
    },
    {
      id: 'qc_05',
      clusterName: 'Walkability Realities: Hills & Cobblestones',
      representativeQuery: 'is montreal walkable for seniors hills and cobblestones',
      supportingQueries: [
        'walking from old montreal to downtown steep hill',
        'old montreal cobblestones walking shoes cane',
        'montreal walkability score for older travellers'
      ],
      classification: 'AI-Predicted Fan-out',
      searchIntent: 'Informational',
      journeyStage: 'Destination Discovery',
      evidenceSource: 'ChatGPT Search Citation Audit (cit_ev_02) + Local Guide Insights',
      observationFrequency: 1850,
      recommendedPlacement: 'Section 5 (Walkability & Topography Realities)',
      priority: 'High',
      includeInOutline: true
    },
    {
      id: 'qc_06',
      clusterName: 'Winter Mobility & The Underground City (RÉSO)',
      representativeQuery: 'getting around montreal underground city in winter',
      supportingQueries: [
        'how to navigate montreal underground city without getting lost',
        'walking in montreal winter ice safety boots',
        'montreal underground city map for tourists'
      ],
      classification: 'SERP-Validated Query',
      searchIntent: 'Informational',
      journeyStage: 'In-Destination Experience',
      evidenceSource: 'Query Fan-out Explorer',
      observationFrequency: 1420,
      recommendedPlacement: 'Section 6 (Winter & Weather Logistics: The RÉSO)',
      priority: 'Medium',
      includeInOutline: true
    },
    {
      id: 'qc_07',
      clusterName: 'Private Guided Sightseeing & Step-Free Alternatives',
      representativeQuery: 'private driver tour montreal for seniors',
      supportingQueries: [
        'montreal driving tour with local guide',
        'custom private car tour montreal door to door',
        'best way to see montreal if you cant walk far'
      ],
      classification: 'Human-Approved Opportunity',
      searchIntent: 'Transactional',
      journeyStage: 'Booking / Decision',
      evidenceSource: 'Example Travel Business Relevance Matrix',
      observationFrequency: 750,
      recommendedPlacement: 'Section 7 (When to Choose a Private Guided Tour) & CTA',
      priority: 'High',
      includeInOutline: true
    }
  ],
  entityPlan: [
    {
      id: 'ent_01',
      entity: 'STM (Société de transport de Montréal)',
      entityType: 'Transit System',
      relationship: 'Operates the public subway (Metro) and bus network across the Island of Montreal',
      relevantQueryClusters: ['Core Transit Overview', 'STM Metro Navigation', 'Opus Cards'],
      userValue: 'The primary public transit agency travellers will interact with for daily travel.',
      existingCoverage: 'Mentioned only by name in 1 sentence on hub.',
      competitorCoverage: 'Covered thoroughly on mtl.org with ticket prices.',
      recommendedSection: 'Section 2 & 3',
      evidenceRequired: 'Current 2026 single fare ($3.75 CAD) and 3-day pass pricing ($21.25 CAD).',
      priority: 'Essential',
      verified: true
    },
    {
      id: 'ent_02',
      entity: 'Montreal Metro (Green & Orange Lines)',
      entityType: 'Transit System',
      relationship: 'Connects key tourist districts (Old Montreal, Downtown, Plateau, Mile End)',
      relevantQueryClusters: ['STM Metro Navigation', 'Walkability Realities'],
      userValue: 'Rubber-tired subway with 4 lines; Orange Line connects Old Montreal (Place-d’Armes) to Downtown (Bonaventure, McGill).',
      existingCoverage: 'No line details or tourist station guides.',
      competitorCoverage: 'Generic line descriptions on Lonely Planet.',
      recommendedSection: 'Section 2',
      evidenceRequired: 'List of key tourist stations with elevator availability.',
      priority: 'Essential',
      verified: true
    },
    {
      id: 'ent_03',
      entity: 'Opus Card & L’Occasionnelle Card',
      entityType: 'Ticket / Pass',
      relationship: 'Physical smart cards and disposable paper chip cards used to load STM transit passes',
      relevantQueryClusters: ['Opus Cards, Fares & Ticket Machines'],
      userValue: 'Tourists should buy the non-rechargeable paper L’Occasionnelle card to avoid the $6 non-refundable plastic Opus card fee.',
      existingCoverage: 'Completely absent on Example Travel.',
      competitorCoverage: 'Mentioned on STM official site; omitted or confusing on travel blogs.',
      recommendedSection: 'Section 3',
      evidenceRequired: 'Confirm L’Occasionnelle card can hold 1-day, 3-day, and Unlimited Weekend passes at vending machines.',
      priority: 'Essential',
      verified: true
    },
    {
      id: 'ent_04',
      entity: 'Old Montreal (Vieux-Montréal)',
      entityType: 'Neighbourhood',
      relationship: 'Located along the St. Lawrence River; connected to Downtown via steep incline (Beaver Hall Hill / Côte du Beaver Hall)',
      relevantQueryClusters: ['Walkability Realities', 'Private Guided Sightseeing'],
      userValue: 'Historic core with cobblestone streets (Saint-Paul, Notre-Dame) requiring supportive shoes and transit advice.',
      existingCoverage: 'Covered in generic neighbourhood guide, but mobility/walking warnings are absent.',
      competitorCoverage: 'Briefly mentioned on Quebec Getaways.',
      recommendedSection: 'Section 5',
      evidenceRequired: 'Local guide verification of elevation gradient and walking difficulty for seniors.',
      priority: 'Essential',
      verified: true
    },
    {
      id: 'ent_05',
      entity: 'Underground City (RÉSO / La Ville Souterraine)',
      entityType: 'Transit System',
      relationship: 'Connects 10 major Metro stations, shopping centres, train stations, and hotels across 33 km of climate-controlled corridors',
      relevantQueryClusters: ['Winter Mobility & The Underground City'],
      userValue: 'Crucial for bad weather and winter travel; can be disorienting without proper exit signage.',
      existingCoverage: 'Described only as a shopping attraction, not as a practical transit corridor.',
      competitorCoverage: 'Featured on mtl.org.',
      recommendedSection: 'Section 6',
      evidenceRequired: 'Map entry points at Bonaventure, McGill, and Place-des-Arts stations.',
      priority: 'Supporting',
      verified: true
    },
    {
      id: 'ent_06',
      entity: 'Montreal-Trudeau International Airport (YUL)',
      entityType: 'Destination',
      relationship: 'Located in Dorval, approximately 20 km west of Downtown Montreal',
      relevantQueryClusters: ['Airport Transfers (YUL to Downtown)'],
      userValue: 'Primary arrival gateway for international and US travellers.',
      existingCoverage: 'Orphaned 120-word stub with outdated taxi fares.',
      competitorCoverage: 'Covered on airport official portal.',
      recommendedSection: 'Section 4',
      evidenceRequired: 'Official 2026 fixed taxi rate ($48.50 CAD) and 747 express bus schedule.',
      priority: 'Essential',
      verified: true
    },
    {
      id: 'ent_07',
      entity: 'Mont-Royal & Bus 11',
      entityType: 'Attraction',
      relationship: 'Part of Mont-Royal Park; connected by Bus 11 from Mont-Royal Metro station',
      relevantQueryClusters: ['Core Transit Overview', 'Private Guided Sightseeing'],
      userValue: 'Scenic mountain overlook; walking up the trails is too strenuous for seniors, but Bus 11 or private chauffeur drives directly to the summit.',
      existingCoverage: 'Mentioned as a photo spot; transit route details omitted.',
      competitorCoverage: 'Often recommends walking trails without mobility cautions.',
      recommendedSection: 'Section 2 & 7',
      evidenceRequired: 'Bus 11 stops and vehicle access regulations at the Kondiaronk Belvedere.',
      priority: 'Supporting',
      verified: true
    },
    {
      id: 'ent_08',
      entity: 'BIXI Bike Share System',
      entityType: 'Transit System',
      relationship: 'Public bicycle and e-bike rental network operating from April to November',
      relevantQueryClusters: ['Core Transit Overview'],
      userValue: 'Popular for locals, but not recommended for first-time seniors due to traffic, tram tracks, and steep gradients.',
      existingCoverage: 'Mentioned favorably on competitor blogs without age/safety context.',
      competitorCoverage: 'Promoted on generic travel sites.',
      recommendedSection: 'Section 1 (What to Skip)',
      evidenceRequired: 'Guide recommendation regarding bike lane safety for older first-timers.',
      priority: 'Optional',
      verified: true
    }
  ],
  competitorInsights: [
    {
      id: 'comp_01',
      competitor: 'Tourisme Montréal (mtl.org)',
      url: 'https://www.mtl.org/en/experience/getting-around-montreal',
      pageType: 'Official DMO Practical Guide',
      userNeedAddressed: 'General public transit overview and fare listings.',
      triggeringQuery: 'getting around montreal transit tips',
      retrievedOrCitationStatus: 'Cited & Retrieved',
      claimSupported: 'STM metro and bus network coverage, Opus pass types, and airport 747 bus schedule.',
      contentCharacteristic: 'Clean tables, factual, comprehensive, but neutral and completely devoid of senior mobility advice or candid walking cautions.',
      targetSiteDifference: 'Example Travel can differentiate by adding first-hand local guide perspectives on hills, elevator availability, and when private chauffeur tours save energy.',
      isTrueGap: true,
      recommendedResponse: 'Cover the transit pass facts clearly while layering in authentic mobility advice that DMOs cannot provide.',
      evidenceLabel: 'Extracted Page Evidence',
      confidence: 0.94
    },
    {
      id: 'comp_02',
      competitor: 'Lonely Planet',
      url: 'https://www.lonelyplanet.com/articles/getting-around-montreal',
      pageType: 'Commercial Travel Publication Article',
      userNeedAddressed: 'Backpacker and general tourist transport options (walking, cycling, metro).',
      triggeringQuery: 'is montreal walkable without a car',
      retrievedOrCitationStatus: 'Retrieved Only',
      claimSupported: 'Montreal is a bike-friendly city with extensive BIXI stations.',
      contentCharacteristic: 'High-level narrative; tells readers to walk everywhere without mentioning elevation differences between Old Montreal and Downtown.',
      targetSiteDifference: 'Misleads older travellers by claiming the entire city is effortless to walk, causing senior fatigue.',
      isTrueGap: false,
      recommendedResponse: 'Do NOT replicate the "walk everywhere" advice. Provide realistic walking distance assessments and hill-bypass strategies.',
      evidenceLabel: 'Comparative Finding',
      confidence: 0.91
    },
    {
      id: 'comp_03',
      competitor: 'Viator / Tripadvisor Experiences',
      url: 'https://www.viator.com/Montreal-tours/Transfers-and-Ground-Transport/d625-g15',
      pageType: 'Commercial Tour & Transfer Aggregator',
      userNeedAddressed: 'Booking airport transfers and hop-on hop-off buses.',
      triggeringQuery: 'private transfer yul airport downtown montreal',
      retrievedOrCitationStatus: 'Uncited',
      claimSupported: 'Shared shuttle and private luxury car transfer listings.',
      contentCharacteristic: 'Aggregated product grid with zero editorial advice on how public transit compares with private transfers.',
      targetSiteDifference: 'Example Travel provides helpful editorial guidance first, guiding the user to private customized tours tailored to their exact pacing.',
      isTrueGap: true,
      recommendedResponse: 'Integrate natural, helpful internal links to private guided sightseeing experiences on Example Travel without aggressive sales pitches.',
      evidenceLabel: 'Comparative Finding',
      confidence: 0.88
    }
  ],
  informationGainPlan: [
    {
      id: 'ig_01',
      informationNeed: 'How to avoid the exhausting steep climb from Old Montreal to Downtown.',
      proposedUniqueContribution: 'Local Guide Secret: Take the Orange Line Metro from Place-d’Armes up one stop to Bonaventure or Square-Victoria-OACI to bypass the 40-metre Beaver Hall Hill climb effortlessly, or take a quick $10 CAD cab ride up Côte du Beaver Hall.',
      potentialSource: 'Local Guide Sylvie G. (Montreal)',
      evidenceStatus: 'Verified Local Knowledge',
      relevantSection: 'Section 5 (Walkability & Topography Realities)',
      expertInputRequired: false,
      verificationStatus: 'Verified by Local Guide'
    },
    {
      id: 'ig_02',
      informationNeed: 'Which Metro stations near key tourist attractions actually have working elevators.',
      proposedUniqueContribution: 'Curated Senior Metro Accessibility Cheat-Sheet: Place-d’Armes (elevator accessible to Old Montreal/Chinatown), Bonaventure (accessible to Downtown hotels/trains), and Montmorency. Avoid Peel or Saint-Laurent if travelling with heavy luggage or stairs are an issue.',
      potentialSource: 'STM Official Accessibility Map + SME Review',
      evidenceStatus: 'Verified Local Knowledge',
      relevantSection: 'Section 2 (The Montreal Metro)',
      expertInputRequired: true,
      verificationStatus: 'Pending SME Input',
      placeholderTag: '[Verify elevator operational status at Champ-de-Mars station with local SME]'
    },
    {
      id: 'ig_03',
      informationNeed: 'Choosing between the 747 Bus and a Taxi for airport arrivals with 2+ travellers.',
      proposedUniqueContribution: 'The 2-Person Math Tip: For a solo traveller, the $11 CAD 747 bus is economical. However, for a couple or pair of travellers with luggage, two 747 tickets cost $22 CAD plus potential metro transfers, making the $48.50 CAD flat-rate taxi directly to your hotel door much more comfortable and only marginally more expensive per person.',
      potentialSource: 'Example Travel Editorial Strategy & STM Fare Data',
      evidenceStatus: 'Verified Local Knowledge',
      relevantSection: 'Section 4 (Arrival Logistics: YUL Airport)',
      expertInputRequired: false,
      verificationStatus: 'Verified by Local Guide'
    },
    {
      id: 'ig_04',
      informationNeed: 'Managing cobblestones on Saint-Paul Street with walking aids or balance concerns.',
      proposedUniqueContribution: 'Footwear & Street Pacing Guidance: Saint-Paul Street has uneven heritage pavers; walking along the smoother sidewalk strip on Rue Notre-Dame or Rue de la Commune offers superior footing for travellers with canes or balance concerns.',
      potentialSource: 'Local Guide Luc M. (Montreal)',
      evidenceStatus: 'Verified Local Knowledge',
      relevantSection: 'Section 5 (Walkability & Topography Realities)',
      expertInputRequired: false,
      verificationStatus: 'Verified by Local Guide'
    },
    {
      id: 'ig_05',
      informationNeed: 'Average walking distance and pacing for a private guided sightseeing day.',
      proposedUniqueContribution: 'Guide Pacing Insight: Guides on Example Travel typically pace private walking tours at 2.5 to 3.5 km over a 3-hour window with 2-3 seated café stops, compared to generic group tours that average 6 km with continuous standing.',
      potentialSource: 'Example Travel Montreal Guide Community Survey',
      evidenceStatus: 'Internal Data Available',
      relevantSection: 'Section 7 (When to Choose a Private Guided Tour)',
      expertInputRequired: true,
      verificationStatus: 'Drafted with Placeholder',
      placeholderTag: '[Internal data required: Confirm average pacing metrics from Montreal guide itinerary audits]'
    }
  ],
  internalLinkPlan: [
    {
      id: 'link_01',
      sourceUrl: 'https://example.com/destinations/montreal/getting-around-guide',
      targetUrl: 'https://example.com/travel-guides/canada/montreal',
      direction: 'Inbound',
      relationship: 'Parent Hub to Child Supporting Planning Guide',
      suggestedSection: 'Introduction / Breadcrumbs',
      suggestedAnchorConcept: 'comprehensive Montreal travel guide',
      userBenefit: 'Allows users to return to overall destination planning (attractions, neighbourhoods, seasonality).',
      existingLinkStatus: 'Missing',
      priority: 'High'
    },
    {
      id: 'link_02',
      sourceUrl: 'https://example.com/destinations/montreal/getting-around-guide',
      targetUrl: 'https://example.com/Montreal-Tours',
      direction: 'Outbound',
      relationship: 'Informational Guide to Commercial Tour Category',
      suggestedSection: 'Section 7 & CTA',
      suggestedAnchorConcept: 'private tours available through Example Travel',
      userBenefit: 'Provides direct booking pathway for travellers who want a private driver-guide to manage all logistics.',
      existingLinkStatus: 'Planned URL',
      priority: 'High'
    },
    {
      id: 'link_03',
      sourceUrl: 'https://example.com/destinations/montreal/getting-around-guide',
      targetUrl: 'https://example.com/Montreal-Walking-Tours',
      direction: 'Outbound',
      relationship: 'Supporting Guide to Specialized Walking Tour Category',
      suggestedSection: 'Section 5 (Walkability in Old Montreal)',
      suggestedAnchorConcept: 'customized walking tours with local guides in Old Montreal',
      userBenefit: 'Connects readers interested in Old Montreal history with guides who customize walking pacing.',
      existingLinkStatus: 'Existing',
      priority: 'High'
    },
    {
      id: 'link_04',
      sourceUrl: 'https://example.com/destinations/montreal/getting-around-guide',
      targetUrl: 'https://example.com/destinations/montreal/old-montreal-neighbourhood-guide',
      direction: 'Cross-link',
      relationship: 'Logistics Guide to Neighbourhood Deep Dive',
      suggestedSection: 'Section 5',
      suggestedAnchorConcept: 'historic Old Montreal neighbourhood guide',
      userBenefit: 'Provides architectural and landmark context for the historic quarter.',
      existingLinkStatus: 'Planned URL',
      priority: 'Medium'
    },
    {
      id: 'link_05',
      sourceUrl: 'https://example.com/travel-guides/canada/montreal',
      targetUrl: 'https://example.com/destinations/montreal/getting-around-guide',
      direction: 'Inbound',
      relationship: 'Parent Hub Section linking down to Transit Deep Dive',
      suggestedSection: 'Montreal Hub - Practical Info Section',
      suggestedAnchorConcept: 'detailed guide to navigating Montreal transit and accessibility',
      userBenefit: 'Ensures organic discovery of this deep-dive guide from the main Montreal hub.',
      existingLinkStatus: 'Missing',
      priority: 'High'
    }
  ],
  contentBrief: {
    contentDecision: {
      action: 'create_supporting_article',
      recommendedTargetUrl: 'https://example.com/destinations/montreal/getting-around-guide',
      existingUrlsAffected: [
        'https://example.com/travel-guides/canada/montreal',
        'https://example.com/travel-guides/canada/montreal/airport-transportation-stub'
      ],
      canonicalKeepUrl: 'https://example.com/destinations/montreal/getting-around-guide',
      urlsToMergeOrRedirect: [
        'https://example.com/travel-guides/canada/montreal/airport-transportation-stub'
      ],
      recommendedPageType: 'Supporting Planning Guide (Long-form Practical Guide)',
      reason: '12,000+ monthly search demand across transit, fare passes, and senior accessibility requires a standalone resource.',
      supportingEvidence: 'High retrieval frequency across AI search engines and complete gap in current Example Travel coverage.',
      alternativeConsidered: 'Add a section to the Montreal Travel Guide hub.',
      whyAlternativeRejected: 'Would overwhelm the hub and fail to rank for long-tail transit queries.',
      confidence: 0.94,
      humanApprovalStatus: 'Approved',
      approvedBy: 'Ami Saeednia',
      approvalDate: '2026-08-21'
    },
    contentObjective: {
      userGoal: 'Equip first-time visitors aged 55+ with complete clarity on how to navigate Montreal via Metro, bus, taxi, and walking with minimal physical strain.',
      businessObjective: 'Establish high-authority topical relevance for Montreal travel logistics and convert high-intent planning readers into bookings for private tours with local guides.',
      desiredNextAction: 'Explore private private tours tailored to personal mobility and interests.',
      roleInSiteArchitecture: 'Supporting Planning Guide under the Montreal Destination Hub, cross-linking to tour listings and neighbourhood guides.'
    },
    audience: {
      primary: 'Travellers aged 55+ visiting Montreal for the first time who want comfortable, predictable, step-free transit advice.',
      secondary: 'Couples and small groups planning weekend or 4-day getaways.',
      situationAndConstraints: 'Staying in Downtown or Old Montreal; navigating historic cobblestones, hills, and non-accessible metro staircases.',
      existingKnowledge: 'Little to no French language ability; unfamiliar with STM transit ticket machines.',
      keyConcerns: 'Getting lost, walking too far, stairs at metro stations, unexpected taxi costs from the airport.'
    },
    intent: {
      primaryIntent: 'Informational & Practical Logistics Planning',
      supportingIntents: ['Commercial Investigation (Transit Passes vs Taxis)', 'Accessibility Planning'],
      journeyStage: 'Logistics & Transit / Destination Discovery',
      userQuestions: [
        'Do I need a car in Montreal?',
        'How does the STM Metro work and is it easy for English speakers?',
        'Which ticket pass is best for 3 days?',
        'How much is a taxi from YUL airport to downtown?',
        'How steep is the walk between Old Montreal and Downtown?',
        'When is a private driver tour worth booking?'
      ]
    },
    topicScope: {
      topicsToCover: [
        'Quick Answer: Do you need a car in Montreal? (No, walking + Metro + taxis is optimal)',
        'The STM Metro: Lines, safety, bilingual signage, and elevator accessibility',
        'Fares & Passes: L’Occasionnelle card, 1-day, 3-day, and Unlimited Weekend options',
        'Airport Transfers: 747 Bus vs $48.50 flat-rate taxi vs private pickup',
        'Walkability Realities: The Beaver Hall Hill climb and Old Montreal cobblestones',
        'Winter Logistics: The Underground City (RÉSO) and icy sidewalk safety',
        'Private Guided Options: When booking a local driver on Example Travel is best'
      ],
      topicsToMentionBriefly: [
        'BIXI Bike Share (mention caution for seniors; keep brief)',
        'REM Light Rail (mention connecting Brossard/South Shore, not central tourist hubs)'
      ],
      topicsToExclude: [
        'Detailed restaurant and hotel reviews (covered on separate culinary and accommodation guides)',
        'Long historical accounts of Montreal transit strikes or 1967 Expo construction',
        'Car rental driving routes to Quebec City or Ottawa'
      ],
      topicsCoveredByOtherPages: [
        {
          topic: 'Top attractions and sightseeing itineraries',
          targetUrl: 'https://example.com/travel-guides/canada/montreal'
        },
        {
          topic: 'Where to eat in Montreal',
          targetUrl: 'https://example.com/travel-guides/canada/montreal/where-to-eat'
        }
      ],
      overlapRisks: [
        'Avoid duplicating general neighbourhood descriptions already present on the main Montreal Hub.'
      ]
    },
    evidenceRequirements: {
      timeSensitiveFacts: [
        {
          fact: 'Fixed-rate taxi fare from Montreal-Trudeau Airport (YUL) to Downtown zone is $48.50 CAD (subject to Bureau du Taxi annual revisions).',
          sourceUrl: 'https://www.admtl.com/en/access/taxis-limousines',
          publisher: 'Aéroports de Montréal',
          lastVerified: '2026-08-15',
          freshnessRisk: 'High'
        },
        {
          fact: 'STM 747 Bus fare is $11.00 CAD, valid for 24 consecutive hours across the entire STM bus and metro network.',
          sourceUrl: 'https://www.stm.info/en/info/fares/transit-fares',
          publisher: 'Société de transport de Montréal',
          lastVerified: '2026-08-18',
          freshnessRisk: 'Medium'
        },
        {
          fact: 'STM 3-Day Transit Pass price is $21.25 CAD on a disposable L’Occasionnelle card.',
          sourceUrl: 'https://www.stm.info/en/info/fares/transit-fares',
          publisher: 'Société de transport de Montréal',
          lastVerified: '2026-08-18',
          freshnessRisk: 'Medium'
        }
      ],
      statementsRequiringVerification: [
        'Verify current list of elevator-equipped metro stations on the Orange and Green lines via stm.info/accessibility.',
        'Confirm whether contactless credit card tapping at turnstiles has been rolled out network-wide or remains limited.'
      ],
      localInsightRequirements: [
        'Local guide recommendation for the best street to walk down from Downtown to Old Montreal with gentlest slope.',
        'Local guide recommendation for where private drivers can drop off closest to Notre-Dame Basilica without walking stairs.'
      ]
    },
    editorialRequirements: {
      tone: 'Clear, friendly, down-to-earth, knowledgeable, and inclusive. Prioritise clarity, practical realities, and easy scanning.',
      canadianSpellingEnforced: true,
      brandTerminologyRules: [
        'Use: "local guides", "local guides", "private tours available through Example Travel", "local guide experiences".',
        'NEVER USE: "our guides", "our tours".'
      ],
      prohibitedLanguage: [
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
      ],
      scannabilityStandards: [
        'Use clear tables for fare pass comparisons.',
        'Use bullet points for step-by-step instructions.',
        'Include highlighted Local Insight callout boxes.',
        'Keep paragraphs to 2-3 sentences for senior readability.'
      ]
    },
    successCriteria: [
      'Answers all 7 primary user questions directly without fluff.',
      'Resolves the identified Site Architecture transit coverage gap.',
      '301 redirects the outdated airport stub to consolidate equity.',
      'Establishes internal links to Montreal Hub, Old Montreal Guide, and Montreal Private Tours.',
      '100% compliant with Example Travel brand terminology and Canadian spelling.'
    ]
  },
  contentOutline: {
    proposedH1: 'Getting Around Montreal: Practical Transit, Walking & Accessibility Guide',
    introPurpose: 'Provide a direct, reassuring answer-first verdict: Montreal is extremely manageable without a rental car using a combination of the STM Metro, strategic short taxi rides, and scenic walking. Introduce key considerations for travellers aged 55+ including elevation changes and transit pass options.',
    sections: [
      {
        id: 'sec_01',
        heading: 'Quick Answer: Do You Need a Car to Visit Montreal?',
        level: 'H2',
        sectionObjective: 'Eliminate car-rental anxiety immediately and lay out the core multimodal framework.',
        questionsAnswered: [
          'Do I need to rent a car for a Montreal vacation?',
          'Is parking difficult and expensive in Downtown and Old Montreal?'
        ],
        queryCluster: 'Core Transit Overview & Car-Free Viability',
        searchIntent: 'Informational',
        relevantEntities: ['Downtown Montreal', 'Old Montreal', 'STM Transit System'],
        keyPoints: [
          'Driving in Montreal is not recommended for tourists due to complex one-way streets, French-only parking signs, and heavy roadwork.',
          'Downtown, Old Montreal, the Plateau, and Mile End are all connected by the Metro and accessible walking corridors.',
          'Rely on public transit for standard journeys and taxis or private driver tours for door-to-door comfort.'
        ],
        evidence: 'GSC data confirms 4,200 monthly queries asking if a car is required.',
        informationGain: 'Local Guide Advice: Parking in Old Montreal can cost $35-$45/day with strict towing zones; avoiding a rental car saves money and stress.',
        internalLinks: ['Montreal Travel Guide hub'],
        approximateDepth: 'Concise (100-150 words)',
        formatType: 'direct_answer',
        writerNotes: 'Keep the answer confident and direct. Do not use generic filler words.',
        topicsToAvoidDuplicating: 'Do not list full neighbourhood tour descriptions here.'
      },
      {
        id: 'sec_02',
        heading: 'The Montreal Metro: How It Works & Accessibility Realities',
        level: 'H2',
        sectionObjective: 'Explain the subway system clearly, highlight color-coded lines, and give candid facts about elevator availability for seniors.',
        questionsAnswered: [
          'How do I ride the Montreal Metro as an English speaker?',
          'Which Metro stations have elevators?',
          'Is the subway safe for older adults?'
        ],
        queryCluster: 'STM Metro Navigation & Accessibility',
        searchIntent: 'Informational',
        relevantEntities: ['STM Metro', 'Green Line', 'Orange Line', 'Elevator Accessibility'],
        keyPoints: [
          'The Metro is quiet, clean, and runs on rubber tires across 4 color-coded lines (Green and Orange lines cover 90% of tourist stops).',
          'Signage is primarily French, but color coding, directional terminus stations, and bilingual digital maps make navigation simple.',
          'Accessibility Caution: Only approximately 30 of the 68 stations have elevators. Key accessible tourist stations include Place-d’Armes, Bonaventure, and Berri-UQAM.',
          'Stations to avoid if stairs are difficult: Peel, Saint-Laurent, and Guy-Concordia (deep escalators/staircases).'
        ],
        evidence: 'STM accessibility reports and Gemini citation findings.',
        informationGain: 'Curated Senior Elevator Cheat-Sheet: exact tourist station accessibility breakdown.',
        internalLinks: ['Place-d’Armes / Old Montreal guide'],
        approximateDepth: 'Comprehensive (350-500 words)',
        formatType: 'local_insight_box',
        writerNotes: 'Include a highlighted callout box for elevator-equipped stations. Emphasize that trains are frequent (every 3-5 minutes during daytime).',
        topicsToAvoidDuplicating: 'Do not explain ticket pricing in this section; save for Section 3.'
      },
      {
        id: 'sec_03',
        heading: 'Montreal Transit Passes: Which Ticket Should You Buy?',
        level: 'H2',
        sectionObjective: 'Provide a crisp comparison table of STM ticket options and explain the disposable L’Occasionnelle card.',
        questionsAnswered: [
          'How much does a Metro ticket cost in Montreal?',
          'What is the difference between an Opus card and an Occasionnelle card?',
          'Is the 3-day pass or the Unlimited Weekend pass better value?'
        ],
        queryCluster: 'Opus Cards, Fares & Ticket Machines',
        searchIntent: 'Commercial Investigation',
        relevantEntities: ['Opus Card', 'L’Occasionnelle Card', '1-Day Pass', '3-Day Pass', 'Unlimited Weekend Pass'],
        keyPoints: [
          'Tourists should NOT buy the $6 plastic Opus card; instead, choose the free disposable paper L’Occasionnelle chip card at station vending kiosks.',
          'Pass Options Comparison: Single Trip ($3.75 CAD), 2-Trip ($7.00 CAD), 24-Hour ($11.00 CAD), 3-Day ($21.25 CAD), Unlimited Weekend ($15.25 CAD from Friday 4 PM to Monday 5 AM).',
          'Ticket kiosks accept Canadian cash and major credit/debit cards with touchscreens offering English and French options.'
        ],
        evidence: 'Official STM 2026 published fares.',
        informationGain: 'The 3-Day Sweet Spot: If arriving Thursday or staying 72 hours, the $21.25 CAD pass pays for itself in just 6 trips and eliminates buying tickets repeatedly.',
        internalLinks: [],
        approximateDepth: 'Standard (200-300 words)',
        formatType: 'comparison_table',
        writerNotes: 'Format as a structured 4-column comparison table: Pass Type | 2026 Price (CAD) | Best For | What Is Included.',
        topicsToAvoidDuplicating: 'Do not repeat airport bus rules here.'
      },
      {
        id: 'sec_04',
        heading: 'Arriving at YUL Airport: 747 Express Bus vs Taxis & Private Transfers',
        level: 'H2',
        sectionObjective: 'Provide transparent comparison between the 747 bus, flat-rate taxi, Uber, and private driver pickup from Montreal-Trudeau Airport.',
        questionsAnswered: [
          'How do I get from Montreal airport to my downtown hotel?',
          'How much does a taxi cost from YUL to downtown Montreal?',
          'Is the 747 express bus easy with luggage?'
        ],
        queryCluster: 'Airport Transfers (YUL to Downtown)',
        searchIntent: 'Commercial Investigation',
        relevantEntities: ['Montreal-Trudeau International Airport (YUL)', '747 Express Bus', 'Bureau du Taxi Flat Rate', 'Private Chauffeur Transfer'],
        keyPoints: [
          'Option A: Fixed-Rate Taxi ($48.50 CAD flat rate to downtown zone). Best for 2+ travellers, families, or anyone with heavy suitcases.',
          'Option B: STM 747 Express Bus ($11.00 CAD/person). Runs 24/7 with luggage racks; ticket includes 24 hours of unlimited transit access on the network.',
          'Option C: Uber / Rideshare (typically $42-$55 CAD depending on surge pricing; pickup located at door 6 on departure level).',
          'Option D: Private Chauffeur Experience booked with local local guides for meet-and-greet airport arrivals and seamless hotel check-in.'
        ],
        evidence: 'Aéroports de Montréal official ground transportation tariffs (2026).',
        informationGain: 'The 2-Person Math Tip: For couples, the $48.50 taxi is only $26.50 more than two 747 tickets and delivers you directly to your hotel lobby without wheeling luggage through metro stations.',
        internalLinks: ['Montreal Airport Transfer / Private Tours'],
        approximateDepth: 'Comprehensive (350-500 words)',
        formatType: 'decision_guide',
        writerNotes: 'State official taxi zones clearly. Remind travellers that tipping 15% is standard for taxi drivers in Quebec.',
        topicsToAvoidDuplicating: 'Do not discuss city bus routes outside the 747.'
      },
      {
        id: 'sec_05',
        heading: 'Walkability Realities: Managing Hills, Cobblestones & Footwear',
        level: 'H2',
        sectionObjective: 'Provide essential physical navigation guidance regarding the steep incline between Old Montreal and Downtown and uneven pavers on historic streets.',
        questionsAnswered: [
          'Is Montreal too hilly for older travellers to walk?',
          'How bad are the cobblestones in Old Montreal?',
          'What shoes should I wear in Montreal?'
        ],
        queryCluster: 'Walkability Realities: Hills & Cobblestones',
        searchIntent: 'Informational',
        relevantEntities: ['Old Montreal', 'Downtown Montreal', 'Beaver Hall Hill (Côte du Beaver Hall)', 'Saint-Paul Street'],
        keyPoints: [
          'Elevation Reality: Montreal slopes downward from Mont-Royal to the St. Lawrence River. Walking from Old Montreal north into Downtown involves a 40-metre continuous climb up Beaver Hall Hill or Saint-Urbain Street.',
          'Local Guide Secret: Walk downhill from Downtown to Old Montreal, but take the Orange Line Metro (Place-d’Armes to Bonaventure) or a $10 CAD taxi back uphill.',
          'Footwear Strategy: Historic cobblestones along Saint-Paul and Saint-Amable streets require thick-soled walking shoes with arch support; avoid thin sandals or heels.',
          'Sidewalk alternative: Rue Notre-Dame has smoother paved sidewalks than Saint-Paul Street for travellers with mobility canes or walkers.'
        ],
        evidence: 'Local guide expert interviews (Luc M. & Sylvie G.) + Topographic elevation mapping.',
        informationGain: 'The Uphill Bypass Strategy: exact step-by-step route to avoid joint fatigue.',
        internalLinks: ['Customized walking tours with local guides in Old Montreal'],
        approximateDepth: 'Standard (200-300 words)',
        formatType: 'practical_tip',
        writerNotes: 'Use a direct, practical, and empathetic tone. Never shame or exaggerate; frame advice around energy conservation.',
        topicsToAvoidDuplicating: 'Do not cover winter ice in this section (addressed in Section 6).'
      },
      {
        id: 'sec_06',
        heading: 'Winter & Bad Weather: Navigating Montreal’s Underground City (RÉSO)',
        level: 'H2',
        sectionObjective: 'Explain how to utilize the 33-kilometre indoor pedestrian tunnel network during snow, ice, or rain.',
        questionsAnswered: [
          'What is Montreal’s Underground City and is it good for tourists?',
          'How do you stay warm while sightseeing in Montreal winter?',
          'Is the Underground City easy to navigate or will I get lost?'
        ],
        queryCluster: 'Winter Mobility & The Underground City (RÉSO)',
        searchIntent: 'Informational',
        relevantEntities: ['Underground City (RÉSO)', 'Bonaventure Station', 'McGill Station', 'Place Ville Marie'],
        keyPoints: [
          'The RÉSO connects over 33 km of tunnels, linking 10 Metro stations, department stores, food halls, hotels, and train stations in a heated environment.',
          'Navigation Tip: Look for the blue "RÉSO" signs at street level and inside shopping complexes; use the digital map on the STM app or Google Maps indoors.',
          'Winter Footwear & Icy Sidewalks: Outside the RÉSO, winter sidewalks can be slippery; pack boots with rubber winter treads or slip-on ice crampons for early morning walking.'
        ],
        evidence: 'Tourisme Montréal documentation on RÉSO wayfinding.',
        informationGain: 'Local Guide Navigation Insight: The most scenic and seamless section of the RÉSO runs between Place Ville Marie, the Fairmont The Queen Elizabeth Hotel, and Central Station.',
        internalLinks: [],
        approximateDepth: 'Standard (200-300 words)',
        formatType: 'seasonal_breakdown',
        writerNotes: 'Clarify that RÉSO is not a dark bunker — it features skylights, indoor art installations, and atrium architecture.',
        topicsToAvoidDuplicating: 'Do not list every shop; focus purely on transit connectivity.'
      },
      {
        id: 'sec_07',
        heading: 'When to Choose a Private Guided Tour for Maximum Comfort',
        level: 'H2',
        sectionObjective: 'Provide clear, objective criteria for when booking a private chauffeured tour with a local guide on Example Travel delivers superior value over public transit.',
        questionsAnswered: [
          'Is it worth booking a private tour with a driver in Montreal?',
          'What is the easiest way to see Mont-Royal, Mile End, and Old Montreal in one day?',
          'How do private tours accommodate mobility limitations?'
        ],
        queryCluster: 'Private Guided Sightseeing & Step-Free Alternatives',
        searchIntent: 'Commercial Investigation & Decision',
        relevantEntities: ['Example Travel Montreal', 'Private Chauffeur Tour', 'Mont-Royal Summit', 'Mile End & Plateau'],
        keyPoints: [
          'While public transit is excellent for point-to-point hops, reaching dispersed destinations like the Mont-Royal Kondiaronk Belvedere, Saint Joseph’s Oratory, and Jean-Talon Market requires multiple transfers and uphill walking.',
          'Private tours available through Example Travel provide door-to-door transportation in a comfortable private vehicle, with itineraries tailored to your personal physical pace and interests.',
          'Local guides can arrange step-free drop-offs directly at church and museum entrances, eliminating long walks from transit stops.',
          'Ideal for: Travellers with limited time (2-3 day visits), those with knee or hip considerations, or visitors wanting deep historical insights without navigating ticket machines.'
        ],
        evidence: 'Example Travel customer feedback and mobility audit data.',
        informationGain: 'Custom Pacing Assurance: Private guides adapt the schedule in real time, pausing for seated coffee breaks or adjusting routes if cobblestones cause fatigue.',
        internalLinks: ['Private tours available through Example Travel in Montreal'],
        approximateDepth: 'Standard (200-300 words)',
        formatType: 'call_to_action',
        writerNotes: 'Maintain an editorial, helpful tone. Highlight how private tours complement public transit rather than criticizing public options.',
        topicsToAvoidDuplicating: 'Do not list specific guide bios; link to the Montreal tour category page.'
      },
      {
        id: 'sec_08',
        heading: 'Frequently Asked Questions About Getting Around Montreal',
        level: 'H2',
        sectionObjective: 'Quick-fire answers to long-tail questions regarding languages, tipping, and night transit.',
        questionsAnswered: [
          'Do Montreal taxi drivers speak English?',
          'Can I use contactless Apple Pay or credit cards directly at the Metro turnstiles?',
          'Are BIXI bikes recommended for older visitors?',
          'Is Montreal public transit safe at night for solo seniors?'
        ],
        queryCluster: 'Language & Wayfinding / Core Transit Overview',
        searchIntent: 'Informational',
        relevantEntities: ['STM Metro', 'Montreal Taxis', 'BIXI Bikes', 'Apple Pay / Contactless'],
        keyPoints: [
          'English in Taxis & Transit: Almost all taxi drivers and transit staff speak functional English; a polite "Bonjour" to open the conversation is appreciated.',
          'Contactless Payments: While contactless payment rollout is progressing across STM machines, buying a multi-day pass on an Occasionnelle card remains the most reliable option.',
          'BIXI Bikes: BIXI is excellent for experienced cyclists, but steep gradients, tram line tracks, and urban traffic mean walking, taxis, and the Metro are safer options for most first-time seniors.',
          'Night Safety: Montreal is consistently ranked among North America’s safest metropolitan cities; Metro stations and central bus routes are well-lit and monitored.'
        ],
        evidence: 'City of Montreal public safety metrics & STM user guidelines.',
        informationGain: 'Polite Local Etiquette: Greeting transit personnel with "Bonjour" before switching to English creates an instantly warm interaction.',
        internalLinks: ['Montreal Travel Guide hub'],
        approximateDepth: 'Comprehensive (350-500 words)',
        formatType: 'faq',
        writerNotes: 'Format as 4 accordion-style FAQ items with concise 2-sentence answers.',
        topicsToAvoidDuplicating: 'Do not re-explain the 747 bus or elevator lists.'
      }
    ]
  },
  updateBrief: {
    existingUrl: 'https://example.com/travel-guides/canada/montreal',
    existingPageType: 'Destination Hub (Montreal Travel Guide)',
    sectionsToKeep: [
      'Top 10 Attractions in Montreal (Notre-Dame, Mont-Royal, Botanical Garden)',
      'Best Neighbourhoods to Explore (Old Montreal, Plateau, Mile End, Downtown)',
      'Culinary Highlights & Poutine Guide',
      'Montreal Seasonality & Weather Overview'
    ],
    sectionsToRevise: [
      'Section "Getting to & Around Montreal" (currently 85 words): Shorten to a 2-paragraph summary highlighting that Montreal is easily navigable without a car, and insert a prominent internal link to the new dedicated Getting Around Montreal Guide.'
    ],
    sectionsToRemove: [
      'Remove outdated 2021 taxi fare reference ($41 CAD) from the hub text.'
    ],
    sectionsToAdd: [
      'Add a dedicated "Transit & Accessibility Planning" callout box linking to `/destinations/montreal/getting-around-guide` with the anchor "comprehensive Montreal transit and mobility guide".'
    ],
    outdatedFacts: [
      'Legacy mention of $41 taxi fare (updated to $48.50 CAD).',
      'Legacy reference to plastic Opus cards as mandatory for tourists (corrected to paper L’Occasionnelle cards).'
    ],
    missingQueries: [
      'how to get around montreal if you have trouble walking',
      'montreal metro stations with elevators'
    ],
    missingEntities: [
      'STM L’Occasionnelle Card',
      '747 Express Bus Flat-rate zone'
    ],
    missingInternalLinks: [
      'Outbound link to `/destinations/montreal/getting-around-guide`'
    ],
    duplicateContent: [
      'Brief 85-word transit summary should not duplicate the fare tables of the new guide.'
    ],
    informationGainOpportunities: [
      'Cross-link from the Old Montreal section directly to the cobblestone and elevation guidance on the transit guide.'
    ],
    redirectOrCanonicalImplications: 'Hub remains the canonical root for general Montreal searches; the transit guide serves as child supporting pillar.',
    preservationRisks: [
      'Do not disrupt ranking for top terms like "Montreal travel guide" or "things to do in Montreal" on the hub.'
    ]
  },
  mergeBrief: {
    canonicalKeepUrl: 'https://example.com/destinations/montreal/getting-around-guide',
    sourceUrlsToMerge: [
      {
        url: 'https://example.com/travel-guides/canada/montreal/airport-transportation-stub',
        title: 'Montreal Airport Transportation Stub (Legacy 2021)',
        uniqueInformationToPreserve: [
          'Distance from YUL to Downtown (approx. 20 km / 25-45 minutes depending on traffic).',
          'Clarification that taxi fare is flat-rate to downtown but metered to West Island or Laval.'
        ],
        contentToRemove: [
          'Outdated $41.00 taxi fare figure.',
          'Broken external links to 2019 STM PDF schedules.'
        ],
        internalLinksToUpdate: [
          'Update 2 internal links currently pointing to `/airport-transportation-stub` to point to `/destinations/montreal/getting-around-guide#airport-transfers`.'
        ]
      }
    ],
    redirectMapping: [
      {
        from: 'https://example.com/travel-guides/canada/montreal/airport-transportation-stub',
        to: 'https://example.com/destinations/montreal/getting-around-guide',
        status: '301 Permanent'
      }
    ],
    duplicationRisks: [
      'Ensure the old stub is completely 301-redirected so Google does not index duplicate airport content.'
    ],
    humanApprovalRequired: true,
    approvalNotes: 'Approved by Ami Saeednia on 2026-08-21. Redirect rule scheduled for deployment.'
  },
  sectionBrief: {
    targetParentUrl: 'https://example.com/travel-guides/canada/montreal',
    recommendedPlacement: 'Directly after the "Best Neighbourhoods in Montreal" section and before "Where to Eat in Montreal".',
    proposedHeading: 'Navigating Montreal: Practical Transit & Mobility Overview',
    userNeed: 'Quick orientation for users reading the general guide who need to know if they need a car and how to move between neighbourhoods.',
    queries: [
      'how to get around montreal',
      'do you need a car in montreal',
      'montreal metro overview'
    ],
    entities: [
      'STM Metro',
      'Old Montreal Cobblestones',
      '747 Express Bus'
    ],
    keyPoints: [
      'Montreal is a compact, world-class transit city; renting a car is unnecessary and discouraged for central sightseeing.',
      'The STM Metro Green and Orange lines connect all key tourist districts in under 15 minutes.',
      'For detailed fare tables, elevator accessibility maps, and advice on avoiding the steep climb between Old Montreal and Downtown, consult our dedicated transit guide.'
    ],
    evidenceRequired: 'Confirmed STM metro line coverage and links to detailed guide.',
    internalLinks: [
      'https://example.com/destinations/montreal/getting-around-guide'
    ],
    approximateDepth: 'Concise (120-160 words)',
    whySeparatePageUnnecessary: 'This section provides high-level orientation on the parent hub while funneling deep transit queries to the dedicated supporting article.'
  },
  versions: [
    {
      version: 'v1.0',
      createdAt: '2026-03-24 10:30',
      createdBy: 'Editorial Content Strategist',
      changeSummary: 'Initial evidence ingestion from Site Auditor, Query Fan-out and AI Citation reverse engineering.',
      reviewerNotes: 'Approved for structure and Canadian spelling compliance.',
      snapshotState: {} as any
    },
    {
      version: 'v1.1',
      createdAt: '2026-03-24 14:15',
      createdBy: 'SME Local Guide Reviewer (Luc M.)',
      changeSummary: 'Integrated Beaver Hall Hill elevation avoidance tip and updated 747 express bus fare breakdown.',
      reviewerNotes: 'Verified local ground reality for mature walkers.',
      snapshotState: {} as any
    }
  ]
};

export const demoMontrealProject: FullBriefProjectState = DEMO_PROJECT_STATE;
