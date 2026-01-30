# Quiz Platform

A responsive, client-side quiz application supporting multiple quiz categories with features like timed sessions, question navigation, progress auto-save, and detailed result review.

## Features

- Multiple quiz categories (Web Development, HTML, CSS, JavaScript, React, Java, C/C++, Python)
- 10 questions per quiz with 4 answer options each
- Real-time stopwatch timer
- Question palette for direct navigation to any question
- Skip and revisit questions without losing progress
- Auto-save and resume on page refresh
- Prevents answer changes after submission
- Result page with score breakdown and time taken
- Answer review showing correct vs selected answers
- Fully responsive design for desktop, tablet, and mobile

## Tech Stack

- HTML5
- CSS3
- JavaScript (ES6)
- localStorage (browser-based state management)

## Folder Structure

```
Quiz-Website/
├── index.html          # Home page with quiz category selection
├── quiz.html           # Quiz interface with questions and palette
├── result.html         # Results and answer review page
├── css/
│   └── style.css       # Complete stylesheet for all pages
├── js/
│   ├── questions.js    # Quiz data (questions, options, answers)
│   ├── quiz.js         # Quiz logic (navigation, scoring, timer)
│   └── result.js       # Result display and review logic
└── README.md
```

## How to Run

1. Clone or download the repository:
   ```bash
   git clone https://github.com/your-username/quiz-website.git
   cd quiz-website
   ```

2. Open `index.html` in a web browser:
   ```bash
   open index.html
   ```
   Or simply double-click the file to open it in your default browser.

3. Select a quiz category from the dashboard and start the quiz.

No build tools, dependencies, or server setup required.

## Screenshots

*Screenshots can be added here.*

- Home page with quiz categories
- Quiz page with question palette
- Result page with answer review

## Notes

- All quiz data is stored in `js/questions.js` as a single JavaScript object
- Progress is saved to `localStorage` and persists across page refreshes
- Exiting the quiz clears saved progress
- Completing the quiz clears auto-save data and stores final results
- Answer states are preserved for review on the result page

## Future Enhancements

- Add more quiz categories
- Implement per-question time limits
- Add difficulty levels
- Include explanations for correct answers
- Support for randomized question order
- Dark mode theme option
