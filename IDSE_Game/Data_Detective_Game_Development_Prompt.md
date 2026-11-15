# DATA DETECTIVE

## Implementation-Ready Game Development Prompt

> **Project type:** Interactive educational Data Science game\
> **Selected concept:** Data Detective -- Solve the Mystery\
> **Experience:** Balanced --- learning + fun + polished UI\
> **Primary requirement:** Learners must discover Data Science concepts
> by experimenting and playing, not by reading explanations or answering
> trivia questions alone.

------------------------------------------------------------------------

# 1. Your Role

Act as a senior full-stack developer, educational game designer, UI/UX
designer, and Data Science educator.

Design and build a complete, polished, browser-based educational game
called **Data Detective**. The player becomes a data detective who
investigates mysteries by exploring datasets, testing hypotheses,
finding patterns, and making evidence-based decisions.

The finished application must be genuinely playable, visually polished,
beginner-friendly, responsive, and reliable. Do not deliver only a
design mockup, static dashboard, concept description, or collection of
multiple-choice questions. Implement the complete working game.

Use the assessment rubric in this prompt as the acceptance criteria.
Prioritize learning through interaction and correct underlying
computation.

# 2. Assessment Rubric --- Must Meet Every Criterion

The game is assessed out of 5 marks. Build specifically to satisfy the
full-marks description for every row.

  ------------------------------------------------------------------------
  Criterion                                    Marks Full-marks
                                                     requirement
  --------------------- ---------------------------- ---------------------
  Concept coverage and                           1.5 Clearly teaches
  correctness                                        accurate Data Science
                                                     concepts, such as
                                                     overfitting,
                                                     bias-variance,
                                                     sampling, correlation
                                                     vs causation, and
                                                     clustering. Learning
                                                     objectives are
                                                     defined.

  Game design and                                1.5 Clear goal, rules,
  learning loop                                      feedback, and
                                                     progression. Player
                                                     decisions change the
                                                     outcome, so the
                                                     learner discovers the
                                                     concept by playing.

  Implementation                                   1 Runs without errors.
                                                     Real data or
                                                     computation is used
                                                     behind the game, not
                                                     hard-coded answers.
                                                     Interface is usable.

  Documentation and                                1 Includes a
  evidence of learning                               how-to-play guide,
                                                     learning objectives,
                                                     and playtest evidence
                                                     from a few peers,
                                                     including feedback or
                                                     outcomes.
  ------------------------------------------------------------------------

**Important interpretation:** A correct explanation shown after a quiz
answer is not enough. The player must be able to manipulate data, change
a decision or parameter, observe a different result, and infer what the
concept means.

# 3. Product Vision and Story

## Game title

**DATA DETECTIVE**

Tagline: **Every dataset hides a story. Find the truth.**

## Story

The player joins the Data Detective Agency as a new investigator. The
agency receives reports containing confusing, incomplete, biased, or
misleading data. Each report is a case that must be solved.

The player must inspect the evidence, explore the data, choose an
investigation strategy, run an analysis, and submit a conclusion. The
game responds to the player's actual actions. Poor decisions can lead to
misleading conclusions or an unsolved case; better investigation
improves the evidence and the final report.

The experience should feel like a friendly detective investigation, not
a classroom test.

## Target learner

A beginner who is learning introductory Data Science. Assume the learner
may not know technical terminology. Introduce concepts in plain
language, then gradually introduce the correct technical vocabulary.

## Main learning promise

By playing, learners should understand why data decisions matter, how
different analysis choices change results, and why conclusions must be
supported by evidence.

# 4. Required User Journey and Screen Structure

Build the application as a coherent sequence of screens. Keep navigation
obvious and avoid overwhelming the player.

## Screen 1 --- Landing page: "Let's Play & Learn!"

This is the first screen the player sees. It should be visually
memorable and uncluttered.

Include: - Large **DATA DETECTIVE** title. - Main heading: **LET'S PLAY
& LEARN!** - Short subtitle: "Investigate data. Discover patterns. Solve
the truth." - A friendly detective-themed illustration, animated
evidence board, or visual motif. - Primary button: **Start
Investigation**. - Secondary button: **How to Play**. - Small feature
highlights such as "Explore real data", "Solve 5 cases", and "Earn
detective badges". - A subtle animated entrance, but do not make the
page slow or distracting.

The primary button must take the player to the briefing / guidance
screen. The How to Play button must open the instructions.

## Screen 2 --- Detective briefing and guidance

Before the first case, explain: - The player's role as a data
detective. - The objective: investigate all cases and submit
evidence-based conclusions. - How to interact with charts, tables,
sliders, filters, and analysis tools. - What evidence, confidence, case
progress, and score mean. - That mistakes are part of learning and the
player can retry.

Use a short, friendly, illustrated step-by-step guide. Do not put a
large wall of text on the screen.

Provide a **Start First Case** button and an option to revisit the
guide.

## Screen 3 --- Agency case board

Show the cases as attractive investigation cards on a case board.

Each card should include: - Case number and title. - A short mystery
description. - The concept or concepts that will be discovered, without
giving away the answer. - Status: Locked, Available, In Progress, or
Solved. - A visual progress indicator.

Unlock cases in a sensible order. The first case should be available
immediately. Later cases should unlock after the previous case is
completed, while allowing the player to revisit solved cases.

## Screen 4 --- Case investigation workspace

This is the main gameplay screen. Use a consistent layout:

1.  **Top bar:** game logo, current case, progress, score, sound toggle,
    and pause / exit navigation.
2.  **Case brief:** short story and investigation objective.
3.  **Evidence area:** interactive dataset table and relevant
    visualizations.
4.  **Investigation tools:** filters, feature selection, sliders,
    grouping controls, or model settings as appropriate to the case.
5.  **Action area:** buttons to run analysis, compare results, collect
    evidence, and submit a conclusion.
6.  **Detective notebook:** records discovered evidence, observations,
    and concept notes.
7.  **Feedback area:** explains the effect of the player's action in
    plain language.

Use a responsive layout. On small screens, stack panels vertically and
keep primary actions easy to reach.

## Screen 5 --- Case result and learning debrief

After the player submits a conclusion: - Show whether the case was
solved, partially solved, or needs another investigation. - Explain
which evidence supports the result. - Show the consequences of the
player's choices. - Explain the Data Science concept that was
discovered. - Include a concise "What just happened?" explanation. -
Include a "Try changing this..." experiment so the learner can replay
the case and observe a different result. - Award points or a badge based
on investigation quality, not merely speed.

Do not reveal a correct answer before the player has had a meaningful
chance to explore.

## Screen 6 --- Final detective report

After all cases are completed, show: - Cases solved. - Concepts
explored. - Investigation score. - Badges earned. - Strong areas and
concepts that may need another attempt. - A short explanation of the
learner's progress. - A button to replay cases. - A button to view the
learning guide / glossary.

Do not claim the player has mastered a concept based only on clicking
through a case. Base progress on meaningful actions and demonstrated
understanding.

# 5. Core Game Loop

Every case must follow this learning loop:

1.  **Receive the mystery:** Present a short scenario and a clear
    investigation goal.
2.  **Inspect the evidence:** Let the player explore a dataset, summary,
    chart, or visual evidence.
3.  **Make a decision:** Let the player select a feature, filter,
    sample, threshold, model setting, or analysis method.
4.  **Run the investigation:** Perform actual computation using the
    current data and player-selected settings.
5.  **Observe the consequence:** Update the chart, metrics, data view,
    or case outcome based on the computation.
6.  **Reflect:** Ask the player to explain or identify what changed,
    using a short prompt or guided observation.
7.  **Submit a conclusion:** Let the player make a case decision
    supported by collected evidence.
8.  **Debrief and retry:** Explain the underlying concept and let the
    player experiment again.

The player's decisions must affect the results. Never simulate
interactivity by changing only a label while leaving the data and
computation unchanged.

# 6. The Five Required Investigation Cases

Create five complete cases. They must be connected by the detective
story but each should have its own distinct mechanic. Use understandable
datasets and realistic scenarios.

## CASE 01 --- The Suspicious Exam Results

### Concept: Sampling and Sampling Bias

**Story:** A college report claims that 95% of students are satisfied
with campus facilities. The agency suspects that the survey may not
represent the whole student population.

**Learning objectives:** - Understand population and sample. -
Understand why a sample is used. - Discover sampling bias. - Understand
that a larger sample is not automatically representative. - Compare a
biased sample with a representative sample.

**Gameplay mechanic:** - Provide a dataset of students with fields such
as year, department, residence type, and satisfaction score. - Let the
player choose how to collect a sample. - Offer controls for sample size
and selection method. - Include a random sampling mode and a biased /
convenience sampling mode, such as selecting only one department or only
students who voluntarily responded. - Display the selected sample and
compare it with the full population. - Recalculate the satisfaction
estimate every time the player changes the sample. - Show how repeated
samples can produce different estimates. - Let the player compare the
sample's department / year composition with the population composition.

**Discovery moment:** The player sees that a sample can be large but
still biased if it systematically excludes parts of the population.

**Case decision:** Decide whether the 95% satisfaction claim is
trustworthy and select the evidence that supports the decision.

**Debrief must explain:** Population, sample, random sampling,
convenience sampling, selection bias, representativeness, and why sample
size alone does not eliminate bias.

**Implementation requirement:** Use a reproducible random seed or a
controlled random sampling method so the player can repeat and compare
experiments. Do not hard-code the estimated satisfaction result.

## CASE 02 --- The Ice Cream Mystery

### Concept: Correlation vs Causation

**Story:** A town observes that ice cream sales and swimming incidents
increase during the same months. A report claims that buying ice cream
causes swimming incidents. The player must investigate whether the
conclusion is justified.

**Learning objectives:** - Understand correlation. - Understand
causation. - Interpret a scatter plot. - Identify a possible confounding
variable. - Avoid drawing causal conclusions from association alone.

**Gameplay mechanic:** - Provide a dataset with monthly or weekly values
for temperature, ice cream sales, and swimming incidents. - Let the
player select two variables to plot against each other. - Recompute the
scatter plot and correlation coefficient when variables change. - Let
the player reveal or inspect the temperature variable. - Allow the
player to compare the relationship before and after considering
temperature, or compare groups / time periods. - Show a simple visual
explanation of how a third variable may influence both observed
variables.

**Discovery moment:** The player observes that two variables can move
together without one necessarily causing the other. Temperature is a
plausible confounding variable in this scenario.

**Case decision:** Decide whether the evidence proves that ice cream
causes swimming incidents. Require the player to distinguish "associated
with" from "causes".

**Debrief must explain:** Positive and negative correlation, correlation
coefficient, confounding variable, causation, and why observational
correlation alone does not prove causation.

**Implementation requirement:** Calculate the correlation from the
actual selected columns. If the dataset is intentionally constructed for
this lesson, label it as simulated teaching data. Do not imply that
correlation analysis alone establishes causality.

## CASE 03 --- The Perfect Prediction Trap

### Concept: Overfitting and Underfitting

**Story:** A company has built a model to predict whether a customer
will renew a subscription. The model looks excellent during training but
performs poorly on new customers.

**Learning objectives:** - Understand training data and test data. -
Understand overfitting. - Understand underfitting. - Compare training
performance with unseen-data performance. - Understand why a model that
memorizes training examples may generalize poorly.

**Gameplay mechanic:** - Provide a small, understandable classification
or regression dataset. - Let the player choose model complexity, such as
low, medium, or high complexity. - Train a real, simple model using the
training split. - Evaluate it on separate test data. - Display training
and test performance side by side. - Visualize the model's fit and the
data points where practical. - Let the player change model complexity
and retrain. - Show how an overly simple model can miss patterns and an
overly complex model can fit noise.

**Discovery moment:** The player sees that improving training
performance does not always improve performance on unseen data.

**Case decision:** Select the model that generalizes best, using both
training and test performance rather than training accuracy alone.

**Debrief must explain:** Training set, test set, generalization,
overfitting, underfitting, model complexity, and why unseen data
matters.

**Implementation requirement:** Use a real algorithm and a genuine
train/test split. Do not simply assign fixed accuracy values to the
three model choices. Ensure the dataset and split make the lesson
understandable and reproducible.

## CASE 04 --- The Model That Plays Favorites

### Concept: Bias-Variance Tradeoff

**Story:** A loan approval model gives inconsistent results for some
applicants and systematically performs poorly for certain patterns in
the data. The agency must inspect the model.

**Learning objectives:** - Understand bias and variance in model
behavior. - Understand the bias-variance tradeoff at an introductory
level. - Recognize that a model can be too simple or too sensitive to
its training data. - Compare model behavior across repeated training
samples.

**Gameplay mechanic:** - Provide a small synthetic dataset with clearly
documented features and a target. - Let the player select model
complexity. - Train the model across multiple resampled training sets or
folds. - Display average training / validation error and variation in
validation results. - Let the player compare a simple model, a balanced
model, and a highly flexible model. - Visualize the stability of
predictions or errors across runs. - Explain that systematic error and
sensitivity to data variation are different problems.

**Discovery moment:** The player observes that a very simple model may
consistently miss the pattern, while a very flexible model may change
substantially across samples.

**Case decision:** Choose a model with a reasonable balance between
systematic error and sensitivity to sample variation.

**Debrief must explain:** Bias, variance, model complexity, stability,
and the tradeoff between underfitting and overfitting.

**Important accuracy requirement:** Explain bias and variance in the
statistical / machine-learning sense, not as social prejudice. If the
case also discusses fairness, clearly distinguish fairness-related bias
from statistical bias.

**Implementation requirement:** Estimate variation through repeated
splits, resampling, or cross-validation where feasible. Do not hard-code
a single fixed "bias score" or "variance score" and pretend it was
learned from data.

## CASE 05 --- The Hidden Groups

### Concept: Clustering

**Story:** A retail company has customer activity data but does not know
what kinds of customers it serves. The player must discover natural
groups without being given category labels.

**Learning objectives:** - Understand unsupervised learning. -
Understand clustering. - Understand that clustering groups similar
observations. - Understand how selected features and number of clusters
affect results. - Recognize that clusters are patterns, not
automatically meaningful real-world categories.

**Gameplay mechanic:** - Provide a dataset with customer features such
as visits per month, average spending, and purchase frequency. - Let the
player select which features to use. - Let the player choose the number
of clusters. - Run an actual clustering algorithm such as K-means. -
Display a scatter plot with cluster assignments. - Allow the player to
change the number of clusters or selected features and rerun the
algorithm. - Show cluster summaries such as average spending and average
visits. - If using a distance-based algorithm, scale features
appropriately and explain why scale matters. - Let the player assign
descriptive names to the discovered groups.

**Discovery moment:** The player sees that changing features or the
number of clusters can change the groupings, and that the algorithm
finds similarity patterns rather than pre-existing labels.

**Case decision:** Choose a useful grouping and explain what makes the
groups different.

**Debrief must explain:** Unsupervised learning, clustering, K-means,
centroids, distance, feature selection, feature scaling, and limitations
of clustering.

**Implementation requirement:** Calculate cluster assignments from the
actual selected features and settings. Do not use fixed cluster labels
disguised as algorithm output. Handle random initialization
reproducibly.

# 7. Data and Computation Requirements

Real computation is essential to the implementation mark.

## Dataset rules

-   Use real, publicly available data where it is appropriate and
    practical, or clearly labeled synthetic teaching datasets.
-   If using public data, document its source, license / usage terms
    where known, and any preprocessing.
-   If using synthetic data, explain how it was generated and why it is
    suitable for the concept.
-   Keep datasets small enough for smooth browser performance.
-   Provide meaningful column names and beginner-friendly descriptions.
-   Include missing-value or outlier examples only when they serve a
    learning objective.
-   Do not claim synthetic data is real-world research data.
-   Include a small preview table and a clear description of every
    dataset.

## Computation rules

Implement actual calculations for the relevant mechanics, including: -
Sampling from a population and recalculating sample statistics. -
Correlation from selected numeric columns. - Train/test splitting and
model evaluation. - Repeated resampling or cross-validation for model
stability. - Clustering from selected features and player-selected
parameters.

The results must update when the player changes the relevant input.

Use appropriate, well-tested libraries if the chosen stack needs them.
If implementing an algorithm manually, keep it mathematically correct
and explain its limitations.

## Reproducibility and correctness

-   Use deterministic seeds where helpful so a player can replay an
    experiment.
-   Avoid random results that make the same action appear inconsistent
    without explanation.
-   Validate user inputs and handle empty datasets, invalid selections,
    and impossible parameter values.
-   Never display NaN, Infinity, broken charts, or unexplained error
    states.
-   Use sensible rounding and label metrics clearly.
-   Do not invent model performance or dataset statistics.
-   Add basic unit tests for important calculations.

# 8. Learning Design and Feedback

The game should teach through discovery, then reinforce the correct
concept.

For each case, provide:

1.  **Before the experiment:** A short question that encourages a
    prediction, not a trivia question.
2.  **During the experiment:** Immediate visual feedback when the player
    changes a setting.
3.  **After the experiment:** A plain-language explanation of what
    changed and why.
4.  **Reflection:** One short prompt asking the player to interpret the
    observed result.
5.  **Transfer challenge:** A small new situation where the player
    applies the same concept.
6.  **Retry:** Allow the player to change the decision and compare
    outcomes.

Feedback should be supportive and specific: - Say what the player's
action changed. - Point to the evidence in the table, chart, or
metric. - Explain the concept in simple words. - Avoid shaming language
such as "Wrong! You failed." - Do not reveal the solution before the
learner has explored the evidence.

Use progressive disclosure: introduce a term only when it becomes
relevant, then offer a more detailed explanation in the notebook or
glossary.

# 9. Score, Progression, and Rewards

Use a simple scoring system that rewards careful investigation and
learning.

Suggested scoring: - Exploring relevant evidence: points. - Running a
meaningful experiment: points. - Comparing outcomes: points. -
Supporting a conclusion with evidence: points. - Completing a reflection
/ transfer challenge: points.

Do not award full points merely for clicking buttons or guessing.

Include: - Case completion progress. - Overall investigation progress. -
A score or evidence-quality meter. - Badges such as "Sampling
Specialist", "Correlation Detective", "Model Inspector", and "Pattern
Finder". - A final achievement summary.

Do not make the game overly competitive. The learning experience matters
more than the score.

# 10. UI / UX and Visual Design Direction

## Overall visual identity

Create a polished, modern detective-agency interface. Balance a warm
mystery atmosphere with the clarity of a professional learning
dashboard.

Suggested visual direction: - Deep navy / midnight blue for the agency
shell. - Teal or cyan for evidence and active analysis. - Warm amber for
clues and highlights. - Soft off-white or light neutral surfaces for
data tables and reading areas. - Clear contrast for text and controls. -
Consistent spacing, rounded cards, restrained shadows, and subtle
borders.

Use a consistent design system. Avoid excessive gradients, neon effects,
clutter, or childish visuals.

## Typography

-   Use a highly readable sans-serif font.
-   Establish clear hierarchy for page titles, case titles, labels, body
    text, and helper text.
-   Keep body text comfortably readable.
-   Use tabular numerals for scores and metrics where appropriate.

## Interaction and motion

-   Smooth transitions between screens.
-   Subtle hover and pressed states.
-   Clear loading states when calculations run.
-   Animated chart transitions only when they help explain a change.
-   Small success animations when a case is solved.
-   Respect reduced-motion preferences.
-   Avoid unnecessary motion that distracts from data exploration.

## Usability

-   Every button must have a clear label and a working action.
-   Provide tooltips or short helper text for unfamiliar controls.
-   Use consistent navigation and visible back / next actions.
-   Keep important actions visually prominent.
-   Make charts understandable with titles, axis labels, legends, and
    helpful tooltips.
-   Use accessible color contrast; do not communicate cluster or status
    meaning by color alone.
-   Provide keyboard-accessible controls and visible focus indicators.
-   Ensure the interface works on desktop, tablet, and mobile.

# 11. Technical Implementation Requirements

Build a complete, runnable web application.

## Preferred implementation approach

Use: - **React** for component-based UI. - **Vite** for the development
server and build. - **CSS** or CSS modules for styling. - A reliable
charting library for interactive charts. - A suitable JavaScript data /
machine-learning library for the required calculations, or correct
custom implementations for the small teaching datasets.

If a different stack is materially more reliable for the complete
implementation, explain the reason and keep the project easy to run.

## Architecture

Organize the application into reusable components, for example: -
`App` - `LandingPage` - `HowToPlay` - `CaseBoard` - `CaseWorkspace` -
`DatasetTable` - `EvidenceChart` - `InvestigationControls` -
`DetectiveNotebook` - `FeedbackPanel` - `CaseDebrief` - `FinalReport` -
`ProgressTracker`

Keep data, calculation logic, game state, and presentation code
separate.

## State and persistence

-   Maintain the current case, player decisions, score, progress, and
    earned badges in application state.
-   Save progress locally if practical, using browser local storage.
-   Provide a reset / start-over option with confirmation.
-   Handle refreshes without corrupting progress.
-   Do not require account creation or a backend unless there is a
    compelling reason.

## Reliability

-   The project must install, start, and build without errors.
-   Avoid dead buttons, placeholder screens, fake charts, and unfinished
    interactions.
-   Handle loading, empty, success, and error states.
-   Test all five cases from start to finish.
-   Ensure charts update when controls change.
-   Ensure the final report reflects the player's actual progress and
    decisions.

# 12. Documentation Required in the Project

Create a clear `README.md` that includes:

1.  Project title and short description.
2.  Game purpose and target learner.
3.  Learning objectives.
4.  Concepts covered and the case that teaches each concept.
5.  How to install and run the project.
6.  How to play.
7.  Controls and gameplay rules.
8.  Data sources or synthetic-data generation notes.
9.  Explanation of the main calculations / algorithms.
10. Project folder structure.
11. Testing instructions.
12. Known limitations.

Also include a concise in-game **How to Play** guide. The README does
not replace the in-game guide.

# 13. Peer Playtesting and Evidence of Learning

The rubric explicitly asks for playtest evidence from a few peers,
including feedback or outcomes.

Build a simple **Playtest Notes** template into the documentation. Do
not fabricate peer feedback or claim that testing occurred if it did
not.

The template should allow the project team to record at least three peer
playtests:

  -----------------------------------------------------------------------
  Field                               What to record
  ----------------------------------- -----------------------------------
  Tester code / anonymous label       Avoid unnecessary personal
                                      information

  Cases attempted                     Which cases the tester played

  Completion                          Whether the tester completed the
                                      case

  Concept understanding before /      A short observation or response
  after                               

  Confusing interaction               Any unclear instruction, control,
                                      or chart

  Feedback                            What the tester liked or found
                                      difficult

  Change made                         What was improved based on the
                                      feedback
  -----------------------------------------------------------------------

Include a few short, concept-focused prompts that can be used before and
after play, such as: - Can a large sample still be biased? Explain. -
Does correlation prove causation? Why or why not? - Why can a model
perform well on training data but poorly on unseen data? - What is the
difference between bias and variance in model behavior? - What does a
clustering algorithm actually discover?

The project team must fill this template with genuine results after real
peers try the game. Clearly label any example entries as examples, not
actual evidence.

# 14. Acceptance Tests --- Definition of Done

Before declaring the project complete, verify every item below.

## Landing and navigation

-   [ ] The first page clearly says "LET'S PLAY & LEARN!"
-   [ ] Start Investigation opens the guidance / briefing.
-   [ ] How to Play opens usable instructions.
-   [ ] The player can navigate to the case board.
-   [ ] The player can revisit completed cases.

## Learning and gameplay

-   [ ] All five cases are playable.
-   [ ] Every case has a clear objective and understandable story.
-   [ ] Every case includes genuine player decisions.
-   [ ] Player decisions change the data, analysis, visualization, or
    result.
-   [ ] Every case includes a discovery moment.
-   [ ] Every case includes a debrief that explains the concept
    accurately.
-   [ ] Every case offers a meaningful retry or experiment.
-   [ ] The experience is not just a quiz.

## Data and algorithms

-   [ ] Sampling calculations use the selected sample.
-   [ ] Correlation is calculated from the selected variables.
-   [ ] Model performance is evaluated on unseen test data.
-   [ ] Bias / variance behavior is explored through repeated samples or
    validation.
-   [ ] Clustering is computed from selected features and settings.
-   [ ] Dataset sources or synthetic-data methods are documented.
-   [ ] Results are not simply hard-coded to match expected answers.

## Implementation and usability

-   [ ] The application starts and builds without errors.
-   [ ] No buttons are decorative or non-functional.
-   [ ] No charts are static placeholders.
-   [ ] Invalid inputs are handled gracefully.
-   [ ] Layout is responsive.
-   [ ] Text is readable and controls are understandable.
-   [ ] Keyboard focus and color contrast are considered.
-   [ ] Progress and final report reflect actual gameplay.

## Documentation and evaluation

-   [ ] README includes setup and run instructions.
-   [ ] Learning objectives are stated.
-   [ ] How-to-play instructions are available in-game.
-   [ ] Algorithms and datasets are documented.
-   [ ] A peer playtest template is included.
-   [ ] Actual peer evidence is collected before claiming playtesting is
    complete.

# 15. Development Workflow

Work in this order. Do not skip directly to decorative styling.

1.  Define the five datasets and validate their intended teaching
    behavior.
2.  Implement and test the calculation functions.
3.  Implement the case mechanics and state transitions.
4.  Build the landing page, guidance, case board, and investigation
    workspace.
5.  Connect controls to real calculations and visualizations.
6.  Implement feedback, debriefs, progression, scoring, and final
    report.
7.  Add responsive styling, animation, and accessibility improvements.
8.  Write the README and playtest template.
9.  Run the complete application and test every case.
10. Fix all errors and verify the acceptance checklist.

If you have access to a coding environment, create the actual project
files and run the application. Do not stop after describing what should
be built.

# 16. Final Instructions to the Developer

The most important requirement is that **the player learns Data Science
by doing Data Science**.

Do not: - Turn the game into a quiz website. - Use static charts that
never respond to player actions. - Hard-code the correct answer or
pretend a calculation occurred. - Explain all concepts before the player
has a chance to discover them. - Overload beginners with technical
jargon. - Add decorative features at the expense of working gameplay. -
Claim peer testing or learning outcomes that have not actually been
observed.

Do: - Make the first screen welcoming and exciting. - Give clear
guidance before gameplay. - Let players manipulate data and test
ideas. - Make consequences visible and understandable. - Explain the
science behind each discovery. - Keep the game smooth, accessible,
responsive, and easy to use. - Make every case feel like a real
investigation. - Deliver a complete, runnable project with
documentation.

**Final quality target:** A beginner should be able to open Data
Detective, understand what to do without outside help, enjoy
investigating all five cases, and explain the Data Science concepts more
clearly because they personally observed those concepts at work.
