const getColorBtn = document.getElementById("get-color-btn");
const selectedColorEl = document.getElementById("color-selector");
const selectedModeEl = document.getElementById("modes");
const colorsEl = document.getElementsByClassName("color");

let lastSelectedMode =
  selectedModeEl[Math.floor(Math.random() * selectedModeEl.options.length)]
    .value;
let lastSelectedColor = (Math.random() * 0xfffff * 1000000)
  .toString(16)
  .slice(0, 6);

// Selects random mode
selectedModeEl.value = lastSelectedMode;
selectedColorEl.value = "#" + lastSelectedColor;

// Get color scheme
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

// Copy color to clipboard when clicked on.
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("color")) {
    const colorHex = e.target.childNodes[0].textContent; // Gets color hex from the text inside of the color-hex div.
    // Copy the text inside the text field
    navigator.clipboard.writeText(colorHex);

    // Alert the copied text
    alert("Copied the text: " + colorHex);
  }
});

getColorBtn.addEventListener("click", function () {
  const selectedColor = selectedColorEl.value.substring(1); // Removes hashtag from front of color.
  const selectedMode = selectedModeEl.value;

  // Prevents spamming API with same query.
  if (
    selectedColor !== lastSelectedColor ||
    selectedMode !== lastSelectedMode
  ) {
    // Set last selected to newest selected to protect against spamming API with same query
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
