# AI Unit 4 — Last-minute Cheat Sheet

**Seven sections; last two are EL.** Based on *Ai Unit 4.pdf*. For explanations/code use `notes.md`; for practice use `questions.md`.

**Fast revision order:** NLP distinctions → sentiment features/formulas → bigram calculations → chatbot types → RGB counts/image pipeline → minimax tree → two EL traces.

## 1. NLP Foundations

**NLP:** Process, interpret and generate human language. Combines **linguistics + computer science + AI**; handles **text and speech**.

| Term | Remember |
|---|---|
| NLU | Interpret meaning, intent, entities and context |
| Intent | What the user wants: `book_ticket` |
| Entity | Important value: `Mysore`, date, person |
| NLG | Express information as natural-language output |
| Decision step | Rules, retrieval or a learned model choose the response/action |

**Five levels — L–S–S–P–D:**

| Level | Cue/example |
|---|---|
| Lexical | Tokens/word units |
| Syntactic | Grammar; subject–verb–object |
| Semantic | Meaning; financial bank versus river bank |
| Pragmatic | Intended request: “Can you open the window?” |
| Discourse integration | Link sentences: Ravi → he; laptop → it |

**Six tasks:** Text classification; NER; sentiment; translation; summarization; generation. **Classification** assigns categories; **NER** identifies entities; **translation** changes language; **summarization** shortens while keeping key information.

**Workflow:** Collect → preprocess → represent numerically → train/apply rules → evaluate → use on new input. Fit learned features/models on training data; evaluate on held-out data.

| Method/tool | Association |
|---|---|
| Rules | Explicit patterns/grammar/keywords |
| HMM / CRF | Statistical sequence modeling |
| RNN / Transformer | Neural methods; Transformer is a neural subtype |
| NLTK / spaCy | Basic NLP / NLP pipelines including NER |
| Gensim / Hugging Face Transformers | Topic modeling / pretrained Transformers |
| Google Cloud NLP / AWS Comprehend | Cloud language-analysis services named in slides |

**Challenges:** Ambiguity, sarcasm, slang, multilingual/code-mixed input, long context. **Applications:** Chatbots, voice assistants, speech-to-text, translation, spam filtering, sentiment/emotion, summaries, text analysis, information retrieval and recommendations.

**Trap:** A separate ML block between NLU and NLG is not compulsory. “Disclosure integration” in the diagram should read **discourse integration**.

## 2. Sentiment Analysis

**Goal:** Positive / negative / neutral opinion. Used for reviews, brand/social monitoring, political opinion, customer/chatbot feedback, business insights and movie-rating prediction.

| Approach | Mechanism | Main limitation |
|---|---|---|
| Lexicon | Combine known word scores | Coverage and context |
| Classical ML | Labeled data + BoW/TF-IDF + classifier | Data quality and feature limitations |
| Deep learning | Learn contextual representations | Compute/data cost; still makes errors |

**Toy lexicon:** love +3; excellent +3; good +1; boring −2; bad −2; hate −3.

$$S=\sum\operatorname{score}(w_i);\quad S>0:\text{positive},\ S<0:\text{negative},\ S=0:\text{neutral by rule}.$$

`love + boring = 3 − 2 = +1`. Mixed aspects can yield a positive overall sum. Unknown words score zero only under the specified toy method.

**VADER:** Lexicon + rules for informal text; uses negation/emphasis signals. **TextBlob:** Default polarity −1 to +1; subjectivity 0 to 1. **Neither is the six-word toy algorithm.** See [VADER examples](https://www.nltk.org/howto/sentiment.html) and [TextBlob](https://textblob.readthedocs.io/en/dev/quickstart.html#sentiment-analysis).

**Preprocessing:** Lowercase, clean, tokenize, optionally remove selected stop words, stem/lemmatize. Choose steps for the model; preserve useful *not*, punctuation, emojis and emphasis. Use a pretrained model's expected tokenizer.

- **Stemming:** Heuristic reduction; `happiness → happi` can be a nonword.
- **Lemmatization:** Dictionary base with suitable morphological/POS analysis; `better → good`.
- **BoW:** Counts, no word order. With [I,love,hate,movies]: “I love movies” → [1,1,0,1].
- **CountVectorizer caveat:** Defaults lowercase and omit single-character tokens such as I; a hand-specified vocabulary example is not its default output.
- **TF-IDF:** Within-document frequency × inverse collection frequency. **df counts documents**, not total occurrences.

**Hand-calculation convention used in this pack**—raw count, natural logarithm, no smoothing/normalization:

$$\operatorname{TFIDF}(t,d)=\operatorname{count}(t,d)\ln(N/\operatorname{df}(t)).$$

$N=4$, df=2, count=2 ⇒ $2\ln2\approx1.3863$. df=N ⇒ IDF=0 under this convention. Software defaults can differ.

**Classifiers:** Logistic Regression, Naive Bayes, SVM, Random Forest; KNN also appears in the feature discussion. **Neural:** RNN, LSTM, BERT, RoBERTa. **BERT:** Bidirectional Encoder Representations from Transformers. **RoBERTa:** Robustly Optimized BERT Pretraining Approach. Context helps with “bank” and “not bad”; no model guarantees sarcasm detection.

$$\text{Accuracy}=\frac{\text{correct}}{N},\quad
P=\frac{TP}{TP+FP},\quad R=\frac{TP}{TP+FN},\quad
F_1=\frac{2TP}{2TP+FP+FN}.$$

**Precision:** Correct among predicted class. **Recall:** Found among actual class. **Macro-F1:** Unweighted mean of per-class F1. High accuracy can hide weak minority-class performance.

## 3. Language Models and Chatbots

**Language model:** Models token/sequence probabilities; often predicts the next token. **Classifier:** Predicts a category. BoW + SVM sentiment classification is not automatically a generative language model.

**Uses:** Speech recognition, autocomplete/search, translation, summarization, email/text generation, question answering, chatbots and representations for sentiment.

**Bigram:** Two consecutive words; condition on the previous word only.

$$P(w_2\mid w_1)=C(w_1,w_2)/C(w_1).$$

Slide corpus: **Today is sunny / beautiful / Monday / cloudy; Tomorrow is sunny.**

| Calculation | Result |
|---|---:|
| P(is given Today) | 4/4 = 1 |
| P(sunny given is) | 2/5 = 0.4 |
| P(beautiful/Monday/cloudy given is), each | 1/5 = 0.2 |
| P(continuation “is sunny” given Today), bigram | 1 × 0.4 = **0.4**, not 0.25 |

**Statistical models:** Counts/probabilities. **Classical ML examples:** NB/LR/SVM on language features. **Neural:** RNN, LSTM, GRU, Transformer. **LLM examples in slides:** GPT, Gemini, Claude, Llama. Deep learning is within ML. BERT uses bidirectional context; GPT-style autoregressive generation uses previous tokens.

| Chatbot type | Response source | Strength / limitation |
|---|---|---|
| Rule-based | Patterns/if–else | Simple / brittle on unexpected input |
| Retrieval-based | Select stored response | Controlled / depends on coverage and matching |
| Generative | Create new text | Flexible / can generate incorrect information |

**Four components:** Input processing → dialogue management → response selection/generation; feedback supports later improvement.

- `book_ticket` = intent; `Mysore` = entity.
- Asking for a missing destination and remembering earlier turns = dialogue management.
- Templates are selected responses; generative models create wording.
- Feedback can guide corrections/retraining; it does not automatically update weights.
- Rasa/Dialogflow are conversational-platform examples; their names do not fix one exclusive bot type.

**Benefits/uses:** 24×7 FAQs, faster support, reduced routine workload; banking/retail/telecom, healthcare interfaces, student assistants, shopping and personal assistants. A generated booking confirmation is not proof of an executed booking.

## 4. Computer Vision, Classification and Applications

**CV:** Interpret images/video through pixels, patterns and models. **Image processing:** Prepare/transform/analyze image data—denoise, resize, enhance, detect edges, segment. CV adds interpretation; the fields overlap.

**Examples:** Face matching, driving perception, barcode decoding, medical scans, traffic/security object detection, retail checkout and crop-disease analysis.

| Image fact | Formula/value |
|---|---|
| Pixels | width × height |
| 8-bit RGB channels | R, G, B, each 0–255; 256 values |
| RGB tuples | $256^3=16,777,216$ |
| Red / green / blue | (255,0,0) / (0,255,0) / (0,0,255) |
| White / black / gray | (255,255,255) / (0,0,0) / (128,128,128) |
| 28×28 | 784 pixels; 2,352 RGB values |
| 128×128 | 16,384 pixels; 49,152 RGB values |
| 1920×1080 | 2,073,600 pixels; 6,220,800 RGB values |
| Channels-last shape for width1920, height1080 | (1080,1920,3); each plane (1080,1920) |

One byte per RGB channel ⇒ raw payload 3×pixels bytes, excluding compression/metadata. **Channels are not extra spatial pixels.** Three planes combine corresponding R/G/B values at each pixel.

**Image pipeline:** Acquisition → preprocessing (noise/resize/normalize) → enhancement → optional segmentation → feature extraction → train classifier → predict new image; evaluate on held-out images.

**Features:** Shape, edges, color, texture and structural patterns. **CNN:** Learns visual features, often jointly with classification. Separate manual features/segmentation are not always needed.

| Output | Task |
|---|---|
| One label, e.g. Dog | Single-label classification |
| Several labels, e.g. Cat/Dog/Rabbit | Multi-label classification |
| Classes + locations | Object detection |
| Pixel/region labels | Segmentation |

**Cats/dogs with known labels = supervised learning.** The source's Kaggle link is a dataset resource, not a reported training result.

| Domain | Revise these uses |
|---|---|
| Healthcare | Disease/scan analysis, drug/vaccine discovery, health assistants, treatment support |
| E-commerce | Recommendations, behavior analysis, dynamic pricing, order/query bots |
| Education | Personalized learning, adaptive assessment, grading/feedback, tutors, performance prediction |
| Business/finance | Fraud/anomaly detection, credit risk, bots, predictive analytics, algorithmic trading |
| Manufacturing | IoT-based maintenance, defect inspection, supply chains, assembly/welding/packaging robots |
| Transportation | Perception/navigation, traffic prediction, routing, delivery drones/robots, adaptive signals |
| Media/entertainment | Recommendations, subtitles, deepfake detection, moderation, game characters |
| Agriculture | Drone crop/pest monitoring, weather/soil prediction, irrigation, tractors, harvesting robots |
| Security/defense | Surveillance/threat alerts, intrusion detection, facial recognition, surveillance drones |

Slide examples include IBM Watson Health (historical), Amazon/Flipkart, Duolingo, American Express, Siemens, Tesla, Netflix/YouTube and John Deere. **Tesla Autopilot is supervised driver assistance, not full autonomy** ([official explanation](https://www.tesla.com/en_AE/support/autopilot)).

## 5. Game Playing and Minimax

**Game model:** State, player to move, legal actions, transitions, terminal conditions, utility. Clear rules allow repeatable AI evaluation; strategic play can still be difficult.

| Dimension | Alternatives and examples |
|---|---|
| Chance | Deterministic: chess / stochastic: backgammon or dice |
| Payoffs | Zero-sum: one gains what another loses / non-zero-sum: Prisoner's Dilemma |
| Information | Perfect: full state visible, chess / imperfect: hidden cards, poker |

Axes are independent: **randomness ≠ hidden information**. Tic-Tac-Toe is deterministic, perfect-information and zero-sum.

**Minimax:** Best guaranteed outcome against optimal opposing play. Basic assumptions: two players, alternating turns, fixed zero-sum utility, deterministic transitions and perfect information.

- Terminal values: MAX win +1, loss −1, draw 0.
- MAX takes **largest** child value; MIN takes **smallest**.
- Keep **one fixed perspective** throughout.
- Explore downward, back up values upward.
- MAX can choose a negative value; MIN can choose a positive value.

**Numerical slide tree — MAX → MIN → MAX → leaves:**

| Leaf pair under each bottom MAX | −3,7 | 2,−1 | −7,−3 | 8,4 |
|---|---:|---:|---:|---:|
| Backed-up MAX | 7 | 2 | −3 | 8 |

Left MIN = min(7,2)=2; right MIN = min(−3,8)=−3; **root MAX = 2, choose left**. Do not chase the largest leaf 8.

**Colored tree:** Bottom MAX values (1,1,−1,1) → MIN values (1,−1) → root **1**, choose left.

**Alpha-beta:** Soundly prune irrelevant branches; same minimax result. In the numeric tree, once root has 2 and right MIN has an available −3, prune the sibling leaves **8 and 4**.

**Heuristic:** Estimated nonterminal quality at cutoff; not an actual win/loss or probability. **BFS:** Large branching factor/depth can make it costly. **Move ordering:** Helps efficiency; unjustified legal-move omission can lose optimality. **Deep RL:** Learns from experience/rewards; minimax itself searches without training.

## 6. EL — Sentiment Practice

Use the exact six-word lexicon from Section 2. Lowercase/tokenize; unmatched words score zero; no negation, sarcasm or emoji processing.

| Slide examples grouped by expected label | Toy results |
|---|---|
| Positive: love movie; amazing phone; great day; excellent food; awesome | Scores **3,0,0,3,0** → 2 correct |
| Negative: hate movie; terrible phone; bad service; boring/tasteless food; worst experience | Scores **−3,0,−2,−2,0** → 3 correct |
| Neutral: movie okay; college visit; 6-inch display; match time; laptop purchase | All **0** → 5 correct |

**Confusion matrix — rows actual, columns predicted:**

| Actual / predicted | + | − | Neutral |
|---|---:|---:|---:|
| + | 2 | 0 | 3 |
| − | 0 | 3 | 2 |
| Neutral | 0 | 0 | 5 |

**Accuracy 10/15 = 66.67%.** Positive P/R/F1 = 1/.4/.5714; negative = 1/.6/.75; neutral = .5/1/.6667. **Macro-F1 ≈ .6627.** These are teaching-set results, not general accuracy.

| Difficult case | Intended/slide interpretation |
|---|---|
| Phone crashed; “wonderful experience” | Sarcastic negative; exact toy lexicon returns 0 because both key words are absent |
| Happy but worried about exam | Mixed; slide assigns overall negative |
| “This movie chennagide!” | Positive; Kannada-English code-mixing |
| Looks great, battery terrible | Appearance positive; battery negative; slide overall negative |
| “Very happy today maga!” | Positive, slang/informal expression |

**Remember:** Zero may mean missing words, not neutral meaning. Mixed does not automatically mean neutral. Improve vocabulary, negation handling, useful emphasis, contextual/multilingual coverage and aspect analysis; evaluate on separate data.

## 7. EL — Tic-Tac-Toe Minimax

**Human X first; computer O = MAX.** Position 1–9 maps to index 0–8. Eight win lines: three rows, three columns, two diagonals. O win +1; X win −1; draw 0.

**Recursive checklist:** Check terminal → simulate legal move → recurse with other player → **undo** → choose max/min. After simulating O, call minimax for **X/MIN**. Check wins before declaring a full-board draw.

| Function | Job |
|---|---|
| `result` | Winner, draw or ongoing |
| `minimax` | Optimal value of current state |
| `best_move` | Best O move; restore every trial cell |
| `show` | Display board/available positions |
| `play` | Validate input, alternate turns, stop on terminal outcome |

**Slide trace:** X5 → O1 → X3 → **O7**, blocking diagonal 3–5–7. At that O turn: moves 2/4/6/8/9 score −1; **7 scores 0**. Then X must block O's column threat at **4**.

**Other tactical case:** X at 4,5,9; O at 1,2; O to move. **O3 wins immediately (+1)**; O6 only draws (0); O7/O8 lose (−1). Take the win before considering a block.

**Implementation traps:**

- Validate integer, range and empty cell before placing X.
- Restore cells after every simulated branch.
- Strict `>` keeps the first equal-score move; `>=` keeps the last.
- +1/0/−1 alone does not rank wins by speed.
- Full minimax is search, not learning from previous games.
- Optimal play can guarantee a **draw**, not necessarily a win.

**Checked implementation:** Exhaustive human-move sequences against the included deterministic computer policy produced 498 O wins, 183 draws and **0 X wins** from the empty board. Sequence counts are not probabilities.

**Last check before the exam:** Can you explain NLU vs NLG, stemming vs lemmatization, BoW vs TF-IDF, classifier vs language model, retrieval vs generation, pixels vs channels, classification vs detection, and terminal utility vs heuristic evaluation? Can you derive **0.4**, **2,073,600**, **root value 2**, and **O's move 7**?
