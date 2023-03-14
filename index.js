const APIkey = "b96c1a79a063f8fce570600235429b34";
const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
const weatherBox = document.querySelector(".weather-box");
const weatherText = document.querySelector(".weather-text");
const weatherDesc = document.querySelector(".weather-desc");
const container = document.querySelector(".container");
const image = document.querySelector(".weather-box img");
const humidityText = document.querySelector(".humidity-text");
const windText = document.querySelector(".wind-text");
const weatherDetails = document.querySelector(".weather-details");
const weatherTitle = document.querySelector(".weather-title");
const flagText = document.querySelector(".flag-text");

const checkInput = (data) => {
  if (data == "" || data == "404") {
    container.style.height = "fit-content";
    weatherBox.style.display = "block";
    weatherBox.style.scale = "1";
    image.src = "images/404.png";
    weatherTitle.innerHTML = "Oopss!!";
    weatherDetails.style.scale = "0";
    weatherText.innerHTML = "Data tidak ditemukan!!";
    weatherDesc.innerHTML =
      "Ada yang hilang tapi bukan perasaan, coba ketik lagi ya :)";
    return;
  }
};

const fetchData = () => {
  checkInput(searchInput.value);
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&appid=${APIkey}`
  )
    .then((response) => response.json())
    .then((json) => {
      console.log(json);

      checkInput(json.cod);

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "images/clear.png";
          weatherDesc.innerHTML =
            "Matahari bersinar terik, tetapi kamu tetap yang paling menarik :)";
          break;

        case "Rain":
          image.src = "images/rain.png";
          weatherDesc.innerHTML =
            "Lagi hujan nih tapi bakal reda, sedangkan rinduku ke kamu ga bakal reda :)";
          break;

        case "Snow":
          image.src = "images/snow.png";
          weatherDesc.innerHTML =
            "Kamu tahu nggak persamaan kamu dengan salju? Sama-sama menyejukkan hati aku :)";
          break;

        case "Clouds":
          image.src = "images/cloud.png";
          weatherDesc.innerHTML =
            "Di luar mendung, untung ada kamu yang selalu menyinari hatiku :)";
          break;

        case "Haze":
          image.src = "images/mist.png";
          weatherDesc.innerHTML =
            "Kabut berbahaya karna memberikan ilusi penglihatan, kamu berbahaya karna membuatku jatuh cinta :)";
          break;

        default:
          image.src = "";
      }

      weatherBox.style.display = "block";
      weatherBox.style.scale = "1";
      container.style.height = "fit-content";
      weatherDetails.style.scale = "1";

      flagText.innerHTML = `${json.sys.country}`;
      weatherTitle.innerHTML = `${json.name}`;
      humidityText.innerHTML = `${json.main.humidity}`;
      windText.innerHTML = `${json.wind.speed}`;
      weatherText.innerHTML = `${parseInt(
        json.main.temp
      )} <span style='font-size: 10px;'>°C</span>`;
    });
};

searchBtn.addEventListener("click", () => {
  fetchData();
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    fetchData();
  }
});
