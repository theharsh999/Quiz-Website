/*
 * =======================================
 * QUIZ PAGE LOGIC
 * =======================================
 * This file handles the quiz flow and user interactions.
 * It:
 * - Displays questions and options from js/questions.js
 * - Tracks user selections and answer states
 * - Manages Question Palette for navigation
 * - Calculates score
 * - Saves results to localStorage
 * - Redirects to result page
 * =======================================
 */

// Import the questions array from js/questions.js
// Questions are loaded via <script> tag in quiz.html

// Wait for the page to fully load before accessing HTML elements
document.addEventListener("DOMContentLoaded", function () {
	// --- Step 1: Get HTML elements ---
	// These correspond to elements in quiz.html
	const quizTitleEl = document.getElementById("quiz-title");
	const quizTimerEl = document.getElementById("quiz-timer");
	const questionTextEl = document.getElementById("question-text");
	const optionsContainerEl = document.getElementById("options-container");
	const currentQuestionEl = document.getElementById("current-question");
	const totalQuestionsEl = document.getElementById("total-questions");
	const nextBtn = document.getElementById("next-btn");
	const skipBtn = document.getElementById("skip-btn");
	const exitQuizBtn = document.getElementById("exit-quiz-btn");
	const paletteGridEl = document.getElementById("palette-grid"); // Question palette container

	// Safety check: if this script loads on the wrong page, stop gracefully
	if (!questionTextEl || !optionsContainerEl || !currentQuestionEl || !totalQuestionsEl || !nextBtn) {
		return;
	}

	// --- Step 2: Quiz state variables ---
	// These will be initialized/restored after loading questions
	let currentIndex = 0; // Which question we're on (0-based index)
	let score = 0; // Number of correct answers
	let selectedIndex = null; // User's choice for current question (null = not selected)

	// --- Step 2.1: Answer tracking for Question Palette ---
	// Each question has a state: "unanswered" (not visited), "answered", or "skipped"
	// answerStates[i] = { state: "unanswered"|"answered"|"skipped", selectedOption: number|null }
	let answerStates = []; // Will be initialized after questions are loaded

	// --- Step 2.2: Timer variables ---
	let elapsedSeconds = 0;
	let timerIntervalId = null;

	function formatTimeMMSS(totalSeconds) {
		const minutes = Math.floor(totalSeconds / 60);
		const seconds = totalSeconds % 60;
		const mm = String(minutes).padStart(2, "0");
		const ss = String(seconds).padStart(2, "0");
		return `${mm}:${ss}`;
	}

	function updateTimerUI() {
		if (quizTimerEl) {
			quizTimerEl.textContent = formatTimeMMSS(elapsedSeconds);
		}
	}

	function stopTimerAndSave() {
		if (timerIntervalId !== null) {
			clearInterval(timerIntervalId);
			timerIntervalId = null;
		}
		localStorage.setItem("quizTime", formatTimeMMSS(elapsedSeconds));
	}

	// --- Step 2.3: Auto-save progress to localStorage ---
	// Saves current state so quiz can resume after refresh
	function saveProgress() {
		const progressData = {
			currentIndex: currentIndex,
			score: score,
			answerStates: answerStates,
			elapsedSeconds: elapsedSeconds,
			quizType: quizType // Save which quiz is being taken
		};
		localStorage.setItem("quizProgress", JSON.stringify(progressData));
	}

	// --- Step 2.4: Clear saved progress (on exit or finish) ---
	function clearProgress() {
		localStorage.removeItem("quizProgress");
	}

	// --- Step 2.5: Load saved progress from localStorage ---
	// Returns saved data or null if no progress exists
	function loadProgress() {
		try {
			const saved = localStorage.getItem("quizProgress");
			if (!saved) return null;
			return JSON.parse(saved);
		} catch (e) {
			return null; // Invalid data, start fresh
		}
	}

	// --- Step 3: Pick which quiz to load (multi-quiz support) ---
	// Read quiz type from URL (example: quiz.html?quiz=html)
	const params = new URLSearchParams(window.location.search);
	const requestedQuizType = String(params.get("quiz") || "").toLowerCase().trim();

	// If quiz type is missing/invalid, fall back to "web"
	const quizType =
		requestedQuizType && typeof quizzes === "object" && quizzes && quizzes[requestedQuizType]
			? requestedQuizType
			: "web";

	// Load the correct question set from the quizzes object in questions.js
	const selectedQuiz = typeof quizzes === "object" && quizzes ? quizzes[quizType] : null;
	const questions = selectedQuiz && Array.isArray(selectedQuiz.questions) ? selectedQuiz.questions : [];

	// Update quiz title on the page (if the element exists)
	if (quizTitleEl && selectedQuiz && typeof selectedQuiz.title === "string") {
		quizTitleEl.textContent = selectedQuiz.title;
	}

	// Safety check: if question list is missing or empty, show error
	if (!Array.isArray(questions) || questions.length === 0) {
		questionTextEl.textContent = "No questions found.";
		optionsContainerEl.innerHTML = "";
		nextBtn.disabled = true;
		return;
	}

	// Filter out any malformed questions to prevent crashes
	// Valid question must have: question text, 4 options, valid correctIndex (0-3)
	const safeQuestions = questions.filter(function (q) {
		const hasText = q && typeof q.question === "string" && q.question.trim().length > 0;
		const hasOptions = q && Array.isArray(q.options) && q.options.length === 4;
		const hasCorrectIndex = q && Number.isInteger(q.correctIndex) && q.correctIndex >= 0 && q.correctIndex < 4;
		return hasText && hasOptions && hasCorrectIndex;
	});

	// If no valid questions, show error and stop
	if (safeQuestions.length === 0) {
		questionTextEl.textContent = "No valid questions found.";
		optionsContainerEl.innerHTML = "";
		nextBtn.disabled = true;
		return;
	}

	// Update UI to show total questions
	totalQuestionsEl.textContent = String(safeQuestions.length);

	// --- Step 4: Try to restore saved progress ---
	const savedProgress = loadProgress();
	let resumedFromSave = false;

	if (savedProgress && savedProgress.quizType === quizType) {
		// Validate saved data matches current quiz
		if (
			Array.isArray(savedProgress.answerStates) &&
			savedProgress.answerStates.length === safeQuestions.length
		) {
			// Restore saved state
			currentIndex = savedProgress.currentIndex || 0;
			score = savedProgress.score || 0;
			answerStates = savedProgress.answerStates;
			elapsedSeconds = savedProgress.elapsedSeconds || 0;
			resumedFromSave = true;
			console.log("Quiz progress restored from last session.");
		}
	}

	// If not resuming, initialize fresh answer states
	if (!resumedFromSave) {
		// Clear any old results from previous completed quiz
		localStorage.removeItem("quizScore");
		localStorage.removeItem("totalQuestions");
		localStorage.removeItem("quizTime");
		clearProgress();

		// Each question starts as "unanswered" with no selected option
		answerStates = safeQuestions.map(function () {
			return { state: "unanswered", selectedOption: null };
		});
	}

	// --- Step 4.1: Start timer (from restored value or 0) ---
	updateTimerUI();
	timerIntervalId = window.setInterval(function () {
		elapsedSeconds += 1;
		updateTimerUI();
		// Auto-save progress every second
		saveProgress();
	}, 1000);

	// --- Step 4.2: Build the Question Palette UI ---
	// Creates numbered buttons (1, 2, 3...) for each question
	function buildPalette() {
		if (!paletteGridEl) return;

		paletteGridEl.innerHTML = ""; // Clear existing buttons

		safeQuestions.forEach(function (_, index) {
			const btn = document.createElement("button");
			btn.type = "button";
			btn.className = "palette-btn";
			btn.textContent = String(index + 1); // 1-based display
			btn.setAttribute("aria-label", "Go to question " + (index + 1));

			// Click handler: navigate to this question
			btn.addEventListener("click", function () {
				navigateToQuestion(index);
			});

			paletteGridEl.appendChild(btn);
		});

		// Update palette to show current states
		updatePaletteUI();
	}

	// --- Step 3.5: Update palette button states (colors) ---
	// Called whenever answer state changes or user navigates
	function updatePaletteUI() {
		if (!paletteGridEl) return;

		const buttons = paletteGridEl.querySelectorAll(".palette-btn");

		buttons.forEach(function (btn, index) {
			// Remove all state classes first
			btn.classList.remove("palette-btn--current", "palette-btn--answered", "palette-btn--skipped");

			// Add appropriate state class
			if (index === currentIndex) {
				btn.classList.add("palette-btn--current");
			} else if (answerStates[index].state === "answered") {
				btn.classList.add("palette-btn--answered");
			} else if (answerStates[index].state === "skipped") {
				btn.classList.add("palette-btn--skipped");
			}
			// "unanswered" uses default styling (no special class)
		});
	}

	// --- Step 3.6: Navigate to a specific question ---
	// Allows jumping to any question via palette
	function navigateToQuestion(targetIndex) {
		// Save current selection before navigating (if any)
		// This prevents losing a selection when clicking palette
		if (selectedIndex !== null && answerStates[currentIndex].state === "unanswered") {
			// User selected but didn't click Next - keep it as pending selection
			// Don't mark as answered yet (they need to click Next for that)
		}

		currentIndex = targetIndex;
		renderQuestion();
		updatePaletteUI();
	}

	// Build the palette on page load
	buildPalette();

	// --- Step 4: Function to display a question and its options ---
	function renderQuestion() {
		const currentQuestion = safeQuestions[currentIndex];
		const questionState = answerStates[currentIndex];

		// Check if this question was already answered
		const isAlreadyAnswered = questionState.state === "answered";

		// Reset selection for new question (or restore if already answered)
		if (isAlreadyAnswered) {
			// Restore previously selected option
			selectedIndex = questionState.selectedOption;
			nextBtn.disabled = false; // Already answered, Next is enabled
		} else {
			selectedIndex = null;
			nextBtn.disabled = true; // Disable until user picks an option
		}

		// Update question counter (1-based for display)
		currentQuestionEl.textContent = String(currentIndex + 1);
		// Update question text
		questionTextEl.textContent = currentQuestion.question;

		// Clear previous options
		optionsContainerEl.innerHTML = "";

		// Create a button for each option
		currentQuestion.options.forEach(function (optionText, optionIndex) {
			const btn = document.createElement("button");
			btn.type = "button";
			btn.className = "option-btn";
			btn.textContent = optionText;

			// If already answered, show the selected option and disable changes
			if (isAlreadyAnswered) {
				if (optionIndex === questionState.selectedOption) {
					btn.classList.add("selected");
				}
				// Disable clicking to prevent changing answer
				btn.disabled = true;
				btn.style.cursor = "not-allowed";
			} else {
				// Normal behavior: allow selecting
				btn.addEventListener("click", function () {
					selectedIndex = optionIndex; // Remember choice
					highlightSelectedOption(optionIndex); // Show it's selected
					nextBtn.disabled = false; // Enable Next button
				});
			}

			optionsContainerEl.appendChild(btn);
		});

		// Update button label: "Finish" on last question, "Next" otherwise
		if (currentIndex === safeQuestions.length - 1) {
			nextBtn.textContent = "Finish";
		} else {
			nextBtn.textContent = "Next";
		}

		// Update palette to reflect current question
		updatePaletteUI();
	}

	// --- Step 5: Function to highlight the selected option ---
	function highlightSelectedOption(optionIndexToSelect) {
		const allOptionButtons = optionsContainerEl.querySelectorAll(".option-btn");

		allOptionButtons.forEach(function (btn, i) {
			if (i === optionIndexToSelect) {
				btn.classList.add("selected"); // Add CSS class to show selection
			} else {
				btn.classList.remove("selected"); // Remove from others
			}
		});
	}

	// --- Step 5.1: Find next unanswered question ---
	// Used to auto-navigate after answering/skipping
	function findNextUnansweredIndex() {
		// First, look forward from current position
		for (let i = currentIndex + 1; i < safeQuestions.length; i++) {
			if (answerStates[i].state === "unanswered" || answerStates[i].state === "skipped") {
				return i;
			}
		}
		// Then, wrap around and look from beginning
		for (let i = 0; i < currentIndex; i++) {
			if (answerStates[i].state === "unanswered" || answerStates[i].state === "skipped") {
				return i;
			}
		}
		// All questions answered - return -1
		return -1;
	}

	// --- Step 5.2: Check if all questions are answered ---
	function allQuestionsAnswered() {
		return answerStates.every(function (state) {
			return state.state === "answered";
		});
	}

	// --- Step 6: Handle Next/Finish button click ---
	nextBtn.addEventListener("click", function () {
		// Prevent moving forward if no option is selected
		if (selectedIndex === null) {
			return;
		}

		const questionState = answerStates[currentIndex];

		// Only score if this question hasn't been answered before
		// This prevents score changes when revisiting answered questions
		if (questionState.state !== "answered") {
			// Check if the selected answer is correct
			const currentQuestion = safeQuestions[currentIndex];
			if (selectedIndex === currentQuestion.correctIndex) {
				score += 1; // Increment score
			}

			// Mark this question as answered and store the selection
			answerStates[currentIndex] = {
				state: "answered",
				selectedOption: selectedIndex
			};
		}

		// Update palette to show new state
		updatePaletteUI();

		// Check if all questions are answered
		if (allQuestionsAnswered()) {
			// Quiz complete: save results and clear progress
			stopTimerAndSave();
			clearProgress(); // Clear auto-save data
			localStorage.setItem("quizScore", String(score));
			localStorage.setItem("totalQuestions", String(safeQuestions.length));
			localStorage.setItem("quizType", quizType);
			// Save answer states for review on result page
			localStorage.setItem("quizAnswerStates", JSON.stringify(answerStates));
			window.location.href = "result.html";
			return;
		}

		// Save progress after answering
		saveProgress();

		// Move to next unanswered question (or next in sequence)
		const nextUnanswered = findNextUnansweredIndex();
		if (nextUnanswered !== -1) {
			currentIndex = nextUnanswered;
			renderQuestion();
		} else if (currentIndex < safeQuestions.length - 1) {
			// Fallback: just go to next question
			currentIndex += 1;
			renderQuestion();
		}
	});

	// --- Step 6.1: Handle Skip button click ---
	// Skip marks the question as skipped and moves to the next unanswered question
	if (skipBtn) {
		skipBtn.addEventListener("click", function () {
			// Only mark as skipped if not already answered
			if (answerStates[currentIndex].state !== "answered") {
				answerStates[currentIndex].state = "skipped";
			}

			// Update palette and save progress
			updatePaletteUI();
			saveProgress();

			// Find next unanswered question
			const nextUnanswered = findNextUnansweredIndex();

			if (nextUnanswered !== -1) {
				currentIndex = nextUnanswered;
				renderQuestion();
			} else if (allQuestionsAnswered()) {
				// All answered, finish quiz
				stopTimerAndSave();
				clearProgress(); // Clear auto-save data
				localStorage.setItem("quizScore", String(score));
				localStorage.setItem("totalQuestions", String(safeQuestions.length));
				localStorage.setItem("quizType", quizType);
				// Save answer states for review on result page
				localStorage.setItem("quizAnswerStates", JSON.stringify(answerStates));
				window.location.href = "result.html";
			} else {
				// Stay on current question (edge case)
				renderQuestion();
			}
		});
	}

	// --- Step 6.2: Handle Exit Quiz button click ---
	if (exitQuizBtn) {
		exitQuizBtn.addEventListener("click", function () {
			const confirmExit = window.confirm(
				"Are you sure you want to exit the quiz? Your current progress will be lost."
			);
			if (!confirmExit) {
				return;
			}

			// Stop timer and clear all saved data
			if (timerIntervalId !== null) {
				clearInterval(timerIntervalId);
				timerIntervalId = null;
			}

			// Clear auto-save progress (intentional exit)
			clearProgress();

			// Clear result data
			localStorage.removeItem("quizScore");
			localStorage.removeItem("totalQuestions");
			localStorage.removeItem("quizType");
			localStorage.removeItem("quizTime");

			window.location.href = "index.html";
		});
	}

	// --- Step 7: Display the first question (or restored question) ---
	renderQuestion();
});
