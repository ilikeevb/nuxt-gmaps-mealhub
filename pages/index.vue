<template>
  <div class="container">
    <Header id="header" />
    <List id="list" />
    <Map />
    <MobileList id="mobile-list" />
  </div>
</template>

<script>

export default {
  name: "IndexPage",
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

@media screen and (max-width: 800px) {

  .GMap,
  .GMap__Wrapper {
    // Высота окна браузера - 44px шапка
    height: calc(100vh - 44px) !important;
  }
}

.reset-body {
  margin: 0;
}
</style>

<style lang="scss" scoped>
.container {
  display: grid;
  position: relative;
  grid-template-columns: 375px 1fr;
  max-height: 100vh;
}

#mobile-list {
  position: absolute;
  bottom: 0;
}

@media screen and (min-width: 800px) {

  #header,
  #mobile-list {
    display: none;
  }


  #list {
    display: block;
  }
}

@media screen and (max-width: 800px) {

  #header,
  #mobile-list {
    display: flex;
  }

  #list {
    display: none;
  }

  .container {
    display: grid;
    grid-template-columns: 1fr;
  }
}
</style>
