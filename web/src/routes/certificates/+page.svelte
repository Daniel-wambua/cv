<script lang="ts">
  import { certificateImages } from '$lib/config/certificates';
  import { certificationBadges, type Badge } from '$lib/config/badges';
  
  // Certificate data - each certificate entry
  interface Certificate {
    id: number;
    name: string;
    issuer: string;
    date: string;
    image: string;
    description: string;
    skills: string[];
    credentialId: string;
    verified: boolean;
    isPdf?: boolean;
  }
  
  const certificates: Certificate[] = [
    {
      id: 101,
      name: 'NexHunt CTF — Top Performer',
      issuer: 'NexHunt CTF',
      date: 'December 2025',
      image: certificateImages.nexhuntctf,
      description: 'Top performer in the NexHunt Capture The Flag competition demonstrating advanced exploitation and problem solving.',
      skills: ['CTF', 'Web Exploitation', 'Forensics'],
      credentialId: 'NH-2025-01',
      verified: true,
      isPdf: false
    },
    {
      id: 102,
      name: 'p3rf3ctr00t CTF Certificate',
      issuer: 'PERFECTROOT CTF Team',
      date: 'December 2025',
      image: certificateImages.perfectroot,
      description: 'Recognition for contributions as a member of the 51l3nt_br34ch CTF team during competitive events and research.',
      skills: ['CTF', 'Team Collaboration', 'Exploit Development'],
      credentialId: '51B-2025-HAVOC',
      verified: true,
      isPdf: false
    },
    {
      id: 1,
      name: 'API Security Course Certificate',
      issuer: 'API Security Academy',
      date: 'September 2024',
      image: certificateImages.apisec,
      description: 'Comprehensive training in API security best practices, vulnerabilities, and protection mechanisms',
      skills: ['API Security', 'REST APIs', 'OAuth', 'JWT'],
      credentialId: 'APISEC-2024',
      verified: true,
      isPdf: false
    },
    {
      id: 2,
      name: 'Cybersecurity Essentials',
      issuer: 'CSEM',
      date: 'September 2025',
      image: certificateImages.csem,
      description: 'Foundation course covering essential cybersecurity principles, threat analysis, and defense strategies',
      skills: ['CTF','Network Security', 'Threat Analysis', 'Risk Management'],
      credentialId: 'CSEM-BA-159',
      verified: true,
      isPdf: false
    },
    {
      id: 3,
      name: 'OSINT Platform Certificate',
      issuer: 'Myosint.training',
      date: 'October 2025',
      image: certificateImages.osint,
      description: 'OSINT certification demonstrating ethical hacking and proficiency in open source intelligence gathering and analysis',
      skills: ['OSINT', 'Ethical Hacking', 'Intelligence Gathering', 'Information Analysis'],
      credentialId: 'MOT-OSINT-2025',
      verified: true,
      isPdf: false
    },
    {
      id: 4,
      name: 'CTF Competition Achievement',
      issuer: 'CRHCCTF',
      date: '2025',
      image: certificateImages.crhcctf,
      description: 'Recognition for competitive performance in Capture The Flag cybersecurity competitions',
      skills: ['CTF', 'Problem Solving', 'Security Research'],
      credentialId: 'RANK-375',
      verified: true,
      isPdf: false
    },
    {
      id: 5,
      name: 'Cybersecurity Training Achievement',
      issuer: 'Indian Institute Of Information Technology(IIIT)',
      date: 'October 2025',
      image: certificateImages.iiit,
      description: 'Completion of advanced cybersecurity training modules and practical exercises',
      skills: ['CTF','Penetration Testing', 'Security Analysis', 'Incident Response'],
      credentialId: 'CYBER-2025',
      verified: true,
      isPdf: false
    },
     {
      id: 6,
      name: 'Cybersecurity Training Achievement',
      issuer: 'Ministry of Information Technology and Communications & Embassy of the Slovak Republic Kenya',
      date: 'July 2025',
      image: certificateImages.cybergame,
      description: 'Completion of advanced cybersecurity training modules and practical exercises',
      skills: ['CTF','Penetration Testing', 'Security Analysis', 'Incident Response'],
      credentialId: 'CYBERGAME-2025',
      verified: true,
      isPdf: false
    },
       {
      id: 7,
      name: 'Cybersecurity Training Achievement',
      issuer: 'H7TEX ctf team',
      date: 'October 2025',
      image: certificateImages.h7ctf,
      description: 'Completion of h7ctf international cybersecurity competition',
      skills: ['CTF','Penetration Testing', 'Security Analysis', 'Incident Response'],
      credentialId: 'H7CTF-2025',
      verified: true,
      isPdf: false
    }
  ];

  // Filter state
  let selectedSkill = 'all';
  
  // Get unique skills for filtering
  const allSkills = ['all', ...new Set(certificates.flatMap(cert => cert.skills))];
  
  // Filtered certificates based on selected skill
  $: filteredCertificates = selectedSkill === 'all' 
    ? certificates 
    : certificates.filter(cert => cert.skills.includes(selectedSkill));

  // Modal state
  let selectedCertificate: Certificate | null = null;
  let selectedBadge: Badge | null = null;
  
  const openModal = (cert: Certificate) => {
    selectedCertificate = cert;
  };
  
  const closeModal = () => {
    selectedCertificate = null;
  };

  const openBadgeModal = (badge: Badge) => {
    selectedBadge = badge;
  };

  const closeBadgeModal = () => {
    selectedBadge = null;
  };
  
  // Handle ESC key to close modal
  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal();
      closeBadgeModal();
    }
  };
</script>

<svelte:head>
	<title>Daniel Wambua | Professional Certificates & Certifications</title>
	<meta name="description" content="Professional cybersecurity certifications, training certificates, and achievements earned by Daniel Wambua in penetration testing, ethical hacking, and information security.">
</svelte:head>

<svelte:window on:keydown={handleKeydown} />

<div class="certificates-container">
  <div class="terminal-header">
    <div class="terminal-controls">
      <div class="terminal-dot red"></div>
      <div class="terminal-dot yellow"></div>
      <div class="terminal-dot green"></div>
    </div>
    <div class="terminal-title">certificates.sh - Professional Credentials</div>
  </div>

  <div class="command-prompt">
    <span class="prompt">daniel@kali:~$</span>
    <span class="command">ls -la /credentials/certificates/</span>
    <span class="cursor">_</span>
  </div>

  <!-- Page Header -->
  <section class="page-header">
    <h1 class="page-title">
      <i class="fa-solid fa-certificate"></i>
      Professional Certificates
    </h1>
    <p class="page-subtitle">
      A comprehensive collection of my professional certifications, training achievements, and recognized credentials in cybersecurity and information technology.
    </p>
  </section>

  <!-- Stats Overview -->
  <section class="stats-overview">
    <div class="stat-box">
      <div class="stat-icon">
        <i class="fa-solid fa-award"></i>
      </div>
      <div class="stat-number">{certificates.length}</div>
      <div class="stat-label">Total Certificates</div>
    </div>
    <div class="stat-box">
      <div class="stat-icon">
        <i class="fa-solid fa-brain"></i>
      </div>
      <div class="stat-number">{allSkills.length - 1}</div>
      <div class="stat-label">Skills Covered</div>
    </div>
    <div class="stat-box">
      <div class="stat-icon">
        <i class="fa-solid fa-calendar-days"></i>
      </div>
      <div class="stat-number">2023-2026</div>
      <div class="stat-label">Active Period</div>
    </div>
  </section>

  <!-- Filter Section -->
  <section class="filter-section">
    <h2 class="filter-title">
      <i class="fa-solid fa-filter"></i>
      Filter by Skill
    </h2>
    <div class="filter-buttons">
      {#each allSkills as skill}
        <button 
          class="filter-btn" 
          class:active={selectedSkill === skill}
          on:click={() => selectedSkill = skill}
        >
          {skill === 'all' ? 'All Certificates' : skill}
        </button>
      {/each}
    </div>
  </section>

  <!-- Certificates Grid -->
  <section class="certificates-grid">
    {#each filteredCertificates as certificate (certificate.id)}
      <div class="certificate-card" on:click={() => openModal(certificate)} on:keydown={(e) => e.key === 'Enter' && openModal(certificate)} role="button" tabindex="0">
        <div class="certificate-image-wrapper">
          {#if certificate.isPdf}
            <div class="pdf-placeholder">
              <i class="fa-solid fa-file-pdf"></i>
              <span>PDF Certificate</span>
            </div>
          {:else}
            <img src={certificate.image} alt={certificate.name} class="certificate-image" loading="lazy" />
          {/if}
          <div class="certificate-overlay">
            <i class="fa-solid fa-expand"></i>
            <span>Click to View</span>
          </div>
        </div>
        
        <div class="certificate-content">
          <div class="certificate-header">
            <h3 class="certificate-name">
              {certificate.name}
              {#if certificate.verified}
                <span class="verified-badge" title="Verified Certificate">
                  <i class="fa-solid fa-circle-check"></i>
                </span>
              {/if}
            </h3>
            <span class="certificate-date">{certificate.date}</span>
          </div>
          
          <p class="certificate-issuer">
            <i class="fa-solid fa-building"></i>
            {certificate.issuer}
          </p>
          
          <p class="certificate-description">{certificate.description}</p>
          
          <div class="certificate-skills">
            {#each certificate.skills as skill}
              <span class="skill-tag">{skill}</span>
            {/each}
          </div>
          
          <div class="certificate-footer">
            <span class="credential-id">
              <i class="fa-solid fa-id-card"></i>
              ID: {certificate.credentialId}
            </span>
            <button class="view-btn" on:click|stopPropagation={() => openModal(certificate)}>
              View Details
              <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    {/each}
  </section>

  <!-- Empty State -->
  {#if filteredCertificates.length === 0}
    <div class="empty-state">
      <i class="fa-solid fa-inbox"></i>
      <p>No certificates found for the selected filter.</p>
    </div>
  {/if}

  <!-- Future Certificates Section -->
  <section class="future-certificates">
    <div class="future-header">
      <h2>
        <i class="fa-solid fa-road"></i>
        Upcoming Certifications
      </h2>
    </div>
    <div class="future-content">
      <p class="future-text">
        I'm continuously expanding my expertise and working towards additional certifications in:
      </p>
      <div class="future-grid">
        <div class="future-item">
          <i class="fa-solid fa-shield-halved"></i>
          <span>Offensive Security Certified Professional (OSCP)</span>
        </div>
        <div class="future-item">
          <i class="fa-solid fa-certificate"></i>
          <span>Certified Ethical Hacker (CEH)</span>
        </div>
        <div class="future-item">
          <i class="fa-solid fa-network-wired"></i>
          <span>CompTIA Security+</span>
        </div>
        <div class="future-item">
          <i class="fa-solid fa-cloud"></i>
          <span>AWS Security Specialty</span>
        </div>
      </div>
      <p class="future-note">
        <i class="fa-solid fa-lightbulb"></i>
        This section will be updated as I achieve new certifications. Stay tuned!
      </p>
    </div>
  </section>

  <!-- Scrolling Certification Badges -->
  <section class="badges-section">
    <div class="badges-header">
      <h2>
        <i class="fa-solid fa-medal"></i>
        Certification Journey
      </h2>
      <p class="badges-subtitle">Earned credentials & upcoming targets</p>
    </div>
    
    <div class="marquee-container">
      <div class="marquee-track">
        <!-- First set of badges -->
        {#each certificationBadges as badge}
          <div 
            class="badge-item" 
            class:earned={badge.earned} 
            class:target={!badge.earned}
            on:click={() => openBadgeModal(badge)}
            on:keydown={(e) => e.key === 'Enter' && openBadgeModal(badge)}
            role="button"
            tabindex="0"
          >
            <div class="badge-link">
              <div class="badge-icon">
                <img src={badge.imageUrl} alt={badge.name} />
              </div>
              <span class="badge-name">{badge.name}</span>
              {#if badge.earned}
                <span class="badge-status earned-status">
                  <i class="fa-solid fa-circle-check"></i>
                </span>
              {:else}
                <span class="badge-status target-status">
                  <i class="fa-solid fa-bullseye"></i>
                </span>
              {/if}
            </div>
          </div>
        {/each}
        <!-- Duplicate for seamless loop -->
        {#each certificationBadges as badge}
          <div 
            class="badge-item" 
            class:earned={badge.earned} 
            class:target={!badge.earned}
            on:click={() => openBadgeModal(badge)}
            on:keydown={(e) => e.key === 'Enter' && openBadgeModal(badge)}
            role="button"
            tabindex="0"
          >
            <div class="badge-link">
              <div class="badge-icon">
                <img src={badge.imageUrl} alt={badge.name} />
              </div>
              <span class="badge-name">{badge.name}</span>
              {#if badge.earned}
                <span class="badge-status earned-status">
                  <i class="fa-solid fa-circle-check"></i>
                </span>
              {:else}
                <span class="badge-status target-status">
                  <i class="fa-solid fa-bullseye"></i>
                </span>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    </div>
    
    <div class="badges-legend">
      <div class="legend-item">
        <span class="legend-icon earned"><i class="fa-solid fa-circle-check"></i></span>
        <span>Earned</span>
      </div>
      <div class="legend-item">
        <span class="legend-icon target"><i class="fa-solid fa-bullseye"></i></span>
        <span>In Progress</span>
      </div>
    </div>
  </section>
</div>

<!-- Modal for Certificate Details -->
{#if selectedCertificate}
  <div class="modal-overlay" on:click={closeModal} on:keydown={(e) => e.key === 'Enter' && closeModal()} role="button" tabindex="0">
    <div class="modal-content" on:click|stopPropagation on:keydown|stopPropagation role="button" tabindex="0">
      <button class="modal-close" on:click={closeModal} aria-label="Close modal">
        <i class="fa-solid fa-times"></i>
      </button>
      
      <div class="modal-header">
        <h2>{selectedCertificate.name}</h2>
        <p class="modal-issuer">
          <i class="fa-solid fa-building"></i>
          {selectedCertificate.issuer}
        </p>
      </div>
      
      <div class="modal-image">
        {#if selectedCertificate.isPdf}
          <div class="pdf-viewer">
            <i class="fa-solid fa-file-pdf"></i>
            <p>PDF Certificate</p>
            <a href={selectedCertificate.image} target="_blank" rel="noopener noreferrer" class="download-pdf">
              <i class="fa-solid fa-download"></i>
              Download Certificate
            </a>
          </div>
        {:else}
          <img src={selectedCertificate.image} alt={selectedCertificate.name} />
        {/if}
      </div>
      
      <div class="modal-details">
        <div class="detail-row">
          <span class="detail-label">Date Issued:</span>
          <span class="detail-value">{selectedCertificate.date}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Credential ID:</span>
          <span class="detail-value">{selectedCertificate.credentialId}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Description:</span>
          <span class="detail-value">{selectedCertificate.description}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Skills Demonstrated:</span>
          <div class="modal-skills">
            {#each selectedCertificate.skills as skill}
              <span class="skill-tag">{skill}</span>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<!-- Badge Modal -->
{#if selectedBadge}
  <div class="modal-overlay" on:click={closeBadgeModal} on:keydown={(e) => e.key === 'Enter' && closeBadgeModal()} role="button" tabindex="0">
    <div class="badge-modal-content" on:click|stopPropagation on:keydown|stopPropagation role="dialog" tabindex="0">
      <button class="modal-close" on:click={closeBadgeModal} aria-label="Close modal">
        <i class="fa-solid fa-times"></i>
      </button>
      
      <div class="badge-modal-image">
        <img src={selectedBadge.imageUrl} alt={selectedBadge.name} />
      </div>
      
      <div class="badge-modal-info">
        <h2>{selectedBadge.name}</h2>
        <div class="badge-modal-status" class:earned={selectedBadge.earned} class:target={!selectedBadge.earned}>
          {#if selectedBadge.earned}
            <i class="fa-solid fa-circle-check"></i>
            <span>Earned</span>
          {:else}
            <i class="fa-solid fa-bullseye"></i>
            <span>In Progress</span>
          {/if}
        </div>
      </div>
    </div>
  </div>
{/if}

<style lang="scss">
  .certificates-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 1rem;
    scroll-behavior: smooth;
  }

  .terminal-header {
    background: var(--gradient-dark);
    padding: 0.75rem 1rem;
    border-radius: 0.5rem 0.5rem 0 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid var(--border-color);
    
    .terminal-controls {
      display: flex;
      gap: 0.5rem;
      
      .terminal-dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        
        &.red { background: #ff5f56; }
        &.yellow { background: #ffbd2e; }
        &.green { background: #27ca3f; }
      }
    }
    
    .terminal-title {
      color: var(--text-color);
      font-family: var(--font-mono);
      font-size: 0.9rem;
    }
  }

  .command-prompt {
    background: var(--card-background);
    border: 1px solid var(--border-color);
    border-top: none;
    border-radius: 0 0 0.5rem 0.5rem;
    padding: 1rem;
    font-family: var(--font-mono);
    margin-bottom: 2rem;
    
    .prompt {
      color: var(--primary);
      font-weight: 700;
    }
    
    .command {
      color: var(--text-color);
      margin-left: 0.5rem;
    }
    
    .cursor {
      color: var(--primary);
      animation: blink 1s infinite;
    }
  }

  .page-header {
    text-align: center;
    margin: 2rem 0 3rem 0;
    
    .page-title {
      color: var(--primary);
      font-size: 2.5rem;
      font-weight: 700;
      margin: 0 0 1rem 0;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      
      i {
        font-size: 2rem;
      }
    }
    
    .page-subtitle {
      color: var(--text-color);
      font-size: 1.1rem;
      line-height: 1.6;
      max-width: 800px;
      margin: 0 auto;
    }
  }

  .stats-overview {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin: 2rem 0 3rem 0;
    
    .stat-box {
      background: linear-gradient(135deg, var(--card-background), rgba(0, 255, 136, 0.03));
      border: 1px solid var(--border-color);
      border-radius: var(--button-radius);
      padding: 2rem 1.5rem;
      text-align: center;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: linear-gradient(90deg, transparent, var(--primary), transparent);
        transform: translateX(-100%);
        transition: transform 0.5s ease;
      }
      
      &:hover {
        border-color: var(--primary);
        box-shadow: 0 8px 25px rgba(0, 255, 136, 0.2);
        transform: translateY(-5px);
        
        &::before {
          transform: translateX(100%);
        }
        
        .stat-icon {
          transform: scale(1.1) rotate(5deg);
        }
      }
      
      .stat-icon {
        width: 60px;
        height: 60px;
        margin: 0 auto 1rem;
        background: linear-gradient(135deg, rgba(0, 255, 136, 0.2), rgba(0, 255, 136, 0.1));
        border: 2px solid rgba(0, 255, 136, 0.3);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        
        i {
          color: var(--primary);
          font-size: 1.5rem;
        }
      }
      
      .stat-number {
        color: var(--primary);
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
        font-family: var(--font-mono);
        text-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
      }
      
      .stat-label {
        color: var(--text-color-dim);
        font-size: 0.85rem;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-weight: 600;
      }
    }
  }

  .filter-section {
    margin: 3rem 0;
    
    .filter-title {
      color: var(--primary);
      font-size: 1.3rem;
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    
    .filter-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      
      .filter-btn {
        background: var(--card-background);
        color: var(--text-color);
        border: 1px solid var(--border-color);
        padding: 0.65rem 1.5rem;
        border-radius: var(--button-radius);
        font-family: var(--font-family);
        font-size: 0.9rem;
        cursor: pointer;
        transition: all 0.3s ease;
        
        &:hover {
          border-color: var(--primary);
          color: var(--primary);
        }
        
        &.active {
          background: var(--gradient-cyber);
          color: #000;
          border-color: var(--primary);
          font-weight: 600;
        }
      }
    }
  }

  .certificates-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 2rem;
    margin: 2rem 0 3rem 0;
  }

  .certificate-card {
    background: var(--card-background);
    border: 1px solid var(--border-color);
    border-radius: var(--button-radius);
    overflow: hidden;
    transition: all 0.3s ease;
    cursor: pointer;
    animation: fadeInUp 0.5s ease-out backwards;
    
    @for $i from 1 through 10 {
      &:nth-child(#{$i}) {
        animation-delay: #{$i * 0.1}s;
      }
    }
    
    &:hover {
      border-color: var(--primary);
      box-shadow: 0 8px 30px rgba(0, 255, 136, 0.2);
      transform: translateY(-5px);
      
      .certificate-overlay {
        opacity: 1;
      }
    }
    
    .certificate-image-wrapper {
      position: relative;
      width: 100%;
      height: 250px;
      overflow: hidden;
      background: linear-gradient(135deg, rgba(0, 255, 136, 0.1), rgba(0, 255, 136, 0.05));
      
      .certificate-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }
      
      .pdf-placeholder {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        background: linear-gradient(135deg, rgba(220, 53, 69, 0.1), rgba(220, 53, 69, 0.05));
        
        i {
          font-size: 4rem;
          color: #dc3545;
        }
        
        span {
          color: var(--text-color);
          font-weight: 600;
        }
      }
      
      .certificate-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        opacity: 0;
        transition: opacity 0.3s ease;
        
        i {
          font-size: 2rem;
          color: var(--primary);
        }
        
        span {
          color: var(--text-color);
          font-weight: 600;
        }
      }
    }
    
    &:hover .certificate-image {
      transform: scale(1.1);
    }
    
    .certificate-content {
      padding: 1.5rem;
      
      .certificate-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 0.75rem;
        gap: 1rem;
        
        .certificate-name {
          color: var(--text-color);
          font-size: 1.2rem;
          font-weight: 600;
          margin: 0;
          flex: 1;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          
          .verified-badge {
            color: var(--primary);
            font-size: 1rem;
            display: inline-flex;
            animation: pulse 2s ease-in-out infinite;
            
            i {
              filter: drop-shadow(0 0 3px rgba(0, 255, 136, 0.5));
            }
          }
        }
        
        .certificate-date {
          background: var(--primary);
          color: #000;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.75rem;
          font-weight: 600;
          white-space: nowrap;
        }
      }
      
      .certificate-issuer {
        color: var(--text-color-dim);
        margin: 0 0 1rem 0;
        font-size: 0.9rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        
        i {
          color: var(--primary);
        }
      }
      
      .certificate-description {
        color: var(--text-color);
        margin: 0 0 1rem 0;
        line-height: 1.5;
        font-size: 0.9rem;
      }
      
      .certificate-skills {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 1rem;
        
        .skill-tag {
          background: rgba(0, 255, 136, 0.1);
          color: var(--primary);
          padding: 0.35rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.75rem;
          border: 1px solid rgba(0, 255, 136, 0.3);
          font-weight: 500;
        }
      }
      
      .certificate-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 1rem;
        border-top: 1px solid var(--border-color);
        
        .credential-id {
          color: var(--text-color-dim);
          font-size: 0.8rem;
          font-family: var(--font-mono);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          
          i {
            color: var(--primary);
          }
        }
        
        .view-btn {
          background: transparent;
          color: var(--primary);
          border: 1px solid var(--primary);
          padding: 0.5rem 1rem;
          border-radius: var(--button-radius);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          
          &:hover {
            background: var(--primary);
            color: #000;
          }
        }
      }
    }
  }

  .empty-state {
    text-align: center;
    padding: 4rem 2rem;
    color: var(--text-color-dim);
    
    i {
      font-size: 4rem;
      margin-bottom: 1rem;
      opacity: 0.5;
    }
    
    p {
      font-size: 1.2rem;
      margin: 0;
    }
  }

  .future-certificates {
    background: linear-gradient(135deg, var(--card-background), rgba(0, 255, 136, 0.05));
    border: 1px solid var(--border-color);
    border-radius: var(--button-radius);
    padding: 2rem;
    margin: 3rem 0;
    
    .future-header {
      margin-bottom: 1.5rem;
      
      h2 {
        color: var(--primary);
        font-size: 1.5rem;
        margin: 0;
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }
    }
    
    .future-content {
      .future-text {
        color: var(--text-color);
        margin: 0 0 1.5rem 0;
        font-size: 1rem;
      }
      
      .future-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1rem;
        margin-bottom: 1.5rem;
        
        .future-item {
          background: rgba(0, 255, 136, 0.05);
          border: 1px solid rgba(0, 255, 136, 0.2);
          border-radius: 0.5rem;
          padding: 1rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          transition: all 0.3s ease;
          
          &:hover {
            border-color: var(--primary);
            background: rgba(0, 255, 136, 0.1);
          }
          
          i {
            color: var(--primary);
            font-size: 1.5rem;
          }
          
          span {
            color: var(--text-color);
            font-size: 0.9rem;
          }
        }
      }
      
      .future-note {
        background: rgba(255, 193, 7, 0.1);
        border: 1px solid rgba(255, 193, 7, 0.3);
        border-radius: 0.5rem;
        padding: 1rem;
        color: var(--text-color);
        margin: 0;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-size: 0.9rem;
        
        i {
          color: #ffc107;
          font-size: 1.2rem;
        }
      }
    }
  }

  // Modal Styles
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 2rem;
    backdrop-filter: blur(5px);
    
    .modal-content {
      background: var(--card-background);
      border: 2px solid var(--primary);
      border-radius: var(--button-radius);
      max-width: 900px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
      position: relative;
      box-shadow: 0 20px 60px rgba(0, 255, 136, 0.3);
      
      .modal-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: rgba(255, 0, 0, 0.1);
        color: #ff5f56;
        border: 1px solid #ff5f56;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
        z-index: 10;
        
        &:hover {
          background: #ff5f56;
          color: #fff;
          transform: rotate(90deg);
        }
      }
      
      .modal-header {
        background: linear-gradient(135deg, rgba(0, 255, 136, 0.1), rgba(0, 255, 136, 0.05));
        padding: 2rem;
        border-bottom: 1px solid var(--border-color);
        
        h2 {
          color: var(--primary);
          font-size: 1.8rem;
          margin: 0 0 0.5rem 0;
        }
        
        .modal-issuer {
          color: var(--text-color-dim);
          margin: 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          
          i {
            color: var(--primary);
          }
        }
      }
      
      .modal-image {
        padding: 2rem;
        text-align: center;
        background: #000;
        
        img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          border: 1px solid var(--border-color);
        }
        
        .pdf-viewer {
          padding: 3rem 2rem;
          
          i {
            font-size: 5rem;
            color: #dc3545;
            margin-bottom: 1rem;
          }
          
          p {
            color: var(--text-color);
            font-size: 1.2rem;
            margin: 0 0 1.5rem 0;
          }
          
          .download-pdf {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: var(--primary);
            color: #000;
            padding: 0.75rem 1.5rem;
            border-radius: var(--button-radius);
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
            
            &:hover {
              transform: translateY(-2px);
              box-shadow: 0 4px 15px rgba(0, 255, 136, 0.4);
            }
          }
        }
      }
      
      .modal-details {
        padding: 2rem;
        
        .detail-row {
          margin-bottom: 1.5rem;
          
          &:last-child {
            margin-bottom: 0;
          }
          
          .detail-label {
            color: var(--primary);
            font-weight: 600;
            display: block;
            margin-bottom: 0.5rem;
          }
          
          .detail-value {
            color: var(--text-color);
            line-height: 1.6;
          }
          
          .modal-skills {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            
            .skill-tag {
              background: rgba(0, 255, 136, 0.1);
              color: var(--primary);
              padding: 0.5rem 1rem;
              border-radius: 1rem;
              font-size: 0.85rem;
              border: 1px solid rgba(0, 255, 136, 0.3);
              font-weight: 500;
            }
          }
        }
      }
    }
  }

  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }

  @keyframes pulse {
    0%, 100% { 
      opacity: 1;
      transform: scale(1);
    }
    50% { 
      opacity: 0.8;
      transform: scale(1.05);
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    .certificates-container {
      padding: 0.5rem;
    }
    
    .page-title {
      font-size: 1.8rem !important;
      flex-direction: column;
    }
    
    .page-subtitle {
      font-size: 1rem !important;
    }
    
    .certificates-grid {
      grid-template-columns: 1fr;
    }
    
    .stats-overview {
      grid-template-columns: 1fr;
    }
    
    .future-grid {
      grid-template-columns: 1fr !important;
    }
    
    .modal-overlay {
      padding: 1rem;
      
      .modal-content {
        max-height: 95vh;
      }
    }

    .badges-section {
      .marquee-container {
        .marquee-track {
          .badge-item {
            min-width: 140px;
            padding: 0.75rem 1rem;
            
            .badge-icon {
              font-size: 1.5rem;
            }
            
            .badge-name {
              font-size: 0.7rem;
            }
          }
        }
      }
    }
  }

  /* Scrolling Badges Section */
  .badges-section {
    margin-top: 3rem;
    padding: 2rem 0;
    background: var(--card-background);
    border: 1px solid var(--border-color);
    border-radius: 1rem;
    overflow: hidden;

    .badges-header {
      text-align: center;
      margin-bottom: 2rem;
      padding: 0 1rem;

      h2 {
        font-size: 1.8rem;
        color: var(--text-color);
        margin: 0 0 0.5rem 0;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;

        i {
          color: var(--primary);
        }
      }

      .badges-subtitle {
        color: var(--text-color-dim);
        font-size: 1rem;
        margin: 0;
      }
    }

    .marquee-container {
      width: 100%;
      overflow: hidden;
      position: relative;
      
      &::before,
      &::after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100px;
        z-index: 2;
        pointer-events: none;
      }
      
      &::before {
        left: 0;
        background: linear-gradient(to right, var(--card-background), transparent);
      }
      
      &::after {
        right: 0;
        background: linear-gradient(to left, var(--card-background), transparent);
      }

      .marquee-track {
        display: flex;
        gap: 1.5rem;
        animation: marquee 40s linear infinite;
        width: fit-content;
        
        &:hover {
          animation-play-state: paused;
        }

        .badge-item {
          flex-shrink: 0;
          min-width: 160px;
          background: var(--gradient-dark);
          border: 1px solid var(--border-color);
          border-radius: 0.75rem;
          padding: 1rem 1.25rem;
          transition: all 0.3s ease;
          position: relative;

          &:hover {
            transform: translateY(-5px);
            border-color: var(--primary);
            box-shadow: 0 8px 25px rgba(0, 255, 136, 0.2);
          }

          &.earned {
            border-color: rgba(0, 255, 136, 0.4);
            
            .badge-icon {
              color: var(--primary);
            }
          }

          &.target {
            border-color: rgba(255, 193, 7, 0.3);
            opacity: 0.85;
            
            .badge-icon {
              color: #ffc107;
            }
            
            .badge-name {
              color: var(--text-color-dim);
            }
          }

          .badge-link {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
            text-decoration: none;
            color: inherit;
          }

          .badge-icon {
            width: 70px;
            height: 70px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.3s ease;
            
            img {
              width: 100%;
              height: 100%;
              object-fit: contain;
              border-radius: 0.5rem;
            }
          }

          &:hover .badge-icon {
            transform: scale(1.15);
          }

          .badge-name {
            font-size: 0.75rem;
            font-weight: 600;
            color: var(--text-color);
            text-align: center;
            line-height: 1.2;
            max-width: 100px;
          }

          .badge-status {
            position: absolute;
            top: -6px;
            right: -6px;
            font-size: 0.9rem;
            
            &.earned-status {
              color: var(--primary);
            }
            
            &.target-status {
              color: #ffc107;
            }
          }
        }
      }
    }

    .badges-legend {
      display: flex;
      justify-content: center;
      gap: 2rem;
      margin-top: 1.5rem;
      padding: 0 1rem;

      .legend-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.9rem;
        color: var(--text-color-dim);

        .legend-icon {
          font-size: 1rem;
          
          &.earned {
            color: var(--primary);
          }
          
          &.target {
            color: #ffc107;
          }
        }
      }
    }
  }

  /* Badge Modal */
  .badge-modal-content {
    background: var(--card-background);
    border: 1px solid var(--border-color);
    border-radius: 1rem;
    max-width: 400px;
    width: 90%;
    overflow: hidden;
    position: relative;
    animation: fadeInUp 0.3s ease;

    .badge-modal-image {
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      padding: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        max-width: 250px;
        max-height: 250px;
        object-fit: contain;
        border-radius: 0.5rem;
      }
    }

    .badge-modal-info {
      padding: 1.5rem;
      text-align: center;

      h2 {
        color: var(--text-color);
        font-size: 1.3rem;
        margin: 0 0 1rem 0;
      }

      .badge-modal-status {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        border-radius: 2rem;
        font-weight: 600;
        font-size: 0.9rem;

        &.earned {
          background: rgba(0, 255, 136, 0.15);
          color: var(--primary);
          border: 1px solid rgba(0, 255, 136, 0.3);
        }

        &.target {
          background: rgba(255, 193, 7, 0.15);
          color: #ffc107;
          border: 1px solid rgba(255, 193, 7, 0.3);
        }
      }
    }
  }

  @keyframes marquee {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
</style>
