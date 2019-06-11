# vue-number-animate

> 基于 __Vue__ 的数字滚动插件

## Usage

``` js
import 'number-animate/dist/style.css'
import NumberAnimate from 'number-animate'

Vue.use(NumberAnimate)
```

``` vue
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
```
