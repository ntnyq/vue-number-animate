import NumberAnimateComponent from './NumberAnimate.vue'

const NumberAnimatePlugin = {
  get version () {
    return process.env.VUE_APP_VERSION
  },

  installed: false,

  install (Vue, options) {
    if (this.installed) return false

    this.installed = true

    Vue.component(NumberAnimateComponent.name, {
      functional: true,

      props: {
        options: {
          type: Object,
          required: false,
          default: () => ({})
        }
      },

      render (h, { data, props }) {
        return h(NumberAnimateComponent, {
          ...data,
          props: {
            options: Object.assign({}, options, props.options)
          }
        })
      }
    })
  },

  NumberAnimateComponent
}

export { NumberAnimateComponent }

export default NumberAnimatePlugin

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(NumberAnimatePlugin)
}
