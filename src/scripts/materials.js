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
const cubeTextureLoader = new THREE.CubeTextureLoader()

const doorColorTexture = textureLoader.load(doorColorImage)
const doorOpacityTexture = textureLoader.load(doorOpacityImage)
const doorAmbientOcclusionTexture = textureLoader.load(doorAmbientOcclusionImage)
const doorHeightTexture = textureLoader.load(doorHeightImage)
const doorNormalTexture = textureLoader.load(doorNormalImage)
const doorRoughnessTexture = textureLoader.load(doorRoughnessImage)
const doorMetallicTexture = textureLoader.load(doorMetallicImage)
const matcapTexture = textureLoader.load(matcapImage)
const gradientTexture = textureLoader.load(gradientImage)
// 环境贴图
const environmentMapTexture = cubeTextureLoader
  .setPath('/src/assets/environmentMap/0/')
  .load([
    'px.png',
    'nx.png',
    'py.png',
    'ny.png',
    'pz.png',
    'nz.png',
  ])

gradientTexture.minFilter = THREE.NearestFilter
gradientTexture.magFilter = THREE.NearestFilter
gradientTexture.generateMipmaps = false

const gui = new GUI({
  closeFolders: true,
  width: 300,
  title: 'Controls 控制',
})

const debugObject = {
  plane: {
    subdivisions: 128,
  },
  material: {
    normalScale: 1,
  },
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

// const material = new THREE.MeshStandardMaterial({
//   wireframe: false,

//   map: doorColorTexture,

//   aoMap: doorAmbientOcclusionTexture,
//   aoMapIntensity: 1,

//   displacementMap: doorHeightTexture,
//   displacementScale: 0.05,

//   metalness: 0,
//   metalnessMap: doorMetallicTexture,

//   roughness: 1,
//   roughnessMap: doorRoughnessTexture,

//   normalMap: doorNormalTexture,
//   normalScale: new THREE.Vector2(debugObject.material.normalScale, debugObject.material.normalScale),

//   alphaMap: doorOpacityTexture,
//   transparent: true,
// })

const material = new THREE.MeshStandardMaterial({
  metalness: 1,
  roughness: 0,
  envMap: environmentMapTexture,
  side: THREE.DoubleSide,
})

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1, debugObject.plane.subdivisions, debugObject.plane.subdivisions),
  material,
)

plane.geometry.setAttribute(
  'uv2',
  new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2),
)

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 64, 64),
  material,
)

sphere.geometry.setAttribute(
  'uv2',
  new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2),
)

sphere.position.x = -1.5

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 64, 128),
  material,
)

torus.geometry.setAttribute(
  'uv2',
  new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2),
)

torus.position.x = 1.5

scene.add(plane, sphere, torus)

const group = new THREE.Group()

scene.add(group)

const materialFolder = gui.addFolder('Material 材质')
materialFolder.open()

materialFolder.add(material, 'wireframe').name('线框')

materialFolder.add(material, 'metalness').min(0).max(1).step(0.0001).name('金属度')

materialFolder.add(material, 'roughness').min(0).max(1).step(0.0001).name('粗糙度')

materialFolder.add(material, 'aoMapIntensity').min(0).max(10).step(0.01).name('环境光遮蔽强度')

materialFolder.add(material, 'displacementScale').min(0).max(1).step(0.0001).name('位移强度')

materialFolder.add(debugObject.material, 'normalScale').min(0).max(10).step(0.01).name('法线强度').onChange(() => {
  material.normalScale.set(debugObject.material.normalScale, debugObject.material.normalScale)
})

const planeFolder = gui.addFolder('Plane 平面')
planeFolder.open()

planeFolder.add(debugObject.plane, 'subdivisions').min(1).max(1024).step(1).name('细分').onChange(() => {
  plane.geometry.dispose()
  plane.geometry = new THREE.PlaneGeometry(1, 1, debugObject.plane.subdivisions, debugObject.plane.subdivisions)
  plane.geometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2),
  )
})

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
