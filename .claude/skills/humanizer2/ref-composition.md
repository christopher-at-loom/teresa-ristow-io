# Composition Patterns (37-39)

These patterns operate at the macro-document level, across multiple paragraphs. They cannot be detected by single-sentence analysis. During Pass 1 (Structural Extraction), scan the entire document for these structural signatures before making any prose changes.

---

### 37. Fractal Summaries

**Detection:** The core thesis or key point appears restated at the end of every minor heading, paragraph block, or subsection. The document previews what it will say, says it, then summarizes what it just said, recursively at multiple structural levels.

**Problem:** Base system prompts require models to be excessively helpful, clear, and structured. This produces recursive summation that prevents narrative progression. The reader encounters the same thesis 5-10 times across a single document.

**Example pattern:**
> Introduction: "This article explores how water temperature affects extraction."
> Section 1 ends: "As we can see, water temperature significantly affects extraction."
> Section 2 ends: "This further demonstrates the impact of water temperature on extraction."
> Conclusion: "In summary, water temperature is a key factor in extraction."

**After (fixed structure):**
> Introduction states the thesis once. Each section advances the argument with new evidence. The conclusion draws a novel inference that wasn't stated in the introduction.

**Rewrite rule:** Delete all intermediate summaries. One introduction and one conclusion per document. Each section must advance the argument, not restate it.

**Risk:** LOW-MEDIUM. Mostly in long-form internal documentation, training manuals, and SOPs.

---

### 38. The Dead Metaphor

**Detection:** A single conceptual metaphor ("ecosystem," "DNA," "foundation," "fabric," "tapestry," "pillar") repeated more than 5 times across a single article or document. The model locks onto one safe metaphor and cannot generate alternatives.

**Problem:** Metaphoric cleansing selects a highly safe, widely understood structural metaphor and rigidly repeats it because the model lacks entropy to generate secondary or mixed metaphors. The metaphor dies through overuse, becoming invisible to the model but glaringly obvious to human readers.

**Before:**
> The cafe ecosystem relies on the barista. This ecosystem thrives when customers return. Protecting the ecosystem requires consistent quality. The ecosystem adapts to seasonal changes. Our ecosystem is what sets us apart.

**After:**
> The cafe relies on its baristas. Repeat customers keep the doors open. Consistent quality is the baseline. Seasonal menu rotations keep regulars engaged. This combination of people, consistency, and adaptation is what sets us apart.

**Rewrite rule:** Identify the repetitive metaphor. Replace 80% of its occurrences with literal, mechanical descriptions. Allow one intentional use if it genuinely aids comprehension.

**Risk:** HIGH. Common in brand architecture documents, company narratives, and investor pitch decks.

---

### 39. Listicle in a Trench Coat

**Detection:** Sequential paragraphs uniformly beginning with explicit numerical signposting ("The first...," "The second...," "The third...," "Another key...," "One important...," "A final...") while masquerading as continuous prose. The content is a list dressed as an essay.

**Problem:** The model's algorithmic bias toward list-making overrides narrative flow. When prompted for an essay or continuous narrative, it outputs discrete list items formatted as paragraphs to bypass the instruction.

**Before:**
> The first variable to consider is the grind size. A finer grind increases surface area and extraction rate. The second variable is the water temperature. Higher temperatures extract more soluble compounds. The third variable is the contact time. Longer contact times allow more extraction.

**After:**
> Grind size, water temperature, and contact time interact to determine extraction. Grinding finer increases surface area, which means you may need to lower temperature or shorten contact time to avoid over-extraction. These three variables aren't independent checkboxes; adjusting one changes what the other two need to be.

**Rewrite rule:** Force a structural decision. Either commit fully to a formatted list with headers, or rewrite using narrative bridges that demonstrate causal relationships between paragraphs.

**Risk:** HIGH. Pervasive in "How-To" brew guides and step-by-step educational blog content.
