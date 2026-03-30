export function initContactLinks(): void {
  const emailTrigger = document.querySelector<HTMLButtonElement>(
    "[data-email-trigger]",
  );
  const emailStatus = document.querySelector<HTMLSpanElement>(
    "[data-email-status]",
  );

  if (!emailTrigger || !emailStatus) return;

  let cachedEmail = "";
  let resetTimer = 0;
  let isPending = false;

  const setStatus = (message: string): void => {
    emailStatus.textContent = message;
    emailStatus.hidden = message.length === 0;
  };

  const resetStatusSoon = (): void => {
    window.clearTimeout(resetTimer);
    resetTimer = window.setTimeout(() => {
      setStatus("");
    }, 2000);
  };

  const loadEmail = async (): Promise<string> => {
    if (cachedEmail) return cachedEmail;

    const response = await fetch("/contact/email", {
      headers: { accept: "application/json" },
    });

    if (!response.ok) return "";

    const data = (await response.json()) as { email?: string };
    cachedEmail = typeof data.email === "string" ? data.email : "";
    return cachedEmail;
  };

  const copyEmail = async (): Promise<void> => {
    const email = await loadEmail().catch(() => "");

    if (!email) {
      setStatus(emailTrigger.dataset.errorLabel ?? "Email unavailable");
      return;
    }

    const copied = await navigator.clipboard
      .writeText(email)
      .then(() => true)
      .catch(() => false);

    if (!copied) {
      setStatus(emailTrigger.dataset.errorLabel ?? "Email unavailable");
      return;
    }

    setStatus(emailTrigger.dataset.successLabel ?? "Copied to clipboard");
  };

  emailTrigger.addEventListener("click", () => {
    if (isPending) return;

    isPending = true;
    emailTrigger.setAttribute("aria-busy", "true");

    if (!cachedEmail) {
      setStatus(emailTrigger.dataset.loadingLabel ?? "Loading email...");
    }

    void copyEmail().finally(() => {
      isPending = false;
      emailTrigger.removeAttribute("aria-busy");
      resetStatusSoon();
    });
  });
}

initContactLinks();
