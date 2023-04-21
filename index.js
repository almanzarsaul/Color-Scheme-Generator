const getColorBtn = document.getElementById("get-color-btn");
const selectedColorEl = document.getElementById("color-selector");
const selectedModeEl = document.getElementById("modes");

getColorBtn.addEventListener("click", function () {
  const selectedColor = selectedColorEl.value.substring(1); // Removes hashtag from front of color.
  const selectedMode = selectedModeEl.value;
  const colorsEl = document.getElementsByClassName("color");

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
