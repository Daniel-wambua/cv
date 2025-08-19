import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  try {
    // Define paths relative to the project root
    const projectRoot = join(process.cwd(), '..');
    const resumePath = join(projectRoot, 'resume.yml');
    const templatePath = join(projectRoot, 'template.jinja');
    const outputTexPath = join(projectRoot, 'tex', 'resume.tex');
    const outputPdfPath = join(projectRoot, 'out', 'Daniel-Wambua-CV.pdf');
    
    // Check if required files exist
    if (!existsSync(resumePath)) {
      return new Response('Resume file not found', { status: 404 });
    }
    
    if (!existsSync(templatePath)) {
      return new Response('Template file not found', { status: 404 });
    }

    console.log('Starting PDF generation...');
    
    try {
      // Step 1: Generate LaTeX from YAML and template  
      const generateCommand = `cd "${projectRoot}" && .venv/bin/python lib/generate.py --resume "resume.yml" --template "template.jinja" --output "tex/resume.tex"`;
      execSync(generateCommand, { encoding: 'utf8', timeout: 30000 });
      console.log('LaTeX generated successfully');

      // Step 2: Compile LaTeX to PDF
      const compileCommand = `cd "${projectRoot}" && .venv/bin/python lib/compile.py --input "tex/resume.tex" --output "out/Daniel-Wambua-CV.pdf"`;
      execSync(compileCommand, { encoding: 'utf8', timeout: 60000 });
      console.log('PDF compiled successfully');

    } catch (execError) {
      console.error('Command execution failed:', execError);
      return new Response(`PDF generation failed: ${execError}`, { 
        status: 500,
        headers: { 'Content-Type': 'text/plain' }
      });
    }

    // Step 3: Check if PDF exists and serve it
    if (!existsSync(outputPdfPath)) {
      return new Response('PDF generation completed but file not found', { status: 500 });
    }

    // Read the PDF file and return it
    const pdfBuffer = readFileSync(outputPdfPath);
    
    return new Response(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Daniel-Wambua-CV.pdf"',
        'Content-Length': pdfBuffer.length.toString()
      }
    });

  } catch (error) {
    console.error('Download endpoint error:', error);
    
    // Fallback message
    return new Response(`PDF generation failed: ${error}`, {
      status: 500,
      headers: {
        'Content-Type': 'text/plain'
      }
    });
  }
}
