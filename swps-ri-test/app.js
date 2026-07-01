(function () {
  "use strict";

  const STORAGE_KEY = "quizReviewQuestions.ri.v1";
  const RANDOM_LIMIT = 50;

  const originalQuestions = Array.isArray(window.QUIZ_DATA)
    ? window.QUIZ_DATA
    : Array.isArray(window.quizData)
      ? window.quizData
      : [];

  const startScreen = document.getElementById("startScreen");
  const quizScreen = document.getElementById("quizScreen");
  const resultScreen = document.getElementById("resultScreen");

  const startBtn = document.getElementById("startBtn");
  const startRandom50Btn = document.getElementById("startRandom50Btn");
  const startReviewBtn = document.getElementById("startReviewBtn");
  const restartBtn = document.getElementById("restartBtn");
  const startReviewFromResultBtn = document.getElementById(
    "startReviewFromResultBtn",
  );
  const checkBtn = document.getElementById("checkBtn");
  const nextBtn = document.getElementById("nextBtn");
  const saveReviewBtn = document.getElementById("saveReviewBtn");
  const endTestBtn = document.getElementById("endTestBtn");
  const previewReviewStartBtn = document.getElementById(
    "previewReviewStartBtn",
  );

  const questionCount = document.getElementById("questionCount");
  const filteredCount = document.getElementById("filteredCount");
  const reviewCountStart = document.getElementById("reviewCountStart");
  const questionProgress = document.getElementById("questionProgress");
  const questionSource = document.getElementById("questionSource");
  const questionText = document.getElementById("questionText");
  const answersEl = document.getElementById("answers");
  const feedback = document.getElementById("feedback");
  const progressFill = document.getElementById("progressFill");
  const scoreBox = document.getElementById("scoreBox");
  const finalScore = document.getElementById("finalScore");
  const finalPercent = document.getElementById("finalPercent");
  const reviewSummary = document.getElementById("reviewSummary");
  const reviewStartPanel = document.getElementById("reviewStartPanel");
  const reviewStart = document.getElementById("reviewStart");
  const closeReviewStartPanelBtn = document.getElementById(
    "closeReviewStartPanelBtn",
  );
  const downloadReviewStartBtn = document.getElementById(
    "downloadReviewStartBtn",
  );
  const clearReviewStartBtn = document.getElementById("clearReviewStartBtn");
  const sourceSummaryCount = document.getElementById("sourceSummaryCount");

  const toggleReviewBtn = document.getElementById("toggleReviewBtn");
  const closeReviewPanelBtn = document.getElementById("closeReviewPanelBtn");
  const reviewPanel = document.getElementById("reviewPanel");
  const reviewLive = document.getElementById("reviewLive");
  const downloadReviewLiveBtn = document.getElementById(
    "downloadReviewLiveBtn",
  );
  const downloadReviewFinalBtn = document.getElementById(
    "downloadReviewFinalBtn",
  );
  const clearReviewLiveBtn = document.getElementById("clearReviewLiveBtn");
  const clearReviewFinalBtn = document.getElementById("clearReviewFinalBtn");

  const shuffleQuestionsInput = document.getElementById("shuffleQuestions");
  const shuffleAnswersInput = document.getElementById("shuffleAnswers");
  const autoCheckAnswerInput = document.getElementById("autoCheckAnswer");
  const sourceCheckboxes = document.getElementById("sourceCheckboxes");
  const selectAllSourcesBtn = document.getElementById("selectAllSourcesBtn");
  const clearSourcesBtn = document.getElementById("clearSourcesBtn");

  let allQuestions = originalQuestions.map(normalizeQuestion).filter(Boolean);
  let allSources = getAllSources(allQuestions);
  let questions = [];
  let currentIndex = 0;
  let selectedLetter = null;
  let score = 0;
  let answered = false;
  let quizMode = "filtered";

  init();

  function init() {
    renderSourceCheckboxes();

    questionCount.textContent = allQuestions.length
      ? `Liczba pytań w bazie: ${allQuestions.length}`
      : "Nie udało się wczytać pytań. Sprawdź, czy plik quiz-data.js jest w tym samym folderze co index.html.";

    if (!allQuestions.length) {
      startBtn.disabled = true;
      startRandom50Btn.disabled = true;
      startReviewBtn.disabled = true;
    }

    startBtn.addEventListener("click", () => startQuiz("filtered"));
    previewReviewStartBtn.addEventListener("click", toggleStartReviewPanel);
    startRandom50Btn.addEventListener("click", () => startQuiz("random50"));
    startReviewBtn.addEventListener("click", () => startQuiz("review"));
    restartBtn.addEventListener("click", showStartScreen);
    startReviewFromResultBtn.addEventListener("click", () =>
      startQuiz("review"),
    );

    checkBtn.addEventListener("click", checkAnswer);
    nextBtn.addEventListener("click", goNext);
    endTestBtn.addEventListener("click", endTestAndReturnToMenu);
    saveReviewBtn.addEventListener("click", saveCurrentQuestionManually);
    toggleReviewBtn.addEventListener("click", toggleReviewPanel);
    closeReviewPanelBtn.addEventListener("click", closeReviewPanel);
    downloadReviewLiveBtn.addEventListener("click", () =>
      downloadReviewQuestions("pytania_do_powtorki.txt"),
    );
    downloadReviewFinalBtn.addEventListener("click", () =>
      downloadReviewQuestions("pytania_do_powtorki.txt"),
    );
    clearReviewLiveBtn.addEventListener("click", clearAllReviewQuestions);
    clearReviewFinalBtn.addEventListener("click", clearAllReviewQuestions);
    closeReviewStartPanelBtn.addEventListener("click", closeStartReviewPanel);
    downloadReviewStartBtn.addEventListener("click", () =>
      downloadReviewQuestions("pytania_do_powtorki.txt"),
    );
    clearReviewStartBtn.addEventListener("click", clearAllReviewQuestions);

    selectAllSourcesBtn.addEventListener("click", () =>
      setAllSourcesChecked(true),
    );
    clearSourcesBtn.addEventListener("click", () =>
      setAllSourcesChecked(false),
    );

    sourceCheckboxes.addEventListener("change", updateStartScreenCounts);

    updateReviewUi();
    updateStartScreenCounts();
  }

  function normalizeQuestion(raw) {
    if (!raw) return null;

    const id = raw.question_id ?? raw.id ?? "";
    const text = String(raw.question ?? raw.text ?? "").trim();
    if (!text) return null;

    const rawAnswers = raw.answers || raw.options || {};
    const answerMap = normalizeAnswers(rawAnswers);
    const answers = ["A", "B", "C", "D"]
      .filter((letter) => answerMap[letter])
      .map((letter) => ({ letter, text: answerMap[letter] }));

    if (!answers.length) return null;

    const correct = String(raw.correct_answer ?? raw.correctAnswer ?? "")
      .trim()
      .toUpperCase();
    const correctAnswers = correct
      .split(",")
      .map((item) => item.trim().toUpperCase())
      .filter((item) => ["A", "B", "C", "D"].includes(item));

    const answerJustifications = normalizeAnswerJustifications(
      raw.incorrect_answers_explanation ||
        raw.uzasadnienia_odpowiedzi ||
        raw.answerJustifications ||
        {},
      raw.correct_answer_justification ||
        raw.uzasadnienie_poprawnej ||
        raw.justification ||
        "",
      correctAnswers,
    );

    const sources = normalizeSources(raw);
    const sourceObject = raw.source || {
      file: raw.question_source || sources.join("; "),
      pages: "",
      numberInFile: "",
    };

    return {
      id,
      key: raw.key || buildQuestionKey({ id, question: text }),
      text,
      question: text,
      options: answerMap,
      answers,
      correctAnswer: correctAnswers.join(", "),
      correctAnswers,
      source: sourceObject,
      sources,
      justification:
        raw.correct_answer_justification ||
        raw.uzasadnienie_poprawnej ||
        raw.justification ||
        "",
      answerJustifications,
      raw,
    };
  }

  function normalizeAnswers(rawAnswers) {
    const result = { A: "", B: "", C: "", D: "" };

    Object.entries(rawAnswers || {}).forEach(([key, value]) => {
      const normalizedKey = String(key).trim().toLowerCase();
      let letter = "";

      if (["a", "b", "c", "d"].includes(normalizedKey)) {
        letter = normalizedKey.toUpperCase();
      } else if (normalizedKey.startsWith("a")) {
        letter = "A";
      } else if (normalizedKey.startsWith("b")) {
        letter = "B";
      } else if (normalizedKey.startsWith("c")) {
        letter = "C";
      } else if (normalizedKey.startsWith("d")) {
        letter = "D";
      }

      if (letter && !result[letter]) {
        result[letter] = String(value ?? "").trim();
      }
    });

    return result;
  }

  function normalizeAnswerJustifications(
    rawExplanations,
    correctJustification,
    correctAnswers,
  ) {
    const result = { A: "", B: "", C: "", D: "" };

    Object.entries(rawExplanations || {}).forEach(([key, value]) => {
      const text = String(value ?? "").trim();
      const keyParts = String(key)
        .split(",")
        .map((part) => part.trim().toLowerCase())
        .filter(Boolean);

      keyParts.forEach((normalizedKey) => {
        let letter = "";
        if (["a", "b", "c", "d"].includes(normalizedKey)) {
          letter = normalizedKey.toUpperCase();
        } else if (normalizedKey.startsWith("a")) {
          letter = "A";
        } else if (normalizedKey.startsWith("b")) {
          letter = "B";
        } else if (normalizedKey.startsWith("c")) {
          letter = "C";
        } else if (normalizedKey.startsWith("d")) {
          letter = "D";
        }
        if (letter && text && !result[letter]) result[letter] = text;
      });
    });

    (correctAnswers || []).forEach((letter) => {
      if (!result[letter]) result[letter] = correctJustification || "";
    });

    return result;
  }

  function normalizeSources(raw) {
    const values = [];

    if (Array.isArray(raw.sources)) {
      raw.sources.forEach((item) => {
        if (item) values.push(String(item).trim());
      });
    }

    if (raw.question_source) values.push(String(raw.question_source).trim());

    if (raw.source && raw.source.file) {
      String(raw.source.file)
        .split(";")
        .map((item) => item.trim())
        .filter(Boolean)
        .forEach((item) => values.push(item));
    }

    return Array.from(new Set(values.filter(Boolean)));
  }

  function getAllSources(questionList) {
    const set = new Set();
    questionList.forEach((question) => {
      (question.sources || []).forEach((source) => set.add(source));
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b, "pl"));
  }

  function renderSourceCheckboxes() {
    sourceCheckboxes.innerHTML = "";

    if (!allSources.length) {
      const paragraph = document.createElement("p");
      paragraph.className = "muted";
      paragraph.textContent = "Brak rozpoznanych źródeł w bazie.";
      sourceCheckboxes.appendChild(paragraph);
      return;
    }

    allSources.forEach((source) => {
      const id = `source-${safeId(source)}`;
      const count = allQuestions.filter((question) =>
        question.sources.includes(source),
      ).length;

      const label = document.createElement("label");
      label.className = "source-checkbox";

      const input = document.createElement("input");
      input.type = "checkbox";
      input.value = source;
      input.checked = true;
      input.id = id;

      const span = document.createElement("span");
      span.textContent = `${source} (${count})`;

      label.appendChild(input);
      label.appendChild(span);
      sourceCheckboxes.appendChild(label);
    });
  }

  function getSelectedSources() {
    return Array.from(
      sourceCheckboxes.querySelectorAll('input[type="checkbox"]:checked'),
    ).map((input) => input.value);
  }

  function setAllSourcesChecked(checked) {
    sourceCheckboxes
      .querySelectorAll('input[type="checkbox"]')
      .forEach((input) => {
        input.checked = checked;
      });
    updateStartScreenCounts();
  }

  function getQuestionsForSelectedSources() {
    const selectedSources = getSelectedSources();

    if (!selectedSources.length) return [];

    return allQuestions.filter((question) => {
      const questionSources = question.sources || [];
      return questionSources.some((source) => selectedSources.includes(source));
    });
  }

  function updateStartScreenCounts() {
    const selectedCount = getQuestionsForSelectedSources().length;
    const selectedSourcesCount = getSelectedSources().length;
    filteredCount.textContent = `Pytania z zaznaczonych źródeł: ${selectedCount}`;
    if (sourceSummaryCount) {
      sourceSummaryCount.textContent = `${selectedSourcesCount}/${allSources.length} źródeł · ${selectedCount} pytań`;
    }
    startBtn.disabled = selectedCount === 0;
    startRandom50Btn.disabled = selectedCount === 0;
  }

  function startQuiz(mode) {
    quizMode = mode;

    if (mode === "review") {
      const reviewItems = loadReviewItems();
      questions = reviewItems
        .map((item) =>
          normalizeQuestion(item.question || findOriginalQuestion(item)),
        )
        .filter(Boolean);

      if (!questions.length) {
        alert("Nie masz jeszcze zapisanych pytań do powtórki.");
        updateReviewUi();
        return;
      }
    } else {
      const selectedQuestions = getQuestionsForSelectedSources();

      if (!selectedQuestions.length) {
        alert("Zaznacz przynajmniej jedno źródło zawierające pytania.");
        updateStartScreenCounts();
        return;
      }

      questions = selectedQuestions.slice();

      if (mode === "random50") {
        questions = shuffleArray(questions).slice(
          0,
          Math.min(RANDOM_LIMIT, questions.length),
        );
      }
    }

    if (shuffleQuestionsInput.checked && mode !== "random50") {
      questions = shuffleArray(questions);
    }

    if (shuffleAnswersInput.checked) {
      questions = questions.map((question) => ({
        ...question,
        answers: shuffleArray(question.answers),
      }));
    }

    currentIndex = 0;
    selectedLetter = null;
    score = 0;
    answered = false;

    closeStartReviewPanel();
    startScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    closeReviewPanel();
    updateReviewUi();
    renderQuestion();
  }

  function showStartScreen() {
    resultScreen.classList.add("hidden");
    quizScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
    updateReviewUi();
    updateStartScreenCounts();
  }

  function endTestAndReturnToMenu() {
    const confirmed = confirm(
      "Zakończyć test i wrócić do menu głównego? Aktualny wynik nie zostanie zapisany.",
    );
    if (!confirmed) return;
    closeReviewPanel();
    showStartScreen();
  }

  function toggleStartReviewPanel() {
    if (reviewStartPanel.classList.contains("hidden")) {
      renderReviewList(reviewStart, true);
      reviewStartPanel.classList.remove("hidden");
      previewReviewStartBtn.textContent = "Ukryj pytania do powtórki";
    } else {
      closeStartReviewPanel();
    }
  }

  function closeStartReviewPanel() {
    if (!reviewStartPanel) return;
    reviewStartPanel.classList.add("hidden");
    if (previewReviewStartBtn)
      previewReviewStartBtn.textContent = "Podgląd pytań do powtórki";
  }

  function renderQuestion() {
    const question = questions[currentIndex];
    selectedLetter = null;
    answered = false;

    const currentNumber = currentIndex + 1;
    const total = questions.length;
    const modeLabel =
      quizMode === "review"
        ? "Powtórka"
        : quizMode === "random50"
          ? "50 losowych"
          : "Test";

    questionProgress.textContent = `${modeLabel}: pytanie ${currentNumber} z ${total} — ID: ${question.id || "brak"}`;
    questionSource.textContent = formatSource(question);
    questionText.textContent = question.text;
    scoreBox.textContent = `Wynik: ${score}/${currentIndex}`;
    progressFill.style.width = `${(currentIndex / total) * 100}%`;

    feedback.className = "feedback hidden";
    feedback.innerHTML = "";
    checkBtn.disabled = true;
    checkBtn.classList.remove("hidden");
    nextBtn.classList.add("hidden");

    saveReviewBtn.classList.add("hidden");
    saveReviewBtn.disabled = isQuestionInReview(question);
    saveReviewBtn.textContent = isQuestionInReview(question)
      ? "Już zapisane do powtórki"
      : "Zapisz do powtórki";

    answersEl.innerHTML = "";
    question.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "answer";
      button.dataset.letter = answer.letter;

      const letterSpan = document.createElement("span");
      letterSpan.className = "answer-letter";
      letterSpan.textContent = `${answer.letter}.`;

      const textSpan = document.createElement("span");
      textSpan.textContent = answer.text;

      button.appendChild(letterSpan);
      button.appendChild(textSpan);
      button.addEventListener("click", () => selectAnswer(answer.letter));
      answersEl.appendChild(button);
    });

    updateReviewUi();
  }

  function selectAnswer(letter) {
    if (answered) return;
    selectedLetter = letter;
    checkBtn.disabled = false;

    document.querySelectorAll(".answer").forEach((button) => {
      button.classList.toggle("selected", button.dataset.letter === letter);
    });

    if (autoCheckAnswerInput && autoCheckAnswerInput.checked) {
      checkAnswer();
    }
  }

  function checkAnswer() {
    if (!selectedLetter || answered) return;

    const question = questions[currentIndex];
    const isCorrect = question.correctAnswers.includes(selectedLetter);
    answered = true;

    if (isCorrect) {
      score += 1;
    } else {
      saveQuestionToReview(question, {
        reason: "Odpowiedź błędna",
        selectedLetter,
        manual: false,
      });
    }

    document.querySelectorAll(".answer").forEach((button) => {
      const letter = button.dataset.letter;
      button.disabled = true;
      if (question.correctAnswers.includes(letter))
        button.classList.add("correct");
      if (letter === selectedLetter && !isCorrect)
        button.classList.add("incorrect");
    });

    feedback.classList.remove("hidden");
    feedback.classList.add(isCorrect ? "ok" : "bad");
    feedback.innerHTML = buildFeedbackHtml(question, isCorrect);

    scoreBox.textContent = `Wynik: ${score}/${currentIndex + 1}`;
    progressFill.style.width = `${((currentIndex + 1) / questions.length) * 100}%`;

    checkBtn.classList.add("hidden");
    nextBtn.classList.remove("hidden");
    nextBtn.textContent =
      currentIndex + 1 === questions.length
        ? "Zobacz wynik"
        : "Następne pytanie";

    saveReviewBtn.classList.remove("hidden");
    saveReviewBtn.disabled = isQuestionInReview(question);
    saveReviewBtn.textContent = isQuestionInReview(question)
      ? "Zapisane do powtórki"
      : "Zapisz do powtórki";

    updateReviewUi();
    if (!reviewPanel.classList.contains("hidden")) {
      renderReviewList(reviewLive, true);
    }
  }

  function buildFeedbackHtml(question, isCorrect) {
    const correctAnswerText = getCorrectAnswerText(question);
    const statusText = isCorrect
      ? "Dobrze!"
      : `Źle. Poprawna odpowiedź: ${correctAnswerText || "brak danych"}.`;

    const parts = [
      `<div class="feedback-status">${escapeHtml(statusText)}</div>`,
    ];

    // if (question.justification) {
    //   parts.push(`<div class="feedback-justification"><strong>Uzasadnienie poprawnej odpowiedzi:</strong> ${escapeHtml(question.justification)}</div>`);
    // } else {
    //   parts.push('<div class="feedback-justification"><strong>Uzasadnienie poprawnej odpowiedzi:</strong> brak uzasadnienia w danych.</div>');
    // }

    // const selectedExplanation = question.answerJustifications[selectedLetter];
    // if (selectedExplanation) {
    //   parts.push(`<div class="feedback-justification"><strong>Wyjaśnienie zaznaczonej odpowiedzi ${escapeHtml(selectedLetter)}:</strong> ${escapeHtml(selectedExplanation)}</div>`);
    // }

    const allExplanations = ["A", "B", "C", "D"]
      .filter((letter) => question.options[letter])
      .map((letter) => {
        const isCorrectAnswer = question.correctAnswers.includes(letter);
        const explanation =
          question.answerJustifications[letter] ||
          (isCorrectAnswer
            ? question.justification
            : "Brak uzasadnienia w danych.");
        return `
          <div class="answer-explanation-card ${isCorrectAnswer ? "correct-explanation" : "incorrect-explanation"}">
            <div class="answer-explanation-heading">
              <strong>${letter}. ${escapeHtml(question.options[letter])}</strong>
              <span class="${isCorrectAnswer ? "ok-text" : "bad-text"}">${isCorrectAnswer ? "Odpowiedź poprawna" : "Odpowiedź niepoprawna"}</span>
            </div>
            <div>${escapeHtml(explanation)}</div>
          </div>
        `;
      })
      .join("");

    parts.push(
      `<div class="answer-explanations open-explanations">${allExplanations}</div>`,
    );

    return parts.join("");
  }

  function saveCurrentQuestionManually() {
    if (!answered) return;

    const question = questions[currentIndex];
    const added = saveQuestionToReview(question, {
      reason: "Zapisane ręcznie do powtórki",
      selectedLetter,
      manual: true,
    });

    saveReviewBtn.disabled = true;
    saveReviewBtn.textContent = added
      ? "Zapisano do powtórki"
      : "Już zapisane do powtórki";

    updateReviewUi();
    if (!reviewPanel.classList.contains("hidden")) {
      renderReviewList(reviewLive, true);
    }
  }

  function goNext() {
    if (currentIndex + 1 < questions.length) {
      currentIndex += 1;
      renderQuestion();
    } else {
      showResult();
    }
  }

  function showResult() {
    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    const percent = questions.length
      ? Math.round((score / questions.length) * 100)
      : 0;
    finalScore.textContent = `${score} / ${questions.length}`;
    finalPercent.textContent = `Wynik procentowy: ${percent}%`;
    renderReviewList(reviewSummary, false);
    updateReviewUi();
  }

  function saveQuestionToReview(question, metadata) {
    const items = loadReviewItems();
    const key = buildQuestionKey(question);
    const existing = items.find((item) => item.key === key);
    const now = new Date().toISOString();

    if (existing) {
      existing.updatedAt = now;
      existing.reason = metadata.reason || existing.reason;
      existing.manual = Boolean(existing.manual || metadata.manual);
      existing.selectedLetter =
        metadata.selectedLetter || existing.selectedLetter || "";
      existing.selectedText =
        getAnswerText(question, metadata.selectedLetter) ||
        existing.selectedText ||
        "";
      existing.question = serializeQuestion(question);
      saveReviewItems(items);
      return false;
    }

    items.push({
      key,
      id: question.id,
      reason: metadata.reason || "Do powtórki",
      manual: Boolean(metadata.manual),
      selectedLetter: metadata.selectedLetter || "",
      selectedText: getAnswerText(question, metadata.selectedLetter) || "",
      correctText: getCorrectAnswerText(question),
      addedAt: now,
      updatedAt: now,
      question: serializeQuestion(question),
    });

    saveReviewItems(items);
    return true;
  }

  function serializeQuestion(question) {
    return {
      question_id: question.id,
      key: buildQuestionKey(question),
      question: question.text,
      answers: {
        a: question.options.A || "",
        b: question.options.B || "",
        c: question.options.C || "",
        d: question.options.D || "",
      },
      correct_answer: question.correctAnswers.join(", ").toLowerCase(),
      correct_answer_justification: question.justification || "",
      incorrect_answers_explanation: {
        a: question.answerJustifications.A || "",
        b: question.answerJustifications.B || "",
        c: question.answerJustifications.C || "",
        d: question.answerJustifications.D || "",
      },
      question_source: question.sources[0] || "",
      sources: question.sources || [],
      verification_sources:
        (question.raw && question.raw.verification_sources) || [],
    };
  }

  function removeReviewQuestion(key) {
    const items = loadReviewItems().filter((item) => item.key !== key);
    saveReviewItems(items);

    if (
      answered &&
      questions[currentIndex] &&
      buildQuestionKey(questions[currentIndex]) === key
    ) {
      saveReviewBtn.disabled = false;
      saveReviewBtn.textContent = "Zapisz do powtórki";
    }

    renderReviewList(reviewLive, true);
    renderReviewList(reviewSummary, false);
    renderReviewList(reviewStart, true);
    updateReviewUi();
  }

  function clearAllReviewQuestions() {
    const count = loadReviewItems().length;
    if (!count) return;

    const confirmed = confirm(
      `Usunąć wszystkie pytania do powtórki? Liczba pytań: ${count}`,
    );
    if (!confirmed) return;

    saveReviewItems([]);

    if (answered && questions[currentIndex]) {
      saveReviewBtn.disabled = false;
      saveReviewBtn.textContent = "Zapisz do powtórki";
    }

    renderReviewList(reviewLive, true);
    renderReviewList(reviewSummary, false);
    renderReviewList(reviewStart, true);
    closeReviewPanel();
    closeStartReviewPanel();
    updateReviewUi();
  }

  function isQuestionInReview(question) {
    const key = buildQuestionKey(question);
    return loadReviewItems().some((item) => item.key === key);
  }

  function buildQuestionKey(question) {
    if (
      question &&
      question.id !== undefined &&
      question.id !== null &&
      String(question.id).trim() !== ""
    ) {
      return `id:${question.id}`;
    }
    const text = String(question.question || question.text || "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");
    return `text:${text}`;
  }

  function findOriginalQuestion(item) {
    if (!item) return null;
    const key = item.key || (item.id !== undefined ? `id:${item.id}` : "");
    return (
      allQuestions.find((question) => buildQuestionKey(question) === key) ||
      item.question ||
      null
    );
  }

  function loadReviewItems() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.warn("Nie udało się odczytać pytań do powtórki:", error);
      return [];
    }
  }

  function saveReviewItems(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  function updateReviewUi() {
    const count = loadReviewItems().length;

    toggleReviewBtn.textContent = `Pytania do powtórki: ${count}`;
    toggleReviewBtn.disabled = count === 0;

    startReviewBtn.disabled = count === 0;
    startReviewFromResultBtn.disabled = count === 0;
    downloadReviewLiveBtn.disabled = count === 0;
    downloadReviewFinalBtn.disabled = count === 0;
    clearReviewLiveBtn.disabled = count === 0;
    clearReviewFinalBtn.disabled = count === 0;
    if (previewReviewStartBtn) previewReviewStartBtn.disabled = count === 0;
    if (downloadReviewStartBtn) downloadReviewStartBtn.disabled = count === 0;
    if (clearReviewStartBtn) clearReviewStartBtn.disabled = count === 0;

    reviewCountStart.textContent = count
      ? `Zapisane pytania do powtórki: ${count}`
      : "Nie masz jeszcze zapisanych pytań do powtórki.";
  }

  function toggleReviewPanel() {
    if (reviewPanel.classList.contains("hidden")) {
      renderReviewList(reviewLive, true);
      reviewPanel.classList.remove("hidden");
      toggleReviewBtn.textContent = "Ukryj pytania do powtórki";
    } else {
      closeReviewPanel();
    }
  }

  function closeReviewPanel() {
    reviewPanel.classList.add("hidden");
    updateReviewUi();
  }

  function renderReviewList(targetElement, compact) {
    if (!targetElement) return;
    targetElement.innerHTML = "";

    const items = loadReviewItems();

    const title = document.createElement("h2");
    title.className = "review-title";
    title.textContent = items.length
      ? `Pytania do powtórki: ${items.length}`
      : "Brak pytań do powtórki";
    targetElement.appendChild(title);

    if (!items.length) {
      const paragraph = document.createElement("p");
      paragraph.className = "muted";
      paragraph.textContent =
        "Pytania trafią tu automatycznie po błędnej odpowiedzi albo ręcznie po kliknięciu „Zapisz do powtórki”.";
      targetElement.appendChild(paragraph);
      return;
    }

    const list = document.createElement("div");
    list.className = "review-list";

    items.forEach((item, index) => {
      const question = normalizeQuestion(
        item.question || findOriginalQuestion(item),
      );
      if (!question) return;

      const details = document.createElement("details");
      details.className = "review-item";
      if (!compact) details.open = false;

      const summary = document.createElement("summary");
      summary.textContent = `${index + 1}. ID: ${question.id || "brak"} — ${item.reason || "Do powtórki"}`;
      details.appendChild(summary);

      const source = document.createElement("p");
      source.className = "source review-source";
      source.textContent = formatSource(question);
      details.appendChild(source);

      const questionText = document.createElement("p");
      questionText.className = "review-question";
      questionText.textContent = question.text;
      details.appendChild(questionText);

      if (item.selectedLetter) {
        const selected = document.createElement("p");
        selected.className = "review-line";
        selected.innerHTML = `<strong>Ostatnia zaznaczona odpowiedź:</strong> ${escapeHtml(item.selectedLetter)}. ${escapeHtml(item.selectedText || getAnswerText(question, item.selectedLetter))}`;
        details.appendChild(selected);
      }

      const correct = document.createElement("p");
      correct.className = "review-line";
      correct.innerHTML = `<strong>Poprawna odpowiedź:</strong> ${escapeHtml(getCorrectAnswerText(question))}`;
      details.appendChild(correct);

      if (question.justification) {
        const justification = document.createElement("p");
        justification.className = "review-justification";
        justification.innerHTML = `<strong>Uzasadnienie:</strong> ${escapeHtml(question.justification)}`;
        details.appendChild(justification);
      }

      const removeButton = document.createElement("button");
      removeButton.type = "button";
      removeButton.className = "danger small-button";
      removeButton.textContent = "Usuń z powtórek";
      removeButton.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        removeReviewQuestion(item.key);
      });
      details.appendChild(removeButton);

      list.appendChild(details);
    });

    targetElement.appendChild(list);
  }

  function downloadReviewQuestions(filename) {
    const items = loadReviewItems();
    if (!items.length) return;

    const content = buildReviewText(items);
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  }

  function buildReviewText(items) {
    const lines = [];
    lines.push("PYTANIA DO POWTÓRKI");
    lines.push(`Data eksportu: ${new Date().toLocaleString("pl-PL")}`);
    lines.push(`Liczba pytań do powtórki: ${items.length}`);
    lines.push("");

    items.forEach((item, index) => {
      const question = normalizeQuestion(
        item.question || findOriginalQuestion(item),
      );
      if (!question) return;

      lines.push("=".repeat(70));
      lines.push(`${index + 1}. ID: ${question.id || "brak"}`);
      lines.push(`Status: ${item.reason || "Do powtórki"}`);
      lines.push(`Źródło: ${formatSource(question) || "brak danych"}`);
      lines.push("");
      lines.push("Treść pytania:");
      lines.push(question.text || "");
      lines.push("");
      if (item.selectedLetter) {
        lines.push(
          `Ostatnia zaznaczona odpowiedź: ${item.selectedLetter}. ${item.selectedText || getAnswerText(question, item.selectedLetter) || ""}`,
        );
      }
      lines.push(
        `Poprawna odpowiedź: ${getCorrectAnswerText(question) || "brak danych"}`,
      );

      if (question.justification) {
        lines.push("");
        lines.push("Uzasadnienie:");
        lines.push(question.justification);
      }

      lines.push("");
    });

    return lines.join("\n");
  }

  function formatSource(questionOrSource) {
    if (!questionOrSource) return "";

    if (Array.isArray(questionOrSource.sources)) {
      return `Źródło: ${questionOrSource.sources.join(" · ")}`;
    }

    const source = questionOrSource.source || questionOrSource;
    const parts = [];
    if (source && source.file) parts.push(`Źródło: ${source.file}`);
    if (source && source.pages) parts.push(`strona: ${source.pages}`);
    if (source && source.numberInFile)
      parts.push(`nr w pliku: ${source.numberInFile}`);
    return parts.join(" · ");
  }

  function getAnswerText(question, letter) {
    if (!letter) return "";
    const answer = question.answers.find((item) => item.letter === letter);
    return answer ? answer.text : "";
  }

  function getCorrectAnswerText(question) {
    if (!question.correctAnswers || !question.correctAnswers.length) return "";
    return question.correctAnswers
      .map((letter) => `${letter}. ${getAnswerText(question, letter)}`)
      .join(" / ");
  }

  function safeId(value) {
    return String(value).replace(/[^a-zA-Z0-9_-]/g, "-");
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function shuffleArray(array) {
    const copy = array.slice();
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }
})();
