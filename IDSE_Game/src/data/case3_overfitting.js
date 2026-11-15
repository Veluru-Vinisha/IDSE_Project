import { createRNG, fitPolynomial, meanSquaredError, rSquared } from '../utils/math.js';

function generateRenewalData() {
  const rng = createRNG(9876);
  const train = [];
  const test = [];

  // Ground truth function: inverted parabolic trend y = 15 + 1.7*x - 0.014*x^2
  function groundTruth(x) {
    return 15 + 1.7 * x - 0.014 * x * x;
  }

  // 36 Training points with Gaussian-like noise
  for (let i = 0; i < 36; i++) {
    const x = Math.round(5 + (i / 35) * 90 + (rng() - 0.5) * 4);
    const noise = (rng() - 0.5 + (rng() - 0.5)) * 10;
    const y = Math.max(5, Math.min(95, Math.round(groundTruth(x) + noise)));
    train.push({
      id: `CUST-TR-${i + 1}`,
      engagementScore: x,
      renewalRate: y,
      type: 'train',
    });
  }

  // 24 Unseen Test points
  for (let i = 0; i < 24; i++) {
    const x = Math.round(7 + (i / 23) * 86 + (rng() - 0.5) * 5);
    const noise = (rng() - 0.5 + (rng() - 0.5)) * 10;
    const y = Math.max(5, Math.min(95, Math.round(groundTruth(x) + noise)));
    test.push({
      id: `CUST-TE-${i + 1}`,
      engagementScore: x,
      renewalRate: y,
      type: 'test',
    });
  }

  return { train, test, groundTruth };
}

export const DATASET = generateRenewalData();

export const MODEL_COMPLEXITIES = [
  {
    id: 1,
    name: 'Level 1: 📏 Stiff Straight Ruler (Underfitting)',
    badge: '❌ Too Simple / Underfitting',
    description: 'A completely straight line. Too stubborn to bend, so it misses the curve.',
    degree: 1,
  },
  {
    id: 2,
    name: 'Level 2: 🎯 The Sweet Spot (Optimal Fit)',
    badge: '🏆 Best Model (Generalizes Well)',
    description: 'A smooth curve that captures the true trend without getting distracted by random dots.',
    degree: 3,
  },
  {
    id: 3,
    name: 'Level 3: 🐍 Wild Rollercoaster (Overfitting)',
    badge: '⚠️ Memorized Noise / Overfitting',
    description: 'An aggressive curve that wiggles frantically to touch every single practice dot, but crashes on new tests!',
    degree: 9,
  },
];

export function evaluateModel(degree) {
  const trainX = DATASET.train.map((d) => d.engagementScore);
  const trainY = DATASET.train.map((d) => d.renewalRate);

  const testX = DATASET.test.map((d) => d.engagementScore);
  const testY = DATASET.test.map((d) => d.renewalRate);

  // Fit polynomial strictly on training split
  const model = fitPolynomial(trainX, trainY, degree);

  const predTrain = trainX.map(model.predict);
  const predTest = testX.map(model.predict);

  const trainMSE = Number(meanSquaredError(trainY, predTrain).toFixed(1));
  const testMSE = Number(meanSquaredError(testY, predTest).toFixed(1));

  const trainR2 = Number(rSquared(trainY, predTrain).toFixed(2));
  const testR2 = Number(rSquared(testY, predTest).toFixed(2));

  // Generate smooth prediction curve for plotting
  const curvePoints = [];
  for (let x = 0; x <= 100; x += 2) {
    const yPred = model.predict(x);
    curvePoints.push({
      x,
      y: Number(Math.max(-20, Math.min(120, yPred)).toFixed(1)),
      groundTruth: Number(DATASET.groundTruth(x).toFixed(1)),
    });
  }

  let diagnosis = 'Balanced';
  if (degree === 1) diagnosis = 'Underfitting (High Bias)';
  if (degree >= 7) diagnosis = 'Overfitting (High Variance)';

  return {
    degree,
    trainMSE,
    testMSE,
    trainR2,
    testR2,
    curvePoints,
    diagnosis,
    trainData: DATASET.train,
    testData: DATASET.test,
  };
}
