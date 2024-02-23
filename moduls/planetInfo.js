// Importerar textruta
import { textBox, headers } from "./dom.js";

// Funktion som uppdaterar informationen om varje himlakropp i textrutan
export function updatePlanetInfo(planet, allBodies) {
  // Kontrollera om planet är null eller undefined
  if (!planet) {
    console.error("Planet object is null or undefined.");
    return;
  }
  // Textrutans synlighet, den är dold till en början
  textBox.style.display = "block";
  // Skapar olika strängar med all information om planeten
  let planetName = "<h1>" + planet.name + "</h1>";
  let latinName = "<h2>" + planet.latinName + "</h2>";
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
    " celcius</td><td>" +
    planet.temp.night +
    " celcius</td></tr>" +
    "<tr><td colspan='2'><h3>MÅNAR:</h3> " +
    moons +
    "</td></tr>" +
    "</table>";
  let descriptionBox = "<div class='description-box'>" + planet.desc + "</div>";
  let infoBox = "<div class='info-box'>" + planetInfo + "</div>";
  let contentBox =
    "<div class='content-box'>" + descriptionBox + infoBox + "</div>";
  // Informationen sätts som innehåll i textrutan
  textBox.innerHTML = planetName + latinName + contentBox;
  // Gör rubrikerna i bakgrunden något transparenta
  headers.forEach((header) => {
    header.style.opacity = "0.5";
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
          "grow",
          "move-right",
          "move-left",
          "zoom-star"
        );
        // Vänta 1 sekund innan zoom-klassen tas bort
        setTimeout(() => {
          element.classList.remove("zoom");
        }, 1000);
        // Återställer headers
        headers.forEach((header) => {
          header.style.opacity = "1";
        });
      });
    }
  });
}
