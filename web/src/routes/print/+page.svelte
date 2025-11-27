<script lang="ts">
  export let data: { resume: Record<string, unknown> };
  const r = data?.resume || {};
  const basics = r.basics || {};
  const education = r.education || [];
  const work = r.work || [];
  const skills = r.skills || [];
  const achievements = r.achievements || [];
  const awards = r.awards || [];
  const projects = r.projects || [];

  const fmt = (d?: string) => d || '';
  const first = (name?: string) => (name ? name.split(' ')[0] : '');
  const last = (name?: string) => (name ? name.split(' ').slice(1).join(' ') : '');
</script>

<svelte:head>
  <title>{basics.name ? `${basics.name} — CV` : 'CV'}</title>
  <meta name="robots" content="noindex" />
  <style>
    :root { --fg: #111; --muted: #555; --accent: #D64343; --light: #ffffff; --rule: #e9e9e9; }
    * { box-sizing: border-box; }
    body { background: #fff; color: var(--fg); }
    .page {
      width: 210mm; /* A4 */
      min-height: 297mm;
      margin: 0 auto;
      padding: 10mm 12mm; /* slightly tighter to encourage single-page fit */
      font: 10.8pt/1.33 system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
    }
    header { margin-bottom: 10px; }
    .headerband {
      background: var(--accent);
      color: var(--light);
      padding: 10px 12px;
      text-align: center;
    }
    .name {
      margin: 0;
      font-size: 24pt;
      font-weight: 700;
      letter-spacing: 0.3px;
    }
    .meta { color: var(--light); font-size: 10pt; display: flex; gap: 14px; flex-wrap: wrap; justify-content: center; }
    .section { margin: 10px 0 8px; }
    .section h2 { font-size: 13pt; margin: 0 0 6px; position: relative; }
    .section h2::after { content: ""; display: block; height: 2px; background: var(--rule); margin-top: 6px; }
    h3 { font-size: 12pt; margin: 4px 0 2px; }
    ul { margin: 2px 0 0 16px; }
    .row { display: flex; justify-content: space-between; gap: 8px; }
    .muted { color: var(--muted); }
    .pill { background: #f2f2f2; border-radius: 12px; padding: 2px 8px; margin: 2px; display: inline-block; font-size: 10pt; }
    .skills { display: flex; flex-wrap: wrap; gap: 4px; }
    .kv { display: inline-flex; align-items: center; gap: 6px; }
    .projrow { display: flex; justify-content: space-between; gap: 8px; }
    @media print {
      @page { size: A4; margin: 8mm; }
      body { background: #fff; }
      .page { width: auto; min-height: auto; padding: 0; }
      a { color: inherit; text-decoration: none; }
    }
  </style>
</svelte:head>

<div class="page">
  <header>
    <div class="headerband">
      <h1 class="name"><span>{first(basics.name)}</span> <span>{last(basics.name)}</span></h1>
      <div class="meta">
        {#if basics.email}<span class="kv">{basics.email}</span>{/if}
        {#if basics.location?.address}<span class="kv">{basics.location.address}</span>{/if}
        {#if basics.url}<span class="kv">{basics.url}</span>{/if}
      </div>
    </div>
  </header>

  {#if r['personal-statement']}
    <section class="section">
      <h2>Personal Statement</h2>
      <p>{r['personal-statement']}</p>
    </section>
  {/if}

  {#if work?.length}
  <section class="section">
    <h2>Experience</h2>
    {#each work as job}
      <div>
        <div class="row">
          <h3>{job.position} — {job.name}</h3>
          <div class="muted">{fmt(job.startDate)} – {fmt(job.endDate) || 'Present'}</div>
        </div>
        {#if job.highlights?.length}
          <ul>
            {#each job.highlights as h}
              <li>{h}</li>
            {/each}
          </ul>
        {/if}
      </div>
    {/each}
  </section>
  {/if}

  {#if education?.length}
  <section class="section">
    <h2>Education</h2>
    {#each education as edu}
      <div>
        <div class="row">
          <h3>{edu.studyType} in {edu.area} — {edu.institution}</h3>
          <div class="muted">{fmt(edu.startDate)} – {fmt(edu.endDate)}</div>
        </div>
        {#if edu.score}<div class="muted">Grade: {edu.score}</div>{/if}
        {#if edu.highlights?.length}
          <ul>
            {#each edu.highlights as h}
              <li>{h}</li>
            {/each}
          </ul>
        {/if}
      </div>
    {/each}
  </section>
  {/if}

  {#if skills?.length}
  <section class="section">
    <h2>Skills</h2>
    {#each skills as s}
      <div>
        <h3>{s.name}</h3>
        <div class="skills">
          {#each (s.keywords || []) as k}
            <span class="pill">{k}</span>
          {/each}
        </div>
      </div>
    {/each}
  </section>
  {/if}

  {#if achievements?.length}
  <section class="section">
    <h2>Stats</h2>
    <ul>
      {#each achievements as ach}
        <li>{ach.text || ach}</li>
      {/each}
    </ul>
  </section>
  {/if}

  {#if awards?.length}
  <section class="section">
    <h2>Awards</h2>
    <ul>
      {#each awards as a}
        <li><strong>{a.title}</strong> — {a.summary}</li>
      {/each}
    </ul>
  </section>
  {/if}

  {#if projects?.length}
  <section class="section">
    <h2>Projects</h2>
    <ul>
      {#each projects as p}
        <li>
          <div class="projrow">
            <div>
              <strong>{p.name}</strong>
              {#if p.description} — {p.description}{/if}
              {#if p.url} — {p.url}{/if}
            </div>
            {#if p.github}
              <span class="muted">github.com/{p.github}</span>
            {/if}
          </div>
        </li>
      {/each}
    </ul>
  </section>
  {/if}
</div>
