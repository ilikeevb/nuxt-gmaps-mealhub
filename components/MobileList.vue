<template>
    <div class="list">
        <div v-if="items.length" class="mobile-cards-list">
            <Card v-for="item in items" :key="item.id" :data="item" />
        </div>
        <div v-else class="empty-card-list">
            <CardInfo />
        </div>
    </div>
</template>

<script>
export default {
    name: 'MobileListComponent',
    data() {
        return {
            requestCheck: true,
        }
    },
    computed: {
        items() {
            return this.$store.getters.GET_ITEMS;
        },
    },
    watch: {
        items() {
            this.requestCheck = true;
        }
    },
    mounted() {

    }
}
</script>

<style lang="scss" scoped>
.list {
    padding: 10px;
}

.mobile-cards-list {
    width: calc(100vw - 20px);
    height: 100%;
    display: flex;
    gap: 10px;

    overflow-y: scroll;

    scrollbar-width: none; // Скрыть scrollbar для Firefox
    -ms-overflow-style: none; // Скрыть scrollbar для Internet Explorer и Edge
}

.empty-card-list {
    width: calc(100vw - 20px);
    flex-shrink: 0;
    display: flex;
    justify-content: center;
}

.mobile-cards-list * {
    flex-shrink: 0;
}

.mobile-cards-list::-webkit-scrollbar {
    display: none; // Скрыть scrollbar для Chrome, Safari, и Opera
}
</style>