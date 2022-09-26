<template>
    <GMap @click="mapClick" id="map" ref="gMap" language="ru" :center="location" :options="mapOptions">
        <GMapCircle ref="gCircleRadius" :options="circleRadiusOptions"></GMapCircle>
        <GMapMarker ref="gMarker" :position="location" :options="{ icon: icon }">
        </GMapMarker>
        <div id="control-buttons">
            <button id="location-button" @click="getLocation">
                <img src="~@/assets/location.svg" />
            </button>
            <div id="radius-control">
                <button id="minus-radius-button" @click="minusRadius">
                    <img src="~@/assets/minus.svg" />
                </button>
                <span id="radius-text">
                    Радиус: {{ radiusList[radius].name }}
                </span>
                <button id="plus-radius-button" @click="plusRadius">
                    <img src="~@/assets/plus.svg" />
                </button>
            </div>
        </div>
    </GMap>
</template>

<script>
import mapStyle from '../assets/mapStyle.js'
export default {
    name: 'MapComponent',
    data() {
        return {
            icon: require('../assets/point.svg'),
            iconItemPoint: require('../assets/item-point.svg'),
            radius: 1,
            radiusList: [
                { name: "500м", value: 500, zoom: 15 },
                { name: "1км", value: 1000, zoom: 14 },
                { name: "2км", value: 2000, zoom: 13 },
                { name: "3км", value: 3000, zoom: 12 },
                { name: "4км", value: 4000, zoom: 12 },
                { name: "5км", value: 5000, zoom: 12 },
                { name: "10км", value: 10000, zoom: 11 },
                { name: "20км", value: 20000, zoom: 10 },
                { name: "30км", value: 30000, zoom: 9 },
                { name: "40км", value: 40000, zoom: 9 },
                { name: "50км", value: 50000, zoom: 8 },
            ],
            mapOptions: {
                styles: mapStyle, // подключаем стили карты
                // отключаем все стандартные кнопки карты
                panControl: false,
                zoomControl: false,
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                overviewMapControl: false,
                rotateControl: false,
                fullscreenControl: false,
            },
            circleRadiusOptions: {
                clickable: false,
                strokeColor: '#FF0000',
                strokeOpacity: 1,
                strokeWeight: 2,
                fillColor: '#FFFFFF',
                fillOpacity: 0,
                radius: 10000,
                center: {
                    lat: 59.931469339578584, lng: 30.295400903735356
                }
            },
            location: {
                lat: 59.931469339578584, lng: 30.295400903735356
            },
            markersList: []
        }
    },
    computed: {
        items() {
            return this.$store.getters.GET_ITEMS;
        },
        currentCard() {
            return this.$store.getters.GET_CURRENT_CARD;
        }
    },
    watch: {
        items() {
            for (let marker of this.markersList) {
                marker.setMap(null);
            }
            this.markersList = [];

            const iconItemPoint = this.iconItemPoint;
            for (let item of this.items) {
                let marker = new this.$refs.gMap.google.maps.Marker({
                    position: {
                        lat: Number(item.latitude),
                        lng: Number(item.longitude)
                    },
                    icon: iconItemPoint
                });
                marker.setMap(this.$refs.gMap.map);
                this.markersList.push(marker)
            }
        },
        currentCard(card) {
            const location = { lat: Number(card.latitude), lng: Number(card.longitude) };

            this.changeLocation(location);
        }
    },
    mounted() {
        window.onload = this.getLocation;
    },
    methods: {
        mapClick(e) {
            this.location = e.event.latLng;
            this.changeLocation(this.location);
        },
        getLocation() {
            this.$store.commit("SET_COMPUTE_DISTANCE", this.$refs.gMap.google.maps.geometry.spherical.computeDistanceBetween);

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        this.location = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        };
                        this.changeLocation(this.location);
                    },
                    () => {
                        /* Ошибка геолокации */
                    }
                );
            } else {
                /* 
                    Доступ к геолокации не разрешен
                    Можно выводить на экран сообщение об ошибке
                */
                this.changeLocation(this.location);
            }
            
        },
        changeRadius() {
            this.$refs.gMap.map.setZoom(this.radiusList[this.radius].zoom);
            this.$refs.gCircleRadius.circle.setRadius(this.radiusList[this.radius].value)
        },
        changeLocation(location) {
            this.$store.commit("SET_LOCATION_AND_RADIUS", {
                location: location, radius: this.radius
            });

            const params = {
                latitude: typeof location.lat == 'function' ? location.lat() : location.lat,
                longitude: typeof location.lng == 'function' ? location.lng() : location.lng,
                radius: this.radius
            };

            this.$store.dispatch("GET_ITEMS", params);

            this.$refs.gMap.map.setCenter(location);
            this.$refs.gCircleRadius.circle.setCenter(location);
            this.$refs.gMarker.marker.setPosition(location);

            this.changeRadius();
        },
        minusRadius() {
            if (this.radius !== 0) {
                this.radius -= 1;
                this.changeRadius();
            }
        },
        plusRadius() {
            if (this.radius !== this.radiusList.length - 1) {
                this.radius += 1;
                this.changeRadius();
            }
        },
    },

}
</script>

<style lang="scss" scoped>
#map {
    position: relative;
}

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
