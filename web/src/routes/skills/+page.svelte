<script>
	import '../../styles/resume-main.scss';
	import '../../styles/other-pages.scss';
  import Language from '../../components/Language.svelte';
  export let data = {};
 
  const techStack = data.additionalData?.techStack || data.techStack || {};
  const techStackExtras = data.additionalData?.techStackExtras || data.techStackExtras || {};

  // Calculate stats
  let totalTechnologies = 0;
  let totalProjects = 0;
  Object.values(techStack).forEach((category) => {
    totalTechnologies += category.length;
    category.forEach((tech) => {
      totalProjects += tech.projects.length;
    });
  });

  const softSkills = [
    { name: 'Quick Learner', description: 'Fast at picking up new concepts and technologies', icon: '⚡' },
    { name: 'Problem Solver', description: 'Approaching challenges with solution-oriented mindset', icon: '🧩' },
    { name: 'Attention to Detail', description: 'Careful and thorough in all aspects of work', icon: '🔍' },
    { name: 'Team Player', description: 'Comfortable working collaboratively in team environments', icon: '🤝' },
    { name: 'Adaptable', description: 'Flexible and able to adjust to changing requirements', icon: '🔄' },
    { name: 'Security Focused', description: 'Prioritizing security best practices in development', icon: '🔒' },
  ];

  // Map category keys to display names and icons
  const categoryInfo = {
    backend: { 
      name: 'Backend', 
      icon: '⚙️',
      description: 'Server-side development & APIs'
    },
    frontend: { 
      name: 'Frontend', 
      icon: '🎨',
      description: 'UI/UX & client-side frameworks'
    },
    mobile: { 
      name: 'Mobile', 
      icon: '📱',
      description: 'iOS & Android development'
    },
    security: {
      name: 'Cybersecurity Tools',
      icon: '🔒',
      description: 'Penetration testing & security tools'
    },
    other: { 
      name: 'Other Technologies', 
      icon: '🔧',
      description: 'DevOps, scripting & tools'
    }
  };
</script>

<svelte:head>	
	<title>Daniel Wambua | CV | Skills</title>
</svelte:head>

<section class="skills-container">
  <!-- Terminal Header -->
  <div class="terminal-header">
    <div class="terminal-buttons">
      <span class="btn close"></span>
      <span class="btn minimize"></span>
      <span class="btn maximize"></span>
    </div>
    <div class="terminal-title">~/skills</div>
  </div>

  <!-- Command Prompt -->
  <div class="command-prompt">
    <span class="prompt-symbol">$</span>
    <span class="command">cat technical_skills.txt</span>
    <span class="cursor">_</span>
  </div>

  <!-- Stats Overview -->
  <div class="stats-grid">
    <div class="stat-box" style="--delay: 0s">
      <div class="stat-icon">
        <i class="fas fa-code"></i>
      </div>
      <div class="stat-content">
        <div class="stat-value">{totalTechnologies}</div>
        <div class="stat-label">Technologies</div>
      </div>
    </div>
    <div class="stat-box" style="--delay: 0.1s">
      <div class="stat-icon">
        <i class="fas fa-project-diagram"></i>
      </div>
      <div class="stat-content">
        <div class="stat-value">{totalProjects}</div>
        <div class="stat-label">Projects</div>
      </div>
    </div>
    <div class="stat-box" style="--delay: 0.2s">
      <div class="stat-icon">
        <i class="fas fa-layer-group"></i>
      </div>
      <div class="stat-content">
        <div class="stat-value">{Object.keys(techStack).length}</div>
        <div class="stat-label">Categories</div>
      </div>
    </div>
  </div>

  <!-- Technology Stack -->
  <h2 class="section-title">
    <i class="fas fa-terminal"></i> Technology Stack
  </h2>

  {#each Object.keys(techStack) as categoryKey, catIndex}
    <div class="category-section" style="--delay: {catIndex * 0.1}s">
      <div class="category-header">
        <span class="category-icon">{categoryInfo[categoryKey]?.icon || '💻'}</span>
        <div class="category-info">
          <h3>{categoryInfo[categoryKey]?.name || categoryKey}</h3>
          <p class="category-description">{categoryInfo[categoryKey]?.description || ''}</p>
        </div>
        <div class="category-badge">{techStack[categoryKey].length} techs</div>
      </div>

      <div class="tech-grid">
        {#each techStack[categoryKey] as tech, techIndex}
          <div class="tech-card" style="--delay: {(catIndex * 0.1) + (techIndex * 0.05)}s">
            <div class="tech-card-header">
              <Language language={tech.language} />
              <span class="project-count">{tech.projects.length} project{tech.projects.length !== 1 ? 's' : ''}</span>
            </div>
            
            <div class="projects-container">
              <div class="projects-header">
                <i class="fab fa-github"></i>
                <span>Projects</span>
              </div>
              <div class="projects-grid">
                {#each tech.projects as project}
                  <a 
                    href="https://github.com/Daniel-wambua/{project.trim()}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="project-link"
                    title="View on GitHub"
                  >
                    <i class="fas fa-folder-open"></i>
                    <span>{project}</span>
                    <i class="fas fa-external-link-alt external-icon"></i>
                  </a>
                {/each}
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/each}

  <!-- Additional Technologies -->
  {#if techStackExtras}
    <h2 class="section-title extras-title">
      <i class="fas fa-plus-circle"></i> Additional Technologies
    </h2>
    
    <div class="extras-grid">
      {#each Object.keys(techStackExtras) as extraCategory, index}
        <div class="extra-card" style="--delay: {index * 0.1}s">
          <h4 class="extra-category-title">
            {extraCategory.charAt(0).toUpperCase() + extraCategory.slice(1)}
          </h4>
          <div class="extra-tech-list">
            {#each techStackExtras[extraCategory] as tech}
              <Language language={tech} small={true} />
            {/each}
          </div>
        </div>
      {/each}
    </div>
  {/if}

  <!-- Soft Skills -->
  <h2 class="section-title soft-skills-title">
    <i class="fas fa-brain"></i> Soft Skills
  </h2>

  <div class="soft-skills-grid">
    {#each softSkills as skill, index}
      <div class="soft-skill-card" style="--delay: {index * 0.1}s">
        <div class="skill-icon-circle">{skill.icon}</div>
        <h4>{skill.name}</h4>
        <p>{skill.description}</p>
      </div>
    {/each}
  </div>

  <!-- Note -->
  <div class="info-note">
    <i class="fas fa-info-circle"></i>
    <p><strong>Note:</strong> This list showcases public GitHub repositories and may not be fully exhaustive of all technologies and projects.</p>
  </div>
</section>

<style lang="scss">
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }

  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }

  .skills-container {
    max-width: 1400px;
    margin: 2rem auto;
    padding: 2rem;
    animation: fadeInUp 0.6s ease-out;

    @media (max-width: 768px) {
      padding: 1rem;
    }
  }

  // Terminal Header
  .terminal-header {
    background: linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%);
    border: 1px solid rgba(6, 182, 212, 0.2);
    border-bottom: none;
    border-radius: 8px 8px 0 0;
    padding: 0.75rem 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  }

  .terminal-buttons {
    display: flex;
    gap: 0.5rem;

    .btn {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      
      &.close { background: #ff5f56; }
      &.minimize { background: #ffbd2e; }
      &.maximize { background: #27c93f; }
    }
  }

  .terminal-title {
    color: #06b6d4;
    font-family: 'Courier New', monospace;
    font-size: 0.9rem;
    font-weight: 600;
  }

  // Command Prompt
  .command-prompt {
    background: #1a1a1a;
    border: 1px solid rgba(6, 182, 212, 0.2);
    border-top: none;
    padding: 1rem;
    font-family: 'Courier New', monospace;
    color: #06b6d4;
    margin-bottom: 2rem;

    .prompt-symbol {
      color: #ff6b6b;
      margin-right: 0.5rem;
    }

    .command {
      color: #06b6d4;
    }

    .cursor {
      animation: blink 1s step-end infinite;
      color: #06b6d4;
    }
  }

  // Stats Grid
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
  }

  .stat-box {
    background: linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(6, 182, 212, 0.05) 100%);
    border: 1px solid rgba(6, 182, 212, 0.3);
    border-radius: 8px;
    padding: 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    animation: fadeInUp 0.6s ease-out var(--delay, 0s) both;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(6, 182, 212, 0.2);
      border-color: #06b6d4;
    }
  }

  .stat-icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #06b6d4 0%, rgba(6, 182, 212, 0.6) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: #000;
    animation: pulse 2s ease-in-out infinite;
  }

  .stat-content {
    flex: 1;
  }

  .stat-value {
    font-size: 2rem;
    font-weight: 700;
    color: #06b6d4;
    line-height: 1;
  }

  .stat-label {
    font-size: 0.9rem;
    color: #fff;
    opacity: 0.7;
    margin-top: 0.25rem;
  }

  // Section Titles
  .section-title {
    font-size: 2rem;
    font-weight: 700;
    color: #06b6d4;
    margin: 3rem 0 1.5rem 0;
    display: flex;
    align-items: center;
    gap: 0.75rem;

    i {
      font-size: 1.5rem;
    }
  }

  // Category Section
  .category-section {
    margin-bottom: 3rem;
    animation: fadeInUp 0.6s ease-out var(--delay, 0s) both;
  }

  .category-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.25rem;
    background: linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(6, 182, 212, 0.05) 100%);
    border: 1px solid rgba(6, 182, 212, 0.3);
    border-radius: 8px;
    margin-bottom: 1.5rem;

    .category-icon {
      font-size: 2rem;
    }

    .category-info {
      flex: 1;

      h3 {
        margin: 0;
        font-size: 1.5rem;
        color: #06b6d4;
      }

      .category-description {
        margin: 0.25rem 0 0 0;
        font-size: 0.9rem;
        color: #fff;
        opacity: 0.7;
      }
    }

    .category-badge {
      background: #06b6d4;
      color: #000;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-weight: 600;
      font-size: 0.85rem;
    }
  }

  // Tech Grid
  .tech-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.5rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .tech-card {
    background: #1e1e1e;
    border: 1px solid rgba(6, 182, 212, 0.2);
    border-radius: 8px;
    padding: 1.5rem;
    animation: fadeInUp 0.6s ease-out var(--delay, 0s) both;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      border-color: #06b6d4;
      box-shadow: 0 8px 16px rgba(6, 182, 212, 0.2);
    }
  }

  .tech-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(6, 182, 212, 0.2);

    .project-count {
      font-size: 0.85rem;
      color: #fff;
      opacity: 0.6;
      background: rgba(6, 182, 212, 0.1);
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
    }
  }

  // Projects Container
  .projects-container {
    .projects-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.9rem;
      color: #06b6d4;
      margin-bottom: 0.75rem;
      font-weight: 600;
    }

    .projects-grid {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .project-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.6rem 0.75rem;
      background: rgba(6, 182, 212, 0.05);
      border: 1px solid rgba(6, 182, 212, 0.2);
      border-radius: 6px;
      color: #fff;
      text-decoration: none;
      font-size: 0.9rem;
      transition: all 0.3s ease;

      i {
        color: #06b6d4;
        font-size: 0.85rem;
      }

      span {
        flex: 1;
      }

      .external-icon {
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      &:hover {
        background: rgba(6, 182, 212, 0.15);
        border-color: #06b6d4;
        transform: translateX(5px);

        .external-icon {
          opacity: 1;
        }
      }
    }
  }

  // Extras Grid
  .extras-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
  }

  .extra-card {
    background: #1e1e1e;
    border: 1px solid rgba(6, 182, 212, 0.2);
    border-radius: 8px;
    padding: 1.5rem;
    animation: fadeInUp 0.6s ease-out var(--delay, 0s) both;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      border-color: #06b6d4;
      box-shadow: 0 8px 16px rgba(6, 182, 212, 0.2);
    }

    .extra-category-title {
      margin: 0 0 1rem 0;
      color: #06b6d4;
      font-size: 1.1rem;
      font-weight: 600;
    }

    .extra-tech-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }
  }

  // Soft Skills Grid
  .soft-skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
  }

  .soft-skill-card {
    background: #1e1e1e;
    border: 1px solid rgba(6, 182, 212, 0.2);
    border-radius: 8px;
    padding: 2rem 1.5rem;
    text-align: center;
    animation: fadeInUp 0.6s ease-out var(--delay, 0s) both;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      border-color: #06b6d4;
      box-shadow: 0 8px 16px rgba(6, 182, 212, 0.2);

      .skill-icon-circle {
        transform: rotate(360deg) scale(1.1);
      }
    }

    .skill-icon-circle {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, #06b6d4 0%, rgba(6, 182, 212, 0.6) 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      margin: 0 auto 1rem auto;
      transition: all 0.5s ease;
    }

    h4 {
      margin: 0 0 0.75rem 0;
      color: #06b6d4;
      font-size: 1.1rem;
      font-weight: 600;
    }

    p {
      margin: 0;
      color: #fff;
      opacity: 0.8;
      font-size: 0.9rem;
      line-height: 1.5;
    }
  }

  // Info Note
  .info-note {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1.5rem;
    background: linear-gradient(135deg, rgba(255, 165, 0, 0.1) 0%, rgba(255, 165, 0, 0.05) 100%);
    border: 1px solid rgba(255, 165, 0, 0.3);
    border-radius: 8px;
    animation: fadeInUp 0.6s ease-out;

    i {
      color: #ffa500;
      font-size: 1.5rem;
      margin-top: 0.25rem;
    }

    p {
      margin: 0;
      color: #fff;
      opacity: 0.9;
      line-height: 1.6;

      strong {
        color: #ffa500;
      }
    }
  }
</style>
