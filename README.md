
# Resume Generator

A web application for generating resumes using customizable templates. The application allows users to input their personal information, education, experience, projects, and skills. It saves form data in the browser's local storage and generates a PDF resume using LaTeX.

![Screenshot 2024-06-09 235616](https://github.com/Ori2846/ResumeGenerator/assets/74078771/f6acf40b-03aa-4135-9d11-317ede74097f)

## Features

- **Input Personal Information:** Enter details like name, contact information, and summary.
- **Education:** Add your educational background.
- **Experience:** List your professional experiences.
- **Projects:** Include significant projects you have worked on.
- **Skills:** Highlight your skills.
- **Save Form Data:** Data is saved in the browser's local storage.
- **Generate PDF Resumes:** Create resumes using customizable LaTeX templates.
- **View PDFs in Browser:** Directly view generated PDF resumes in the browser.

## Technologies Used

- **React.js**
- **Next.js**
- **Axios**
- **LaTeX**
- **Mustache**
- **Node.js**
- **CSS**

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- **Node.js**
- **npm**
- **XeLaTeX** (for PDF generation)

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/your-username/resume-generator.git
   cd resume-generator
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Start the development server:**

   ```sh
   npm run dev
   ```

4. **Open your browser and navigate to:** `http://localhost:3000` to see the application running.

### Deployment

To build the project for production, run:

```sh
npm run build
npm start
```

## Local Development

For local development, you can use the development server provided by Next.js. Ensure you have a LaTeX environment set up that includes `xelatex`.

## Usage

1. **Input Information:** Fill in your personal information, education, experience, projects, and skills in the provided form fields.
2. **Select Template:** Choose a resume template from the "Template" section.
3. **Generate Resume:** Click "Generate Resume" to create a PDF resume.
4. **View Resume:** View the generated PDF directly in the browser.

## API

The application uses an API endpoint to generate the PDF resume:

- **POST `/api/generate`:** Accepts form data and generates a PDF resume using LaTeX.

## File Structure

- **`pages/`:** Contains the Next.js pages.
  - **`index.js`:** The main page where the form is rendered.
- **`public/`:** Contains static files such as the LaTeX templates.
- **`styles/`:** Contains CSS files for styling the application.
- **`api/`:** Contains the API route for PDF generation.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## Acknowledgments

- **PythonPrototype:** This project was influenced by an initial prototype created in Python, which helped shape the current implementation.
