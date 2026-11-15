import { createRNG, runKMeans, standardizeFeatures, mean } from '../utils/math.js';

function generateRetailCustomers() {
  const rng = createRNG(55512);
  const customers = [];

  // 4 latent archetype generators
  const archetypes = [
    {
      name: 'Budget Frequent Shoppers',
      count: 50,
      visitsMean: 22,
      visitsSd: 3,
      spendMean: 1400,
      spendSd: 300,
      onlineMean: 20,
      cartMean: 35,
    },
    {
      name: 'VIP High-Rollers',
      count: 40,
      visitsMean: 7,
      visitsSd: 2,
      spendMean: 7800,
      spendSd: 900,
      onlineMean: 45,
      cartMean: 240,
    },
    {
      name: 'Casual Occasionals',
      count: 50,
      visitsMean: 3,
      visitsSd: 1.5,
      spendMean: 500,
      spendSd: 200,
      onlineMean: 30,
      cartMean: 50,
    },
    {
      name: 'Digital Power-Users',
      count: 40,
      visitsMean: 14,
      visitsSd: 3,
      spendMean: 3800,
      spendSd: 600,
      onlineMean: 88,
      cartMean: 95,
    },
  ];

  const firstNames = ['Alex','Blake','Casey','Dana','Eli','Faye','Glen','Hana','Iris','Jace','Kim','Lee','Max','Noa','Owen','Pam','Quinn','Remy','Sam','Tara','Uma','Val','Wren','Xena','Yara','Zane','Ash','Bex','Cleo','Drew'];
  const lastNames = ['Smith','Jones','Lee','Kim','Patel','Brown','Davis','Miller','Wilson','Moore','Taylor','Anderson','Thomas','Jackson','White','Harris','Martin','Garcia','Thompson','Martinez'];
  const rng2 = createRNG(99887);

  let idCounter = 1;
  archetypes.forEach((arch) => {
    for (let i = 0; i < arch.count; i++) {
      const visits = Math.max(1, Math.round(arch.visitsMean + (rng() - 0.5) * arch.visitsSd * 2));
      const spend = Math.max(150, Math.round(arch.spendMean + (rng() - 0.5) * arch.spendSd * 2));
      const online = Math.max(5, Math.min(95, Math.round(arch.onlineMean + (rng() - 0.5) * 16)));
      const cart = Math.max(15, Math.round(arch.cartMean + (rng() - 0.5) * 20));
      const firstName = firstNames[Math.floor(rng2() * firstNames.length)];
      const lastName = lastNames[Math.floor(rng2() * lastNames.length)];

      customers.push({
        id: `CUST-${String(idCounter++).padStart(3, '0')}`,
        name: `${firstName} ${lastName}`,
        monthlyVisits: visits,
        annualSpending: spend,
        onlineRatio: online,
        avgCartSize: cart,
      });
    }
  });

  return customers;
}

export const RETAIL_CUSTOMERS = generateRetailCustomers();

export const CLUSTERING_FEATURES = {
  annualSpending: {
    label: 'Annual Spending ($)',
    shortLabel: 'Spending',
    unit: '$',
    min: 150,
    max: 10000,
  },
  monthlyVisits: {
    label: 'Monthly Store Visits',
    shortLabel: 'Visits',
    unit: 'visits/mo',
    min: 1,
    max: 30,
  },
  onlineRatio: {
    label: 'Online Purchase Ratio (%)',
    shortLabel: 'Online %',
    unit: '%',
    min: 5,
    max: 95,
  },
  avgCartSize: {
    label: 'Average Basket Size ($)',
    shortLabel: 'Basket $',
    unit: '$',
    min: 15,
    max: 350,
  },
};

export const CLUSTER_COLORS = [
  '#06b6d4', // Cyan
  '#f59e0b', // Amber
  '#10b981', // Emerald
  '#ec4899', // Pink
  '#8b5cf6', // Purple
];

export function executeClustering(featureX, featureY, k, useStandardization = true, seed = 42) {
  const selectedFeatures = [featureX, featureY];
  let pointsToCluster = RETAIL_CUSTOMERS;
  let activeFeatures = selectedFeatures;

  if (useStandardization) {
    const { scaled } = standardizeFeatures(RETAIL_CUSTOMERS, selectedFeatures);
    pointsToCluster = scaled;
    activeFeatures = selectedFeatures.map((f) => `${f}_scaled`);
  }

  const { centroids, assignments, inertia, iterations } = runKMeans(
    pointsToCluster,
    k,
    activeFeatures,
    100,
    seed
  );

  // Attach assignments to original customer items
  const clusteredData = RETAIL_CUSTOMERS.map((cust, idx) => ({
    ...cust,
    cluster: assignments[idx],
  }));

  // Build centroids in ORIGINAL (unscaled) coordinate space for plotting
  // by averaging the actual feature values of cluster members
  const originalCentroids = [];
  for (let c = 0; c < k; c++) {
    const members = clusteredData.filter((d) => d.cluster === c);
    const centObj = {};
    selectedFeatures.forEach((f) => {
      centObj[f] = members.length > 0 ? mean(members.map((m) => m[f])) : 0;
    });
    originalCentroids.push(centObj);
  }

  // Calculate summary stats for each cluster
  const clusterSummaries = [];
  for (let c = 0; c < k; c++) {
    const members = clusteredData.filter((d) => d.cluster === c);
    const count = members.length;
    const avgX = count > 0 ? mean(members.map((m) => m[featureX])) : 0;
    const avgY = count > 0 ? mean(members.map((m) => m[featureY])) : 0;
    const pct = Number(((count / RETAIL_CUSTOMERS.length) * 100).toFixed(1));

    clusterSummaries.push({
      clusterId: c,
      color: CLUSTER_COLORS[c % CLUSTER_COLORS.length],
      count,
      pct,
      avgX: Number(avgX.toFixed(1)),
      avgY: Number(avgY.toFixed(1)),
      members,
    });
  }

  return {
    clusteredData,
    clusterSummaries,
    centroids: originalCentroids,  // always in original feature space for plotting
    inertia: Number(inertia.toFixed(1)),
    iterations,
    featureX,
    featureY,
    k,
    useStandardization,
  };
}
