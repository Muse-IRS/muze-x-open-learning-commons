(() => {
  'use strict';

  const panel = document.getElementById('swarm-controls');
  const hideButton = document.getElementById('swarm-controls-hide');
  const restoreButton = document.getElementById('swarm-controls-restore');

  if (!panel || !hideButton || !restoreButton) return;

  function setHidden(hidden) {
    document.body.classList.toggle('controls-hidden', hidden);
    panel.setAttribute('aria-hidden', hidden ? 'true' : 'false');
    hideButton.setAttribute('aria-expanded', hidden ? 'false' : 'true');
    restoreButton.hidden = !hidden;
    if (!hidden) {
      requestAnimationFrame(() => hideButton.focus({ preventScroll: true }));
    }
  }

  hideButton.addEventListener('click', () => setHidden(true));
  restoreButton.addEventListener('click', () => setHidden(false));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !document.body.classList.contains('controls-hidden')) {
      setHidden(true);
    }
  });
})();
