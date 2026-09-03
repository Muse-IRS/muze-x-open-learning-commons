(() => {
  'use strict';

  const drawer = document.getElementById('swarm-controls');
  const openButton = document.getElementById('swarm-controls-open');
  const closeButton = document.getElementById('swarm-controls-close');

  if (!drawer || !openButton || !closeButton) return;

  function setOpen(open) {
    document.body.classList.toggle('drawer-open', open);
    drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
    openButton.setAttribute('aria-expanded', open ? 'true' : 'false');

    if (open) {
      requestAnimationFrame(() => closeButton.focus({ preventScroll: true }));
    } else {
      requestAnimationFrame(() => openButton.focus({ preventScroll: true }));
    }
  }

  openButton.addEventListener('click', () => setOpen(true));
  closeButton.addEventListener('click', () => setOpen(false));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && document.body.classList.contains('drawer-open')) {
      setOpen(false);
    }
  });
})();
