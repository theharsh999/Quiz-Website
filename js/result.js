/*
 * =======================================
 * RESULT PAGE LOGIC
 * =======================================
 * This file displays the quiz results.
 * It:
 * - Reads quiz score from localStorage
 * - Calculates percentage and statistics
 * - Updates result page with calculated values
 * - Renders answer review section
 * - Handles "Restart Quiz" button
 * =======================================
 */

// Wait for the page to fully load before accessing HTML elements
document.addEventListener("DOMContentLoaded", function () {
	// --- Step 1: Get HTML elements for displaying results ---
	const resultTitleEl = document.getElementById("result-title");
	const percentageEl = document.getElementById("score-percentage");
	const totalQuestionsEl = document.getElementById("total-questions");
	const correctAnswersEl = document.getElementById("correct-answers");
	const wrongAnswersEl = document.getElementById("wrong-answers");
	const quizTimeEl = document.getElementById("quiz-time");
	const reviewListEl = document.getElementById("review-list"); // Answer review container

	// Safety check: if this script loads on the wrong page, stop gracefully
	if (!percentageEl || !totalQuestionsEl || !correctAnswersEl || !wrongAnswersEl) {
		return;
	}

	// Get the "Restart Quiz" button (it's an <a> tag styled as a button)
	const restartBtn = document.querySelector(".restart-btn");

	// --- Step 2: Read saved quiz results from localStorage ---
	// These values were saved by js/quiz.js when the quiz was completed
	const storedScore = localStorage.getItem("quizScore");
	const storedTotal = localStorage.getItem("totalQuestions");
	const storedTime = localStorage.getItem("quizTime");
	// Quiz type helps us show the correct quiz name on the result page
	const storedQuizType = localStorage.getItem("quizType");

	// Pick a safe quiz key (fallback to "web")
	const quizType = String(storedQuizType || "").toLowerCase().trim();
	const safeQuizType = typeof quizzes === "object" && quizzes && quizzes[quizType] ? quizType : "web";
	const quizTitle =
		typeof quizzes === "object" && quizzes && quizzes[safeQuizType] && typeof quizzes[safeQuizType].title === "string"
			? quizzes[safeQuizType].title
			: "Web Development Basics";

	// Display quiz name on the result page (if the element exists)
	if (resultTitleEl) {
		resultTitleEl.textContent = `${quizTitle} Quiz Results`;
	}

	// Convert string values to numbers for calculations
	const score = Number(storedScore);
	const totalQuestions = Number(storedTotal);

	// --- Step 2.1: Display time taken (safe fallback) ---
	// Time is saved by js/quiz.js as a string in MM:SS format.
	const timeTaken = typeof storedTime === "string" && storedTime.trim().length > 0 ? storedTime : "00:00";
	if (quizTimeEl) {
		quizTimeEl.textContent = `Time Taken: ${timeTaken}`;
	}

	// --- Step 3: Validate the stored data ---
	// Check if both values are valid numbers and make sense
	const hasValidData =
		Number.isFinite(score) && // Is score a valid number?
		Number.isFinite(totalQuestions) && // Is total a valid number?
		totalQuestions > 0 && // Are there questions?
		score >= 0; // Is score non-negative?

	// --- Step 4: Calculate result statistics ---
	// If data is invalid (e.g., direct page access), show safe defaults
	const correctAnswers = hasValidData ? score : 0;
	const total = hasValidData ? totalQuestions : 0;
	const wrongAnswers = hasValidData ? Math.max(0, total - correctAnswers) : 0;
	const percentage = hasValidData
		? Math.round((correctAnswers / total) * 100)
		: 0;

	// --- Step 5: Update the result page with calculated values ---
	percentageEl.textContent = `${percentage}%`;
	totalQuestionsEl.textContent = String(total);
	correctAnswersEl.textContent = String(correctAnswers);
	wrongAnswersEl.textContent = String(wrongAnswers);

	// --- Step 6: Handle "Restart Quiz" button click ---
	if (restartBtn) {
		restartBtn.addEventListener("click", function (event) {
			event.preventDefault(); // Prevent default link navigation

			// Clear quiz results so they don't show on page reload
			localStorage.removeItem("quizScore");
			localStorage.removeItem("totalQuestions");
			localStorage.removeItem("quizAnswerStates");

			// Navigate back to home page
			window.location.href = "index.html";
		});
	}

	// --- Step 7: Render Answer Review Section ---
	// Shows each question with user's answer vs correct answer
	function renderAnswerReview() {
		if (!reviewListEl) return;

		// Get saved answer states from quiz
		const storedAnswerStates = localStorage.getItem("quizAnswerStates");
		if (!storedAnswerStates) {
			reviewListEl.innerHTML = '<p style="text-align:center;color:#64748b;">No review data available.</p>';
			return;
		}

		let answerStates;
		try {
			answerStates = JSON.parse(storedAnswerStates);
		} catch (e) {
			reviewListEl.innerHTML = '<p style="text-align:center;color:#64748b;">Could not load review data.</p>';
			return;
		}

		// Get questions for this quiz
		const quizData = typeof quizzes === "object" && quizzes && quizzes[safeQuizType] ? quizzes[safeQuizType] : null;
		if (!quizData || !Array.isArray(quizData.questions)) {
			reviewListEl.innerHTML = '<p style="text-align:center;color:#64748b;">Questions not found.</p>';
			return;
		}

		const questions = quizData.questions;

		// Clear existing content
		reviewListEl.innerHTML = "";

		// Create a review item for each question
		questions.forEach(function (question, index) {
			const answerState = answerStates[index] || { state: "unanswered", selectedOption: null };

			// Determine the status class
			let statusClass = "";
			if (answerState.state === "skipped" || answerState.state === "unanswered") {
				statusClass = "review-item--skipped";
			} else if (answerState.selectedOption === question.correctIndex) {
				statusClass = "review-item--correct";
			} else {
				statusClass = "review-item--incorrect";
			}

			// Get answer texts
			const userAnswerText =
				answerState.state === "skipped" || answerState.state === "unanswered"
					? "Skipped"
					: question.options[answerState.selectedOption] || "Unknown";

			const correctAnswerText = question.options[question.correctIndex] || "Unknown";

			// Determine answer value class
			let userAnswerClass = "";
			if (answerState.state === "skipped" || answerState.state === "unanswered") {
				userAnswerClass = "review-answer-value--skipped";
			} else if (answerState.selectedOption === question.correctIndex) {
				userAnswerClass = "review-answer-value--correct";
			} else {
				userAnswerClass = "review-answer-value--incorrect";
			}

			// Build the review item HTML
			const reviewItem = document.createElement("div");
			reviewItem.className = "review-item " + statusClass;
			reviewItem.innerHTML = 
				'<p class="review-question-num">Question ' + (index + 1) + '</p>' +
				'<p class="review-question-text">' + escapeHtml(question.question) + '</p>' +
				'<div class="review-answers">' +
					'<div class="review-answer">' +
						'<span class="review-answer-label">Your Answer:</span>' +
						'<span class="review-answer-value ' + userAnswerClass + '">' + escapeHtml(userAnswerText) + '</span>' +
					'</div>' +
					'<div class="review-answer">' +
						'<span class="review-answer-label">Correct Answer:</span>' +
						'<span class="review-answer-value review-answer-value--correct">' + escapeHtml(correctAnswerText) + '</span>' +
					'</div>' +
				'</div>';

			reviewListEl.appendChild(reviewItem);
		});
	}

	// Helper function to escape HTML (prevent XSS)
	function escapeHtml(text) {
		const div = document.createElement("div");
		div.textContent = text;
		return div.innerHTML;
	}

	// Render the review section
	renderAnswerReview();
});
