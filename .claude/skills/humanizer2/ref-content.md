# Content Patterns (1-6)

These patterns address *what is said* -- factual inflation, attribution fraud, and promotional contamination that AI injects to satisfy RLHF helpfulness incentives.

---

### 1. Undue Emphasis on Significance, Legacy, and Stakes

**Detection:** "stands/serves as," "is a testament/reminder," "pivotal/crucial/vital role/moment," "underscores/highlights its importance," "reflects broader," "symbolizing its ongoing/enduring/lasting," "marking/shaping the," "key turning point," "evolving landscape," "indelible mark," "deeply rooted," "fundamentally reshape," "redefine the era," "changes everything we know about"

**Problem:** LLMs puff up importance by framing arbitrary subjects as world-historical pivot points. When combined with stakes inflation ("fundamentally reshape," "redefine the era"), minor processes get described as paradigm shifts.

**Before:**
> The Statistical Institute of Catalonia was officially established in 1989, marking a pivotal moment in the evolution of regional statistics in Spain. This initiative was part of a broader movement to fundamentally reshape how we think about data collection.

**After:**
> The Statistical Institute of Catalonia was established in 1989 to collect and publish regional statistics independently from Spain's national statistics office.

**Risk:** HIGH. Over-indexes on "testament" in farm origin stories and cooperative histories. Stakes inflation appears in product descriptions and press releases.

---

### 2. Undue Emphasis on Notability and Media Coverage

**Detection:** "independent coverage," "local/regional/national media outlets," "written by a leading expert," "active social media presence," unnamed media entity lists

**Problem:** LLMs substitute structural evidence of importance by padding lists of generic media coverage when they lack specific factual data.

**Before:**
> Her views have been cited in The New York Times, BBC, Financial Times, and The Hindu. She maintains an active social media presence with over 500,000 followers.

**After:**
> In a 2024 New York Times interview, she argued that AI regulation should focus on outcomes rather than methods.

**Risk:** MEDIUM. Appears in wholesale partnership decks, press releases, and employee bios.

---

### 3. Promotional and Advertisement-like Language

**Detection:** "boasts a," "vibrant," "rich" (figurative), "profound," "showcasing," "exemplifies," "commitment to," "nestled," "in the heart of," "groundbreaking," "renowned," "breathtaking," "must-visit," "stunning"

**Problem:** LLMs fail to maintain neutral tone because training corpora heavily feature SEO-optimized marketing copy.

**Before:**
> Nestled within the breathtaking region of Gonder in Ethiopia, Alamata Raya Kobo stands as a vibrant town with a rich cultural heritage and stunning natural beauty.

**After:**
> Alamata Raya Kobo is a town in the Gonder region of Ethiopia, known for its weekly market and 18th-century church.

**Risk:** HIGH. Contaminates location descriptions, "About Us" pages, and origin trip recaps.

---

### 4. Outline-like Conclusions about Challenges

**Detection:** "Despite its... faces several challenges...," "Despite these challenges," "Challenges and Legacy," "Future Outlook," formulaic concluding headers

**Problem:** Structural collapse forces narratives into "thesis, antithesis, synthesis" templates regardless of actual content trajectory.

**Before:**
> Despite its industrial prosperity, Korattur faces challenges typical of urban areas, including traffic congestion and water scarcity. Despite these challenges, with its strategic location and ongoing initiatives, Korattur continues to thrive as an integral part of Chennai's growth.

**After:**
> Traffic congestion increased after 2015 when three new IT parks opened. The municipal corporation began a stormwater drainage project in 2022 to address recurring floods.

**Risk:** MEDIUM. Common in long-form blog posts about climate change impacts on coffee agriculture.

---

### 5. Vague Attributions and Weasel Words

**Detection:** "Industry reports," "Observers have cited," "Experts argue," "Some critics argue," "several sources/publications" (when few cited), unnamed collective authorities

**Problem:** AI attributes opinions to vague authorities without specific sources, simulating research without verifiability.

**Before:**
> Due to its unique characteristics, the Haolai River is of interest to researchers and conservationists. Experts believe it plays a crucial role in the regional ecosystem.

**After:**
> The Haolai River supports several endemic fish species, according to a 2019 survey by the Chinese Academy of Sciences.

**Risk:** HIGH. Contaminates articles about market trends, health benefits, and sustainability statistics.

---

### 6. "Imagine a World Where..." (Invitations to Futurism)

**Detection:** Opening with "Imagine a world where..." followed by an idealized, frictionless list of benefits. Also: "Picture a future where...," "What if every..."

**Problem:** Models resort to hypothetical future framing because they cannot generate high-entropy predictive analysis. They rely on utopian templates to simulate visionary thought.

**Before:**
> Imagine a world where every cup of coffee is perfectly extracted. Where farmers are paid equitable wages instantly. Where your inventory manages itself quietly.

**After:**
> Our subscription ships within 48 hours. We pay suppliers 30-45% above market rate. Inventory turns weekly on the current pipeline.

**Risk:** HIGH. Appears in pitch decks, product launch emails, and mission statements.