import gsap from 'gsap'
import GUI from 'lil-gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons'
import '../style/index.css'

const canvas = document.querySelector('canvas.webgl')

const gui = new GUI({
  closeFolders: true,
  width: 300,
})
const debugObject = {}

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const scene = new THREE.Scene()
const group = new THREE.Group()

scene.add(group)

debugObject.color = '#a778d8'

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1, 2, 2, 2),
  new THREE.MeshBasicMaterial({
    color: debugObject.color,
  }),
)
group.add(cube)

const cubeFolder = gui.addFolder('Cube')
cubeFolder.open()

cubeFolder
  .add(cube.position, 'x')
  .min(-3)
  .max(3)
  .step(0.01)
  .name('cubeX')

cubeFolder
  .add(cube.position, 'y')
  .min(-3)
  .max(3)
  .step(0.01)
  .name('cubeY')

cubeFolder
  .add(cube.position, 'z')
  .min(-3)
  .max(3)
  .step(0.01)
  .name('cubeZ')

cubeFolder
  .add(cube.material, 'wireframe')
  .name('cubeWireframe')

cubeFolder
  .add(cube, 'visible')
  .name('cubeVisible')

cubeFolder
  .addColor(debugObject, 'color')
  .onChange((value) => {
    cube.material.color.set(value)
  })
  .name('cubeColor')

debugObject.spin = () => {
  gsap.to(cube.rotation, { y: cube.rotation.y + Math.PI * 2, duration: 1 })
}

cubeFolder
  .add(debugObject, 'spin')

debugObject.subdivision = 2

cubeFolder.add(debugObject, 'subdivision')
  .min(1)
  .max(50)
  .step(1)
  .onFinishChange(() => {
    cube.geometry.dispose()
    cube.geometry = new THREE.BoxGeometry(
      1,
      1,
      1,
      debugObject.subdivision,
      debugObject.subdivision,
      debugObject.subdivision,
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
