import { describe, it, expect } from 'vitest';
import {
  mean,
  variance,
  standardDeviation,
  pearsonCorrelation,
  linearRegression,
  fitPolynomial,
  meanSquaredError,
  rSquared,
  runKMeans,
  standardizeFeatures,
} from './math.js';

describe('Data Science Mathematics & Algorithms', () => {
  it('correctly calculates basic descriptive statistics', () => {
    const data = [10, 20, 30, 40, 50];
    expect(mean(data)).toBe(30);
    expect(variance(data, true)).toBe(250);
    expect(standardDeviation(data, true)).toBeCloseTo(15.811, 3);
  });

  it('computes exact Pearson correlation coefficient r', () => {
    const x = [1, 2, 3, 4, 5];
    const y = [2, 4, 6, 8, 10]; // Perfect positive
    expect(pearsonCorrelation(x, y)).toBeCloseTo(1.0, 5);

    const yNeg = [10, 8, 6, 4, 2]; // Perfect negative
    expect(pearsonCorrelation(x, yNeg)).toBeCloseTo(-1.0, 5);

    const yRandom = [5, 2, 8, 1, 9];
    const r = pearsonCorrelation(x, yRandom);
    expect(r).toBeGreaterThanOrEqual(-1);
    expect(r).toBeLessThanOrEqual(1);
  });

  it('fits linear regression parameters accurately', () => {
    const x = [1, 2, 3, 4, 5];
    const y = [3, 5, 7, 9, 11]; // y = 2x + 1
    const fit = linearRegression(x, y);
    expect(fit.slope).toBeCloseTo(2.0, 4);
    expect(fit.intercept).toBeCloseTo(1.0, 4);
    expect(fit.r2).toBeCloseTo(1.0, 4);
  });

  it('fits polynomial regression and evaluates train vs test error', () => {
    // Non-linear quadratic curve y = x^2 - 4x + 3
    const xTrain = [0, 1, 2, 3, 4, 5];
    const yTrain = xTrain.map((x) => x * x - 4 * x + 3);

    // Fit degree 2 polynomial
    const poly = fitPolynomial(xTrain, yTrain, 2);
    const predsTrain = xTrain.map(poly.predict);
    const mseTrain = meanSquaredError(yTrain, predsTrain);
    expect(mseTrain).toBeLessThan(0.01);

    // Test on unseen points
    const xTest = [1.5, 2.5, 3.5];
    const yTest = xTest.map((x) => x * x - 4 * x + 3);
    const predsTest = xTest.map(poly.predict);
    const mseTest = meanSquaredError(yTest, predsTest);
    expect(mseTest).toBeLessThan(0.05);
  });

  it('standardizes multi-feature datasets with z-score', () => {
    const items = [
      { a: 10, b: 1000 },
      { a: 20, b: 2000 },
      { a: 30, b: 3000 },
    ];
    const { scaled, stats } = standardizeFeatures(items, ['a', 'b']);
    expect(stats.a.mean).toBe(20);
    expect(scaled[1].a_scaled).toBeCloseTo(0, 4);
    expect(scaled[0].b_scaled).toBeCloseTo(-1, 4);
    expect(scaled[2].b_scaled).toBeCloseTo(1, 4);
  });

  it('executes K-Means clustering and partitions into distinct groups', () => {
    // 6 points in 2 well-separated clusters: cluster A around (0,0), cluster B around (100, 100)
    const points = [
      { x: 0, y: 1 },
      { x: 1, y: 0 },
      { x: 2, y: 2 },
      { x: 98, y: 99 },
      { x: 100, y: 100 },
      { x: 102, y: 101 },
    ];

    const result = runKMeans(points, 2, ['x', 'y'], 50, 42);
    expect(result.centroids.length).toBe(2);
    expect(result.assignments.length).toBe(6);

    // Points 0, 1, 2 should share the same cluster
    expect(result.assignments[0]).toBe(result.assignments[1]);
    expect(result.assignments[1]).toBe(result.assignments[2]);

    // Points 3, 4, 5 should share the other cluster
    expect(result.assignments[3]).toBe(result.assignments[4]);
    expect(result.assignments[4]).toBe(result.assignments[5]);

    // Cluster A and Cluster B must be different
    expect(result.assignments[0]).not.toBe(result.assignments[3]);
  });
});
