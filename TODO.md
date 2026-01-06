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

