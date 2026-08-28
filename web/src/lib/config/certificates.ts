// Certificate images - self-hosted in /static/certificates for reliability.
// Google Drive thumbnail hotlinks (drive.google.com/thumbnail?id=...) break
// intermittently in browsers (302 to lh3.googleusercontent.com, rate-limits,
// cookie walls), so the images are bundled with the site instead.

export const certificateImages = {
  // CyberGame Kenya 2026 - Top 10 Finalist (6th Place)
  cybergame2026: '/certificates/cybergame2026.jpg',

  // Thryve CTF (August 2026)
  thryvectf: '/certificates/thryvectf.png',

  // Connected Africa Summit 2026 CTF - 3rd Position (Team JOINT)
  connectedafricactf: '/certificates/connectedafricactf.jpg',

  // NexHunt CTF, Top Performer
  nexhuntctf: '/certificates/nexhuntctf.jpg',

  // p3rf3ctr00t CTF Certificate
  perfectroot: '/certificates/perfectroot.png',

  // API Security Course Certificate
  apisec: '/certificates/apisec.jpg',

  // Cybersecurity Essentials (CSEM)
  csem: '/certificates/csem.png',

  // OSINT Platform Certificate (MOT)
  osint: '/certificates/osint.png',

  // CTF Competition Achievement (CRHCCTF)
  crhcctf: '/certificates/crhcctf.png',

  // Cybersecurity Training Achievement (EnigmaExplore/IIIT)
  iiit: '/certificates/iiit.jpg',

  // Cybersecurity Training Achievement (CyberGame)
  cybergame: '/certificates/cybergame.jpg',

  // Ctf certificate h7ctf
  h7ctf: '/certificates/h7ctf.jpg',

  // china osint
  chinaosint: '/certificates/chinaosint.png'
};

// Helper to check if all URLs have been configured
export const allCertificatesConfigured = (): boolean => {
  return Object.values(certificateImages).every(
    (url) => url !== 'PASTE_GOOGLE_DRIVE_URL_HERE' && url.startsWith('/')
  );
};
