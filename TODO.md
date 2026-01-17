# TODO: Transform Module 3 to Module 1

## Title and Subtitle Changes
- [x] Change main title from Module 3 to Module 1: Crimean-Congo hemorrhagic fever
  - Update title from 'Module 3: (...)' to 'Module 1: Crimean-Congo hemorrhagic fever' in index.html

- [x] Change subtitle to Biology of the virus
  - Update subtitle from 'A comprehensive (...)' to 'the Biology of the virus' in index.html

## Chapter Renaming
- [x] Rename Introduction chapter to History
  - Update course chapter from 'Introduction' to 'History' in navigation and content sections

- [x] Rename PCR Principle chapter to Pathology
  - Update course chapter from 'PCR Principle' to 'Pathology' in navigation and content sections

- [x] Rename Real-time PCR chapter to Biology
  - Update course chapter from 'Real-time PCR' to 'Biology' in navigation and content sections

- [x] Rename SYBR Green chapter to Epidemiology
  - Update course chapter from 'SYBR Green' to 'Epidemiology' in navigation and content sections

- [x] Rename TaqMan Probe chapter to Prevention & Control
  - Update course chapter from 'TaqMan Probe' to 'Prevention & Control' in navigation and content sections

- [x] Rename Reverse Transcriptase to Laboratory diagnosis
  - Update course chapter from 'Reverse Transcriptase' to 'Laboratory diagnosis' in navigation and content sections

## Chapter Deletions
- [x] Delete Controls chapter
  - Remove the Controls chapter from navigation and delete its content section from index.html and script.js

- [x] Delete Multiplex PCR chapter
  - Remove the Multiplex PCR chapter from navigation and delete its content section from index.html and script.js

- [x] Delete Troubleshooting chapter
  - Remove the Troubleshooting chapter from navigation and delete its content section from index.html and script.js

---

## Summary of Changes Completed

All tasks have been completed successfully:

1. **Title updated**: "Module 3: Principles of Real-time PCR" → "Module 1: Crimean-Congo hemorrhagic fever"
2. **Subtitle updated**: "A comprehensive guide..." → "The Biology of the virus"
3. **Navigation chapters renamed**:
   - Introduction → History
   - PCR Principle → Pathology
   - Real-time PCR → Biology
   - SYBR Green → Epidemiology
   - TaqMan Probe → Prevention & Control
   - Reverse Transcriptase → Laboratory diagnosis
4. **Chapters removed**: Controls, Multiplex PCR, Troubleshooting
5. **Script.js updated**: Total chapters changed from 9 to 6

**Note**: The content sections for the renamed chapters (beyond History and Pathology) appear to be missing from the current index.html file. The file is truncated at 386 lines. You'll need to add the actual content for Biology, Epidemiology, Prevention & Control, and Laboratory diagnosis sections.


## Adding content 
- [x] Add content to section History
   - From document mod_1_content.md use content from Paragraph # History 
   - **Status**: Completed - Updated History section with revised content from mod_1_content.md

- [x] Add image to section History, The first outbreak in Crimea
   - add/images/pic_1_Hyalomma.jpg 
   - Adapt size 
   - add description: Hyalloma tick. By Tiia Monto - CC BY 4.0 - Wikimedia.org
   - **Status**: Completed - Image added with responsive sizing and proper attribution

- [x] Add image to section History, Independent discovery in Africa
   - add/images/pic_2_congo.jpg 
   - Adapt size 
   - add attribution: The Congo. ©2025 by Robert ten Hove
   - **Status**: Completed - Image added with responsive sizing and proper attribution

- [x] Add content to section Pathology
   - From document mod_1_content.md use content from Paragraph # Pathology in Humans Caused by Crimean-Congo Hemorrhagic Fever Virus (CCHFV)
   - **Status**: Completed - Pathology section content updated with CCHF-specific information

- [x] Add content to section Biology
   - From document Biology_CCHFV.md use content from Paragraph # Biology
   - **Status**: Completed - Biology section content updated with full content from Biology_CCHFV.md

- [x] Add content to section Prevention & Control
   - From document mod_1_content.md use content from Paragraph # Prevention & Control
   - **Status**: Completed - Prevention & Control section content updated

- [x] Add content to section Laboratory Diagnosis
   - Use content from document 'Laboratory Diagnosis.md'
   - **Status**: Completed - Laboratory Diagnosis section content updated with diagnostic methods and summary table   

## Adding illustrations 
- [x] Add image to section Biology,  Virion Structure and Morphology 
   - add/image/pic_3_CCHFVparticle.png 
   - Adapt size
   - add description: Schematic view of CCHF virus particle. 
   - **Status**: Completed

- [x] Add image to section Biology, Genome Organization

---

## Module 1 Quiz Questions and Scoring Overview

### Total Maximum Score: 900 points

### Quiz Breakdown by Section:

#### 1. History Section
**History Quiz** - 25 points
- Type: Multiple choice quiz
- Questions: 1 question
- Scoring: 25 points per correct answer
- Topics: History and key concepts of CCHF

#### 2. Pathology Section
**RT Exercise** - 100 points
- Type: Interactive exercise
- Scoring: 100 points for correct completion

**Quiz 1** - 100 points
- Type: Single question quiz
- Scoring: 100 points for correct answer

**Pathology Quiz** - 25 points
- Type: Multiple choice quiz
- Questions: 1 question
- Question: "Which of the following best describes the key determinant of clinical outcome of a patient with CCHF?"
- Options:
  - A. The specific tick species responsible for viral transmission
  - B. The intrinsic virulence of the infecting CCHFV strain only
  - C. The magnitude and regulation of the patient immune response to infection (CORRECT)
  - D. The presence of co-infection with other arboviruses
- Scoring: 25 points for correct answer

#### 3. Biology Section
**Biology Drag & Drop Quiz** - 110 points
- Type: Drag and drop matching exercise
- Questions: Match 6 images to correct stages of viral replication cycle
- Scoring: 
  - 10 points per correct card placement (6 cards)
  - 50 bonus points for perfect score (all 6 correct)
  - Maximum: 110 points

#### 4. Troubleshooting Exercises
**Troubleshooting Quiz 1** - 100 points
- Type: Single question quiz
- Scoring: 100 points for correct answer

**Troubleshooting Quiz 2** - 120 points
- Type: Multiple select quiz
- Correct answers: 2 (air bubble and improper sealing)
- Scoring logic:
  - 0 correct selected: 0 points
  - 1 correct selected: 60 points (regardless of incorrect selections)
  - 2 correct selected with no incorrect: 120 points
  - 2 correct selected with incorrect: 30 points
- Maximum: 120 points

#### 5. Multiplex Exercise
**Multiplex Exercise** - 120 points
- Type: PCR result interpretation
- Questions: 12 questions
- Scoring: 10 points per correct answer
- Maximum: 120 points

#### 6. Laboratory Diagnosis Section
**Laboratory Diagnosis Clinical Case Quiz** - 200 points

**Question 1: Clinical Stage** - 25 points
- Type: Button selection
- Question: "In which stage is the patient most likely?"
- Options:
  - Pre-hemorrhagic stage (CORRECT)
  - Hemorrhagic stage
  - Convalescence (recovering)
- Scoring: 25 points for correct answer

**Question 2: Laboratory Tests** - 175 points
- Type: Multiple dropdown selections
- Clinical scenario: Shepherd with 2-day fever, plasma sample sent to lab
- Tests and expected results:

  1. **RT-PCR** - 25 points
     - Expected: Positive
     - Rationale: Viremia peaks in the first week; RT-PCR is the primary diagnostic tool

  2. **Viral Antigen (ELISA)** - 25 points
     - Expected: Positive
     - Rationale: Antigen is most detectable during high viremia in the first 5 days

  3. **CCHFV IgM / IgG** - 25 points
     - Expected: Negative
     - Rationale: Antibodies are generally not detectable until day 4–7 of symptoms

  4. **Platelet count** - 50 points
     - Expected: Inconclusive
     - Rationale: Declining platelets are observable even in the pre-haemorrhagic phase, BUT cannot be analysed from PLASMA

  5. **Liver enzymes (AST / ALT)** - 50 points
     - Expected: Elevated
     - Rationale: AST and ALT levels rise early due to hepatic involvement

---

### Score Distribution Summary:

| Section | Quiz/Exercise | Points | Cumulative |
|---------|--------------|--------|------------|
| History | History Quiz | 25 | 25 |
| Pathology | RT Exercise | 100 | 125 |
| Pathology | Quiz 1 | 100 | 225 |
| Pathology | Pathology Quiz | 25 | 250 |
| Biology | Drag & Drop | 110 | 360 |
| Troubleshooting | Quiz 1 | 100 | 460 |
| Troubleshooting | Quiz 2 | 120 | 580 |
| Multiplex | Exercise | 120 | 700 |
| Lab Diagnosis | Clinical Stage | 25 | 725 |
| Lab Diagnosis | Lab Tests | 175 | 900 |
| **TOTAL** | **All Quizzes** | **900** | **900** |

---

### Notes:
- All quizzes award 25 points per question unless otherwise specified
- The Biology Drag & Drop quiz offers bonus points for perfect completion
- Troubleshooting Quiz 2 has complex scoring based on correct/incorrect selection combinations
- Laboratory Diagnosis section platelet count and liver enzymes questions are worth 50 points each (double value)
- Score thermometer in the interface now correctly reflects the 900-point maximum 
   - add/image/pic_4_CCHFVgenome.png 
   - Adapt size
   - add description: CCHFvirus genes 
   - **Status**: Completed

## Adding interactive parts 
- [x] change paragraph from plain text to interactive part in section Pathology, Clinical Stages 
   - Use /image/pic_5_infection_CCHFV.png,  pic_6_prehemmo.png, pic_7_haemorrhagic.png and pic_8_convalescence.jpeg
   - Adapt size
   - Replace the long paragraph + list with: A horizontal 4-step timeline (Incubation → Pre‑hemorrhagic → Hemorrhagic → Convalescent). A detail panel showing: Stage title. The stage image. 3–5 concise bullet points (pulled from the current text). Navigation buttons (Previous/Next) to encourage sequential exploration.
   - **Status**: Completed - Interactive clinical stages timeline added with navigation

- [x] Create hotspot-image in course chapter Pathology, paragraph 'Organ-Specific Pathology'. 
   - Use /image/pic_9_organs.jpg
   - Adapt size
   - Create pop-ups for the following points:
     - x=600, y=400 
       - text: Liver. The liver is a major target organ. Clinical and pathological findings include: Hepatomegaly and liver tenderness, elevation of liver enzymes, histopathology and jaundice. 
     - x=630, y=700 
       - text: Kidney. Acute tubular necrosis and interstitial nephritis may be seen. Hematuria, oliguria or anuria due to hypovolemia, shock, or direct renal injury.
     - x=400, y=550
       - text: Spleen and Lymphoid Tissue. Splenomegaly.
   - **Status**: Completed - Interactive organ diagram with tooltip-style popups that appear next to clicked hotspots

- [x] Add image to chapter Biology, sub-chapter Virology and Transmission, second paragraph.  
   - Use /image/pic_10_phylotree.png
   - Adapt size
   - Wrap text tight, with image on left side.
   - **Status**: Completed - Phylogenetic tree image added with left-aligned text wrapping

---

## All Tasks Completed! 🎉

Module 1: Crimean-Congo hemorrhagic fever is now fully transformed with:
- All chapter content updated and relevant to CCHF
- All images properly integrated with captions
- Interactive elements (clinical stages timeline and organ diagram hotspots) functioning
- Professional layout with responsive design
- SCORM tracking integrated


## Making editorial changes
- [x] Remove one of the double bulletpoints from lists in: 
  - Chapter Biology, subchapter Replication cycle
  - **Status**: Completed - Removed duplicate `<ol></ol>` tag causing double bullet points

- [x] Add map to Chapter Biology, subchapter Ecology, Hosts, and Transmission Dynamics, paragraph Geographic Distribution. 
-  Use /image/pic_11_map_CCHF.png 
-  adapt size
-  Add image title: Geographic distribution of Crimean-Congo Haemorrhagic Fever (2022) 
-  Add subtext: Date Source: WHO - Viral Haemorrhagic Fevers (VHF) Map Production: J. Bader, EYE Secretariat on 01-09-2022. https://www.who.int/multi-media/details/geographic-distribution-of-crimean-congo-haemorrhagic-fever
-  **Status**: Completed - Geographic distribution map added with WHO attribution 
 

- [x] Add image to Chapter Laboratory diagnosis, between sub-chapters 'Diagnostic methods ...' and 'Summary Table ...' 
  -  Use /image/pic_12_course_CCHF.png 
  -  adapt size
  -  **Status**: Completed - Diagnostic course image added between sections  

- [x] Add to chapter 'History' between sub-chapters 'Expansion ...' and 'Conclusion' a sub-chapter called 'Knowledge check', containing interactive quiz-questions. 
  -  Use quiz-questions from the file Quiz-questions.js. 
  -  For each correct answer, the user gets 25 points. 
  -  The user first has to answer the questions, and then submit them all at once by clicking the submit-button. 
  -  The score is visualized in the Score Thermometer. 
  -  **Status**: Completed - Interactive History Knowledge Check quiz added with 6 questions (25 points each), submit functionality, score thermometer visualization, retry option, and individual question feedback 
-  
- [x] Add to chapter 'Pathology', before 'Continue button', a sub-chapter called 'Knowledge check', containing the following quiz question: 
  - Which of the following best describes the key determinant of clinical outcome of a patient with CCHF?
    -  One correct answer possible:   
       -  A. The specific tick species responsible for viral transmission 
       -  B. The intrinsic virulence of the infecting CCHFV strain only 
       -  C. The magnitude and regulation of the patient immune response to infection 
       -  D. The presence of co-infection with other arboviruses
    - Correct answer is C. 
    - Additional explanation: The key determinant of outcome in CCHF is the patient's immune response (rather than the extent of viral replication alone).
  - **Status**: Completed - Interactive Pathology Knowledge Check quiz added with 1 question (25 points), submit functionality, score visualization, retry option, and individual question feedback

# Knowledge check BIOLOGY

- [x] In chapter Biology, before 'Continue button', add sub-chapter called 'Knowledge check'. 
- [x] In this sub-chapter, create a drag & drop interactive quiz question. 
  - Format: HTML5/JavaScript. 
  - Background: pic_20_cchf_cycle.png 
  - The Background contains a center area with a dashed line. On top of the background is already filled in. Clock wise are the following six areas indicated with numbers 2, 3, 4, 5, 6, and 7.
- [x] Drop zone coordinates on pic_20_cchf_cycle.png:
  - Area 2: x=509, y=190, width=253, height=288
  - Area 3: x=509, y=434, width=253, height=288
  - Area 4: x=433, y=679, width=253, height=288
  - Area 5: x=179, y=679, width=253, height=288
  - Area 6: x=100, y=433, width=253, height=288
  - Area 7: x=100, y=190, width=253, height=288
  - Center stack: x=303, y=388, width=253, height=288
- [x] Card dimensions:
  - All cards have width=253px and height=288px
- [x] use percentage-based positioning for all images and zone coordinates to make everything fit in the knowlegde section. 
- [x] In center field of background in area with dashed line, stack in random order: pic_14_card2.png, pic_15_card3.png, pic_16_card4.png, pic_17_card5.png, pic_18_card6.png, pic_19_card7.png. 
- [x] "Random order" stacking behavior: Stack cards with a slight vertical offset (like 3% between each), so users can see all card edges. Random order on each page load or quiz retry.
  
- [x] Create rules: 
  - The card imgages need to be dragged to the correct numbered area around the center stack: pic_14_card2.png on area indicated with a 2, pic_15_card3.png oon area indicated with a 3, pic_16_card4.png on area indicated with a 4, pic_17_card5.png on area indicated with a 5, pic_18_card6.png on area indicated with a 6, pic_19_card7.png on area indicated with a 7.
  - Cards that are placed, can be dragged back to the stack or to another area. 
  - When the user placed all cards, the button SUBMIT ANSWER can be clicked. 
  - For each correct placement, the user receives 10 points. 
  - The user can reset and try again with the cards placed in a random stack again. 
  
  - [x] add feedback message 
    - Correct: Green highlight of card(s). 
    - Incorrect: Red highlight of card(s) 
    - If all cards correct, add 50 bonus points.  
  
  - [x] animation or transition requirements: 
    - Smooth drag with cursor. 
    - Gentle "snap" animation when dropped in zone (0.3s ease). 
    - Card flips back to stack with bounce effect if wrong placement.
    - No sound effects.
  
  - [x] Scoring: 
    - 60 points max + bonus
    - Add to overall course score
    - Report to SCORM/LMS
    - Shown in the score thermometer like History quiz.
  
  - [x] Collision detection with other cards and let loose:
    - 'let loose' means: if user drops card on an area that already has a card, it should Swap positions (dropped card takes zone, original goes to stack)
  - [x] Mobile/touch device compatibility requirements: Use HTML5 drag and drop API with touch event polyfill for mobile devices (touchstart, touchmove, touchend). This ensures it works on tablets and phones.

  - [x] Add SUBMIT ANSWER button. 
    - Partial submissions are not allowed: all 6 cards must be placed.

  - [x] Reset/Try again button placement and styling. 
    - make it look awesome. 
    - Hidden initially 
    - Shown AFTER submission 
    - Always enabled (so users can retry)

  - **Status**: Completed - Interactive Biology Knowledge Check drag & drop quiz added with 6 cards (10 points each + 50 bonus = 110 max), percentage-based responsive positioning, touch/mobile support, swap collision detection, submit validation, visual feedback (green/red highlights), animations (snap/bounce), retry functionality, and SCORM/LMS integration.

# Error handling
The drag and drop quiz is not working:

**Issue 1: Cards not stacked in center**
- Fix: Set initial position of all cards to center stack coordinates (x=303, y=388 or percentage equivalent)
- Add vertical offset of ~3% between stacked cards so edges are visible
- Ensure z-index increases with each card in stack

**Issue 2: Cards don't stay in drop-zones**
- Fix: In drop event handler, prevent default behavior with `e.preventDefault()` and `e.stopPropagation()`
- Update card's absolute position to match drop zone coordinates
- Remove dragging class and update card's data-zone attribute
- Ensure drop zones have proper event listeners (dragover with preventDefault, drop handler)

**Required fixes in script.js:**
1. Initialize cards at center stack position on load/reset
2. Add proper drop event handling with position updates
3. Implement swap logic when dropping on occupied zone
4. Ensure percentage-based positioning is calculated correctly



**Finetuning drag&drop**
- [x] Use these corrected coordinates (with the top-left positions)
- Background image pic_20_cchf_cycle.png size: Image width = 610 px; Image height = 800 px
  - [x] Drop zone coordinates on pic_20_cchf_cycle.png:
  - Area 2: x=431, y=105, width=160, height=182
  - Area 3: x=431, y=346, width=160, height=182
  - Area 4: x=353 y=590, width=160, height=182
  - Area 5: x=105, y=590, width=160, height=182
  - Area 6: x=23, y=347, width=160, height=182
  - Area 7: x=23, y=105, width=160, height=182
  - Center stack: x=255, y=300, width=160, height=182 (adjusted 35px left)
- [x] Card dimensions:
  - All cards have width=160px and height=182px
- [x] Fine-tune the exact positioning of the drop zones and cards
- [x] Adjust the sizing to perfectly match the background image areas
- [x] Enable cards to be dragged back to deck from zones
- [x] Fixed pointer-events issue preventing deck from receiving drops
- [x] Test the alignment on different screen sizes

**Status**: Completed - All coordinates updated, cards properly aligned, and full drag & drop functionality working (cards can be swapped between deck and zones)


**add illustrations to Prevention and Control** 
- [x] Add image pic_21_Workers.png to sub-chapter Prevention and Control, BEFORE <h3>Controlling Ticks and Livestock</h3>
  - **Status**: Completed - Image added with responsive sizing
- [x] Add image pic_22_Horses.png to sub-chapter Prevention and Control, BEFORE <h4>Quarantine and inspection</h4>
  - **Status**: Completed - Image added with responsive sizing 

**add knowledge check in subchapter laboratory diagnosis** 

A doctor sees the following patient

*Anamnesis*
Shepard with recent contact with livestock
Two days ago abrupt onset of high fever (39–41°C), chills, and a severe headache. The patient experiences intense myalgia (specifically back and limb pain), dizziness, and photophobia.

*Physical signs*
Examination reveals facial flushing (hyperaemia), a reddened throat, and conjunctival hyperemia (red eyes). There are no visible signs of haemorrhage (such as petechiae or ecchymosis). 

The doctor suspects infection with CCHF virus. 
In which stage is the patient most likely? 
Choose the suspeced clinical stage [from three buttons]: 
- Pre-hemorrhagic stage [correct]
- Hemorrhagic stage
- Convalescence (recovering)

[After clicking one button, the buttons change colour to green for the right button or red from the wrong buttons. ]

Plasma sample is send to the laboratory. The next morning the results arrive. 
What do you expect based on the patient’s clinical stage? 

| Laboratory test           | Expected result                               | Rationale [is made visible after selection]                                                                 |
|---------------------------|-----------------------------------------------|-------------------------------------------------------------------------------------------------------------|
| RT PCR                    | Positive [correct] / Negative / Inconclusive  | Viremia peaks in the first week; NAAT is the primary diagnostic tool.                                       |
| Viral Antigen (ELISA)     | Positive [correct] / Negative / Inconclusive  | Antigen is most detectable during high viremia in the first 5 days.                                         |
| CCHFV IgM / IgG           | Positive / Negative [correct] / Inconclusive  | Antibodies are generally not detectable until day 4–7 of symptoms.                                          |
| Platelet count            | High / Low / Inconclusive [correct]           | Declining platelets are observable even in the pre-haemorrhagic phase, BUT cannot be analysed from SERUM. . |
| Liver enzymes (AST / ALT) | Elevated [correct] / decreased / Inconclusive | AST and ALT levels rise early due to hepatic involvement.                                                   | 


For each correct selection, the user receives 25 points. If all are correct, the user received a bonus of 50 points.
 
**ERRORS** 
- [ ] Buttons of side column with sub-chapters are not responding anymore
  - **Status**: Fixed - Added missing closing `});` for DOMContentLoaded event listener in script.js
- [ ] The quiz-questions have disappeared
  - **Status**: Fixed - Quiz questions now render correctly after fixing DOMContentLoaded closure  