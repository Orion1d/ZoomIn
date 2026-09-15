/* global chrome */
(function () {
  const toggle = document.getElementById('toggle');
  const logo   = document.getElementById('logo');

  if (logo && chrome.runtime) {
    logo.src = chrome.runtime.getURL('icons128.png');
  }

  // Load saved state
  chrome.storage.sync.get({ zoominEnabled: true }, ({ zoominEnabled }) => {
    toggle.checked = Boolean(zoominEnabled);
  });

  // Save + broadcast on change
  toggle.addEventListener('change', () => {
    const enabled = toggle.checked;
    chrome.storage.sync.set({ zoominEnabled: enabled }, () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs && tabs[0];
        if (!tab || !tab.id) return;
        const url = tab.url || '';
        if (!url.includes('google.') || !url.includes('/search')) return;
        chrome.tabs.sendMessage(
          tab.id,
          { type: 'zoomin-toggle', enabled },
          () => { void chrome.runtime.lastError; }
        );
      });
    });
  });
})();
