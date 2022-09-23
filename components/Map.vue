<template>
    <div>
        <img :src="icon">

        <GMap ref="gMap" :center="{ lat: location.lat, lng: location.lng }" language="ru" :options="mapOptions"
            :zoom="zoom">
            <GMapCircle ref="gCircleRadius" :options="circleRadiusOptions"></GMapCircle>
            <GMapMarker :position="{ lat: location.lat, lng: location.lng }" :options="{
              icon: icon,
            }">

            </GMapMarker>
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
                    Радиус: {{ radiusList[radius].name }}
                </span>
                <button id="plus-radius-button" @click="plusRadius">
                    <img src="~@/assets/plus.svg" />
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import logo from '../assets/point.svg'
import mapStyle from '../assets/mapStyle.js'
export default {
    name: 'MapComponent',
    data() {
        return {
            icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHUSURBVHgB5VU7SwNBEJ7LmZBgMC+UdKKx0MZCG2srwcbCB2glpFDQ3to/IegvSAIWPrBJIySlipUKKqYLaHJ3iWIelzu/DTk8j71H7MQPltmZnflmZ3b3juivQ3BzCIfDI4FAYBvTRV3XR7tBglCCOIP9oFwuv/46QSwWWwfZIaaDNi7vGOlqtZqhfhPE4/EViAy5V6ljE8uVSuXYc4JkMjncarUeMR0ib5Db7fZEvV6vWBd8PG+Q73LIFYyj3lAsa1G/37/D4+JWgPbcQkybd9jpdGYVRXlmSiQSSYmieMWmhgMuwI0kSTPkpQJgzKJnDfJuKYryBJH7sVNBSPGI7BKoFl3n+GguMY4JHiz6GtoybiisRczmEtPFAM+Ifl6i5DmTKYqeX+Nssj19lUz9N2J4XNxDTiQSkwi4oz6ADU3hLdxb7dwW9RyL5B0FHrltAgZUsEce4eRrmwB3ugCRJ3fk4VvsOwEDHtcWxKeDy4emaWmHdRKdFpvNphQKhdhFmOet42D3sftTJw7X/wHgw/U8h1ywkJ/gYJeI/wi/g8kdmqqqG5Alk62Er+emG7nXBFSr1aroNSNknwOVzZnNS6xIHtFoNF6CweAbpheyLOfo3+ALfrSuzJ1F8EsAAAAASUVORK5CYII=",
            radius: 7,
            radiusList: [
                { name: "500м", value: 500 },
                { name: "1км", value: 1000 },
                { name: "2км", value: 2000 },
                { name: "3км", value: 3000 },
                { name: "4км", value: 4000 },
                { name: "5км", value: 5000 },
                { name: "10км", value: 10000 },
                { name: "20км", value: 20000 },
                { name: "30км", value: 30000 },
                { name: "40км", value: 40000 },
                { name: "50км", value: 50000 },
            ],
            zoom: 15,
            location: {
                lat: 59.931469339578584, lng: 30.295400903735356
            },
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
                strokeColor: '#FF0000',
                strokeOpacity: 1,
                strokeWeight: 2,
                fillColor: '#FFFFFF',
                fillOpacity: 0,
                center: { lat: 59.931469339578584, lng: 30.295400903735356 },
                radius: 15000
            },
        }
    },
    computed: {

    },
    methods: {
        minusRadius() {
            if (this.radius !== 0) {
                this.radius -= 1;
                this.$refs.gCircleRadius.circle.setRadius(this.radiusList[this.radius].value)
            }
        },
        plusRadius() {
            if (this.radius !== this.radiusList.length - 1) {
                this.radius += 1;
                this.$refs.gCircleRadius.circle.setRadius(this.radiusList[this.radius].value)
            }
        },
    },

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
