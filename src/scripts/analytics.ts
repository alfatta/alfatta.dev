type EventData = Record<string, string>;
type AnalyticsEvent = { name: string; data: EventData };
type UmamiWindow = Window & {
  umami?: { track: (name: string, data: EventData) => Promise<void> };
};

const analyticsWindow = window as UmamiWindow;
const trackerScript = document.getElementById("umami-script");
const pending: AnalyticsEvent[] = [];
let trackerFailed = false;

function track(name: string, data: EventData) {
  if (trackerFailed) return;
  if (analyticsWindow.umami) {
    void analyticsWindow.umami.track(name, data);
  } else {
    pending.push({ name, data });
  }
}

trackerScript?.addEventListener("load", () => {
  for (const { name, data } of pending.splice(0)) track(name, data);
}, { once: true });
trackerScript?.addEventListener("error", () => {
  trackerFailed = true;
  pending.length = 0;
}, { once: true });

function pageData(): EventData {
  const pagePath = window.location.pathname;
  const postSlug = pagePath.match(/^\/blog\/(.+?)\/?$/)?.[1];
  return {
    page_path: pagePath,
    page_type: postSlug ? "article" : pagePath.split("/")[1] || "home",
    ...(postSlug ? { post_slug: postSlug } : {}),
  };
}

function destination(link: HTMLAnchorElement): string {
  const url = new URL(link.href);
  // Keep destinations useful without recording mail addresses or query values.
  if (!["http:", "https:"].includes(url.protocol)) return url.protocol;
  return `${url.origin === window.location.origin ? "" : url.origin}${url.pathname}${url.hash}`;
}

function handleClick(event: MouseEvent) {
  if (event.type === "auxclick" ? event.button !== 1 : event.button !== 0) return;
  if (!(event.target instanceof Element)) return;
  const control = event.target.closest<HTMLElement>("a[href], button");
  if (!control) return;
  if (event.type === "auxclick" && !(control instanceof HTMLAnchorElement)) return;

  const articleLink = control instanceof HTMLAnchorElement && control.closest("[data-track-article]");
  const name = control.dataset.trackEvent || (articleLink ? "article_link_click" : undefined);
  if (!name) return;

  const data: EventData = {
    ...pageData(),
    location: control.closest<HTMLElement>("[data-track-location]")?.dataset.trackLocation || "article-body",
    element_id: control.dataset.trackId || (control instanceof HTMLAnchorElement ? destination(control) : control.id || control.tagName.toLowerCase()),
  };
  if (control instanceof HTMLAnchorElement) data.destination = destination(control);
  if (control.dataset.trackPostSlug) data.post_slug = control.dataset.trackPostSlug;
  if (control.dataset.trackProjectId) data.project_id = control.dataset.trackProjectId;
  if (control.dataset.trackPlatform) data.platform = control.dataset.trackPlatform;
  // Bubble after the button's own handler so this is the applied theme.
  if (name === "theme_change") data.theme = document.documentElement.dataset.theme || "light";
  track(name, data);
}

document.addEventListener("click", handleClick);
document.addEventListener("auxclick", handleClick);

if (document.readyState === "complete") {
  track("page_load", pageData());
} else {
  window.addEventListener("load", () => track("page_load", pageData()), { once: true });
}
