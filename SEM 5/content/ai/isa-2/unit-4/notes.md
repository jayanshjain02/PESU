# AI Unit 4 — Exam-ready Notes

**Source:** *Ai Unit 4.pdf*, 137 PDF pages, Dr. Rajani S., Department of Computer Applications, PES University. Page references below use the PDF's page numbers.

**Structure:** Seven sections, with Sections 6 and 7 organized as **EL (Experiential Learning)**. The PDF does not explicitly label EL sections; its sentiment exercises and Tic-Tac-Toe demonstration are used for those two sections. Worked calculations and the complete Python implementations are added study aids. Title, repeated divider, and thank-you slides contain no additional syllabus concepts.

| Section | Coverage | PDF pages |
|---|---|---|
| 1 | NLP foundations, components, tasks, levels, workflow, techniques, tools, challenges and applications | 3–30 |
| 2 | Sentiment analysis, preprocessing, features, ML/DL approaches and evaluation | 32–52 |
| 3 | Language models, statistical probabilities, neural models and chatbots | 57–86 |
| 4 | Computer vision, image processing/classification, pixels/RGB and nine application domains | 88–117 |
| 5 | Game categories, adversarial search, minimax, heuristics and pruning | 119–131 |
| 6 — EL | Tweet classification, lexicon implementation, evaluation and difficult sentiment cases | 35–38, 53–55 |
| 7 — EL | Tic-Tac-Toe using minimax: representation, code, trace and viva points | 133–136 |

**How to study:** Learn the definitions and comparison tables first. Practise the lexicon, probability, pixel-count and minimax calculations without looking at the solutions. Then attempt `questions.md`; use `cheat-sheet.md` for the final revision.

## 1. Natural Language Processing (NLP)

### 1.1 Definition, foundations and importance

**Natural Language Processing is a field of AI that enables computers to process, interpret and generate human language in text or speech form.** A system can receive a human question, identify its meaning, decide on a response and express that response in natural language.

NLP combines three areas:

| Area | Contribution |
|---|---|
| Linguistics | Grammar, sentence structure, word meaning, speech and language use |
| Computer science | Algorithms, programming and computational processing of language data |
| Artificial intelligence | Learning patterns, interpreting input and selecting or generating responses |

**Input forms:** Text includes emails, documents, social-media posts, reviews and search queries. Speech includes voice commands, calls and recordings; speech recognition can convert audio to text for later language processing.

**Why NLP matters:** People can communicate with computers using ordinary language; organizations can process large amounts of unstructured text; businesses can extract opinions and improve decisions; applications can automate common language tasks.

“Understanding” here describes useful computational interpretation. It does not mean that the computer has human awareness.

### 1.2 NLU and NLG

| Component | Full form | Main purpose | Shopping example |
|---|---|---|---|
| NLU | Natural Language Understanding | Interpret meaning, intent, entities and context | Recognize that “Can I send this item back?” asks about returns |
| Decision step | Rules, retrieval or a learned model | Decide what information/action is appropriate | Select the store's return-policy information |
| NLG | Natural Language Generation | Express information as human-readable language | “You can return your item within 30 days of receipt.” |

The 30-day policy is the slides' **hypothetical example**. Different questions—“Can I return this product?”, “What is your return policy?” and “How many days do I have?”—can express the same **return-policy intent**.

- **Intent:** What the user wants to accomplish.
- **Entity:** A specific item of information, such as a product, person, place or date.
- **Context:** Information from the situation or previous conversation that affects interpretation.
- **NLG:** Turns selected facts or model outputs into a suitable response; it may use templates or a generative model.

**Exam clarification:** The slides illustrate `NLU → ML decision → NLG`. ML can also operate inside NLU and NLG. It is not a compulsory, separate middle stage in every NLP application; rule-based systems are also possible.

### 1.3 Major NLP tasks

| Task | What it does | Example |
|---|---|---|
| Text classification | Assigns predefined categories to text | Spam/not spam; sports/politics/technology |
| Named Entity Recognition (NER) | Finds named items and classifies their entity types | Rajani → person; PES University → organization; Bengaluru → location |
| Sentiment analysis | Identifies positive, negative or neutral opinion | “Excellent service” → positive |
| Machine translation | Converts meaning from one language into another | English text translated to Kannada |
| Text summarization | Produces a shorter version retaining important information | A paragraph summarizing a long article |
| Text generation | Produces new text from an input or context | An email draft or chatbot reply |

**Distinctions:** NER identifies *who/where/which entity*; intent classification identifies *what the user wants*. Translation changes language; summarization reduces length. Sentiment analysis is a particular text-classification task when the output is a sentiment category.

### 1.4 Five levels of NLP

The slides present lexical, syntactic, semantic, pragmatic and discourse analysis. These are useful analytical levels; practical systems may combine them rather than execute five isolated modules.

| Level | Main question | Explanation and example |
|---|---|---|
| **Lexical analysis** | What words/tokens are present? | Break input into tokens; `I am learning NLP.` → `I`, `am`, `learning`, `NLP` in the simplified example |
| **Syntactic analysis / parsing** | How is the sentence structured? | Identify grammatical relationships: in “The student reads a book”, student is subject, reads is verb, book is object |
| **Semantic analysis** | What does the sentence mean? | Resolve word/sentence meaning; “bank” can refer to a financial institution or river edge |
| **Pragmatic analysis** | What is intended in this situation? | “Can you open the window?” usually requests an action rather than an explanation of ability |
| **Discourse integration** | How do sentences connect? | “Ravi bought a laptop. He likes it.” connects *he* to Ravi and *it* to the laptop |

**Exam trap:** The diagram's “Disclosure Integration” is a wording error; use **discourse integration**. Pragmatics concerns intended meaning in context; discourse concerns links across sentences. Both can contribute to contextual interpretation.

### 1.5 NLP workflow

1. **Collect data:** Reviews, emails, articles, social posts or speech recordings.
2. **Preprocess:** Clean irrelevant markup, normalize where appropriate and tokenize.
3. **Extract/learn features:** Convert text to numerical representations such as counts, TF-IDF or learned representations.
4. **Train a model or apply rules:** Examples in the slides include Naive Bayes, RNNs and Transformers.
5. **Evaluate:** Compare predictions against expected results using suitable measures, including accuracy and F1.
6. **Use on new input:** Apply the fitted processing and model consistently.

For a learned classifier, separate training and test data. Fit the vocabulary and model on training data, then evaluate on unseen test examples. This prevents test information from influencing training.

### 1.6 Techniques and tools

| Approach | Main idea | Examples | Main limitation |
|---|---|---|---|
| Rule-based | Explicit grammar rules, patterns or keywords | A pattern `I am + adjective` recognizes a possible feeling statement | Rules are brittle and expensive to expand |
| Statistical | Estimate probabilities from observed language | Hidden Markov Models (**HMMs**), Conditional Random Fields (**CRFs**) | Depends on model assumptions, features and available data |
| Neural | Learn representations and relationships with neural networks | Recurrent Neural Networks (**RNNs**) | Training/data requirements; predictions can still be wrong |
| Transformer-based | Use attention to relate tokens in context | BERT, GPT | Computational cost and remaining reasoning/context errors |

**Relationship:** Transformers are a type of neural model. These rows describe a progression, not four completely disjoint families. HMMs and CRFs are examples of statistical sequence models; a CRF is not simply a next-word generator.

| Tool named in the slides | Association to remember |
|---|---|
| NLTK — Natural Language Toolkit | Basic NLP processing and educational tools |
| spaCy | NLP pipelines, including named entity recognition |
| Gensim | Topic modeling and related text representations |
| Hugging Face Transformers | Working with pretrained Transformer models |
| Google Cloud NLP / AWS Comprehend | Cloud-based language-analysis services |

The tool list records the course examples; choosing a tool does not by itself determine the quality of a model.

### 1.7 Challenges and applications

| Challenge | Why it is difficult | Slide-style example |
|---|---|---|
| Ambiguity | One word or sentence has multiple interpretations | Bank: money or river |
| Sarcasm | Literal words can oppose the intended opinion | “Wow! You are very early” to someone two hours late |
| Slang/informal language | Vocabulary and spelling vary | Bro, LOL, gonna |
| Multilingual/code-mixed text | A sentence can combine languages and transliteration | “Naanu today college-ge hogbeku” mixes Kannada and English |
| Long context | Meaning can depend on distant words or earlier turns | A pronoun or follow-up question referring to an earlier topic |

**Applications covered in the PDF:** Chatbots; Siri/Alexa/Google Assistant as voice-assistant examples; speech-to-text; translation; spam filtering; sentiment and emotion detection; summarization; text analysis; information retrieval/search; and content recommendation. NLP may be one component of a larger application rather than its entire implementation.

**Exam answer pattern:** Definition → components → tasks → workflow → example → challenge.

## 2. Sentiment Analysis

### 2.1 Definition, labels and uses

**Sentiment analysis identifies the opinion or emotional polarity expressed in text.** The course uses three classes:

| Label | Meaning | Example |
|---|---|---|
| Positive | Favorable opinion | “I love this product!” |
| Negative | Unfavorable opinion | “The service was terrible.” |
| Neutral | No clear positive/negative opinion under the chosen labeling scheme | “The phone has a 6-inch display.” |

The slides label “The food was okay” as neutral. Borderline words such as *okay* can receive different labels under different annotation rules; use the specified course label in that exercise.

**Importance and applications:** Business insights; brand monitoring; understanding chatbot/customer feedback; social-media opinion tracking; product reviews; political opinion mining; customer-service improvement; and movie-rating prediction. A sentiment label summarizes a text's opinion; it does not prove that the opinion or factual claims are correct.

### 2.2 Three approaches

| Approach | How it works | Examples | Strengths | Limitations |
|---|---|---|---|---|
| Lexicon-based | Look up sentiment-bearing words and combine scores | Toy dictionary, VADER, TextBlob's default sentiment analysis | Simple, interpretable starting point; a pretrained lexicon can be used without labeling a new dataset | Missing words, context, sarcasm and domain differences |
| Classical ML | Learn a classifier from labeled examples represented numerically | Logistic Regression, Naive Bayes, SVM, Random Forest | Efficient; learns patterns from examples; scales to many documents | Requires representative labeled training data; basic features can lose meaning/order |
| Deep learning | Learn contextual representations and a prediction function | RNN, LSTM, Transformers such as BERT/RoBERTa | Can represent context and complex language patterns | Training cost, data needs and remaining errors |

No approach guarantees correct sarcasm detection. A suitable classical model can handle some negation through features such as word bigrams; deep learning is not the only way to model it.

### 2.3 Lexicon scoring: exact slide example

| Word | Score |
|---|---:|
| love | +3 |
| excellent | +3 |
| good | +1 |
| boring | −2 |
| bad | −2 |
| hate | −3 |

For this **toy method**, add the scores of recognized word occurrences:

$$S=\sum_{i=1}^{n}\operatorname{score}(w_i).$$

- $S>0$: positive.
- $S<0$: negative.
- $S=0$: neutral under this rule.

**Worked example:** “I love this movie but the ending is boring.” The recognized words are *love* and *boring*, so $S=3-2=1$: **positive overall**, although the sentence expresses mixed opinions about different aspects.

**Limitations:** Unknown words contribute zero in the simple implementation; zero can mean absent vocabulary coverage, cancellation or genuinely neutral wording. “Not good” scores $+1$ if negation is ignored, illustrating a failure.

**VADER:** Valence Aware Dictionary and sEntiment Reasoner, a lexicon-and-rule sentiment method suited to informal text. It incorporates signals such as negation, capitalization, punctuation and intensifiers. Its real algorithm is more than the six-word sum. [NLTK's VADER examples](https://www.nltk.org/howto/sentiment.html).

**TextBlob:** Provides simple Python text-processing operations and sentiment analysis. Its default sentiment result includes **polarity** in $[-1,1]$ and **subjectivity** in $[0,1]$; polarity and subjectivity answer different questions. Its scores are not the same as the toy dictionary's integers. [TextBlob documentation](https://textblob.readthedocs.io/en/dev/quickstart.html#sentiment-analysis).

### 2.4 Preprocessing

| Step | Purpose | Example | Important qualification |
|---|---|---|---|
| Lowercasing | Combine differently capitalized versions | `LOVE` → `love` | Capitalization can express sentiment intensity |
| Cleaning | Remove irrelevant HTML/noise | Remove unwanted markup from a review | Do not assume all punctuation, emojis or hashtags are meaningless |
| Tokenization | Split text into units | `I love this movie` → four word tokens | Real tokenizers may use subwords and preserve punctuation |
| Stop-word removal | Remove selected frequent function words | Removing `the` from `I love the movie` | Preserve useful words such as *not* when needed |
| Lemmatization | Map a word to a dictionary base using morphology/context | `loved` → `love`; `movies` → `movie`; `better` → `good` with appropriate analysis | The result depends on the lemmatizer and part-of-speech information |
| Stemming | Apply heuristic shortening rules | `running` → `run`; `played` → `play`; `happiness` → `happi` with a suitable stemmer | Can produce a non-dictionary stem |

**Stemming versus lemmatization:** Stemming mechanically reduces forms; lemmatization seeks a valid base form. Lemmatization is not merely “chopping words according to a dictionary.”

The slides illustrate simplifying “The movie was AMAZING!!! I loved it, but the ending was boring” to a representation like `movie amazing love end boring`. This is an illustration, not the universally best preprocessing. It loses emphasis and the contrast signaled by *but*.

**Choose preprocessing for the model:** Preserve sentiment cues for VADER; use a pretrained Transformer's expected tokenizer; do not automatically stem, remove stop words and delete all punctuation for every approach.

### 2.5 Feature extraction: Bag-of-Words and TF-IDF

**Bag-of-Words (BoW):** Build a vocabulary and count each vocabulary item's occurrences. A basic unigram BoW representation ignores word order.

Using the exact vocabulary order **[I, love, hate, movies]**:

| Sentence | BoW vector |
|---|---|
| I love movies | [1, 1, 0, 1] |
| I hate movies | [1, 0, 1, 1] |
| I love love movies | [1, 2, 0, 1] |

`CountVectorizer` is a tool for producing count features. **The hand-worked vocabulary above is explicitly specified:** its default configuration lowercases text and keeps tokens of at least two characters, so it would not retain the single-character “I” in exactly this way. [CountVectorizer documentation](https://scikit-learn.org/stable/modules/generated/sklearn.feature_extraction.text.CountVectorizer.html).

**TF-IDF — Term Frequency–Inverse Document Frequency:** Weight a word by its occurrence in a document and its rarity across the document collection. It reduces the relative importance of words that occur in many documents.

For hand calculations in these notes, use the following **added study convention**:

$$\operatorname{TFIDF}(t,d)=\operatorname{count}(t,d)\ln\left(\frac{N}{\operatorname{df}(t)}\right),$$

where $N$ is the number of documents and $\operatorname{df}(t)$ is the number of documents containing $t$. There is **no smoothing or vector normalization** in this convention.

**Example:** In four documents, *good* appears in two and occurs twice in the document being represented. Its weight is $2\ln(4/2)=2\ln 2\approx1.3863$. A word occurring in all four documents has IDF $\ln1=0$ under this convention.

**Exam trap:** Document frequency counts documents, not total word occurrences. BoW and TF-IDF are representations, not classifiers. Library defaults may add smoothing, an offset and normalization, so their numerical output can differ from this formula. [TF-IDF implementation options](https://scikit-learn.org/stable/modules/generated/sklearn.feature_extraction.text.TfidfVectorizer.html).

### 2.6 ML and deep-learning workflow

1. Collect **labeled** tweets, reviews or comments.
2. Split training and test data; set aside validation data when tuning.
3. Apply task-appropriate preprocessing.
4. Obtain BoW/TF-IDF features for classical ML, or model-specific token representations for neural models.
5. Train Logistic Regression, Naive Bayes, SVM, Random Forest or an appropriate neural classifier. KNN is another ML method mentioned in the feature-extraction discussion.
6. Predict positive, negative or neutral for unseen examples.
7. Evaluate predictions and inspect errors.

Classical ML benefits from useful features and representative examples. Neural systems learn representations, but they still require input preparation and a task-appropriate prediction setup.

| Neural model | Key point |
|---|---|
| RNN | Processes sequential information through a recurrent state |
| LSTM — Long Short-Term Memory | A gated recurrent architecture designed to retain useful information over longer sequences |
| BERT — Bidirectional Encoder Representations from Transformers | Uses left and right context to form language representations; can be fine-tuned for classification |
| RoBERTa — Robustly Optimized BERT Pretraining Approach | Refines BERT pretraining through training/data choices; it is not a guarantee of superiority on every dataset |

In “I went to the bank to deposit money”, context helps choose the financial meaning of *bank*. Models can also learn that “not bad” often expresses a favorable opinion, but the result depends on context and training.

The BERT and RoBERTa distinctions follow their original papers: [BERT](https://aclanthology.org/N19-1423/) and [RoBERTa](https://arxiv.org/abs/1907.11692). Large neural-model training commonly benefits from GPUs and can take substantial time; this does not mean every model or inference task requires a GPU.

### 2.7 Evaluation measures

For one chosen class, treat that class as positive and all other classes as negative for the calculation:

- **TP:** Correctly predicted members of that class.
- **FP:** Other-class examples incorrectly predicted as that class.
- **FN:** True members of that class assigned elsewhere.

$$\text{Accuracy}=\frac{\text{number correct}}{\text{number tested}}$$

$$\text{Precision}=\frac{TP}{TP+FP},\qquad
\text{Recall}=\frac{TP}{TP+FN},\qquad
F_1=\frac{2TP}{2TP+FP+FN}.$$

**Precision:** Of the examples predicted as the class, how many are correct? **Recall:** Of the real examples of the class, how many were found? **F1:** Balances precision and recall.

For several classes, report per-class measures; **macro-F1** is the unweighted average of the class F1 values. State a convention if a denominator is zero. Accuracy alone can conceal poor performance on a minority class. Section 6 gives a complete three-class calculation.

## 3. Language Models and Chatbots

### 3.1 Language-model definition and uses

**A language model learns patterns in language and models the probability of tokens or token sequences.** A common application is predicting the next word/token from the previous context: “I like to drink …” might be completed with *coffee*, *tea* or *water*.

**Applications in the slides:** Speech recognition; chatbot responses; search autocomplete; machine translation; email/text generation; summarization; question answering; and language representations used in sentiment analysis.

A likely completion is a statistical prediction, not proof that its factual content is true. “Teach computers to think in words” is an analogy, not a literal definition.

### 3.2 Statistical language models and bigrams

A statistical language model estimates language probabilities from a corpus. A **bigram** is a pair of consecutive words. The bigram approximation predicts the next word from the immediately preceding word.

For “I love artificial intelligence”, the bigrams are:

| Position | Bigram |
|---|---|
| 1 | I love |
| 2 | love artificial |
| 3 | artificial intelligence |

The unsmoothed relative-frequency estimate is:

$$P(w_2\mid w_1)=\frac{C(w_1,w_2)}{C(w_1)}.$$

Here the denominator is the count of the conditioning word as a possible predecessor; the slide examples avoid end-of-sentence ambiguity. In a complete model, sentence-boundary handling must be defined.

**Exact slide corpus:**

1. Today is sunny
2. Today is beautiful
3. Today is Monday
4. Today is cloudy
5. Tomorrow is sunny

| Quantity | Count/calculation | Result |
|---|---|---:|
| Today | 4 | 4 |
| Today is | 4 | 4 |
| $P(\text{is}\mid\text{Today})$ | $4/4$ | 1 |
| is | 5 | 5 |
| is sunny | 2 | 2 |
| $P(\text{sunny}\mid\text{is})$ | $2/5$ | 0.4 |
| $P(\text{beautiful}\mid\text{is})$ | $1/5$ | 0.2 |
| $P(\text{Monday}\mid\text{is})$ | $1/5$ | 0.2 |
| $P(\text{cloudy}\mid\text{is})$ | $1/5$ | 0.2 |

**Worked continuation:** Under this bigram model, the conditional probability of generating `is sunny` after `Today` is $1\times0.4=0.4$. It is **not** $1/4$: that would use the longer context `Today is`, a different conditioning choice.

**Limitations:** Limited context, data sparsity and zero probabilities for unseen transitions without smoothing. Smoothing is an extension for handling unseen events; it is not used in the slide calculation.

### 3.3 Classical ML, neural models and LLMs

The slides group language methods as statistical, machine-learning-based and deep-learning-based.

| Group in the slides | Examples | What to remember |
|---|---|---|
| Statistical | Count/probability-based bigram models | Estimate next-word probabilities from occurrences |
| Classical ML language applications | Naive Bayes, Logistic Regression, SVM with BoW/TF-IDF | Efficient text-classification methods in the sentiment example |
| Deep learning | RNN, LSTM, GRU, Transformers | Learn representations and contextual relationships |
| Large Language Models (LLMs) | GPT, Gemini, Claude, Llama named as examples | Large neural language models trained on extensive data |

**Technical clarification:** A sentiment classifier maps text to a class, whereas a language model models language-token/sequence probabilities. Calling a BoW + SVM sentiment classifier a “language model” uses the term loosely. Also, deep learning is a subset of machine learning; the slide categories overlap.

**GRU** means Gated Recurrent Unit. LSTM and GRU are recurrent architectures designed to manage information flow; Transformers use attention. BERT uses bidirectional context for representation learning, while a GPT-style autoregressive generator predicts following tokens from preceding tokens. Do not assume all neural language models generate text in the same way.

### 3.4 What is a chatbot?

**A chatbot is software that interacts with users through text or voice and provides responses.** It may use rules, retrieval, learned models or combinations of them. Not every chatbot needs an LLM.

Examples in the slides include WhatsApp bots, voice assistants, student-course enquiry bots and customer-support bots. A course bot may answer “We offer BCA and MCA programs” to an enquiry.

**Benefits:** Around-the-clock availability; quick responses to FAQs; reduced repetitive workload; improved access to support; applications in education, healthcare and e-commerce. These benefits depend on the quality and scope of the implementation.

**Basic operation:** Receive text/speech → process the message and intent → choose or generate a response → display or speak it. A weather response requires reliable weather data if it is to describe actual conditions.

### 3.5 Three types of chatbots

| Type | Mechanism | Example | Advantages | Limitations |
|---|---|---|---|---|
| Rule-based | Predefined patterns, keywords or if/else rules | “Hi” triggers a fixed greeting | Simple, predictable and easy to build for narrow tasks | Unanticipated wording and complex contexts can fail |
| Retrieval-based | Select a suitable stored response, often using intent classification | Retrieve library timings from a predefined response set | Controlled responses; can support context when designed to do so | Limited by available responses and retrieval quality; learned intent models need labeled examples |
| Generative | Create a response dynamically using a language model and conversation context | Generate a new joke or explanation | Flexible, natural and varied conversations | Can produce incorrect information; model development can require substantial data/compute |

**Retrieval example:** “Book me a ticket to Mysore” → intent `book_ticket`, entity `Mysore`. “What are the library timings?” → intent `Library_Timing`, retrieve “9 AM to 5 PM” in the hypothetical course example.

The slides name **Rasa** and **Dialogflow** as conversational-development tools. Treat them as platform examples, not as proof that every bot built with them is exclusively retrieval-based. Retrieval and generative methods can also be combined in a system.

**Exam trap:** A fixed greeting does not prove an entire bot is rule-based; inspect how responses are chosen across the system. Context awareness is a capability, not a guarantee attached to the label “retrieval” or “generative.”

### 3.6 Four components of a chatbot

| Component | Responsibility | Example |
|---|---|---|
| Input processing | Tokenization, intent detection and entity recognition | Extract `book_ticket` and `Mysore` |
| Dialogue management | Maintain conversation context and decide the next step | Ask for destination if the user only says “I want to book a ticket” |
| Response generation/selection | Produce the user-facing reply through a template, retrieval or generation | Ask “Where do you want to go?” or return the stored timings |
| Feedback learning/improvement | Use recorded feedback and new data to improve later behavior | Add examples, correct stored answers, improve classification or retrain |

**Worked multi-turn interpretation:**

1. User: “I want to book a ticket.” Intent is known, destination is missing.
2. Bot asks for the destination; dialogue management controls this follow-up.
3. User: “Mysore.” Entity recognition extracts the place; dialogue state links it to the earlier booking request.
4. The response component forms the next reply.

Feedback does **not** automatically retrain a deployed model after every incorrect answer. Developers or a configured learning process must use it. Generating “Your ticket is booked” is also not evidence that a booking operation was actually completed; an action-capable system needs an appropriate backend operation.

### 3.7 Chatbot applications

| Domain | Uses in the slides |
|---|---|
| Customer support | Banking, retail and telecom FAQs/service assistance |
| Healthcare | Patient support and symptom-checker interfaces |
| Education | Student assistants, course enquiries and learning support |
| E-commerce | Shopping recommendations and order/product enquiries |
| Personal use | Virtual assistants and routine enquiries |

**Exam answer pattern:** Definition → input-to-output flow → three chatbot types → four components → application and limitation.

## 4. Computer Vision, Image Classification and Real-world AI

### 4.1 Computer vision: definition and operation

**Computer vision (CV) is a field of AI concerned with interpreting useful information from images and videos.** A computer processes numerical pixel values and visual patterns; it does not literally see as a person does.

**Basic workflow:** Capture image/video → process numerical image data → detect patterns or objects → output an interpretation or decision.

| Example | Visual input and interpretation |
|---|---|
| Face unlock | Compare features in a captured face with the enrolled face |
| Driving assistance/autonomous-vehicle perception | Identify pedestrians, vehicles, traffic signs, lanes and obstacles |
| Barcode scanner | Decode a visual pattern to identify an item |
| Medical imaging | Analyze patterns in scans to support diagnosis |
| Retail | Recognize items for automatic checkout |
| Agriculture | Analyze plants for signs of disease |
| Traffic/security cameras | Detect relevant objects or activity |

### 4.2 Image processing versus computer vision

**Image processing** uses algorithms to modify, enhance, analyze or extract information from a digital image. It helps address noise, poor lighting, low contrast, blur or irrelevant background objects.

| Point | Image processing | Computer vision |
|---|---|---|
| Main emphasis | Prepare, transform or analyze image data | Interpret visual content |
| Examples | Denoising, resizing, brightness/contrast adjustment, edge detection, segmentation | Recognize a person, identify a face, infer an activity |
| Typical outcome | An improved image or useful image-derived information | A label, object location, identity or other interpretation |
| Relationship | Often provides foundational operations | Can combine image processing, features, ML and deep learning |

These fields overlap. It is too rigid to claim that image processing **always** outputs an image or that segmentation belongs exclusively to one field.

### 4.3 Pixels, RGB and image planes

A **pixel** is an individual element of a digital image, represented by numerical intensity/color values.

- An image with width $W$ and height $H$ contains $W\times H$ pixels.
- A grayscale image commonly stores one intensity per pixel.
- An RGB image has **three channels**: red, green and blue.
- In the slides' **8-bit-per-channel RGB** representation, each channel is an integer from 0 through 255: **256 possible values**.
- The red plane stores every pixel's red intensity; the green and blue planes do the corresponding jobs. Combining the three values at the same position produces one pixel's RGB color.

| RGB tuple | Color |
|---|---|
| (255, 0, 0) | Red |
| (0, 255, 0) | Green |
| (0, 0, 255) | Blue |
| (255, 255, 255) | White |
| (0, 0, 0) | Black |
| (128, 128, 128) | Gray |

The slide's plane diagram also illustrates pixels assembled as $(255,0,255)$ and $(127,255,0)$ from the corresponding entries in three planes.

$$\text{Possible RGB tuples}=256^3=16,777,216.$$

**Worked counts:**

| Image | Pixel count | Channel-value count for RGB |
|---|---:|---:|
| 28 × 28 | 784 | 2,352 |
| 128 × 128 | 16,384 | 49,152 |
| Width 1920, height 1080 | 2,073,600 | 6,220,800 |

A common **channels-last array** for the last image has shape **(1080, 1920, 3)**. Other software may arrange channels differently; state the convention. Each individual color plane has shape (1080, 1920).

With exactly one byte per channel, the raw RGB payload is 6,220,800 bytes, excluding metadata and compression. This is **not** the size of every JPEG/PNG file containing that image. Three channels do not mean three times as many spatial pixels or a three-dimensional scene.

### 4.4 Image classification

**Image classification assigns one or more class labels to an image.** The cats-versus-dogs example is supervised learning because training images are paired with known labels.

| Task | Output | Example |
|---|---|---|
| Single-label classification | One class for an image | Dog |
| Multi-label classification | Several labels can apply to one image | Cat, dog and rabbit |
| Object detection | Object classes plus locations | Boxes around the cat and dog |
| Segmentation | Pixel/region membership | Separate the animal's pixels from the background |

The PDF's multi-label illustration draws boxes around animals. **Labels identify what is present; predicting the boxes is localization/detection**, an additional requirement beyond ordinary image classification.

### 4.5 Complete image-classification workflow

| Step | Purpose | Cats/dogs or leaf example |
|---|---|---|
| 1. Acquisition | Collect/capture images | Camera images, satellite images or medical-device images; labeled cats/dogs |
| 2. Preprocessing | Make inputs suitable and consistent | Denoise, resize to 128 × 128, normalize numerical values |
| 3. Enhancement | Make useful visual information clearer | Adjust brightness/contrast of a dark image |
| 4. Segmentation | Identify the region of interest | Separate animal/leaf from background |
| 5. Feature extraction | Represent useful visual patterns numerically | Shape, edges, texture, color, facial/structural patterns |
| 6. Classification/training | Learn the mapping from representations to labels | Train an ML classifier using known cat/dog labels |
| 7. Prediction/recognition | Apply the trained system to a new image | Produce Cat or Dog |
| Evaluation | Measure performance on held-out labeled images | Compare predictions with true labels and calculate accuracy |

**Leaf diagram from the slides:** Original leaf photo → remove noise/resize → improve contrast/brightness → isolate the leaf → extract shape, texture and color. These operations prepare the information needed by a classifier.

**Classical versus deep learning:** A classical approach often uses human-designed feature extraction followed by a trained classifier. A **CNN (Convolutional Neural Network)** can learn visual features and classification jointly from training data. The input is already numerical pixels; feature extraction transforms these into more useful representations rather than “turning a non-numerical image into numbers” for the first time.

Segmentation and separate enhancement are useful choices, not mandatory standalone stages in every CNN system. Test images must not influence training; a correct result on the training images alone does not demonstrate generalization.

**Dataset resource listed in the PDF:** [Cats and Dogs Image Classification on Kaggle](https://www.kaggle.com/datasets/samuelcortinhas/cats-and-dogs-image-classification). The slides provide a link, not a completed training run or an accuracy result.

### 4.6 Nine real-world AI application domains

The following table covers all the application topics in pages 109–117. Company names are **examples named in the teaching slides**, not a survey of their current product offerings.

| Domain | Concepts and use cases to remember | Named example in slides |
|---|---|---|
| **Healthcare** | Disease prediction/diagnosis; X-ray, CT, MRI and ultrasound analysis; drug discovery and vaccine development; virtual health assistants; personalized treatment recommendations | IBM Watson Health, a historical course example |
| **E-commerce** | Product recommendation; customer-behavior analysis; demand-based dynamic pricing; product-query and order-support chatbots | Amazon, Flipkart |
| **Education** | Personalized learning; adaptive assessments; automated grading and feedback; AI tutors/virtual classrooms; predicting student performance with learning analytics | Duolingo |
| **Business and finance** | Anomaly-based fraud detection; credit scoring and risk assessment using income, existing loans and repayment history; customer-service bots; business predictive analytics; algorithmic trading | American Express |
| **Manufacturing** | Predictive maintenance from IoT/machine-condition data; image-based inspection for cracks, scratches, incorrect shapes or damaged parts; supply-chain/stock optimization; robotic assembly, welding and packaging | Siemens |
| **Transportation** | Vehicle perception/navigation; traffic prediction; route optimization; autonomous delivery drones/robots; traffic signals adjusted from real-time density | Tesla Autopilot, with the clarification below |
| **Media and entertainment** | Content recommendations from viewing/search/like history; automatic subtitles; deepfake detection; content moderation; game-character behavior | Netflix, YouTube |
| **Agriculture** | Drone-based crop-health, disease and pest monitoring; weather/soil prediction; irrigation based on moisture; smart tractors; harvesting robots that recognize ripe produce | John Deere |
| **Security and defense** | CCTV surveillance and threat detection; unusual movement/unauthorized-entry alerts; cybersecurity intrusion detection; airport/border facial recognition; surveillance drones providing imagery | AI-based border-security systems |

**Examples that explain the mechanism:** Unusual transactions can trigger fraud review; changing machine signals can indicate maintenance needs; soil-moisture measurements can guide irrigation; a camera can help a robot locate ripe strawberries. A simple threshold-controlled pump alone is automation; the broader system needs inference/learning to support a meaningful AI claim.

**Correction to the transportation example:** Tesla describes Autopilot as driver assistance requiring active supervision; do not call it a fully autonomous driving system. [Tesla's official explanation](https://www.tesla.com/en_AE/support/autopilot).

For exam answers, identify **input → AI technique → useful output**. Example: factory image → visual defect recognition → flag a damaged component. Applications are intended uses, not guarantees that every prediction or automated decision is correct.

## 5. Game Playing and Minimax

### 5.1 Why games are useful for AI

**AI game playing develops algorithms that select strategic moves in a defined game environment.** Games provide clear rules, legal actions, success/failure conditions and repeatable evaluation.

A game can be described using its **state**, player to move, legal moves, transition rules, terminal conditions and utilities. Although the rules may be simple, effective play can require deep search and strong evaluation; the statement that games require little knowledge should not be read as “games are always easy.”

### 5.2 Three independent classifications of games

| Dimension | Type | Meaning | Example in slides |
|---|---|---|---|
| Chance | Deterministic | The state and chosen action determine the next state | Chess |
| Chance | Stochastic | Randomness influences play/transitions | Backgammon, dice games |
| Payoffs | Zero-sum | One player's gain is balanced by another's loss | Chess modeled with +1/−1, and 0/0 for a draw |
| Payoffs | Non-zero-sum | Outcomes need not sum to zero; interests can partly align or conflict | Prisoner's Dilemma |
| Information | Perfect information | Players know the full game state and prior moves relevant to play | Chess |
| Information | Imperfect information | Relevant information is hidden from some players | Poker: opponents' cards are hidden |

**These are separate axes:** A stochastic game can still have perfect information about the current state. Hidden information is not the same as a random event. Tic-Tac-Toe is deterministic, perfect-information and normally modeled as zero-sum.

### 5.3 Search in games

A **game tree** represents states as nodes and legal moves as edges. Levels alternate between players. The **branching factor** is the number of available actions per state; the depth is the number of move steps explored.

Breadth-first search can become expensive when the branching factor and depth are large. It is not mathematically impossible to use BFS, but exhaustive breadth-first exploration is often impractical and does not alone specify how to respond to an adversary.

The slides emphasize generating promising moves and exploring good moves early. **Move ordering** can improve efficiency; omitting legal moves without a sound argument can change the result and lose the guarantee of full search.

| Method | Main role |
|---|---|
| Minimax | Choose a move against an opponent assumed to play optimally |
| Alpha-beta pruning | Avoid searching branches that cannot affect the minimax decision |
| Heuristic evaluation | Estimate the quality of a nonterminal position when full search is impractical |
| Deep reinforcement learning | Learn strategies from actions, outcomes and rewards through repeated experience |

Minimax itself is a search procedure; it does not require a training dataset. A system can combine learned evaluation with search.

### 5.4 Minimax: principle and assumptions

**Minimax chooses the move with the best guaranteed outcome against an optimal opponent.** The basic version applies naturally to two-player, alternating-turn, deterministic, perfect-information, zero-sum games such as Tic-Tac-Toe, chess and checkers.

- **MAX** selects the largest value.
- **MIN** selects the smallest value.
- **Every value is measured from the same player's perspective: MAX's.**

A simple terminal utility is **+1 for a MAX win, −1 for a MAX loss and 0 for a draw**. MIN does not switch the sign convention at its nodes; it minimizes MAX's utility.

For state $s$:

$$V(s)=\begin{cases}
U(s),&s\text{ is terminal},\\
\max_{a\in A(s)}V(\operatorname{Result}(s,a)),&\text{MAX to move},\\
\min_{a\in A(s)}V(\operatorname{Result}(s,a)),&\text{MIN to move}.
\end{cases}$$

**Procedure:** Generate legal moves → search opponent responses → evaluate terminal states → back up values using alternating min/max → choose the best root move.

The tree is searched downward, but values are **calculated upward**. A large favorable leaf is not enough: an optimal opponent may steer the game elsewhere.

### 5.5 Worked solution: colored terminal tree on page 127

The PDF labels **R as MAX** and **B as MIN**. Red leaves mean R wins ($+1$), blue leaves mean B wins ($-1$), and gray means draw ($0$).

Reading the four bottom MAX nodes from left to right:

| Bottom MAX node | Terminal colors | Numeric values | Backed-up maximum |
|---|---|---|---:|
| 1 | Red, gray | +1, 0 | +1 |
| 2 | Red, blue | +1, −1 | +1 |
| 3 | Blue, blue | −1, −1 | −1 |
| 4 | Red, blue | +1, −1 | +1 |

- Left MIN node: $\min(1,1)=1$.
- Right MIN node: $\min(-1,1)=-1$.
- Root MAX: $\max(1,-1)=1$.

**Decision:** Choose the left subtree; R can force a win in this illustrated tree.

### 5.6 Worked solution: numerical tree on pages 129–131

The levels are **MAX → MIN → MAX → leaves**. The eight leaves, grouped under their four immediate MAX parents, are:

| Bottom MAX node | Two leaf values | MAX value |
|---|---|---:|
| A | −3, 7 | 7 |
| B | 2, −1 | 2 |
| C | −7, −3 | −3 |
| D | 8, 4 | 8 |

The left MIN parent contains A and B; the right MIN parent contains C and D.

| Higher node | Calculation | Value |
|---|---|---:|
| Left MIN | min(7, 2) | 2 |
| Right MIN | min(−3, 8) | −3 |
| Root MAX | max(2, −3) | **2** |

**Best root move: left.** It guarantees 2 under optimal play. Choosing the right branch because it contains leaf 8 would be incorrect: MIN can choose the child valued −3.

**Critical correction:** MAX does not “choose a positive value”; it chooses the **largest available value**, which may be negative. MIN chooses the **smallest available value**, which may be positive. Thus MAX selects −3 over −7, and MIN selects 2 over 7.

### 5.7 Heuristics and alpha-beta pruning

A **terminal utility** records an actual game outcome. A **heuristic evaluation** estimates the quality of a nonterminal board when search stops at a depth limit. Chess evaluations may consider material and position and use numbers larger than ±1. An evaluation score is not automatically a probability or a guaranteed final outcome.

**Alpha-beta intuition:** Keep bounds describing choices already available to the players. If a branch cannot improve the relevant choice, stop exploring that branch. With the same leaf evaluations, correct alpha-beta pruning preserves the minimax root value; it changes the work performed.

**Added worked example using the numerical slide tree:** Search left-to-right. After evaluating the left subtree, MAX already has a guaranteed value of 2. In the right subtree, the first bottom MAX node returns −3. The right MIN node can therefore ensure a value at most −3, which cannot improve MAX's available 2. The entire sibling subtree containing leaves **8 and 4** can be pruned. The root still returns **2**.

**Viva points:**

- Minimax assumes optimal opposing play; it does not average opponent moves.
- A draw can be the best guaranteed outcome; minimax does not promise a win.
- Full minimax becomes expensive in large games; pruning and depth-limited evaluation help.
- Random events or hidden information require additional modeling beyond this basic deterministic minimax setup.

## 6. EL — Sentiment Analysis Practice

### 6.1 Aim, method and expected learning

**Aim:** Apply sentiment classification to the PDF's tweet examples, calculate transparent lexicon scores and explain failures involving vocabulary, sarcasm, mixed opinions, code-mixing and slang.

**Method for the worked calculations:** Use only the six-word dictionary from Section 2; lowercase the text; extract English alphabetic word tokens; count every matching occurrence; assign unknown words zero; classify by the sign of the sum. There is **no stemming, negation handling, emoji analysis or sarcasm detection** in this deliberately simple exercise.

The expected labels below come from the slides. The scores and predictions are **newly calculated study results**, not outputs claimed for VADER, TextBlob or a trained model.

### 6.2 Complete 15-example slide dataset

Emojis are retained in the example text where present; the toy tokenizer ignores them.

| No. | Tweet | Expected label | Toy score | Toy prediction | Correct? |
|---:|---|---|---:|---|---|
| 1 | I love this movie! ❤️ | Positive | +3 | Positive | Yes |
| 2 | This phone is amazing! 🔥 | Positive | 0 | Neutral | No |
| 3 | Had a great day with my friends 😊 | Positive | 0 | Neutral | No |
| 4 | The food was excellent! | Positive | +3 | Positive | Yes |
| 5 | Wow, this is awesome!!! | Positive | 0 | Neutral | No |
| 6 | I hate this movie. 😡 | Negative | −3 | Negative | Yes |
| 7 | This phone is terrible. | Negative | 0 | Neutral | No |
| 8 | Very bad service today. | Negative | −2 | Negative | Yes |
| 9 | The food was boring and tasteless. | Negative | −2 | Negative | Yes |
| 10 | Worst experience ever! | Negative | 0 | Neutral | No |
| 11 | The movie was okay. | Neutral | 0 | Neutral | Yes |
| 12 | I went to college today. | Neutral | 0 | Neutral | Yes |
| 13 | The phone has a 6-inch display. | Neutral | 0 | Neutral | Yes |
| 14 | The match starts at 7 PM. | Neutral | 0 | Neutral | Yes |
| 15 | I bought a new laptop yesterday. | Neutral | 0 | Neutral | Yes |

**Why errors occur:** The tiny lexicon lacks *amazing*, *great*, *awesome*, *terrible* and *worst*. A zero score is therefore not proof of neutral sentiment. The dataset contains five examples of each expected class.

### 6.3 Small Python implementation

**Added study implementation:** Standard-library Python; save this block as `sentiment.py` if you want to run it with `python sentiment.py`.

```python
import re

LEXICON = {
    'love': 3, 'excellent': 3, 'good': 1,
    'boring': -2, 'bad': -2, 'hate': -3
}


def classify(text):
    words = re.findall(r'[a-z]+', text.lower())
    score = sum(LEXICON.get(word, 0) for word in words)
    label = 'Positive' if score > 0 else 'Negative' if score < 0 else 'Neutral'
    return score, label


if __name__ == '__main__':
    examples = [
        'I love this movie but the ending is boring.',
        'This phone is amazing!',
        'This is not good.'
    ]
    for text in examples:
        print(text, '->', classify(text))
```

Expected outputs for the three examples are respectively **(1, Positive)**, **(0, Neutral)** and **(1, Positive)**. The final example is intentionally an incorrect interpretation: ignoring *not* reverses the intended sentiment.

**Explain the code:** `lower()` normalizes case; `findall()` produces tokens; dictionary lookup returns the known score or zero; `sum()` combines occurrences; the conditional expression selects the label. This implementation has no learned parameters and requires no training step.

### 6.4 Evaluation of all 15 examples

The confusion matrix uses **rows = expected class** and **columns = predicted class**:

| Expected / predicted | Positive | Negative | Neutral | Total |
|---|---:|---:|---:|---:|
| Positive | 2 | 0 | 3 | 5 |
| Negative | 0 | 3 | 2 | 5 |
| Neutral | 0 | 0 | 5 | 5 |
| Total predicted | 2 | 3 | 10 | 15 |

$$\text{Accuracy}=\frac{2+3+5}{15}=\frac{10}{15}=66.67\%.$$

| Class | TP | FP | FN | Precision | Recall | F1 |
|---|---:|---:|---:|---:|---:|---:|
| Positive | 2 | 0 | 3 | 1.00 | 0.40 | 0.5714 |
| Negative | 3 | 0 | 2 | 1.00 | 0.60 | 0.7500 |
| Neutral | 5 | 5 | 0 | 0.50 | 1.00 | 0.6667 |

Macro-F1 is $(0.5714+0.7500+0.6667)/3\approx0.6627$.

**Interpretation:** Every positive/negative prediction happens to be correct, but the method misses many genuinely positive/negative examples. All neutral examples are found, yet half of the neutral predictions are wrong. This demonstrates why precision, recall and accuracy are different.

These are results on a **15-example teaching set**, not evidence of general real-world accuracy. If the lexicon is tuned using these examples, evaluate future performance on separate held-out examples.

### 6.5 Difficult cases from the slides

| Case | Slide example and expected interpretation | What to explain |
|---|---|---|
| Sarcasm | “Wow, my phone crashed again. What a wonderful experience!” 🙄 → negative intended meaning | Positive wording conflicts with an unpleasant event and sarcastic tone |
| Mixed emotion | “I am happy, but I am also worried about the exam” → slide's overall label: negative | Both favorable and unfavorable feelings appear; mixed does not automatically mean neutral or negative |
| Kannada-English code-mixing | “This movie chennagide!” ❤️ → positive | An English-only vocabulary may miss the Kannada word expressing a favorable opinion |
| Mixed aspects | “The phone looks great, but the battery is terrible” → slide's overall label: negative | Appearance is positive; battery opinion is negative; aspect-level analysis preserves both |
| Slang/informal expression | “I am very happy today maga!” → positive | Informal wording and intensification should be interpreted in context |

**Important distinction:** The six-word toy lexicon contains neither *wonderful* nor *crashed*, so it returns **zero/neutral** on that sarcasm example. The slide's warning that a simple lexicon could predict positive assumes a different lexicon containing *wonderful*. Do not mix the assumptions of the two examples.

Mixed sentiment means **both positive and negative opinions are present**; an overall label depends on the annotation policy and weighting. Aspect-based analysis could preserve “appearance: positive; battery: negative” rather than collapsing both into one label.

### 6.6 How to explain improvements in an exam or viva

| Failure | Possible improvement | Remaining limitation |
|---|---|---|
| Unknown sentiment words | Expand domain vocabulary or learn from labeled examples | New words and domain shifts remain possible |
| Negation | Model phrases/context such as `not good` | Long-distance or complex negation is harder |
| Lost emphasis | Preserve useful capitalization, punctuation and emojis | Their meaning is context-dependent |
| Sarcasm | Use broader context and suitable contextual training data | No model guarantees all sarcasm will be recognized |
| Code-mixing/slang | Use relevant multilingual/transliterated data and representations | Coverage and spelling variation still matter |
| Mixed aspects | Identify the aspect and sentiment separately | More detailed annotation/modeling is needed |

**EL conclusion:** Lexicon scoring is easy to inspect, but vocabulary coverage and context control its usefulness. Always distinguish the expected label, the model's prediction and the reason for an error.

## 7. EL — Tic-Tac-Toe Using Minimax

### 7.1 Aim and game representation

**Aim:** Build and explain a two-player Tic-Tac-Toe game in which the human is **X** and the computer is **O**, using minimax for the computer's moves.

The PDF shows the interaction and sample moves, but not a complete source listing. The runnable implementation below is an **added study implementation** matching that demonstration.

Use positions 1–9:

| 1 | 2 | 3 |
|---|---|---|
| 4 | 5 | 6 |
| 7 | 8 | 9 |

- Represent the board as a list of nine cells; a space means empty.
- Displayed position $p$ corresponds to Python index $p-1$.
- X moves first; alternate legal moves into empty cells.
- A win is three identical marks in any of **eight lines**: three rows, three columns or two diagonals.
- A full board without a winner is a draw.

**Winning positions:** Rows (1,2,3), (4,5,6), (7,8,9); columns (1,4,7), (2,5,8), (3,6,9); diagonals (1,5,9), (3,5,7).

### 7.2 Utility and recursive reasoning

For this program, **O is MAX** and **X is MIN**. Moving first does not make X the maximizer; the maximizer is determined by the chosen utility perspective.

| Terminal outcome | Score from O's perspective |
|---|---:|
| O wins | +1 |
| X wins | −1 |
| Draw | 0 |

**How minimax reasons:**

1. Check whether the current board is terminal; return its score immediately.
2. For each empty cell, make a temporary move for the player whose turn it is.
3. Recursively evaluate the resulting board with the other player's turn.
4. **Undo the temporary move.**
5. Return the largest score for O or the smallest score for X.
6. At the real computer turn, select the move with the best resulting score.

Undoing moves is essential because the same list is reused during search. Without restoration, later branches inherit moves that were never actually played.

### 7.3 Complete Python program

Save this code as `tictactoe.py` and run `python tictactoe.py`. It uses only Python's standard features. Empty cells display their available position numbers.

```python
WIN_LINES = (
    (0, 1, 2), (3, 4, 5), (6, 7, 8),
    (0, 3, 6), (1, 4, 7), (2, 5, 8),
    (0, 4, 8), (2, 4, 6)
)


def result(board):
    for a, b, c in WIN_LINES:
        if board[a] != ' ' and board[a] == board[b] == board[c]:
            return board[a]
    return 'Draw' if ' ' not in board else None


def minimax(board, maximizing):
    outcome = result(board)
    if outcome is not None:
        return {'O': 1, 'X': -1, 'Draw': 0}[outcome]

    best = float('-inf') if maximizing else float('inf')
    player = 'O' if maximizing else 'X'
    for i in range(9):
        if board[i] == ' ':
            board[i] = player
            score = minimax(board, not maximizing)
            board[i] = ' '
            best = max(best, score) if maximizing else min(best, score)
    return best


def best_move(board):
    if result(board) is not None:
        return None
    best_score, move = float('-inf'), None
    for i in range(9):
        if board[i] == ' ':
            board[i] = 'O'
            score = minimax(board, False)
            board[i] = ' '
            if score > best_score:
                best_score, move = score, i
    return move


def show(board):
    cells = [cell if cell != ' ' else str(i + 1)
             for i, cell in enumerate(board)]
    for row in range(0, 9, 3):
        print(' | '.join(cells[row:row + 3]))
    print()


def play():
    board = [' '] * 9
    print('You are X. Computer is O. X moves first.')
    show(board)
    while result(board) is None:
        try:
            move = int(input('Enter your move (1-9): ')) - 1
        except ValueError:
            print('Enter a whole number from 1 to 9.')
            continue
        if not 0 <= move < 9 or board[move] != ' ':
            print('Choose an empty position from 1 to 9.')
            continue
        board[move] = 'X'
        show(board)
        if result(board) is not None:
            break
        move = best_move(board)
        board[move] = 'O'
        print('Computer chose:', move + 1)
        show(board)
    outcome = result(board)
    print('Draw!' if outcome == 'Draw' else outcome + ' wins!')


if __name__ == '__main__':
    play()
```

### 7.4 Function-by-function explanation

| Function | Responsibility | Detail worth explaining |
|---|---|---|
| `result(board)` | Detect a winner, draw or ongoing game | Checks wins before draw; a full board can contain a winning line |
| `minimax(board, maximizing)` | Return the optimal score for a position | O takes max, X takes min; recursion alternates turns and restores cells |
| `best_move(board)` | Choose O's actual move | After temporarily placing O, call minimax with `False` because X moves next |
| `show(board)` | Display marks and available positions | Converts list indices to human-friendly positions |
| `play()` | Manage the interaction | Validate inputs, alternate moves and stop as soon as the game ends |

**Input validation:** Non-integers, out-of-range positions and occupied cells are rejected without changing the player or board. The range test appears before indexing the board, using short-circuit evaluation to avoid an invalid index.

**Tie-breaking:** Candidate moves are considered in ascending position order. The strict `score > best_score` condition keeps the earliest equally good move. Using `>=` would prefer the latest tie. Either can preserve optimal utility if all other logic is correct.

This simple version uses scores +1/0/−1 without a depth bonus. It guarantees the best outcome but does not explicitly prefer the fastest win or longest delay before an unavoidable loss.

### 7.5 Exact slide walkthrough

1. X chooses **5**, the center.
2. The computer chooses **1**, a corner.
3. X chooses **3**.
4. The computer chooses **7**, blocking the diagonal **3–5–7**.

Board after step 4 (`—` means empty):

| O | — | X |
|---|---|---|
| — | X | — |
| O | — | — |

Before O chooses 7, the candidate scores from O's perspective are:

| O's candidate position | 2 | 4 | 6 | 7 | 8 | 9 |
|---|---:|---:|---:|---:|---:|---:|
| Minimax value | −1 | −1 | −1 | **0** | −1 | −1 |

Only **7** avoids a forced loss. It preserves a draw against optimal play; choosing an unblocked position would allow X to win immediately at 7.

After O occupies 1 and 7, O threatens **4** to complete column 1–4–7. X should respond at 4 to stop that immediate win.

### 7.6 Additional tactical trace

Suppose X occupies **4, 5 and 9**, O occupies **1 and 2**, and O is to move. Empty positions are 3, 6, 7 and 8.

| O move | Value | Explanation |
|---|---:|---|
| 3 | +1 | O completes the top row immediately |
| 6 | 0 | Blocks X's middle-row threat, but guarantees only a draw |
| 7 or 8 | −1 | Leaves X an immediate winning move at 6 |

**Decision:** Play **3**. An immediate win ends the game; blocking the opponent is unnecessary when you can win on this move.

### 7.7 Correctness, limits and viva answers

The included implementation was checked against **every legal human move sequence** from the empty board while O follows its deterministic `best_move` policy: **498 O-win sequences, 183 draw sequences and 0 X-win sequences**. These are exhaustive sequence counts under that policy, not probabilities or percentages of human skill. The slide sequence and board restoration were also checked.

| Likely viva question | Answer |
|---|---|
| Is the computer learning from previous games? | No. This implementation searches the current game tree; it has no training process. |
| Why is O the maximizer? | Scores are defined from O's perspective, independently of who starts. |
| Why alternate min and max? | Each player selects the outcome most favorable to that player under a shared utility scale. |
| Why undo a move? | Each candidate must start from the same original board. |
| Why check terminal conditions first? | A win/draw is already determined; exploring extra moves would violate the game rules. |
| Can optimal O always win? | No. It can avoid losing from the empty board; optimal play by both sides produces a draw. |
| Is +1 a probability? | No. It is a utility assigned to an O win. |
| Is alpha-beta required here? | No. Tic-Tac-Toe is small enough for full minimax; pruning can improve efficiency. |
| What limits the guarantee? | The game rules, correct implementation, full terminal search and an initially valid game state. An already-lost arbitrary position may have no saving move. |

**Final revision priorities:** Keep utility perspective fixed; distinguish pixel counts from channel values; distinguish a classifier from a language model; preserve sentiment context; and calculate backed-up game-tree values before choosing a move.
