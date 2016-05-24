import { observable, computed } from 'mobx'
import validator from 'validator'
import { classicStyle } from '../utils'

export const store = new class Store {
  // HTML
  @observable height = window.innerHeight
  @observable width = window.innerWidth

  // Search
  @observable search = ''
  @observable results = []
  @observable selection = 0

  // MapboxGL Token
  @observable access_token = ''
  @observable server = ''
  @observable token = 'pk.eyJ1IjoicGFjZ2VvIiwiYSI6ImE2ZmE3YTQyNmRjNTVmYTAxMWE2YWZlNGFjZjMzZWVhIn0.wRU0txw3VIEOVtyc8PCYdQ'

  // Position (Click)
  @observable positionLat = 0
  @observable positionLng = 0

  // Map
  @observable mapId = 'map'
  @observable mapMove = false
  @observable zoom = 12
  @observable lat = 43.650128
  @observable lng = -79.382185
  @observable bearing = 0.0
  @observable pitch = 0.0
  @observable mapStyle = 0

  // MapMini
  @observable mapMiniId = 'mapMiniId'
  @observable mapMiniMove = false
  @observable mapMiniActive = true
  @observable mapMiniZoomOffset = -5
  @observable mapMiniStyle = 1

  // MapRight
  @observable mapRightId = 'mapRightId'
  @observable mapRightMove = false
  @observable mapRightActive = true
  @observable mapRightStyle = 1

  tiel = '#4AC7B0'
  grey = '#494141'
  salmon = '#FB7461'
  lightGrey = '#E6E6DD'
  mediumGrey = '#B9BDB1'
  lightBlue = '#ACC6CB'

  constructor() {
    window.addEventListener('resize', this.listenerResize.bind(this))
  }

  @computed get styleMax() {
    return Object.keys(this.styleTable).length - 1
  }

  @computed get isXs() {
    return this.width < 768
  }

  @computed get isSm() {
    return 768 <= this.width && this.width < 992
  }

  @computed get isMd() {
    return 992 <= this.width && this.width < 1200
  }

  @computed get isLg() {
    return this.width >= 1200
  }

  @computed get sizeText() {
    return this.sizeTable[this.size][this.orientation]
  }

  @computed get materialText() {
    return this.materialTable[this.material]
  }

  @computed get orientationText() {
    return this.orientationTable[this.orientation]
  }

  @computed get emailValid() {
    return validator.isEmail(this.email)
  }

  listenerResize(e) {
    this.height = window.innerHeight
    this.width = window.innerWidth
  }
}
