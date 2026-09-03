(() => {
  'use strict';

  const conceptGrid = document.getElementById('concept-grid');
  const resourceGrid = document.getElementById('resource-grid');
  const learningGrid = document.getElementById('learning-grid');
  const emptyState = document.getElementById('empty-state');
  const learningEmptyState = document.getElementById('learning-empty-state');
  const form = document.getElementById('concept-search');
  const input = document.getElementById('search-input');
  const learningFilterButtons = [...document.querySelectorAll('[data-learning-filter]')];

  let mesh = { concepts: [], resources: [], relations: [] };
  let learningCatalog = [];
  let learningFilter = 'all';

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
    if (!conceptGrid || !emptyState) return;
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
        if (!concept || !input) return;
        input.value = concept.label;
        renderConcepts(concept.label);
        renderLearning(concept.label);
        renderResources(concept.id);
        window.MuzeField?.pulse('vortex');
        document.getElementById('learning-field')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  function renderResources(conceptId = '') {
    if (!resourceGrid) return;
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

  function passesLearningFilter(resource) {
    if (learningFilter === 'all') return true;
    if (learningFilter === 'fr' || learningFilter === 'en') return resource.language === learningFilter;
    if (learningFilter === 'course') return String(resource.kind || '').includes('course');
    if (learningFilter === 'reference') return String(resource.kind || '').includes('reference');
    return true;
  }

  function matchesLearningQuery(resource, query) {
    const q = normalize(query);
    if (!q) return true;
    const searchable = [
      resource.title,
      resource.creator,
      resource.kind,
      resource.language,
      resource.description,
      resource.provenance,
      ...(resource.topics || [])
    ];
    return searchable.some((part) => normalize(part).includes(q));
  }

  function renderLearning(query = '') {
    if (!learningGrid || !learningEmptyState) return;
    const resources = learningCatalog.filter((resource) => passesLearningFilter(resource) && matchesLearningQuery(resource, query));
    learningEmptyState.hidden = resources.length !== 0;

    learningGrid.innerHTML = resources.map((resource) => {
      const href = safeHttpsUrl(resource.canonical_url);
      const topics = (resource.topics || []).map((topic) => `<span class="tag">${escapeHtml(topic)}</span>`).join('');
      const existence = resource.epistemic?.source_existence || 'UNKNOWN';
      const relevance = resource.epistemic?.pedagogical_relevance || 'UNKNOWN';
      return `
        <article class="learning-card">
          <div class="learning-source">
            <strong>${escapeHtml(resource.creator)}</strong>
            <span>${escapeHtml(resource.language.toUpperCase())} · ${escapeHtml(resource.kind)}</span>
          </div>
          <h3>${escapeHtml(resource.title)}</h3>
          <p>${escapeHtml(resource.description)}</p>
          <div class="learning-topics">${topics}</div>
          <p class="learning-note"><b>Accès</b> · ${escapeHtml(resource.access_note)}</p>
          <p class="learning-note"><b>Provenance</b> · ${escapeHtml(resource.provenance)} · existence ${escapeHtml(existence)} · pertinence pédagogique ${escapeHtml(relevance)}</p>
          <div class="learning-actions"><a href="${escapeHtml(href)}">Ouvrir la source originale ↗</a></div>
        </article>`;
    }).join('');
  }

  function updateStats() {
    document.getElementById('concept-count').textContent = mesh.concepts.length;
    document.getElementById('resource-count').textContent = mesh.resources.length + learningCatalog.length;
    document.getElementById('relation-count').textContent = mesh.relations.length;
  }

  function updateFilterUI() {
    learningFilterButtons.forEach((button) => {
      button.setAttribute('aria-pressed', button.dataset.learningFilter === learningFilter ? 'true' : 'false');
    });
  }

  learningFilterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      learningFilter = button.dataset.learningFilter || 'all';
      updateFilterUI();
      renderLearning(input?.value || '');
    });
  });

  function applyBridgeContext() {
    const params = new URLSearchParams(window.location.search);
    const conceptId = params.get('concept');
    const domain = params.get('domain');
    const concept = mesh.concepts.find((item) => item.id === conceptId) ||
      mesh.concepts.find((item) => (item.domains || []).includes(domain));
    if (!concept || !input) return;
    input.value = concept.label;
    renderConcepts(concept.label);
    renderLearning(concept.label);
    renderResources(concept.id);
    window.MuzeField?.pulse('attract');
  }

  async function loadJson(path) {
    const response = await fetch(path, { cache: 'no-store' });
    if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`);
    return response.json();
  }

  async function loadAll() {
    const [meshResult, catalogResult] = await Promise.allSettled([
      loadJson('./data/starter-mesh.json'),
      loadJson('./data/learning-catalog.json')
    ]);

    if (meshResult.status === 'fulfilled') {
      mesh = meshResult.value;
      renderConcepts();
      renderResources();
    } else if (conceptGrid) {
      conceptGrid.innerHTML = `<article class="concept-card"><span class="tag status">UNKNOWN</span><h3>Maillage indisponible</h3><p>Le fichier public n'a pas pu être chargé. La structure GitHub reste la source canonique à vérifier.</p></article>`;
      if (resourceGrid) resourceGrid.innerHTML = '';
      console.error('Starter mesh load failed:', meshResult.reason);
    }

    if (catalogResult.status === 'fulfilled') {
      learningCatalog = catalogResult.value.resources || [];
      renderLearning();
    } else if (learningGrid) {
      learningGrid.innerHTML = `<article class="learning-card"><div class="learning-source"><strong>Catalogue public</strong><span>UNKNOWN</span></div><h3>Champ d’apprentissage indisponible</h3><p>Le catalogue JSON n'a pas pu être chargé. Aucune ressource externe n'est déduite ou inventée.</p></article>`;
      console.error('Learning catalog load failed:', catalogResult.reason);
    }

    updateStats();
    applyBridgeContext();
  }

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const query = input?.value || '';
    renderConcepts(query);
    renderLearning(query);
    window.MuzeField?.pulse('attract');
    document.getElementById('learning-field')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  input?.addEventListener('input', () => {
    if (!input.value) {
      renderConcepts();
      renderResources();
      renderLearning();
    }
  });

  updateFilterUI();
  loadAll();
})();
