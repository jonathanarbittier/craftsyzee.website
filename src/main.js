const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector("#site-nav");

menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  nav.classList.toggle("open", !open);
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

const state = { moment: "", item: "", vibe: "" };
const stateKey = { 1: "moment", 2: "item", 3: "vibe" };
const studioSteps = [...document.querySelectorAll(".studio-step")];
const progressDots = [...document.querySelectorAll("[data-progress]")];

function showStep(stepNumber) {
  studioSteps.forEach((step) => {
    step.classList.toggle("active", Number(step.dataset.step) === stepNumber);
  });
  progressDots.forEach((dot) => {
    dot.classList.toggle("active", Number(dot.dataset.progress) <= stepNumber);
  });

  if (stepNumber === 4) {
    Object.entries(state).forEach(([key, value]) => {
      document.querySelector(`[data-summary="${key}"]`).textContent = value || "Open to ideas";
    });
  }
}

document.querySelectorAll(".studio-step[data-step] button[data-value]").forEach((button) => {
  button.addEventListener("click", () => {
    const step = Number(button.closest(".studio-step").dataset.step);
    state[stateKey[step]] = button.dataset.value;
    window.setTimeout(() => showStep(step + 1), 120);
  });
});

document.querySelectorAll("[data-moment]").forEach((card) => {
  card.addEventListener("click", () => {
    state.moment = card.dataset.moment;
    showStep(2);
  });
});

document.querySelector(".start-over").addEventListener("click", () => {
  Object.keys(state).forEach((key) => (state[key] = ""));
  showStep(1);
});

document.querySelector("#send-idea").addEventListener("click", () => {
  const occasion = document.querySelector('[name="occasion"]');
  const product = document.querySelector('[name="product"]');
  if (state.moment) occasion.value = state.moment;
  if (state.item) {
    const option = [...product.options].find((item) => item.text === state.item);
    if (option) product.value = option.value;
  }
  const theme = document.querySelector('[name="theme"]');
  if (state.vibe) theme.value = state.vibe;
});

document.querySelectorAll(".filters button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(".filters button.active").classList.remove("active");
    button.classList.add("active");
    const filter = button.dataset.filter;

    document.querySelectorAll(".gallery-piece").forEach((piece) => {
      piece.hidden = filter !== "all" && !piece.dataset.category.split(" ").includes(filter);
    });
  });
});

const deliveryChoice = document.querySelector("#delivery-choice");
const shippingField = document.querySelector(".shipping-field");
deliveryChoice.addEventListener("change", () => {
  shippingField.hidden = deliveryChoice.value !== "Shipping";
});

const form = document.querySelector("#inquiry-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const status = form.querySelector(".form-status");
  status.textContent =
    "Your request is ready. Connect this form to Craftsy Zee’s preferred inbox to begin accepting inquiries.";
});

document.querySelectorAll(".upload input").forEach((input) => {
  input.addEventListener("change", () => {
    const count = input.files.length;
    input.nextElementSibling.textContent = count
      ? `${count} ${count === 1 ? "image" : "images"} selected`
      : "＋ Choose image";
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();
