function showweatherDetails(event) {
  event.preventDefault();
  const City = document.getElementById("citySelected").value;

  const { lat, lon } = JSON.parse(City);
  const apiKey = "085ea6f5cbac7db8120a1654c6fdc150"; // Replace 'YOUR_API_KEY' with your actual API key
  const apiUrl = `https://www.7timer.info/bin/api.pl?lon=${lon}&lat=${lat}&product=civillight&output=json`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.dataseries);
      const weatherInfo = document.getElementById("weatherInfo");

      data.dataseries.map((x) => {
        const card = document.createElement("div");
        card.classList.add("weatcherCards");
        const dateString = x.date.toString();
        const year = parseInt(dateString.slice(0, 4), 10);
        const month = parseInt(dateString.slice(4, 6), 10) - 1; // Month is zero-indexed
        const day = parseInt(dateString.slice(6, 8), 10);

        const dateObject = new Date(year, month, day);

        const options = {
          weekday: "short",
          month: "short",
          day: "numeric",
        };

        const formattedDate = dateObject.toLocaleDateString("en-US", options);

        card.innerHTML += `<div class="upper"><div>${formattedDate}</div><div>${year}</div><div><img src='../images/${x.weather}.png'/></div></div><div class="bottom"><div>${x.weather}</div><div>H:${x.temp2m.max}&deg;C</div><div>L:${x.temp2m.min}&deg;C</div></div>`;
        weatherInfo.appendChild(card);
      });

      //    `;
    });
}
document
  .getElementById("citySelected")
  .addEventListener("change", showweatherDetails);
