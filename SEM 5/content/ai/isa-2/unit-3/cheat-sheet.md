# AI Unit 3 - Last-Minute Cheat Sheet

**Unsupervised Learning · Five theory sections + two EL sections**  
Based on *Ai Unit 3.pdf*. Full explanations: `notes.md`. Practice: `questions.md`.

**Core memory:** K-Means groups observations. PCA reduces feature dimensions. Association mining discovers co-occurring items. Apriori finds frequent itemsets and generates rules.

## 1. Unsupervised Learning

**Definition:** Learn patterns/structure from input features without predefined target labels. People still select features, algorithms, parameters and interpretations.

| Type | Output | Examples |
|---|---|---|
| Clustering | Similar-record groups | K-Means; hierarchical clustering; DBSCAN |
| Dimensionality reduction | Fewer representation features | PCA |
| Association mining | Frequent itemsets and rules | Apriori; FP-Growth as an alternative |

**Supervised:** Inputs + targets; classification/regression; decision trees, KNN, SVM, linear regression. Examples: spam labels, disease prediction, house prices.  
**Unsupervised:** No target answers; patterns/groups/representations. Examples: customer segments, student groups, news topics, basket associations.

**Benefits:** Saves label-collection effort, discovers hidden structure, supports exploratory data analysis and data simplification.

**Challenges:** Harder evaluation; irrelevant/missing features; unequal scales; parameter/algorithm choices; interpretation; groups may be unhelpful.

**Applications:** Customer/market segmentation, recommendations, fraud/anomaly exploration, social networks, medical images, gene grouping, document clustering and image compression.

**Traps:** Naming clusters afterward does not make their training supervised. An outlier is not automatically fraud. Income in rupees can dominate a 0-100 score unless scaling/units are handled appropriately. Unsupervised does not mean impossible to evaluate or free of human choices.

## 2. K-Means Clustering

**K** = chosen number of clusters. **Centroid** = coordinate-wise mean. **Algorithm:** choose K → initialize centers → calculate distances → assign nearest → recompute means → repeat until stable.

$$d_{1D}=|x-c|,\qquad d_{2D}=\sqrt{(x-a)^2+(y-b)^2}.$$

$$\text{Centroid}=(\text{mean of x values},\text{mean of y values}).$$

K-Means seeks small within-cluster **squared** distances. Initial centers may be random; the subsequent distance/mean calculations are not random. A centroid need not be an actual data point.

**Student marks example, K = 3:**

| Group | Marks | Initial center | Final center |
|---|---|---:|---:|
| High | 92, 89, 85 | 92 | 266/3 = 88.67 |
| Middle | 58, 55, 52 | 55 | 55.00 |
| Low | 18, 22, 25 | 22 | 65/3 = 21.67 |

New mark **60**: distances to Low/Middle/High = **38.33 / 5 / 28.67** → Middle. Fixed-model assignment leaves the center at 55. Recomputing that mean with 60 gives **56.25**.

**Customer example, K = 2:**

| Group | Assigned points | Initial centroid | Final centroid |
|---|---|---|---|
| A | (20,25), (22,30), (25,28) | (20,25) | (67/3,83/3) ≈ (22.33,27.67) |
| B | (60,65), (62,68), (65,70) | (60,65) | (187/3,203/3) ≈ (62.33,67.67) |

Memberships remain unchanged on the next assignment → converged. Example distance: `(25,28)` to `(60,65)` is `sqrt(2594) ≈ 50.93`.

**Pros:** Simple, often fast, efficient, good for compact/spherical groups.  
**Cons:** Must choose K; sensitive to initialization, scale and outliers; weaker for irregular or differently sized/spread groups; convergence need not be a global optimum.

**Uses:** Customer/market segmentation, pixel-colour compression, document groups, anomaly exploration. **Cluster IDs are arbitrary**; the slides relabel the high/low mark groups. Ties need a stated tie rule. Many new records/distribution changes may justify refitting; a few assignments do not automatically update the model.

## 3. Dimensionality Reduction and PCA

**Dimensionality reduction:** Fewer features while trying to retain useful information. Helps computation, memory, visualization and redundancy/noise reduction; benefits are not guaranteed.

**Selection:** Keep existing columns, unchanged. **Extraction:** Create new features from old ones. PCA is extraction. The slides also list LDA, t-SNE, UMAP and autoencoders; **LDA is normally supervised**, so this general list is not entirely unsupervised.

**PCA:** Linear, unsupervised transformation into variance-ranked, orthogonal directions.

- **PC1:** Maximum variance direction.
- **PC2:** Maximum remaining variance, perpendicular to PC1.
- **Later PCs:** Further orthogonal directions with decreasing variance.
- Scores are **uncorrelated**, not necessarily statistically independent.

$$PC1=aX+bY;\qquad z_1=a(x-\bar{x})+b(y-\bar{y})\text{ for centered inputs}.$$

**Conceptual steps:** Prepare/scale as appropriate → center → covariance matrix → eigenvectors/eigenvalues → sort by variance → retain components → project.

Centering subtracts means; standardization also adjusts scale. The weights depend on the data. High variance need not mean best class prediction. Reversing a component's sign leaves its axis unchanged.

**Given slide projection:** `(x+y)/sqrt(2)` maps `(2,3),(3,4),(5,7),(6,8)` to **3.54, 4.95, 8.49, 9.90**. Use this supplied raw formula for that question; full fitted centered PCA is a different calculation.

| Illustration | Feature-count change |
|---|---|
| 100 × 100 grayscale image | 10,000 → 500; 95% fewer features |
| 64 × 64 face image | 4,096 → 100 |
| Text vocabulary representation | 20,000 → 300; 98.5% fewer features |

These percentages do **not** specify variance retained or quality. Other uses: visualization, preprocessing, finance and genomics. NLP graphic: LSA/PCA/embeddings support classification, spam detection, sentiment, topics and search.

**Pros:** Compact input, visualization, reduced correlated redundancy, possible noise/overfitting reduction. **Cons:** Harder interpretation, linear directions, scale sensitivity and possible information loss. PCA does not simply average every dataset or automatically improve accuracy.

## 4. Association Rule Mining

**Transaction:** Basket of items. **Itemset:** One or more items. **Rule:** X → Y; X is antecedent, Y consequent. Rule direction is conditional, not causal or necessarily chronological.

Let n(X) count transactions containing all items in X; N is all transactions.

$$s(X)=\frac{n(X)}N,\qquad s(X\to Y)=\frac{n(X\cup Y)}N.$$

$$c(X\to Y)=\frac{n(X\cup Y)}{n(X)},\qquad
\operatorname{lift}(X\to Y)=\frac{c(X\to Y)}{s(Y)}.$$

`X ∪ Y` is the combined itemset: count transactions containing **all required items**.

| Measure | Recall |
|---|---|
| Support | Coverage across all transactions |
| Confidence | Consequent frequency among antecedent transactions |
| Lift > 1 | Positive association relative to consequent's baseline |
| Lift = 1 | Independence baseline in the observed frequencies |
| Lift < 1 | Negative association relative to baseline |

Reversing a rule preserves **support and lift**, but not generally confidence. Use consistent fractions/percentages in ratios. Lift is not a percentage. High confidence alone does not prove positive association.

**Introductory table, PDF p.70:** Milk, Bread and Butter each have count **4/5**; each pair **3/5**; triple **2/5**. Milk → Bread: **support 60%, confidence 75%, lift 0.9375**. Do not mix these counts with Section 5.

**Uses:** Baskets, cross-selling, promotions, recommendations, exploratory symptom relationships. **Benefits:** Hidden relationships, decisions, no target labels. **Limits:** Many combinations/rules, expensive counting, threshold choice and rule filtering. Association is not causation.

## 5. Apriori Algorithm

**Principle:** Infrequent itemset → every containing superset infrequent. Every subset of a frequent itemset must be frequent. The reverse implication is false.

**Procedure:** Count singles → retain frequent L1 → join candidates C2 → prune using subsets → count/filter L2 → repeat → generate rule directions → filter by confidence/lift/usefulness.

$$\text{Minimum count}=\lceil N\times\text{minimum support proportion}\rceil.$$

Thresholds use **≥**, including equality. Example: N=5, 40% → count 2; N=6, 40% → count 3. Compare exact values before rounding.

**Supermarket dataset:**

| T1 | T2 | T3 | T4 | T5 |
|---|---|---|---|---|
| Milk, Bread, Butter | Bread, Butter, Jam | Milk, Bread | Milk, Butter | Bread, Butter |

At 40% minimum support:

- **Singles:** Milk 3/5 = 60%; Bread 4/5 = 80%; Butter 4/5 = 80%; Jam 1/5 = 20% → remove Jam.
- **Pairs:** Milk-Bread 2/5 = 40%; Milk-Butter 2/5 = 40%; Bread-Butter 3/5 = 60% → all three frequent.
- **Triple:** Milk-Bread-Butter 1/5 = 20% → infrequent; stop.

| Rule direction(s) | Confidence | Lift |
|---|---:|---:|
| Milk → Bread; Milk → Butter | 2/3 = 66.67% | 0.8333 |
| Bread → Milk; Butter → Milk | 2/4 = 50% | 0.8333 |
| Bread → Butter; Butter → Bread | 3/4 = 75% | 0.9375 |

The last two directions tie on support/confidence. Their lift is below 1 because **75% is below the consequent's 80% baseline**. Calling one uniquely “best positive” is misleading.

**Pros:** Simple, useful, support-based pruning. **Cons:** Many candidates/scans/rules; threshold selection; slow on large combinations. FP-Growth is a named alternative. Frequent pairs do not force a frequent triple.

## 6. EL - PCA Customer Projection

**Use the supplied raw formula:**

$$PC1=\frac{Income+Spending+Savings}{\sqrt3}.$$

| Customer | Income | Spending | Savings | PC1 |
|---|---:|---:|---:|---:|
| C1 | 30 | 20 | 10 | 34.64 |
| C2 | 35 | 25 | 12 | 41.57 |
| C3 | 40 | 30 | 15 | 49.07 |
| C4 | 45 | 35 | 18 | 56.58 |
| C5 | 50 | 40 | 20 | 63.51 |
| C6 | 55 | 45 | 22 | 70.44 |
| C7 | 60 | 50 | 25 | 77.94 |
| C8 | 65 | 55 | 28 | 85.45 |

**Example:** C3 = `85/sqrt(3) ≈ 49.07`. Divide by **sqrt(3)**, not 3. Feature dimension: **3 → 1**, observations: **8 → 8**. This is 66.67% fewer feature dimensions, not a stated variance-loss percentage.

**Graphs:** Original = 3D scatter of Income/Spending/Savings. Reduced = eight scores on one PC1 axis; any vertical zero is just a plotting aid.

**Traps:** Same feature sum → same score even for different triples. Raw exercise scores are not a newly fitted centered PCA. For the same fixed direction, centering uses means **47.5, 37.5, 18.75** and subtracts the common score offset `103.75/sqrt(3)`. Centering preserves pairwise score differences.

## 7. EL - Apriori Online Shopping

**Data:** C1 Mobile+Phone Case; C2 Mobile+Earphones; C3 Mobile+Phone Case+Screen Guard; C4 Laptop+Mouse; C5 Laptop+Mouse+Keyboard.

**Thresholds:** Support ≥ 40%; confidence ≥ 60%; N=5 → minimum count **2**.

| Stage | Answer |
|---|---|
| Frequent 1-itemsets | {Mobile}: 60%; {Phone Case}: 40%; {Laptop}: 40%; {Mouse}: 40% |
| Infrequent individual items | Earphones, Screen Guard, Keyboard: 20% each |
| Frequent 2-itemsets | {Mobile, Phone Case}: 40%; {Laptop, Mouse}: 40% |
| Frequent 3-itemsets | None; no triple has all pairs frequent |

**Mobile → Phone Case:** Support = **2/5 = 40%**; confidence = **2/3 ≈ 66.67%** → accepted. Lift = **(2/3)/(2/5) = 5/3 ≈ 1.67**.

**Reverse rule:** Phone Case → Mobile has **100% confidence**, same support/lift. Laptop → Mouse and Mouse → Laptop: **40% support, 100% confidence, lift 2.5**.

**Practical use:** Suggest a compatible phone case when a mobile is added to the cart. The rule is evidence for a recommendation, not a guarantee or causal proof.

**Changed-data trap:** Add one Mobile-only transaction → N=6, minimum count 3. Mobile → Phone Case becomes **2/6 support, 2/4 confidence** and fails both cutoffs. Laptop → Mouse still has 100% confidence but fails support at 2/6.

### Final 30-second recall

**K-Means:** nearest center → mean update → repeat. Stable does not mean globally best.  
**PCA:** new weighted axes; PC1 maximum variance; PC2 orthogonal. Uncorrelated ≠ independent.  
**Support:** joint / all. **Confidence:** joint / antecedent. **Lift:** confidence / consequent support.  
**Apriori:** infrequent subset kills its supersets; all frequent subsets do not prove a frequent superset.  
**Minimum means ≥. Round last. Keep the three transaction datasets separate.**
