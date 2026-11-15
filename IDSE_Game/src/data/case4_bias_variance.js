import { createRNG, fitPolynomial, mean } from '../utils/math.js';

// Ground truth credit risk function: risk score based on credit health index x in [0, 100]
export function groundTruthRisk(x) {
  return 85 - 1.2 * x + 0.006 * x * x;
}

// Generate multiple resampled training cohorts from the applicant population
function generateCohorts(numCohorts = 8, cohortSize = 25) {
  const rng = createRNG(31415);
  const cohorts = [];

  for (let c = 0; c < numCohorts; c++) {
    const data = [];
    for (let i = 0; i < cohortSize; i++) {
      const x = Math.round(5 + rng() * 90);
      const noise = (rng() - 0.5 + (rng() - 0.5)) * 14;
      const y = Math.max(5, Math.min(95, Math.round(groundTruthRisk(x) + noise)));
      data.push({ x, y, id: `APP-C${c + 1}-${i + 1}` });
    }
    // Sort by x for cleaner inspection
    data.sort((a, b) => a.x - b.x);
    cohorts.push(data);
  }

  return cohorts;
}

export const APPLICANT_COHORTS = generateCohorts(8, 25);

export const ARCHITECTURES = [
  {
    id: 'rigid_linear',
    name: 'Model 1: 🗿 The Stubborn Referee (High Bias)',
    degree: 1,
    description: 'Extremely rigid straight line. It never changes its mind, but it misses the real curve entirely.',
  },
  {
    id: 'balanced_poly',
    name: 'Model 2: ⚖️ The Fair Judge (Optimal Balance)',
    degree: 3,
    description: 'Captures the true curve smoothly while giving consistent, reliable scores across all months.',
  },
  {
    id: 'flexible_extreme',
    name: 'Model 3: 🌪️ The Nervous Wiggler (High Variance)',
    degree: 8,
    description: 'Hyper-sensitive. Swings wildly and gives totally different answers depending on which month it trained on!',
  },
];

export function runMultiCohortExperiment(degree) {
  const numCohorts = APPLICANT_COHORTS.length;
  const models = [];
  const cohortCurves = [];

  // Fit model on each cohort independently
  for (let c = 0; c < numCohorts; c++) {
    const cohort = APPLICANT_COHORTS[c];
    const xArr = cohort.map((d) => d.x);
    const yArr = cohort.map((d) => d.y);
    const model = fitPolynomial(xArr, yArr, degree);
    models.push(model);

    const curve = [];
    for (let x = 0; x <= 100; x += 4) {
      curve.push({
        x,
        y: Math.max(-10, Math.min(110, model.predict(x))),
      });
    }
    cohortCurves.push(curve);
  }

  // Decompose Bias and Variance over evaluation grid
  const testX = [];
  for (let x = 5; x <= 95; x += 5) testX.push(x);

  const biasSquaredList = [];
  const varianceList = [];

  testX.forEach((x) => {
    const trueY = groundTruthRisk(x);
    const predsAtX = models.map((m) => m.predict(x));
    const meanPred = mean(predsAtX);

    // Bias^2 = (E[f_hat(x)] - f(x))^2
    const biasSq = Math.pow(meanPred - trueY, 2);
    // Variance = E[(f_hat(x) - E[f_hat(x)])^2]
    const varAtX = mean(predsAtX.map((p) => Math.pow(p - meanPred, 2)));

    biasSquaredList.push(biasSq);
    varianceList.push(varAtX);
  });

  const avgBiasSquared = Number(mean(biasSquaredList).toFixed(1));
  const avgVariance = Number(mean(varianceList).toFixed(1));
  const irreducibleNoise = 12.0; // Known baseline noise
  const totalError = Number((avgBiasSquared + avgVariance + irreducibleNoise).toFixed(1));

  return {
    degree,
    cohortCurves,
    avgBiasSquared,
    avgVariance,
    irreducibleNoise,
    totalError,
    models,
    sampleCohort: APPLICANT_COHORTS[0],
  };
}
