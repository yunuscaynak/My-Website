<template>
  <div id="home" class="skills-portfolio">
    <div ref="container" class="skills-portfolio__canvas-container" @mouseleave="handleMouseLeave">
      <canvas ref="canvas" class="skills-portfolio__canvas" />

      <!-- Skills Header -->
      <div class="skills-header px-15">
        <div>
          <p class="skills-description">
            Frontend Developer · Vue/Nuxt · Node · MongoDB · Firebase · Three.js · Python 
          </p>
        </div>
        <div class="skills-tags">
          <span class="skill-tag">Nuxt 3</span>
          <span class="skill-tag">Tailwind</span>
          <span class="skill-tag">JWT</span>
          <span class="skill-tag">GraphQL</span>
        </div>
      </div>

      <!-- Hover Tooltip -->
      <div v-show="tooltip.visible" :style="tooltipStyle" class="skill-tooltip">
        {{ tooltip.label }}
      </div>

      <!-- Controls Hint -->
      <div class="controls-hint">
        <div class="controls-hint__content">
          drag to orbit · scroll to zoom · hover skills
        </div>
      </div>

      <!-- Hero overlay (partially over animation) -->
      <div class="hero-overlay">
        <div class="hero-card">
          <div class="typing">
            <span class="textArea font-bruno">
              {{ displayText }}<span class="cursor">|</span>
            </span>
          </div>
        </div>
      </div>

      <div class="mobile-hint">drag to orbit · scroll to zoom · hover skills</div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, nextTick } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

// Configuration constants
const SCENE_CONFIG = {
  camera: {
    fov: 60,
    near: 0.1,
    far: 200,
    position: { x: 0, y: 2.2, z: 9 }
  },
  controls: {
    enableDamping: true,
    dampingFactor: 0.06,
    minDistance: 3,
    maxDistance: 20,
    autoRotate: true,
    autoRotateSpeed: 0.5
  },
  lighting: {
    ambient: { color: 0x3b82f6, intensity: 0.6 },
    key: { color: 0x60a5fa, intensity: 1.4, position: [5, 8, 5] },
    rim: { color: 0x8b5cf6, intensity: 0.8, position: [-6, -3, -4] },
    accent: { color: 0xf59e0b, intensity: 0.4, position: [0, 10, 0] }
  },
  bloom: {
    strength: 1.2,
    radius: 1.0,
    threshold: 0.3
  },
  stars: {
    count: 2000,
    radius: 60
  },
  fog: {
    color: 0x0D197B,
    density: 0.045
  },
  animations: {
    coreRotationSpeed: 0.002,
    ringPulseSpeed: 0.003,
    planetBobbing: 0.1,
    cameraFloat: 0.0005
  }
}

const SKILLS_DATA = [
  { label: 'Vue.js', color: 0x42b883, orbit: 2.2, size: 0.18, speed: 0.6, category: 'frontend', glowIntensity: 0.3 },
  { label: 'Nuxt.js', color: 0x00dc82, orbit: 2.8, size: 0.18, speed: 0.5, category: 'frontend', glowIntensity: 0.4 },
  { label: 'Node.js', color: 0x8cc84b, orbit: 3.4, size: 0.2, speed: 0.45, category: 'backend', glowIntensity: 0.35 },
  { label: 'Express', color: 0xffffff, orbit: 4.0, size: 0.16, speed: 0.42, category: 'backend', glowIntensity: 0.5 },
  { label: 'MongoDB', color: 0x00ed64, orbit: 4.6, size: 0.2, speed: 0.38, category: 'database', glowIntensity: 0.3 },
  { label: 'Firebase', color: 0xffca28, orbit: 5.2, size: 0.18, speed: 0.36, category: 'cloud', glowIntensity: 0.4 },
  { label: 'Tailwind', color: 0x38bdf8, orbit: 5.8, size: 0.18, speed: 0.34, category: 'styling', glowIntensity: 0.45 },
  { label: 'Three.js', color: 0xffffff, orbit: 6.4, size: 0.2, speed: 0.32, category: '3d', glowIntensity: 0.6 },
  { label: 'Python', color: 0x3671a5, orbit: 7.0, size: 0.18, speed: 0.30, category: 'language', glowIntensity: 0.25 },
  { label: 'SQL', color: 0xb0b0ff, orbit: 7.6, size: 0.16, speed: 0.28, category: 'database', glowIntensity: 0.3 }
]

// Reactive references
const container = ref(null)
const canvas = ref(null)
const tooltip = ref({ visible: false, label: '', x: 0, y: 0 })

// Hero typed text (from HomeSection.vue)
const typedText = 'Performance-obsessed.'
const displayText = ref('')

const typeText = () => {
  let index = 0
  const typeInterval = setInterval(() => {
    if (index < typedText.length) {
      displayText.value += typedText[index]
      index++
    } else {
      clearInterval(typeInterval)
      setTimeout(deleteText, 5000)
    }
  }, 100)
}

const deleteText = () => {
  let index = displayText.value.length
  const deleteInterval = setInterval(() => {
    if (index > 0) {
      displayText.value = displayText.value.slice(0, index - 1)
      index--
    } else {
      clearInterval(deleteInterval)
      setTimeout(typeText, 2000)
    }
  }, 50)
}

// Computed properties
const tooltipStyle = computed(() => ({
  left: `${tooltip.value.x}px`,
  top: `${tooltip.value.y}px`
}))

// Three.js scene objects
let threeScene = null

class ThreeScene {
  constructor() {
    this.renderer = null
    this.scene = null
    this.camera = null
    this.controls = null
    this.composer = null
    this.bloomPass = null
    this.planets = []
    this.raycaster = new THREE.Raycaster()
    this.mouse = new THREE.Vector2(-1, -1)
    this.frameId = null
    this.resizeObserver = null
    this.animationTime = 0
    this.centralCore = null
    this.orbitRings = []
    this.floatingParticles = []
  }

  init(canvasElement, containerElement) {
    const { clientWidth: width, clientHeight: height } = containerElement

    this.setupRenderer(canvasElement, width, height)
    this.setupScene()
    this.setupCamera(width, height)
    this.setupControls()
    this.setupPostprocessing(width, height)
    this.setupLighting()
    this.createSceneObjects()
    this.setupEventListeners()

    return this
  }

  setupRenderer(canvasElement, width, height) {
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvasElement,
      antialias: true,
      alpha: true
    })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setSize(width, height)
    this.renderer.outputEncoding = THREE.sRGBEncoding
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.1
  }

  setupScene() {
    this.scene = new THREE.Scene()
    this.scene.fog = new THREE.FogExp2(
      SCENE_CONFIG.fog.color,
      SCENE_CONFIG.fog.density
    )
  }

  setupCamera(width, height) {
    const { fov, near, far, position } = SCENE_CONFIG.camera
    this.camera = new THREE.PerspectiveCamera(fov, width / height, near, far)
    this.camera.position.set(position.x, position.y, position.z)
  }

  setupControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    Object.assign(this.controls, SCENE_CONFIG.controls)
  }

  setupPostprocessing(width, height) {
    this.composer = new EffectComposer(this.renderer)
    this.composer.addPass(new RenderPass(this.scene, this.camera))

    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      SCENE_CONFIG.bloom.strength,
      SCENE_CONFIG.bloom.radius,
      SCENE_CONFIG.bloom.threshold
    )
    this.composer.addPass(this.bloomPass)
  }

  setupLighting() {
    const { ambient, key, rim, accent } = SCENE_CONFIG.lighting

    // Ambient light with blue tint
    const ambientLight = new THREE.AmbientLight(ambient.color, ambient.intensity)
    this.scene.add(ambientLight)

    // Key light with blue tone
    const keyLight = new THREE.DirectionalLight(key.color, key.intensity)
    keyLight.position.set(...key.position)
    keyLight.castShadow = true
    this.scene.add(keyLight)

    // Rim light with purple tone
    const rimLight = new THREE.DirectionalLight(rim.color, rim.intensity)
    rimLight.position.set(...rim.position)
    this.scene.add(rimLight)

    // Accent light from above
    const accentLight = new THREE.DirectionalLight(accent.color, accent.intensity)
    accentLight.position.set(...accent.position)
    this.scene.add(accentLight)
  }

  createSceneObjects() {
    // Stars background with different colors
    this.scene.add(this.createStarField())

    // Floating particles
    this.scene.add(this.createFloatingParticles())

    // Central core with animations
    this.centralCore = this.createCentralCore()
    this.scene.add(this.centralCore)

    // Energy waves around core
    this.scene.add(this.createEnergyWaves())

    // Skill orbits and planets
    this.createSkillsVisualization()
  }

  createStarField() {
    const { count, radius } = SCENE_CONFIG.stars
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    // Star colors array
    const starColors = [
      new THREE.Color(0x60a5fa), // Blue
      new THREE.Color(0x8b5cf6), // Purple
      new THREE.Color(0xfbbf24), // Yellow
      new THREE.Color(0xffffff), // White
      new THREE.Color(0x3b82f6)  // Deep blue
    ]

    for (let i = 0; i < count; i++) {
      const r = radius * (0.4 + Math.random() * 0.6)
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      const index = i * 3
      positions[index] = r * Math.sin(phi) * Math.cos(theta)
      positions[index + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[index + 2] = r * Math.cos(phi)

      // Random star color
      const color = starColors[Math.floor(Math.random() * starColors.length)]
      colors[index] = color.r
      colors[index + 1] = color.g
      colors[index + 2] = color.b
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    })

    return new THREE.Points(geometry, material)
  }

  createCentralCore() {
    const geometry = new THREE.IcosahedronGeometry(1.1, 2)
    const material = new THREE.MeshPhysicalMaterial({
      metalness: 0.8,
      roughness: 0.1,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
      emissive: new THREE.Color(0x3b82f6),
      emissiveIntensity: 0.6,
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.9
    })

    const core = new THREE.Mesh(geometry, material)
    core.rotation.y = Math.PI * 0.25
    return core
  }

  createFloatingParticles() {
    const particleCount = 300
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    const particleColors = [
      new THREE.Color(0x3b82f6),
      new THREE.Color(0x8b5cf6),
      new THREE.Color(0x06b6d4)
    ]

    for (let i = 0; i < particleCount; i++) {
      const radius = 15 + Math.random() * 20
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta)

      const color = particleColors[Math.floor(Math.random() * particleColors.length)]
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    })

    const particles = new THREE.Points(geometry, material)
    this.floatingParticles = particles
    return particles
  }

  createEnergyWaves() {
    const group = new THREE.Group()

    for (let i = 0; i < 3; i++) {
      const geometry = new THREE.RingGeometry(0.5 + i * 0.3, 0.6 + i * 0.3, 32)
      const material = new THREE.MeshBasicMaterial({
        color: i === 0 ? 0x3b82f6 : i === 1 ? 0x8b5cf6 : 0x06b6d4,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide
      })

      const ring = new THREE.Mesh(geometry, material)
      ring.rotation.x = Math.PI / 2
      ring.userData = {
        originalScale: 1,
        phase: i * Math.PI * 0.66,
        speed: 0.02 + i * 0.01
      }
      group.add(ring)
    }

    return group
  }

  createSkillsVisualization() {
    // Create animated orbit rings
    SKILLS_DATA.forEach((skill, index) => {
      const ringGeometry = new THREE.TorusGeometry(skill.orbit, 0.015, 8, 128)
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: skill.color,
        transparent: true,
        opacity: 0.3,
        emissive: new THREE.Color(skill.color),
        emissiveIntensity: 0.1
      })

      const ring = new THREE.Mesh(ringGeometry, ringMaterial)
      ring.rotation.x = Math.PI / 2
      ring.userData = {
        originalOpacity: 0.3,
        phase: index * 0.5,
        pulseSpeed: 0.005 + Math.random() * 0.003
      }

      this.orbitRings.push(ring)
      this.scene.add(ring)
    })

    // Create skill planets with enhanced materials and animations
    const planetGeometry = new THREE.SphereGeometry(1, 32, 32)

    SKILLS_DATA.forEach((skill, index) => {
      const material = new THREE.MeshStandardMaterial({
        color: skill.color,
        roughness: 0.2,
        metalness: 0.4,
        emissive: new THREE.Color(skill.color),
        emissiveIntensity: skill.glowIntensity || 0.3
      })

      const mesh = new THREE.Mesh(planetGeometry, material)
      mesh.scale.setScalar(skill.size)
      mesh.userData = {
        label: skill.label,
        orbit: skill.orbit,
        speed: skill.speed,
        phase: (index / SKILLS_DATA.length) * Math.PI * 2,
        originalSize: skill.size,
        category: skill.category,
        bobbingPhase: Math.random() * Math.PI * 2,
        rotationSpeed: 0.01 + Math.random() * 0.02
      }

      this.scene.add(mesh)

      const label = this.createTextSprite(skill.label)
      this.scene.add(label)

      this.planets.push({ mesh, label })
    })
  }

  createTextSprite(text) {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    const padding = 24
    const fontSize = 42

    context.font = `bold ${fontSize}px ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif`
    const textWidth = context.measureText(text).width

    canvas.width = textWidth + padding * 2
    canvas.height = fontSize + padding

    // Redraw font after canvas resize
    context.font = `bold ${fontSize}px ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif`

    // Background with rounded corners
    this.drawRoundedRect(context, 0, 0, canvas.width, canvas.height, 16)
    context.fillStyle = 'rgba(0, 0, 0, 0.55)'
    context.fill()

    // Text
    context.fillStyle = '#ffffff'
    context.textBaseline = 'middle'
    context.fillText(text, padding, canvas.height / 2)

    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true

    const material = new THREE.SpriteMaterial({
      map: texture,
      depthWrite: false,
      transparent: true
    })

    const sprite = new THREE.Sprite(material)
    const scale = 0.6
    sprite.scale.set((canvas.width / canvas.height) * scale, scale, 1)
    sprite.userData = { isLabel: true }

    return sprite
  }

  drawRoundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath()
    ctx.moveTo(x + radius, y)
    ctx.arcTo(x + width, y, x + width, y + height, radius)
    ctx.arcTo(x + width, y + height, x, y + height, radius)
    ctx.arcTo(x, y + height, x, y, radius)
    ctx.arcTo(x, y, x + width, y, radius)
    ctx.closePath()
  }

  setupEventListeners() {
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleResize = this.handleResize.bind(this)

    window.addEventListener('mousemove', this.handleMouseMove)
    window.addEventListener('resize', this.handleResize)

    if (container.value) {
      this.resizeObserver = new ResizeObserver(this.handleResize)
      this.resizeObserver.observe(container.value)
    }
  }

  handleMouseMove(event) {
    if (!this.renderer) return

    const rect = this.renderer.domElement.getBoundingClientRect()
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

    tooltip.value.x = event.clientX + 12
    tooltip.value.y = event.clientY + 12
  }

  handleMouseLeave() {
    this.mouse.set(-1, -1)
    tooltip.value.visible = false
    this.resetPlanetScales()
  }

  handleResize() {
    if (!container.value || !this.camera || !this.renderer) return

    const { clientWidth: width, clientHeight: height } = container.value

    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height)
    this.composer.setSize(width, height)
    this.bloomPass.setSize(width, height)
  }

  animate(time = 0) {
    this.animationTime = time * 0.001
    const { coreRotationSpeed, ringPulseSpeed, planetBobbing, cameraFloat } = SCENE_CONFIG.animations

    // Animate central core
    if (this.centralCore) {
      this.centralCore.rotation.x = this.animationTime * coreRotationSpeed * 0.7
      this.centralCore.rotation.y = this.animationTime * coreRotationSpeed
      this.centralCore.rotation.z = this.animationTime * coreRotationSpeed * 0.5

      // Core pulsing effect
      const pulse = 1 + Math.sin(this.animationTime * 3) * 0.05
      this.centralCore.scale.setScalar(pulse)
    }

    // Animate orbit rings
    this.orbitRings.forEach((ring, index) => {
      const { phase, pulseSpeed } = ring.userData
      const opacity = ring.userData.originalOpacity + Math.sin(this.animationTime * 2 + phase) * 0.15
      ring.material.opacity = Math.max(0.1, opacity)

      // Ring rotation
      ring.rotation.z = this.animationTime * pulseSpeed
    })

    // Animate floating particles
    if (this.floatingParticles) {
      const positions = this.floatingParticles.geometry.attributes.position.array
      const originalPositions = this.floatingParticles.userData.originalPositions || positions.slice()

      if (!this.floatingParticles.userData.originalPositions) {
        this.floatingParticles.userData.originalPositions = originalPositions
      }

      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] = originalPositions[i + 1] + Math.sin(this.animationTime * 0.5 + i * 0.01) * 2
      }
      this.floatingParticles.geometry.attributes.position.needsUpdate = true
    }

    // Animate energy waves around core
    this.scene.children.forEach(child => {
      if (child.type === 'Group' && child.children.length > 0) {
        child.children.forEach((ring, index) => {
          if (ring.userData.speed) {
            const scale = 1 + Math.sin(this.animationTime * ring.userData.speed + ring.userData.phase) * 0.3
            ring.scale.setScalar(scale)
            ring.material.opacity = 0.2 + Math.sin(this.animationTime * ring.userData.speed + ring.userData.phase) * 0.1
          }
        })
      }
    })

    // Enhanced planet animations
    this.planets.forEach(({ mesh, label }, index) => {
      const { orbit, speed, phase, bobbingPhase, rotationSpeed } = mesh.userData
      const angle = this.animationTime * speed + phase
      const x = Math.cos(angle) * orbit
      const z = Math.sin(angle) * orbit

      // Add vertical bobbing motion
      const bobbing = Math.sin(this.animationTime * 2 + bobbingPhase) * planetBobbing
      const y = bobbing

      mesh.position.set(x, y, z)
      label.position.set(x, y + 0.35, z)
      label.lookAt(this.camera.position)

      // Rotate each planet
      mesh.rotation.y += rotationSpeed
      mesh.rotation.x += rotationSpeed * 0.5
    })

    // Subtle camera floating animation
    if (!this.controls.autoRotate) {
      const cameraY = this.camera.position.y + Math.sin(this.animationTime * cameraFloat) * 0.1
      this.camera.position.y = cameraY
    }

    this.controls.update()
    this.updateHoverInteraction()
    this.composer.render()

    this.frameId = requestAnimationFrame(this.animate.bind(this))
  }

  updateHoverInteraction() {
    if (this.mouse.x === -1) return

    this.raycaster.setFromCamera(this.mouse, this.camera)
    const intersects = this.raycaster.intersectObjects(
      this.planets.map(p => p.mesh),
      false
    )

    if (intersects.length > 0) {
      const intersectedObject = intersects[0].object
      const { label, originalSize } = intersectedObject.userData

      if (!intersectedObject.userData.isHovered) {
        // Enhanced hover effect with glow
        intersectedObject.scale.setScalar(originalSize * 1.25)
        intersectedObject.material.emissiveIntensity *= 1.5
        intersectedObject.userData.isHovered = true

        // Animate the corresponding ring
        const correspondingRing = this.orbitRings.find(ring =>
          Math.abs(ring.geometry.parameters.innerRadius - intersectedObject.userData.orbit) < 0.1
        )
        if (correspondingRing) {
          correspondingRing.material.opacity = 0.8
        }
      }

      tooltip.value.visible = true
      tooltip.value.label = label
    } else {
      this.resetPlanetScales()
      tooltip.value.visible = false
    }
  }

  resetPlanetScales() {
    this.planets.forEach(({ mesh }) => {
      const { originalSize } = mesh.userData
      mesh.scale.setScalar(originalSize)
      mesh.userData.isHovered = false
    })
  }

  dispose() {
    if (this.frameId) {
      cancelAnimationFrame(this.frameId)
    }

    window.removeEventListener('mousemove', this.handleMouseMove)
    window.removeEventListener('resize', this.handleResize)

    if (this.resizeObserver) {
      this.resizeObserver.disconnect()
    }

    if (this.controls) {
      this.controls.dispose()
    }

    if (this.composer) {
      this.composer.dispose()
    }

    if (this.renderer) {
      this.renderer.dispose()
    }

    // Clean up geometries and materials
    this.scene?.traverse((object) => {
      if (object.geometry) {
        object.geometry.dispose()
      }
      if (object.material) {
        if (Array.isArray(object.material)) {
          object.material.forEach(material => material.dispose())
        } else {
          object.material.dispose()
        }
      }
    })
  }
}

// Component lifecycle
onMounted(async () => {
  await nextTick()

  if (canvas.value && container.value) {
    threeScene = new ThreeScene()
    threeScene.init(canvas.value, container.value)
    threeScene.animate()
  }
  typeText()
})

onBeforeUnmount(() => {
  if (threeScene) {
    threeScene.dispose()
  }
})

// Event handlers
const handleMouseLeave = () => {
  if (threeScene) {
    threeScene.handleMouseLeave()
  }
}
</script>

<style scoped>
.skills-portfolio {
  position: relative;
  width: 100%;
  height: 90vh;
  margin-top: 64px;
  scroll-margin-top: 0;
  border-radius: 0;
  overflow: visible;
  background: radial-gradient(circle at 18% 22%, rgba(242, 159, 103, 0.14), transparent 42%),
    radial-gradient(circle at 78% 18%, rgba(126, 191, 159, 0.16), transparent 38%),
    radial-gradient(circle at 64% 78%, rgba(231, 223, 212, 0.1), transparent 36%),
    linear-gradient(to bottom, #0f0e0c, #0c0f0c, #0a0c0a);
}

.skills-portfolio__canvas-container {
  top: 0;
  min-height: 100%;
  position: relative;
  width: 100%;
  height: 100%;
}

.skills-portfolio__canvas {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}

/* Skills Header */
.skills-header {
  pointer-events: none;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: rgba(231, 223, 212, 0.9);
}

.skills-description {
  font-size: 0.875rem;
  color: rgba(231, 223, 212, 0.7);
  margin: 0;
}

@media (min-width: 768px) {
  .skills-description {
    font-size: 1rem;
  }
}

.skills-tags {
  display: none;
  gap: 0.5rem;
}

@media (min-width: 768px) {
  .skills-tags {
    display: flex;
  }
}

.skill-tag {
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  border-radius: 9999px;
  background-color: rgba(231, 223, 212, 0.12);
  backdrop-filter: blur(4px);
}

/* Tooltip */
.skill-tooltip {
  pointer-events: none;
  position: absolute;
  z-index: 20;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  border-radius: 0.25rem;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Controls Hint */
.controls-hint {
  position: absolute;
  bottom: 0.75rem;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  z-index: 6;
  pointer-events: none;
}

.controls-hint__content {
  padding: 0.25rem 0.75rem;
  font-size: 0.625rem;
  border-radius: 9999px;
  background-color: rgba(255, 255, 255, 0.1);
  color: rgba(231, 223, 212, 0.8);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(231, 223, 212, 0.12);
  pointer-events: auto;
}

@media (min-width: 768px) {
  .controls-hint__content {
    font-size: 0.75rem;
  }
}

:global(body) {
  background-color: #0b0f17;
}

/* Hero overlay (desktop) */
.hero-overlay {
  position: absolute;
  left: 50%;
  bottom: 64px;
  transform: translateX(-50%);
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  pointer-events: none;
  width: 100%;
  padding: 0 1rem;
}

.hero-card {
  pointer-events: auto;
  width: min(90vw, 500px);
  background: linear-gradient(135deg, rgba(15, 12, 10, 0.92), rgba(26, 21, 18, 0.95));
  border: 1px solid rgba(231, 223, 212, 0.22);
  box-shadow: 0 16px 38px rgba(0, 0, 0, 0.32), 0 0 0 1px rgba(231, 223, 212, 0.08);
  backdrop-filter: blur(8px);
  border-radius: 14px;
  padding: clamp(0.7rem, 1.8vw, 1rem);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 0.9rem;
}

.typing {
  margin-top: 0;
  min-height: 1.6em;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  flex: 1;
  min-width: 0;
  padding: 0.35rem 0.5rem;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(231, 223, 212, 0.2);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
}

.textArea {
  color: #f8f3e9;
  font-weight: 700;
  font-size: clamp(1.05rem, 1.9vw, 1.55rem);
  line-height: 1.35;
  letter-spacing: 0.01em;
  text-shadow: 0 3px 12px rgba(0, 0, 0, 0.5);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  max-width: 100%;
}

.cursor {
  color: #f29f67;
  background: transparent;
  animation: blink 0.7s infinite;
  display: inline-block;
  width: 0.55ch;
  margin-left: 2px;
}

.hero-cta {
  margin: 0;
  display: inline-flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  gap: 0.75rem;
  width: auto;
  position: relative;
  isolation: isolate;
  justify-content: flex-end;
}

.hero-cta::before {
  content: '';
  position: absolute;
  inset: -6px;
  border-radius: 18px;
  border: 1px dashed rgba(231, 223, 212, 0.15);
  z-index: -1;
}

@media (max-width: 768px) {
  .hero-card {
    flex-direction: column;
    align-items: flex-start;
    width: min(94vw, 520px);
    gap: 0.95rem;
    align-self: center;
  }

  .hero-cta {
    width: 100%;
    justify-content: flex-start;
    gap: 0.6rem;
  }

  .ctaPrimary,
  .ctaGhost {
    width: 100%;
  }
}

@media (max-width: 640px) {
  .hero-overlay {
    position: static;
    transform: none;
    padding: 0 0.75rem 0.5rem;
    margin-top: 0.5rem;
  }

  .hero-card {
    width: 100%;
  }

  .hero-cta::before {
    inset: -6px;
  }
}

@media (min-width: 640px) {
  .hero-cta {
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    width: auto;
  }
}

.ctaPrimary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.78rem 1.25rem;
  border-radius: 14px;
  background: linear-gradient(120deg, #f29f67, #7ebf9f);
  color: #0c0a09;
  font-family: 'Bruno Ace SC', sans-serif;
  font-size: 1rem;
  letter-spacing: 0.02em;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.25);
  transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
  outline: none;
  flex: 0 0 auto;
}

.ctaPrimary:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 38px rgba(0, 0, 0, 0.3);
  filter: brightness(1.02);
}

.ctaPrimary:focus-visible {
  outline: 2px solid rgba(242, 159, 103, 0.55);
  outline-offset: 3px;
}

.ctaGhost {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.72rem 1.2rem;
  border-radius: 12px;
  border: 1px solid rgba(231, 223, 212, 0.22);
  color: rgba(231, 223, 212, 0.9);
  font-family: 'Bruno Ace SC', sans-serif;
  font-size: 0.98rem;
  letter-spacing: 0.02em;
  background: rgba(231, 223, 212, 0.08);
  transition: transform 0.2s ease, border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
  outline: none;
  flex: 0 0 auto;
}

.ctaGhost:hover {
  transform: translateY(-2px);
  border-color: #f29f67;
  color: #e7dfd4;
  background: rgba(231, 223, 212, 0.12);
}

.ctaGhost:focus-visible {
  outline: 2px solid rgba(242, 159, 103, 0.5);
  outline-offset: 3px;
}

@media (max-width: 480px) {
  .hero-card {
    width: min(95vw, 375px);
    padding: 0.65rem;
    gap: 0.55rem;
  }

  .textArea {
    font-size: 0.86rem;
    white-space: nowrap;
  }

  .hero-cta {
    gap: 0.4rem;
  }

  .ctaPrimary,
  .ctaGhost {
    padding: 0.6rem 0.9rem;
    border-radius: 12px;
    font-size: 0.92rem;
  }
}

.mobile-hint {
  margin-top: 0.6rem;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.4rem 0.75rem;
  border-radius: 9999px;
  background: rgba(231, 223, 212, 0.18);
  color: #0c0a09;
  border: 1px solid rgba(231, 223, 212, 0.24);
  font-size: 0.78rem;
  letter-spacing: 0.02em;
  width: 100%;
  justify-content: center;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.22);
}

.mobile-hint-inline {
  display: none;
}

@media (max-width: 1024px) {
  .hero-overlay {
    display: none;
  }

  .hero-card {
    width: min(96vw, 520px);
  }

  .mobile-hint-inline {
    display: inline-flex;
  }
}

@keyframes blink {
  0%,
  100% { opacity: 0; }
  50% { opacity: 1; }
}
</style>
