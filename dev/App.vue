<template>
  <div id="app">
    <div class="wrapper">
      <NumberAnimate
        :number="number"
        @finish="finish"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      number: 123456789.987654321
    }
  },

  methods: {
    finish () {
      console.log(`Number animate finished`)
    }
  },

  created () {
    setInterval(() => {
      const len = ~~(Math.random() * 10) + 4
      this.number = Math.random() * (10 ** len)
    }, 5e3)
  }
}
</script>

<style>
@font-face {
  font-family: digit;
  src: url("digital.ttf") format("truetype");
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
#app {
  position: relative;
  min-height: 100%;
}

#app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #141e30; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #243b55,
    #141e30
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #243b55,
    #141e30
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.wrapper {
  color: #fff;
  font-family: digit;
}
</style>
