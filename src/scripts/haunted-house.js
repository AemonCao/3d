// import GUI from 'lil-gui'
import * as THREE from 'three'
import { OrbitControls, Sky } from 'three/addons'
import { Timer } from 'three/addons/misc/Timer.js'
import bushARMTextureImage from '~/assets/bush/leaves_forest_ground_1k/leaves_forest_ground_arm_1k.webp'
import bushColorTextureImage from '~/assets/bush/leaves_forest_ground_1k/leaves_forest_ground_diff_1k.webp'
import bushNormalTextureImage from '~/assets/bush/leaves_forest_ground_1k/leaves_forest_ground_nor_gl_1k.webp'
import doorAmbientOcclusionImage from '~/assets/Door_Wood_001_SD/Door_Wood_001_ambientOcclusion.webp'
import doorColorImage from '~/assets/Door_Wood_001_SD/Door_Wood_001_basecolor.webp'
import doorHeightImage from '~/assets/Door_Wood_001_SD/Door_Wood_001_height.png'
import doorMetallicImage from '~/assets/Door_Wood_001_SD/Door_Wood_001_metallic.webp'
import doorNormalImage from '~/assets/Door_Wood_001_SD/Door_Wood_001_normal.webp'
import doorOpacityImage from '~/assets/Door_Wood_001_SD/Door_Wood_001_opacity.webp'
import doorRoughnessImage from '~/assets/Door_Wood_001_SD/Door_Wood_001_roughness.webp'
import floorAlphaTextureImage from '~/assets/floor/alpha.webp'
import floorARMTextureImage from '~/assets/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_arm_1k.webp'
import floorColorTextureImage from '~/assets/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_diff_1k.webp'
import floorDisplacementTextureImage from '~/assets/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_disp_1k.webp'
import floorNormalTextureImage from '~/assets/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_nor_gl_1k.webp'
import graveARMTextureImage from '~/assets/grave/plastered_stone_wall_1k/plastered_stone_wall_arm_1k.webp'
import graveColorTextureImage from '~/assets/grave/plastered_stone_wall_1k/plastered_stone_wall_diff_1k.webp'
import graveNormalTextureImage from '~/assets/grave/plastered_stone_wall_1k/plastered_stone_wall_nor_gl_1k.webp'
import roofARMTextureImage from '~/assets/roof/roof_slates_02_1k/roof_slates_02_arm_1k.webp'
import roofColorTextureImage from '~/assets/roof/roof_slates_02_1k/roof_slates_02_diff_1k.webp'
import roofNormalTextureImage from '~/assets/roof/roof_slates_02_1k/roof_slates_02_nor_gl_1k.webp'
import wallARMTextureImage from '~/assets/wall/castle_brick_broken_06_1k/castle_brick_broken_06_arm_1k.webp'
import wallColorTextureImage from '~/assets/wall/castle_brick_broken_06_1k/castle_brick_broken_06_diff_1k.webp'
import wallNormalTextureImage from '~/assets/wall/castle_brick_broken_06_1k/castle_brick_broken_06_nor_gl_1k.webp'

/**
 * Base
 */
// Debug
// const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// 纹理
const textureLoader = new THREE.TextureLoader()
const floorAlphaTexture = textureLoader.load(floorAlphaTextureImage)
const floorColorTexture = textureLoader.load(floorColorTextureImage)
const floorARMTexture = textureLoader.load(floorARMTextureImage)
const floorNormalTexture = textureLoader.load(floorNormalTextureImage)
const floorDisplacementTexture = textureLoader.load(floorDisplacementTextureImage)

floorColorTexture.colorSpace = THREE.SRGBColorSpace

floorColorTexture.repeat.set(8, 8)
floorARMTexture.repeat.set(8, 8)
floorNormalTexture.repeat.set(8, 8)
floorDisplacementTexture.repeat.set(8, 8)

floorColorTexture.wrapS = floorColorTexture.wrapT = THREE.RepeatWrapping
floorARMTexture.wrapS = floorARMTexture.wrapT = THREE.RepeatWrapping
floorNormalTexture.wrapS = floorNormalTexture.wrapT = THREE.RepeatWrapping
floorDisplacementTexture.wrapS = floorDisplacementTexture.wrapT = THREE.RepeatWrapping

const wallColorTexture = textureLoader.load(wallColorTextureImage)
const wallARMTexture = textureLoader.load(wallARMTextureImage)
const wallNormalTexture = textureLoader.load(wallNormalTextureImage)

wallColorTexture.colorSpace = THREE.SRGBColorSpace

const roofColorTexture = textureLoader.load(roofColorTextureImage)
const roofARMTexture = textureLoader.load(roofARMTextureImage)
const roofNormalTexture = textureLoader.load(roofNormalTextureImage)

roofColorTexture.colorSpace = THREE.SRGBColorSpace
roofColorTexture.repeat.set(3, 1)
roofARMTexture.repeat.set(3, 1)
roofNormalTexture.repeat.set(3, 1)
roofColorTexture.wrapS = roofARMTexture.wrapS = roofNormalTexture.wrapS = THREE.RepeatWrapping

const bushColorTexture = textureLoader.load(bushColorTextureImage)
const bushARMTexture = textureLoader.load(bushARMTextureImage)
const bushNormalTexture = textureLoader.load(bushNormalTextureImage)

bushColorTexture.colorSpace = THREE.SRGBColorSpace
bushColorTexture.repeat.set(2, 1)
bushARMTexture.repeat.set(2, 1)
bushNormalTexture.repeat.set(2, 1)

bushColorTexture.wrapS = bushARMTexture.wrapS = bushNormalTexture.wrapS = THREE.RepeatWrapping

const graveColorTexture = textureLoader.load(graveColorTextureImage)
const graveARMTexture = textureLoader.load(graveARMTextureImage)
const graveNormalTexture = textureLoader.load(graveNormalTextureImage)

graveColorTexture.colorSpace = THREE.SRGBColorSpace
graveColorTexture.repeat.set(0.3, 0.4)
graveARMTexture.repeat.set(0.3, 0.4)
graveNormalTexture.repeat.set(0.3, 0.4)

const doorColorTexture = textureLoader.load(doorColorImage)
const doorOpacityTexture = textureLoader.load(doorOpacityImage)
const doorAmbientOcclusionTexture = textureLoader.load(doorAmbientOcclusionImage)
const doorHeightTexture = textureLoader.load(doorHeightImage)
const doorNormalTexture = textureLoader.load(doorNormalImage)
const doorRoughnessTexture = textureLoader.load(doorRoughnessImage)
const doorMetallicTexture = textureLoader.load(doorMetallicImage)

doorColorTexture.colorSpace = THREE.SRGBColorSpace

/**
 * House
 */
const houseMeasurements = {
  width: 4,
  height: 2.5,
  depth: 4,
  roof: {
    radius: 3.5,
    height: 1.5,
    radialSegments: 4,
  },
  door: {
    width: 2.2,
    height: 2.2,
  },
}

const house = new THREE.Group()
scene.add(house)

// 墙
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(houseMeasurements.width, houseMeasurements.height, houseMeasurements.depth),
  new THREE.MeshStandardMaterial({
    map: wallColorTexture,
    aoMap: wallARMTexture,
    roughnessMap: wallARMTexture,
    metalnessMap: wallARMTexture,
    normalMap: wallNormalTexture,
  }),
)
walls.position.y = houseMeasurements.height / 2
house.add(walls)

// 屋顶
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(houseMeasurements.roof.radius, houseMeasurements.roof.height, houseMeasurements.roof.radialSegments),
  new THREE.MeshStandardMaterial({
    map: roofColorTexture,
    aoMap: roofARMTexture,
    roughnessMap: roofARMTexture,
    metalnessMap: roofARMTexture,
    normalMap: roofNormalTexture,
  }),
)
roof.position.y = houseMeasurements.height + houseMeasurements.roof.height / 2
// roof.rotation.y = Math.PI * 0.25
roof.rotateY(Math.PI * 0.25)
house.add(roof)

// 门
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(houseMeasurements.door.width, houseMeasurements.door.height, 100, 100),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    transparent: true,
    alphaMap: doorOpacityTexture,
    aoMap: doorAmbientOcclusionTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.15,
    displacementBias: -0.04,
    normalMap: doorNormalTexture,
    roughnessMap: doorRoughnessTexture,
    metalnessMap: doorMetallicTexture,
  }),
)
door.position.y = houseMeasurements.door.height / 2
door.position.z = houseMeasurements.depth / 2 + 0.01
house.add(door)

// 地板
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20, 100, 100),
  new THREE.MeshStandardMaterial({
    transparent: true,
    alphaMap: floorAlphaTexture,
    map: floorColorTexture,
    aoMap: floorARMTexture,
    roughnessMap: floorARMTexture,
    metalnessMap: floorARMTexture,
    normalMap: floorNormalTexture,
    displacementMap: floorDisplacementTexture,
    displacementScale: 0.3,
    displacementBias: -0.2,
  }),
)
floor.rotation.x = -Math.PI * 0.5
scene.add(floor)

// 灌木丛
const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({
  color: '#ccffcc',
  map: bushColorTexture,
  aoMap: bushARMTexture,
  roughnessMap: bushARMTexture,
  metalnessMap: bushARMTexture,
  normalMap: bushNormalTexture,
})

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.setScalar(0.5)
bush1.position.set(0.8, 0.2, 2.2)
bush1.rotation.x = -0.75

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.setScalar(0.25)
bush2.position.set(1.4, 0.1, 2.1)
bush2.rotation.x = -0.75

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.setScalar(0.4)
bush3.position.set(-0.8, 0.1, 2.2)
bush3.rotation.x = -0.75

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.setScalar(0.15)
bush4.position.set(-1, 0.05, 2.6)
bush4.rotation.x = -0.75

house.add(bush1, bush2, bush3, bush4)

// 墓碑
const graveGeometry = new THREE.BoxGeometry(0.6, 1, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({
  map: graveColorTexture,
  aoMap: graveARMTexture,
  roughnessMap: graveARMTexture,
  metalnessMap: graveARMTexture,
  normalMap: graveNormalTexture,
})

const graves = new THREE.Group()
scene.add(graves)

for (let i = 0; i < 30; i++) {
  const angle = Math.random() * Math.PI * 2
  const radius = 3 + Math.random() * 4
  const x = Math.sin(angle) * radius
  const z = Math.cos(angle) * radius
  const y = Math.random() * 0.4
  const grave = new THREE.Mesh(graveGeometry, graveMaterial)
  grave.position.x = x
  grave.position.y = y
  grave.position.z = z
  grave.rotation.x = (Math.random() - 0.5) * 0.4
  grave.rotation.y = (Math.random() - 0.5) * 0.4
  grave.rotation.z = (Math.random() - 0.5) * 0.4
  graves.add(grave)
}

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#86cdff', 0.275)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#86cdff', 1)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

// Door Light
const doorLight = new THREE.PointLight('#ff7d46', 5)
doorLight.position.set(0, 2.2, 2.5)
house.add(doorLight)

// 鬼魂
const ghost1 = new THREE.PointLight('#8800ff', 6)
const ghost2 = new THREE.PointLight('#ff0088', 6)
const ghost3 = new THREE.PointLight('#ff0000', 6)
scene.add(ghost1, ghost2, ghost3)

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
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
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

// 阴影
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
directionalLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

walls.castShadow = true
walls.receiveShadow = true

roof.castShadow = true
floor.receiveShadow = true

door.receiveShadow = true

graves.children.forEach((grave) => {
  grave.castShadow = true
  grave.receiveShadow = true
})

// Mapping
directionalLight.shadow.mapSize.width = 256
directionalLight.shadow.mapSize.height = 256
directionalLight.shadow.camera.top = 8
directionalLight.shadow.camera.right = 8
directionalLight.shadow.camera.bottom = -8
directionalLight.shadow.camera.left = -8
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 20

ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 10

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 10

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 10

// Sky
const sky = new Sky()
sky.scale.setScalar(100)
sky.material.uniforms.turbidity.value = 10
sky.material.uniforms.rayleigh.value = 3
sky.material.uniforms.mieCoefficient.value = 0.1
sky.material.uniforms.mieDirectionalG.value = 0.95
sky.material.uniforms.sunPosition.value.set(0.3, -0.038, -0.95)
scene.add(sky)

// Fog
scene.fog = new THREE.FogExp2('#04343d', 0.1)

/**
 * Animate
 */
const timer = new Timer()

function tick() {
  // Timer
  timer.update()
  const elapsedTime = timer.getElapsed()

  // Ghost
  const ghost1Angle = elapsedTime * 0.5
  ghost1.position.x = Math.cos(ghost1Angle) * 4
  ghost1.position.z = Math.sin(ghost1Angle) * 4
  ghost1.position.y = Math.sin(ghost1Angle) * Math.sin(ghost1Angle * 2.34) * Math.sin(ghost1Angle * 3.45)
  const ghost2Angle = -elapsedTime * 0.38
  ghost2.position.x = Math.cos(ghost2Angle) * 5
  ghost2.position.z = Math.sin(ghost2Angle) * 5
  ghost2.position.y = Math.sin(ghost2Angle) * Math.sin(ghost2Angle * 2.34) * Math.sin(ghost2Angle * 3.45)
  const ghost3Angle = elapsedTime * 0.23
  ghost3.position.x = Math.cos(ghost3Angle) * 6
  ghost3.position.z = Math.sin(ghost3Angle) * 6
  ghost3.position.y = Math.sin(ghost3Angle) * Math.sin(ghost3Angle * 2.34) * Math.sin(ghost3Angle * 3.45)

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
