const loadGoogleAnalytics = () => {
  if (window.gtag) return;

  const script = document.createElement("script");
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-GR5WKXC84J";
  script.async = true;
  document.body.appendChild(script);

  script.onload = () => {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", "G-GR5WKXC84J", {
      anonymize_ip: true,
      allow_google_signals: true,
    });
  };
};

export default loadGoogleAnalytics;
