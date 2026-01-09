<script>
  const navLinks = [
    { name: 'Intro', url: '/intro', icon: 'fa-address-card' },
    { name: 'Experience', url: '/experience', icon: 'fa-briefcase' },
    { name: 'Achievements', url: '/achievements', icon: 'fa-star' },
    { name: 'Skills', url: '/skills', icon: 'fa-code' },
  ];

  // ============================================================
  // CYBERSECURITY JUNIOR ROLE (ACTIVE)
  // ============================================================
  const intro = [
    `I'm seeking an entry-level cybersecurity role where I can apply my passion for 
    security research, penetration testing, and ethical hacking to protect organizations 
    from evolving threats.`,
    `With a strong foundation in CTF competitions, vulnerability assessment, and 
    security tools, I'm eager to contribute to a security team while continuously 
    learning from experienced professionals.`,
    `I bring a hacker's mindset combined with a defender's discipline—I think like 
    an attacker to build and maintain robust security defenses.`,
    `I'm committed to staying current with the latest threats, attack vectors, and 
    security best practices through continuous learning, certifications, and 
    hands-on practice.`,
    `My goal is to grow into a skilled security professional who can identify 
    vulnerabilities before adversaries do, and help build a security-first culture 
    within the organization.`
  ];

  const requirements = [
    { lbl: 'Location', desc: 'Worldwide (open to relocation for the right opportunity)' },
    { lbl: 'Contract Type', desc: 'Permanent, internship, or contract' },
    { lbl: 'Workspace', desc: 'Remote, hybrid, or on-site' },
    { lbl: 'Discipline', desc: 'Junior Penetration Tester, SOC Analyst, Security Engineer, or Vulnerability Analyst,Network Security Engineer' },
    { lbl: 'Industry', desc: 'Cybersecurity firms, fintech, tech companies, or any security-conscious organization' },
    { lbl: 'Comp', desc: 'Competitive salary, but I can and will be flexible on this for the right role' },
  ];

  const values = [
    'Invests in training and professional development',
    'Encourages employees happiness and work-life balance',
    'Has a strong security culture and dedicated security team',
    'Provides hands-on experience with real-world security challenges',
    'Values continuous learning and knowledge sharing',
    'Supports participation in CTFs and security research',
    'Mentorship programs for junior security professionals',
    'Collaborative environment where questions are welcomed',
  ];

  // ============================================================
  // DEVELOPER ROLE (COMMENTED OUT FOR FUTURE USE)
  // ============================================================
  /*
  const intro = [
    \`I'm looking for a role where I can take on exciting challenges, and lead teams
    to build top-notch customer-focused products.\`,
    \`Quality and coding standards are super
    important to me, and I love helping others level up their skills so we can
    create something awesome together, which will bring joy to our customers.\`,
    \`I'm always chasing challenges that push me to think like both a builder and a breaker. 
    As a penetration tester and security researcher, I bring a hacker's mindset to development.\`,
    \`I'm passionate about building a strong,
    supportive developer community with things like guilds, lunch & learns,
    coding challenges, and learning pathways.\`,
    \`Ultimately, I want to make sure all our developers are happy,
    and have what they need to succeed and build products that customers will truly love.\`
  ];

  const requirements = [
    { lbl: 'Location', desc: 'worldwide' },
    { lbl: 'Contract Type', desc: 'Permanent, part-time, or freelance' },
    { lbl: 'Workspace', desc: 'Physical,Remote or hybrid' },
    { lbl: 'Discipline', desc: 'Cybersecurity engineer,Full-Stack or Frontend, with a focus on security' },
    { lbl: 'Industry', desc: 'Fin tech, developer tools and custom-facing products, cybersecurity' },
    { lbl: 'Comp', desc: 'Competitive salary, but I can and will be flexible on this for the right role' },
  ];

  const values = [
    'Values quality and good coding standards',
    'Dedicated to developer happiness',
    'Investing in junior developers and fostering growth',
    'Developing customer-focused products',
    'Appreciates the value of open source',
    'Innovative, and an openness to trying new things',
    'Share security knowledge through CTFs and research',
    'Think like an attacker to build safer systems',
  ];
  */
</script>

<svelte:head>
<title>Daniel Wambua | CV | Ideal Role</title>
</svelte:head>

<h1>What I'm looking for</h1>

{#each intro as paragraph}
<p>{paragraph}</p>
{/each}

<h2>Values</h2>
<p class="subtitle">I'm looking for a company which has the following core values</p>
<ul>
  {#each values as value}
    <li>{value}</li>
  {/each}
</ul>


<h2>Requirements</h2>
<p class="subtitle">I'm pretty flexible on the details, but ideally looking to work within these parameters</p>
<ul>
  {#each requirements as { lbl, desc }}
    <li>
      <strong>{lbl}:</strong> {desc}
    </li>
  {/each}
</ul>



<h2>Why me?</h2>
<p>
  I'm a passionate cybersecurity enthusiast with proven skills in penetration testing, 
  vulnerability assessment, and security research. Check out my <a href="/certificates">certifications</a> 
  and <a href="/achievements">achievements</a> from CTF competitions and security training programs.
  You can learn more about my background and security mindset on my <a href="/intro">intro</a> page.
  I actively participate in CTFs, bug bounties, and security challenges to continuously sharpen my skills.
  See my security research and write-ups at <a href="https://havocsec.me">havocsec.me</a>
</p>

<h2>Get in Touch</h2>
<p>
  Looking for a motivated junior security professional? I'd love to hear from you! 
  Please <a href="/contact">get in touch</a> to discuss how I can contribute to your security team.
</p>

<div class="other-pages">
  {#each navLinks as { name, url, icon }}
    <a href={url} class="no-underline">
      <button class="big-btn"><i class="fa-solid {icon}"></i>{name}</button>
    </a>
  {/each}
</div>

<style lang="scss">

h2 {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 2rem 0 0.5rem 0;
}

.subtitle {
  margin: 0 0 0.5rem 0;
  font-size: 0.8rem;
  font-style: italic;
  opacity: 0.8;
}

ul {
  margin: 0;
  padding-left: 1rem;
  font-size: 1rem;
  li {
    strong {
      font-weight: 600;
    }
  }
}

p {
  font-size: 1rem;
  margin: 0 0 0.5rem 0;
}

.other-pages {
  display: grid;
  align-items: center;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
  a {
    button {
      margin: 0;
      font-size: 1rem;
      padding: 0.5rem 0.5rem;
    }
  }
}
</style>
