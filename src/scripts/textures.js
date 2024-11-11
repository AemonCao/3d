import * as THREE from 'three'
import { OrbitControls } from 'three/addons'
import doorAmbientOcclusionImage from './../assets/Door_Wood_001_SD/Door_Wood_001_ambientOcclusion.jpg'
import doorBaseColorImage from './../assets/Door_Wood_001_SD/Door_Wood_001_basecolor.jpg'
import doorHeightImage from './../assets/Door_Wood_001_SD/Door_Wood_001_height.png'
import doorMetallicImage from './../assets/Door_Wood_001_SD/Door_Wood_001_metallic.jpg'
import doorNormalImage from './../assets/Door_Wood_001_SD/Door_Wood_001_normal.jpg'
import doorOpacityImage from './../assets/Door_Wood_001_SD/Door_Wood_001_opacity.jpg'
import doorRoughnessImage from './../assets/Door_Wood_001_SD/Door_Wood_001_roughness.jpg'

import '../style/index.css'

const loadingManager = new THREE.LoadingManager()
loadingManager.onStart = (_url, _loaded, _total) => console.log('Loading started')
loadingManager.onProgress = (_url, _loaded, _total) => console.log('Loading in progress')
loadingManager.onLoad = () => console.log('Loading finished')
loadingManager.onError = _url => console.log('Loading error')

const textureLoader = new THREE.TextureLoader(loadingManager)

const colorTexture = textureLoader.load(doorBaseColorImage)
const alphaTexture = textureLoader.load(doorOpacityImage)
const heightTexture = textureLoader.load(doorHeightImage)
const normalTexture = textureLoader.load(doorNormalImage)
const ambientOcclusionTexture = textureLoader.load(doorAmbientOcclusionImage)
const metalnessTexture = textureLoader.load(doorMetallicImage)
const roughnessTexture = textureLoader.load(doorRoughnessImage)

const canvas = document.querySelector('canvas.webgl')

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const scene = new THREE.Scene()
const group = new THREE.Group()

scene.add(group)

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1, 2, 2, 2),
  new THREE.MeshBasicMaterial({ map: colorTexture }),
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
