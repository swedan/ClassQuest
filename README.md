# HCT ClassQuest 2.1 — Balanced Hybrid Edition

Open `index.html` in a modern browser. No backend or AI API key required.

## Improvements
- Professional navy/blue/teal palette and improved cards/buttons.
- Difficulty-colored keyword cards, hover and entrance animations.
- Circular automatic countdown (blue > amber at 10s > coral at 5s), with the existing last-five-seconds sound.
- Shared 3D answer flip for manual and automatic reveal.
- Animated statistics cards, accuracy ring, and topic performance bars.
- Respects `prefers-reduced-motion`.

## Preserved
Excel/CSV question-bank upload, AI Prompt Builder (independent of upload; 60-question maximum), course/category/topic/keyword flow, question selection strategies, MCQ support, automatic timer, scoring, statistics, teacher controls, and confirmation dialogs.

## Notes
Excel (.xlsx/.xls) parsing uses SheetJS from a CDN and therefore requires internet access; CSV can work without it. Some browsers require interaction before audio is enabled. Test on your classroom projector before a live session.
