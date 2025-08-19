<script lang="ts">
  import Language from '../../components/Language.svelte';

  export let data: { combinedJobData: any[] };
  const experience = data.combinedJobData;
</script>

<svelte:head>	
	<title>Daniel Wambua | Security Experience</title>
</svelte:head>

<div class="terminal-header">
  <div class="terminal-controls">
    <div class="terminal-dot red"></div>
    <div class="terminal-dot yellow"></div>
    <div class="terminal-dot green"></div>
  </div>
  <div class="terminal-title">experience.sh - Professional Journey</div>
</div>

<div class="command-line">
  <span class="prompt">daniel@kali:~$</span>
  <span class="command">cat /career/experience.log</span>
  <span class="cursor">_</span>
</div>

<div class="experience-container">
  {#each experience as job, index}
    <div class="job-entry" data-index="{index + 1}">
      <div class="job-header">
        <div class="company-info">
          {#if job.companyUrl && job.companyLogo}
            <a href={job.companyUrl} target="_blank" rel="nofollow" class="no-underline company-link">
              <img class="company-logo" src={job.companyLogo} alt={job.company} />
            </a>
          {/if}
          <div class="job-details">
            <h2 class="position">{job.position}</h2>
            <h3 class="company">{job.company}</h3>
            <p class="duration">{job.datesWorked}</p>
          </div>
        </div>
        <div class="job-status">
          <span class="status-badge">
            <i class="fa-solid fa-circle-check"></i>
            Completed
          </span>
        </div>
      </div>

      {#if job.responsibilities}
        <div class="job-section">
          <h4><i class="fa-solid fa-target"></i> Mission Overview</h4>
          <p class="responsibilities">{job.responsibilities}</p>
        </div>
      {/if}
      
      {#if job.highlights}
        <div class="job-section">
          <h4><i class="fa-solid fa-trophy"></i> Key Achievements</h4>
          <ul class="achievements-list">
            {#each job.highlights as highlight}
              <li>
                <i class="fa-solid fa-chevron-right"></i>
                <span>{highlight}</span>
              </li>
            {/each}
          </ul>
        </div>
      {/if}

      {#if job.technologies && job.technologies.length > 0}
        <div class="job-section">
          <h4><i class="fa-solid fa-code"></i> Tech Arsenal</h4>
          <div class="tech-stack">
            {#each job.technologies as technology}
              <div class="tech-item">
                <Language language={technology} />
              </div>
            {/each}
          </div>
        </div>
      {/if}

      {#if job.projects && job.projects.length > 0}
        <div class="job-section">
          <h4><i class="fa-solid fa-rocket"></i> {job.projectType}</h4>
          <div class="projects-grid">
            {#each job.projects || [] as project}
              <div class="project-item" title={project.name}>
                <img src={project.logo} alt={project.name}/>
                <span>{project.name}</span>
              </div>
            {/each}
          </div>
        </div>
      {/if}
    </div>
  {/each}
</div>

<style lang="scss">
  .terminal-header {
    background: var(--card-background);
    border: 1px solid var(--border-color);
    border-radius: var(--button-radius) var(--button-radius) 0 0;
    padding: 0.75rem 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0;
    
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
      margin-left: auto;
    }
  }

  .command-line {
    background: var(--background);
    border: 1px solid var(--border-color);
    border-top: none;
    border-radius: 0 0 var(--button-radius) var(--button-radius);
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

  .experience-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .job-entry {
    background: var(--card-background);
    border: 1px solid var(--border-color);
    border-radius: var(--button-radius);
    padding: 1.5rem;
    position: relative;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    &::before {
      content: "0" counter(job, decimal);
      counter-increment: job;
      position: absolute;
      top: -10px;
      left: 1rem;
      background: var(--primary);
      color: var(--background);
      padding: 0.25rem 0.75rem;
      border-radius: var(--button-radius);
      font-family: var(--font-mono);
      font-size: 0.8rem;
      font-weight: 700;
    }
    
    &:hover {
      border-color: var(--primary);
      box-shadow: var(--glow-effect), var(--box-shadow);
      transform: translateY(-2px);
    }
  }

  .job-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1.5rem;
    
    .company-info {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      
      .company-link {
        transition: transform 0.3s ease;
        
        &:hover {
          transform: scale(1.1);
        }
      }
      
      .company-logo {
        width: 3rem;
        height: 3rem;
        border-radius: 0.5rem;
        border: 1px solid var(--border-color);
        padding: 0.25rem;
        background: var(--background);
      }
      
      .job-details {
        flex: 1;
        
        .position {
          color: var(--primary);
          font-size: 1.3rem;
          font-weight: 700;
          margin: 0 0 0.25rem 0;
          font-family: var(--font-mono);
        }
        
        .company {
          color: var(--text-color);
          font-size: 1.1rem;
          font-weight: 600;
          margin: 0 0 0.5rem 0;
        }
        
        .duration {
          color: var(--text-color-dim);
          font-size: 0.9rem;
          margin: 0;
          font-family: var(--font-mono);
        }
      }
    }
    
    .status-badge {
      background: var(--gradient-dark);
      color: var(--primary);
      padding: 0.5rem 1rem;
      border-radius: var(--button-radius);
      border: 1px solid var(--border-color);
      font-size: 0.8rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      
      i {
        color: #27ca3f;
      }
    }
  }

  .job-section {
    margin-bottom: 1.5rem;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    h4 {
      color: var(--primary);
      font-size: 1rem;
      font-weight: 600;
      margin: 0 0 1rem 0;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      
      i {
        width: 20px;
        text-align: center;
      }
    }
    
    .responsibilities {
      color: var(--text-color);
      line-height: 1.6;
      font-style: italic;
      background: var(--gradient-dark);
      padding: 1rem;
      border-radius: var(--button-radius);
      border-left: 4px solid var(--primary);
    }
  }

  .achievements-list {
    list-style: none;
    padding: 0;
    margin: 0;
    
    li {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      padding: 0.75rem 0;
      border-bottom: 1px solid var(--border-color);
      
      &:last-child {
        border-bottom: none;
      }
      
      i {
        color: var(--primary);
        margin-top: 0.1rem;
        font-size: 0.8rem;
      }
      
      span {
        color: var(--text-color);
        line-height: 1.5;
      }
    }
  }

  .tech-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    
    .tech-item {
      :global(.language) {
        background: var(--gradient-dark) !important;
        border: 1px solid var(--border-color) !important;
        padding: 0.5rem 1rem !important;
        border-radius: var(--button-radius) !important;
        color: var(--text-color) !important;
        font-size: 0.85rem !important;
        font-weight: 500 !important;
        transition: all 0.3s ease !important;
        
        &:hover {
          border-color: var(--primary) !important;
          color: var(--primary) !important;
          transform: translateY(-1px) !important;
        }
      }
    }
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
    
    .project-item {
      background: var(--gradient-dark);
      border: 1px solid var(--border-color);
      border-radius: var(--button-radius);
      padding: 1rem;
      text-align: center;
      transition: all 0.3s ease;
      
      &:hover {
        border-color: var(--primary);
        transform: translateY(-2px);
      }
      
      img {
        width: 2rem;
        height: 2rem;
        border-radius: 0.25rem;
        margin-bottom: 0.5rem;
      }
      
      span {
        display: block;
        color: var(--text-color);
        font-size: 0.8rem;
        font-weight: 500;
      }
    }
  }

  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }

  @media (max-width: 768px) {
    .job-header {
      flex-direction: column;
      gap: 1rem;
      
      .company-info {
        width: 100%;
      }
      
      .status-badge {
        align-self: flex-start;
      }
    }
    
    .projects-grid {
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    }
  }
</style>
