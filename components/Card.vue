<template>
    <div @click="clickCard" class="card">
        <div class="card_image">
            <!--
                <img :src="data.image" />
            -->
            <img src="https://i.pinimg.com/236x/2a/7b/75/2a7b755b72fcc5a23e3d0ca159d8eec7--bakery-cafe-cafe-bar.jpg" />
        </div>
        <div class="card_content">
            <span class="title">{{ data.name }}</span>
            <span class="address">
                {{ correctAddress(data.address) }}
            </span>
            <div class="rating">
                <div class="rating_stars">
                    <img src="~@/assets/star.svg" v-for="star in Math.floor(data.rating)" :key="'star-' + star" />
                    <img src="~@/assets/star-disabled.svg" v-for="star in (5 - Math.floor(data.rating))"
                        :key="'star-disabled-' + star" />
                </div>
                <span>{{ data.rating }}</span>
                <span>Отзывов {{ data.reviewsCount }}</span>
            </div>
            <div class="info">
                <div class="time">
                    <img src="~@/assets/clock.svg" />
                    <span v-if="data.opened">Открыто</span>
                    <span v-else>Закрыто</span>
                </div>
                <div class="distance">
                    <img src="~@/assets/walk.svg" />
                    <span>{{ distance(data.latitude, data.longitude) }}м</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CardComponent',
    props: {
        data: {
            type: Object,
        },
    },
    computed: {
        distance() {
            return (latitude, longitude) => this.$store.getters.GET_COMPUTE_DISTANCE_FUNCTION({ lat: Number(latitude), lng: Number(longitude) });
        },
    },
    methods: {
        correctAddress(address) {
            let result = [];
            for (let item in address) {
                if (address[item] && item !== "country_id") result.push(address[item])
            }
            return result.join(", ");
        },
        clickCard() {
            this.$store.commit("SET_CURRENT_CARD", this.data);
        }
    }
}
</script>

<style lang="scss" scoped>
.card {
    display: flex;
    width: 328px;
    height: 110px;
    background: #FFFFFF;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
}

.card_image img {
    width: 110px;
    height: 110px;

    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
}

.card_content {
    display: flex;
    flex-direction: column;
    gap: 5px;

    width: 100%;
    padding: 10px;

    font-family: $font-stack;
    color: $text-color;

    font-size: 12px;
    line-height: 15px;
}

.title {
    font-weight: 700;
}

.address {
    font-weight: 400;

}

.rating {
    display: flex;
    gap: 5px;
    align-items: center;
    font-weight: 400;

    .rating_stars {
        display: flex;
    }
}

.info {
    display: flex;
    align-items: flex-start;
    gap: 10px;

    div {
        display: flex;
        align-items: center;
        gap: 7px;
    }
}
</style>