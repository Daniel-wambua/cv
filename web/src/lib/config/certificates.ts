// Certificate image URLs - Using Google Drive thumbnail format for reliable embedding
// Format: https://drive.google.com/thumbnail?id=FILE_ID&sz=w1000
// The sz=w1000 parameter requests a 1000px wide thumbnail (max quality)

export const certificateImages = {
  // NexHunt CTF — Top Performer
  nexhuntctf: 'https://drive.google.com/thumbnail?id=1-CPtYRlMvlH9_S4KWCmb5KKs4h2_J7jC&sz=w1000',

  // p3rf3ctr00t CTF Certificate  
  perfectroot: 'https://drive.google.com/thumbnail?id=1y6-WO-TkMDPjmqnTATKQYvM-yC-4JP4U&sz=w1000',

  // API Security Course Certificate
  apisec: 'https://drive.google.com/thumbnail?id=1OjcyouQdC1p4_68802-VJc0HAywmtpBA&sz=w1000',

  // Cybersecurity Essentials (CSEM)
  csem: 'https://drive.google.com/thumbnail?id=1zK-t-b0eYdVPaL94dc6YztgjYHlKDZb9&sz=w1000',

  // OSINT Platform Certificate (MOT)
  osint: 'https://drive.google.com/thumbnail?id=1DjIMyf09RaNn-R_qcQJbGEbG5PT_JD2k&sz=w1000',

  // CTF Competition Achievement (CRHCCTF)
  crhcctf: 'https://drive.google.com/thumbnail?id=164J4ltJ9Zlg1hWUj56sUdFRy_NxQzC_I&sz=w1000',

  // Cybersecurity Training Achievement (EnigmaExplore/IIIT)
  iiit: 'https://drive.google.com/thumbnail?id=1mpPae39dAg-p_RFf6X2-RrUMVU47lrBO&sz=w1000',

  // Cybersecurity Training Achievement (CyberGame)
  cybergame: 'https://drive.google.com/thumbnail?id=19Rq-JAR4FL5iDBI3YJ_eZTCv3D9SYG-w&sz=w1000',

  //Ctf certificate h7ctf
    h7ctf: 'https://drive.google.com/thumbnail?id=1cDzaJhC-SvU9Th-Ynm8AfRJWvG73f5rR&sz=w1000',
};

// Helper to check if all URLs have been configured
export const allCertificatesConfigured = (): boolean => {
  return Object.values(certificateImages).every(
    url => url !== 'PASTE_GOOGLE_DRIVE_URL_HERE' && url.startsWith('https://')
  );
};
