import { getApiKey, fetchData } from "./api.js";
import { updatePlanetInfo } from "./planetInfo.js";
import { searchBtn, searchInput, errorDiv, bodies, allBodies } from "./dom.js";

let searchInputValue;
// Skapar en global variabel för att lagra data från API:et
let globalData;

// Eventlyssnare för sökknappen
searchBtn.addEventListener("click", search);
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    search();
  }
});

function search() {
  // Uppdaterar värdet när användaren söker, tar bort mellanslag och gör om till små bokstäver
  searchInputValue = searchInput.value.trim().toLowerCase();
  // Om sökfältet är tomt görs ingenting
  if (!searchInputValue) {
    // Rensar tidigare felmeddelanden
    errorDiv.innerHTML = "";
    let errorMsg = document.createElement("p");
    errorMsg.textContent = "Oj, du glömde att skriva in något att söka efter!";
    errorDiv.appendChild(errorMsg);
    return;
  }

  fetchData(searchInputValue)
    .then((data) => {
      console.log("Setting globalData with: ", data);
      // Sparar data i den globala variabeln
      globalData = data;
      console.log("globalData set: ", globalData);
      // Rensar tidigare felmeddelanden
      errorDiv.innerHTML = "";
      // Variabel som anger om matchning hittats eller inte
      let matchFound = false;
      // Loop som går igenom varje element i allBodies
      for (let i = 0; i < bodies.length; i++) {
        const element = allBodies[i];
        const planetData = data.bodies[i];
        element.classList.remove("zoom", "grow");
        // Kontrollerar om det finns en matchning mellan söksträng och namnet på objektet
        if (planetData && planetData.name.toLowerCase() === searchInputValue) {
          // Om matchning med klassen 'planet' hittas läggs klasserna 'zoom' och 'grow' till
          if (element.classList.contains("planet")) {
            element.classList.add("zoom", "grow");
            // Om matchning med klassen 'star' hittas läggs klasse 'zoom-star' till
          } else if (element.classList.contains("star")) {
            element.classList.add("zoom-star"); //
          }
          // Baserat på vilket element som klickas på flyttas elementen vid sidan om åt höger eller vänster baserat på deras index
          const clickedIndex = Array.from(allBodies).indexOf(element);
          allBodies.forEach((body, index) => {
            // Tar bort klasser från varje 'body'
            body.classList.remove("move-left", "move-right");
            if (index < clickedIndex) {
              body.classList.add("move-left");
            } else if (index > clickedIndex) {
              body.classList.add("move-right");
            }
          });
          matchFound = true;
          // Anropar updatePlanetInfo här om du vill uppdatera texten direkt
          updatePlanetInfo(planetData, allBodies);
          setTimeout(() => {
            updatePlanetInfo(planetData, allBodies);
          }, 500);
          // Avbryt loopen när en matchning har hittats
          break;
        }
      }
      // Om ingen matchning görs dyker det upp ett felmeddelande
      if (!matchFound) {
        // Kontrollerar om det redan finns ett felmeddelande i errorDiv
        if (errorDiv.textContent === "") {
          let errorMsg = document.createElement("p");
          errorMsg.textContent =
            "Oj, det verkar som att planeten du söker inte finns!";
          errorDiv.appendChild(errorMsg);
        }
        return;
      }
    })
    .catch((error) => {
      // Rensar tidigare felmeddelanden
      errorDiv.innerHTML = "";
      let errorMsg = document.createElement("p");
      errorMsg.textContent =
        "Oj, något gick fel med API-anropet: " + error.message;
      errorDiv.appendChild(errorMsg);
      throw error;
    });
}

function findPlanetData(id, data) {
  console.log("Data in findPlanetData: ", data);
  if (data && data.bodies) {
    for (let i = 0; i < data.bodies.length; i++) {
      if (data.bodies[i].id === id) {
        return data.bodies[i];
      }
    }
  }
  return null;
}

// Eventlyssnare för alla himlakroppar
allBodies.forEach((element) => {
  element.addEventListener("click", function () {
    console.log("globalData when clicked: ", globalData);
    if (globalData !== undefined) {
      const planetData = findPlanetData(element.id, globalData);
      updatePlanetInfo(planetData, allBodies);
    } else {
      console.log("globalData is undefined vid klick, väntar...");
      setTimeout(() => {
        const planetData = findPlanetData(element.id, globalData);
        updatePlanetInfo(planetData, allBodies);
      }, 500); // Vänta 1 sekund
    }
  });
});
