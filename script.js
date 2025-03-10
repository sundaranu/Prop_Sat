// Function to update Analog Clock & Date Display
function updateClock() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    let hours12 = hours % 12 || 12;
    let hourDeg = (hours12 * 30) + (minutes / 2);
    let minuteDeg = (minutes * 6) + (seconds / 10);
    let secondDeg = seconds * 6;

    document.querySelector('.hours').style.transform = `rotate(${hourDeg}deg)`;
    document.querySelector('.minutes').style.transform = `rotate(${minuteDeg}deg)`;
    document.querySelector('.seconds').style.transform = `rotate(${secondDeg}deg)`;

    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById("date-display").innerText = now.toLocaleDateString('en-US', options);
}

// Ensure clock updates every second
document.addEventListener("DOMContentLoaded", function() {
    updateClock();
    setInterval(updateClock, 1000);
    getLocation();
});

// Fetch Live Location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(fetchLocation, showLocationError);
    } else {
        document.getElementById("location").innerText = "Geolocation is not supported by this browser.";
    }
}

function fetchLocation(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
        .then(response => response.json())
        .then(data => {
            let locationName = `📍 ${data.address.city || data.address.town || data.address.village}, ${data.address.state}, ${data.address.country}`;
            document.getElementById("location").innerText = locationName;
        })
        .catch(() => {
            document.getElementById("location").innerText = "Location data unavailable.";
        });
}

// Error handling for location fetching
function showLocationError(error) {
    document.getElementById("location").innerText = "Unable to retrieve location.";
}
