document.addEventListener("DOMContentLoaded", function () {
  const defaultData = {
    ip: "8.8.8.8",
    location: {
      country: "US",
      region: "California",
      city: "Mountain View",
      lat: 32.69922,
      lng: -117.11281,
      postalCode: "",
      timezone: "-07:00",
      geonameId: 5375481
    },
    domains: [
      "0806efa20d27f8c451c39745817461ff.dlszywz.com",
      "10rd.ru",
      "11582c88dc.dlszywz.com",
      "176274.com",
      "19168cb40a.dlszywz.com"
    ],
    as: {
      asn: 15169,
      name: "GOOGLE",
      route: "8.8.8.0\/24",
      domain: "https:\/\/about.google\/intl\/en\/",
      type: "Content"
    },
    isp: "Google LLC"
  }
  getContent(defaultData)
  setMap(defaultData.location.lat, defaultData.location.lng)
});

let map;

const setMap = (latitude, longitude) => {
  if (!map) {
    map = L.map("map").setView([latitude, longitude], 13);
  } else {
    map.setView([latitude, longitude], 13);
  }

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);
  L.marker([latitude, longitude])
    .addTo(map)
    .bindPopup(`${latitude}, ${longitude}`)
    .openPopup();
}

const getContent = (data) => {
  const ipAddress = document.getElementById("ipAddress");
  const location = document.getElementById("location");
  const timezone = document.getElementById("timezone");
  const isp = document.getElementById("isp");

  ipAddress.innerText = data.ip
  location.innerText = `${data.location.country}, ${data.location.region}`
  timezone.innerText = data.location.timezone
  isp.innerText = data.isp
}

window.onSubmit = async () => {
  const submitButton = document.getElementById("submitButton");
  const submitButtonSvg = document.getElementById("submitButtonSvg");
  const userInput = document.getElementById("userInput");

  if (!userInput.value) {
    return
  }
  try {
    submitButton.disabled = true
    submitButtonSvg.src = './images/lucide--loader-circle.svg'
    const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${import.meta.env.VITE_API_KEY}&ipAddress=${userInput.value}`)
    const data = await response.json()
    getContent(data)
    setMap(data.location.lat, data.location.lng)
    submitButtonSvg.src = './images/icon-arrow.svg'
    submitButton.disabled = false
  }
  catch (error) {
    submitButton.disabled = false
    submitButtonSvg.src = './images/icon-arrow.svg'
  }

}
