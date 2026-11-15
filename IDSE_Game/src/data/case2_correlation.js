import { createRNG, pearsonCorrelation, linearRegression } from '../utils/math.js';

function generateTownData() {
  const rng = createRNG(6); // Perfectly calibrated: r = +0.902 across all weeks, collapses to flat r = +0.043 on hot summer days!
  const data = [];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  for (let week = 1; week <= 52; week++) {
    // Seasonal temperature cycle (peaks around week 28-32 in July/August)
    const angle = ((week - 4) / 52) * 2 * Math.PI;
    const baseTemp = 60 + 26 * Math.sin(angle); // 34°F in winter to 86°F in summer
    const tempNoise = (rng() - 0.5) * 6;
    const temp = Math.round(baseTemp + tempNoise);

    const tempNorm = Math.max(0, Math.min(1, (temp - 30) / 56));

    // Confounder effect: Higher summer temp drives BOTH ice cream sales and beach visits/swimming
    // But weekly ice cream sales and weekly water rescues are completely independent of each other!
    const iceCream = Math.round(5 + tempNorm * 50 + (rng() - 0.5) * 20);
    const incidents = Math.round(1 + tempNorm * 25 + (rng() - 0.5) * 12);

    // Park visitors (hundreds)
    const visitors = Math.round(Math.max(10, 8 + tempNorm * 65 + (rng() - 0.5) * 12));

    // Hot chocolate sales ($1000s) - inverse to temp
    const hotCocoa = Math.round(Math.max(4, 55 - tempNorm * 45 + (rng() - 0.5) * 8));

    const monthIndex = Math.min(11, Math.floor(((week - 1) / 52) * 12));

    data.push({
      week,
      month: months[monthIndex],
      temperature: temp,
      iceCreamSales: Math.max(3, iceCream),
      swimmingIncidents: Math.max(0, incidents),
      parkVisitors: visitors,
      hotCocoaSales: Math.max(2, hotCocoa),
    });
  }

  return data;
}

export const TOWN_DATA = generateTownData();

export const VARIABLE_META = {
  iceCreamSales: {
    label: 'Ice Cream Sales ($1,000s)',
    shortLabel: 'Ice Cream Sales',
    unit: '$k',
    description: 'Weekly gross revenue of beachside ice cream parlors and carts.',
  },
  swimmingIncidents: {
    label: 'Swimming Distress Calls',
    shortLabel: 'Swimming Incidents',
    unit: 'calls',
    description: 'Lifeguard rescues and emergency water assistance calls.',
  },
  temperature: {
    label: 'Average Weekly Temperature (°F)',
    shortLabel: 'Temperature',
    unit: '°F',
    description: 'Official municipal meteorological reading.',
  },
  parkVisitors: {
    label: 'Park & Beach Visitors (Hundreds)',
    shortLabel: 'Beach Visitors',
    unit: 'x100',
    description: 'Turnstile and aerial count of park and waterfront visitors.',
  },
  hotCocoaSales: {
    label: 'Hot Cocoa Sales ($1,000s)',
    shortLabel: 'Hot Cocoa',
    unit: '$k',
    description: 'Weekly revenue from hot beverages and warm treats.',
  },
};

export function analyzeVariables(xKey, yKey, tempFilter = 'all') {
  let filtered = TOWN_DATA;
  if (tempFilter === 'cold') {
    filtered = TOWN_DATA.filter((d) => d.temperature < 55);
  } else if (tempFilter === 'mild') {
    filtered = TOWN_DATA.filter((d) => d.temperature >= 55 && d.temperature <= 72);
  } else if (tempFilter === 'hot') {
    filtered = TOWN_DATA.filter((d) => d.temperature > 72);
  }

  const xVals = filtered.map((d) => d[xKey]);
  const yVals = filtered.map((d) => d[yKey]);

  const r = pearsonCorrelation(xVals, yVals);
  const reg = linearRegression(xVals, yVals);

  return {
    data: filtered,
    totalPoints: filtered.length,
    r: Number(r.toFixed(3)),
    r2: Number(reg.r2.toFixed(3)),
    slope: Number(reg.slope.toFixed(3)),
    intercept: Number(reg.intercept.toFixed(3)),
    xKey,
    yKey,
    tempFilter,
  };
}
