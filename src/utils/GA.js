// GA.js
import { onCLS, onFID, onLCP } from "web-vitals";
// Initialize GA
export const initGA = () => {
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "G-2D02N6G8LH"); // Replace with your GA ID
};

// Track page views
export const trackPageView = (url) => {
  try {
    if (typeof window.gtag === "function") {
      window.gtag("config", "G-2D02N6G8LH", {
        page_path: url,
      });
    }
  } catch (error) {
    console.error("Error sending data to GA:", error);
  }
};

// Track button clicks
export const trackButtonClick = (label) => {
  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", "click", {
        event_category: "button",
        event_label: label,
      });
    }
  } catch (error) {
    console.error("Error sending data to GA:", error);
  }
};

// Track form submissions
export const trackFormSubmit = (label) => {
  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", "submit", {
        event_category: "form",
        event_label: label,
      });
    }
  } catch (error) {
    console.error("Error sending data to GA:", error);
  }
};

// Track custom events
export const trackCustomEvent = (category, label, value) => {
  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", "custom_event", {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  } catch (error) {
    console.error("Error sending data to GA:", error);
  }
};

export const trackWebVitals = () => {
  function sendToGoogleAnalytics({ name, delta, value, id }) {
    if (typeof window.gtag === "function") {
      window.gtag("event", name, {
        value: delta,
        metric_id: id,
        metric_value: value,
        metric_delta: delta,
        event_category: "Web Vitals",
        non_interaction: true, // Ensures events don't impact bounce rate
      });
    }
  }

  //onCLS(sendToGoogleAnalytics);
  //onFID(sendToGoogleAnalytics);
  onLCP(sendToGoogleAnalytics);
};
