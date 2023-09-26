///////////////////////////////////////////////////////////
// Menu

((document) => {
  const $btnMenu = document.querySelector(".menu-btn"),
    $menu = document.querySelector(".menu");

  $btnMenu.addEventListener("click", (e) => {
    $btnMenu.firstElementChild.classList.toggle("none");
    $btnMenu.lastElementChild.classList.toggle("none");
    $menu.classList.toggle("is-active");
  });

  document.addEventListener("click", (e) => {
    if (!e.target.matches(".menu a")) return false;

    $btnMenu.firstElementChild.classList.remove("none");
    $btnMenu.lastElementChild.classList.add("none");
    $menu.classList.remove("is-active");
  });
})(document);

///////////////////////////////////////////////////////////
// Carrousel

let currentSlide = 0;
const carouselTrack = document.querySelector(".carousel-track");
const dots = document.querySelectorAll(".dot");
let touchStartX = 0;

function goToSlide(slideIndex) {
  currentSlide = slideIndex;
  const translateXValue = `-${currentSlide * 100}%`;
  carouselTrack.style.transform = `translateX(${translateXValue})`;

  dots.forEach((dot, index) => {
    dot.classList.toggle("dot--fill", index === currentSlide);
  });
}

function handleTouchStart(e) {
  touchStartX = e.touches[0].clientX;
}

function handleTouchMove(e) {
  if (touchStartX - e.touches[0].clientX > 100) {
    currentSlide = (currentSlide + 1) % dots.length;
    goToSlide(currentSlide);
  } else if (e.touches[0].clientX - touchStartX > 100) {
    currentSlide = (currentSlide - 1) % dots.length;
    goToSlide(currentSlide);
  }
}

carouselTrack.addEventListener("touchstart", handleTouchStart);
carouselTrack.addEventListener("touchmove", handleTouchMove);

function keyboard() {
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") {
      currentSlide = (currentSlide + 1) % dots.length;
      goToSlide(currentSlide);
    } else if (e.key === "ArrowLeft") {
      currentSlide = (currentSlide - 1 + dots.length) % dots.length;
      goToSlide(currentSlide);
    }
  });
}

keyboard();

///////////////////////////////////////////////////////////
// Text line

const textLine = document.querySelector(".text-line");

///////////////////////////////////////////////////////////
// Form

document.addEventListener("DOMContentLoaded", function () {
  // Object to store form input values
  const email = {
    email: "",
    subject: "",
    message: "",
  };

  // Select form elements
  const form = document.querySelector("#form");
  const inputEmail = document.querySelector("#email");
  const inputSubject = document.querySelector("#subject");
  const inputMessage = document.querySelector("#message");
  const btnSubmit = document.querySelector('button[type="submit"]');

  // Additional elements for the spinner
  const btnReset = document.querySelector('button[type="reset"]');
  const spinner = document.querySelector("#spinner");

  // Listen for input events on form fields
  inputEmail.addEventListener("input", validate);
  inputSubject.addEventListener("input", validate);
  inputMessage.addEventListener("input", validate);

  // Listen for form submission event
  form.addEventListener("submit", sendEmail);

  // Listen for form reset event
  btnReset.addEventListener("click", function (e) {
    e.preventDefault();
    resetForm();
  });

  // Function to send simulated email
  function sendEmail(e) {
    e.preventDefault();

    // Display spinner during simulated sending
    spinner.classList.remove("spinner");

    setTimeout(() => {
      spinner.classList.add("spinner");

      resetForm();

      // Show a temporary success message
      const successAlert = document.createElement("p");
      successAlert.classList.add("success");
      successAlert.textContent = "Message sent successfully";

      form.appendChild(successAlert);

      setTimeout(() => {
        successAlert.remove();
      }, 3000);
    }, 3000);
  }

  // Function to validate input fields
  function validate(e) {
    if (e.target.value.trim() === "") {
      showAlert(
        `The input ${e.target.id} is mandatory`,
        e.target.parentElement
      );
      email[e.target.name] = "";
      confirmEmail();
      return;
    }

    if (e.target.id === "email" && !validateEmail(e.target.value)) {
      showAlert("Invalid email", e.target.parentElement);
      email[e.target.name] = "";
      confirmEmail();
      return;
    }

    clearAlert(e.target.parentElement);

    email[e.target.name] = e.target.value.trim().toLowerCase();

    confirmEmail();
  }

  // Function to display alert messages
  function showAlert(message, reference) {
    clearAlert(reference);
    const error = document.createElement("p");
    error.textContent = message;
    error.classList.add("alert");
    reference.appendChild(error);
  }

  // Function to remove alert messages
  function clearAlert(reference) {
    const alert = reference.querySelector(".alert");
    if (alert) {
      alert.remove();
    }
  }

  // Function to validate an email with a regular expression
  function validateEmail(email) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const result = regex.test(email);
    return result;
  }

  // Function to enable or disable the submit button based on form validit
  function confirmEmail() {
    if (Object.values(email).includes("")) {
      btnSubmit.classList.add("opacity");
      btnSubmit.disabled = true;
      return;
    }
    btnSubmit.classList.remove("opacity");
    btnSubmit.disabled = false;
  }

  // Function to reset the form
  function resetForm() {
    email.email = "";
    email.subject = "";
    email.message = "";

    form.reset();
    confirmEmail();
  }
});

///////////////////////////////////////////////////////////
// Copy Date

const copyDate = document.querySelector(".copy-date");
const currentYear = new Date().getFullYear();
copyDate.textContent = currentYear;

///////////////////////////////////////////////////////////
// Reveal Sections

const allSections = document.querySelectorAll(".section");

// Variables for counter and visibility status
let isCustomerSectionVisible = false;
let proyectsDoneCounter = 0;
let customersDoneCounter = 0;
let serviceDoneCounter = 0;
let teamDoneCounter = 0;

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section-hidden");

  // Verify if "Customers" section became visible
  if (entry.target.classList.contains("customers")) {
    isCustomerSectionVisible = true;

    // Starts the iteration if "Customers" section is visible
    iterateProyectsDone();
    iterateCustomersHappy();
    iterateServiceGuarantee();
    iterateTeamExperts();
  }
};

function iterateProyectsDone() {
  const proyectsDone = document.querySelector(".proyects-done");
  const proyectsIterator = 25;

  if (proyectsDone && proyectsDoneCounter <= proyectsIterator) {
    setTimeout(() => {
      proyectsDone.textContent = proyectsDoneCounter;
      proyectsDoneCounter++;
      // Continue the iteration
      iterateProyectsDone();
    }, 100);
  }
}

function iterateCustomersHappy() {
  const customersHappy = document.querySelector(".customers-happy");
  const customersIterator = 40;

  if (customersHappy && customersDoneCounter <= customersIterator) {
    setTimeout(() => {
      customersHappy.textContent = customersDoneCounter;
      customersDoneCounter++;
      // Continue the iteration
      iterateCustomersHappy();
    }, 100);
  }
}

function iterateServiceGuarantee() {
  const serviceGuarantee = document.querySelector(".service-guarantee");
  const serviceIterator = 6;

  if (serviceGuarantee && serviceDoneCounter <= serviceIterator) {
    setTimeout(() => {
      serviceGuarantee.textContent = serviceDoneCounter;
      serviceDoneCounter++;
      // Continue the iteration
      iterateServiceGuarantee();
    }, 100);
  }
}

function iterateTeamExperts() {
  const teamExperts = document.querySelector(".team-experts");
  const teamIterator = 10;

  if (teamExperts && teamDoneCounter <= teamIterator) {
    setTimeout(() => {
      teamExperts.textContent = teamDoneCounter;
      teamDoneCounter++;
      // Continue the iteration
      iterateTeamExperts();
    }, 100);
  }
}

const THRESHOLD = 0.15;
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: THRESHOLD,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section-hidden");
});

///////////////////////////////////////////////////////////
// Translator

document.addEventListener("DOMContentLoaded", function () {
  let translatorButton = document.querySelector(".translator");
  const translateElements = document.querySelectorAll(".translate");
  let currentLang = "en";

  async function toggleLanguage() {
    try {
      currentLang = currentLang === "en" ? "es" : "en";

      const currentTextButton = translatorButton.textContent.trim();
      const newText = currentTextButton === "Es" ? "En" : "Es";
      translatorButton.textContent = newText;

      const response = await fetch("translations.json");
      const translations = await response.json();

      translateElements.forEach(function (element) {
        const key = element.getAttribute("data-translate");
        if (translations[currentLang] && translations[currentLang][key]) {
          element.textContent = translations[currentLang][key];
        }
      });
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  translatorButton.addEventListener("click", toggleLanguage);
});
