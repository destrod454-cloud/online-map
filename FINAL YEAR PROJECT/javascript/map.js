const miniMapElement = document.getElementById("campusMiniMap");

if (miniMapElement) {

    const miniMap = L.map("campusMiniMap", {
        zoomControl: false,
        attributionControl: false
    }).setView([5.76932, 6.83510], 18);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 20
    }).addTo(miniMap);

    const miniLocations = [
        ["COOU Uli Campus", 5.76932, 6.83510],
        ["Library", 5.76962, 6.83472],
        ["Faculty of Engineering", 5.76891, 6.83542],
        ["Science Complex", 5.76975, 6.83555],
        ["Student Center", 5.76878, 6.83472],
        ["Sports Complex", 5.76842, 6.83572],
        ["Administrative Building", 5.76992, 6.83492]
    ];

    miniLocations.forEach(place => {

        L.marker([place[1], place[2]])
            .addTo(miniMap)
            .bindPopup(`<strong>${place[0]}</strong>`);

    });

    setTimeout(() => {
        miniMap.invalidateSize();
    }, 500);
}
document.addEventListener("DOMContentLoaded", () => {


    const campusCenter = [5.76932, 6.83510];

    const locations = [
        {
            name: "COOU Uli Campus",
            position: [5.76932, 6.83510],
            type: "Campus"
        },
        {
            name: "Library",
            position: [5.76962, 6.83472],
            type: "Academic"
        },
        {
            name: "Faculty of Engineering",
            position: [5.76891, 6.83542],
            type: "Faculty"
        },
        {
            name: "Science Complex",
            position: [5.76975, 6.83555],
            type: "Academic"
        },
        {
            name: "Student Center",
            position: [5.76878, 6.83472],
            type: "Student Area"
        },
        {
            name: "Sports Complex",
            position: [5.76842, 6.83572],
            type: "Sports"
        },
        {
            name: "Administrative Building",
            position: [5.76992, 6.83492],
            type: "Administration"
        }
    ];


    // =========================
    // CREATE MAP
    // =========================

    const mapElement = document.getElementById("campusMap");

    if (!mapElement) {
        console.error("campusMap was not found.");
        return;
    }

    const map = L.map("campusMap").setView(campusCenter, 19);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 20,
        attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);


    // =========================
    // MARKERS
    // =========================

    const markers = [];

    locations.forEach(location => {

        const marker = L.marker(location.position)
            .addTo(map)
            .bindPopup(`
                <div class="map-popup">
                    <strong>${location.name}</strong>
                    <span>${location.type}</span>
                </div>
            `);

        marker.locationData = location;

        markers.push(marker);
    });


    // =========================
    // SEARCH ELEMENTS
    // =========================

    const searchInput = document.getElementById("locationSearch");
    const searchResults = document.getElementById("searchResults");
    const openSearch = document.getElementById("openSearch");


    // =========================
    // SEARCH FUNCTION
    // =========================

    function searchLocations() {

        if (!searchInput || !searchResults) return;

        const query = searchInput.value.trim().toLowerCase();

        searchResults.innerHTML = "";

        if (!query) {
            searchResults.classList.remove("show");
            return;
        }

        const matches = locations.filter(location =>
            location.name.toLowerCase().includes(query) ||
            location.type.toLowerCase().includes(query)
        );

        if (matches.length === 0) {

            searchResults.innerHTML = `
                <div class="search-empty">
                    <i class="fa-solid fa-location-dot"></i>
                    <p>No location found</p>
                </div>
            `;

            searchResults.classList.add("show");
            return;
        }


        matches.forEach(location => {

            const result = document.createElement("button");

            result.className = "search-result";

            result.innerHTML = `
                <span class="search-result-icon">
                    <i class="fa-solid fa-location-dot"></i>
                </span>

                <span class="search-result-info">
                    <strong>${location.name}</strong>
                    <small>${location.type}</small>
                </span>
            `;


            result.addEventListener("click", () => {

                // Move map to selected location
                map.flyTo(location.position, 20, {
                    duration: 1.2
                });


                // Open the marker popup
                const marker = markers.find(
                    m => m.locationData.name === location.name
                );

                if (marker) {
                    setTimeout(() => {
                        marker.openPopup();
                    }, 1000);
                }


                // Put selected location in input
                searchInput.value = location.name;

                // Hide results
                searchResults.classList.remove("show");
            });


            searchResults.appendChild(result);
        });


        searchResults.classList.add("show");
    }


    // Search while typing
    if (searchInput) {

        searchInput.addEventListener("input", searchLocations);

        searchInput.addEventListener("keydown", event => {

            if (event.key === "Enter") {

                const firstResult =
                    searchResults.querySelector(".search-result");

                if (firstResult) {
                    firstResult.click();
                }
            }

            if (event.key === "Escape") {
                searchResults.classList.remove("show");
            }
        });
    }


    // =========================
    // MOBILE SEARCH BUTTON
    // =========================

    if (openSearch) {

        openSearch.addEventListener("click", () => {

            const searchBox =
                document.querySelector(".map-search");

            if (!searchBox) return;

            searchBox.classList.toggle("active");

            if (searchBox.classList.contains("active")) {

                setTimeout(() => {
                    searchInput?.focus();
                }, 100);
            }
        });
    }


    // =========================
    // RESET MAP
    // =========================

    const resetMap = document.getElementById("resetMap");

    if (resetMap) {

        resetMap.addEventListener("click", () => {

            map.flyTo(campusCenter, 19, {
                duration: 1
            });

            if (searchInput) {
                searchInput.value = "";
            }

            if (searchResults) {
                searchResults.classList.remove("show");
            }
        });
    }


    // =========================
    // ZOOM TO CAMPUS
    // =========================

    const zoomCampus = document.getElementById("zoomCampus");

    if (zoomCampus) {

        zoomCampus.addEventListener("click", () => {

            const bounds = L.latLngBounds(
                locations.map(location => location.position)
            );

            map.fitBounds(bounds, {
                padding: [50, 50],
                maxZoom: 19
            });
        });
    }


    // =========================
    // MY LOCATION
    // =========================

    const locateButton = document.getElementById("locateButton");

    if (locateButton) {

        locateButton.addEventListener("click", () => {

            if (!navigator.geolocation) {
                alert("Geolocation is not supported by your browser.");
                return;
            }

            locateButton.classList.add("loading");

            navigator.geolocation.getCurrentPosition(
                position => {

                    const userLocation = [
                        position.coords.latitude,
                        position.coords.longitude
                    ];

                    map.flyTo(userLocation, 20, {
                        duration: 1.2
                    });

                    L.circleMarker(userLocation, {
                        radius: 8
                    })
                    .addTo(map)
                    .bindPopup("You are here")
                    .openPopup();

                    locateButton.classList.remove("loading");
                },

                () => {

                    locateButton.classList.remove("loading");

                    alert(
                        "Unable to get your location. Please allow location access."
                    );
                }
            );
        });
    }


    // =========================
    // CLOSE SEARCH WHEN CLICKING OUTSIDE
    // =========================

    document.addEventListener("click", event => {

        const searchBox =
            document.querySelector(".map-search");

        if (
            searchBox &&
            !searchBox.contains(event.target) &&
            searchResults
        ) {
            searchResults.classList.remove("show");
        }
    });


    // =========================
    // FIX MAP SIZE
    // =========================

    setTimeout(() => {
        map.invalidateSize();
    }, 300);

});