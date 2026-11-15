# 📊 Introduction to Data Science (IDSE) — Course Portfolio

Welcome to the **Introduction to Data Science (IDSE)** repository. This portfolio showcases two distinct and complementary projects developed for the course:

1. **[IDSE_Project/](./IDSE_Project/)** — **The Silent Breakdown**: A machine learning and statistical investigation for predictive maintenance and machine failure classification.
2. **[IDSE_Game/](./IDSE_Game/)** — **Data Detective**: An interactive, browser-based educational game built with React 19 to discover core data science concepts through hands-on data investigation.

---

## 📁 Repository Structure

```text
.
├── IDSE_Project/                     # Machine Learning Investigation
│   ├── The_Silent_Breakdown.ipynb    # Complete analysis & modeling notebook
│   ├── The_Silent_Breakdown_Report.pdf# Full academic research report
│   ├── requirements.txt              # Python package dependencies
│   └── README.md                     # Detailed ML project documentation
│
├── IDSE_Game/                        # Educational Data Science Game
│   ├── src/                          # React application & math engine
│   ├── index.html                    # Web app entry point
│   ├── package.json                  # Node.js dependencies & scripts
│   ├── vite.config.js                # Vite build & test configuration
│   ├── README.md                     # Comprehensive game documentation
│   └── Data_Detective_Game_Development_Prompt.md # Design rubric & specification
│
└── README.md                         # Main repository index (this file)
```

---

## 🛠️ Project Summaries

### 1. ⚙️ `IDSE_Project/` — The Silent Breakdown (Machine Failure Prediction)

* **Objective:** Predict industrial machine failure from operational sensor measurements using data science and machine learning workflows.
* **Dataset:** [UCI AI4I 2020 Predictive Maintenance Dataset](https://archive.ics.uci.edu/dataset/601/ai4i+2020+predictive+maintenance+dataset) (10,000 observations, 6 core sensor features, highly imbalanced target with 3.39% failures).
* **Key Steps & Methods:**
  * **Exploratory Data Analysis (EDA):** Identified distributions, skewness, and operational boundaries of rotational speed, torque, tool wear, and temperatures.
  * **Feature Engineering:** Developed physical domain features including *Temperature Difference*, *Mechanical Power*, and *Tool Wear Strain*.
  * **Hypothesis Testing:** Non-parametric Mann-Whitney $U$ and Chi-Square tests validating statistical separation between normal and failed machine states.
  * **Dimensionality Reduction:** Principal Component Analysis (PCA) to analyze variance across numerical features.
  * **Model Training & Evaluation:** Evaluated Majority-Class Baseline, Logistic Regression, Decision Trees, and Random Forest.
  * **Threshold Optimization:** Shifted decision threshold to $0.42$ on precision-recall space, improving failure recall to **83.82%** (detecting 57 out of 68 test failures) while maintaining **99.20% accuracy** and minimizing false alarms.
* **Quick Start:**
  ```bash
  cd IDSE_Project
  pip install -r requirements.txt
  jupyter notebook The_Silent_Breakdown.ipynb
  ```

---

### 2. 🔍 `IDSE_Game/` — Data Detective (Interactive Educational Web Game)

* **Tagline:** *Every dataset hides a story. Find the truth.*
* **Objective:** Teach beginners fundamental Data Science principles through hands-on experimentation, live parameter tuning, and real-time computation rather than passive multiple-choice quizzes.
* **Evaluation Rubric:** Target Full Marks (5.0 / 5.0) across Concept Coverage, Game Design & Learning Loop, Implementation, and Documentation & Playtesting.
* **The 5 Investigation Cases:**
  1. **Case 01 — The Suspicious Exam Results:** Sampling & Sampling Bias (population vs. convenience sample, selection bias, undercoverage across 600 student records).
  2. **Case 02 — The Ice Cream Mystery:** Correlation vs. Causation (Pearson $r$, $R^2$, OLS regression, ambient temperature confounding variable across 52 weeks).
  3. **Case 03 — The Perfect Prediction Trap:** Overfitting vs. Underfitting (Train/test split, matrix polynomial regression, L2 regularization, training vs. unseen holdout error).
  4. **Case 04 — The Model That Plays Favorites:** Bias-Variance Tradeoff (Bias² vs. Variance error decomposition across 8 resampled applicant cohorts).
  5. **Case 05 — The Hidden Groups:** Unsupervised Clustering (Lloyd's K-Means with K-Means++ initialization, centroid movement, inertia, and Z-score feature scaling across 180 customer profiles).
* **Tech Stack:** React 19, Vite 6, Pure CSS Design System (dark-mode detective aesthetic), Web Audio API (zero external sound files), Vitest (100% test pass rate).
* **Quick Start:**
  ```bash
  cd IDSE_Game
  npm install
  npm run dev      # Launch local dev server (http://localhost:5173)
  npm test         # Run math verification test suite
  npm run build    # Production build
  ```

---

## 👥 Course & Attribution

* **Course:** Introduction to Data Science (IDSE)
* **Authors & Contributors:**
  * **Akhil Kumar** ([@Akhil-Kumar-08](https://github.com/Akhil-Kumar-08))
  * **Veluru Vinisha** ([@Veluru-Vinisha](https://github.com/Veluru-Vinisha))
