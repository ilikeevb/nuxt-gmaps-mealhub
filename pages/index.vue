<template>
  <div>
    <Map style="" />
  </div>
</template>

<script>

export default {
  name: "IndexPage",
  data() {
    return {};
  },
  head() {
    return {
      bodyAttrs: {
        class: "reset-body"
      }
    };
  },
}
</script>

<style lang="scss">
.GMap,
.GMap__Wrapper {
  height: 100vh !important;
}

.zoom__controls {
  width: 52px;
  height: 115px;
  margin: 20px 20px 0 0;
}

.reset-body {
  margin: 0;
}
</style>
