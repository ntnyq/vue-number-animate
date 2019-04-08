<template>
  <div :class="bem('wrap')">
    <div :class="bem('inner')">
      <template v-for="(item, index) in valueArr">
        <div
          v-if="/^\d$/.test(item)"
          :data-target="item"
          :class="bem('num')"
          :key="index"
        >
          <span
            v-for="str in numbers"
            :class="bem('span')"
            :key="str"
          >
            {{ str }}
          </span>
        </div>
        <div
          v-else
          :class="bem('symbol')"
          :key="index"
        >
          {{ item }}
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import anime from 'animejs'
import {
  formatNumber,
  isNumber
} from './utils'

export default {
  name: 'NumberAnimate',

  props: {
    number: {
      type: Number,
      default: 0,
      validator: isNumber
    },

    duration: {
      type: Number,
      default: 1e3,
      validator: isNumber
    },

    autoplay: {
      type: Boolean,
      default: true
    },

    separator: {
      type: String,
      default: ','
    },

    decimal: {
      type: String,
      default: '.'
    },

    decimals: {
      type: Number,
      default: 0,
      validator: isNumber
    },

    paused: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    value () {
      return formatNumber(this.number, 0)
    }
  },

  data () {
    return {
      valueArr: [],
      numbers: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']
    }
  },

  methods: {
    anime () {
      const nodeList = Array.from(this.$el.querySelectorAll(`.${this.bem('num')}`))

      nodeList.forEach((el, index) => {
        const { target } = el.dataset
        const idx = this.numbers.indexOf(target) || 0

        anime({
          targets: el,
          translateY: -1 * idx * el.clientHeight / this.numbers.length,
          duration: this.duration,
          easing: 'easeOutSine'
        })
      })
    },

    bem (mod) {
      return `num-anime__${mod}`
    },

    init () {
      this.valueArr = [].slice.call(this.value)
      this.$nextTick(this.anime)
    }
  },

  watch: {
    number: 'init'
  },

  mounted () {
    this.init()
  }
}
</script>
