export function initContactLinks(): void {
  const emailTrigger = document.querySelector<HTMLButtonElement>(
    "[data-email-trigger]",
  );

  if (!emailTrigger) return;

  let cachedEmail = "";
  let resetTimer = 0;

  const setLabel = (label: string): void => {
    emailTrigger.textContent = label;
  };

  const resetLabelSoon = (): void => {
    window.clearTimeout(resetTimer);
    resetTimer = window.setTimeout(() => {
      setLabel(emailTrigger.dataset.idleLabel ?? "Email");
    }, 2000);
  };

  emailTrigger.addEventListener("click", async () => {
    try {
      setLabel(emailTrigger.dataset.loadingLabel ?? "Loading email...");

      if (!cachedEmail) {
        const response = await fetch("/contact/email", {
          headers: { accept: "application/json" },
        });

        if (!response.ok) {
          throw new Error(`Unexpected status: ${response.status}`);
        }

        const data = (await response.json()) as { email?: string };
        cachedEmail = data.email ?? "";
      }

      if (!cachedEmail) {
        throw new Error("Missing email");
      }

      await navigator.clipboard.writeText(cachedEmail);
      setLabel(emailTrigger.dataset.successLabel ?? "Copied to clipboard");
    } catch {
      setLabel(cachedEmail || "Email unavailable");
    } finally {
      resetLabelSoon();
    }
  });
}

initContactLinks();
