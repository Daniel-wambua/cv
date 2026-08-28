// Cybersecurity Certification Badges - Auto-scrolling marquee on certificates page
// Badge images are self-hosted in /static/certificates (Google Drive thumbnail
// hotlinks break intermittently in browsers).
// To add a new badge: drop the image in web/static/certificates/ and reference
// it as /certificates/<filename>

export interface Badge {
  name: string;
  imageUrl: string;    // Local image path under /static/certificates
  link?: string;       // Optional link to certification page
  earned: boolean;     // true = earned, false = working towards
}

export const certificationBadges: Badge[] = [
  // === EARNED BADGES ===

  {
    name: 'OWASP API Security Top 10',
    imageUrl: '/certificates/badge-owasp-api-security.png',
    link: 'https://www.apisecuniversity.com/',
    earned: true
  },
    {
    name: 'API Security Fundamentals',
    imageUrl: '/certificates/badge-api-security-fundamentals.png',
    link: 'https://www.apisecuniversity.com/',
    earned: true
  },


  // === TARGET BADGES (Working towards) ===

  {
    name: 'OSCP',
    imageUrl: '/certificates/badge-oscp.png',
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
