

// Fetch skills from local data
export const prerender = false;

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  try {
    // Try to fetch from local static data first
    const response = await fetch('/data/additional-data.json');
    if (response.ok) {
      const data = await response.json();
      return {
        techStack: data.techStack || {}
      };
    }
  } catch {
		// If file doesn't exist or there's an error, return fallback data structure
  }
  
  // Fallback data if local file is not available
  return {
    techStack: {
      "backend": [
        {
          "language": "Python",
          "projects": ["VulnScanner Pro", "CryptoBreaker Toolkit", "Network Security Monitor"]
        },
        {
          "language": "Go", 
          "projects": ["SecureAPI Framework"]
        },
        {
          "language": "Bash",
          "projects": ["Security Automation Scripts"]
        }
      ],
      "frontend": [
        {
          "language": "JavaScript",
          "projects": ["CTF Platform", "Security Dashboard"]
        },
        {
          "language": "React",
          "projects": ["Security Tools UI"]
        }
      ],
      "security": [
        {
          "language": "Burp Suite",
          "projects": ["Web App Penetration Testing"]
        },
        {
          "language": "Metasploit",
          "projects": ["Network Penetration Testing"]
        },
        {
          "language": "Wireshark",
          "projects": ["Network Traffic Analysis"]
        }
      ]
    }
  };
};
