const filterLinks = Array.from(
  document.querySelectorAll(".portfolio .shuffle-links li")
);
const Gallery = Array.from(
  document.querySelectorAll(".portfolio .imgs-container .img-box")
);
const icon = document.getElementById("icon-menu");
const navList = document.getElementById("navList");
const navListItem = document.querySelectorAll(".navItem");
const statistics = document.querySelector(".stats");
const statsNumber = document.querySelectorAll(".stats .box .number");
const skills = document.querySelector(".skills");
const skillProgress = document.querySelectorAll(
  ".prog-holder [data-targetgoal]"
);
const testimonialsPersons = document.querySelectorAll(
  ".testimonials .person-data .box"
);
const indicators = document.querySelectorAll(".testimonials .bullets li");

let start = true;
let startProgerss = true;
// When Clicking The Burger Icon For Mobile Screens
icon.addEventListener("click", () => {
  let isActive = navList.classList.toggle("active");
  if (isActive) {
    icon.className = "fas fa-times";
  } else {
    icon.className = "fas fa-bars";
  }
});

// When Clicking An Element Or Thing In The Document Other Than The Specified Element
document.addEventListener("click", (ev) => {
  if (ev.target.id !== "icon-menu" && ev.target.id !== "navItem") {
    navList.classList.remove("active");
    icon.className = "fas fa-bars";
  }
});

// For Navigation Links => [To Remove And Active Links Sequentially]
navListItem.forEach((item, index, list) => {
  item.onclick = function () {
    list.forEach((item) => {
      item.classList.remove("active");
    });

    item.classList.add("active");
  };
});

// For Filtering PORTFOLIO Gallery
filterLinks.map((filterBtn) => {
  filterBtn.onclick = function () {
    filterLinks.forEach((filterBtn) => {
      filterBtn.classList.remove("active");
    });
    filterBtn.classList.add("active");

    // Call A Callback For Each Item Of Gallery And Assign Some Classes And If Conditions => [This Is All Based On When Click Filter Buttons]
    Gallery.forEach((glrItem) => {
      glrItem.classList.add("delete");
      glrItem.classList.remove("active");

      if (filterBtn.dataset.filter === glrItem.dataset.item) {
        glrItem.classList.add("active");
        glrItem.classList.remove("delete");
      }

      if (filterBtn.dataset.filter === "All") {
        glrItem.classList.remove("delete");
        glrItem.classList.remove("active");
      }
    });
  };
});

// Adding Event Listener When Srcolling To The Statstics Section And Skills Section
window.addEventListener("scroll", onScrollStatistics);
window.addEventListener("scroll", onScrollSkillProgress);

// Function Gets Called When Event Dispatches
function onScrollStatistics() {
  let statisticsTopAxis = statistics.getBoundingClientRect().top;

  if (statisticsTopAxis <= 0) {
    if (start) {
      statsNumber.forEach((element) => {
        startCount(element);
      });
    }

    start = false;
  }
}

// Function Gets Called In onScrollStatistics Function To Increment The Statistics Within Interval And Finished When The Specified Condition Becomes True
function startCount(element) {
  let targetGoal = element.dataset.targetgoal;

  let intervalTimer = setInterval(() => {
    element.innerText++;

    if (element.innerText == targetGoal) clearInterval(intervalTimer);
  }, 5000 / targetGoal);
}

// Function Gets Called When Event Dispatches
function onScrollSkillProgress() {
  let skillsTopAxis = skills.getBoundingClientRect().top;

  if (skillsTopAxis <= 0) {
    if (startProgerss) {
      skillProgress.forEach((skill) => {
        skill.style.width = skill.dataset.targetgoal;
      });
    }
    startProgerss = false;
  }
}

// For Testimonials Indicators On Clicking
indicators.forEach((indicator, index) => {
  indicator.addEventListener("click", () => {
    for (let indicator of indicators) {
      indicator.classList.remove("active");
    }

    indicator.classList.add("active");

    changeTestimonials(index);
  });
});

// For Changing Testimonials Persons
function changeTestimonials(index) {
  testimonialsPersons.forEach((box) => {
    box.classList.remove("active");
  });

  testimonialsPersons[index].classList.add("active");
}
