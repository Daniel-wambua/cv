<script>
  import '../../styles/other-pages.scss';
  
  let emailVisible = false;
  const revealEmail = () => {
    emailVisible = true;
    navigator.clipboard.writeText('wambuahdaniel@gmail.com');
  }
</script>

<svelte:head>	
	<title>Daniel Wambua | CV | Contact</title>
	<meta name="description" content="Get in touch with Daniel Wambua for cybersecurity, penetration testing, and ethical hacking opportunities.">
</svelte:head>

<div class="contact-page">
  <div class="terminal-header">
    <div class="terminal-controls">
      <div class="terminal-dot red"></div>
      <div class="terminal-dot yellow"></div>
      <div class="terminal-dot green"></div>
    </div>
    <div class="terminal-title">contact.sh</div>
  </div>

  <div class="contact-content">
    <h1>
      <i class="fa-solid fa-paper-plane"></i>
      Let's Connect
    </h1>

    <div class="intro-text">
      <p>
        If you're looking for a passionate cybersecurity professional or full-stack developer, I'd love to hear from you!
      </p>
      <p>
        You can get in touch by dropping me an email 
        {#if emailVisible}
          <a href="mailto:wambuahdaniel@gmail.com" class="email-link">
            <i class="fa-solid fa-envelope"></i>
            wambuahdaniel@gmail.com
          </a>
        {:else}
          <button on:click={revealEmail} class="small-btn no-float" title="Click to show email address and copy to clipboard">
            <i class="fa-solid fa-eye"></i>
            Reveal Email Address
          </button>
        {/if}
      </p>
      <p>
        For other communication channels, visit 
        <a target="_blank" href="https://linktree.havocsec.me" rel="noopener noreferrer">
          <i class="fa-solid fa-tree"></i>
          linktree
        </a>
      </p>
    </div>

    <div class="contact-cards">
      <div class="contact-card">
        <div class="card-icon">
          <i class="fa-brands fa-linkedin"></i>
        </div>
        <h3>LinkedIn</h3>
        <p>Connect with me professionally</p>
        <a href="https://www.linkedin.com/in/daniel-wambua-a312b32b8/" target="_blank" rel="noopener noreferrer" class="card-link">
          Visit Profile
          <i class="fa-solid fa-arrow-right"></i>
        </a>
      </div>

      <div class="contact-card">
        <div class="card-icon">
          <i class="fa-brands fa-github"></i>
        </div>
        <h3>GitHub</h3>
        <p>Check out my open source work</p>
        <a href="https://github.com/Daniel-wambua" target="_blank" rel="noopener noreferrer" class="card-link">
          View Repositories
          <i class="fa-solid fa-arrow-right"></i>
        </a>
      </div>

      <div class="contact-card">
        <div class="card-icon">
          <i class="fa-solid fa-flag"></i>
        </div>
        <h3>CTFtime</h3>
        <p>Follow my CTF journey</p>
        <a href="https://ctftime.org/team/409004" target="_blank" rel="noopener noreferrer" class="card-link">
          View Team
          <i class="fa-solid fa-arrow-right"></i>
        </a>
      </div>
    </div>

    <div class="some-text">
      <h3>
        <i class="fa-solid fa-compass"></i>
        Explore More
      </h3>
      <p>
        Learn more about me on the <a href="/intro">intro</a> page, or browse my 
        <a href="/skills">skills</a>, <a href="/experience">experience</a>, and
        <a href="/achievements">achievements</a> to see if I align with what you're looking for.
      </p>
      <p>
        A shortened version of my CV in PDF format can be downloaded <a href="/download">here</a>.
        To see if I'd be a good fit for your team, view my <a href="/ideal-role">ideal role</a>.
      </p>
      <p>
        If you have any questions or would like references, feel free to reach out! 😊
      </p>
    </div>

    <div class="thank-you">
      <i class="fa-solid fa-heart"></i>
      <p>Thank you for stopping by, and I really hope to hear from you!</p>
    </div>
  </div>
</div>

<style lang="scss">
  .contact-page {
    animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .terminal-header {
    background: var(--surface);
    padding: var(--space-md) var(--space-lg);
    border-radius: var(--radius-lg) var(--radius-lg) 0 0;
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    border: 1px solid var(--border-color);
    border-bottom: none;
    margin-bottom: 0;
    
    .terminal-controls {
      display: flex;
      gap: var(--space-sm);
      
      .terminal-dot {
        width: 12px;
        height: 12px;
        border-radius: var(--radius-full);
        
        &.red { background: #ff5f56; }
        &.yellow { background: #ffbd2e; }
        &.green { background: #27ca3f; }
      }
    }
    
    .terminal-title {
      color: var(--text-color-dim);
      font-family: var(--font-mono);
      font-size: var(--font-size-sm);
      margin-left: auto;
    }
  }

  .contact-content {
    background: var(--surface);
    border: 1px solid var(--border-color);
    border-top: none;
    border-radius: 0 0 var(--radius-lg) var(--radius-lg);
    padding: var(--space-2xl);
    
    @media (max-width: 768px) {
      padding: var(--space-xl);
    }
    
    h1 {
      color: var(--primary);
      margin-bottom: var(--space-xl);
      display: flex;
      align-items: center;
      gap: var(--space-md);
      
      i {
        font-size: var(--font-size-3xl);
      }
    }
  }

  .intro-text {
    margin-bottom: var(--space-2xl);
    
    p {
      color: var(--text-color-secondary);
      line-height: var(--line-height-relaxed);
      margin-bottom: var(--space-lg);
      font-size: var(--font-size-base);
    }
    
    .email-link {
      display: inline-flex;
      align-items: center;
      gap: var(--space-sm);
      color: var(--primary);
      font-weight: 600;
      padding: var(--space-sm) var(--space-lg);
      background: var(--primary-transparent);
      border-radius: var(--radius-lg);
      border: 1px solid var(--primary);
      transition: all var(--transition-base);
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-md);
      }
    }
  }

  .contact-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--space-xl);
    margin: var(--space-2xl) 0;
  }

  .contact-card {
    background: var(--background-elevated);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-xl);
    padding: var(--space-2xl);
    text-align: center;
    transition: all var(--transition-medium);
    
    &:hover {
      border-color: var(--primary);
      box-shadow: var(--shadow-lg), var(--shadow-colored);
      transform: translateY(-4px);
      
      .card-icon {
        transform: scale(1.1);
      }
    }
    
    .card-icon {
      width: 64px;
      height: 64px;
      margin: 0 auto var(--space-lg);
      background: var(--gradient-primary);
      color: var(--background);
      border-radius: var(--radius-xl);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--font-size-3xl);
      box-shadow: var(--shadow-colored);
      transition: all var(--transition-medium);
    }
    
    h3 {
      color: var(--primary);
      margin: 0 0 var(--space-sm) 0;
      font-size: var(--font-size-xl);
    }
    
    p {
      color: var(--text-color-dim);
      margin: 0 0 var(--space-lg) 0;
      font-size: var(--font-size-sm);
    }
    
    .card-link {
      display: inline-flex;
      align-items: center;
      gap: var(--space-sm);
      color: var(--primary);
      font-weight: 600;
      font-size: var(--font-size-sm);
      transition: all var(--transition-base);
      
      &:hover {
        gap: var(--space-md);
      }
    }
  }

  .some-text {
    background: var(--primary-transparent);
    border: 2px solid var(--primary);
    padding: var(--space-2xl);
    margin: var(--space-2xl) 0;
    border-radius: var(--radius-xl);
    
    h3 {
      color: var(--primary);
      margin: 0 0 var(--space-lg) 0;
      display: flex;
      align-items: center;
      gap: var(--space-md);
      font-size: var(--font-size-xl);
    }
    
    p {
      margin-bottom: var(--space-md);
      line-height: var(--line-height-relaxed);
      
      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .thank-you {
    text-align: center;
    margin-top: var(--space-2xl);
    padding: var(--space-xl);
    background: var(--gradient-surface);
    border-radius: var(--radius-lg);
    border: 1px solid var(--border-color);
    
    i {
      color: var(--primary);
      font-size: var(--font-size-2xl);
      margin-bottom: var(--space-md);
      animation: pulse 2s infinite;
    }
    
    p {
      color: var(--text-color-secondary);
      font-size: var(--font-size-lg);
      font-weight: 500;
      margin: 0;
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

  @keyframes pulse {
    0%, 100% { 
      transform: scale(1); 
    }
    50% { 
      transform: scale(1.1); 
    }
  }
</style>

