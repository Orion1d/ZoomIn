(() => {
  const CONTAINER_ID = "zoomin-map-container";
  let enabled = true;

  if (window.location.pathname.startsWith("/maps")) return;

  function getQuery() {
    try {
      const q = new URL(window.location.href).searchParams.get("q");
      if (q && q.trim()) return q.trim();
    } catch (_) {}
    const input = document.querySelector('input[name="q"]');
    return (input && input.value.trim()) || null;
  }

  function isLocationPage() {
    return !!(
      document.querySelector('img[src*="/maps/vt"]') ||
      document.querySelector('img[data-src*="/maps/vt"]') ||
      document.querySelector('[data-attrid*="address"]') ||
      document.querySelector('[data-attrid*="location"]') ||
      document.querySelector('a[href*="/maps/dir"]') ||
      document.querySelector('a[href*="/maps/place/"]') ||
      document.querySelector('.lu-map')
    );
  }

  function getSidebar() {
    return (
      document.querySelector("#rhs") ||
      document.querySelector(".kp-wholepage") ||
      null
    );
  }

  function createIframe(query) {
    const host = location.hostname;
    const domain = host.includes("google.")
      ? host.substring(host.indexOf("google."))
      : "google.com";
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.${domain}/maps?q=${encodeURIComponent(query)}&output=embed`;
    iframe.allow = "geolocation *; fullscreen *; clipboard-write";
    iframe.setAttribute("loading", "lazy");
    iframe.setAttribute("referrerpolicy", "no-referrer-when-downgrade");
    iframe.setAttribute("aria-label", "Interactive map");
    iframe.style.cssText =
      "width:100%;height:300px;border:0;display:block;pointer-events:auto;border-radius:12px;";
    return iframe;
  }

  function getOrCreateContainer() {
    let el = document.getElementById(CONTAINER_ID);
    if (!el) {
      el = document.createElement("div");
      el.id = CONTAINER_ID;
      el.style.cssText = "margin:0 0 16px 0;overflow:hidden;border-radius:12px;";
    }
    return el;
  }

  function insertAtTop(container) {
    const sidebar = getSidebar();
    if (!sidebar) return false;
    if (sidebar.firstChild !== container) {
      sidebar.insertBefore(container, sidebar.firstChild);
    }
    return true;
  }

  let lastQuery = null;

  function render() {
    if (!enabled) { remove(); return; }
    if (!isLocationPage()) { remove(); return; }

    const query = getQuery();
    if (!query) { remove(); return; }

    if (query === lastQuery && document.getElementById(CONTAINER_ID)) return;

    const container = getOrCreateContainer();
    let iframe = container.querySelector("iframe");

    if (!iframe || iframe.dataset.q !== query) {
      container.innerHTML = "";
      iframe = createIframe(query);
      iframe.dataset.q = query;
      container.appendChild(iframe);
      lastQuery = query;
    }

    insertAtTop(container);
  }

  function remove() {
    const el = document.getElementById(CONTAINER_ID);
    if (el) el.remove();
    lastQuery = null;
  }

  chrome.storage.sync.get({ zoominEnabled: true }, (res) => {
    enabled = Boolean(res.zoominEnabled);
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", render);
    } else {
      render();
    }
  });

  let debounceTimer = null;
  const observer = new MutationObserver(() => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(render, 300);
  });
  observer.observe(document.documentElement, { subtree: true, childList: true });

  chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
    if (msg && msg.type === "zoomin-toggle") {
      enabled = Boolean(msg.enabled);
      enabled ? render() : remove();
      sendResponse({ success: true });
      return true;
    }
  });
})();
