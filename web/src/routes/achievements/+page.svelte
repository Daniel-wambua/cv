<script lang="ts">
import Language from '../../components/Language.svelte';

const stats = [
  {
    stat: 'Published research on web application and API security',
    source: 'https://havocsec.me',
    icon: 'fa-book-open'
  },
  {
    stat: '5k+ followers on GitHub, X, Dev, LinkedIn,facebook etc',
    source: 'https://github.com/Daniel-wambua',
    icon: 'fa-users'
  },
  {
    stat: 'Active CTF competitor and security researcher',
    source: 'https://ctftime.org/team/379200',
    icon: 'fa-flag'
  },
  {
    stat: 'Bug bounty hunter',
    source: '',
    icon: 'fa-bug'
  }
];

const awards = [
  {
    award: 'Best cybergame male winner-2025',
    issuer: 'Ministry of ICT Kenya and Embassy of the Slovak Nation Kenya',
    source: '',
    date: '2025'
  },
  {
    award: 'Outstanding CTF Performance',
    issuer: 'Binarysith',
    source: 'Binarysith',
    date: '2025'
  }
];

const hackathonWins = [
  {
    title: 'Karu Tech Hackathon',
    achievement: 'Top 10 Finalist',
    description: 'Created a secure fintech solution for mobile payments',
    date: '2025'
  }
];

const projects = [
  {
    name: 'DataPulse',
    description: 'A comprehensive, production-ready dashboard that aggregates and visualizes real-time data from multiple public APIs',
    tech: 'Python, FastAPI, Streamlit',
    logo: '🛡️',
    stars: '20',
    repo: ' https://github.com/Daniel-wambua/Datapulse.git',
    web: ' https://github.com/Daniel-wambua/Datapulse.git',
  },
  {
    name: 'VulnScanner Pro',
    description: 'Automated vulnerability assessment tool for web applications',
    tech: 'Python, Flask, SQLite',
    logo: '🔍',
    stars: '15',
    repo: 'Daniel-wambua/vuln-scanner',
    web: 'https://github.com/Daniel-wambua/vuln-scanner',
  }
];

const normalizeUrl = (url: string) => {
  if (!url) return '';
  return url.replaceAll('https://', '').replaceAll('http://', '');
};
</script>

<svelte:head>	
	<title>Daniel Wambua | Achievements & Projects</title>
</svelte:head>

<div class="achievements-container">
  <div class="terminal-header">
    <div class="terminal-controls">
      <div class="terminal-dot red"></div>
      <div class="terminal-dot yellow"></div>
      <div class="terminal-dot green"></div>
    </div>
    <div class="terminal-title">achievements.sh - Professional Milestones</div>
  </div>

  <div class="command-prompt">
    <span class="prompt">daniel@kali:~$</span>
    <span class="command">cat /career/achievements.log</span>
    <span class="cursor">_</span>
  </div>

  <!-- Statistics Section -->
  <section class="stats-section">
    <h2 class="section-title">
      <i class="fa-solid fa-chart-line"></i>
      Key Metrics & Achievements
    </h2>
    <div class="stats-grid">
      {#each stats as {stat, source, icon}}
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fa-solid {icon}"></i>
          </div>
          <div class="stat-content">
            <p class="stat-text">{stat}</p>
            {#if source}
              <a class="stat-link" href={source} target="_blank" rel="nofollow" title={`Source: ${normalizeUrl(source)}`}>
                <i class="fa-solid fa-external-link-alt"></i> Verify
              </a>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  </section>

  <!-- Awards Section -->
  <section class="awards-section">
    <h2 class="section-title">
      <i class="fa-solid fa-trophy"></i>
      Awards & Recognition
    </h2>
    <div class="awards-grid">
      {#each awards as {award, issuer, source, date}}
        <div class="award-card">
          <div class="award-header">
            <div class="award-icon">🏆</div>
            <div class="award-date">{date}</div>
          </div>
          <h3 class="award-title">{award}</h3>
          <p class="award-issuer">Issued by: {issuer}</p>
          {#if source}
            <a class="award-link" href={source} target="_blank" rel="nofollow">
              <i class="fa-solid fa-link"></i> View Certificate
            </a>
          {/if}
        </div>
      {/each}
    </div>
  </section>

  <!-- Projects Section -->
  <section class="projects-section">
    <h2 class="section-title">
      <i class="fa-solid fa-code"></i>
      Featured Projects
    </h2>
    <div class="projects-grid">
      {#each projects as project}
        <div class="project-card">
          <div class="project-header">
            <span class="project-logo">{project.logo}</span>
            <div class="project-links">
              <a href={`https://github.com/${project.repo}`} target="_blank" rel="nofollow" title="View Repository">
                <i class="fa-brands fa-github"></i>
              </a>
              <a href={project.web} target="_blank" rel="nofollow" title="View Live Demo">
                <i class="fa-solid fa-external-link-alt"></i>
              </a>
            </div>
          </div>
          <h3 class="project-name">{project.name}</h3>
          <p class="project-description">{project.description}</p>
          <div class="project-tech">
            <Language language={project.tech} small={true} />
          </div>
          <div class="project-stats">
            <span class="stars">
              <i class="fa-solid fa-star"></i> {project.stars}
            </span>
            <span class="repo-name">{project.repo}</span>
          </div>
        </div>
      {/each}
    </div>
    <div class="projects-footer">
      <p>View more projects on my <a href="https://github.com/Daniel-wambua" target="_blank">GitHub Profile</a></p>
    </div>
  </section>

  <!-- Competitions Section -->
  <section class="competitions-section">
    <h2 class="section-title">
      <i class="fa-solid fa-flag-checkered"></i>
      Hackathons & Competitions
    </h2>
    <div class="competitions-grid">
      {#each hackathonWins as win}
        <div class="competition-card">
          <div class="competition-header">
            <h3>{win.title}</h3>
            <span class="competition-date">{win.date}</span>
          </div>
          <div class="achievement-badge">
            <i class="fa-solid fa-medal"></i>
            {win.achievement}
          </div>
          <p class="competition-description">{win.description}</p>
        </div>
      {/each}
    </div>
    <div class="hackathon-image-container">
      <img src="/assets/Hackathon-win-pictures.png" alt="Hackathon achievements" class="hackathon-image" />
    </div>
  </section>
</div>
<style lang="scss">
  .achievements-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
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

  .section-title {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: var(--primary);
    font-size: 1.5rem;
    font-weight: 600;
    margin: 2rem 0 1.5rem 0;
    border-bottom: 2px solid var(--primary);
    padding-bottom: 0.5rem;
    
    i {
      font-size: 1.3rem;
    }
  }

  // Statistics Section
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
  }

  .stat-card {
    background: var(--card-background);
    border: 1px solid var(--border-color);
    border-radius: var(--button-radius);
    padding: 1.5rem;
    display: flex;
    gap: 1rem;
    transition: all 0.3s ease;
    
    &:hover {
      border-color: var(--primary);
      box-shadow: 0 4px 20px rgba(0, 255, 136, 0.15);
      transform: translateY(-2px);
    }
    
    .stat-icon {
      background: var(--gradient-cyber);
      color: #000;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      flex-shrink: 0;
    }
    
    .stat-content {
      flex: 1;
      
      .stat-text {
        color: var(--text-color);
        margin: 0 0 0.5rem 0;
        font-weight: 500;
      }
      
      .stat-link {
        color: var(--primary);
        text-decoration: none;
        font-size: 0.8rem;
        
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  // Awards Section
  .awards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
  }

  .award-card {
    background: linear-gradient(135deg, var(--card-background), rgba(255, 215, 0, 0.05));
    border: 1px solid var(--border-color);
    border-radius: var(--button-radius);
    padding: 2rem;
    transition: all 0.3s ease;
    
    &:hover {
      border-color: #ffd700;
      box-shadow: 0 4px 20px rgba(255, 215, 0, 0.2);
      transform: translateY(-2px);
    }
    
    .award-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      
      .award-icon {
        font-size: 2rem;
      }
      
      .award-date {
        background: var(--primary);
        color: #000;
        padding: 0.25rem 0.75rem;
        border-radius: 1rem;
        font-size: 0.8rem;
        font-weight: 600;
      }
    }
    
    .award-title {
      color: var(--text-color);
      font-size: 1.2rem;
      font-weight: 600;
      margin: 0 0 0.5rem 0;
    }
    
    .award-issuer {
      color: var(--text-color-dim);
      margin: 0 0 1rem 0;
      font-style: italic;
    }
    
    .award-link {
      color: var(--primary);
      text-decoration: none;
      font-size: 0.9rem;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }

  // Projects Section
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .project-card {
    background: var(--card-background);
    border: 1px solid var(--border-color);
    border-radius: var(--button-radius);
    padding: 1.5rem;
    transition: all 0.3s ease;
    
    &:hover {
      border-color: var(--primary);
      box-shadow: 0 4px 20px rgba(0, 255, 136, 0.15);
      transform: translateY(-2px);
    }
    
    .project-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      
      .project-logo {
        font-size: 2rem;
      }
      
      .project-links {
        display: flex;
        gap: 0.5rem;
        
        a {
          color: var(--primary);
          font-size: 1.2rem;
          transition: transform 0.2s ease;
          
          &:hover {
            transform: scale(1.2);
          }
        }
      }
    }
    
    .project-name {
      color: var(--text-color);
      font-size: 1.3rem;
      font-weight: 600;
      margin: 0 0 0.5rem 0;
    }
    
    .project-description {
      color: var(--text-color);
      margin: 0 0 1rem 0;
      line-height: 1.5;
    }
    
    .project-tech {
      margin-bottom: 1rem;
    }
    
    .project-stats {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: var(--text-color-dim);
      font-size: 0.9rem;
      
      .stars {
        color: var(--primary);
        
        i {
          margin-right: 0.25rem;
        }
      }
      
      .repo-name {
        font-family: var(--font-mono);
        opacity: 0.8;
      }
    }
  }

  .projects-footer {
    text-align: center;
    margin: 2rem 0;
    
    p {
      color: var(--text-color-dim);
      margin: 0;
      
      a {
        color: var(--primary);
        text-decoration: none;
        
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  // Competitions Section
  .competitions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .competition-card {
    background: linear-gradient(135deg, var(--card-background), rgba(0, 255, 136, 0.05));
    border: 1px solid var(--border-color);
    border-radius: var(--button-radius);
    padding: 1.5rem;
    transition: all 0.3s ease;
    
    &:hover {
      border-color: var(--primary);
      box-shadow: 0 4px 20px rgba(0, 255, 136, 0.15);
      transform: translateY(-2px);
    }
    
    .competition-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      
      h3 {
        color: var(--text-color);
        font-size: 1.2rem;
        font-weight: 600;
        margin: 0;
      }
      
      .competition-date {
        background: var(--primary);
        color: #000;
        padding: 0.25rem 0.75rem;
        border-radius: 1rem;
        font-size: 0.8rem;
        font-weight: 600;
      }
    }
    
    .achievement-badge {
      background: var(--gradient-cyber);
      color: #000;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      font-weight: 600;
      margin-bottom: 1rem;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .competition-description {
      color: var(--text-color);
      margin: 0;
      line-height: 1.5;
    }
  }

  .hackathon-image-container {
    text-align: center;
    margin: 2rem 0;
    
    .hackathon-image {
      max-width: 100%;
      height: auto;
      border-radius: var(--button-radius);
      border: 1px solid var(--border-color);
    }
  }

  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }

  @media (max-width: 768px) {
    .achievements-container {
      padding: 0.5rem;
    }
    
    .stats-grid,
    .awards-grid,
    .projects-grid,
    .competitions-grid {
      grid-template-columns: 1fr;
    }
    
    .section-title {
      font-size: 1.3rem;
      flex-direction: column;
      gap: 0.5rem;
      text-align: center;
    }
  }
</style>
