<template>
  <div class="ai-painting-interface">
    <h1>AI 绘画界面</h1>
    <textarea
      v-model="paintingDescription"
      placeholder="请输入绘画描述..."
      class="description-input"
    ></textarea>
    <button @click="getFluxModelFunc" class="generate-button">生成绘画</button>
    <div v-if="generatedImage" class="image-container">
      <img :src="generatedImage" alt="生成的绘画" class="generated-image" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, type Ref } from "vue";
import {
  createCephalonApp,
  getCephalonAppStatus,
  getFluxModel,
} from "../api/cephalon";

const paintingDescription = ref("");
const generatedImage = ref("") as Ref<string>;
const options = ref({
  prompt: "a tiny astronaut hatching from an egg on the moon",
  width: 1024,
  height: 1024,
  guidance_scale: 3.5,
  seed: 320521890,
  steps: 25,
});
// function createCephalonAppFunc() {
//   // 这里应该调用你的AI绘画生成API
//   // 假设API返回一个图像的URL
//   console.log("生成绘画描述:", paintingDescription.value);
//   // 模拟生成图像
//   return createCephalonApp(options.value)
//     .then((res) => {
//       console.log(res);
//       generatedImage.value = "https://via.placeholder.com/500"; // 这里替换为实际生成的图像URL
//       getCephalonAppStatusFunc(res.id);
//     })
//     .catch((e: any) => {
//       console.log(e);
//     });
// }

// function getCephalonAppStatusFunc(id: string) {
//   return getCephalonAppStatus(id).then((res: any) => {
//     console.log(res);
//   });
// }

function getFluxModelFunc() {
  return getFluxModel(options.value)
    .then((res) => {
      console.log(res);
    })
    .catch((e: any) => {
      console.log(e);
    });
}
</script>

<style>
.ai-painting-interface {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.description-input {
  width: 300px;
  height: 100px;
  margin: 20px;
}

.generate-button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}

.generate-button:hover {
  background-color: #45a049;
}

.image-container {
  margin-top: 20px;
}

.generated-image {
  max-width: 100%;
  height: auto;
}
</style>
