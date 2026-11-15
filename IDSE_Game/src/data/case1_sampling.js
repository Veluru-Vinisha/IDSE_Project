import { createRNG, mean } from '../utils/math.js';

// Pre-generate a reproducible population of 600 college students
function generatePopulation() {
  const rng = createRNG(777);
  const departments = [
    { name: 'Engineering', count: 160, satProb: 0.94, avgStudy: 24 },
    { name: 'Arts & Humanities', count: 140, satProb: 0.32, avgStudy: 16 },
    { name: 'Business', count: 120, satProb: 0.76, avgStudy: 18 },
    { name: 'Sciences', count: 100, satProb: 0.46, avgStudy: 22 },
    { name: 'Nursing', count: 80, satProb: 0.40, avgStudy: 26 },
  ];

  const firstNames = ['Alex', 'Sam', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Avery', 'Dakota', 'Quinn', 'Harper', 'Peyton', 'Skyler', 'Cameron', 'Rowan'];
  const lastNames = ['Chen', 'Smith', 'Garcia', 'Patel', 'Johnson', 'Kim', 'Davis', 'Rodriguez', 'Brown', 'Singh', 'Miller', 'Wilson', 'Martinez', 'Taylor'];

  const population = [];
  let idCounter = 1001;

  departments.forEach((dept) => {
    for (let i = 0; i < dept.count; i++) {
      const isSatisfied = rng() < dept.satProb ? 1 : 0;
      const year = Math.floor(rng() * 4) + 1;
      const residence = rng() < 0.45 ? 'On-Campus Dorm' : 'Off-Campus Commuter';
      const fName = firstNames[Math.floor(rng() * firstNames.length)];
      const lName = lastNames[Math.floor(rng() * lastNames.length)];
      const isVolunteer = isSatisfied === 1 ? rng() < 0.65 : rng() < 0.15; // Satisfied students far more likely to volunteer
      const inEngLobby = dept.name === 'Engineering' ? rng() < 0.85 : rng() < 0.05;

      population.push({
        id: `STU-${idCounter++}`,
        name: `${fName} ${lName}`,
        department: dept.name,
        year,
        residence,
        studyHours: Math.round(dept.avgStudy + (rng() - 0.5) * 8),
        satisfied: isSatisfied,
        rating: isSatisfied ? Math.floor(rng() * 3) + 8 : Math.floor(rng() * 4) + 2,
        isVolunteer,
        inEngLobby,
      });
    }
  });

  return population;
}

export const POPULATION = generatePopulation();

export const POPULATION_STATS = {
  total: POPULATION.length,
  satisfiedCount: POPULATION.filter((s) => s.satisfied === 1).length,
  trueSatisfactionRate: Number(
    ((POPULATION.filter((s) => s.satisfied === 1).length / POPULATION.length) * 100).toFixed(1)
  ),
  departmentCounts: POPULATION.reduce((acc, s) => {
    acc[s.department] = (acc[s.department] || 0) + 1;
    return acc;
  }, {}),
};

export const SAMPLING_METHODS = [
  {
    id: 'convenience_engineering',
    name: '🏢 The Lazy Survey: Ask Only in Engineering Lobby',
    badge: '❌ Unfair & Biased (Only asks happy rich building)',
    description: 'Only surveying students walking through the brand new $50M luxury engineering center.',
    isBiased: true,
  },
  {
    id: 'simple_random',
    name: '🎲 True Random Lottery: Ask Anyone Across Campus',
    badge: '✅ Fair & Balanced (Representative)',
    description: 'Every student across all colleges has an equal chance to be picked.',
    isBiased: false,
  },
  {
    id: 'voluntary_poll',
    name: '📢 Volunteer Web Poll: Only People Who Care to Click',
    badge: '⚠️ Voluntary Bias (Only extreme fans/haters vote)',
    description: 'Posting a link online and only including students who actively choose to respond.',
    isBiased: true,
  },
  {
    id: 'stratified_random',
    name: '⚖️ Fair Quota: Equal Equal Representation Per Major',
    badge: '✅ Fair & Balanced (Proportional)',
    description: 'Randomly samples proportional quotas from every single department.',
    isBiased: false,
  },
];

export function drawSample(methodId, sampleSize, seed = 42) {
  const rng = createRNG(seed);
  let eligiblePool = [];

  if (methodId === 'convenience_engineering') {
    // 85% from Engineering lobby, tiny remainder
    eligiblePool = POPULATION.filter((s) => s.inEngLobby);
  } else if (methodId === 'voluntary_poll') {
    // Only students who volunteer to fill surveys
    eligiblePool = POPULATION.filter((s) => s.isVolunteer);
  } else if (methodId === 'stratified_random') {
    // Stratified: take proportional from each department
    const sample = [];
    const deptKeys = Object.keys(POPULATION_STATS.departmentCounts);
    deptKeys.forEach((dept) => {
      const deptStudents = POPULATION.filter((s) => s.department === dept);
      const targetDeptSize = Math.max(1, Math.round((deptStudents.length / POPULATION.length) * sampleSize));
      // Shuffle dept students
      const shuffled = [...deptStudents].sort(() => rng() - 0.5);
      sample.push(...shuffled.slice(0, targetDeptSize));
    });
    return analyzeSample(sample.slice(0, sampleSize));
  } else {
    // Simple random sampling across entire population
    eligiblePool = [...POPULATION];
  }

  // Shuffle pool with seed
  const shuffled = [...eligiblePool].sort(() => rng() - 0.5);
  const sample = shuffled.slice(0, Math.min(sampleSize, shuffled.length));

  return analyzeSample(sample);
}

function analyzeSample(sample) {
  const n = sample.length;
  if (n === 0) {
    return {
      sample: [],
      sampleSize: 0,
      satisfiedCount: 0,
      estimatedSatisfactionRate: 0,
      marginOfError: 0,
      ciLow: 0,
      ciHigh: 0,
      departmentComposition: {},
    };
  }

  const satisfiedCount = sample.filter((s) => s.satisfied === 1).length;
  const p = satisfiedCount / n;
  const ratePct = Number((p * 100).toFixed(1));

  // 95% Confidence Interval: 1.96 * sqrt(p * (1-p) / n)
  const se = Math.sqrt((p * (1 - p)) / n);
  const moe = Number((1.96 * se * 100).toFixed(1));
  const ciLow = Math.max(0, Number((ratePct - moe).toFixed(1)));
  const ciHigh = Math.min(100, Number((ratePct + moe).toFixed(1)));

  // Department counts
  const deptCounts = sample.reduce((acc, s) => {
    acc[s.department] = (acc[s.department] || 0) + 1;
    return acc;
  }, {});

  const departmentComposition = {};
  Object.keys(POPULATION_STATS.departmentCounts).forEach((dept) => {
    const count = deptCounts[dept] || 0;
    const samplePct = Number(((count / n) * 100).toFixed(1));
    const popPct = Number(((POPULATION_STATS.departmentCounts[dept] / POPULATION_STATS.total) * 100).toFixed(1));
    departmentComposition[dept] = {
      count,
      samplePct,
      popPct,
      diff: Number((samplePct - popPct).toFixed(1)),
    };
  });

  return {
    sample,
    sampleSize: n,
    satisfiedCount,
    estimatedSatisfactionRate: ratePct,
    marginOfError: moe,
    ciLow,
    ciHigh,
    departmentComposition,
  };
}
