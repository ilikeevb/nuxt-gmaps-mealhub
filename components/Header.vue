<template>
    <div class="header">
        <img src="~@/assets/logo.png" />
    </div>
</template>

<script>
export default {
    name: 'HeaderComponent',
}
</script>

<style lang="scss" scoped>
.header {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 44px;
    background: #FFFFFF;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

    img {
        width: 60px;
        height: 28px;
    }
}
</style>