// Beginner-friendly plain-English glossary for Data Science terms
export const GLOSSARY = {
  sampling_bias: {
    term: "Sampling Bias (Unfair Survey)",
    short: "Asking only a biased group instead of everyone.",
    analogy: "Like asking only people leaving an ice-cream parlor if they love ice cream, and claiming the whole city loves ice cream!",
    simpleRules: [
      "Population = Everyone in the whole city/college.",
      "Sample = The small group of people you actually asked.",
      "Fair Sample = Anyone had an equal chance to be picked."
    ]
  },
  correlation_causation: {
    term: "Correlation vs Causation (Coincidence vs Cause)",
    short: "Two things moving together doesn't mean one caused the other.",
    analogy: "In summer, ice cream sales and shark attacks both shoot up. But eating ice cream doesn't attract sharks! The hot sunny weather causes both.",
    simpleRules: [
      "Correlation = They move at the same time.",
      "Causation = One action directly triggers the other.",
      "Lurking / Confounding Variable = The hidden third factor (like Hot Weather)."
    ]
  },
  overfitting: {
    term: "Overfitting (Memorizing vs Learning)",
    short: "When a computer model memorizes past answers by heart but fails on fresh questions.",
    analogy: "Like a student who memorizes every practice question and gets 100%, but gets an F on the real exam when the numbers change slightly.",
    simpleRules: [
      "Underfitting = The model is too simple (it didn't study at all).",
      "Overfitting = The model memorized the test questions with all the random noise.",
      "Sweet Spot = Learns the true pattern and works on brand new data."
    ]
  },
  bias_variance: {
    term: "Bias vs Variance (Too Stubborn vs Too Sensitive)",
    short: "Finding the balance between being too inflexible and overreacting.",
    analogy: "High Bias is like a stubborn referee who calls foul no matter what happens. High Variance is like a nervous referee who changes rules with every bounce of the ball.",
    simpleRules: [
      "High Bias (Underfitting) = Refuses to see the curve, draws a straight line.",
      "High Variance (Overfitting) = Wildly swings to touch every single dot.",
      "Goal = Low Bias + Low Variance (Smooth, accurate balance)."
    ]
  },
  clustering: {
    term: "Clustering & Unsupervised Learning (Grouping by Nature)",
    short: "Discovering natural groups in data without being given answers.",
    analogy: "Like pouring mixed LEGO bricks onto the floor and sorting them into piles of small bricks, wheels, and flat plates.",
    simpleRules: [
      "K = The number of groups/clusters you want to find.",
      "Feature Scaling = Making sure big numbers (like $5,000 salary) don't overpower small numbers (like 2 visits per week) when comparing."
    ]
  }
};
