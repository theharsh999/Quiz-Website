/*
 * =======================================
 * QUIZ QUESTIONS DATA (MULTI-QUIZ)
 * =======================================
 * Pure data only (no functions, no logic).
 *
 * Structure:
 * - quizzes: an object where each key is a quiz id (used in URLs like ?quiz=html)
 * - each quiz contains:
 *   - title: a friendly display name
 *   - questions: an array of exactly 10 question objects
 *
 * Each question object must have:
 * - question: string
 * - options: array of 4 strings
 * - correctIndex: number (0-based)
 * =======================================
 */

// All quizzes (8 categories). Keep it simple: one object, predictable keys.
const quizzes = {
	// Existing quiz renamed to: Web Development Basics
	web: {
		title: "Web Development Basics",
		questions: [
			{
				question: "What does HTML stand for?",
				options: [
					"HyperText Markup Language",
					"HighText Machine Language",
					"Hyperlink and Text Markup Language",
					"Home Tool Markup Language"
				],
				correctIndex: 0
			},
			{
				question: "Which tag is used to create a hyperlink in HTML?",
				options: ["<link>", "<a>", "<href>", "<url>"],
				correctIndex: 1
			},
			{
				question: "Which CSS property is used to change the text color?",
				options: ["font-color", "text-color", "color", "foreground"],
				correctIndex: 2
			},
			{
				question: "Which CSS property controls spacing inside an element (content to border)?",
				options: ["margin", "padding", "spacing", "border-space"],
				correctIndex: 1
			},
			{
				question: "Which CSS layout system is designed for one-dimensional layouts (row OR column)?",
				options: ["Grid", "Flexbox", "Float", "Table"],
				correctIndex: 1
			},
			{
				question: "Which keyword declares a variable that can be reassigned in JavaScript?",
				options: ["const", "let", "static", "final"],
				correctIndex: 1
			},
			{
				question: "Which method selects an element by id in JavaScript?",
				options: [
					"document.querySelectorAll()",
					"document.getElementByClassName()",
					"document.getElementById()",
					"document.getElementsByTagName()"
				],
				correctIndex: 2
			},
			{
				question: "What does DOM stand for?",
				options: [
					"Document Object Model",
					"Data Object Method",
					"Digital Output Manager",
					"Document Orientation Mode"
				],
				correctIndex: 0
			},
			{
				question: "Which statement correctly links an external JavaScript file in HTML?",
				options: [
					"<script href=\"app.js\"></script>",
					"<script src=\"app.js\"></script>",
					"<js src=\"app.js\"></js>",
					"<javascript link=\"app.js\"></javascript>"
				],
				correctIndex: 1
			},
			{
				question: "What is the main purpose of CSS?",
				options: [
					"Store data in the browser",
					"Add structure to web pages",
					"Style and layout web pages",
					"Run server-side code"
				],
				correctIndex: 2
			}
		]
	},

	html: {
		title: "HTML",
		questions: [
			{
				question: "Which HTML element is used to display the largest heading?",
				options: ["<heading>", "<h1>", "<h6>", "<head>"],
				correctIndex: 1
			},
			{
				question: "Which attribute is used to provide alternative text for an image?",
				options: ["title", "alt", "src", "aria"],
				correctIndex: 1
			},
			{
				question: "Which tag is used to create an unordered list?",
				options: ["<ol>", "<ul>", "<li>", "<list>"],
				correctIndex: 1
			},
			{
				question: "Which tag is used to create a table row?",
				options: ["<td>", "<th>", "<tr>", "<table-row>"],
				correctIndex: 2
			},
			{
				question: "Which HTML5 element is best for the main content of the page?",
				options: ["<main>", "<section>", "<article>", "<body>"],
				correctIndex: 0
			},
			{
				question: "Which input type is used for email addresses?",
				options: ["text", "mail", "email", "address"],
				correctIndex: 2
			},
			{
				question: "What does the <a> tag use to specify the link URL?",
				options: ["src", "href", "link", "url"],
				correctIndex: 1
			},
			{
				question: "Which tag is used to include JavaScript in an HTML page?",
				options: ["<script>", "<js>", "<javascript>", "<code>"],
				correctIndex: 0
			},
			{
				question: "Which tag is used to define a form in HTML?",
				options: ["<input>", "<form>", "<fieldset>", "<label>"],
				correctIndex: 1
			},
			{
				question: "Which element is used to emphasize text (usually italic) in HTML?",
				options: ["<strong>", "<em>", "<i>", "<mark>"],
				correctIndex: 1
			}
		]
	},

	css: {
		title: "CSS",
		questions: [
			{
				question: "Which CSS property changes the background color?",
				options: ["color", "background-color", "bgcolor", "background-style"],
				correctIndex: 1
			},
			{
				question: "Which selector targets an element with id=\"header\"?",
				options: [".header", "#header", "header", "*header"],
				correctIndex: 1
			},
			{
				question: "Which property controls the size of text?",
				options: ["text-size", "font-size", "font-style", "size"],
				correctIndex: 1
			},
			{
				question: "Which property adds space outside an element's border?",
				options: ["padding", "margin", "gap", "border-spacing"],
				correctIndex: 1
			},
			{
				question: "Which CSS value makes an element a flex container?",
				options: ["display: flex", "position: flex", "flex: display", "layout: flex"],
				correctIndex: 0
			},
			{
				question: "Which property rounds the corners of an element?",
				options: ["corner-radius", "border-round", "border-radius", "radius"],
				correctIndex: 2
			},
			{
				question: "Which unit is relative to the root element's font size?",
				options: ["px", "em", "rem", "%"],
				correctIndex: 2
			},
			{
				question: "Which property controls the space between lines of text?",
				options: ["letter-spacing", "line-height", "text-spacing", "word-spacing"],
				correctIndex: 1
			},
			{
				question: "Which pseudo-class applies when you hover over an element?",
				options: [":focus", ":hover", ":active", ":visited"],
				correctIndex: 1
			},
			{
				question: "Which layout system is best for two-dimensional rows AND columns?",
				options: ["Flexbox", "CSS Grid", "Float", "Inline-block"],
				correctIndex: 1
			}
		]
	},

	javascript: {
		title: "JavaScript",
		questions: [
			{
				question: "Which value represents 'nothing' in JavaScript?",
				options: ["zero", "empty", "null", "false"],
				correctIndex: 2
			},
			{
				question: "Which keyword declares a constant in JavaScript?",
				options: ["let", "var", "const", "static"],
				correctIndex: 2
			},
			{
				question: "How do you write a single-line comment in JavaScript?",
				options: ["<!-- comment -->", "// comment", "# comment", "/* comment */"],
				correctIndex: 1
			},
			{
				question: "Which method converts JSON text into a JavaScript object?",
				options: ["JSON.parse()", "JSON.stringify()", "JSON.toObject()", "JSON.convert()"],
				correctIndex: 0
			},
			{
				question: "Which operator checks both value and type?",
				options: ["==", "=", "===", "!==="],
				correctIndex: 2
			},
			{
				question: "Which event runs when a user clicks a button?",
				options: ["onhover", "onchange", "onclick", "onsubmit"],
				correctIndex: 2
			},
			{
				question: "Which method adds an item to the end of an array?",
				options: ["push()", "pop()", "shift()", "unshift()"],
				correctIndex: 0
			},
			{
				question: "What does NaN stand for?",
				options: ["Not a Name", "Not a Number", "New and Nice", "Number as Name"],
				correctIndex: 1
			},
			{
				question: "Which DOM method selects the first element matching a CSS selector?",
				options: ["getElementById()", "querySelector()", "querySelectorAll()", "getElementsByClassName()"],
				correctIndex: 1
			},
			{
				question: "Which built-in function logs a message to the console?",
				options: ["console.log()", "print()", "log.console()", "alert.log()"],
				correctIndex: 0
			}
		]
	},

	react: {
		title: "React",
		questions: [
			{
				question: "In React, what is a component?",
				options: [
					"A reusable piece of UI",
					"A database table",
					"A CSS file",
					"A server"
				],
				correctIndex: 0
			},
			{
				question: "What does JSX allow you to write?",
				options: ["SQL queries", "HTML-like code inside JavaScript", "Only CSS", "Only JSON"],
				correctIndex: 1
			},
			{
				question: "Which hook is used for state in a functional component?",
				options: ["useState", "useFetch", "useClass", "useRoute"],
				correctIndex: 0
			},
			{
				question: "Props are used to ____.",
				options: [
					"Pass data from parent to child",
					"Store data permanently",
					"Style components",
					"Replace JavaScript"
				],
				correctIndex: 0
			},
			{
				question: "Which method is used to render a list in React?",
				options: ["forEach()", "map()", "filter()", "reduce()"],
				correctIndex: 1
			},
			{
				question: "What is the correct attribute name for CSS classes in JSX?",
				options: ["class", "className", "classname", "cssClass"],
				correctIndex: 1
			},
			{
				question: "Which hook runs code after a component renders?",
				options: ["useAfter", "useEffect", "useRender", "useMount"],
				correctIndex: 1
			},
			{
				question: "How do you pass a value to a child component?",
				options: [
					"Using props",
					"Using HTML attributes only",
					"Using localStorage",
					"Using CSS"
				],
				correctIndex: 0
			},
			{
				question: "What does 'state' represent in React?",
				options: [
					"Data that can change over time",
					"Only static text",
					"A CSS rule",
					"A browser setting"
				],
				correctIndex: 0
			},
			{
				question: "What is a common reason to use React?",
				options: [
					"Build interactive UIs",
					"Write SQL faster",
					"Replace HTML completely",
					"Avoid using JavaScript"
				],
				correctIndex: 0
			}
		]
	},

	java: {
		title: "Java",
		questions: [
			{
				question: "Java code is compiled into ____. ",
				options: ["machine code", "bytecode", "HTML", "CSS"],
				correctIndex: 1
			},
			{
				question: "Which method is the entry point of a Java program?",
				options: ["start()", "run()", "main()", "init()"],
				correctIndex: 2
			},
			{
				question: "Which keyword is used to create an object in Java?",
				options: ["create", "new", "make", "object"],
				correctIndex: 1
			},
			{
				question: "Which type is used to store whole numbers in Java?",
				options: ["float", "double", "int", "string"],
				correctIndex: 2
			},
			{
				question: "Which symbol ends most statements in Java?",
				options: [".", ";", ":", "!"],
				correctIndex: 1
			},
			{
				question: "Which access modifier means 'visible everywhere'?",
				options: ["private", "protected", "public", "default"],
				correctIndex: 2
			},
			{
				question: "What does OOP stand for?",
				options: [
					"Object-Oriented Programming",
					"Open Operational Process",
					"Object-Only Program",
					"Optional Output Package"
				],
				correctIndex: 0
			},
			{
				question: "Which keyword is used to inherit from a class in Java?",
				options: ["inherits", "extends", "implements", "super"],
				correctIndex: 1
			},
			{
				question: "Which collection stores items in order and allows duplicates?",
				options: ["Set", "Map", "List", "Tree"],
				correctIndex: 2
			},
			{
				question: "Which keyword is used to handle exceptions?",
				options: ["throw", "catch", "error", "fix"],
				correctIndex: 1
			}
		]
	},

	cpp: {
		title: "C/C++",
		questions: [
			{
				question: "Which symbol is used to end a statement in C/C++?",
				options: [".", ";", ":", ","],
				correctIndex: 1
			},
			{
				question: "Which header is commonly used for input/output in C++?",
				options: ["<stdio>", "<iostream>", "<string>", "<input>"],
				correctIndex: 1
			},
			{
				question: "Which keyword is used to define a constant in C++?",
				options: ["const", "let", "final", "fixed"],
				correctIndex: 0
			},
			{
				question: "Which loop repeats while a condition is true?",
				options: ["for", "while", "repeat", "loop"],
				correctIndex: 1
			},
			{
				question: "What is the correct way to include a header file in C/C++?",
				options: ["import <...>", "#include <...>", "use <...>", "require(<...>)"],
				correctIndex: 1
			},
			{
				question: "Which operator is used to access members through a pointer in C++?",
				options: [".", "::", "->", "=>"],
				correctIndex: 2
			},
			{
				question: "Which concept means 'a function with the same name but different parameters'?",
				options: ["Inheritance", "Encapsulation", "Overloading", "Linking"],
				correctIndex: 2
			},
			{
				question: "Which data type is typically used for true/false values in C++?",
				options: ["bool", "int", "char", "flag"],
				correctIndex: 0
			},
			{
				question: "What is the index of the first element in an array?",
				options: ["0", "1", "-1", "Depends on compiler"],
				correctIndex: 0
			},
			{
				question: "Which keyword creates a class in C++?",
				options: ["struct", "class", "object", "type"],
				correctIndex: 1
			}
		]
	},

	python: {
		title: "Python",
		questions: [
			{
				question: "Which keyword is used to define a function in Python?",
				options: ["func", "def", "function", "define"],
				correctIndex: 1
			},
			{
				question: "Which symbol is used for comments in Python?",
				options: ["//", "#", "<!--", "/*"],
				correctIndex: 1
			},
			{
				question: "Which data type is used to store a sequence of characters?",
				options: ["int", "str", "bool", "float"],
				correctIndex: 1
			},
			{
				question: "What will len([1, 2, 3]) return?",
				options: ["2", "3", "4", "Error"],
				correctIndex: 1
			},
			{
				question: "Which keyword starts a conditional statement?",
				options: ["if", "when", "check", "cond"],
				correctIndex: 0
			},
			{
				question: "Which data structure uses key-value pairs?",
				options: ["list", "tuple", "dict", "set"],
				correctIndex: 2
			},
			{
				question: "How do you create a list in Python?",
				options: ["(1, 2, 3)", "{1, 2, 3}", "[1, 2, 3]", "<1, 2, 3>"],
				correctIndex: 2
			},
			{
				question: "Which function prints output to the console?",
				options: ["echo()", "print()", "console.log()", "write()"],
				correctIndex: 1
			},
			{
				question: "What does PEP 8 describe?",
				options: [
					"A Python style guide",
					"A database engine",
					"A web framework",
					"A Python error code"
				],
				correctIndex: 0
			},
			{
				question: "Which keyword is used to handle exceptions in Python?",
				options: ["catch", "try/except", "error", "safe"],
				correctIndex: 1
			}
		]
	}
};

// NOTE: This file is imported by js/quiz.js (and may be used to select a quiz by key).
