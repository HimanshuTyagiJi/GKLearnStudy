if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js') // सही पथ दें
    .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch(error => {
        console.error('Service Worker registration failed:', error);
    });
}







let deferredPrompt; // Save the event for triggering later

// Listen for the 'beforeinstallprompt' event
window.addEventListener("beforeinstallprompt", (e) => {
  // Prevent the default browser prompt
  e.preventDefault();
  deferredPrompt = e;

  // Show the custom install button
  const installButton = document.getElementById("install-btn");
  installButton.style.display = "block";

  installButton.addEventListener("click", () => {
    // Trigger the install prompt
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }
      deferredPrompt = null; // Clear the deferredPrompt variable
    });
  });
});

// Hide the install button if already installed
window.addEventListener("appinstalled", () => {
  console.log("PWA installed");
  const installButton = document.getElementById("install-btn");
  installButton.style.display = "none";
});

    })
  );
  console.log("Fetching:", event.request.url);
});
