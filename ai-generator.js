/* ClassQuest 2.0 — browser-only prompt builder. No API keys or backend. */
function renderAIGenerator(){
  stopTimer();score.classList.add('hidden');$('#teacherBtn').classList.add('hidden');
  main.innerHTML=`<button id="promptBack" class="btn ghost back">← Home</button>
  <div class="screen-head"><div><h1 class="screen-title">AI Question Bank Prompt Builder</h1><p class="subtitle">Choose your requirements, copy the prompt, then upload your PowerPoint to any AI tool.</p></div></div>
  <section class="ai-panel"><div class="ai-grid">
  <div class="field"><label for="pbCourse">Course code and title</label><input id="pbCourse" placeholder="e.g. Ai101 — Introduction to Artificial Intelligence"></div>
  <div class="field"><label for="pbLevel">Learner level</label><select id="pbLevel"><option>Higher Education / University</option><option>Foundation / Beginner</option><option>Vocational / Technical</option><option>Advanced University</option><option>Secondary School</option></select></div>
  <div class="field"><label for="pbCount">Number of questions</label><input id="pbCount" type="number" min="1" max="60" value="30"></div>
  <div class="field"><label for="pbDifficulty">Difficulty distribution</label><select id="pbDifficulty"><option value="Balanced: 30% Easy, 40% Medium, 30% Hard">Balanced — 30% Easy / 40% Medium / 30% Hard</option><option value="Beginner: 60% Easy, 30% Medium, 10% Hard">Beginner — 60% Easy / 30% Medium / 10% Hard</option><option value="Advanced: 10% Easy, 40% Medium, 50% Hard">Advanced — 10% Easy / 40% Medium / 50% Hard</option><option value="Easy only: 100% Easy">Easy only</option><option value="Medium only: 100% Medium">Medium only</option><option value="Hard only: 100% Hard">Hard only</option></select></div>
  <div class="field ai-wide"><label>Question types (select one or more)</label><div class="ai-checks"><label><input type="checkbox" class="pbType" value="Multiple Choice" checked> Multiple Choice</label><label><input type="checkbox" class="pbType" value="True/False" checked> True / False</label><label><input type="checkbox" class="pbType" value="Text" checked> Short Answer</label><label><input type="checkbox" class="pbType" value="Scenario" checked> Scenario / Application</label></div></div>
  <div class="field"><label for="pbCoverage">Content coverage</label><select id="pbCoverage"><option value="Cover all major topics proportionally">All major topics proportionally</option><option value="Prioritize learning outcomes and key concepts">Focus on learning outcomes</option><option value="Emphasize application and critical thinking">Emphasize application</option></select></div>
  <div class="field"><label for="pbStyle">Question wording</label><select id="pbStyle"><option value="Concise, clear, projector-friendly">Concise / projector-friendly</option><option value="Discussion-oriented and conceptual">Discussion-oriented</option><option value="Practical and scenario-based">Practical / scenario-based</option></select></div>
  <div class="field ai-wide"><label><input id="pbExplain" type="checkbox" checked> Include concise answer explanations</label><label><input id="pbLeak" type="checkbox" checked> Prevent answer leakage through keywords, categories and topics</label><label><input id="pbMultiple" type="checkbox" checked> Generate multiple questions for important keywords</label></div>
  </div><div id="pbStatus" class="ai-status" role="status"></div><button id="pbBuild" class="btn large">✦ Generate My Prompt</button></section>
  <section id="pbResult" class="ai-panel hidden"><div class="ai-review-head"><div><h2>Your ready-to-use AI prompt</h2><p class="note">Copy into ChatGPT, Copilot, Claude, Gemini, or another AI assistant. Attach your PPT/PDF in that tool.</p></div><div class="ai-review-actions"><button id="pbCopy" class="btn large">Copy Prompt</button><button id="pbDownload" class="btn ghost">Download .txt</button></div></div><textarea id="pbOutput" class="pb-output" readonly aria-label="Generated prompt"></textarea></section>`;
  $('#promptBack').onclick=()=>renderStart();
  $('#pbBuild').onclick=()=>{
    const course=$('#pbCourse').value.trim()||'[ENTER COURSE CODE AND TITLE]';
    const count=Math.floor(Number($('#pbCount').value));
    const types=[...document.querySelectorAll('.pbType:checked')].map(el=>el.value);
    if(!Number.isInteger(count)||count<1||count>60){$('#pbStatus').textContent='Please choose between 1 and 60 questions.';return;}
    if(!types.length){$('#pbStatus').textContent='Select at least one question type.';return;}
    const prompt=buildClassQuestPrompt({course,count,types,level:$('#pbLevel').value,difficulty:$('#pbDifficulty').value,coverage:$('#pbCoverage').value,style:$('#pbStyle').value,explain:$('#pbExplain').checked,leak:$('#pbLeak').checked,multiple:$('#pbMultiple').checked});
    $('#pbOutput').value=prompt;$('#pbResult').classList.remove('hidden');$('#pbStatus').textContent='Prompt ready. Copy it and attach your lecture slides in your preferred AI tool.';
    $('#pbCopy').onclick=async()=>{try{await navigator.clipboard.writeText(prompt);$('#pbStatus').textContent='Prompt copied to clipboard.';}catch(e){$('#pbOutput').focus();$('#pbOutput').select();$('#pbStatus').textContent='Select and copy the highlighted prompt (Ctrl/Cmd+C).';}};
    $('#pbDownload').onclick=()=>{const blob=new Blob([prompt],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='ClassQuest-Question-Bank-Prompt.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
    $('#pbResult').scrollIntoView({behavior:'smooth',block:'start'});
  };
}
function buildClassQuestPrompt(o){
return `HCT CLASSQUEST — UNIVERSAL QUESTION BANK GENERATION REQUEST

I am a teacher preparing an interactive classroom question bank. I have attached my lecture PowerPoint or PDF. Read the attached material carefully before creating any questions.

COURSE AND GENERATION SETTINGS
- Course: ${o.course}
- Learner level: ${o.level}
- Target question count: ${o.count}
- Allowed question types: ${o.types.join(', ')}
- Difficulty distribution: ${o.difficulty}
- Content coverage: ${o.coverage}
- Question style: ${o.style}
- Include brief answer explanations: ${o.explain?'Yes':'No'}
- Prevent keyword/topic answer leakage: ${o.leak?'Yes — mandatory check':'Use care to avoid answer leakage'}
- Multiple questions for important keywords: ${o.multiple?'Yes':'Optional'}

YOUR TASK
1. Analyze the actual attached teaching material. Use ONLY concepts supported by the uploaded slides/notes. Do not invent unsupported course content or facts.
2. Automatically identify appropriate Category, Topic and Keyword groupings, applicable to ANY academic subject (not just IT). Use the lecture's own terminology and adapt to the learners' level.
3. Create approximately ${o.count} distinct, meaningful questions, distributed across the main topics. If the slides do not contain enough reliable content for that number, generate fewer and explain why; do not fabricate material.
4. Use ONLY these QuestionType values as appropriate: ${o.types.join(', ')}. For a Multiple Choice question, put four options in the Question cell on separate lines, labeled A), B), C), D), after the question stem. Include the correct option letter AND answer text in the Answer cell. Do not place the options only in a separate column.
5. Difficulty: Easy = 10 points, Medium = 20 points, Hard = 30 points. The Points cell must contain a number. Follow this distribution as closely as the lecture content permits: ${o.difficulty}.
6. Questions must be clear, unambiguous, and suitable for a classroom projector. Avoid duplicates and superficial rewordings. ${o.style}.
7. ${o.explain?'Give concise explanations with answers when useful for classroom discussion.':'Keep answers brief and accurate.'}
8. ${o.multiple?'Create several distinct questions for major keywords, across different difficulty levels where appropriate.':'Group questions under meaningful, concise keywords.'}

CRITICAL CLASSQUEST DISPLAY RULE — NO ANSWER LEAKAGE
ClassQuest shows the Course, Category, Topic and Keyword BEFORE the question and displays the Keyword ABOVE the question. Do not use a Keyword, Topic or Category that directly states or makes the correct answer obvious. For example, if the question asks which component processes instructions, do NOT use "CPU" as the keyword; use "Computer Processing" instead. If the question is ABOUT CPU properties, "CPU" can be appropriate. Review every row for answer leakage and rewrite the question or grouping when necessary.

REQUIRED EXCEL FORMAT
Create a real downloadable .xlsx workbook. Its FIRST worksheet must contain EXACTLY these ten columns in this order:
Course | Category | Topic | Keyword | Question | Answer | Points | Difficulty | QuestionType | Image

Use exactly the Course value supplied above for every row. Each question must occupy ONE row. Do not rename, omit or reorder columns. Do not insert introductory or title rows. Keep Category, Topic and Keyword consistent across related questions. Populate every required cell except Image, which may be blank.

For questions requiring an image or diagram, use QuestionType = Image only if it was selected above AND the image can be referenced in a way that works in ClassQuest. Never invent image links or filenames. Otherwise create a text-based alternative if supported by the slides, or flag it for manual teacher review.

QUALITY CHECK BEFORE EXPORT
- All questions are supported by the attachment and cover major topics.
- Every Question, Answer, Category, Topic, Keyword, Difficulty and QuestionType is valid.
- Keyword/Topic/Category do not reveal the answer.
- MCQ options are clearly separated within the Question cell and the correct option is identified in Answer.
- Points match difficulty; no duplicate or near-duplicate questions.
- The Excel workbook opens normally and the FIRST sheet has the exact required headers.

FINAL OUTPUT
Produce the actual Excel (.xlsx) file, named [CourseCode]_ClassQuest_QuestionBank.xlsx, ready for upload into HCT ClassQuest. Do not give only a Markdown table. Briefly report total questions, counts by difficulty and type, topics covered, and any content that could not be reliably converted. If your AI tool cannot create an Excel file, provide a UTF-8 CSV with the same ten columns as a fallback and clearly state that limitation.
`;
}
