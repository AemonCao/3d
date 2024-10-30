import * as THREE from 'three'
import { OrbitControls } from 'three/addons'
import './style.css'

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

const count = 1000

const positionsArray = new Float32Array(count * 3 * 3)

for (let i = 0; i < count * 3 * 3; i++) {
  positionsArray[i] = Math.random() - 0.5
}

const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)

const geometry = new THREE.BufferGeometry()

geometry.setAttribute('position', positionsAttribute)

const group = new THREE.Group()
scene.add(group)

group.add(new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
  color: 0xFF00FF,
  wireframe: true,
})))

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({
    color: 0xFF0000,
    wireframe: true,
  }),
)

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({
    color: 0x00FF00,
    wireframe: true,
  }),
)

cube2.position.x = -2

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({
    color: 0x0000FF,
    wireframe: true,
  }),
)

cube3.position.x = 2

group.add(cube1)
group.add(cube2)
group.add(cube3)

// Axes helper
const axesHelper = new THREE.AxesHelper(1)
scene.add(axesHelper)

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
// const aspectRatio = sizes.width / sizes.height
// const  camera = new THREE.OrthographicCamera(-1 * aspectRatio,1 * aspectRatio,-1,1,0.1,100)
// camera.position.x = 2
// camera.position.y = 2
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

// const clock = new THREE.Clock()

function render() {
  // group.rotation.y = clock.getElapsedTime()

  // 更新相机位置
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2
  // camera.position.y = cursor.y * 3
  // camera.lookAt(group.position)

  // 更新控制器
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
