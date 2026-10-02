import { linkedInLink } from "./config.js";

const linkedInLinkElement = document.getElementById("linkedin-link");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.getElementById("site-nav");
const themeToggle = document.querySelector(".theme-toggle");
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const currentYear = document.getElementById("current-year");
const experienceDurations = document.querySelectorAll(
  "[data-experience-duration]",
);
const experienceCurrentMonth = document.getElementById("experience-current-month");

if (linkedInLinkElement) {
  linkedInLinkElement.href = linkedInLink;
}

menuToggle?.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute(
    "aria-label",
    isExpanded ? "Open navigation menu" : "Close navigation menu",
  );
  siteNav?.classList.toggle("is-open", !isExpanded);
});

siteNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Open navigation menu");
    siteNav.classList.remove("is-open");
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && siteNav?.classList.contains("is-open")) {
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Open navigation menu");
    siteNav.classList.remove("is-open");
    menuToggle?.focus();
  }
});

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (experienceDurations.length > 0 && experienceCurrentMonth) {
  const startDate = new Date(2021, 2, 1);
  const today = new Date();
  const elapsedMonths =
    (today.getFullYear() - startDate.getFullYear()) * 12 +
    today.getMonth() -
    startDate.getMonth();
  const years = Math.floor(elapsedMonths / 12);
  const months = elapsedMonths % 12;
  const currentMonthLabel = new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
  }).format(today);
  const durationParts = [];

  if (years > 0) {
    durationParts.push(`${years} ${years === 1 ? "year" : "years"}`);
  }

  if (months > 0) {
    durationParts.push(`${months} ${months === 1 ? "month" : "months"}`);
  }

  experienceCurrentMonth.dateTime = `${today.getFullYear()}-${String(
    today.getMonth() + 1,
  ).padStart(2, "0")}`;
  experienceCurrentMonth.textContent = currentMonthLabel;
  experienceDurations.forEach((element) => {
    element.textContent = durationParts.join(", ");
  });
}

function updateTheme(isDark) {
  document.documentElement.dataset.theme = isDark ? "dark" : "light";
  localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
  document.querySelector('meta[name="theme-color"]').content = isDark
    ? "#171411"
    : "#faf8f4";
  themeToggle?.setAttribute(
    "aria-label",
    isDark ? "Switch to light theme" : "Switch to dark theme",
  );
}

const savedTheme = localStorage.getItem("portfolio-theme");
updateTheme(savedTheme ? savedTheme === "dark" : true);

themeToggle?.addEventListener("click", () => {
  updateTheme(document.documentElement.dataset.theme !== "dark");
});

contactForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!formStatus) {
    return;
  }

  const submitButton = contactForm.querySelector('button[type="submit"]');
  const originalButtonText = submitButton?.innerHTML;
  formStatus.textContent = "Sending your message…";
  formStatus.classList.remove("is-error");

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Sending…";
  }

  try {
    const submission = Object.fromEntries(new FormData(contactForm));
    const response = await fetch(contactForm.action, {
      method: "POST",
      body: JSON.stringify(submission),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const responseText = await response.text();
    let result;

    try {
      result = JSON.parse(responseText);
    } catch {
      throw new Error(
        `Form service returned an unexpected response (HTTP ${response.status}).`,
      );
    }

    if (!response.ok || result.success === false || result.success === "false") {
      const details =
        typeof result.message === "string"
          ? result.message
          : typeof result.error === "string"
            ? result.error
            : `HTTP ${response.status}`;
      throw new Error(
        `Form service could not accept the message: ${details}`,
      );
    }

    contactForm.reset();
    formStatus.textContent =
      result.message || "Thanks — your message has been sent.";
  } catch (error) {
    console.error("Unable to send contact form:", error);
    const reason = error instanceof Error ? error.message : String(error);
    formStatus.textContent = `Your message was not saved. ${reason} Please email tejasvp87@gmail.com if the problem continues.`;
    formStatus.classList.add("is-error");
  } finally {
    if (submitButton && originalButtonText) {
      submitButton.innerHTML = originalButtonText;
      submitButton.disabled = false;
    }
  }
});
