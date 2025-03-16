<template>
  <div ref="threeContainer" class="three-container"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// 容器元素
const threeContainer = ref(null);

// Three.js 相关变量
let scene, camera, renderer, controls, model;

// 初始化 Three.js 场景
const initThreeScene = () => {
  // 场景
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0);

  // 相机
  const width = threeContainer.value.clientWidth;
  const height = threeContainer.value.clientHeight;
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.set(5, 5, 5);

  // 渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  threeContainer.value.appendChild(renderer.domElement);

  // 控制器（支持鼠标交互）
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // 启用阻尼效果
  controls.dampingFactor = 0.05;

  // 灯光
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(10, 10, 10);
  scene.add(directionalLight);

  // 加载 3D 模型
  const loader = new GLTFLoader();
  loader.load(
    "/models/your-model.gltf", // 替换为你的 3D 模型路径
    (gltf) => {
      model = gltf.scene;
      scene.add(model);
      console.log("3D 模型加载成功");
    },
    undefined,
    (error) => {
      console.error("3D 模型加载失败:", error);
    }
  );

  // 动画循环
  const animate = () => {
    requestAnimationFrame(animate);
    controls.update(); // 更新控制器
    renderer.render(scene, camera);
  };
  animate();
};

// 组件挂载时初始化场景
onMounted(() => {
  initThreeScene();
});

// 组件卸载时清理资源
onUnmounted(() => {
  if (renderer) {
    renderer.dispose();
  }
});
</script>

<style scoped>
.three-container {
  width: 100%;
  height: 500px;
  border: 1px solid #ccc;
}
</style>
