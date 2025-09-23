import "https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.1.0/dist/cookieconsent.umd.js";

// Function to load Tawk.to script
function loadTawkto() {
  var Tawk_API = Tawk_API || {},
    Tawk_LoadStart = new Date();
  (function () {
    var s1 = document.createElement("script"),
      s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = "https://embed.tawk.to/67e28588064bbb190ce83a18/1in6dj7u7";
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");
    s0.parentNode.insertBefore(s1, s0);
  })();

  window.Tawk_API.start();
}

// Function to unload Tawk.to when functionality cookies are rejected
function unloadTawkto() {
  window.Tawk_API.shutdown();
}

// Function to delete all functionality cookies
function deleteFunctionalityCookies() {
  document.cookie.split(";").forEach((cookieName) => {
    if (cookieName !== "cc_cookie" && !cookieName.includes("necessary")) {
      document.cookie =
        cookieName + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;";
      console.log("Deleted functionality cookie:", cookieName);
    }
  });

  console.log("Functionality cookies deleted.");
}

// Initialize CookieConsent with proper preference handling
CookieConsent.run({
  guiOptions: {
    consentModal: {
      layout: "box inline",
      position: "bottom right",
      equalWeightButtons: true,
      flipButtons: false,
    },
    preferencesModal: {
      layout: "bar wide",
      position: "right",
      equalWeightButtons: true,
      flipButtons: true,
    },
  },
  categories: {
    necessary: {
      readOnly: true,
    },
    functionality: {
      enabled: true, // Enable functionality cookies management
      services: {
        tawkto: {
          label: "Tawk.to Live Chat",
          description: "Provides real-time chat support.",
          onAccept: function () {
            loadTawkto(); // Load Tawk.to when accepted
            console.log("Tawk.to enabled.");
          },
          onReject: function () {
            unloadTawkto(); // Unload Tawk.to when rejected
            deleteFunctionalityCookies(); // Delete cookies
            console.log("Tawk.to disabled.");
          },
        },
      },
    },
  },
  language: {
    default: "en",
    autoDetect: "browser",
    translations: {
      en: {
        consentModal: {
          title: "Hello traveller, it's cookie time! 🍪",
          description:
            "We use cookies to provide essential functionality and enable services like live chat (Tawk.to). Some cookies are set by third-party providers, and you can manage your preferences below.",
          acceptAllBtn: "Accept all",
          acceptNecessaryBtn: "Reject all",
          showPreferencesBtn: "Manage preferences",
          footer:
            '<a href="privacy-policy.html">Privacy Policy</a>\n<a href="terms-and-conditions.html">Terms and conditions</a>',
        },
        preferencesModal: {
          title: "Consent Preferences Center",
          acceptAllBtn: "Accept all",
          acceptNecessaryBtn: "Reject all",
          savePreferencesBtn: "Save preferences",
          closeIconLabel: "Close modal",
          serviceCounterLabel: "Service|Services",
          sections: [
            {
              title: "Cookie Usage",
              description:
                "We use cookies to provide essential functionality and enable services like live chat (Tawk.to).",
            },
            {
              title:
                'Strictly Necessary Cookies <span class="pm__badge">Always Enabled</span>',
              description:
                "These cookies ensure the core functions of the website work properly.",
              linkedCategory: "necessary",
            },
            {
              title: "Functionality Cookies",
              description:
                "Enable additional features such as live chat (Tawk.to).",
              linkedCategory: "functionality",
            },
            {
              title: "More information",
              description:
                'For any query in relation to our policy on cookies, please <a class="cc__link" href="contact.html">contact us</a>.',
            },
          ],
        },
      },
    },
  },
  disablePageInteraction: true,
});
