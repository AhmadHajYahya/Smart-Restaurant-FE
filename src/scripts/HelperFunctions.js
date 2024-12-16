export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// ======== Data And Time Functios ==========
function getMaxDate() {
  const date = new Date();
  date.setMonth(date.getMonth() + 1);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const getCurrentDate = (offsetDays = 0) => {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const generateTimeOptions = (initialHour, initialMinutes) => {
  const times = [];
  let hour = initialHour;
  let minutes = initialMinutes;

  while (hour < 22 || (hour === 22 && minutes === 0)) {
    const time = `${String(hour).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}`;
    times.push(time);
    if (minutes === 0) {
      minutes = 30;
    } else {
      minutes = 0;
      hour = (hour + 1) % 24;
    }
  }

  return times;
};

export function initDataAndTime() {
  const now = new Date();
  let initialHour = now.getHours();
  let initialMinutes = now.getMinutes();
  let dateOffset = 0;

  // Round up to the next half hour
  if (initialMinutes < 30) {
    initialMinutes = 30;
  } else {
    initialMinutes = 0;
    initialHour = (initialHour + 1) % 24;
  }

  // If the time is past 22:00, set to next day and start from 12:00
  if (initialHour >= 22) {
    initialHour = 12;
    initialMinutes = 0;
    dateOffset = 1;
  }

  let data = {
    today: getCurrentDate(dateOffset),
    maxDate: getMaxDate(),
    timeOptions: generateTimeOptions(initialHour, initialMinutes),
    bookingDate: getCurrentDate(dateOffset),
  };

  return data;
}
// ========// Data And Time Functios //==========
