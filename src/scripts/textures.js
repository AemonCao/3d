import * as THREE from 'three'
import { OrbitControls } from 'three/addons'
import diamondOreImage from './../assets/MC/钻石矿石.png'
import '../style/index.css'

const loadingManager = new THREE.LoadingManager()
loadingManager.onStart = (_url, _loaded, _total) => console.log('Loading started')
loadingManager.onProgress = (_url, _loaded, _total) => console.log('Loading in progress')
loadingManager.onLoad = () => console.log('Loading finished')
loadingManager.onError = _url => console.log('Loading error')

const textureLoader = new THREE.TextureLoader(loadingManager)

const diamondOreTexture = textureLoader.load(diamondOreImage)

diamondOreTexture.generateMipmaps = false
diamondOreTexture.minFilter = THREE.NearestFilter
diamondOreTexture.magFilter = THREE.NearestFilter

const canvas = document.querySelector('canvas.webgl')

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const scene = new THREE.Scene()
const group = new THREE.Group()

scene.add(group)

const geometry = new THREE.BoxGeometry(1, 1, 1)
const cube = new THREE.Mesh(
  // new THREE.BoxGeometry(1, 1, 1, 2, 2, 2),
  // new THREE.SphereGeometry(1, 32, 32),
  // new THREE.ConeGeometry(1, 1, 32),
  // new THREE.TorusGeometry(1, 0.35, 32, 32),
  geometry,
  new THREE.MeshBasicMaterial({ map: diamondOreTexture }),
)

group.add(cube)

// Axes helper
const axesHelper = new THREE.AxesHelper(1)
scene.add(axesHelper)

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
camera.lookAt(group.position)
scene.add(camera)

const orbitControls = new OrbitControls(camera, canvas)
orbitControls.enableDamping = true
scene.add(orbitControls.object)

const renderer = new THREE.WebGLRenderer({
  canvas,
})
renderer.setSize(sizes.width, sizes.height)

function render() {
  orbitControls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(render)
}

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

render()
