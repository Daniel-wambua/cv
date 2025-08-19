import { readFileSync } from 'fs';
import { join } from 'path';
import yaml from 'js-yaml';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  try {
    // Try to read the resume.yml file from the project root
    const filePath = join(process.cwd(), '..', 'resume.yml');
    const yamlText = readFileSync(filePath, 'utf-8');
    const data = yaml.load(yamlText);
    
    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error reading local resume.yml, trying GitHub:', error);
    
    // Fallback to GitHub if local file is not available
    try {
      const response = await fetch('https://raw.githubusercontent.com/Daniel-wambua/cv/main/resume.yml');
      const yamlText = await response.text();
      const data = yaml.load(yamlText);
      
      return new Response(JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (fetchError) {
      console.error('Error fetching from GitHub:', fetchError);
      return new Response(JSON.stringify({}), {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  }
};
