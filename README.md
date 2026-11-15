# The Silent Breakdown
## Machine Failure Prediction Using Data Science

**Introduction to Data Science (IDSE) — Academic Project**

## 1. Project Overview

Unexpected machine failures can interrupt manufacturing, cause production delays, and increase maintenance costs. Monitoring operating conditions can help identify patterns associated with failures and support more informed maintenance decisions.

In **The Silent Breakdown**, we investigate whether machine operating measurements can be used to classify a machine observation as **normal** or **failed**. The project follows a complete introductory data science workflow: understanding the dataset, exploring patterns, testing statistical relationships, engineering features, training machine learning models, evaluating errors, and interpreting the results.

Our main goal is not simply to obtain high accuracy. Because machine failures are rare, we focus on how many failures a model actually detects and how many false alarms it produces.

## 2. Problem Statement and Objectives

**Problem statement:** Given measurements recorded during machine operation, predict whether the observation indicates a machine failure.

The objectives of this project are to:

- Explore the distribution of operating conditions and the frequency of machine failures.
- Investigate relationships among measurements through visualization and correlation analysis.
- Test whether selected measurements differ between failed and non-failed observations.
- Create useful features from existing machine measurements.
- Apply Principal Component Analysis (PCA) to understand variation in the numerical data.
- Compare simple and more advanced classification models using appropriate metrics.
- Study missed failures and false alarms rather than relying on accuracy alone.
- Adjust the classification threshold using training data and evaluate the result on a separate test set.
- Explain the limitations of the findings.

## 3. Dataset

We used the **AI4I 2020 Predictive Maintenance Dataset** from the UCI Machine Learning Repository.

- **Source:** [UCI AI4I 2020 Predictive Maintenance Dataset](https://archive.ics.uci.edu/dataset/601/ai4i+2020+predictive+maintenance+dataset)
- **Total observations:** 10,000
- **Normal observations:** 9,661 (96.61%)
- **Failure observations:** 339 (3.39%)
- **Prediction target:** `Machine failure` (`0` = no failure, `1` = failure)
- **Dataset type:** Synthetic/simulated predictive-maintenance data

### Input features

| Feature | Description |
|---|---|
| Air temperature | Ambient air temperature |
| Process temperature | Temperature associated with the operating process |
| Rotational speed | Machine rotational speed |
| Torque | Rotational force/load measurement |
| Tool wear | Accumulated tool wear measurement |
| Type | Product-quality category (L, M, or H) |

The notebook also constructs additional features from these measurements. Failure-mode indicator columns are **not** included as model predictors, because they could reveal information about the target.

### Why class imbalance matters

Only **3.39%** of the observations are failures. A model that predicts “no failure” for every observation would appear highly accurate, but it would fail to detect any actual breakdowns. For this reason, the project emphasizes **precision, recall, F1-score, confusion matrices, and precision–recall performance**.

## 4. Project Methodology

### Step 1 — Data loading and preparation

The dataset is retrieved from UCI using Python. We inspect the data structure, missing values, duplicate records, feature types, and target distribution. The data is split into **8,000 training observations** and **2,000 test observations**, with stratification to preserve the proportion of failures.

### Step 2 — Exploratory Data Analysis (EDA)

We use summary statistics and plots to compare normal and failed observations. The analysis covers temperature measurements, rotational speed, torque, tool wear, and relationships between mechanical variables.

EDA helps us ask questions such as: Do failed observations tend to have higher torque? Is tool wear different between the two groups? Do speed and torque move together?

### Step 3 — Correlation analysis

We calculate and visualize correlations among numerical features and with the target. This identifies **linear associations** that may be worth investigating further. Correlation does not establish that a variable causes machine failure.

### Step 4 — Feature engineering

We create three additional variables:

| Engineered feature | Calculation | Purpose |
|---|---|---|
| Temperature difference | `Process temperature - Air temperature` | Represents the temperature gap during operation |
| Mechanical power | `Torque × Rotational speed × (2π / 60)` | Combines torque and rotational speed into a power-related measurement |
| Wear-load interaction | `Tool wear × Torque` | Represents the combined effect of wear and mechanical load |

These features are derived from existing measurements and are used to provide additional information to the classification models.

### Step 5 — Statistical hypothesis testing

We compare selected measurements for failed and non-failed observations using **Welch's independent-samples t-test**. The analysis includes torque, tool wear, and air temperature, with multiple-testing correction. The goal is to evaluate whether the observed group differences are statistically supported, not to prove causation.

### Step 6 — Principal Component Analysis (PCA)

PCA is used as an **exploratory dimensionality-reduction technique**. It summarizes variation across standardized numerical features and helps visualize the dataset from a different perspective. The first two principal components explain approximately **65.91%** of the variation, while the first three explain approximately **87.60%**.

PCA is included for exploration and interpretation; it is **not** used as the input representation for the final Random Forest model.

### Step 7 — Model training and comparison

We compare three approaches:

1. **Dummy Classifier:** A baseline showing why accuracy alone is insufficient for rare failures.
2. **Logistic Regression:** A simpler classification model used for comparison.
3. **Random Forest:** A tree-based ensemble model capable of learning more complex relationships.

We use **five-fold stratified cross-validation** on the training data for model comparison. The final Random Forest configuration uses **200 trees**, balanced class weights, and a minimum leaf size of **2**.

### Step 8 — Feature importance and error analysis

We examine Random Forest feature importance to understand which inputs the fitted model uses most. Rotational speed, torque, mechanical power, tool wear, and wear-load interaction are among the most influential features in this model.

We also inspect the **false negatives** (failures the model misses) and **false positives** (normal observations flagged as failures). Feature importance describes model behavior and should not be interpreted as proof of causal effects.

### Step 9 — Classification threshold optimization

The default classification threshold is **0.50**. We investigate whether a lower threshold can detect more failures without producing too many false alarms.

Using out-of-fold predictions from **five-fold stratified cross-validation on the training data**, we select a threshold of **0.42**. We then evaluate that selected threshold on the held-out test set.

### Step 10 — Reliability checks and conclusions

The notebook includes checks of feature consistency, engineered-feature calculations, training/test separation, and target alignment. The final conclusions discuss model performance, trade-offs, and limitations.

## 5. Results

### Final test-set performance

The test set contains **2,000 observations**, including **68 actual failures**. Random Forest was selected as the final classifier.

| Metric | Random Forest at 0.50 | Final Random Forest at 0.42 |
|---|---:|---:|
| Accuracy | 99.15% | **99.20%** |
| Precision | 94.74% | **91.94%** |
| Recall | 79.41% | **83.82%** |
| F1-score | 86.40% | **87.69%** |
| True positives (failures detected) | 54 | **57** |
| False negatives (failures missed) | 14 | **11** |
| False positives (false alarms) | 3 | **5** |
| True negatives | 1,929 | **1,927** |

**Interpretation:** Lowering the threshold from 0.50 to 0.42 helped the model detect **three additional failures**, while producing **two additional false alarms**. Recall and F1-score improved, although precision decreased slightly. This illustrates the practical trade-off between detecting failures and avoiding unnecessary alerts.

These results describe performance on the **simulated held-out test data**. They do not establish how well the model would perform on real factory equipment.

## 6. Tools and Technologies

- **Google Colab / Jupyter Notebook** — Running and documenting the analysis
- **Python** — Main programming language
- **pandas and NumPy** — Data handling and numerical operations
- **Matplotlib and Seaborn** — Graphs and statistical visualizations
- **SciPy and statsmodels** — Statistical analysis
- **scikit-learn** — Preprocessing, PCA, classification, cross-validation, and evaluation
- **ucimlrepo** — Retrieving the UCI dataset
- **GitHub** — Sharing the project files

## 7. Repository Contents

```text
The-Silent-Breakdown/
├── README.md
├── The_Silent_Breakdown.ipynb
├── The_Silent_Breakdown_Report.pdf
└── requirements.txt
```

| File | Description |
|---|---|
| `The_Silent_Breakdown.ipynb` | Complete notebook containing code, graphs, statistical tests, model training, evaluation, and interpretation |
| `The_Silent_Breakdown_Report.pdf` | Detailed academic report describing the methodology, results, and conclusions |
| `README.md` | Overview of the project and instructions for readers |
| `requirements.txt` | Python packages needed to run the notebook |

## 8. How to Run the Project

### Option A — Google Colab (recommended)

1. Download or open `The_Silent_Breakdown.ipynb` from this repository.
2. Open it in [Google Colab](https://colab.research.google.com/).
3. Connect to a Python runtime.
4. Select **Runtime → Run all** to execute the notebook from beginning to end.
5. Review the generated visualizations, model comparison tables, and final evaluation.

The notebook retrieves the dataset from UCI, so an **internet connection** is needed. Colab may prompt you to install an additional package when running the notebook.

### Option B — Local Jupyter environment

Clone or download the repository, install the required Python packages, and open the notebook:

```bash
pip install -r requirements.txt
jupyter notebook The_Silent_Breakdown.ipynb
```

If Jupyter is not installed, install it separately or run the notebook in a compatible editor. The dependency list does not pin exact package versions, so small differences in results or plots are possible across environments.

## 9. Key Learnings

This project helped us understand that:

- A high accuracy score can be misleading when the positive class is rare.
- Exploratory graphs and correlation analysis are useful for finding patterns, but do not establish causes.
- Statistical testing can help assess differences between failed and normal observations.
- Feature engineering can represent relationships that are not captured by individual measurements alone.
- PCA is useful for exploring high-dimensional data, even when the final classifier does not use PCA components.
- Model evaluation should consider both missed failures and false alarms.
- The classification threshold is a decision choice that can change precision and recall.
- Keeping the test set separate from model selection makes the final evaluation more meaningful.

## 10. Limitations and Future Scope

The AI4I dataset is **synthetic**, and the model is trained on recorded observations rather than a real-time industrial sensor stream. It predicts whether an observation is associated with a failure; it **does not predict the exact time until a future breakdown**.

Potential future improvements include testing on real industrial data, evaluating performance over time, examining model calibration, estimating the relative costs of missed failures and false alarms, and building a simple monitoring dashboard. These are future possibilities, **not features implemented in this project**.

## 11. Dataset Reference

Matzka, S. (2020). *AI4I 2020 Predictive Maintenance Dataset*. UCI Machine Learning Repository. https://doi.org/10.24432/C5HS5C

---

**Project:** The Silent Breakdown — Machine Failure Prediction Using Data Science  
**Course:** Introduction to Data Science (IDSE)
