import GUI from 'lil-gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons'
// import bakedShadowImage from '~/assets/textures/bakedShadow.jpg'
import simpleShadowImage from '~/assets/textures/simpleShadow.jpg'
import '../style/index.css'

// TextureLoader
const textureLoader = new THREE.TextureLoader()
// const bakedShadowTexture = textureLoader.load(bakedShadowImage)
const simpleShadowMaterial = textureLoader.load(simpleShadowImage)

/**
 * Base
 */
// Debug
const gui = new GUI({
  title: '调试面板',
})

const ambientLightFolder = gui.addFolder('环境光')
const spotLightFolder = gui.addFolder('聚光灯')
const directionalLightFolder = gui.addFolder('定向光')
const pointLightFolder = gui.addFolder('点光源')
const helperFolder = gui.addFolder('助手')
const materialFolder = gui.addFolder('材质')

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.4)
ambientLightFolder.add(ambientLight, 'intensity').min(0).max(3).step(0.001).name('强度')
scene.add(ambientLight)

// Spot light
const spotLight = new THREE.SpotLight(0xFFFFFF, 10, 10, Math.PI * 0.3)
spotLight.castShadow = true
spotLight.shadow.mapSize.width = 2 ** 10
spotLight.shadow.mapSize.height = 2 ** 10
spotLight.shadow.camera.fov = 30
spotLight.shadow.camera.near = 1
spotLight.shadow.camera.far = 6
spotLight.position.set(0, 2, 2)
spotLightFolder.add(spotLight, 'intensity').min(0).max(10).step(0.1).name('强度')

scene.add(spotLight)
scene.add(spotLight.target)

const spotLightShadowCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera)
spotLightShadowCameraHelper.visible = false
scene.add(spotLightShadowCameraHelper)

const spotLightHelper = new THREE.SpotLightHelper(spotLight)
spotLightHelper.visible = false
scene.add(spotLightHelper)

// Point light
const pointLight = new THREE.PointLight(0xFFFFFF, 1)
pointLight.castShadow = true
pointLight.shadow.mapSize.width = 2 ** 10
pointLight.shadow.mapSize.height = 2 ** 10
pointLight.shadow.camera.near = 0.1
pointLight.shadow.camera.far = 5
pointLight.position.set(-1, 1, 0)

pointLightFolder.add(pointLight, 'intensity').min(0).max(3).step(0.1).name('强度')
scene.add(pointLight)

const pointLightHelper = new THREE.PointLightHelper(pointLight)
pointLightHelper.visible = false
scene.add(pointLightHelper)

const pointLightShadowCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera)
pointLightShadowCameraHelper.visible = false
scene.add(pointLightShadowCameraHelper)

// Directional light
const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.4)
directionalLight.position.set(2, 2, -1)
directionalLightFolder.add(directionalLight, 'intensity').min(0).max(3).step(0.001).name('强度')
directionalLightFolder.add(directionalLight.position, 'x').min(-5).max(5).step(0.001).name('x')
directionalLightFolder.add(directionalLight.position, 'y').min(-5).max(5).step(0.001).name('y')
directionalLightFolder.add(directionalLight.position, 'z').min(-5).max(5).step(0.001).name('z')
scene.add(directionalLight)

directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 2 ** 10
directionalLight.shadow.mapSize.height = 2 ** 10
// 框定阴影镜头的前后
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 6
// 框定阴影镜头的左右上下，这可以让阴影更清晰
directionalLight.shadow.camera.left = -2
directionalLight.shadow.camera.right = 2
directionalLight.shadow.camera.top = 2
directionalLight.shadow.camera.bottom = -2
directionalLight.shadow.radius = 10
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 1)
directionalLightHelper.visible = false
scene.add(directionalLightHelper)

const directionalLightShadowCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
directionalLightShadowCameraHelper.visible = false
scene.add(directionalLightShadowCameraHelper)

helperFolder.add(directionalLightHelper, 'visible').name('定向光助手显示')
helperFolder.add(directionalLightShadowCameraHelper, 'visible').name('定向光阴影相机助手显示')
helperFolder.add(spotLightHelper, 'visible').name('聚光灯助手显示')
helperFolder.add(spotLightShadowCameraHelper, 'visible').name('聚光灯阴影相机助手显示')
helperFolder.add(pointLightHelper, 'visible').name('点光源助手显示')
helperFolder.add(pointLightShadowCameraHelper, 'visible').name('点光源阴影相机助手显示')

/**
 * Materials
 */
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.7
materialFolder.add(material, 'metalness').min(0).max(1).step(0.001).name('金属度')
materialFolder.add(material, 'roughness').min(0).max(1).step(0.001).name('粗糙度')

/**
 * Objects
 */
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 32, 32),
  material,
)
sphere.castShadow = true
sphere.receiveShadow = false

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(5, 5),
  // 烘焙阴影
  // new THREE.MeshBasicMaterial({ map: bakedShadowTexture }),
  material,
)
plane.rotation.x = -Math.PI * 0.5
plane.position.y = -0.5
plane.castShadow = true
plane.receiveShadow = true

scene.add(sphere, plane)

const sphereShadow = new THREE.Mesh(
  new THREE.PlaneGeometry(1.5, 1.5),
  new THREE.MeshBasicMaterial({
    color: 0x000000,
    alphaMap: simpleShadowMaterial,
    transparent: true,
  }),
)

sphereShadow.rotation.x = -Math.PI * 0.5
sphereShadow.position.y = plane.position.y + 0.01

scene.add(sphereShadow)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.shadowMap.enabled = true

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Animate
 */
const clock = new THREE.Clock()

function tick() {
  const elapsedTime = clock.getElapsedTime()

  sphere.position.x = Math.cos(elapsedTime) * 1.5
  sphere.position.z = Math.sin(elapsedTime) * 1.5
  sphere.position.y = Math.abs(Math.sin(elapsedTime * 3))

  sphereShadow.position.x = sphere.position.x
  sphereShadow.position.z = sphere.position.z
  sphereShadow.material.opacity = (1 - sphere.position.y) * 0.3

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
