# Resume Generator

A web application for generating resumes using customizable templates. The application allows users to input their personal information, education, experience, projects, and skills. It saves form data in the browser's local storage and generates a PDF resume using LaTeX.

## Features

- Input personal information, education, experience, projects, and skills.
- Save form data in the browser's local storage.
- Generate PDF resumes using customizable LaTeX templates.
- View generated PDF resume directly in the browser.

## Technologies Used

- React.js
- Next.js
- Axios
- LaTeX
- Mustache
- Node.js
- CSS

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm
- XeLaTeX (for PDF generation)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/resume-generator.git
   cd resume-generator
Install dependencies:

sh
Copy code
npm install
Start the development server:

sh
Copy code
npm run dev
Open your browser and navigate to http://localhost:3000 to see the application running.

Deployment
To build the project for production, run:

sh
Copy code
npm run build
npm start
Local Development
For local development, you can use the development server provided by Next.js. Make sure to set up a LaTeX environment that includes xelatex.

Usage
Input your personal information, education, experience, projects, and skills in the provided form fields.
Select a resume template from the "Template" section.
Click "Generate Resume" to create a PDF resume.
View the generated PDF in the browser.
API
The application uses an API endpoint to generate the PDF resume:

POST /api/generate: Accepts form data and generates a PDF resume using LaTeX.
File Structure
pages: Contains the Next.js pages.
index.js: The main page where the form is rendered.
public: Contains static files such as the LaTeX templates.
styles: Contains CSS files for styling the application.
api: Contains the API route for PDF generation.
Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.