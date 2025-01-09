// HTML elementlerini seçin
const button = document.getElementById("calculate-btn");
const dayInput = document.getElementsByClassName("day")[0];
const monthInput = document.getElementsByClassName("month")[0];
const yearInput = document.getElementsByClassName("year")[0];

const responseDay = document.getElementById("response-days");
const responseMonth = document.getElementById("response-months");
const responseYear = document.getElementById("response-years");

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    calculateAge();
  }
});

// day
function validateDay(day, month, year) {
  if (!dayInput.value) {
    showError(dayInput, "This field is required");
    return false;
  } else if (day < 1 || day > 31) {
    showError(dayInput, "Must be a valid day");
    return false;
  }

  const testDate = new Date(year, month - 1, day);
  if (testDate.getDate() !== day) {
    showError(dayInput, "Must be a valid day");
    return false;
  }

  clearError(dayInput);
  return true;
}

// month
function validateMonth(month) {
  if (!monthInput.value) {
    showError(monthInput, "This field is required");
    return false;
  } else if (!month || month < 1 || month > 12) {
    showError(monthInput, "Must be a valid month");
    return false;
  }

  clearError(monthInput);
  return true;
}

// year
function validateYear(year) {
  const currentYear = new Date().getFullYear();
  if (!yearInput.value) {
    showError(yearInput, "This field is required");
    return false;
  } else if (!year || year < 1900 || year > currentYear) {
    showError(yearInput, "Must be a valid past year");
    return false;
  }

  clearError(yearInput);
  return true;
}

function showError(input, message) {
  const errorMsg = input.nextElementSibling;
  input.classList.add("error");
  errorMsg.textContent = message;
  errorMsg.style.display = "block";
}

function clearError(input) {
  const errorMsg = input.nextElementSibling;
  input.classList.remove("error");
  errorMsg.style.display = "none";
}

function calculateAge() {
  const dayValue = parseInt(dayInput.value);
  const monthValue = parseInt(monthInput.value);
  const yearValue = parseInt(yearInput.value);

  const isDayValid = validateDay(dayValue, monthValue, yearValue);
  const isMonthValid = validateMonth(monthValue);
  const isYearValid = validateYear(yearValue);

  if (isDayValid && isMonthValid && isYearValid) {
    const today = new Date();
    const birthDate = new Date(yearValue, monthValue - 1, dayValue);

    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    if (ageMonths < 0) {
      ageYears--;
      ageMonths += 12;
    }
    if (ageDays < 0) {
      ageMonths--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      ageDays += lastMonth.getDate();
    }

    responseYear.textContent = `${ageYears}`;
    responseYear.classList.add("number");
    responseMonth.textContent = `${ageMonths}`;
    responseMonth.classList.add("number");
    responseDay.textContent = `${ageDays}`;
    responseDay.classList.add("number");

    responseYear.classList.remove("default-text");
    responseMonth.classList.remove("default-text");
    responseDay.classList.remove("default-text");

    console.log("Age calculated!");
  }
}
