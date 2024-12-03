import GUI from 'lil-gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons'

/**
 * Base
 */
// Debug
const gui = new GUI({
  width: 360,
})

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const parameters = {
  count: 100000,
  size: 0.01,
  radius: 5,
  branches: 3,
  spin: 1,
  randomness: 0.2,
  randomnessPower: 3,
  insideColor: '#ff6030',
  outsideColor: '#1b3984',
}

let geometry = null
let material = null
let points = null

function generateGalaxy() {
  if (geometry !== null || material !== null || points !== null) {
    geometry.dispose()
    material.dispose()
    scene.remove(points)
  }

  const colorInside = new THREE.Color(parameters.insideColor)
  const colorOutside = new THREE.Color(parameters.outsideColor)

  geometry = new THREE.BufferGeometry()
  const positions = new Float32Array(parameters.count * 3)
  const colors = new Float32Array(parameters.count * 3)
  for (let i = 0; i < parameters.count; i++) {
    // positions
    const i3 = i * 3

    const radius = Math.random() * parameters.radius
    const spinAngle = radius * parameters.spin
    const branchAngle = i % parameters.branches / parameters.branches * Math.PI * 2

    const randomX = Math.random() ** parameters.randomnessPower * (Math.random() < 0.5 ? 1 : -1)
    const randomY = Math.random() ** parameters.randomnessPower * (Math.random() < 0.5 ? 1 : -1)
    const randomZ = Math.random() ** parameters.randomnessPower * (Math.random() < 0.5 ? 1 : -1)

    positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX
    positions[i3 + 1] = 0 + randomY
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

    // colors
    const mixedColor = colorInside.clone()
    mixedColor.lerp(colorOutside, radius / parameters.radius)

    colors[i3] = mixedColor.r
    colors[i3 + 1] = mixedColor.g
    colors[i3 + 2] = mixedColor.b
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  material = new THREE.PointsMaterial({
    size: parameters.size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
  })

  points = new THREE.Points(geometry, material)
  scene.add(points)
}

generateGalaxy()

gui.add(parameters, 'count')
  .min(100)
  .max(1000000)
  .step(100)
  .name('⭐数量')
  .onFinishChange(generateGalaxy)

gui.add(parameters, 'size')
  .min(0.001)
  .max(0.1)
  .step(0.001)
  .name('⭐尺寸')
  .onFinishChange(generateGalaxy)

gui.add(parameters, 'randomness')
  .min(0)
  .max(2)
  .step(0.001)
  .name('⭐随机性')
  .onFinishChange(generateGalaxy)

gui.add(parameters, 'randomnessPower')
  .min(1)
  .max(10)
  .step(0.001)
  .name('⭐随机性强度')
  .onFinishChange(generateGalaxy)

gui.add(parameters, 'radius')
  .min(0.01)
  .max(20)
  .step(0.01)
  .name('🌌半径')
  .onFinishChange(generateGalaxy)

gui.add(parameters, 'branches')
  .min(2)
  .max(20)
  .step(1)
  .name('🌌旋臂数量')
  .onFinishChange(generateGalaxy)

gui.add(parameters, 'spin')
  .min(-5)
  .max(5)
  .step(0.0001)
  .name('🌌旋臂旋转')
  .onFinishChange(generateGalaxy)

gui.addColor(parameters, 'insideColor')
  .name('🌌内部颜色')
  .onFinishChange(generateGalaxy)

gui.addColor(parameters, 'outsideColor')
  .name('🌌外部颜色')
  .onFinishChange(generateGalaxy)

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
camera.position.x = 3
camera.position.y = 3
camera.position.z = 3
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

/**
 * Animate
 */
// const clock = new THREE.Clock()

function tick() {
  // const elapsedTime = clock.getElapsedTime()

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
