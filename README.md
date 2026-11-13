# Quick Application – College Online Quiz

## Features
- Login and student self-sign-up.
- Admin account is created from `.env` using `npm run seed:admin`.
- Student and admin dashboards are role-based.
- Admin can create, publish/unpublish and delete OOPS, DSA, PDS and DDCO MCQ exams.
- Exam duration, passing percentage, question marks and negative marks.
- Students see only published exams, read instructions, answer MCQs and submit.
- Automatic result calculation, student history, leaderboard and admin results view.

## Requirements
- Node.js 18 or newer
- MongoDB Community Server running locally, or a MongoDB connection URI

## Windows setup
1. Extract this ZIP.
2. Open the folder containing `package.json` in VS Code.
3. Copy `.env.example` to a new file named `.env`.
4. Edit `.env` and set `MONGODB_URI`, a long `JWT_SECRET`, and admin email/password.
5. In terminal run:
   ```bash
   npm install
   npm run seed:admin
   npm run seed:quizzes
   npm run dev
   ```
6. Open http://localhost:5000

## Default local admin example
Set in `.env`:
- `ADMIN_EMAIL=admin@example.com`
- `ADMIN_PASSWORD=ChangeThisAdmin123!`

Then run `npm run seed:admin`. Use the exact values you configured to log in. Change the example password before use.

## Important
- Student sign-up always creates a student account. The public form cannot create admins.
- This is a learning/demo project, not a secure high-stakes quiz system. The browser timer can be manipulated; server-enforced attempt deadlines, audit logs, stronger rate limits, backups, HTTPS and proctoring are needed before real college deployment.


## Sample quizzes
Run `npm run seed:quizzes` after configuring `.env` to create or refresh four published sample quizzes: Quiz1 (OOPS), Quiz2 (DSA), Quiz3 (PDS), and Quiz4 (DDCO). Each quiz contains 10 MCQs, 1 mark per question, no negative marking, and a 15-minute timer. Running the command again updates these four named sample quizzes instead of creating duplicates.

## Instant answer feedback
During a quiz, the selected option is checked through the backend. A wrong choice is highlighted red, the correct choice green, and the correct answer text is shown immediately. This is a practice/learning feature; correct answers are not included in the normal quiz-fetch response.
