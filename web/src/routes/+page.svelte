<script lang="ts">
	import '../styles/resume-main.scss';
	import { marked } from 'marked';

	export let data: any;

	const makeUrlretty = (url: string) => {
		return url.replace(/(^\w+:|^)\/\//, '');
	}

	const formatData = (date: string) => {
		if (!date.match(/^\d{4}-\d{2}$/)) {
			return date;
		}
		const [year, month] = date.split('-');
		const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		return `${months[parseInt(month) - 1]} ${year}`;
	}

	const mdToHtml = (md: { text: string, source: string }) => {
		if (!md || !md.text) {
			return '';
		}
		return marked(md.text);
	}

</script>

<svelte:head>	
	<title>Daniel Wambua | Information Technology Student & Cybersecurity Enthusiast</title>
	<meta name="description" content="Information Technology student at Karatina University specializing in cybersecurity, penetration testing, and ethical hacking. Actively seeking internship opportunities in information security.">
</svelte:head>

<div class="resume cyber-theme">
  <!-- Resume head -->
	<section class="basics">
		<div class="terminal-header">
			<span class="terminal-dot red"></span>
			<span class="terminal-dot yellow"></span>
			<span class="terminal-dot green"></span>
			<span class="terminal-title">daniel@cybersec:~$</span>
		</div>
    <h1 class="cyber-name">
			<span class="prompt">└─$ </span>
			{data.basics.name}
			<span class="cursor">_</span>
		</h1>
		<div class="role-badge">
			<i class="fa-solid fa-graduation-cap"></i>
			Information Technology (IT) Student & Cybersecurity Enthusiast
		</div>
		<div class="contacts">
			<div class="contact-item">
				<i class="fa-solid fa-envelope"></i>
				<span>{data.basics.email}</span>
			</div>
			<div class="contact-item">
				<i class="fa-brands fa-github"></i>
				<a href={data.basics.url}>{makeUrlretty(data.basics.url)}</a>
			</div>
			<div class="contact-item">
				<i class="fa-solid fa-location-dot"></i>
				<span>{data.basics.location.address}</span>
			</div>
		</div>

		<!-- Professional Summary -->
		<div class="professional-summary">
			<div class="summary-card">
				<div class="summary-icon">
					<i class="fa-solid fa-graduation-cap"></i>
				</div>
				<div class="summary-content">
					<h3>Student & Aspiring Cybersecurity Professional</h3>
					<p>Passionate about ethical hacking, penetration testing, and cybersecurity research. Currently building skills through CTFs, bug bounty programs, and hands-on projects.</p>
				</div>
			</div>
		</div>
  </section>

	<!-- Career Objective -->
  <section class="career-objective">
		<div class="objective-container">
			<div class="objective-header">
				<h2><i class="fa-solid fa-target"></i> Career Objective</h2>
			</div>
			<div class="objective-content">
				<p class="objective-text">{data['personal-statement']}</p>
				<div class="looking-for-work">
					<div class="work-status">
						<i class="fa-solid fa-briefcase-medical"></i>
						<span class="status-text">Actively seeking internship and entry-level opportunities</span>
					</div>
					<div class="availability">
						<i class="fa-solid fa-calendar-check"></i>
						<span>Available for immediate start</span>
					</div>
				</div>
			</div>
		</div>
		<div class="action-buttons">
			<a href="/intro" class="btn-link">
				<button class="cyber-btn primary">
					<i class="fa-solid fa-user"></i>
					Learn More About Me
					<i class="fa-solid fa-arrow-right"></i>
				</button>
			</a>
			<a href="/contact" class="btn-link">
				<button class="cyber-btn secondary">
					<i class="fa-solid fa-envelope"></i>
					Get In Touch
				</button>
			</a>
		</div>
  </section>

	{#if data.work && data.work.length > 0}
		<section class="work modern-section">
			<div class="section-header">
				<h2><i class="fa-solid fa-briefcase"></i> Recent Experience</h2>
			</div>
			<div class="section-content">
				{#each data.work.slice(0, 2) as job}
					<div class="experience-card">
						<div class="company-info">
							<h3>{job.name}</h3>
							<div class="position-details">
								<h4>{job.position}</h4>
								<span class="date-range">{formatData(job.startDate)} - {formatData(job.endDate)}</span>
							</div>
						</div>
						<ul class="highlights">
							{#each job.highlights.slice(0, 2) as highlight}
								<li>{highlight}</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
			<div class="section-footer">
				<a href="/experience" class="view-more-btn">
					<i class="fa-solid fa-briefcase"></i>
					View All Experience
					<i class="fa-solid fa-arrow-right"></i>
				</a>
			</div>
		</section>
	{/if}

	{#if data.education && data.education.length > 0}
	<section class="education modern-section">
		<div class="section-header">
			<h2><i class="fa-solid fa-graduation-cap"></i> Education</h2>
		</div>
		<div class="section-content">
			{#each data.education as edu}
				<div class="education-card">
					<div class="institution-info">
						<h3>{edu.institution}</h3>
						<h4>{edu.area} ({edu.studyType})</h4>
						{#if edu.score}
							<p class="score">{edu.score}</p>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</section>
	{/if}

  <section class="skills modern-section">
		<div class="section-header">
			<h2><i class="fa-solid fa-code"></i> Key Skills</h2>
		</div>
		<div class="section-content">
			<div class="skills-grid">
				{#each data.skills.slice(0, 4) as skill}
					<div class="skill-category">
						<h4>{skill.name}</h4>
						<div class="skill-tags">
							{#each skill.keywords.slice(0, 3) as keyword}
								<span class="skill-tag">{keyword}</span>
							{/each}
							{#if skill.keywords.length > 3}
								<span class="skill-tag more">+{skill.keywords.length - 3} more</span>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>
		<div class="section-footer">
			<a href="/skills" class="view-more-btn">
				<i class="fa-solid fa-code"></i>
				View All Skills
				<i class="fa-solid fa-arrow-right"></i>
			</a>
		</div>
  </section>

  <section class="achievements modern-section">
		<div class="section-header">
			<h2><i class="fa-solid fa-star"></i> Recent Achievements</h2>
		</div>
		<div class="section-content">
			<div class="achievements-list">
				{#each (data.achievements || []).slice(0, 3) as achievement}
					<div class="achievement-item">
						<i class="fa-solid fa-trophy achievement-icon"></i>
						<div class="achievement-text">
							{ achievement.text }
							{#if achievement.source}
								<a href={achievement.source} title={makeUrlretty(achievement.source)} target="_blank" rel="nofollow" class="achievement-link">
									<i class="fa-solid fa-external-link"></i>
								</a>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>
		<div class="section-footer">
			<a href="/achievements" class="view-more-btn">
				<i class="fa-solid fa-star"></i>
				View All Achievements
				<i class="fa-solid fa-arrow-right"></i>
			</a>
		</div>
	</section>

	<section class="certificates modern-section">
		<div class="section-header">
			<h2><i class="fa-solid fa-certificate"></i> Professional Certificates</h2>
		</div>
		<div class="section-content">
			<div class="certificates-preview">
				<p class="certificates-intro">
					<i class="fa-solid fa-shield-halved"></i>
					Continuously expanding my cybersecurity expertise through professional certifications and specialized training programs.
				</p>
				<div class="certificates-stats">
					<div class="cert-stat">
						<span class="cert-number">5+</span>
						<span class="cert-label">Certificates Earned</span>
					</div>
					<div class="cert-stat">
						<span class="cert-number">2023-2025</span>
						<span class="cert-label">Recent Achievements</span>
					</div>
				</div>
			</div>
		</div>
		<div class="section-footer">
			<a href="/certificates" class="view-more-btn">
				<i class="fa-solid fa-certificate"></i>
				View All Certificates
				<i class="fa-solid fa-arrow-right"></i>
			</a>
		</div>
	</section>

	<section class="achievements">
		<h2>Awards</h2>
		<ul>
			{#each (data.awards || []) as award}
				<li>
					<b>{ award.title }</b> - <i>{ award.summary}</i>
					{#if award.source}
						<a href={award.source} title={makeUrlretty(award.source)} target="_blank" rel="nofollow">
							<i class="achievement-link fa-solid fa-link"></i>
						</a>
					{/if}
				</li>
			{/each}
		</ul>

  </section>
</div>
<style lang="scss">
.achievement-link {
	color: var(--text-color);
	opacity: 0.8;
	font-size: 0.6rem;
	transition: all 0.2s ease-in-out;
	&:hover {
		color: var(--primary);
	}
}

.certificates-preview {
	.certificates-intro {
		color: var(--text-color);
		margin: 0 0 2rem 0;
		font-size: 1rem;
		line-height: 1.6;
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 1.5rem;
		background: linear-gradient(135deg, rgba(0, 255, 136, 0.05), rgba(0, 255, 136, 0.02));
		border-radius: 0.5rem;
		border: 1px solid rgba(0, 255, 136, 0.2);
		
		i {
			color: var(--primary);
			font-size: 1.5rem;
			flex-shrink: 0;
		}
	}
	
	.certificates-stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1.5rem;
		
		.cert-stat {
			background: linear-gradient(135deg, rgba(0, 255, 136, 0.1), rgba(0, 255, 136, 0.05));
			border: 1px solid rgba(0, 255, 136, 0.3);
			border-radius: 0.5rem;
			padding: 1.5rem;
			text-align: center;
			transition: all 0.3s ease;
			
			&:hover {
				border-color: var(--primary);
				box-shadow: 0 4px 15px rgba(0, 255, 136, 0.2);
				transform: translateY(-2px);
			}
			
			.cert-number {
				display: block;
				color: var(--primary);
				font-size: 2rem;
				font-weight: 700;
				margin-bottom: 0.5rem;
				font-family: var(--font-mono);
			}
			
			.cert-label {
				display: block;
				color: var(--text-color-dim);
				font-size: 0.85rem;
				text-transform: uppercase;
				letter-spacing: 0.5px;
			}
		}
	}
}
</style>
