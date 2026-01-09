// Cybersecurity Certification Badges - Auto-scrolling marquee on certificates page
// To add a new badge:
// 1. Upload badge image to Google Drive
// 2. Set sharing to "Anyone with the link" → Viewer
// 3. Get the file ID from the share link
// 4. Use format: https://drive.google.com/thumbnail?id=FILE_ID&sz=w200

export interface Badge {
  name: string;
  imageUrl: string;    // Google Drive thumbnail URL
  link?: string;       // Optional link to certification page
  earned: boolean;     // true = earned, false = working towards
}

export const certificationBadges: Badge[] = [
  // === EARNED BADGES ===
  // Upload your badge images to Google Drive and paste the thumbnail URLs here
  
  {
    name: 'OWASP API Security Top 10',
    imageUrl: 'https://drive.google.com/thumbnail?id=1n2tSxldiiCf2NpEZDUyB_Ht9vzpJAzHA&sz=w200',
    link: 'https://www.apisecuniversity.com/',
    earned: true
  },
    {
    name: 'API Security Fundamentals',
    imageUrl: 'https://drive.google.com/thumbnail?id=1TEk9qBIRSSLuxetDWbTuxGfZP-aXuWKp&sz=w200',
    link: 'https://www.apisecuniversity.com/',
    earned: true
  },
  

  // === TARGET BADGES (Working towards) ===
  // You can use official logo images or placeholder icons
  
  {
    name: 'OSCP',
    imageUrl: 'https://drive.google.com/thumbnail?id=1U6qAjqhDPR_EAzWrA1MHpRP2a6k-Qf2q&sz=w1000',
    link: 'https://www.offsec.com/courses/pen-200/',
    earned: false
  },
 // {
  //  name: 'CEH',
  //  imageUrl: 'PASTE_GOOGLE_DRIVE_URL_HERE',
  //  link: 'https://www.eccouncil.org/programs/certified-ethical-hacker-ceh/',
  //  earned: false
 // },
 // {
  //  name: 'CompTIA Security+',
  //  imageUrl: 'PASTE_GOOGLE_DRIVE_URL_HERE',
   // link: 'https://www.comptia.org/certifications/security',
    //earned: false
 // },
  //{
   // name: 'eJPT',
   // imageUrl: 'PASTE_GOOGLE_DRIVE_URL_HERE',
   // link: 'https://security.ine.com/certifications/ejpt-certification/',
   // earned: false
  //},
 //{
  //  name: 'PNPT',
  //  imageUrl: 'PASTE_GOOGLE_DRIVE_URL_HERE',
  //  link: 'https://certifications.tcm-sec.com/pnpt/',
   // earned: false
 // },
 // {
  //  name: 'BSCP',
  //  imageUrl: 'PASTE_GOOGLE_DRIVE_URL_HERE',
   // link: 'https://portswigger.net/web-security/certification',
  //  earned: false
 // },
 // {
  //  name: 'HTB CPTS',
  //  imageUrl: 'PASTE_GOOGLE_DRIVE_URL_HERE',
   // link: 'https://academy.hackthebox.com/preview/certifications/htb-certified-penetration-testing-specialist',
   // earned: false
 // },
];

// Helper to get only earned badges
export const getEarnedBadges = (): Badge[] => 
  certificationBadges.filter(b => b.earned);

// Helper to get target/upcoming badges  
export const getTargetBadges = (): Badge[] => 
  certificationBadges.filter(b => !b.earned);
