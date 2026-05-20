// Local testing fallback only. Move this URL to VITE_DOWNLOAD_LOG_WEB_APP_URL in .env later.
const LOCAL_TEST_DOWNLOAD_LOG_WEB_APP_URL = "";

const envDownloadLogUrl = import.meta.env.VITE_DOWNLOAD_LOG_WEB_APP_URL || "";
const DOWNLOAD_LOG_WEB_APP_URL =
  envDownloadLogUrl || LOCAL_TEST_DOWNLOAD_LOG_WEB_APP_URL;

if (import.meta.env.DEV) {
  console.log("[downloadLogger] URL resolved", {
    hasUrl: Boolean(DOWNLOAD_LOG_WEB_APP_URL),
    source: envDownloadLogUrl ? "env" : "fallback",
    url: DOWNLOAD_LOG_WEB_APP_URL,
  });
}

// Fire-and-forget download logging. This must never block or prevent downloads.
export function logDownloadClick({ filename, email = "", ip = "", source = "" }) {
  if (import.meta.env.DEV) {
    console.log("[downloadLogger] logDownloadClick called", {
      filename,
      email,
      ip,
      source,
    });
  }

  if (!DOWNLOAD_LOG_WEB_APP_URL) {
    if (import.meta.env.DEV) {
      console.warn("[downloadLogger] disabled: missing Web App URL");
    }
    return;
  }

  const now = new Date().toISOString();
  const payload = {
    filename: filename || "",
    data_logs: now,
    timestamp: now,
    email,
    ip,
    device: navigator.userAgent,
    source,
  };

  if (import.meta.env.DEV) {
    console.log("[downloadLogger] payload", payload);
    console.log("[downloadLogger] attempting fetch", DOWNLOAD_LOG_WEB_APP_URL);
  }

  fetch(DOWNLOAD_LOG_WEB_APP_URL, {
    method: "POST",
    mode: "no-cors",
    keepalive: true,
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify(payload),
  }).catch(() => {
    // Ignore logging failures so the original download/open flow continues.
  });
}
