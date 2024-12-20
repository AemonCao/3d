import GUI from 'lil-gui'
import * as THREE from 'three'
import { FontLoader, OrbitControls, TextGeometry } from 'three/addons'
import typefaceFont from '~/assets/fonts/gentilis_regular.typeface.json'
import matcapTextureImage from '~/assets/matcaps/2.png'

// 用于生成字体文件
// https://gero3.github.io/facetype.js/

const textureLoader = new THREE.TextureLoader()
const fontLoader = new FontLoader()

const matcapTexture = textureLoader.load(matcapTextureImage)

const canvas = document.querySelector('canvas.webgl')

const gui = new GUI({
  closeFolders: true,
  width: 300,
})

gui.hide()

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const scene = new THREE.Scene()
const group = new THREE.Group()

scene.add(group)

const textGroup = new THREE.Group()

// 这里不能使用 fontLoader.load 来加载，因为 typefaceFont 已经是字体文件了
const font = fontLoader.parse(typefaceFont)

const textGeometry = new TextGeometry(
  'Aemon Cao',
  {
    font, // 字体
    size: 0.5, // 字体大小
    height: 0.2, // 字体厚度
    curveSegments: 4, // 曲线分段数
    bevelEnabled: true, // 是否开启斜角
    bevelThickness: 0.03, // 斜角厚度
    bevelSize: 0.02, // 斜角大小
    bevelOffset: 0, // 斜角偏移
    bevelSegments: 5, // 斜角分段数
  },
)

textGeometry.center()

const material = new THREE.MeshMatcapMaterial({
  matcap: matcapTexture,
  // wireframe: true,
})
const text = new THREE.Mesh(
  textGeometry,
  material,
)

scene.add(text)
console.time('donut')

const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
for (let i = 0; i < 500; i++) {
  const donut = new THREE.Mesh(donutGeometry, material)
  donut.position.x = (Math.random() - 0.5) * 10
  donut.position.y = (Math.random() - 0.5) * 10
  donut.position.z = (Math.random() - 0.5) * 10
  donut.rotation.x = Math.random() * Math.PI
  donut.rotation.y = Math.random() * Math.PI
  const scale = Math.random()
  donut.scale.set(scale, scale, scale)
  scene.add(donut)
}
console.timeEnd('donut')

scene.add(textGroup)

const cubeFolder = gui.addFolder('Cube')
cubeFolder.open()

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 2
camera.position.y = 2
camera.position.z = 2
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

window.addEventListener('keydown', (event) => {
  if (event.key === 'h') {
    gui.show(gui._hidden)
  }
})

render()
