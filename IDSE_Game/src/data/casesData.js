export const CASES = [
  {
    id: 1,
    title: 'The Suspicious Exam Results',
    tagline: 'Is a 95% satisfaction claim true, or is the sample rigged?',
    concept: 'Sampling & Sampling Bias',
    conceptShort: 'Sampling Bias',
    badge: 'Sampling Specialist',
    badgeIcon: 'Search',
    brief:
      'The university administration issued a press release celebrating a stunning 95% student satisfaction rate with campus facilities. However, student council representatives from arts, nursing, and science report broken desks, leaky ceilings, and overcrowded halls. You must audit the survey methodology, test different sampling techniques, and determine whether the headline is legitimate or the result of sampling bias.',
    learningObjectives: [
      'Understand the critical distinction between a population and a sample.',
      'Discover how convenience sampling and voluntary response introduce severe selection bias.',
      'Demonstrate that a large sample size alone does not eliminate systematic bias.',
      'Compare biased samples against representative simple random and stratified samples.',
    ],
    initialHypothesisPrompt:
      'Before sampling: If an investigator gathers a very large sample of 200 people, is that sample guaranteed to represent the entire population accurately?',
    discoveryMoment:
      'Notice that even when convenience sampling takes 200 students, the satisfaction estimate stays artificially inflated at ~94% because 85%+ of respondents come from the brand-new Engineering facility. Only true random or stratified sampling reflects the true campus-wide ~58% satisfaction!',
    conclusionQuestions: {
      question:
        'Based on your data investigation, what is your official verdict on the university’s 95% satisfaction claim?',
      options: [
        {
          id: 'opt_a',
          text: 'The 95% claim is reliable because surveying 150+ students is statistically sufficient regardless of how they were picked.',
          isCorrect: false,
          feedback:
            'Incorrect! A sample size of 150+ is worthless if the selection mechanism systematically excludes parts of the population.',
        },
        {
          id: 'opt_b',
          text: 'The 95% claim is fraudulent/invalid due to severe Convenience Bias. The survey over-represented the new Engineering wing and ignored dissatisfied departments.',
          isCorrect: true,
          feedback:
            'Outstanding investigation! The true campus population satisfaction is only ~58.5%. Convenience sampling created a massive selection distortion.',
        },
        {
          id: 'opt_c',
          text: 'The claim is false simply because college students are inherently unhappy with administration.',
          isCorrect: false,
          feedback:
            'Unscientific conclusion! Detectives rely on empirical data and demographic evidence, not cynicism or assumptions.',
        },
      ],
      transferChallenge: {
        scenario:
          'A hospital administrator interviews 100 patients discharged exclusively from the newly renovated VIP Luxury Wing and claims: "99% of all patients give our hospital a 5-star rating!"',
        question: 'What fundamental Data Science error did the administrator commit?',
        options: [
          'Underfitting',
          'Convenience / Selection Bias (Undercoverage)',
          'High Variance',
          'Confounding Correlation',
        ],
        correctIndex: 1,
        explanation:
          'By sampling only from the VIP wing, the administrator systematically under-covered patients in the standard and emergency wards.',
      },
    },
    debrief: {
      conceptName: 'Sampling and Selection Bias',
      whatJustHappened:
        'You inspected a population of 600 students across 5 departments where the true campus satisfaction is 58.5%. When you chose the Engineering lobby convenience sample, the estimate shot up to ~94%. Even increasing the sample size did NOT fix the error, because the sample was systematically non-representative.',
      keyTakeaways: [
        'Population: The entire group of interest (all 600 campus students).',
        'Sample: The subset actually measured to infer population characteristics.',
        'Selection Bias: Occurs when some members of the population have lower or zero probability of selection than others.',
        'Sample Size vs Quality: A large biased sample merely measures the wrong answer with high confidence.',
      ],
      experimentPrompt:
        'Try switching between Simple Random Sampling and Convenience Sampling at sample size n=150. Notice how the department bar chart shifts drastically!',
    },
  },
  {
    id: 2,
    title: 'The Ice Cream Mystery',
    tagline: 'Do ice cream cones cause swimming emergencies at the coast?',
    concept: 'Correlation vs Causation',
    conceptShort: 'Correlation vs Causation',
    badge: 'Correlation Detective',
    badgeIcon: 'TrendingUp',
    brief:
      'The Seaside Town Council is drafting emergency legislation to ban beachfront ice cream carts. Their evidence? A chart showing weekly ice cream sales and beach distress calls tracking each other almost perfectly with a correlation of r = +0.89! As the agency data detective, you must analyze the municipal data, test alternative relationships, and determine whether ice cream is truly dangerous.',
    learningObjectives: [
      'Understand Pearson correlation coefficient r and interpret scatter plots.',
      'Differentiate between statistical association and causal influence.',
      'Identify and isolate confounding (lurking) variables.',
      'Understand how to control or stratify for third variables.',
    ],
    initialHypothesisPrompt:
      'Before plotting: If two variables increase and decrease together with a high correlation of r = 0.89, does that prove one variable causes the other?',
    discoveryMoment:
      'When you inspect the third variable—Temperature—you discover that hot summer heat drives BOTH high ice cream sales AND packed beaches with more swimming rescues. When you control for temperature (e.g. looking only at hot days), the correlation between ice cream and incidents drops to near zero!',
    conclusionQuestions: {
      question:
        'Should the city council ban ice cream carts to prevent swimming emergencies?',
      options: [
        {
          id: 'opt_a',
          text: 'Yes: A correlation of r = +0.89 is mathematical proof of direct physical causation.',
          isCorrect: false,
          feedback:
            'Dangerous mistake! Correlation measures linear co-movement, never direct causation without controlled experiments.',
        },
        {
          id: 'opt_b',
          text: 'No: Ice cream and swimming rescues share a common confounding variable (summer temperature). Ice cream does not cause drownings.',
          isCorrect: true,
          feedback:
            'Case solved! Banning ice cream would hurt small businesses without preventing a single drowning. Summer heat was the lurking variable.',
        },
        {
          id: 'opt_c',
          text: 'No: The two variables actually have a negative correlation.',
          isCorrect: false,
          feedback:
            'Incorrect! The two variables do have a genuine positive correlation in the raw data, but it is non-causal.',
        },
      ],
      transferChallenge: {
        scenario:
          'A health study shows that people who carry pocket lighters in their pockets have a 400% higher rate of developing lung cancer. A politician proposes a law: "Ban pocket lighters to cure cancer!"',
        question: 'What is the confounding variable in this scenario?',
        options: [
          'Dietary sugar intake',
          'Cigarette smoking (which causes both lighter possession and lung cancer)',
          'Genetic predisposition alone',
          'Overfitting',
        ],
        correctIndex: 1,
        explanation:
          'Smoking is the classic confounder: smokers carry lighters AND get cancer. The lighter itself does not cause cancer.',
      },
    },
    debrief: {
      conceptName: 'Correlation vs Causation & Confounding Variables',
      whatJustHappened:
        'In the raw dataset, ice cream sales and swimming distress calls moved together in lockstep (r = 0.89). But when you stratified by temperature, the relationship vanished within each temperature band (r ≈ 0.05). Temperature is a confounding variable driving both.',
      keyTakeaways: [
        'Correlation (r): Measures the strength and direction of a linear relationship between two variables (-1 to +1).',
        'Causation: When a change in one variable directly produces a change in another.',
        'Confounder (Lurking Variable): An unobserved or uncontrolled third variable correlated with both independent and dependent variables.',
        'Rule of Thumb: Association is not causation. Always ask: "Could an external factor explain both?"',
      ],
      experimentPrompt:
        'Try changing the Temperature Filter dropdown from "All Weather" to "Hot Days Only (>72°F)". Watch the regression line flatten out!',
    },
  },
  {
    id: 3,
    title: 'The Perfect Prediction Trap',
    tagline: 'A model scored 99% accuracy in the lab—why did it fail in the real world?',
    concept: 'Overfitting & Underfitting',
    conceptShort: 'Overfitting & Underfitting',
    badge: 'Model Inspector',
    badgeIcon: 'Cpu',
    brief:
      'CloudStream SaaS was preparing for its quarterly earnings call. The lead data engineer built an ultra-complex machine learning model that achieved a near-perfect 99.4% accuracy on customer records. But when deployed live on new sign-ups, renewal predictions collapsed catastrophically. The agency has been called in to audit the training vs test data and inspect the model fit.',
    learningObjectives: [
      'Understand the need for separate training and test datasets.',
      'Recognize underfitting (high bias) vs overfitting (high variance).',
      'Understand why memorizing noise ruins generalization on unseen data.',
      'Evaluate models using test set performance rather than training performance.',
    ],
    initialHypothesisPrompt:
      'Before testing: If Model A gets 99% accuracy on training data and Model B gets 88% accuracy on training data, is Model A guaranteed to perform better on future customers?',
    discoveryMoment:
      'When you select Level 3 (Degree 9), the training error drops to an astounding MSE of 4.2! But when you reveal the unseen Test Data, its test error explodes to 480+! The model bent frantically to connect random noise points, completely losing the real trend.',
    conclusionQuestions: {
      question:
        'Which model should CloudStream deploy to production for customer renewal forecasting?',
      options: [
        {
          id: 'opt_a',
          text: 'Level 3 (Degree 9): It memorized the training data with the lowest training error (MSE 4.2).',
          isCorrect: false,
          feedback:
            'Trapped! Level 3 is severely overfitted. It memorized random noise and fails disastrously on unseen test customers.',
        },
        {
          id: 'opt_b',
          text: 'Level 2 (Degree 3): It balances train and test performance, achieving the lowest error on unseen test data (MSE ~26).',
          isCorrect: true,
          feedback:
            'Masterful analysis! In production machine learning, generalization on unseen data is what matters, not memorization of the training set.',
        },
        {
          id: 'opt_c',
          text: 'Level 1 (Degree 1): A straight line is always optimal because simpler is always better.',
          isCorrect: false,
          feedback:
            'Incorrect! Level 1 underfits the data. It is too rigid to capture the natural non-linear curve.',
        },
      ],
      transferChallenge: {
        scenario:
          'A computer vision team trains a self-driving car model to recognize pedestrians. On the training photos taken in sunny California, it gets 100% accuracy. When tested in rainy Seattle, it misses half the pedestrians because it learned California road textures.',
        question: 'What machine learning failure occurred?',
        options: [
          'Underfitting',
          'Overfitting (Poor Generalization)',
          'Unsupervised Clustering',
          'Selection Bias in Census',
        ],
        correctIndex: 1,
        explanation:
          'The model overfit to the specific environmental artifacts of the training photos and failed to generalize to unseen test conditions.',
      },
    },
    debrief: {
      conceptName: 'Overfitting, Underfitting, and Generalization',
      whatJustHappened:
        'You compared three model complexities on customer renewal likelihood. Level 1 underfit (too simple, missed the curve). Level 3 overfit (chased noise, MSE exploded on test data). Level 2 achieved the sweet spot of optimal generalization.',
      keyTakeaways: [
        'Training Set: The data used to fit or teach the model parameters.',
        'Test Set (Holdout): Unseen data kept in a vault strictly to evaluate real-world generalization.',
        'Overfitting: When a model fits training data too closely, learning random noise rather than true signal.',
        'Underfitting: When a model is too simple to capture the underlying structure in the data.',
        'Golden Rule: Never judge a model solely by its training performance!',
      ],
      experimentPrompt:
        'Switch between Level 2 and Level 3 while watching the Test MSE gauge. Notice how the blue line wiggles wildy in Level 3!',
    },
  },
  {
    id: 4,
    title: 'The Model That Plays Favorites',
    tagline: 'Why does the loan algorithm give different scores depending on which sample trains it?',
    concept: 'Bias-Variance Tradeoff',
    conceptShort: 'Bias-Variance Tradeoff',
    badge: 'Variance Auditor',
    badgeIcon: 'Scale',
    brief:
      'Apex Lending uses an automated scoring engine for small business credit risk. An external audit revealed a disturbing issue: when the bank retrained the model on different random monthly cohorts of applicants, the predictions for identical credit scores varied erratically! The agency must run repeated multi-cohort resamplings to decompose model error into statistical Bias and Variance.',
    learningObjectives: [
      'Understand statistical Bias (error from overly simplistic assumptions).',
      'Understand statistical Variance (error from sensitivity to small fluctuations in training data).',
      'Observe multi-sample stability across resampled training cohorts.',
      'Identify the sweet spot that minimizes total expected prediction error.',
    ],
    initialHypothesisPrompt:
      'Before testing: If a model produces wildly different predictions when trained on Cohort A vs Cohort B, does it suffer from high Bias or high Variance?',
    discoveryMoment:
      'Looking at the Multi-Cohort Spaghetti Plot: For the High Variance model (Model 3), the 8 fitted curves branch in wildly different directions across applicant cohorts! For the High Bias model (Model 1), the curves are tightly grouped together, but all of them miss the true curve. Model 2 finds the optimal balance.',
    conclusionQuestions: {
      question:
        'What is your audit recommendation for Apex Lending’s loan risk architecture?',
      options: [
        {
          id: 'opt_a',
          text: 'Use Model 3 (Flexible): It has the lowest bias, and sample-to-sample fluctuations are harmless.',
          isCorrect: false,
          feedback:
            'Incorrect! High variance causes unfair and unstable decisions where an applicant’s approval hinges on which training cohort was sampled.',
        },
        {
          id: 'opt_b',
          text: 'Use Model 2 (Balanced): It strikes the optimal tradeoff between low systematic bias and high sample-to-sample stability.',
          isCorrect: true,
          feedback:
            'Spot on, Detective! Total Error = Bias² + Variance + Irreducible Noise. Minimizing the sum of bias and variance yields the most robust predictions.',
        },
        {
          id: 'opt_c',
          text: 'Use Model 1 (Rigid): A model that never changes between samples is always best, even if it has high error.',
          isCorrect: false,
          feedback:
            'Incorrect! Model 1 suffers from severe underfitting (high bias). It systematically misprices credit risk across the board.',
        },
      ],
      transferChallenge: {
        scenario:
          'A weather forecasting model is retrained on 5 different years of rainfall records. Every year produces almost the exact same forecast: "30 inches everywhere." But the actual rainfall varies from 10 to 60 inches across the region.',
        question: 'Does this forecasting model suffer from High Bias or High Variance?',
        options: [
          'High Bias (rigid, systematically misses the variation, but highly repeatable)',
          'High Variance (wildly sensitive to the training year)',
          'Optimal Tradeoff',
          'Zero Noise',
        ],
        correctIndex: 0,
        explanation:
          'The model is extremely stable across training samples (low variance) but systematically wrong (high bias).',
      },
    },
    debrief: {
      conceptName: 'The Bias-Variance Tradeoff',
      whatJustHappened:
        'You simulated 8 separate applicant cohorts and trained three model architectures across all 8 datasets simultaneously. You observed firsthand how model complexity shifts error from Bias (systematic error) to Variance (instability across datasets).',
      keyTakeaways: [
        'Bias: Error resulting from mistaken assumptions in the learning algorithm (underfitting / stiffness).',
        'Variance: Error resulting from excessive sensitivity to fluctuations in the training set (overfitting / fragility).',
        'Irreducible Error: Natural random noise inherent in real-world systems that no model can eliminate.',
        'The Tradeoff: Decreasing bias typically increases variance. The goal is to find the model complexity that minimizes the sum.',
      ],
      experimentPrompt:
        'Select Model 3 and drag the "Test Applicant Credit Score" slider. Watch how widely the predicted risk score jumps across the 8 cohorts!',
    },
  },
  {
    id: 5,
    title: 'The Hidden Groups',
    tagline: 'Can unsupervised clustering reveal the secret customer segments in retail data?',
    concept: 'Clustering & Unsupervised Learning',
    conceptShort: 'K-Means Clustering',
    badge: 'Pattern Finder',
    badgeIcon: 'Layers',
    brief:
      'Nexus Retail has collected activity logs on 180 customers, but has zero category labels. The marketing team wants to personalize communications, but does not know what customer types exist. As our chief detective, you must use unsupervised K-Means clustering, test different feature combinations and cluster counts (K), test the effect of feature scaling, and assign meaningful personas to the discovered segments.',
    learningObjectives: [
      'Understand unsupervised learning where data has no pre-existing target labels.',
      'Learn how K-Means partitions data into K clusters using centroids and distance.',
      'Discover why feature scaling (Z-score normalization) is mandatory for distance-based algorithms.',
      'Interpret cluster profiles and translate mathematical clusters into actionable real-world segments.',
    ],
    initialHypothesisPrompt:
      'Before clustering: If you cluster customers using Spending ($150 - $10,000) and Monthly Visits (1 - 30) without normalizing the numbers first, which feature will dominate the distance calculations?',
    discoveryMoment:
      'When you toggle Feature Scaling from Raw to Normalized, the cluster boundaries change completely! In raw scale, a $500 difference in spending completely eclipses a 10-visit difference because Euclidean distance is calculated in dollars squared. Normalizing puts both features on an equal playing field!',
    conclusionQuestions: {
      question:
        'What did your unsupervised clustering investigation uncover about Nexus Retail’s customer base?',
      options: [
        {
          id: 'opt_a',
          text: 'The algorithm revealed pre-existing labels that were secretly stored inside the database.',
          isCorrect: false,
          feedback:
            'Incorrect! Unsupervised learning does not read hidden labels; it groups points based purely on geometric similarity.',
        },
        {
          id: 'opt_b',
          text: 'Customers naturally partition into distinct archetypes (such as VIP high-spenders vs frequent budget shoppers), and normalizing features was essential for balanced groupings.',
          isCorrect: true,
          feedback:
            'Brilliant deduction! You uncovered real behavioral patterns, understood the necessity of feature normalization, and translated math into business insight.',
        },
        {
          id: 'opt_c',
          text: 'Clustering showed that all 180 customers behave identically and segmentation is impossible.',
          isCorrect: false,
          feedback:
            'Incorrect! The scatter plot and inertia metrics clearly demonstrated distinct, coherent cluster groupings.',
        },
      ],
      transferChallenge: {
        scenario:
          'A medical researcher wants to cluster hospital patients by Age (years, range 20–80) and White Blood Cell Count (cells/mcL, range 4,000–12,000) using K-Means with Euclidean distance.',
        question: 'What will happen if the researcher forgets to scale/standardize the features first?',
        options: [
          'Age and blood cell count will have equal weight',
          'Blood cell count will completely dominate the clusters, and Age will have virtually zero effect',
          'The algorithm will fail to run',
          'The model will underfit by 50%',
        ],
        correctIndex: 1,
        explanation:
          'A difference of 1,000 blood cells is squared to 1,000,000 in Euclidean distance, whereas a 20-year age difference is squared to only 400! Without scaling, blood cells dominate 99.96% of the distance.',
      },
    },
    debrief: {
      conceptName: 'Unsupervised Learning and K-Means Clustering',
      whatJustHappened:
        'You took an unlabeled dataset of 180 shoppers, ran the K-Means algorithm to find geometric centroids, and tested the dramatic effect of feature scaling. You discovered natural customer archetypes without human supervision.',
      keyTakeaways: [
        'Unsupervised Learning: Algorithms that discover hidden patterns or groupings in unlabeled data.',
        'K-Means: Iteratively calculates cluster centroids and assigns points to their nearest centroid.',
        'Centroid: The center point (mean vector) of all points belonging to a cluster.',
        'Feature Scaling: Essential whenever calculating Euclidean distance across features with different units or scales.',
      ],
      experimentPrompt:
        'Toggle the "Feature Scaling" switch between "Normalized (Z-Score)" and "Raw Scale". Watch how the cluster boundaries shift on the scatter plot!',
    },
  },
];
