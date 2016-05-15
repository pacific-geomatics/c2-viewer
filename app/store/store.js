import { observable, computed } from 'mobx'
import validator from 'validator'


export const store = new class Store {
  // HTML
  @observable height = window.innerHeight
  @observable width = window.innerWidth

  // Search
  @observable search = ''
  @observable results = []
  @observable selection = 0

  // App Options
  @observable orientation = 1
  @observable material = 2
  @observable size = 2
  @observable email = ''
  @observable basePrice = 280

  // Map
  @observable zoom = 12
  @observable lat = 43.650128
  @observable lng = -79.382185
  @observable bearing = 0.0
  @observable pitch = 0.0
  @observable style = 1
  @observable mapId = 'map'
  @observable token = 'pk.eyJ1IjoiYWRkeHkiLCJhIjoiY2lsdmt5NjZwMDFsdXZka3NzaGVrZDZtdCJ9.ZUE-LebQgHaBduVwL68IoQ'

  styleTable = {
    1: 'mapbox://styles/addxy/cin9l0b8d0023b4noejyuc2r7',
    2: 'mapbox://styles/mapbox/outdoors-v9',
    3: 'mapbox://styles/mapbox/satellite-streets-v9'
  }

  sizeTable = {
    1: {1: '24" x 18"', 2: '18" x 24"'},
    2: {1: '36" x 24"', 2: '24" x 36"'},
    3: {1: '42" x 36"', 2: '36" x 42"'}
  }

  materialTable = {
    1: 'Paper',
    2: 'Acrylic',
    3: 'Mirrored'
  }

  orientationTable = {
    1: 'Landscape',
    2: 'Portrait'
  }

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
    return Object.keys(this.styleTable).length
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

  @computed get price() {
    const materialFactor = {
      1: 0.5,
      2: 1,
      3: 2
    }
    const sizeFactor = {
      1: 0.5,
      2: 1,
      3: 1.5
    }
    return this.basePrice * materialFactor[this.material] * sizeFactor[this.size]
  }

  listenerResize(e) {
    this.height = window.innerHeight
    this.width = window.innerWidth
  }
}
