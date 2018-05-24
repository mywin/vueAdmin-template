import { mapActions } from 'vuex'

const { body } = document
const WIDTH = 1024
const RATIO = 3

export default {
  watch: {
    $route(route) {
      if (this.device === 'mobile' && this.sidebar.opened) {
        this.closeSideBar({ withoutAnimation: false })
      }
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.resizeHandler)
  },
  mounted() {
    const isMobile = this.isMobile()
    if (isMobile) {
      this.toggleDevice('mobile')
      this.closeSideBar({ withoutAnimation: true })
    }
  },
  methods: {
    ...mapActions({
      toggleDevice: 'app/ToggleDevice',
      closeSideBar: 'app/CloseSideBar'
    }),
    isMobile() {
      const rect = body.getBoundingClientRect()
      return rect.width - RATIO < WIDTH
    },
    resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.isMobile()
        this.toggleDevice(isMobile ? 'mobile' : 'desktop')
        if (isMobile) {
          this.closeSideBar({ withoutAnimation: true })
        }
      }
    }
  }
}
