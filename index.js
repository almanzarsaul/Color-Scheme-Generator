const getColorBtn = document.getElementById("get-color-btn");
const selectedColorEl = document.getElementById("color-selector");
const selectedModeEl = document.getElementById("modes");
const colorsEl = document.getElementsByClassName("color");

// for (let index = 0; index < selectedModeEl.options.length; index++) {
//   console.log(selectedModeEl.options[index].value);
// }

// selects random color
selectedColorEl.value = "#" + Math.floor(Math.random() * 16777215).toString(16);
fetch(
  `https://www.thecolorapi.com/scheme?hex=${selectedColorEl.value.substring(
    1
  )}&mode=${selectedModeEl.value}&count=5`
)
  .then((response) => response.json())
  .then((data) => {
    data.colors.forEach((color, index) => {
      colorsEl[index].style.backgroundColor = color.hex.value;
    });
  });

getColorBtn.addEventListener("click", function () {
  const selectedColor = selectedColorEl.value.substring(1); // Removes hashtag from front of color.
  const selectedMode = selectedModeEl.value;
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${selectedColor}&mode=${selectedMode}&count=5`
  )
    .then((response) => response.json())
    .then((data) => {
      data.colors.forEach((color, index) => {
        colorsEl[index].style.backgroundColor = color.hex.value;
      });
    });
});
