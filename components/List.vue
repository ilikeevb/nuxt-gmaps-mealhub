<template>
    <div class="list">
        <Header />
        <div v-if="items.length" class="cards-list">
            <Card v-for="item in items" :key="item.id" :data="item" />
        </div>
        <div v-else class="cards-list">
            <CardInfo />
        </div>
    </div>
</template>

<script>
export default {
    name: 'ListComponent',
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
        let list = document.querySelector(".cards-list")
        list.addEventListener("scroll", () => {
            if ((list.scrollHeight - 220 < list.scrollTop + list.clientHeight) && this.requestCheck) {
                this.requestCheck = false;
                this.$store.dispatch("GET_ITEMS_FROM_NEXT_PAGE");
            }
        })
    }
}
</script>

<style lang="scss" scoped>
.list {
    background: url('@/assets/pattern.png') repeat;
    background-color: #F2F2F2;
    box-shadow: 5px 0px 5px rgba(0, 0, 0, 0.1);
}

.cards-list {
    // Высота списка = высота окна браузера - 44px шапка - 20px padding по оси y 
    height: calc(100vh - 64px);

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    padding: 10px 16px;

    // Скролл карточек
    overflow-y: scroll;
    scrollbar-width: none; // Скрыть scrollbar для Firefox
    -ms-overflow-style: none; // Скрыть scrollbar для Internet Explorer и Edge
}

.cards-list::-webkit-scrollbar {
    display: none; // Скрыть scrollbar для Chrome, Safari, и Opera
}
</style>