# Resume Generator

A web application for generating resumes using customizable templates. The application allows users to input their personal information, education, experience, projects, and skills. It saves form data in the browser's local storage and generates a PDF resume using LaTeX.

![Screenshot 2024-06-09 235616](https://github.com/Ori2846/ResumeGenerator/assets/74078771/f6acf40b-03aa-4135-9d11-317ede74097f)

## Why Create This?

Creating a resume can be a daunting task, especially when you need to tailor it for different job applications. This web application simplifies the process by providing customizable templates and a user-friendly interface to input your details. The goal is to streamline resume creation, making it efficient and accessible for everyone.

## Overleaf and Its Limitations

Overleaf is a popular online LaTeX editor that can be used for creating professional resumes. It offers a variety of templates and powerful typesetting capabilities. However, switching between different templates in Overleaf can be challenging because you have to manually re-enter all your information each time you switch templates. This process is time-consuming and prone to errors, making it less efficient for users who want to experiment with different resume formats quickly.

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

    git clone https://github.com/your-username/resume-generator.git
    cd resume-generator

2. **Install dependencies:**

    npm install

3. **Start the development server:**

    npm run dev

4. **Open your browser and navigate to:** http://localhost:3000 to see the application running.

### Deployment

To build the project for production, run:

    npm run build
    npm start

## Local Development

Use the Next.js development server and ensure a LaTeX environment with xelatex is set up.

## Usage

1. **Input Information:** Enter your personal details, education, experience, projects, and skills.
2. **Select Template:** Choose a resume template in the "Template" section.
3. **Generate Resume:** Click "Generate Resume" to create a PDF.
4. **View Resume:** View the generated PDF directly in your browser.

## API

- **POST /api/generate:** Accepts form data and generates a PDF resume using LaTeX.

## File Structure

- **pages/**: Contains Next.js pages.
  - **index.js**: The main form page.
- **public/**: Static files, including LaTeX templates.
- **styles/**: CSS files for styling.
- **api/**: API route for PDF generation.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## Acknowledgments

- **PythonPrototype:** Influenced by an initial Python prototype that shaped the current implementation.

## Future Plans

- **Hosting:** Plan to host the application on a cloud platform for wider accessibility.
- **Additional Templates:** Adding more customizable templates.
- **Enhanced Features:** Incorporating new features based on user feedback to improve the resume creation process.
- **Upload Overleaf Templates:** Enable users to upload their own Overleaf templates for use within this application. Users will be able to export their Overleaf LaTeX templates, upload them to the application, and have their resume data automatically integrated. This will make it easier to switch templates without re-entering all the information.
    
