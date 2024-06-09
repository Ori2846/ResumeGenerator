from flask import Flask, render_template, request, send_file, redirect, url_for
from jinja2 import Template
import os
import subprocess

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('form.html')

@app.route('/generate', methods=['POST'])
def generate():
    data = request.form

    # Read the LaTeX template from the resume.tex file
    with open('resume.tex', 'r', encoding='utf-8') as f:
        latex_template = f.read()

    template = Template(latex_template)
    skills = []
    skill_index = 0
    while True:
        skill_name = data.get(f'skill_name_{skill_index}')
        if not skill_name:
            break
        skill_details = []
        detail_index = 0
        while True:
            detail = data.get(f'skill_{skill_index}_detail_{detail_index}')
            if not detail:
                break
            skill_details.append(detail)
            detail_index += 1
        if skill_name and skill_details:
            skills.append((skill_name, ', '.join(skill_details)))
        skill_index += 1

    rendered_latex = template.render(
        name=data.get('name') or '',
        email=data.get('email') or '',
        phone=data.get('phone') or '',
        address=data.get('address') or '',
        location=data.get('location') or '',
        website=data.get('website') or '',
        summary=data.get('summary') or '',
        experience=data.get('experience') or '',
        experience_dates=data.get('experience_dates') or '',
        education=data.get('education') or '',
        education_dates=data.get('education_dates') or '',
        skills_header=data.get('skills_header') or 'Skills',
        skills=skills,
        projects=data.get('projects') or ''
    )

    tex_file = 'resume_output.tex'
    pdf_file = 'static/resume_output.pdf'

    # Clear previous files if they exist
    if os.path.exists(tex_file):
        os.remove(tex_file)
    if os.path.exists(pdf_file):
        os.remove(pdf_file)

    with open(tex_file, 'w', encoding='utf-8') as f:
        f.write(rendered_latex)

    # Run XeLaTeX to generate the PDF
    subprocess.run(['xelatex', '-output-directory=static', tex_file])

    return redirect(url_for('show_pdf'))

@app.route('/show_pdf')
def show_pdf():
    return render_template('show_pdf.html')

@app.route('/download_pdf')
def download_pdf():
    return send_file('static/resume_output.pdf', as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
