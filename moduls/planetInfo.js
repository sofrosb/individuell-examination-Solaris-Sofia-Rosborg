// Modul som uppdaterar informationen om varje himlakropp i textrutan samt hanterar dess beteende
// Importerar textruta
import { textBox, headers } from "./dom.js";

export function updatePlanetInfo(planet, allBodies) {
  // Kontrollera om planet är null eller undefined
  if (!planet) {
    return;
  }
  // Textrutans synlighet, den är dold till en början
  textBox.style.display = "block";
  // Skapar olika strängar med all information om planeten
  let planetName = "<h1>" + planet.name + "</h1>";
  let latinName = "<h2>" + planet.latinName + "</h2>";
  let closeButton = "<button id='close-button'>X</button>";
  // Om planeten har månar skapas en sträng med alla månarnas namn, annars skriver den "Inga" (om planet.moons.length inte är större än 0)
  // Samt lägger till kommatecken mellan varje objekt i arrayen
  let moons = planet.moons.length > 0 ? planet.moons.join(", ") : "Inga";
  let planetInfo =
    "<table>" +
    "<tr><td><h3>OMKRETS</h3></td><td><h3>KM FRÅN SOLEN</h3></td></tr>" +
    "<tr><td>" +
    planet.circumference.toLocaleString("sv-SE") +
    " km</td><td>" +
    planet.distance.toLocaleString("sv-SE") +
    " km</td></tr>" +
    "<tr><td><h3>MAXTEMPERATUR</h3></td><td><h3>LÄGSTA TEMPERATUR</h3></td></tr>" +
    "<tr><td>" +
    planet.temp.day +
    " °C</td><td>" +
    planet.temp.night +
    " °C</td></tr>" +
    "<tr><td colspan='2'><h3>MÅNAR:</h3> " +
    moons +
    "</td></tr>" +
    "</table>";
  let descriptionBox = "<div class='description-box'>" + planet.desc + "</div>";
  let infoBox = "<div class='info-box'>" + planetInfo + "</div>";
  let contentBox =
    "<div class='content-box'>" + descriptionBox + infoBox + "</div>";
  // Informationen sätts som innehåll i textrutan
  textBox.innerHTML = planetName + latinName + closeButton + contentBox;
  setTimeout(function () {
    let closeBtn = document.getElementById("close-button");
    closeBtn.addEventListener("click", function (event) {
      textBox.style.display = "none";
      headers.forEach((header) => {
        header.style.opacity = "1";
      });
      allBodies.forEach((element) => {
        element.classList.remove(
          "move-right",
          "move-left",
          "zoom",
          "zoom-star"
        );
      });
      event.stopPropagation();
    });
  }, 0);
  // Gör rubrikerna i bakgrunden något transparenta
  headers.forEach((header) => {
    header.style.opacity = "0.2";
  });
  document.addEventListener("click", function (event) {
    // Om klicket är utanför textrutan
    if (
      !textBox.contains(event.target) &&
      !Array.from(allBodies).includes(event.target)
    ) {
      // Göm textrutan
      textBox.style.display = "none";
      // Återställ planeterna och solen så att de hamnar i sin ursprungliga position (klasser tas bort)
      allBodies.forEach((element) => {
        element.classList.remove(
          "move-right",
          "move-left",
          "zoom",
          "zoom-star"
        );
        // Återställer headers
        headers.forEach((header) => {
          header.style.opacity = "1";
        });
      });
    }
  });
}
