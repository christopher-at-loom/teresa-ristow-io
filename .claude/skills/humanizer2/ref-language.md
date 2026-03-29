# Language and Grammar Patterns (7-14)

These patterns address word-level tells: vocabulary choices, verb constructions, and transition phrases that AI defaults to because they score high on probability distributions while adding zero semantic weight.

---

### 7. Overused AI Vocabulary Words

**Detection:** Additionally, align with, crucial, delve, emphasizing, enduring, enhance, fostering, garner, highlight (verb), interplay, intricate/intricacies, key (adjective), landscape (abstract), pivotal, robust, leverage, synergy, showcase, tapestry (abstract), testament, underscore (verb), valuable, vibrant

**Problem:** These words appear far more frequently in post-2023 text. They co-occur in clusters, which is a near-certain AI signal. Lexical flattening reduces domain terminology into these "safe" abstract nouns.

**Before:**
> Additionally, a distinctive feature of Somali cuisine is the incorporation of camel meat. An enduring testament to Italian colonial influence is the widespread adoption of pasta in the local culinary landscape, showcasing how these dishes have integrated into the traditional diet.

**After:**
> Somali cuisine also includes camel meat, which is considered a delicacy. Pasta dishes, introduced during Italian colonization, remain common, especially in the south.

**Risk:** HIGH. Ubiquitous in B2B copy, supply chain documentation, and wholesale agreements.

---

### 8. Copula Avoidance (The "Serves As" Dodge)

**Detection:** "serves as," "stands as," "functions as," "marks," "represents" replacing simple "is"/"are"/"has." Also "boasts," "features," "offers" when a copula would suffice.

**Problem:** Repetition penalties force the model to select grandiose multi-word alternatives for basic copulative verbs.

**Before:**
> Gallery 825 serves as LAAA's exhibition space for contemporary art. The gallery features four separate spaces and boasts over 3,000 square feet.

**After:**
> Gallery 825 is LAAA's exhibition space for contemporary art. The gallery has four rooms totaling 3,000 square feet.

**Risk:** HIGH. Frequent in equipment descriptions, barista training manuals, and SOPs.

---

### 9. Synonym Cycling (Elegant Variation)

**Detection:** Unnatural switching of terms for the exact same entity within a single paragraph. The subject gets called by 3+ different names in consecutive sentences.

**Problem:** N-gram repetition penalties force the model to use awkward synonyms to avoid repeating a subject noun, creating confusing prose.

**Before:**
> The protagonist faces many challenges. The main character must overcome obstacles. The central figure eventually triumphs. The hero returns home.

**After:**
> The protagonist faces many challenges but eventually triumphs and returns home.

**Risk:** MEDIUM. Appears in extended equipment reviews, origin profiles, and technical brewing manuals.

---

### 10. Superficial Analyses with -ing Endings

**Detection:** Sentences concluding with comma-separated "-ing" phrases: ", highlighting...," ", reflecting...," ", underscoring...," ", showcasing...," ", emphasizing...," ", ensuring...," ", contributing to...," ", cultivating...," ", encompassing..."

**Problem:** To pad word count without hallucination risk, the model appends low-perplexity present participle clauses that add syntactic complexity without adding semantic weight. These clauses never describe a concurrent action; they tack on shallow analysis.

**Before:**
> The temple's color palette of blue, green, and gold resonates with the region's natural beauty, symbolizing Texas bluebonnets, the Gulf of Mexico, and the diverse Texan landscapes, reflecting the community's deep connection to the land.

**After:**
> The temple uses blue, green, and gold colors. The architect said these were chosen to reference local bluebonnets and the Gulf coast.

**Rewrite rule:** Terminate the sentence at the primary action. If the analytical addendum is genuinely critical, construct a new independent clause explaining the specific causal relationship.

**Risk:** HIGH. Omnipresent in product descriptions, sustainability reports, and marketing copy linking brewing processes to abstract brand values.

---

### 11. "Quietly" and Other Magic Adverbs

**Detection:** Compulsive use of "quietly," "deeply," "fundamentally," "remarkably," "arguably" to manufacture subtle importance or understated power.

**Problem:** When simulating nuanced storytelling, the model's limited emotional architecture defaults to adverbs that explicitly instruct the reader how to feel about a mundane action. This is a byproduct of metaphoric cleansing.

**Before:**
> The grinder sits on the counter, quietly orchestrating the morning rush. This deeply fundamental shift in consumer preferences has remarkably transformed the industry.

**After:**
> The grinder runs from 6 AM to close. Consumer preferences shifted toward lighter roasts after 2018, and specialty shops followed.

**Rewrite rule:** Delete the adverb. Ensure the verb carries the sentence alone.

**Risk:** HIGH. Contaminates atmospheric cafe descriptions, barista workflows, and sensory experience writing.

---

### 12. Invented Concept Labels

**Detection:** Academic abstract nouns ("paradox," "trap," "creep," "dilemma," "equation," "calculus") appended to standard domain words to create unestablished compound terms.

**Problem:** When lacking specialized terminology, the model fabricates analytical-sounding compound nouns to project false authority.

**Before:**
> Navigating the supervision paradox. Baristas often fall into the acceleration trap. Avoiding workload creep during the morning rush.

**After:**
> Supervisors struggle to balance oversight with autonomy. Baristas speed up during rushes and make more errors. Morning workload increases gradually if not managed.

**Rewrite rule:** Remove the fabricated label. Describe the phenomenon in plain language.

**Risk:** MEDIUM. Appears in thought-leadership articles, wholesale documentation, and management training materials.

---

### 13. Hyphenated Word Pair Overuse

**Detection:** Dense clustering of "third-party," "data-driven," "high-quality," "real-time," "decision-making," "end-to-end," "cross-functional," "client-facing," "well-known," "long-term"

**Problem:** Lexical flattening produces generic compound modifiers that function as corporate filler, satisfying the model's need for descriptive adjectives without requiring specific descriptions.

**Before:**
> We deliver high-quality, data-driven roasting metrics through our end-to-end solution for client-facing operations.

**After:**
> We track first crack time, development ratio, and weight loss percentage on every batch. Clients see these numbers on their invoice.

**Rewrite rule:** Remove the hyphenated modifier if it adds no technical specificity. State the exact metric or parameter instead.

**Risk:** MEDIUM. Primarily in B2B communications, software integration docs, and wholesale pitch decks.

---

### 14. "It's Worth Noting" (Null-Value Transitions)

**Detection:** "It's worth noting," "It bears mentioning," "Importantly," "Interestingly," "Notably," "It should be noted that"

**Problem:** When the model needs to transition between disconnected ideas but lacks contextual understanding to build a genuine semantic bridge, it deploys null-value filler phrases that pad word count without adding logic.

**Before:**
> It's worth noting that this approach has limitations. Importantly, we must consider the broader implications of the roast profile. Interestingly, this pattern repeats across industries.

**After:**
> This approach has limitations. The roast profile affects cup score, shelf life, and customer retention differently. The same tradeoff appears in wine and cheese aging.

**Rewrite rule:** Delete the transition phrase entirely. If the point doesn't flow from the previous sentence, rewrite the paragraph to establish the actual causal link.

**Risk:** HIGH. Omnipresent in brewing guides, equipment comparisons, and extraction science writing.
