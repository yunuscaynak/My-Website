<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import * as THREE from 'three';

const canvasRef = ref(null);
let scene, camera, renderer, plane, uniforms, animationFrameId;

const initThree = () => {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 2;

  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.domElement.style.position = 'absolute';
  renderer.domElement.style.top = '0';
  renderer.domElement.style.left = '0';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  renderer.domElement.style.zIndex = '-1'; // Keeps it behind content

  if (canvasRef.value) {
    canvasRef.value.appendChild(renderer.domElement);
  }

  uniforms = {
    u_time: { value: 0 },
    u_scroll: { value: 0 },
    u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
  };

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: `
      varying vec2 vUv;
      void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform float u_time;
      uniform float u_scroll;
      uniform vec2 u_resolution;

      // Noise function for texture effects
      float rand(vec2 n) {
          return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
      }

      void main() {
          vec2 uv = (vUv - 0.5) * 2.0; // Normalize UV to range [-1, 1]
          float dist = length(uv); // Calculate distance from the center

          // Old Color transition logic
          vec3 color1 = vec3(0.5804, 0.0, 1.0);  // Purple
          vec3 color2 = vec3(0.0, 0.2, 0.8);  // Blue
          vec3 color3 = vec3(0.0, 0.0, 0.0);  // Black

          // Calculate dynamic color transition based on scroll
          float wave = sin(uv.y * 10.0 - u_time * 2.0 + u_scroll * 1.5) * 0.5 + 0.5;
          vec3 color = mix(color1, color2, wave);
          color = mix(color, color3, wave * 0.5);

          // Vignette effect and soft border
          float vignette = smoothstep(0.7, 0.6, dist);

          gl_FragColor = vec4(color * vignette, 1.0);
      }
    `,
  });

  const geometry = new THREE.PlaneGeometry(3.5, 3.5);
  plane = new THREE.Mesh(geometry, material);
  scene.add(plane);

  animate();
};

const animate = () => {
  animationFrameId = requestAnimationFrame(animate);
  uniforms.u_time.value += 0.02; // Constant time progression

  // Yatayda dönüş hareketi
  plane.rotation.x = Math.sin(uniforms.u_time.value * 0.2) * 0.2;  // Yatay dönme (x ekseni)
  plane.rotation.y = Math.cos(uniforms.u_time.value * 0.2) * 0.2;  // Dikey dönme (y ekseni)
  
  renderer.render(scene, camera);
};

const onResize = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  uniforms.u_resolution.value.set(width, height);
};

const onScroll = () => {
  uniforms.u_scroll.value = window.scrollY * 0.002; // Scroll ile animasyonu kontrol et

  // Scroll ile büyüklük değişimi
  const scale = 1 + window.scrollY * 0.0002;
  plane.scale.set(scale, scale, 1); // Plane objesinin boyutunu değiştir
};

onMounted(() => {
  initThree();
  window.addEventListener('scroll', onScroll);
  window.addEventListener('resize', onResize);
});

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
  window.removeEventListener('resize', onResize);

  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }

  if (canvasRef.value && renderer.domElement) {
    canvasRef.value.removeChild(renderer.domElement);
  }

  scene.remove(plane);
  plane.geometry.dispose();
  plane.material.dispose();
  renderer.dispose();
});
</script>

<template>
  <div ref="canvasRef" class="fixed top-0 left-0 w-full h-full -z-10"></div>
</template>

<style scoped>
body, html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
