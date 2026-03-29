# Formatting and Style Patterns (22-27)

These patterns address visual presentation: punctuation overuse, list formatting, decorative elements, and structural artifacts that signal AI-generated output through formatting rather than content.

---

### 22. Em Dash Overuse

**Detection:** Multiple em dashes (--) in a single paragraph, or em dashes used for parenthetical insertions that could use commas or periods.

**Problem:** LLMs use em dashes more than humans, mimicking "punchy" sales writing. Note: Loom Coffee Co. has an absolute ban on em dashes in all output.

**Before:**
> The term is primarily promoted by Dutch institutions--not by the people themselves. You don't say "Netherlands, Europe" as an address--yet this mislabeling continues--even in official documents.

**After:**
> The term is primarily promoted by Dutch institutions, not by the people themselves. You don't say "Netherlands, Europe" as an address, yet this mislabeling continues in official documents.

**Rewrite rule:** Replace em dashes with commas, periods, or parentheses. In Loom contexts, em dashes are banned entirely.

**Risk:** MEDIUM. Standard AI tell, but the Loom em-dash hook catches most instances before they reach this skill.

---

### 23. Overuse of Boldface

**Detection:** Mechanical emphasis of key phrases in **boldface** throughout body text, particularly when every important term gets bolded.

**Problem:** AI chatbots emphasize phrases in boldface as a formatting reflex, creating visual noise.

**Before:**
> It blends **OKRs (Objectives and Key Results)**, **KPIs (Key Performance Indicators)**, and visual strategy tools such as the **Business Model Canvas (BMC)** and **Balanced Scorecard (BSC)**.

**After:**
> It blends OKRs, KPIs, and visual strategy tools like the Business Model Canvas and Balanced Scorecard.

**Rewrite rule:** Remove mechanical boldface from body text. Reserve bold for actual structural emphasis (headings, labels).

**Risk:** LOW. Easy to spot and correct.

---

### 24. Inline-Header Vertical Lists

**Detection:** Bulleted lists where every item begins with a bolded keyword or short phrase followed by a colon or em dash. The "**Header:** Description" pattern.

**Problem:** Output formatting instructions drive the model to structure narrative information as key-value pairs rather than continuous prose.

**Before:**
> - **User Experience:** The user experience has been significantly improved with a new interface.
> - **Performance:** Performance has been enhanced through optimized algorithms.
> - **Security:** Security has been strengthened with end-to-end encryption.

**After:**
> The update improves the interface, speeds up load times through optimized algorithms, and adds end-to-end encryption.

**Rewrite rule:** Convert the artificial list into continuous prose with standard transitional phrases.

**Risk:** HIGH. Almost guaranteed when asking an LLM to generate tasting notes, recipe instructions, or equipment specs.

---

### 25. Title Case in Headings

**Detection:** Markdown headers (H2, H3) where every major word is capitalized, regardless of the publication's style guide.

**Problem:** Default alignment parameters force formal title case on all structural elements.

**Before:**
> ## Strategic Negotiations And Global Partnerships

**After:**
> ## Strategic negotiations and global partnerships

**Rewrite rule:** Convert to sentence case. Capitalize only the first word and proper nouns.

**Risk:** LOW. Common but easily corrected.

---

### 26. Emojis and Unicode Decoration

**Detection:** Emojis as bullet decorators or heading prefixes. Unicode arrows (the right arrow character) as flow connectors. Curly ("smart") quotation marks in contexts requiring straight quotes. Perfect consistency of smart quotes in technical or code-adjacent text.

This pattern consolidates three related formatting tells: emoji decoration, unicode special characters, and curly quote substitution.

**Before (emojis):**
> rocket **Launch Phase:** The product launches in Q3
> bulb **Key Insight:** Users prefer simplicity
> checkmark **Next Steps:** Schedule follow-up meeting

**After:**
> The product launches in Q3. User research showed a preference for simplicity. Next step: schedule a follow-up meeting.

**Before (unicode):**
> Input right-arrow Processing right-arrow Output. This leads to better extractions right-arrow higher satisfaction.

**After:**
> Input feeds processing, which produces output. Better extractions lead to higher satisfaction.

**Before (curly quotes):**
> He said "the project is on track" but others disagreed.

**After:**
> He said "the project is on track" but others disagreed.

**Rewrite rule:** Remove emojis entirely. Replace unicode arrows with textual transitions ("leading to," "resulting in") or standard markdown. Convert curly quotes to straight quotes.

**Risk:** MEDIUM. Emojis in workflow docs, unicode arrows in brewing flowcharts, curly quotes throughout.

---

### 27. Gerund Fragment Litany

**Detection:** Standalone sentences lacking a main verb, beginning with an "-ing" word, and clustered together sequentially. Unlike Pattern 10 (superficial -ing analyses), these are not appended to a sentence; they stand alone as fragments.

**Problem:** RLHF algorithms optimizing for "punchy" readability output verbless gerund fragments that redundantly echo points already established, padding text length while maintaining low perplexity.

**Before:**
> The morning shift is demanding. Dialing in the espresso. Steaming the milk. Managing the queue. Roasting requires attention to detail. Monitoring the curve. Listening for the crack.

**After:**
> The morning shift is demanding: dialing in espresso, steaming milk, and managing the queue simultaneously. Roasting requires attention to the curve and first crack timing.

**Rewrite rule:** Attach the gerund fragments to the preceding clause using a colon, or convert them into a properly formatted list.

**Risk:** MEDIUM. Appears in operational manuals, job descriptions, and "day in the life" social content.
