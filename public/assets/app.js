(() => {
  'use strict';

  const conceptGrid = document.getElementById('concept-grid');
  const resourceGrid = document.getElementById('resource-grid');
  const emptyState = document.getElementById('empty-state');
  const form = document.getElementById('concept-search');
  const input = document.getElementById('search-input');

  let mesh = { concepts: [], resources: [], relations: [] };

  const escapeHtml = (value) => String(value ?? '').replace(/[&<>'"]/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  }[char]));

  function safeHttpsUrl(value) {
    try {
      const url = new URL(String(value || ''));
      return url.protocol === 'https:' ? url.href : '#';
    } catch {
      return '#';
    }
  }

  function normalize(value) {
    return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  }

  function resourcesForConcept(id) {
    return mesh.resources.filter((resource) => (resource.concepts || []).includes(id));
  }

  function renderConcepts(query = '') {
    const q = normalize(query);
    const concepts = mesh.concepts.filter((concept) => {
      if (!q) return true;
      return [concept.label, concept.description, ...(concept.domains || [])].some((part) => normalize(part).includes(q));
    });

    emptyState.hidden = concepts.length !== 0;
    conceptGrid.innerHTML = concepts.map((concept) => {
      const resources = resourcesForConcept(concept.id);
      const domains = (concept.domains || []).map((domain) => `<span class="tag">${escapeHtml(domain)}</span>`).join('');
      const action = resources[0]
        ? `<a href="${escapeHtml(safeHttpsUrl(resources[0].canonical_url))}">Ouvrir le domaine ↗</a>`
        : `<a href="https://github.com/Muse-IRS/muze-x-open-learning-commons/issues">Proposer une ressource ↗</a>`;
      return `
        <article class="concept-card" data-concept="${escapeHtml(concept.id)}">
          <div class="card-meta"><span class="tag status">${escapeHtml(concept.status)}</span>${domains}</div>
          <h3>${escapeHtml(concept.label)}</h3>
          <p>${escapeHtml(concept.description)}</p>
          <div class="card-actions">${action}<button type="button" data-focus-concept="${escapeHtml(concept.id)}">Relier</button></div>
        </article>`;
    }).join('');

    document.querySelectorAll('[data-focus-concept]').forEach((button) => {
      button.addEventListener('click', () => {
        const concept = mesh.concepts.find((item) => item.id === button.dataset.focusConcept);
        if (!concept) return;
        input.value = concept.label;
        renderConcepts(concept.label);
        renderResources(concept.id);
        window.MuzeField?.pulse('vortex');
        document.getElementById('mesh')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  function renderResources(conceptId = '') {
    const resources = conceptId ? resourcesForConcept(conceptId) : mesh.resources;
    resourceGrid.innerHTML = resources.map((resource) => {
      const concepts = (resource.concepts || []).map((id) => {
        const concept = mesh.concepts.find((item) => item.id === id);
        return `<span class="tag">${escapeHtml(concept?.label || id)}</span>`;
      }).join('');
      const href = safeHttpsUrl(resource.canonical_url);
      return `
        <article class="resource-card">
          <div class="card-meta"><span class="tag status">${escapeHtml(resource.status)}</span><span class="tag">${escapeHtml(resource.kind)}</span></div>
          <h3>${escapeHtml(resource.title)}</h3>
          <p>Provenance : ${escapeHtml(resource.provenance)}</p>
          <div class="card-meta">${concepts}</div>
          <div class="card-actions"><a href="${escapeHtml(href)}">Source originale ↗</a></div>
        </article>`;
    }).join('');
  }

  function updateStats() {
    document.getElementById('concept-count').textContent = mesh.concepts.length;
    document.getElementById('resource-count').textContent = mesh.resources.length;
    document.getElementById('relation-count').textContent = mesh.relations.length;
  }

  function applyBridgeContext() {
    const params = new URLSearchParams(window.location.search);
    const conceptId = params.get('concept');
    const domain = params.get('domain');
    const concept = mesh.concepts.find((item) => item.id === conceptId) ||
      mesh.concepts.find((item) => (item.domains || []).includes(domain));
    if (!concept) return;
    input.value = concept.label;
    renderConcepts(concept.label);
    renderResources(concept.id);
    window.MuzeField?.pulse('attract');
  }

  async function loadMesh() {
    try {
      const response = await fetch('./data/starter-mesh.json', { cache: 'no-store' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      mesh = await response.json();
      updateStats();
      renderConcepts();
      renderResources();
      applyBridgeContext();
    } catch (error) {
      conceptGrid.innerHTML = `<article class="concept-card"><span class="tag status">UNKNOWN</span><h3>Maillage indisponible</h3><p>Le fichier public n'a pas pu être chargé. La structure GitHub reste la source canonique à vérifier.</p></article>`;
      resourceGrid.innerHTML = '';
      console.error('Starter mesh load failed:', error);
    }
  }

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    renderConcepts(input.value);
    window.MuzeField?.pulse('attract');
  });

  input?.addEventListener('input', () => {
    if (!input.value) {
      renderConcepts();
      renderResources();
    }
  });

  loadMesh();
})();
