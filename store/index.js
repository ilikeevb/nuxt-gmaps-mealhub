export const state = () => ({
    currentCard: null,
    items: [],
    currentPage: null,
    lastPage: null,
    location: null,
    radius: null,
    computeDistanceFunction: null,
    checkGetNextPageItems: true
})

export const getters = {
    GET_ITEMS: state => {
        return state.items;
    },
    GET_CURRENT_CARD: state => {
        return state.currentCard;
    },
    GET_COMPUTE_DISTANCE_FUNCTION: state => location => {
        return Math.round(state.computeDistanceFunction(state.location, location));
    }
}

export const mutations = {
    SWITCH_GET_NEXT_PAGE_ITEMS(check) {
        state.checkGetNextPageItems = check;
    },
    ADD_ITEMS(state, items) {
        for (let item of items) {
            state.items.push(item)
        }
    },
    SET_CURRENT_CARD(state, currentCard) {
        state.currentCard = currentCard;
    },
    SET_ITEMS(state, items) {
        state.items = items;
    },
    SET_CURRENT_PAGE(state, currentPage) {
        state.currentPage = currentPage;
    },
    SET_LAST_PAGE(state, lastPage) {
        state.lastPage = lastPage;
    },
    SET_LOCATION_AND_RADIUS(state, data) {
        state.location = data.location;
        state.radius = data.radius;
    },
    SET_COMPUTE_DISTANCE(state, computeDistanceFunction) {
        state.computeDistanceFunction = computeDistanceFunction;
    },
}

export const actions = {
    async GET_ITEMS(context, payload) {
        context.commit('SET_ITEMS', []);

        const url = "https://dev.api.mealhub.group/api/ru/search"
        const params = `?latitude=${payload.latitude}&longitude=${payload.longitude}&radius=${payload.radius}&limit=10&page=1`

        await this.$axios.get(url + params)
            .then(items => {
                context.commit('SET_ITEMS', items.data.items);
                context.commit('SET_CURRENT_PAGE', items.data.current_page);
                context.commit('SET_LAST_PAGE', items.data.last_page);
                context.state.checkGetNextPageItems = true;
            })
            .catch(function (error) {
                console.log("Ошибка: ", error)
            });
    },
    async GET_ITEMS_FROM_NEXT_PAGE(context) {
        if ((context.state.currentPage + 1 <= context.state.lastPage) && context.state.checkGetNextPageItems) {
            context.commit('SWITCH_GET_NEXT_PAGE_ITEMS', false);
            const latitude = typeof context.state.location.lat == 'function' ? context.state.location.lat() : context.state.location.lat;
            const longitude = typeof context.state.location.lng == 'function' ? context.state.location.lng() : context.state.location.lng;
            const radius = context.state.radius;

            const url = "https://dev.api.mealhub.group/api/ru/search"
            const params = `?latitude=${latitude}&longitude=${longitude}&radius=${radius}&limit=10&page=${context.state.currentPage + 1}`

            await this.$axios.get(url + params)
                .then(items => {
                    context.commit('ADD_ITEMS', items.data.items);
                    context.commit('SET_CURRENT_PAGE', items.data.current_page);
                    context.commit('SET_LAST_PAGE', items.data.last_page);
                    context.commit('SWITCH_GET_NEXT_PAGE_ITEMS', true);

                })
                .catch(function (error) {
                    console.log("Ошибка: ", error)
                });
        }
    }
}
