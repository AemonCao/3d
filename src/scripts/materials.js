import GUI from 'lil-gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons'
import doorAmbientOcclusionImage from './../assets/Door_Wood_001_SD/Door_Wood_001_ambientOcclusion.jpg'
import doorColorImage from './../assets/Door_Wood_001_SD/Door_Wood_001_basecolor.jpg'
import doorHeightImage from './../assets/Door_Wood_001_SD/Door_Wood_001_height.png'
import doorMetallicImage from './../assets/Door_Wood_001_SD/Door_Wood_001_metallic.jpg'
import doorNormalImage from './../assets/Door_Wood_001_SD/Door_Wood_001_normal.jpg'
import doorOpacityImage from './../assets/Door_Wood_001_SD/Door_Wood_001_opacity.jpg'
import doorRoughnessImage from './../assets/Door_Wood_001_SD/Door_Wood_001_roughness.jpg'
import gradientImage from './../assets/gradients/5.jpg'
import matcapImage from './../assets/matcaps/7.png'
import './../style/index.css'

const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load(doorColorImage)
const doorOpacityTexture = textureLoader.load(doorOpacityImage)
const doorAmbientOcclusionTexture = textureLoader.load(doorAmbientOcclusionImage)
const doorHeightTexture = textureLoader.load(doorHeightImage)
const doorNormalTexture = textureLoader.load(doorNormalImage)
const doorRoughnessTexture = textureLoader.load(doorRoughnessImage)
const doorMetallicTexture = textureLoader.load(doorMetallicImage)
const matcapTexture = textureLoader.load(matcapImage)
const gradientTexture = textureLoader.load(gradientImage)
gradientTexture.minFilter = THREE.NearestFilter
gradientTexture.magFilter = THREE.NearestFilter
gradientTexture.generateMipmaps = false

const gui = new GUI({
  closeFolders: true,
  width: 300,
})

const debugObject = {
  materialMetalness: 0.45,
  materialRoughness: 0.65,
}

const canvas = document.querySelector('canvas.webgl')

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const scene = new THREE.Scene()

// const material = new THREE.MeshBasicMaterial({
//   alphaMap: doorOpacityTexture,
//   map: doorColorTexture,
//   side: THREE.DoubleSide,
//   transparent: true,
// })

// const material = new THREE.MeshNormalMaterial({
//   flatShading: true,
// })

// const material = new THREE.MeshMatcapMaterial({
//   matcap: matcapTexture,
// })

// const material = new THREE.MeshDepthMaterial()

const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xFFFFFF, 80)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

// const material = new THREE.MeshLambertMaterial()

// const material = new THREE.MeshPhongMaterial({
//   shininess: 100,
//   specular: 0x1188FF,
// })

// const material = new THREE.MeshToonMaterial({
//   gradientMap: gradientTexture,
// })

const material = new THREE.MeshStandardMaterial({
  metalness: debugObject.materialMetalness,
  roughness: debugObject.materialRoughness,
})

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1),
  material,
)

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  material,
)

sphere.position.x = -1.5

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 16, 32),
  material,
)

torus.position.x = 1.5

scene.add(plane, sphere, torus)

const group = new THREE.Group()

scene.add(group)

const materialFolder = gui.addFolder('Material')
materialFolder.open()

materialFolder
  .add(material, 'metalness')
  .min(0)
  .max(1)
  .step(0.01)
  .name('金属度')

materialFolder
  .add(material, 'roughness')
  .min(0)
  .max(1)
  .step(0.01)
  .name('粗糙度')

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

const clock = new THREE.Clock()

function tick() {
  const elapsedTime = clock.getElapsedTime()

  sphere.rotation.y = elapsedTime * 0.1
  plane.rotation.y = elapsedTime * 0.1
  torus.rotation.y = elapsedTime * 0.1

  sphere.rotation.x = elapsedTime * 0.15
  plane.rotation.x = elapsedTime * 0.15
  torus.rotation.x = elapsedTime * 0.15

  orbitControls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}

tick()
