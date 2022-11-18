const slidecontainer = document.querySelector(".slide-container");
const rightslideBtn = document.querySelector(".landing .right-slide");
const leftslideBtn = document.querySelector(".landing .left-slide");
let slide = document.querySelectorAll(".landing .slide");
let indicators = document.querySelectorAll(".landing .bullets li");

// To Track And Set Slide Index
let index = 1;
let indicatorIndex = 0;
// For Automatic Play And Stop
let interval = 3000;
let clearinterTime;

// Clone first and last slides
let firstClone = slide[0].cloneNode(true);
let lastClone = slide[slide.length - 1].cloneNode(true);
firstClone.id = "first";
lastClone.id = "last";

// Insert the cloned slides to slide-container
slidecontainer.append(firstClone);
slidecontainer.prepend(lastClone);

// re-positioning to the actual first slide rather than the cloned
slidecontainer.style.transform = `translateX(-${index * 100}%)`;

// Add Listeners To The Right And Left Buttons
rightslideBtn.addEventListener("click", rightSlide);
leftslideBtn.addEventListener("click", leftSlide);

// Moving To Right And Left Slides When Click
function rightSlide() {
  if (index >= slide.length - 1) return;
  index++;
  indicatorIndex++;
  if (indicatorIndex > indicators.length - 1) indicatorIndex = 0;
  moveSlide(index);
  indicator();
}

function leftSlide() {
  if (index <= 0) return;
  index--;
  indicatorIndex--;
  if (indicatorIndex < 0) indicatorIndex = indicators.length - 1;
  moveSlide(index);
  indicator();
}

function moveSlide(slideIndex) {
  slidecontainer.style.transform = `translateX(-${slideIndex * 100}%)`;
  slidecontainer.style.transition = `transform .6s ease-in-out`;
}

// Trigger The Transition End Event When We Reach The firstClone Or lastClone Slides To Cancel The Transition Property And Re-Assign Slide Indexes
slidecontainer.addEventListener("transitionend", () => {
  slide = document.querySelectorAll(".landing .slide");
  if (slide[index].id === firstClone.id) {
    slidecontainer.style.transition = "none";
    index = 1;
    slidecontainer.style.transform = `translateX(-${index * 100}%)`;
  } else if (slide[index].id === lastClone.id) {
    slidecontainer.style.transition = "none";
    index = slide.length - 2;
    slidecontainer.style.transform = `translateX(-${index * 100}%)`;
  }
});

// For indicators
function indicator() {
  indicators.forEach(function (li) {
    li.classList.remove("active");
  });

  indicators[indicatorIndex].classList.add("active");
}

indicators.forEach((li, indx, listOfIndicators) => {
  li.addEventListener("click", () => {
    listOfIndicators.forEach((indicator) => {
      indicator.classList.remove("active");
    });

    moveSlide(indx + 1);

    indicators[indx].classList.add("active");
  });
});

// For Automatic Slide Moving
function startSlide() {
  clearinterTime = setInterval(() => {
    rightSlide();
  }, interval);
}
startSlide();

// For Clearing The Interval When The Mouse Is Over The Slide Controls
rightslideBtn.addEventListener("mouseover", () => clearTime());
leftslideBtn.addEventListener("mouseover", () => clearTime());

const clearTime = () => clearInterval(clearinterTime);

// For Starting The Interval When Mouse Out The Slide Controls
rightslideBtn.addEventListener("mouseout", () => startInterval());
leftslideBtn.addEventListener("mouseout", () => startInterval());

const startInterval = () => startSlide();

// For Clearing And Starting Interval When Either Mouse Over Or Mouse Out The Slide Indicator
indicators.forEach((li) => {
  li.addEventListener("mouseover", () => clearTime());
  li.addEventListener("mouseout", () => startInterval());
});

// End Slider
