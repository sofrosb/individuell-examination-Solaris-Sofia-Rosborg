// Modul som skickar förfrågningar till API:et för att hämta en nyckel
// och sedan använda nyckeln för att hämta data baserat på en sökterm
// Importera
import { errorDiv } from "./dom.js";

// API-endpoint för att hämta nycklar
const apiKeys = "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys";

// Variabel för att lagra API-nyckeln
let apiKey = "";

// Funktion som skickar en POST-förfrågan för att hämta API-nyckel
export function getApiKey() {
  return (
    fetch(apiKeys, {
      method: "POST",
      headers: {
        "x-zocom": "<solaris-keys-here>",
      },
    })
      // Konverterar svaret till JSON-format
      .then((response) => response.json())
      .then((data) => {
        // Om API-nyckeln saknas kommer '!data.key' att vara 'true'
        if (!data.key) {
          // Om '!data.key' inte finns skapas ett felmeddelande
          throw new Error("API-nyckeln saknas");
        }
        // Om 'data.key' finns returneras nyckeln
        return data.key;
      })
      .catch((error) => {
        // Rensar tidigare felmeddelanden
        errorDiv.innerHTML = "";
        let errorMsg = document.createElement("p");
        errorMsg.textContent =
          "Något gick fel med API-anropet: " + error.message;
        errorDiv.appendChild(errorMsg);
        throw error;
      })
  );
}

// Funktion som hämtar data från API:et
export function fetchData(searchInputValue) {
  return getApiKey().then((apiKey) => {
    const baseUrl = `https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies?${apiKey}&search=${searchInputValue}`;
    return fetch(baseUrl, {
      method: "GET",
      headers: {
        "x-zocom": apiKey,
      },
    })
      .then((response) => response.json())
      .catch((error) => {
        throw error;
      });
  });
}
