# Sentence Structure Patterns (15-21)

These patterns address sentence-level mechanics: parallelism abuse, rhythm manipulation, and rhetorical structures that AI uses to simulate depth or emphasis without genuine semantic content.

---

### 15. Negative Parallelism

**Detection:** "Not only...but...," "It's not just about..., it's...," "It's not X -- it's Y," "not because X, but because Y," cross-sentence reframes ("The question isn't X. The question is Y"), contrastive negation ("not X so much as Y," "less about X and more about Y")

**Problem:** The single most commonly identified AI writing tell. The model uses this structure to generate false profundity by framing basic information as a surprising reframe, satisfying RLHF incentives for authoritative prose without requiring actual semantic depth.

**Before:**
> It's not just about the beat riding under the vocals; it's part of the aggression and atmosphere. It's not merely a song, it's a statement. The question isn't whether to brew it. The question is whether you're ready for it.

**After:**
> The heavy beat adds to the aggressive tone. This coffee rewards attention.

**Rewrite rule:** Eliminate the negation entirely. State the affirmative truth (the "Y" variable) directly and forcefully. If the positive claim is strong, the negation adds nothing.

**Risk:** HIGH. Heavily overused in brand positioning and mission statements attempting to differentiate from commercial coffee.

---

### 16. Rule of Three Overuse

**Detection:** Back-to-back three-item lists with perfectly matching grammatical structures, syllables, or alliteration. Forced groupings of three ideas presented as comprehensive.

**Problem:** RLHF training favors rhythmic, symmetrical structures, resulting in compulsive generation of tricolons that destroy natural burstiness.

**Before:**
> The event features keynote sessions, panel discussions, and networking opportunities. Attendees can expect innovation, inspiration, and industry insights.

**After:**
> The event includes talks and panels. There's also time for informal networking between sessions.

**Rewrite rule:** Break the symmetry. Reduce to the two most critical points, or expand to four irregular points.

**Risk:** HIGH. Rampant in brand messaging, mission statements, and core value propositions.

---

### 17. False Ranges

**Detection:** "From [Noun] to [Noun]" constructions where the two items are categorically unrelated, represent a false dichotomy, or fail to establish a true spectrum. Also: "from A to B, from C to D" doubled ranges.

**Problem:** The model attempts to demonstrate comprehensiveness but pairs items that don't exist on a logical scale, revealing lack of domain comprehension.

**Before:**
> Our journey through the universe has taken us from the singularity of the Big Bang to the grand cosmic web, from the birth and death of stars to the enigmatic dance of dark matter.

**After:**
> The book covers the Big Bang, star formation, and current theories about dark matter.

**Before (coffee):**
> From innovation to cultural transformation, the cafe changed everything. From the portafilter to community building, coffee connects us.

**After (coffee):**
> The cafe introduced pour-over service and a community cupping table. Both drew regulars.

**Rewrite rule:** Remove the false range framework. List elements with standard conjunctions, or find two variables that actually represent opposite ends of a single spectrum.

**Risk:** HIGH. Generated in brand summaries and blog introductions attempting to encompass multiple values.

---

### 18. "Not X. Not Y. Just Z." (Dramatic Countdown)

**Detection:** A rigid syntactic countdown negating two or more possibilities before delivering a single-word or short-phrase affirmative conclusion.

**Problem:** RLHF rewards text that builds rhetorical momentum. This tripartite negation structure generates the illusion of a distilled truth without requiring complex reasoning.

**Before:**
> Not a light roast. Not a dark roast. Just perfectly developed. Not ten seconds. Not thirty seconds. Exactly twenty-five.

**After:**
> This is a medium roast, developed to 21% weight loss. Pull at 25 seconds.

**Rewrite rule:** Remove the dramatic negations. State the conclusion directly.

**Risk:** HIGH. Common in DTC ad copy and Instagram captions attempting a punchy brand voice.

---

### 19. Anaphora Abuse

**Detection:** Three or more consecutive sentences or independent clauses beginning with the exact same word or phrase.

**Problem:** The model confuses mechanical repetition with rhetorical emphasis, looping the same starting n-gram to emulate persuasive oratory.

**Before:**
> They assume the water is hot enough. They assume the grind is fine enough. They assume the tamp is level. We have built the relationships. We have built the infrastructure. We have built the menu.

**After:**
> Most baristas assume their water temp, grind size, and tamp pressure are dialed in. We built out relationships, infrastructure, and the menu over three years.

**Rewrite rule:** Combine repeated subjects into a single sentence with a compound predicate, or vary the sentence subjects.

**Risk:** MEDIUM. Appears in manifesto-style "About Us" pages and aggressive brand positioning.

---

### 20. Short Punchy Fragments

**Detection:** Single verbless fragments or exceptionally short sentences (1-4 words) isolated on their own line as independent paragraphs.

**Problem:** RLHF prompts demanding "punchy" text cause over-correction. The model equates visual brevity with narrative impact, artificially inflating vertical rhythm.

**Before:**
> He published this. Openly. In a book.
>
> The coffee is ready. Always.
>
> The solution? Simple.

**After:**
> He published this openly, in a book. The coffee is always ready. The solution turned out to be straightforward.

**Rewrite rule:** Reintegrate the fragment into the preceding or succeeding paragraph with proper grammatical connection.

**Risk:** HIGH. Rampant in LinkedIn marketing copy, top-of-funnel emails, and promotional material.

---

### 21. "The X? A Y." (Rhetorical Q&A)

**Detection:** A short (2-4 word) rhetorical question ending in a question mark, immediately followed by a definitive single-word or short-phrase answer.

**Problem:** The model self-poses and answers rhetorical questions to simulate conversational pacing and manufacture drama, compensating for inability to generate genuine narrative tension.

**Before:**
> The result? Devastating. The worst part? Nobody saw it coming. The extraction time? Exactly twenty-five seconds.

**After:**
> The result was devastating and caught everyone off guard. We pulled at exactly 25 seconds.

**Rewrite rule:** Convert the disjointed question-and-answer into a single flowing declarative statement.

**Risk:** HIGH. Generated in product review summaries, tasting notes, and promotional email copy.
