const getColorBtn = document.getElementById("get-color-btn");
const selectedColorEl = document.getElementById("color-selector");
const selectedModeEl = document.getElementById("modes");
const colorsEl = document.getElementsByClassName("color");

let lastSelectedMode =
  selectedModeEl[Math.floor(Math.random() * selectedModeEl.options.length)]
    .value;
let lastSelectedColor = Math.floor(Math.random() * 16777215).toString(16);

// selects random mode
selectedModeEl.value = lastSelectedMode;

// selects random color
selectedColorEl.value = "#" + lastSelectedColor;

// get color scheme
fetch(
  `https://www.thecolorapi.com/scheme?hex=${lastSelectedColor}&mode=${lastSelectedMode}&count=5`
)
  .then((response) => response.json())
  .then((data) => {
    data.colors.forEach((color, index) => {
      colorsEl[index].style.backgroundColor = color.hex.value;
      colorsEl[index].childNodes[0].innerHTML = `<div>${color.hex.value}</div>`;
    });
  });

getColorBtn.addEventListener("click", function () {
  const selectedColor = selectedColorEl.value.substring(1); // Removes hashtag from front of color.
  const selectedMode = selectedModeEl.value;

  // prevents spamming API with same query
  if (
    selectedColor !== lastSelectedColor ||
    selectedMode !== lastSelectedMode
  ) {
    // set last selected to newest selected to protect against spamming API with same query
    lastSelectedColor = selectedColor;
    lastSelectedMode = selectedMode;
    fetch(
      `https://www.thecolorapi.com/scheme?hex=${selectedColor}&mode=${selectedMode}&count=5`
    )
      .then((response) => response.json())
      .then((data) => {
        data.colors.forEach((color, index) => {
          colorsEl[index].style.backgroundColor = color.hex.value;
          colorsEl[
            index
          ].childNodes[0].innerHTML = `<div>${color.hex.value}</div>`;
        });
      });
  }
});
