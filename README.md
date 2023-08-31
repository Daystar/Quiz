# Quiz App README

## Overview

Welcome to the Quiz App! This application is built in React and provides a platform for users to take a quiz with a timer. Users can answer multiple-choice questions, navigate through the questions, and see a summary of their quiz attempt at the end.

### Components

The application is divided into several components:

1. **App.js**: The main component that handles the logic and flow of the quiz app.
2. **StartPage.js**: Renders the initial start page where users can submit their email to begin the quiz.
3. **Question.js**: Renders a question along with its answer choices, handles user responses, and allows navigation between questions.
4. **OverviewPanel.js**: Displays an overview of all questions, highlighting visited and attempted questions.
5. **ReportPage.js**: Displays a summary report of the quiz attempt, showing the user's answers and correct answers.

## Installation and Setup

To run the Quiz App locally, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory using your terminal.
3. Run `npm install` to install the required dependencies.
4. Run `npm run dev` to start the development server.
5. Open your web browser and navigate to `http://localhost:3000` to use the application.

## Usage

1. On the start page, submit your email to begin the quiz.
2. Answer the questions by selecting the appropriate choices.
3. Use the navigation buttons to move between questions.
4. The overview panel on the right side indicates the status of each question.
5. Once all questions are attempted or the timer ends, you'll be directed to the report page.
6. The report page displays your answers and the correct answers for each question, along with a score.

Feel free to explore and enjoy the Quiz App!

## Credits

This application was developed as part of a project using React. It uses the Open Trivia Database API to fetch quiz questions.
