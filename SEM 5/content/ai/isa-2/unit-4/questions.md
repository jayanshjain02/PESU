# AI Unit 4 — Section-wise MCQs

**28 questions: 7 sections × 4 questions.** Each section contains **1 Easy + 3 Very Tough** questions. Sections 6 and 7 are EL. Choose **one best answer** per question. The answer key and explanations are at the bottom.

The questions follow *Ai Unit 4.pdf* and the worked clarifications in `notes.md`. Calculations explicitly state their conventions; do not substitute library defaults or a different lexicon.

| Section | Questions | Coverage |
|---|---|---|
| 1. NLP foundations | 1–4 | NLU/NLG, tasks, five levels, methods, tools, workflow, applications and challenges |
| 2. Sentiment analysis | 5–8 | Lexicon/VADER/TextBlob, preprocessing, BoW/TF-IDF, classifiers, neural models and evaluation |
| 3. Language models and chatbots | 9–12 | Bigram probabilities, ML versus language models, neural architectures, chatbot types/components and feedback |
| 4. Computer vision and applications | 13–16 | Processing versus interpretation, classification types, pixels/RGB, image pipeline/CNNs and nine application domains |
| 5. Game playing | 17–20 | Game categories, minimax, utility, numerical trees, pruning, BFS, heuristics and reinforcement learning |
| 6. EL — Sentiment practice | 21–24 | Tweet labels, dictionary coverage, confusion matrices, metrics, sarcasm, mixed sentiment and code-mixing |
| 7. EL — Tic-Tac-Toe | 25–28 | Board indexing, MAX/MIN, slide trace, tactical choices, recursion, restoration, validation and tie-breaking |

## 1. Natural Language Processing

### Q1 — Easy

A shopping bot interprets “Can I send this item back?” as a return-policy enquiry and then expresses the selected policy as a natural-language sentence. Which pair names these two language functions, in order?

A. NLG, followed by NER  
B. NLU, followed by NLG  
C. Tokenization, followed by image classification  
D. NLG, followed by NLU

### Q2 — Very Tough

Consider a system processing: “Ravi bought a laptop in Bengaluru. He likes it. Can you open its settings?” It performs five operations:

1. Splits the sentences into tokens.
2. Identifies the subject–verb–object structure of “Ravi bought a laptop.”
3. Interprets the meaning of buying and the product reference in the sentence.
4. Links “He” to Ravi and “it” to the laptop across sentences.
5. Treats “Can you open its settings?” as a request to act, rather than merely a question about ability.

Which mapping and additional claim are all correct?

A. 1 lexical; 2 semantic; 3 syntactic; 4 pragmatic; 5 discourse. NER identifies the request's intent.  
B. 1 syntactic; 2 lexical; 3 semantic; 4 discourse; 5 pragmatic. NER creates the final response.  
C. 1 lexical; 2 syntactic; 3 semantic; 4 pragmatic; 5 discourse. NER is the same as sentiment classification.  
D. 1 lexical; 2 syntactic; 3 semantic; 4 discourse; 5 pragmatic. NER can separately label Ravi as a person and Bengaluru as a location.

### Q3 — Very Tough

A university routes messages to different NLP components. Consider these design claims:

1. The same review can receive a topic label and a sentiment label from separate classification tasks; NER can additionally identify people or organizations in it.
2. A team may use NLTK for basic processing, spaCy for NER, Gensim for topic modeling and Hugging Face Transformers for pretrained models; cloud NLP services are another deployment option.
3. A Transformer should be placed outside the neural-model category because its attention mechanism replaces recurrence.
4. HMMs and CRFs are statistical sequence-model examples; using them does not imply that the system generates conversational responses.
5. Translation and summarization are the same task whenever both preserve the original meaning; an information-retrieval system must generate new wording for every result.
6. A rule matching `I am + adjective` can be useful, but it does not by itself solve contextual interpretation, and a tool's name does not establish model accuracy.

Which set contains all the correct claims?

A. 1, 2, 4 and 6  
B. 1, 2, 3 and 6  
C. 1, 3, 4 and 5  
D. 2, 4, 5 and 6

### Q4 — Very Tough

An NLP team has emails, social-media posts and voice recordings. It wants spam filtering, emotion/sentiment analysis, information retrieval and text-based recommendations. A proposed plan says:

1. Transcribe speech when text is required, then use task-appropriate processing.
2. Delete negation, emojis and punctuation for every model because these never affect meaning.
3. Collect data, preprocess appropriately, represent it numerically, train where needed, and evaluate on held-out data using suitable measures such as accuracy/F1.
4. Treat “bank”, sarcastic praise, slang, Kannada-English code-mixing and long-distance references as potential interpretation challenges.
5. Insist that every system use a separate machine-learning block between NLU and NLG, even if its behavior is rule-based.

Which set contains **all and only** the sound statements?

A. 1, 2 and 5  
B. 2, 3 and 4  
C. 1, 3 and 4  
D. 3, 4 and 5

## 2. Sentiment Analysis

### Q5 — Easy

What does a basic unigram Bag-of-Words representation store?

A. Counts of vocabulary words, without preserving their order  
B. The grammatical relationship between every word pair  
C. Only the final positive/negative/neutral label  
D. A complete understanding of sarcasm

### Q6 — Very Tough

Use only this lexicon: `love:+3, excellent:+3, good:+1, boring:−2, bad:−2, hate:−3`. Lowercase and tokenize words; all other tokens score zero. Add all recognized occurrences, without negation or contrast rules.

For **“I love it, but it is not good and is boring”**, which conclusion is correct?

A. Score 0; VADER and TextBlob must also return exactly 0 because they use this same six-word algorithm.  
B. Score +2, hence positive under the toy rule; this does not prove the actual opinion is wholly positive, and the output cannot be assumed to equal VADER/TextBlob.  
C. Score −2, hence negative; the toy algorithm automatically negates `good` and doubles the effect of `boring`.  
D. Score +4, hence positive; `boring` is a stop word and must always be discarded.

### Q7 — Very Tough

Use these four documents, with vocabulary order **[good, movie, boring]**:

- D1: `good good movie`
- D2: `good movie`
- D3: `boring movie`
- D4: `movie`

For this question, define TF-IDF as **raw term count × ln(N/df)**, with no smoothing, offset or normalization. Which complete statement is correct?

A. D1's BoW vector is [1,1,0]; its `good` TF-IDF is ln(4/3), because `good` occurs three times in the corpus.  
B. D1's BoW vector is [2,1,0]; its `movie` TF-IDF is 1, because every present token receives a minimum weight of 1 under the stated formula.  
C. D1's BoW vector is [2,0,1]; its `good` TF-IDF is 2 ln 4; TF-IDF itself learns the positive label without a classifier.  
D. D1's BoW vector is [2,1,0]; `good` has df = 2 and weight 2 ln 2; `movie` has weight 0. A classifier such as Naive Bayes, Logistic Regression or SVM is a separate component.

### Q8 — Very Tough

A team compares a classical sentiment classifier with BERT/RoBERTa on product reviews. Evaluate these claims:

1. Stemming can produce `happi`; lemmatization seeks an appropriate dictionary base, such as `good` for `better` with the right analysis.
2. Because vocabulary/IDF fitting does not use sentiment labels, fitting it on the test reviews cannot leak test information.
3. BERT can use left/right context; RoBERTa refines BERT pretraining; a pretrained model should receive its expected tokenization rather than mandatory generic stemming/stop-word removal.
4. RNNs/LSTMs/Transformers can learn representations, but they do not guarantee perfect sarcasm detection or eliminate all input preparation.
5. Accuracy, per-class precision/recall and F1 measure different aspects of performance; large training runs may benefit from GPUs without making a GPU mandatory for every inference task.
6. VADER should always receive lowercased text stripped of all punctuation because it cannot use emphasis signals.

Which statements are correct?

A. 1, 2, 3 and 6  
B. 2, 3, 4 and 5  
C. 1, 3, 4 and 5  
D. 1, 4, 5 and 6

## 3. Language Models and Chatbots

### Q9 — Easy

A chatbot identifies a library-timing enquiry and selects the most suitable answer from a stored response set. What response mechanism does this illustrate?

A. Image segmentation  
B. Purely generative response creation  
C. Retrieval-based response selection  
D. Minimax search

### Q10 — Very Tough

An unsmoothed bigram model is trained on exactly:

1. Today is sunny
2. Today is beautiful
3. Today is Monday
4. Today is cloudy
5. Tomorrow is sunny

Ignore sentence-start/end probabilities. What are **P(is | Today)** and the model's conditional probability of the two-word continuation **“is sunny” after “Today”**? Also select the valid explanation.

A. 1 and 0.4; after `Today` the next word is `is`, and a bigram then uses P(sunny | is) = 2/5, forgetting the earlier word `Today`.  
B. 1 and 0.25; the bigram must condition `sunny` on both `Today` and `is`.  
C. 0.8 and 0.4; the denominator of P(is | Today) is the total number of sentences.  
D. 1 and 0.8; the correct denominator for P(sunny | is) is the count of `Today`.

### Q11 — Very Tough

A bot handles this conversation:

- User: “I want to book a ticket.”
- Bot: “Where do you want to go?”
- User: “Mysore.”

It extracts `book_ticket`, retains that intent across turns, stores `Mysore` as the destination and selects a reply template. Later, a user marks one reply incorrect. Which interpretation is fully correct?

A. `Mysore` is the intent; `book_ticket` is the entity; feedback automatically rewrites model weights immediately.  
B. Asking for missing information is NER alone; dialogue management is unnecessary because each message has independent meaning. Template selection proves that the backend booking has succeeded.  
C. Because the bot handles context, it must be an LLM that invents every reply. Rasa/Dialogflow cannot support this kind of application.  
D. Input processing identifies intent/entities; dialogue management retains context and asks for missing information; response selection uses the template. Feedback may inform later data/rule/model updates, but does not itself prove retraining or a completed booking.

### Q12 — Very Tough

A team compares BoW + SVM, an RNN, an LSTM/GRU, BERT and a GPT-style generator. It also considers LLM examples named in the slides: GPT, Gemini, Claude and Llama. Evaluate these statements:

1. A BoW + SVM sentiment system can predict labels without defining a next-token probability distribution; it is not automatically a language model in the strict sense.
2. Since BERT uses left and right context, an ordinary GPT-style next-token generator must also inspect the actual future words before predicting them.
3. LSTM and GRU are recurrent architectures; attention-based Transformers are neural models even without recurrence.
4. Deep learning is within ML, and LLMs are neural language models rather than an unrelated fourth category.
5. A highly probable completion is necessarily factually correct, so generative support bots do not need reliable source information.
6. Language models can support speech recognition, autocomplete, translation, summaries and question answering, while support, student, healthcare, shopping and personal-assistant bots can use different response mechanisms.

Which statements are correct?

A. 1, 2, 4 and 6  
B. 1, 3, 4 and 6  
C. 2, 3, 4 and 5  
D. 1, 3, 5 and 6

## 4. Computer Vision and Real-world AI Applications

### Q13 — Easy

An image-classification system receives a photograph containing a cat, dog and rabbit and returns the three labels without predicting any object locations. This is:

A. Single-label classification  
B. Multi-label classification  
C. Object detection with bounding boxes  
D. Pixel-level segmentation

### Q14 — Very Tough

A color image is **1920 pixels wide and 1080 pixels high**, with three 8-bit RGB channels. Assume no alpha channel, no metadata, no padding and no compression; use a **channels-last** array layout. Which complete set is correct?

A. 6,220,800 spatial pixels; shape (1920,1080,3); 2,073,600 bytes; 255³ possible tuples.  
B. 2,073,600 spatial pixels; shape (1080,1920); 2,073,600 bytes; three possible pixel colors.  
C. 2,073,600 spatial pixels; shape (1080,1920,3); 6,220,800 bytes; (255,255,255) is black and (0,0,0) is white.  
D. 2,073,600 spatial pixels; shape (1080,1920,3); 6,220,800 channel values and bytes; 256³ possible RGB tuples; each separate color plane has shape (1080,1920).

### Q15 — Very Tough

A student collects labeled cat/dog photos, resizes them to 128×128, denoises them, adjusts contrast, optionally isolates the animal, extracts shape/texture/color information, trains a classifier and evaluates on held-out images. Another version uses a CNN. Which assessment is correct?

A. The labels make the task supervised; each resized image has 16,384 pixels, or 49,152 values if RGB. Preprocessing/enhancement prepare data, segmentation identifies a region, and classification predicts a label. A CNN can learn features jointly with classification, so separate hand-designed features and segmentation are not universally mandatory.  
B. Resizing itself predicts Cat/Dog, making the classifier redundant. Every 128×128 RGB image contains 49,152 spatial pixels, and a CNN requires manual extraction of all features.  
C. Labeled data makes this unsupervised learning. Adjusting contrast is the same as identifying the animal, and training-set accuracy alone measures generalization.  
D. Segmentation gives only an image-level label and never a region. The Kaggle link in the slides proves that the student's model has already been trained and has perfect accuracy.

### Q16 — Very Tough

A project portfolio spans all nine application domains in the slides:

| Group | Requirements |
|---|---|
| I | Detect factory defects; identify crop disease from drone images; support interpretation of medical scans |
| II | Recommend products; personalize education; recommend films |
| III | Flag unusual payments; optimize traffic signals; flag unusual network access |

A reviewer makes six claims:

1. Group I shares visual-analysis needs across manufacturing, agriculture and healthcare, although the labels/data and consequences differ.
2. Group II has recommendation/personalization needs across e-commerce, education and media; these needs are distinct from merely enhancing image contrast.
3. Because all Group III systems use unusual or changing patterns, a fraud-classification label directly specifies the optimal traffic-signal timing without further decision logic.
4. The same sectors also include IoT predictive maintenance, drug/vaccine discovery, adaptive grading, subtitle generation, irrigation, routing and surveillance; these are different functions rather than one interchangeable algorithm.
5. A camera-based vehicle system that recognizes lanes is necessarily fully autonomous; reliable visual recognition alone establishes the complete driving capability.
6. The security task can involve intrusion/anomaly detection, while the transport task combines predictions with decisions. A supervised driver-assistance example must not be described as full autonomy.

Which set contains all the correct claims?

A. 1, 2, 3 and 6  
B. 1, 3, 4 and 5  
C. 1, 2, 4 and 6  
D. 2, 4, 5 and 6

## 5. Game Playing and Minimax

### Q17 — Easy

At a MIN node in basic minimax, what value is selected?

A. The smallest child value, using the same fixed utility perspective throughout the tree  
B. The largest child value  
C. The negative value, even if no negative child exists  
D. The average child value

### Q18 — Very Tough

A tree has levels **MAX → MIN → MAX → leaves**. The four bottom MAX nodes, from left to right, have leaf pairs:

- A: (−3, 7)
- B: (2, −1)
- C: (−7, −3)
- D: (8, 4)

The left MIN node contains A and B; the right MIN node contains C and D. Which answer gives the bottom MAX values, the two MIN values, the root value and the best root branch?

A. (−3,−1,−7,4); (−3,−7); −3; left  
B. (7,2,−3,8); (7,8); 8; right  
C. (7,2,−3,8); (2,−3); 2; left  
D. (7,2,3,8); (2,3); 3; right

### Q19 — Very Tough

Use the same tree as Q18, searched left-to-right with correct alpha-beta pruning. The left root branch has already returned 2. The first bottom MAX node in the right branch, with leaves (−7,−3), now returns −3. What follows?

A. Nothing can be pruned because the unseen sibling contains 8, the largest leaf in the tree; the root must eventually return 8.  
B. The sibling subtree with leaves (8,4) can be pruned: the right MIN node can already choose −3, so this branch cannot improve MAX's existing 2. The root value remains 2.  
C. MAX must replace −3 with +3 because a maximizing player cannot return a negative value; the root becomes 3.  
D. The entire previously explored left branch is invalidated because MIN is permitted to choose only negative values.

### Q20 — Very Tough

In a two-player game, a public die roll influences the next state, all game information is visible, and an outcome can award +2 to **both** players. Evaluate these claims:

1. The game is stochastic and perfect-information; the +2/+2 outcome demonstrates that its payoffs need not be zero-sum.
2. Basic deterministic, zero-sum minimax can be used unchanged because all games have the same payoff structure.
3. A heuristic score at a depth cutoff estimates a nonterminal position; it is not necessarily a terminal outcome or a probability.
4. Generating only apparently good moves preserves the full minimax guarantee even if legal moves are omitted without justification.
5. Large branching factors can make breadth-first exploration impractical, while sound pruning can reduce search without changing the relevant minimax result.
6. Deep reinforcement learning learns from experience and rewards; ordinary minimax does not inherently train from past games.

Which statements are correct?

A. 1, 2, 3 and 6  
B. 1, 3, 4 and 6  
C. 2, 4, 5 and 6  
D. 1, 3, 5 and 6

## 6. EL — Sentiment Analysis Practice

### Q21 — Easy

“The phone looks great, but the battery is terrible” contains:

A. Only positive sentiment, because the first clause is positive  
B. Only neutral information, because opposing opinions always cancel  
C. No sentiment, because it describes a product  
D. Mixed aspect-level opinions; the slides assign an overall negative label

### Q22 — Very Tough

Using the original six-word toy lexicon, the 15 slide examples have the following scores, grouped by their **expected** class:

| Expected class | Scores for its five examples |
|---|---|
| Positive | +3, 0, 0, +3, 0 |
| Negative | −3, 0, −2, −2, 0 |
| Neutral | 0, 0, 0, 0, 0 |

Predict positive for scores above zero, negative below zero and neutral for zero. What are **overall accuracy, positive-class recall and neutral-class precision**, respectively?

A. 10/15, 1.00, 1.00  
B. 10/15, 0.40, 0.50  
C. 5/15, 0.60, 0.50  
D. 10/15, 0.50, 0.40

### Q23 — Very Tough

The baseline confusion matrix for the 15 tweets is shown below; rows are expected classes and columns are predictions.

| Expected / predicted | Positive | Negative | Neutral |
|---|---:|---:|---:|
| Positive | 2 | 0 | 3 |
| Negative | 0 | 3 | 2 |
| Neutral | 0 | 0 | 5 |

Now add only `terrible:−2` to the lexicon. This changes **one** expected-negative tweet, “This phone is terrible”, from predicted neutral to predicted negative. Everything else is unchanged. Using $F_1=2TP/(2TP+FP+FN)$, what are the new **accuracy, negative-class recall and macro-F1**, approximately?

A. 11/15, 1.00, 0.8000  
B. 10/15, 0.80, 0.6627  
C. 11/15, 0.80, 0.7249  
D. 12/15, 0.60, 0.7500

### Q24 — Very Tough

**Reset to the original six-word lexicon**: `love:+3, excellent:+3, good:+1, boring:−2, bad:−2, hate:−3`. The tokenizer lowercases and extracts alphabetic English word tokens; unknown words are zero. There is no negation, contrast, emoji or multilingual handling.

Classify these texts:

1. “Wow, my phone crashed again. What a wonderful experience!”
2. “This movie chennagide!”
3. “I love the phone but the battery is bad.”
4. “This is not good.”

Which score vector and interpretation are valid?

A. (0,0,+1,+1). The first two zeros can reflect missing vocabulary; the third is mixed but positive under the sum; the fourth exposes missing negation handling. Context, multilingual/slang coverage and aspect analysis address different limitations.  
B. (+3,+1,−2,−1). The dictionary automatically recognizes sarcasm, Kannada and the word `not`, even though none is implemented.  
C. (0,0,0,0). Every sentence containing either mixed language or mixed opinion must be neutral.  
D. (0,0,+1,+1). These numerical outputs prove the first two texts have no sentiment and the final sentence expresses a favorable opinion.

## 7. EL — Tic-Tac-Toe Using Minimax

### Q25 — Easy

In the included implementation, a nine-element Python list represents positions 1–9. Human X moves first; computer O is MAX. Which statement is correct?

A. Displayed position 5 uses list index 5, and moving first always makes X MAX.  
B. Displayed position 5 uses index 4, but an O win must score −1.  
C. Displayed position 5 uses index 4; O can be MAX even though X moves first.  
D. The board needs ten elements because displayed positions start at 1.

### Q26 — Very Tough

Positions are numbered row-wise from 1 to 9. X occupies **3 and 5**, O occupies **1**, and it is O's turn. Utilities are O win = +1, X win = −1, draw = 0. The search explores every legal continuation.

Which move is uniquely able to avoid a forced loss, and why?

A. Position 7, with value 0: it blocks X's diagonal 3–5–7; each other legal move permits X to win immediately at 7.  
B. Position 9, with value +1: a corner always guarantees an immediate win.  
C. Position 4, with value +1: O has a column threat, so X must ignore its own immediate win.  
D. Position 2, with value 0: minimax averages all replies and assumes X might miss the win.

### Q27 — Very Tough

X occupies **4, 5 and 9**, O occupies **1 and 2**, and O is to move. Full minimax gives these candidate values: move 3 → +1; move 6 → 0; moves 7 or 8 → −1. The implementation checks terminal outcomes after each move.

Which choice and explanation are correct?

A. Play 6; blocking an opponent's threat always has priority over taking an immediate win.  
B. Play 7; because X started, the computer must minimize and choose −1.  
C. Play 3, but the game must continue until all nine cells are filled before declaring the winner.  
D. Play 3; O completes row 1–2–3 immediately, so the game ends before X can complete row 4–5–6.

### Q28 — Very Tough

Review these implementation statements for an O-maximizing Tic-Tac-Toe program:

1. After temporarily placing O in `best_move`, call `minimax(board, False)` because X is next.
2. Temporary moves should remain on the shared board so later candidate moves have more information.
3. Winner detection must occur before declaring a full board a draw, and the main loop must stop when a move ends the game.
4. Index the board before checking whether the entered number is in range; Python will safely interpret every invalid number as an empty cell.
5. With candidates visited in ascending order, strict `>` preserves the first equally good move; changing it to `>=` preserves the last equal-score move and need not change optimal utility.
6. Full minimax without depth bonuses guarantees the best utility, but does not explicitly prefer the fastest win. Every simulated move must be undone before evaluating the next sibling.

Which set is correct?

A. 1, 2, 3 and 5  
B. 1, 3, 5 and 6  
C. 2, 3, 4 and 6  
D. 1, 4, 5 and 6

---

## Answer Key and Explanations

| Section | Easy | Very Tough | Very Tough | Very Tough |
|---|---|---|---|---|
| 1 | 1 — **B** | 2 — **D** | 3 — **A** | 4 — **C** |
| 2 | 5 — **A** | 6 — **B** | 7 — **D** | 8 — **C** |
| 3 | 9 — **C** | 10 — **A** | 11 — **D** | 12 — **B** |
| 4 | 13 — **B** | 14 — **D** | 15 — **A** | 16 — **C** |
| 5 | 17 — **A** | 18 — **C** | 19 — **B** | 20 — **D** |
| 6 — EL | 21 — **D** | 22 — **B** | 23 — **C** | 24 — **A** |
| 7 — EL | 25 — **C** | 26 — **A** | 27 — **D** | 28 — **B** |

1. **B — NLU then NLG.** NLU interprets the enquiry; NLG expresses a response. The intervening decision can use rules, retrieval or a learned model.

2. **D — Match the operation to the level.** Token units are lexical; grammar is syntactic; meaning is semantic; cross-sentence references are discourse; an intended request is pragmatic. NER is a separate entity-identification task.

3. **A — Statements 1, 2, 4 and 6.** Each task produces a distinct kind of output. The named tools match their course roles. Transformers are neural models, while HMMs/CRFs exemplify statistical sequence modeling; these categories are not mutually exclusive layers of the same pipeline.

4. **C — Statements 1, 3 and 4.** Input handling and preprocessing depend on the task; held-out evaluation matters. Deleting sentiment/context cues indiscriminately is unsound. Not every NLP system needs a separate mandatory ML decision block.

5. **A — Counts without order.** Basic unigram BoW records occurrences in a fixed vocabulary order. It is a representation, not a sentiment classifier or a full semantic analysis.

6. **B — $3+1-2=+2$.** `not`, `but` and other unmatched tokens score zero under the stipulated method. VADER uses additional rules and its own lexicon; TextBlob also does not use this exact toy algorithm.

7. **D — Distinguish frequency from document frequency.** D1 contains two `good` tokens, but `good` occurs in only two documents. Its weight is $2\ln(4/2)$. `movie` appears in all four documents, so its IDF is zero under the specified convention. Library defaults can differ.

8. **C — Statements 1, 3, 4 and 5.** Stemming and lemmatization differ; context-aware representations remain imperfect. Using test data to fit vocabulary/IDF leaks information. VADER can use punctuation/capitalization, so blanket removal loses signals.

9. **C — Retrieval.** The system selects from stored responses. A generative component would produce new wording dynamically; the described mechanism does not require one.

10. **A — $1\times(2/5)=0.4$.** `Today is` occurs four times out of four occurrences of `Today`. `is sunny` occurs twice among the five `is` contexts. A bigram conditions the next word only on the immediately previous word; conditioning on `Today is` would use longer context.

11. **D — Separate responsibilities.** Intent/entity processing handles meaning units; dialogue management connects turns; the response component forms/selects the reply. Feedback can support a later update, while a real booking requires an actual action beyond text generation.

12. **B — Statements 1, 3, 4 and 6.** Class labels are not token probabilities; recurrent and Transformer models differ; BERT's bidirectional representations differ from autoregressive generation. Useful chatbot applications can be implemented with different approaches, and availability does not imply use of an LLM.

13. **B — Multiple image labels.** Returning several present categories is multi-label classification. Predicting their locations or pixels would add detection or segmentation.

14. **D — Keep dimensions, pixels and channels separate.** $1920\times1080=2,073,600$ pixels; multiply by three for channel values and, at one byte per channel, bytes. Channels-last means height × width × channels. Values 0–255 provide 256 possibilities per channel.

15. **A — A valid supervised workflow.** $128^2=16,384$ pixels; RGB stores three values per pixel. Image processing prepares/transforms information; classification interprets the label. CNNs can learn features, and separate segmentation is a design choice rather than a universal requirement.

16. **C — Statements 1, 2, 4 and 6.** Visual analysis, recommendation/personalization and anomaly/decision tasks serve different goals across all nine application domains. The slides' additional uses fit those domains. Driver assistance is not equivalent to full autonomy.

17. **A — MIN selects the numerical minimum.** All scores use one perspective. MIN can return a positive value and MAX a negative value when those are their best available choices.

18. **C — Back up from the leaves.** MAX gives 7, 2, −3, 8; MIN gives min(7,2)=2 and min(−3,8)=−3; root MAX selects 2. The leaf 8 cannot be forced through an optimal MIN opponent.

19. **B — Prune a branch that cannot improve the root choice.** The right MIN branch is already bounded above by −3, whereas MAX has 2 elsewhere. The unseen (8,4) sibling cannot make MIN's choice exceed −3; the root decision is unchanged.

20. **D — Statements 1, 3, 5 and 6.** Public randomness is compatible with perfect information; +2/+2 is not zero-sum. Basic deterministic zero-sum minimax needs additional modeling for this game. Heuristics estimate; arbitrary move omission does not preserve a full-search guarantee; reinforcement learning and search are different processes.

21. **D — Mixed aspects.** Appearance is favorable and battery opinion unfavorable. The course's overall negative label does not erase the positive aspect, and mixed sentiment does not automatically mean neutral.

22. **B — Read class totals carefully.** Ten of fifteen predictions are correct. Positive recall is $2/5=0.4$. Ten predictions are neutral, but only five are truly neutral: neutral precision is $5/10=0.5$.

23. **C — Recompute the affected classes.** Accuracy becomes $11/15$. Negative TP becomes 4 and FN becomes 1, giving recall $4/5=0.8$ and F1 $8/9$. Positive F1 remains $4/7$. Neutral FP falls from 5 to 4, so its F1 becomes $10/14=5/7$. Macro-F1 is $(4/7+8/9+5/7)/3=137/189\approx0.7249$.

24. **A — Scores are not guaranteed meanings.** Neither the sarcasm words nor `chennagide` is in the toy dictionary; `love + bad` is $3-2=1$; `not good` scores $+1$ because negation is unimplemented. A differently defined lexicon/model can behave differently. Mixed/aspect, multilingual and sarcasm errors require different kinds of context handling.

25. **C — Index and utility are separate conventions.** Subtract one from displayed positions to index the list. O is MAX because utilities are defined from O's perspective, even though X moves first.

26. **A — Block 7.** X already owns positions 3 and 5, so any O move other than 7 permits an immediate diagonal win. Playing 7 has minimax value 0; a guaranteed draw is better than −1.

27. **D — Win immediately at 3.** O's row 1–2–3 completes the game before X's threatened middle-row win. Blocking at 6 has only value 0, while taking the win has value +1.

28. **B — Statements 1, 3, 5 and 6.** Switch to X after simulating O; stop on terminal outcomes; preserve valid indexing; restore simulated cells. Tie-breaking may change the chosen move without changing its optimal score, and no depth term means equal-utility outcomes are not ranked by speed.
