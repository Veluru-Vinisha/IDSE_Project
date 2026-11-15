// Deterministic pseudo-random number generator (Mulberry32)
export function createRNG(seed = 12345) {
  let s = seed >>> 0;
  return function () {
    s = (s + 0x6D2B79F5) >>> 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function mean(arr) {
  if (!arr || arr.length === 0) return 0;
  const sum = arr.reduce((acc, val) => acc + (typeof val === 'number' ? val : 0), 0);
  return sum / arr.length;
}

export function variance(arr, isSample = true) {
  if (!arr || arr.length <= 1) return 0;
  const m = mean(arr);
  const sumSquares = arr.reduce((acc, val) => acc + Math.pow(val - m, 2), 0);
  return sumSquares / (isSample ? arr.length - 1 : arr.length);
}

export function standardDeviation(arr, isSample = true) {
  return Math.sqrt(variance(arr, isSample));
}

// Pearson Correlation Coefficient r
export function pearsonCorrelation(x, y) {
  if (!x || !y || x.length !== y.length || x.length === 0) return 0;
  const n = x.length;
  const meanX = mean(x);
  const meanY = mean(y);

  let num = 0;
  let denX = 0;
  let denY = 0;

  for (let i = 0; i < n; i++) {
    const dx = x[i] - meanX;
    const dy = y[i] - meanY;
    num += dx * dy;
    denX += dx * dx;
    denY += dy * dy;
  }

  const denominator = Math.sqrt(denX * denY);
  if (denominator === 0) return 0;
  return num / denominator;
}

// Simple Linear Regression y = mx + b
export function linearRegression(x, y) {
  if (!x || !y || x.length !== y.length || x.length < 2) {
    return { slope: 0, intercept: 0, r: 0, r2: 0 };
  }
  const r = pearsonCorrelation(x, y);
  const sdX = standardDeviation(x);
  const sdY = standardDeviation(y);
  const slope = sdX === 0 ? 0 : r * (sdY / sdX);
  const intercept = mean(y) - slope * mean(x);
  return { slope, intercept, r, r2: r * r };
}

// Matrix Operations for Polynomial Regression
function solveLinearSystem(A, b) {
  const n = b.length;
  // Gaussian elimination with partial pivoting
  const M = A.map((row, i) => [...row, b[i]]);

  for (let i = 0; i < n; i++) {
    // Find pivot
    let maxRow = i;
    for (let k = i + 1; k < n; k++) {
      if (Math.abs(M[k][i]) > Math.abs(M[maxRow][i])) {
        maxRow = k;
      }
    }
    // Swap rows
    [M[i], M[maxRow]] = [M[maxRow], M[i]];

    // If singular matrix, add tiny epsilon
    if (Math.abs(M[i][i]) < 1e-12) {
      M[i][i] = 1e-6;
    }

    // Eliminate
    for (let k = i + 1; k < n; k++) {
      const factor = M[k][i] / M[i][i];
      for (let j = i; j <= n; j++) {
        M[k][j] -= factor * M[i][j];
      }
    }
  }

  // Back substitution
  const x = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    let sum = M[i][n];
    for (let j = i + 1; j < n; j++) {
      sum -= M[i][j] * x[j];
    }
    x[i] = sum / M[i][i];
  }
  return x;
}

// Polynomial Regression of given degree with L2 regularization
export function fitPolynomial(xArr, yArr, degree, lambda = 0.0001) {
  const m = degree + 1;
  const A = Array.from({ length: m }, () => new Array(m).fill(0));
  const b = new Array(m).fill(0);

  // Precompute power sums
  const powers = new Array(2 * degree + 1).fill(0);
  for (let i = 0; i < xArr.length; i++) {
    let xp = 1;
    for (let p = 0; p <= 2 * degree; p++) {
      powers[p] += xp;
      xp *= xArr[i];
    }
  }

  // Precompute y * x^p sums
  for (let i = 0; i < xArr.length; i++) {
    let xp = 1;
    for (let p = 0; p <= degree; p++) {
      b[p] += yArr[i] * xp;
      xp *= xArr[i];
    }
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < m; j++) {
      A[i][j] = powers[i + j];
      if (i === j && i > 0) {
        A[i][j] += lambda; // L2 Ridge regularization for stability
      }
    }
  }

  const coeffs = solveLinearSystem(A, b);

  const predict = (xVal) => {
    let res = 0;
    let xp = 1;
    for (let i = 0; i < coeffs.length; i++) {
      res += coeffs[i] * xp;
      xp *= xVal;
    }
    return res;
  };

  return { coeffs, predict };
}

export function meanSquaredError(yTrue, yPred) {
  if (!yTrue || !yPred || yTrue.length === 0) return 0;
  const sumSq = yTrue.reduce((acc, yt, i) => acc + Math.pow(yt - yPred[i], 2), 0);
  return sumSq / yTrue.length;
}

export function rSquared(yTrue, yPred) {
  if (!yTrue || yTrue.length === 0) return 0;
  const yMean = mean(yTrue);
  const ssTotal = yTrue.reduce((acc, val) => acc + Math.pow(val - yMean, 2), 0);
  const ssRes = yTrue.reduce((acc, val, i) => acc + Math.pow(val - yPred[i], 2), 0);
  if (ssTotal === 0) return 1;
  return Math.max(0, 1 - ssRes / ssTotal);
}

// Z-Score Standardize Multi-Dimensional Features
export function standardizeFeatures(data, featureKeys) {
  const stats = {};
  featureKeys.forEach((key) => {
    const vals = data.map((d) => d[key]);
    const m = mean(vals);
    const sd = standardDeviation(vals) || 1;
    stats[key] = { mean: m, sd };
  });

  const scaled = data.map((d) => {
    const item = { ...d };
    featureKeys.forEach((key) => {
      item[`${key}_scaled`] = (d[key] - stats[key].mean) / stats[key].sd;
    });
    return item;
  });

  return { scaled, stats };
}

// K-Means Clustering Algorithm with K-Means++ Initialization
export function runKMeans(points, k, featureKeys, maxIter = 100, seed = 42) {
  if (!points || points.length === 0 || k <= 0) {
    return { centroids: [], assignments: [], inertia: 0 };
  }

  const rng = createRNG(seed);
  const n = points.length;
  const d = featureKeys.length;

  // Extract raw vectors
  const X = points.map((p) => featureKeys.map((f) => p[f]));

  function distSq(v1, v2) {
    let sum = 0;
    for (let j = 0; j < d; j++) {
      const diff = v1[j] - v2[j];
      sum += diff * diff;
    }
    return sum;
  }

  // K-means++ initialization
  const centroids = [];
  // First centroid chosen uniformly at random
  const firstIdx = Math.floor(rng() * n);
  centroids.push([...X[firstIdx]]);

  while (centroids.length < k) {
    const dists = X.map((x) => {
      let minDist = Infinity;
      for (const c of centroids) {
        const dist = distSq(x, c);
        if (dist < minDist) minDist = dist;
      }
      return minDist;
    });

    const totalDist = dists.reduce((a, b) => a + b, 0);
    let r = rng() * totalDist;
    let chosen = 0;
    for (let i = 0; i < n; i++) {
      r -= dists[i];
      if (r <= 0) {
        chosen = i;
        break;
      }
    }
    centroids.push([...X[chosen]]);
  }

  let assignments = new Array(n).fill(0);
  let changed = true;
  let iter = 0;

  while (changed && iter < maxIter) {
    changed = false;
    iter++;

    // Assignment step
    for (let i = 0; i < n; i++) {
      let bestDist = Infinity;
      let bestCluster = 0;
      for (let c = 0; c < k; c++) {
        const dist = distSq(X[i], centroids[c]);
        if (dist < bestDist) {
          bestDist = dist;
          bestCluster = c;
        }
      }
      if (assignments[i] !== bestCluster) {
        assignments[i] = bestCluster;
        changed = true;
      }
    }

    // Update step
    const counts = new Array(k).fill(0);
    const newCentroids = Array.from({ length: k }, () => new Array(d).fill(0));

    for (let i = 0; i < n; i++) {
      const c = assignments[i];
      counts[c]++;
      for (let j = 0; j < d; j++) {
        newCentroids[c][j] += X[i][j];
      }
    }

    for (let c = 0; c < k; c++) {
      if (counts[c] > 0) {
        for (let j = 0; j < d; j++) {
          newCentroids[c][j] /= counts[c];
        }
        centroids[c] = newCentroids[c];
      } else {
        // Re-seed empty cluster to a random data point
        centroids[c] = [...X[Math.floor(rng() * n)]];
      }
    }
  }

  // Compute inertia (Within-Cluster Sum of Squares)
  let inertia = 0;
  for (let i = 0; i < n; i++) {
    inertia += distSq(X[i], centroids[assignments[i]]);
  }

  return {
    centroids: centroids.map((c) => {
      const obj = {};
      featureKeys.forEach((key, idx) => {
        obj[key] = c[idx];
      });
      return obj;
    }),
    assignments,
    inertia,
    iterations: iter,
  };
}
