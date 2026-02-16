// Life Calendar Script - Modern & Elegant

// Translation dictionary
const translations = {
  en: {
    title: "Life Calendar",
    person1: "Person 1",
    person2: "Person 2",
    name: "Name",
    birthDate: "Birth Date",
    gender: "Biological Sex",
    show: "Show",
    relationship: "Relationship",
    whenWeMet: "When We Met",
    showWhenWeMet: 'Show "When We Met" Date',
    generateCalendar: "Generate Calendar",
    preBirth: "Pre-Birth",
    person1Only: "Person 1 Only",
    person2Only: "Person 2 Only",
    bothBeforeMeeting: "Both People (Before Meeting)",
    timeTogether: "Time Together",
    saveImage: "Save as Image",
    createdOn: "Life Calendar Visualization — Created on",
    inspiredBy: 'Inspired by Tim Urban\'s <a href="https://waitbutwhy.com/2014/05/life-weeks.html" target="_blank">Life Calendar</a>',
    toggleDark: "Toggle Dark Mode",
    toggleLang: "한국어",
    male: "Male",
    female: "Female"
  },
  ko: {
    title: "인생 달력",
    person1: "사람 1",
    person2: "사람 2",
    name: "이름",
    birthDate: "생일",
    gender: "성별",
    show: "보이기",
    relationship: "관계",
    whenWeMet: "만난 날짜",
    showWhenWeMet: "만난 날짜 보이기",
    generateCalendar: "달력 생성",
    preBirth: "출생 전",
    person1Only: "사람 1만",
    person2Only: "사람 2만",
    bothBeforeMeeting: "두 사람 모두 (만나기 전)",
    timeTogether: "함께한 시간",
    saveImage: "이미지로 저장",
    createdOn: "인생 달력 시각화 — 생성일:",
    inspiredBy: '팀 어반의 <a href="https://waitbutwhy.com/2014/05/life-weeks.html" target="_blank">인생 달력</a>에서 영감을 받음',
    toggleDark: "다크 모드",
    toggleLang: "English",
    male: "남성",
    female: "여성"
  }
};

// Cohort Life Expectancy Data (US Social Security Administration - Table 11)
const cohortLifeExpectancyData = {
  male: {
    1900: [51.52, 39.32, 16.34, 13.46, 10.98, 1.97],
    1901: [52.88, 39.49, 16.39, 13.53, 11.03, 1.96],
    1902: [53.34, 39.65, 16.43, 13.60, 11.10, 1.93],
    1903: [53.86, 39.80, 16.49, 13.66, 11.17, 1.92],
    1904: [53.84, 39.95, 16.56, 13.74, 11.23, 1.91],
    1905: [53.96, 40.11, 16.63, 13.81, 11.29, 1.90],
    1906: [54.16, 40.27, 16.72, 13.89, 11.34, 1.89],
    1907: [54.87, 40.44, 16.81, 13.97, 11.38, 1.89],
    1908: [55.46, 40.60, 16.90, 14.05, 11.43, 1.89],
    1909: [56.07, 40.76, 17.01, 14.14, 11.49, 1.90],
    1910: [56.19, 40.91, 17.12, 14.23, 11.54, 1.90],
    1920: [61.77, 42.82, 18.41, 15.21, 12.31, 2.02],
    1930: [66.09, 44.35, 19.51, 16.13, 13.02, 2.16],
    1940: [69.55, 46.09, 20.56, 16.95, 13.64, 2.30],
    1950: [72.45, 47.18, 21.36, 17.62, 14.21, 2.45],
    1960: [73.88, 48.13, 22.06, 18.24, 14.75, 2.59],
    1970: [75.80, 49.22, 22.71, 18.82, 15.27, 2.74],
    1980: [77.60, 50.09, 23.33, 19.38, 15.76, 2.89],
    1990: [78.90, 50.90, 23.92, 19.91, 16.24, 3.03],
    2000: [80.01, 51.66, 24.48, 20.42, 16.69, 3.18],
    2010: [80.96, 52.38, 25.02, 20.91, 17.13, 3.33],
    2020: [81.80, 53.07, 25.53, 21.37, 17.55, 3.47],
    2030: [82.57, 53.71, 26.02, 21.82, 17.95, 3.61],
    2040: [83.30, 54.32, 26.49, 22.26, 18.34, 3.75],
    2050: [83.98, 54.91, 26.95, 22.67, 18.72, 3.89],
    2060: [84.63, 55.46, 27.38, 23.08, 19.09, 4.03],
    2070: [85.24, 56.00, 27.80, 23.47, 19.45, 4.17],
    2080: [85.82, 56.51, 28.21, 23.85, 19.80, 4.31],
    2090: [86.37, 57.00, 28.61, 24.22, 20.13, 4.44],
    2100: [86.90, 57.47, 28.99, 24.57, 20.46, 4.54]
  },
  female: {
    1900: [58.28, 45.75, 21.58, 18.03, 14.72, 2.25],
    1901: [59.71, 46.03, 21.71, 18.16, 14.82, 2.24],
    1902: [60.28, 46.32, 21.83, 18.28, 14.90, 2.22],
    1903: [60.94, 46.60, 21.95, 18.38, 14.98, 2.20],
    1904: [61.08, 46.86, 22.06, 18.46, 15.04, 2.19],
    1905: [61.30, 47.09, 22.15, 18.52, 15.09, 2.18],
    1906: [61.57, 47.30, 22.21, 18.57, 15.11, 2.18],
    1907: [62.27, 47.48, 22.27, 18.61, 15.12, 2.18],
    1908: [62.89, 47.64, 22.31, 18.65, 15.13, 2.18],
    1909: [63.51, 47.77, 22.35, 18.68, 15.14, 2.19],
    1910: [63.71, 47.88, 22.39, 18.69, 15.14, 2.19],
    1920: [69.22, 48.93, 22.67, 18.84, 15.25, 2.32],
    1930: [72.85, 49.71, 23.06, 19.16, 15.51, 2.48],
    1940: [75.75, 50.79, 23.63, 19.66, 15.99, 2.64],
    1950: [78.46, 51.75, 24.28, 20.27, 16.54, 2.80],
    1960: [79.58, 52.46, 24.94, 20.87, 17.09, 2.97],
    1970: [80.91, 53.22, 25.55, 21.43, 17.60, 3.13],
    1980: [82.27, 53.93, 26.14, 21.97, 18.09, 3.29],
    1990: [83.30, 54.61, 26.69, 22.48, 18.56, 3.45],
    2000: [84.19, 55.26, 27.22, 22.97, 19.00, 3.61],
    2010: [84.96, 55.87, 27.72, 23.43, 19.42, 3.76],
    2020: [85.65, 56.44, 28.19, 23.87, 19.83, 3.92],
    2030: [86.29, 56.99, 28.65, 24.30, 20.22, 4.07],
    2040: [86.89, 57.52, 29.09, 24.71, 20.60, 4.22],
    2050: [87.46, 58.02, 29.51, 25.10, 20.96, 4.37],
    2060: [88.00, 58.50, 29.91, 25.48, 21.31, 4.51],
    2070: [88.51, 58.96, 30.30, 25.84, 21.65, 4.66],
    2080: [89.00, 59.40, 30.68, 26.20, 21.98, 4.80],
    2090: [89.47, 59.83, 31.05, 26.54, 22.30, 4.94],
    2100: [89.91, 60.24, 31.39, 26.87, 22.61, 5.03]
  }
};

let currentLanguage = "en";

// Helper function to get the closest available birth year in our data
function getClosestBirthYear(year) {
  const availableYears = Object.keys(cohortLifeExpectancyData.male)
    .map(y => parseInt(y))
    .sort((a, b) => a - b);

  let closestYear = availableYears[0];
  let minDiff = Math.abs(year - closestYear);

  for (let i = 1; i < availableYears.length; i++) {
    const diff = Math.abs(year - availableYears[i]);
    if (diff < minDiff) {
      minDiff = diff;
      closestYear = availableYears[i];
    }
  }

  return closestYear;
}

// Function to get life expectancy based on birth year, current age, and sex
function getLifeExpectancy(birthYear, currentAgeYears, sex) {
  const closestBirthYear = getClosestBirthYear(birthYear);
  const data = cohortLifeExpectancyData[sex][closestBirthYear];

  if (!data) {
    return sex === 'male' ? 76 : 81;
  }

  const agePoints = [0, 30, 60, 65, 70, 100];
  const exactAgeIndex = agePoints.indexOf(currentAgeYears);

  if (exactAgeIndex !== -1) {
    if (exactAgeIndex === 0) {
      return data[0];
    } else {
      return currentAgeYears + data[exactAgeIndex];
    }
  }

  let lowerIndex = 0;
  for (let i = 0; i < agePoints.length; i++) {
    if (agePoints[i] <= currentAgeYears && (i === agePoints.length - 1 || agePoints[i + 1] > currentAgeYears)) {
      lowerIndex = i;
      break;
    }
  }

  if (lowerIndex === agePoints.length - 1) {
    return currentAgeYears + data[lowerIndex];
  }

  const upperIndex = lowerIndex + 1;
  const lowerAge = agePoints[lowerIndex];
  const upperAge = agePoints[upperIndex];
  const proportion = (currentAgeYears - lowerAge) / (upperAge - lowerAge);

  const lowerRemainingYears = data[lowerIndex];
  const upperRemainingYears = data[upperIndex];

  if (lowerIndex === 0) {
    const remainingYearsAtLowerAge = lowerRemainingYears - lowerAge;
    const remainingYearsAtUpperAge = upperRemainingYears;
    const interpolatedRemainingYears = remainingYearsAtLowerAge - proportion * (remainingYearsAtLowerAge - remainingYearsAtUpperAge);
    return currentAgeYears + interpolatedRemainingYears;
  } else {
    const interpolatedRemainingYears = lowerRemainingYears - proportion * (lowerRemainingYears - upperRemainingYears);
    return currentAgeYears + interpolatedRemainingYears;
  }
}

// Update UI language texts
function updateLanguageUI() {
  const t = translations[currentLanguage];

  document.getElementById("main-title").textContent = t.title;
  document.getElementById("toggle-dark").textContent = t.toggleDark;
  document.getElementById("toggle-lang").textContent = t.toggleLang;
  document.getElementById("person1-title").textContent = t.person1;
  document.getElementById("person2-title").textContent = t.person2;
  document.getElementById("label-name1").textContent = t.name;
  document.getElementById("label-birthdate1").textContent = t.birthDate;
  document.getElementById("label-gender1").textContent = t.gender;
  document.getElementById("label-show-person1").textContent = t.show;
  document.getElementById("label-name2").textContent = t.name;
  document.getElementById("label-birthdate2").textContent = t.birthDate;
  document.getElementById("label-gender2").textContent = t.gender;
  document.getElementById("label-show-person2").textContent = t.show;
  document.getElementById("relationship-title").textContent = t.relationship;
  document.getElementById("label-met-date").textContent = t.whenWeMet;
  document.getElementById("label-show-met-date").textContent = t.showWhenWeMet;
  document.getElementById("generate").textContent = t.generateCalendar;
  document.getElementById("legend-prebirth").textContent = t.preBirth;
  document.getElementById("person1-legend").textContent = t.person1Only;
  document.getElementById("person2-legend").textContent = t.person2Only;
  document.getElementById("legend-both").textContent = t.bothBeforeMeeting;
  document.getElementById("legend-together").textContent = t.timeTogether;
  document.getElementById("screenshot").textContent = t.saveImage;
  document.getElementById("footer-created").innerHTML = `${t.createdOn} <span id="creation-date"></span>`;
  document.getElementById("footer-inspired").innerHTML = t.inspiredBy;

  // Update date
  document.getElementById("creation-date").textContent = formatDate(new Date(), true);

  // Update gender options
  [document.getElementById("gender1"), document.getElementById("gender2")].forEach(select => {
    Array.from(select.options).forEach(option => {
      option.textContent = option.value === "male" ? t.male : t.female;
    });
  });
}

// Helper function to format dates
function formatDate(date, includeYear = false) {
  const day = date.getDate();
  const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const month = monthNames[date.getMonth()];
  return includeYear ? `${day}${month}${date.getFullYear()}` : `${day}${month}`;
}

// Generate Calendar Function
function generateCalendar() {
  const showPerson1 = document.getElementById('show-person1').checked;
  const showPerson2 = document.getElementById('show-person2').checked;
  const showMetDate = document.getElementById('show-met-date').checked;

  if (!showPerson1 && !showPerson2) {
    alert('Please check at least one person to display');
    return;
  }

  const name1 = document.getElementById('name1').value || translations[currentLanguage].person1;
  const name2 = document.getElementById('name2').value || translations[currentLanguage].person2;

  const gender1 = document.getElementById('gender1').value;
  const birthdate1String = document.getElementById('birthdate1').value;
  const birthdate1 = showPerson1 ? new Date(birthdate1String) : null;

  const gender2 = document.getElementById('gender2').value;
  const birthdate2String = document.getElementById('birthdate2').value;
  const birthdate2 = showPerson2 ? new Date(birthdate2String) : null;

  const metDateString = document.getElementById('met-date').value;
  const metDate = showMetDate && metDateString ? new Date(metDateString) : null;

  if (showPerson1 && !birthdate1String) {
    alert('Please enter a birth date for ' + name1);
    return;
  }
  if (showPerson2 && !birthdate2String) {
    alert('Please enter a birth date for ' + name2);
    return;
  }
  if (showMetDate && !metDateString) {
    alert('Please enter a date for "When We Met"');
    return;
  }
  if (showMetDate && showPerson1 && showPerson2) {
    if (metDate < birthdate1 || metDate < birthdate2) {
      alert('The "When We Met" date must be after both birth dates');
      return;
    }
  }

  const today = new Date();
  const calendarEl = document.getElementById('calendar');
  calendarEl.innerHTML = '';

  let oldestBirthdate = null;
  if (showPerson1 && showPerson2) {
    oldestBirthdate = birthdate1 < birthdate2 ? birthdate1 : birthdate2;
  } else if (showPerson1) {
    oldestBirthdate = birthdate1;
  } else {
    oldestBirthdate = birthdate2;
  }

  const startDate = new Date(oldestBirthdate.getFullYear(), 0, 1);

  const getBirthWeek = (birthdate) => {
    const diffTime = birthdate - startDate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return Math.floor(diffDays / 7);
  };

  const birthWeek1 = showPerson1 ? getBirthWeek(birthdate1) : null;
  const birthWeek2 = showPerson2 ? getBirthWeek(birthdate2) : null;
  const metWeek = metDate ? getBirthWeek(metDate) : null;

  const currentTime = today - startDate;
  const currentDays = currentTime / (1000 * 60 * 60 * 24);
  const currentWeek = Math.floor(currentDays / 7);

  const getCurrentAgeYears = (birthdate) => {
    if (!birthdate) return 0;
    const ageDate = new Date(today - birthdate);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const currentAge1Years = showPerson1 ? getCurrentAgeYears(birthdate1) : 0;
  const currentAge2Years = showPerson2 ? getCurrentAgeYears(birthdate2) : 0;

  let lifeExpectancy1 = 0;
  let lifeExpectancy2 = 0;

  if (showPerson1) {
    lifeExpectancy1 = getLifeExpectancy(birthdate1.getFullYear(), currentAge1Years, gender1);
  }
  if (showPerson2) {
    lifeExpectancy2 = getLifeExpectancy(birthdate2.getFullYear(), currentAge2Years, gender2);
  }

  const getLifeExpectancyWeek = (birthWeek, lifeExpectancyYears) => {
    return birthWeek + (lifeExpectancyYears * 52);
  };

  let lifeExpectancyWeek1 = 0;
  let lifeExpectancyWeek2 = 0;

  if (showPerson1) {
    lifeExpectancyWeek1 = getLifeExpectancyWeek(birthWeek1, lifeExpectancy1);
  }
  if (showPerson2) {
    lifeExpectancyWeek2 = getLifeExpectancyWeek(birthWeek2, lifeExpectancy2);
  }

  const monthGroups = [4, 4, 5, 4, 4, 5, 4, 5, 4, 4, 5, 4];

  const endWeek = Math.max(
    lifeExpectancyWeek1 + (10 * 52),
    lifeExpectancyWeek2 + (10 * 52)
  );

  const calculateAge = (birthWeek, currentWeek) => {
    if (birthWeek === null || currentWeek < birthWeek) {
      return "Not born yet";
    }
    const weeksLived = currentWeek - birthWeek;
    const yearsLived = Math.floor(weeksLived / 52);
    const remainingWeeks = weeksLived % 52;
    return `${yearsLived} years, ${remainingWeeks} weeks`;
  };

  const calculateTimeSpentTogether = (weekNumber) => {
    if (!metWeek || weekNumber < metWeek) {
      return null;
    }
    const weeksSpentTogether = weekNumber - metWeek;
    const yearsSpentTogether = Math.floor(weeksSpentTogether / 52);
    const remainingWeeksTogether = weeksSpentTogether % 52;
    return `${yearsSpentTogether} years, ${remainingWeeksTogether} weeks`;
  };

  let totalWeekCounter = 0;
  for (let year = 0; year < 150; year++) {
    const calendarYear = startDate.getFullYear() + year;
    const yearRow = document.createElement('div');
    yearRow.className = 'year-row';

    const yearLabel = document.createElement('div');
    yearLabel.className = 'year-label';
    yearLabel.textContent = calendarYear;
    yearRow.appendChild(yearLabel);

    for (let month = 0; month < monthGroups.length; month++) {
      const monthGroup = document.createElement('div');
      monthGroup.className = 'month-group';

      for (let w = 0; w < monthGroups[month]; w++) {
        const weekDiv = document.createElement('div');
        weekDiv.className = 'week';

        const isPastCurrentDate = totalWeekCounter < currentWeek;
        const isCurrentWeek = totalWeekCounter === currentWeek;
        const isPerson1Born = showPerson1 && totalWeekCounter >= birthWeek1;
        const isPerson2Born = showPerson2 && totalWeekCounter >= birthWeek2;
        const isPerson1Dead = showPerson1 && totalWeekCounter >= lifeExpectancyWeek1;
        const isPerson2Dead = showPerson2 && totalWeekCounter >= lifeExpectancyWeek2;
        const haveMetByThisWeek = metWeek && totalWeekCounter >= metWeek;

        const dateOfWeek = new Date(startDate.getTime() + totalWeekCounter * 7 * 24 * 60 * 60 * 1000);
        const monthName = dateOfWeek.toLocaleString('default', { month: 'short' });
        const yearOfWeek = dateOfWeek.getFullYear();
        let tooltipContent = `Date: ${monthName} ${dateOfWeek.getDate()}, ${yearOfWeek}`;

        if (showPerson1) {
          const person1Age = calculateAge(birthWeek1, totalWeekCounter);
          tooltipContent += `\n${name1}: ${person1Age}`;
          if (isPerson1Dead && totalWeekCounter >= lifeExpectancyWeek1) {
            tooltipContent += " (Expected death)";
          }
        }
        if (showPerson2) {
          const person2Age = calculateAge(birthWeek2, totalWeekCounter);
          tooltipContent += `\n${name2}: ${person2Age}`;
          if (isPerson2Dead && totalWeekCounter >= lifeExpectancyWeek2) {
            tooltipContent += " (Expected death)";
          }
        }
        if (showPerson1 && showPerson2 && isPerson1Born && isPerson2Born && haveMetByThisWeek) {
          const timeSpentTogether = calculateTimeSpentTogether(totalWeekCounter);
          if (timeSpentTogether && !isPerson1Dead && !isPerson2Dead) {
            tooltipContent += `\nTogether for: ${timeSpentTogether}`;
          }
        }

        if (isCurrentWeek) {
          if (isPerson1Born && !isPerson2Born) {
            weekDiv.classList.add('current-week-1');
          } else if (isPerson2Born && !isPerson1Born) {
            weekDiv.classList.add('current-week-2');
          }
        } else if (isPastCurrentDate) {
          if (!isPerson1Born && !isPerson2Born) {
            weekDiv.classList.add('pre-birth-week');
          }
          else if (isPerson1Born && !isPerson2Born && !isPerson1Dead) {
            weekDiv.classList.add('past-week-1');
          }
          else if (isPerson2Born && !isPerson1Born && !isPerson2Dead) {
            weekDiv.classList.add('past-week-2');
          }
          else if (isPerson1Born && isPerson2Born && !isPerson1Dead && !isPerson2Dead) {
            if (haveMetByThisWeek) {
              weekDiv.classList.add('past-week-together');
            } else {
              weekDiv.classList.add('past-week-both');
            }
          }
          else if (isPerson1Born && isPerson2Born && isPerson1Dead && !isPerson2Dead) {
            weekDiv.classList.add('after-person1-death');
          }
          else if (isPerson1Born && isPerson2Born && !isPerson1Dead && isPerson2Dead) {
            weekDiv.classList.add('after-person2-death');
          }
          else if (isPerson1Dead && isPerson2Dead) {
            weekDiv.classList.add('pre-birth-week');
            weekDiv.style.opacity = "0.5";
          }
          else if (showPerson1 && !showPerson2 && isPerson1Dead) {
            weekDiv.classList.add('pre-birth-week');
            weekDiv.style.opacity = "0.5";
          }
          else if (!showPerson1 && showPerson2 && isPerson2Dead) {
            weekDiv.classList.add('pre-birth-week');
            weekDiv.style.opacity = "0.5";
          }
        } else {
          if (isPerson1Dead && isPerson2Dead) {
            weekDiv.classList.add('pre-birth-week');
            weekDiv.style.opacity = "0.5";
          }
          else if (isPerson1Dead && !isPerson2Dead) {
            weekDiv.classList.add('after-person1-death');
          }
          else if (!isPerson1Dead && isPerson2Dead) {
            weekDiv.classList.add('after-person2-death');
          }
          else if (isPerson1Born && isPerson2Born) {
            if (haveMetByThisWeek) {
              weekDiv.classList.add('past-week-together');
              weekDiv.style.opacity = "0.3";
            } else {
              weekDiv.classList.add('past-week-both');
              weekDiv.style.opacity = "0.3";
            }
          }
          else if (isPerson1Born) {
            weekDiv.classList.add('past-week-1');
            weekDiv.style.opacity = "0.3";
          }
          else if (isPerson2Born) {
            weekDiv.classList.add('past-week-2');
            weekDiv.style.opacity = "0.3";
          }
        }

        weekDiv.title = tooltipContent;
        monthGroup.appendChild(weekDiv);
        totalWeekCounter++;
      }
      yearRow.appendChild(monthGroup);
    }
    calendarEl.appendChild(yearRow);
    if (totalWeekCounter >= endWeek) {
      break;
    }
  }
}

// Take Screenshot Function
function takeScreenshot() {
  html2canvas(document.querySelector('.calendar-container')).then(function(canvas) {
    const link = document.createElement('a');
    link.download = 'life_calendar.png';
    link.href = canvas.toDataURL();
    link.click();
  });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
  // Set initial UI
  updateLanguageUI();

  // Toggle dark mode
  document.getElementById('toggle-dark').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
  });

  // Toggle language
  document.getElementById('toggle-lang').addEventListener('click', function() {
    currentLanguage = currentLanguage === "en" ? "ko" : "en";
    updateLanguageUI();
  });

  // Event listeners
  document.getElementById('generate').addEventListener('click', generateCalendar);
  document.getElementById('screenshot').addEventListener('click', takeScreenshot);
  document.getElementById('show-person1').addEventListener('change', generateCalendar);
  document.getElementById('show-person2').addEventListener('change', generateCalendar);
  document.getElementById('show-met-date').addEventListener('change', generateCalendar);

  // Set default dates
  const defaultDate1 = new Date();
  defaultDate1.setFullYear(defaultDate1.getFullYear() - 30);
  document.getElementById('birthdate1').value = defaultDate1.toISOString().split('T')[0];

  const defaultDate2 = new Date();
  defaultDate2.setFullYear(defaultDate2.getFullYear() - 25);
  document.getElementById('birthdate2').value = defaultDate2.toISOString().split('T')[0];

  const defaultMetDate = new Date();
  defaultMetDate.setFullYear(defaultMetDate.getFullYear() - 5);
  document.getElementById('met-date').value = defaultMetDate.toISOString().split('T')[0];

  document.getElementById('show-person2').checked = true;
  document.getElementById('show-met-date').checked = true;
});
