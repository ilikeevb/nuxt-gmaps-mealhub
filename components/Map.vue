<template>
    <div>
        <GMap id="map" language="ru">
        </GMap>
        <div id="control-buttons">
            <button id="location-button">
                <img src="~@/assets/location.svg" />
            </button>
            <div id="radius-control">
                <button id="minus-radius-button" @click="minusRadius">
                    <img src="~@/assets/minus.svg" />
                </button>
                <span id="radius-text">
                    Радиус: {{ radiusList[radius] }}
                </span>
                <button id="plus-radius-button" @click="plusRadius">
                    <img src="~@/assets/plus.svg" />
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import mapStyle from '../assets/mapStyle.js'
export default {
    name: 'MapComponent',
    data() {
        return {
            radius: 7,
            radiusList: ["500м", "1км", "2км", "3км", "4км", "5км", "10км", "15км", "20км", "30км", "40км", "50км"],
            options: {
                styles: mapStyle, // подключаем стили карты
                center: {
                    lat: 59.931469339578584, lng: 30.295400903735356
                },
                zoom: 15,
                // отключаем все стандартные кнопки карты
                panControl: false,
                zoomControl: false,
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                overviewMapControl: false,
                rotateControl: false,
                fullscreenControl: false,
            }

        }
    },
    methods: {
        minusRadius() {
            if (this.radius !== 0) this.radius -= 1;
        },
        plusRadius() {
            if (this.radius !== this.radiusList.length - 1) this.radius += 1;
        }
    },
    mounted() {
        let map, infoWindow;
        const options = this.options;

        function initMap() {
            map = new google.maps.Map(document.getElementById("map"), options);
            infoWindow = new google.maps.InfoWindow();

            const locationButton = document.getElementById("location-button");

            locationButton.addEventListener("click", () => {
                // Try HTML5 geolocation.
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            const pos = {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude,
                            };

                            infoWindow.setPosition(pos);
                            infoWindow.setContent("Location found.");
                            infoWindow.open(map);
                            map.setCenter(pos);
                        },
                        () => {
                            handleLocationError(true, infoWindow, map.getCenter());
                        }
                    );
                } else {
                    // Browser doesn't support Geolocation
                    handleLocationError(false, infoWindow, map.getCenter());
                }
            });
        }
        function handleLocationError(browserHasGeolocation, infoWindow, pos) {
            infoWindow.setPosition(pos);
            infoWindow.setContent(
                browserHasGeolocation
                    ? "Error: The Geolocation service failed."
                    : "Error: Your browser doesn't support geolocation."
            );
            infoWindow.open(map);
        }
        window.onload = initMap;
    }
}
</script>

<style lang="scss">
#control-buttons {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    margin-top: 10px;
}

#location-button {
    position: relative;
    width: 30px;
    height: 30px;
    background: #FFFFFF;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
    border: none;
    border-radius: 10px;

    img {
        position: absolute;
        width: 15px;
        height: 15px;
        left: calc(50% - 15px/2 - 0.5px);
        top: calc(50% - 15px/2 + 0.5px);
    }
}

#radius-control {
    display: flex;
    gap: 5px;
}

#minus-radius-button {
    position: relative;
    width: 30px;
    height: 30px;
    background: #FFFFFF;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    border: none;
    border-radius: 10px;

    img {
        position: absolute;
        width: 15px;
        height: 15px;
        left: calc(50% - 15px/2 - 0.5px);
        top: calc(50% - 15px/2 + 0.5px);
    }
}

#plus-radius-button {
    position: relative;
    width: 30px;
    height: 30px;
    background: #FFFFFF;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    border: none;
    border-radius: 10px;

    img {
        position: absolute;
        width: 15px;
        height: 15px;
        left: calc(50% - 15px/2 - 0.5px);
        top: calc(50% - 15px/2 + 0.5px);
    }
}

#radius-text {
    box-sizing: border-box;
    background: #FFFFFF;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 7px 9px;
    
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
    color: #4F4F4F;
    text-align: center;
}
</style>
