import * as THREE from 'three'
import { OrbitControls } from 'three/addons'
import '../style/index.css'

const canvas = document.querySelector('canvas.webgl')

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener('dblclick', () => {
  const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement // 兼容性处理
  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen().then(() => {
      })
    }
    else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen().then(() => {
      })
    }
  }
  else {
    if (document.fullscreenElement) {
      document.exitFullscreen().then(() => {
      })
    }
    else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen().then(() => {
      })
    }
  }
})

const scene = new THREE.Scene()
const group = new THREE.Group()

scene.add(group)

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({
    color: 0xFF0000,
    wireframe: true,
  }),
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
