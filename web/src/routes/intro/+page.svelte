<script>
  	const navLinks = [
      { name: 'Experience', url: '/experience', icon: 'fa-briefcase' },
      { name: 'Achievements', url: '/achievements', icon: 'fa-star' },
      { name: 'Skills', url: '/skills', icon: 'fa-code' },
      { name: 'Contact', url: '/contact', icon: 'fa-paper-plane' },
    ];

    const sections = [
      {
        title: "Cybersecurity Professional", 
        icon: "fa-shield-halved",
        content: `IT student specializing in penetration testing, ethical hacking, and secure system design. Active in CTFs and bug bounty programs.`
      },
      {
        title: "Full-Stack Developer",
        icon: "fa-code",
        content: `Building secure applications with modern technologies. Experienced in both frontend and backend development with security-first approach.`
      },
      {
        title: "Continuous Learner",
        icon: "fa-graduation-cap",
        content: `Constantly expanding knowledge through hands-on projects, security research, and participation in the cybersecurity community.`
      }
    ];

</script>

<svelte:head>	
	<title>Daniel Wambua | Cybersecurity Professional</title>
</svelte:head>

<div class="terminal-window">
  <div class="terminal-header">
    <div class="terminal-controls">
      <div class="terminal-dot red"></div>
      <div class="terminal-dot yellow"></div>
      <div class="terminal-dot green"></div>
    </div>
    <div class="terminal-title">daniel@kali:~$ cat intro.md</div>
  </div>
  
  <div class="terminal-body">
    <div class="command-prompt">
      <span class="prompt">daniel@kali:~$</span>
      <span class="command">cat /home/daniel/about.md</span>
      <span class="cursor">_</span>
    </div>
    
    <div class="bio-header">
      <h1 class="cyber-greeting">
        <span class="hash"># </span>
        <span class="greeting-text">Daniel Wambua</span>
      </h1>
      <div class="subtitle">
        <i class="fa-solid fa-shield-halved"></i>
        Cybersecurity Specialist | Penetration Tester | Developer
      </div>
      <p class="bio-summary">
        Information Technology student at Karatina University with hands-on experience in ethical hacking, 
        penetration testing, and secure application development. Actively seeking internship opportunities 
        to apply cybersecurity expertise in real-world scenarios.
      </p>
    </div>

    <div class="intro-grid">
      {#each sections as section}
        <div class="intro-card">
          <div class="card-header">
            <i class="fa-solid {section.icon}"></i>
            <h3>{section.title}</h3>
          </div>
          <p>{section.content}</p>
        </div>
      {/each}
    </div>

    <div class="navigation-section">
      <div class="nav-header">
        <h3>
          <i class="fa-solid fa-map"></i>
          Navigate My Profile
        </h3>
        <p>Explore different aspects of my cybersecurity journey</p>
      </div>
      
      <div class="nav-grid">
        {#each navLinks as { name, url, icon }}
          <a href={url} class="nav-card">
            <div class="nav-icon">
              <i class="fa-solid {icon}"></i>
            </div>
            <span>{name}</span>
            <i class="fa-solid fa-arrow-right nav-arrow"></i>
          </a>
        {/each}
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .terminal-window {
    background: var(--card-background);
    border: 1px solid var(--border-color);
    border-radius: var(--button-radius);
    overflow: hidden;
    margin-bottom: 2rem;
  }

  .terminal-header {
    background: var(--gradient-dark);
    padding: 0.75rem 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    border-bottom: 1px solid var(--border-color);
    
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

  .terminal-body {
    padding: 2rem;
  }

  .command-prompt {
    font-family: var(--font-mono);
    margin-bottom: 2rem;
    padding: 1rem;
    background: var(--background);
    border-radius: var(--button-radius);
    border: 1px solid var(--border-color);
    
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

  .bio-header {
    text-align: center;
    margin-bottom: 3rem;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    
    .cyber-greeting {
      font-family: var(--font-mono);
      font-size: 2.5rem;
      margin: 0 0 1rem 0;
      
      .hash {
        color: var(--primary);
      }
      
      .greeting-text {
        color: var(--text-color);
      }
    }
    
    .subtitle {
      color: var(--text-color-dim);
      font-size: 1.1rem;
      font-weight: 500;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      margin-bottom: 1.5rem;
      
      i {
        color: var(--primary);
      }
    }
    
    .bio-summary {
      color: var(--text-color);
      font-size: 1rem;
      line-height: 1.8;
      text-align: left;
      background: var(--gradient-dark);
      padding: 1.5rem;
      border-radius: var(--button-radius);
      border: 1px solid var(--border-color);
      border-left: 4px solid var(--primary);
    }
  }

  .intro-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
  }

  .intro-card {
    background: var(--gradient-dark);
    border: 1px solid var(--border-color);
    border-radius: var(--button-radius);
    padding: 1.5rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    &:hover {
      border-color: var(--primary);
      transform: translateY(-4px);
      box-shadow: var(--glow-effect), var(--box-shadow);
    }
    
    .card-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
      
      i {
        color: var(--primary);
        font-size: 1.5rem;
        width: 24px;
        text-align: center;
      }
      
      h3 {
        color: var(--text-color);
        font-size: 1.1rem;
        font-weight: 600;
        margin: 0;
      }
    }
    
    p {
      color: var(--text-color);
      line-height: 1.6;
      margin: 0;
    }
  }

  .navigation-section {
    .nav-header {
      text-align: center;
      margin-bottom: 2rem;
      
      h3 {
        color: var(--primary);
        font-size: 1.5rem;
        font-weight: 600;
        margin: 0 0 0.5rem 0;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        
        i {
          font-size: 1.3rem;
        }
      }
      
      p {
        color: var(--text-color-dim);
        margin: 0;
      }
    }
  }

  .nav-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 0.8rem;
  }

  .nav-card {
    background: linear-gradient(135deg, var(--card-background), rgba(0, 255, 136, 0.05));
    border: 1px solid var(--border-color);
    border-radius: 0.5rem;
    padding: 1rem;
    text-decoration: none;
    color: var(--text-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    min-height: 80px;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(0, 255, 136, 0.1), transparent);
      transition: left 0.5s;
    }
    
    &:hover {
      border-color: var(--primary);
      transform: translateY(-2px);
      box-shadow: 0 4px 20px rgba(0, 255, 136, 0.2);
      
      &::before {
        left: 100%;
      }
      
      .nav-icon {
        transform: scale(1.2);
        color: var(--primary);
      }
      
      .nav-arrow {
        transform: translateX(3px);
        opacity: 1;
      }
    }
    
    .nav-icon {
      font-size: 1.3rem;
      color: var(--primary);
      transition: all 0.3s ease;
    }
    
    span {
      font-weight: 600;
      font-size: 0.9rem;
      text-align: center;
    }
    
    .nav-arrow {
      color: var(--primary);
      font-size: 0.8rem;
      transition: all 0.3s ease;
      opacity: 0.7;
    }
  }

  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }

  @media (max-width: 768px) {
    .intro-grid {
      grid-template-columns: 1fr;
    }
    
    .nav-grid {
      grid-template-columns: 1fr;
    }
    
    .bio-header .cyber-greeting {
      font-size: 2rem;
    }
    
    .terminal-body {
      padding: 1rem;
    }
  }
</style>
