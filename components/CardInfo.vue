<template>
    <div class="card">
        <p>{{ text }}</p>
    </div>
</template>

<script>
export default {
    name: 'CardInfoComponent',
    props: {
        text: {
            type: String,
            default: "Упс! Ничего не нашлось \n Попробуйте поменять условия поиска ",
        },
    },
}
</script>

<style lang="scss" scoped>
.card {
    width: 328px;
    height: 110px;
    
    display: flex;
    align-items: center;
    justify-content: center;
    
    background: #FFFFFF;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;

    font-family: $font-stack;
    color: $text-color;

    font-size: 12px;
    line-height: 15px;

    p {
        padding: 10px;
        text-align: center;
        white-space: pre-wrap; 
    }
}
</style>