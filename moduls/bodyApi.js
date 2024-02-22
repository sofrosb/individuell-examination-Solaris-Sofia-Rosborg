// Importerar getApiKey-funktionen från api-modulen
import { getApiKey } from "./api.js";

// Variabel som innehåller URL till API:et för att hämta nycklar
const apiKeys = "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys";

// Funktion för att söka efter himlakroppar baserat på en sökterm
// Den hämtar först API-nyckeln, skapar en URL för sökningen
// och gör sedan ett GET-anrop till API:et med den skapade URL:en
export function searchBodies(searchInput) {
  return getApiKey()
    .then((apiKey) => {
      const baseUrl = `https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies?${apiKey}&search=${searchInput}`;
      return fetch(baseUrl, {
        method: "GET",
        headers: {
          "x-zocom": apiKey,
        },
      });
    })
    .then((response) => {
      if (response.ok) {
        // Returnerar JSON-svar från API:et
        return response.json();
      } else {
        // Felmeddelande om det inte går att anropa API:et
        throw new Error("Något gick fel med API-anropet");
      }
    })
    .catch((error) => {
      var errorDiv = document.getElementById("error");
      // Rensar tidigare felmeddelanden
      errorDiv.innerHTML = "";
      var errorMsg = document.createElement("p");
      errorMsg.textContent =
        "Oj, något gick fel med API-anropet: " + error.message;
      errorDiv.appendChild(errorMsg);
      console.log(errorMsg);
      throw error;
    });
}
