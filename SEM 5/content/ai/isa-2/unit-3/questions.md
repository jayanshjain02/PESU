# AI Unit 3 - Section-Wise MCQs

**28 questions: 7 sections × 4 questions. Each section has 1 Easy and 3 Very tough questions.**  
Based on *Ai Unit 3.pdf* and the checked explanations in `notes.md`. The final two sections are EL. The answer key and explanations are at the bottom.

**Instructions:** Select exactly one option, A-D. Minimum thresholds include equality. Use exact values for decisions, then round displayed answers. K-Means uses ordinary Euclidean distance and coordinate-wise arithmetic means unless stated otherwise. For PCA exercises with a supplied formula, apply that formula to the stated inputs rather than silently fitting a different model. Different transaction tables are separate datasets.

## 1. Unsupervised Learning

### Q1 - Easy

Which characteristic best identifies unsupervised learning?

- **A.** Every training record has a correct target label supplied to the algorithm.
- **B.** The dataset contains no measured features.
- **C.** The algorithm discovers structure without predefined target outputs for the records.
- **D.** The algorithm requires no human decisions about features or parameters.

### Q2 - Very tough

Consider these four operations:

1. Train a model using customer features and known Premium/Budget target labels.
2. Cluster customers without target labels, then have an analyst name the resulting groups.
3. Fit PCA using only image pixels, then pass its output to a separate classifier trained with face labels.
4. Mine shopping baskets for rules of the form X → Y without predefined class labels.

Which operations contain an unsupervised step as described?

- **A.** 2, 3 and 4; the PCA step in 3 is unsupervised even though its downstream classifier is supervised.
- **B.** 1 and 2 only; assigning names after clustering makes 2 supervised as well.
- **C.** 2 only; a rule consequent always acts as a supervised class label.
- **D.** All four; any model that uses customer features is unsupervised.

### Q3 - Very tough

A clustering model uses Income in rupees and a Spending Score from 0 to 100. Converting Income to thousands of rupees changes the clustering although the people and underlying information are unchanged. Evaluate:

1. Distance-based similarity can change when feature units change.
2. Because there are no target labels, the quality of the clusters cannot be assessed in any way.
3. Appropriate scaling and domain interpretation are needed before treating the groups as meaningful.
4. A customer far from other customers must be a confirmed fraud case.

Which statements are valid?

- **A.** 1, 2, 3 and 4.
- **B.** 2 and 4 only.
- **C.** 1, 2 and 3 only.
- **D.** 1 and 3 only.

### Q4 - Very tough

A dataset contains **1,000 customers and 10 features**, with shopping-basket records also available. Three independent tasks are proposed: create three customer groups, produce a two-feature representation, and find products frequently bought together from the baskets. Which output description is internally consistent?

- **A.** K-Means reduces the dataset to three customer observations; PCA produces two observations with 1,000 features; Apriori predicts predefined customer labels.
- **B.** K-Means assigns the 1,000 customers to three groups with 10-coordinate centroids; PCA produces a 1,000 × 2 representation; Apriori produces item relationships. Human interpretation is still needed.
- **C.** K-Means must receive the three group names as target labels; PCA selects exactly two unchanged original columns; Apriori always produces exactly two rules.
- **D.** All three tasks are classification tasks because their outputs can be given human-readable names.

## 2. K-Means Clustering

### Q5 - Easy

What is the updated centroid of a K-Means cluster?

- **A.** The coordinate-wise arithmetic mean of its assigned observations.
- **B.** The member with the highest numerical value in any feature.
- **C.** A new random member selected after every distance calculation.
- **D.** The median distance between all pairs of observations.

### Q6 - Very tough

For the marks dataset `{92,89,85,58,55,52,18,22,25}`, K = 3 starts with centers 92, 55 and 22. After convergence, the groups are `{92,89,85}`, `{58,55,52}` and `{18,22,25}`. A new mark 60 is assigned using the fixed final centers. Which full statement is correct?

- **A.** The final centers are still 92, 55 and 22, because centroids must be existing student marks.
- **B.** Mark 60 joins the high group because the final high center is closest; numerical cluster IDs determine the ranking.
- **C.** Mark 60 joins the middle group and automatically changes its center to 56.25 even when only a fixed-center assignment is requested.
- **D.** The centers are 88.67, 55 and 21.67; 60 joins the middle group at distance 5. Its center stays 55 during fixed-model assignment, but would become 56.25 if that group's mean were recomputed including 60.

### Q7 - Very tough

The customer dataset is `(20,25)`, `(22,30)`, `(25,28)`, `(60,65)`, `(62,68)`, `(65,70)`. Initial centers are A = `(20,25)` and B = `(60,65)`. After one assignment step, the first three customers join A and the last three join B. Which set of results is correct?

- **A.** New A = `(22,30)`, new B = `(62,68)`; the centroid must be one of the assigned customers.
- **B.** New A = `(67/3,83/3)`, new B = `(187/3,203/3)`; C3's initial distance to B is `sqrt(2594) ≈ 50.93`; unchanged memberships in the next iteration establish stability of this run.
- **C.** New A = `(67/6,83/6)`, new B = `(187/6,203/6)`; each cluster sum is divided by all six customers.
- **D.** New A = `(22.33,27.67)`, new B = `(62.33,67.67)`; once stable, these centers prove the unique globally optimal clustering for every initialization and feature scaling.

### Q8 - Very tough

For the same two final centers, A = `(67/3,83/3)` and B = `(187/3,203/3)`, a new point is **P = (42,48)**. Evaluate:

1. P is equally distant from A and B.
2. A tie-breaking rule is needed to assign P uniquely.
3. Merely permuting the names A and B changes the underlying clustering quality.
4. Changing feature scales can change nearest-centroid assignments, and outliers can affect the updated means.

Which statements are correct?

- **A.** 1 and 3 only.
- **B.** 2 and 3 only.
- **C.** 1, 2 and 4 only.
- **D.** 1, 2, 3 and 4.

## 3. Dimensionality Reduction and PCA

### Q9 - Easy

What does the first principal component seek to capture?

- **A.** The direction with the smallest possible variance.
- **B.** The original feature with the longest name.
- **C.** The direction guaranteed to predict every class label correctly.
- **D.** The direction of maximum variance in the prepared data.

### Q10 - Very tough

A collection of 100 × 100 grayscale images is represented by 10,000 pixel features per image. A learned PCA representation retains 500 components. Which conclusion is justified?

- **A.** PCA has selected 500 unchanged original pixels and guarantees that 95% of the image information was removed.
- **B.** Feature count fell by 95%; the 500 components are weighted features, and the retained variance/reconstruction quality cannot be inferred from the feature-count ratio alone.
- **C.** Only 500 of the original images remain; the number of features per remaining image is unchanged.
- **D.** Retaining 5% of the feature dimensions guarantees exactly 5% of the variance is retained and guarantees improved recognition accuracy.

### Q11 - Very tough

Which set of statements about PCA and the techniques listed with dimensionality reduction is fully correct?

- **A.** PC2 is parallel to PC1, uncorrelated always means independent, and LDA never uses labels.
- **B.** PCA standardization and centering are identical operations; a high-variance direction must always contain the best class-discriminating information.
- **C.** PC2 is orthogonal to PC1; uncorrelated does not generally imply independent; centering does not equal unit scaling; LDA is normally supervised even though it is a dimensionality-reduction technique.
- **D.** PCA is feature selection, so its components must be original columns; t-SNE, UMAP and autoencoders are alternative names for the same PCA algorithm.

### Q12 - Very tough

The slide supplies points `(2,3)`, `(3,4)`, `(5,7)`, `(6,8)` and the formula `z = (x+y)/sqrt(2)`. A student instead subtracts the dataset means `(4,5.5)` before applying the same direction. Which comparison is correct?

- **A.** The supplied raw formula gives approximately `[3.54,4.95,8.49,9.90]`; centering subtracts the common offset `9.5/sqrt(2)` from every score, preserving pairwise differences but changing the requested raw answers. Neither procedure alone derives a new PCA direction.
- **B.** Both procedures give the same numbers because subtracting feature means never changes projections.
- **C.** The raw formula reduces four observations to one observation, whereas the centered formula retains all four.
- **D.** Centering changes only the first score, and equal weights are the exact fitted PCA weights for every two-feature dataset.

## 4. Association Rule Mining

### Q13 - Easy

What does confidence of X → Y measure?

- **A.** The fraction of all transactions containing either X or Y.
- **B.** The fraction of X-containing transactions that also contain Y.
- **C.** The ratio of the total number of different items to the number of transactions.
- **D.** The probability that purchasing X causally forces a purchase of Y.

### Q14 - Very tough

Use this **introductory association** table:

| Transaction | Items |
|---|---|
| T1 | Milk, Bread |
| T2 | Milk, Bread, Butter |
| T3 | Bread, Butter |
| T4 | Milk, Bread, Butter |
| T5 | Milk, Butter |

What are **support, confidence and lift**, respectively, for Milk → Bread?

- **A.** 40%, 66.67%, 0.8333.
- **B.** 60%, 80%, 1.0000.
- **C.** 60%, 75%, 0.9375.
- **D.** 75%, 60%, 0.7500.

### Q15 - Very tough

In 100 transactions, X appears in 20, Y appears in 80, and both appear together in 18. Which complete interpretation is correct?

- **A.** X → Y has support 18%, confidence 90% and lift 1.125; Y → X has confidence 22.5% and the same lift. The observed positive association does not establish causation.
- **B.** X → Y has confidence 22.5% and Y → X has confidence 90%; reversing a rule swaps its support from 20% to 80%.
- **C.** X → Y has lift 90/0.80 = 112.5, proving that X causes Y in 90% of future transactions.
- **D.** The rules must have equal confidence because the count of transactions containing both is the same in either direction.

### Q16 - Very tough

There are 50 transactions. A appears in 5, B in 40 and both together in 4. The required minimum support is **10%** and minimum confidence is **70%**. Which decision about A → B is correct?

- **A.** Accept: confidence is 80%, and any rule meeting confidence automatically meets support.
- **B.** Accept: the rule has support 80%, confidence 8% and lift greater than 1.
- **C.** Reject because lift is below 1: B occurs in only 80% of A transactions, although its overall frequency is also 80%.
- **D.** Reject under the support filter: support is 8%, confidence is 80% and lift is 1. The confidence meets its threshold but gives no improvement over B's baseline rate.

## 5. Apriori Algorithm

### Q17 - Easy

Which statement expresses the Apriori pruning principle?

- **A.** If an itemset is infrequent, every superset containing it is also infrequent.
- **B.** If two individual items are frequent, their pair is necessarily frequent.
- **C.** If a pair is frequent, every triple containing it is frequent.
- **D.** If a rule has high confidence, all of its supersets must also have high confidence.

### Q18 - Very tough

Use the **Apriori supermarket** dataset:

| Transaction | Items |
|---|---|
| T1 | Milk, Bread, Butter |
| T2 | Bread, Butter, Jam |
| T3 | Milk, Bread |
| T4 | Milk, Butter |
| T5 | Bread, Butter |

For this question, minimum support is **40%** and minimum confidence is **60%**. Which answer gives all accepted rule directions from the frequent pairs and correctly describes the triple?

- **A.** Only Bread → Butter and Butter → Bread qualify; 40% support pairs fail because equality is excluded. The triple is frequent because all three individual items are frequent.
- **B.** All six pair directions qualify because every pair is frequent; the triple is also frequent because all its pairs are frequent.
- **C.** Milk → Bread, Milk → Butter, Bread → Butter and Butter → Bread qualify. The reverse rules to Milk fail confidence; the triple has support 20% and is infrequent.
- **D.** Only Bread → Milk and Butter → Milk qualify, each with 66.67% confidence; the triple has support 40%.

### Q19 - Very tough

An Apriori run has **7 transactions** and minimum support **35%**. Counts are `n({A,B}) = 3`, `n({A,C}) = 3`, and `n({B,C}) = 2`. The triple's count has not been scanned. Which conclusion is sound?

- **A.** The minimum count is 2 after rounding 2.45 down, so all three pairs are frequent and the triple must be frequent.
- **B.** The minimum count is 3, but the triple must still be counted because an infrequent subset says nothing about its supersets.
- **C.** The minimum count is 3, so `{A,B,C}` has count exactly 3 because it combines two frequent pairs.
- **D.** The minimum count is 3; `{B,C}` is infrequent, so `{A,B,C}` can be pruned without scanning its count. Its count cannot exceed 2.

### Q20 - Very tough

In the supermarket example, Bread and Butter each occur in 4 of 5 transactions, and their pair occurs in 3. A report calls Bread → Butter the “uniquely best positive recommendation” because confidence is 75%. Which correction is most accurate?

- **A.** Its lift is 0.75 × 0.80 = 0.60; confidence and lift must always be multiplied.
- **B.** Its support is 60%, confidence 75% and lift 0.9375; the reverse direction ties on these metrics. It has relatively high support/confidence among the listed rules but does not improve on Butter's 80% baseline frequency.
- **C.** Its confidence is 80% because Butter's support is 80%; reverse confidence must be 20%.
- **D.** Its high confidence proves that Bread causes Butter purchases, so thresholds and domain usefulness no longer matter.

## 6. EL - PCA Customer Projection

### Q21 - Easy

The PCA EL converts eight customer records with three features each into one supplied PC1 score per customer. What is the reduced data shape?

- **A.** 1 customer × 8 features.
- **B.** 3 customers × 1 feature.
- **C.** 8 customers × 1 feature.
- **D.** 8 customers × 3 unchanged features.

### Q22 - Very tough

Use the supplied EL formula `PC1 = (Income + Spending + Savings)/sqrt(3)`. The relevant rows are C1 = `(30,20,10)`, C2 = `(35,25,12)`, C7 = `(60,50,25)` and C8 = `(65,55,28)`. Which option correctly gives **C2's score, C7's score and C8 minus C1's score difference**, rounded to two decimals after calculating?

- **A.** 24.00, 45.00 and 29.33; the formula is the ordinary average.
- **B.** 72.00, 135.00 and 88.00; normalization does not change scores.
- **C.** 41.57, 77.94 and 85.45; the last quantity is C8's score rather than the difference.
- **D.** 41.57, 77.94 and 50.81.

### Q23 - Very tough

Consider C2 = `(35,25,12)` and another customer P = `(40,20,12)`, using the EL's equal-weight projection. Also consider reversing the signs of all three projection weights. Which statement is correct?

- **A.** Different input triples must have different PC1 scores, so P cannot share C2's score.
- **B.** Both original triples map to `72/sqrt(3)`; their distinction is lost in this representation. Reversing all weights changes every score's sign while preserving the represented axis and pairwise score distances.
- **C.** Reversing the weights changes the representation back from one dimension to three and uniquely reconstructs both original triples.
- **D.** Equal scores prove that the two original customers have identical Income, Spending and Savings.

### Q24 - Very tough

For all eight EL customers, add **10** to each of Income, Spending and Savings. Keep the projection direction fixed. For a centered version, recompute feature means after this translation. Evaluate:

1. Every uncentered score increases by `30/sqrt(3) = 10sqrt(3)`.
2. Every centered score along that same fixed direction is unchanged.
3. The reduced graph still represents eight observations; plotting them with vertical coordinate zero does not create a second learned component.
4. Reducing to one score guarantees that every original 3D distance is preserved exactly.

Which statements are valid?

- **A.** 1, 2 and 3 only.
- **B.** 1, 3 and 4 only.
- **C.** 2 and 4 only.
- **D.** All four.

## 7. EL - Apriori Online Shopping

Use this original dataset for Q25-Q28; Q28 explicitly adds one transaction.

| Customer | Products |
|---|---|
| C1 | Mobile, Phone Case |
| C2 | Mobile, Earphones |
| C3 | Mobile, Phone Case, Screen Guard |
| C4 | Laptop, Mouse |
| C5 | Laptop, Mouse, Keyboard |

Original thresholds: **minimum support 40%, minimum confidence 60%**.

### Q25 - Easy

For the original five transactions, what minimum support count is required?

- **A.** 1.
- **B.** 2.
- **C.** 3.
- **D.** 4.

### Q26 - Very tough

Which statement lists the correct frequent itemsets and explains the absence/presence of larger sets?

- **A.** L1 consists of {Mobile}, {Phone Case}, {Laptop}, {Mouse}; L2 consists of {Mobile, Phone Case} and {Laptop, Mouse}; L3 is empty because no triple has all pairs frequent. The occasional triples containing Screen Guard or Keyboard have support only 20%.
- **B.** Only Mobile is frequent because 40% support excludes equality; L2 and L3 are therefore empty.
- **C.** `{Mobile, Phone Case, Laptop, Mouse}` is one frequent 4-itemset because each of its individual items is frequent.
- **D.** All seven individual items are frequent; the two three-product transactions are frequent triples because appearing once is sufficient.

### Q27 - Very tough

Which statement about **Mobile → Phone Case** is fully correct for the original dataset?

- **A.** Support is 66.67% and confidence is 40%, so the rule fails the minimum-confidence requirement.
- **B.** Confidence is 100% because every Phone Case transaction contains Mobile; this is necessarily also the confidence in the opposite direction.
- **C.** Support is 40%, confidence is 66.67% and lift is approximately 1.67. The rule qualifies and can support suggesting a compatible phone case; reverse confidence is 100%, but causation is not established.
- **D.** Support and confidence are both 100%, so every future Mobile buyer is guaranteed to buy a Phone Case.

### Q28 - Very tough

Add a sixth transaction containing **only Mobile**. Keep minimum support at 40% and minimum confidence at 60%. Which complete result is correct?

- **A.** Minimum count remains 2; Mobile → Phone Case retains 40% support because old transactions are never included in the denominator again.
- **B.** Minimum count becomes 3; Laptop → Mouse is still accepted under both thresholds solely because its confidence remains 100%.
- **C.** Minimum count becomes 3; Mobile → Phone Case has confidence 66.67% because its antecedent count stays 3.
- **D.** Minimum count becomes 3; only Mobile is a frequent singleton. Mobile → Phone Case has support 2/6 and confidence 2/4, failing both thresholds. Laptop → Mouse keeps 100% confidence but fails support at 2/6.

### Topic coverage map

| Section | Coverage across the four questions |
|---|---|
| 1 | Labels versus features; supervised/unsupervised pipelines; interpretation; feature units/scaling; anomalies; clustering/reduction/association outputs |
| 2 | Mean updates; both source numerical examples; fixed-center assignment versus retraining; Euclidean distance; convergence; ties; cluster-ID invariance; scaling/outliers |
| 3 | PC1 variance; feature extraction versus selection; dimension-count versus information reduction; orthogonality/independence; scaling/centering; LDA distinction; supplied projection calculations |
| 4 | Itemsets/co-occurrence; support, confidence and lift; correct denominators; rule reversal; baseline frequency; thresholds; interpretation and causation |
| 5 | Apriori property; candidate pruning; inclusive thresholds and ceiling counts; frequent 1/2/3-itemsets; rule generation; direction-specific confidence; evaluating a “best” rule |
| 6 - EL | Eight-customer data shape; supplied formula; scores and differences; normalization; information loss; sign reversal; centering; graph interpretation |
| 7 - EL | All frequent-itemset stages; support/confidence acceptance; lift/reversal; practical recommendation; changed transaction counts and thresholds |

### Answer key

| Section | Easy | Very tough | Very tough | Very tough |
|---|---|---|---|---|
| 1 | **1 - C** | **2 - A** | **3 - D** | **4 - B** |
| 2 | **5 - A** | **6 - D** | **7 - B** | **8 - C** |
| 3 | **9 - D** | **10 - B** | **11 - C** | **12 - A** |
| 4 | **13 - B** | **14 - C** | **15 - A** | **16 - D** |
| 5 | **17 - A** | **18 - C** | **19 - D** | **20 - B** |
| 6 - EL | **21 - C** | **22 - D** | **23 - B** | **24 - A** |
| 7 - EL | **25 - B** | **26 - A** | **27 - C** | **28 - D** |

### Answer explanations

1. **C.** Unsupervised learning uses measured input features without predefined target answers. People still choose and interpret the learning setup.
2. **A.** Naming clusters afterward does not supply training labels retrospectively. PCA fitted using only pixels is unsupervised, even within a later supervised pipeline. Association consequents describe co-occurrence rather than supplied class targets. Operation 1 explicitly learns from known labels.
3. **D.** Units affect numerical distance contributions. Suitable scaling and domain interpretation are necessary. Lack of target labels makes evaluation harder, not impossible, and an outlier is not automatically confirmed fraud.
4. **B.** Clustering assigns observations to groups and retains a centroid coordinate for each input feature. PCA changes feature count without deleting observations. Association mining produces item relationships, not a fixed number of customer classes.
5. **A.** K-Means updates each centroid by averaging every feature over that cluster's members. It need not be an existing member, and the update is not a fresh random draw.
6. **D.** Means are 266/3, 165/3 and 65/3. Sixty is closest to 55. Assignment using fixed centers does not update them; explicitly recomputing the middle mean with 60 gives 225/4 = 56.25.
7. **B.** Each cluster has three members, so coordinate sums are divided by three. C3 to initial B has squared distance `(25-60)^2 + (28-65)^2 = 2594`. Stable assignments establish convergence of this run, not a universal global optimum.
8. **C.** Squared distances are `((59/3)^2 + (61/3)^2)` in one order for A and the reverse order for B, hence equal. A stated tie rule resolves the assignment. Merely renaming clusters changes no geometry, while scaling and outliers can affect it.
9. **D.** PC1 maximizes variance along its direction in the prepared data. It does not optimize a class target it was not given.
10. **B.** `(10,000-500)/10,000 = 95%` describes the count of features removed. Components are combinations, not necessarily selected pixels. Variance and visual quality depend on the data and retained directions.
11. **C.** Orthogonality, lack of correlation, independence and standardization are distinct concepts. LDA usually uses class labels. A broad dimensionality-reduction list does not make all listed methods unsupervised or equivalent to PCA.
12. **A.** Raw sums are 5, 7, 12 and 14. Centering subtracts `(4+5.5)/sqrt(2)` from each projected score, a common translation, so pairwise differences are preserved. The supplied direction is unchanged; deriving eigenvectors is a separate step.
13. **B.** Confidence divides the joint itemset count by the antecedent count. Support instead divides the joint count by all transactions; lift adds a consequent-baseline comparison.
14. **C.** Milk and Bread each occur four times, together three times. Therefore support = 3/5, confidence = 3/4 and lift = (3/4)/(4/5) = 15/16 = 0.9375. The 40%/66.67% values belong to the different supermarket table.
15. **A.** Support = 18/100. Forward confidence = 18/20 = 90%; reverse confidence = 18/80 = 22.5%. Lift = 0.18/(0.20 × 0.80) = 1.125 in both directions. Association does not establish causation.
16. **D.** Support = 4/50 = 8%, below 10%; confidence = 4/5 = 80%, above 70%. B's baseline is 40/50 = 80%, so lift = 1. The rule fails the required support filter despite high confidence.
17. **A.** A superset cannot occur in more transactions than its subsets. Frequent subsets do not guarantee a frequent larger set, and the pruning property concerns support rather than a universal confidence relationship.
18. **C.** Milk occurs three times; Bread/Butter four times each. The Milk pairs occur twice, giving forward confidence 2/3 and reverse confidence 2/4. The Bread-Butter pair occurs three times, giving 3/4 in both directions. The triple appears once and fails support.
19. **D.** `ceil(7 × 0.35) = 3`. The pair BC has count 2, so any containing triple has count at most 2. Apriori can prune it without scanning; rounding down would incorrectly accept insufficient support.
20. **B.** Support = 3/5, confidence = 3/4 and lift = (3/4)/(4/5) = 0.9375. The reverse direction ties because both singleton counts equal four. A 75% conditional frequency does not improve on an 80% baseline.
21. **C.** Projection changes three feature coordinates into one score for each of the same eight observations.
22. **D.** C2 = 72/sqrt(3) ≈ 41.57; C7 = 135/sqrt(3) ≈ 77.94. The C8-C1 difference is `(148-60)/sqrt(3) = 88/sqrt(3) ≈ 50.81`. Dividing by three would compute a mean, not the supplied projection.
23. **B.** Both triples sum to 72. A one-dimensional representation cannot distinguish them. Negating a direction reverses score signs but keeps the axis and absolute score differences; it does not restore discarded dimensions.
24. **A.** The raw sum rises by 30. In centered data the same translations are subtracted through the new feature means, leaving centered coordinates unchanged. A dummy display ordinate is not another component. Projection can discard differences and therefore does not preserve every original distance.
25. **B.** `ceil(5 × 0.40) = 2`; equality meets the minimum.
26. **A.** Mobile appears three times; Phone Case, Laptop and Mouse twice. Only the two listed pairs co-occur twice. The four individually frequent items are not jointly frequent, and the observed triples occur only once.
27. **C.** Joint count = 2, Mobile count = 3, Phone Case count = 2 and N = 5. Support = 2/5, confidence = 2/3 and lift = (2/3)/(2/5) = 5/3. Reverse confidence is 2/2. These results support considering a recommendation, not claiming causation or certainty.
28. **D.** N becomes six, so minimum count is `ceil(2.4) = 3`. Mobile reaches four, but every other formerly frequent item remains at two. Mobile → Phone Case has support 1/3 and confidence 1/2. Laptop → Mouse retains confidence 1 but has support 1/3, so it still fails the required support threshold.
