<script lang="ts">
	import PageHero from '$components/PageHero.svelte';
	import SectionHeading from '$components/SectionHeading.svelte';
	import Card from '$components/Card.svelte';
	import { reveal } from '$lib/actions/reveal';

	import IdCardIcon from '~icons/fa6-solid/id-card';
	import BriefcaseIcon from '~icons/fa6-solid/briefcase';
	import TrophyIcon from '~icons/fa6-solid/trophy';
	import CodeIcon from '~icons/fa6-solid/code';
	import PaperPlaneIcon from '~icons/fa6-solid/paper-plane';
	import ArrowRightIcon from '~icons/fa6-solid/arrow-right';
	import CheckIcon from '~icons/fa6-solid/circle-check';

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
		`I bring a hacker's mindset combined with a defender's discipline - I think like
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
		{
			lbl: 'Discipline',
			desc: 'Junior Penetration Tester, SOC Analyst, Security Engineer, or Vulnerability Analyst,Network Security Engineer'
		},
		{
			lbl: 'Industry',
			desc: 'Cybersecurity firms, fintech, tech companies, or any security-conscious organization'
		},
		{
			lbl: 'Comp',
			desc: 'Competitive salary, but I can and will be flexible on this for the right role'
		}
	];

	const values = [
		'Invests in training and professional development',
		'Encourages employees happiness and work-life balance',
		'Has a strong security culture and dedicated security team',
		'Provides hands-on experience with real-world security challenges',
		'Values continuous learning and knowledge sharing',
		'Supports participation in CTFs and security research',
		'Mentorship programs for junior security professionals',
		'Collaborative environment where questions are welcomed'
	];

	const navLinks = [
		{ name: 'Intro', url: '/intro', icon: IdCardIcon },
		{ name: 'Experience', url: '/experience', icon: BriefcaseIcon },
		{ name: 'Achievements', url: '/achievements', icon: TrophyIcon },
		{ name: 'Skills', url: '/skills', icon: CodeIcon }
	];
</script>

<svelte:head>
	<title>Daniel Wambua | Ideal Role</title>
	<meta
		name="description"
		content="What Daniel Wambua is looking for in a junior cybersecurity role: penetration testing, SOC analysis, and security engineering opportunities."
	/>
</svelte:head>

<div class="ideal-role">
	<PageHero
		eyebrow="Ideal role"
		title="What I'm looking for"
		summary="An entry-level security role on a team that takes defense seriously and invests in its people."
	/>

	<div class="statement" use:reveal>
		{#each intro as paragraph}
			<p>{paragraph}</p>
		{/each}
	</div>

	<SectionHeading title="Values">
		The kind of company I do my best work for.
	</SectionHeading>
	<div class="values">
		{#each values as value, i}
			<div class="value-item" use:reveal style={`--reveal-delay: ${i * 50}ms`}>
				<CheckIcon />
				<span>{value}</span>
			</div>
		{/each}
	</div>

	<SectionHeading title="Requirements">
		Flexible on the details, but ideally within these parameters.
	</SectionHeading>
	<div class="requirements">
		{#each requirements as { lbl, desc }, i}
			<div class="req-item" use:reveal style={`--reveal-delay: ${i * 60}ms`}>
				<span class="req-label">{lbl}</span>
				<span class="req-desc">{desc}</span>
			</div>
		{/each}
	</div>

	<SectionHeading title="Why me">
		Proven skills, public receipts.
	</SectionHeading>
	<div class="why" use:reveal>
		<p>
			I'm a passionate cybersecurity enthusiast with proven skills in penetration testing,
			vulnerability assessment, and security research. Check out my
			<a href="/certificates">certifications</a> and <a href="/achievements">achievements</a>
			from CTF competitions and security training programs. You can learn more about my
			background and security mindset on my <a href="/intro">intro</a> page. I actively
			participate in CTFs, bug bounties, and security challenges to continuously sharpen my
			skills. See my security research and write-ups at
			<a href="https://havocsec.dev" target="_blank" rel="noopener noreferrer">havocsec.dev</a>.
		</p>
	</div>

	<Card href="/contact" class="cta" revealDelay={0}>
		<div class="cta-body">
			<h3>Get in touch</h3>
			<p>
				Looking for a motivated junior security professional? I would love to hear from you.
				Reach out to discuss how I can contribute to your security team.
			</p>
		</div>
		<PaperPlaneIcon class="cta-icon" />
	</Card>

	<div class="explore">
		{#each navLinks as { name, url, icon }, i}
			<a href={url} class="explore-card" use:reveal style={`--reveal-delay: ${i * 70}ms`}>
				<svelte:component this={icon} />
				<span>{name}</span>
				<ArrowRightIcon class="arrow" />
			</a>
		{/each}
	</div>
</div>

<style lang="scss">
	.ideal-role {
		position: relative;
	}

	/* ============ Statement ============ */
	.statement {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		padding: var(--space-lg) var(--space-xl);
		margin-bottom: var(--space-xl);
		border-left: 3px solid var(--accent);
		border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
		background: var(--accent-transparent);

		p {
			font-size: var(--font-size-base);
			color: var(--text-color-secondary);
			line-height: var(--line-height-relaxed);

			&:first-child {
				font-size: var(--font-size-lg);
				font-weight: 500;
				color: var(--text-color);
			}
		}
	}

	/* ============ Values ============ */
	.values {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(17rem, 1fr));
		gap: var(--space-sm);
		margin-bottom: var(--space-xl);
	}

	.value-item {
		display: flex;
		align-items: flex-start;
		gap: 0.625rem;
		padding: var(--space-md);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-md);
		background: var(--surface);
		font-size: var(--font-size-sm);
		color: var(--text-color-secondary);
		line-height: var(--line-height-normal);
		transition:
			border-color var(--transition-base),
			transform var(--transition-base);

		&:hover {
			border-color: var(--border-color-accent);
			transform: translateY(-2px);
		}

		:global(svg) {
			width: 0.9rem;
			height: 0.9rem;
			color: var(--accent);
			margin-top: 0.2rem;
			flex-shrink: 0;
		}
	}

	/* ============ Requirements ============ */
	.requirements {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
		gap: var(--space-md);
		margin-bottom: var(--space-xl);
	}

	.req-item {
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
		padding: var(--space-md) var(--space-lg);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-md);
		background: var(--surface);
	}

	.req-label {
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		letter-spacing: var(--tracking-label);
		text-transform: uppercase;
		color: var(--accent);
	}

	.req-desc {
		font-size: var(--font-size-sm);
		color: var(--text-color-secondary);
		line-height: var(--line-height-normal);
	}

	/* ============ Why me ============ */
	.why {
		margin-bottom: var(--space-xl);

		p {
			font-size: var(--font-size-base);
			color: var(--text-color-secondary);
			line-height: var(--line-height-relaxed);
		}
	}

	/* ============ CTA ============ */
	:global(.cta) {
		flex-direction: row;
		align-items: center;
		gap: var(--space-lg);
	}

	.cta-body {
		h3 {
			font-size: var(--font-size-xl);
			letter-spacing: var(--tracking-tight);
			margin-bottom: 0.375rem;
		}

		p {
			font-size: var(--font-size-sm);
			color: var(--text-color-dim);
		}
	}

	:global(.cta-icon) {
		width: 2.25rem;
		height: 2.25rem;
		color: var(--accent);
		flex-shrink: 0;
		margin-left: auto;
	}

	/* ============ Explore ============ */
	.explore {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
		gap: var(--space-sm);
		margin-top: var(--space-xl);
	}

	.explore-card {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: var(--space-md);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-md);
		background: var(--surface);
		color: var(--text-color-secondary);
		text-decoration: none;
		font-size: var(--font-size-sm);
		font-weight: 500;
		transition: all var(--transition-base);

		:global(svg) {
			width: 1rem;
			height: 1rem;
			color: var(--accent);
			flex-shrink: 0;
		}

		:global(.arrow) {
			margin-left: auto;
			width: 0.75rem;
			height: 0.75rem;
			opacity: 0.5;
			transition:
				transform var(--transition-fast),
				opacity var(--transition-fast);
		}

		&:hover {
			border-color: var(--border-color-accent);
			background: var(--surface-elevated);
			color: var(--text-color);
			transform: translateY(-2px);

			:global(.arrow) {
				transform: translateX(3px);
				opacity: 1;
			}
		}
	}
</style>
