<template>
  <div class="app">
    <!-- 选择衣服图片 -->
    <div class="upload-section">
      <label for="file-upload" class="upload-label">选择衣服图片</label>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        @change="handleFileUpload"
        class="upload-input"
      />
    </div>

    <!-- 衣服和贴纸区域 -->
    <div class="workspace">
      <div class="clothing-container" @dragover.prevent @drop="handleDrop">
        <img
          v-if="clothingImage"
          src="@/assets/cap1.jpg"
          alt="Clothing"
          class="clothing-image"
        />
        <div
          v-for="(sticker, index) in stickers"
          :key="index"
          class="sticker"
          :style="{
            top: sticker.top + 'px',
            left: sticker.left + 'px',
            border: selectedStickerIndex === index ? '2px solid red' : 'none',
          }"
          draggable="true"
          @dragstart="handleDragStart(index, $event)"
          @click="selectSticker(index)"
        >
          <img src="@/assets/cap1.jpg" alt="Sticker" class="sticker-image" />
        </div>
      </div>
    </div>

    <!-- 贴纸库 -->
    <div class="sticker-library">
      <div
        v-for="(sticker, index) in stickerList"
        :key="index"
        class="sticker-item"
      >
        <img
          src="@/assets/cap1.jpg"
          alt="Sticker"
          class="sticker-image"
          draggable="true"
          @dragstart="handleStickerDragStart($event, sticker)"
        />
      </div>
    </div>

    <!-- 生成 3D 建模 -->
    <button @click="generate3DModel" class="generate-button">
      生成 3D 建模
    </button>
    <div v-if="show3DModel" class="model-container">
      <ThreeScene />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import ThreeScene from "../../components/ThreeScene.vue";

// 衣服图片
const clothingImage = ref(null);
// 贴纸列表
const stickerList = ref([
  "@/assets/cap.jpg",
  "@/assets/cap1.jpg",
  "@/assets/cap2.jpg",
]);
const stickerList1 = computed(() => {
  return [require("../../assets/cap.jpg")];
});
// 当前贴在衣服上的贴纸
const stickers = ref([]);
// 被拖拽的贴纸索引
const draggedStickerIndex = ref(null);
// 选中的贴纸索引
const selectedStickerIndex = ref(null);
// 是否展示 3D 模型
const show3DModel = ref(false);

// 选择衣服图片
const handleFileUpload = (event) => {
  const file = event.target.files;
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      clothingImage.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

// 开始拖拽贴纸
const handleStickerDragStart = (event, stickerSrc) => {
  event.dataTransfer.setData("text/plain", stickerSrc);
};

// 在衣服上放置贴纸
const handleDrop = (event) => {
  const stickerSrc = event.dataTransfer.getData("text/plain");
  if (stickerSrc) {
    const rect = event.target.getBoundingClientRect();
    const top = event.clientY - rect.top;
    const left = event.clientX - rect.left;
    stickers.value.push({
      src: stickerSrc,
      top,
      left,
    });
  }
};

// 拖拽已放置的贴纸
const handleDragStart = (index, event) => {
  draggedStickerIndex.value = index;
};

// 选中贴纸
const selectSticker = (index) => {
  selectedStickerIndex.value = index;
};

// 删除选中的贴纸
const deleteSelectedSticker = () => {
  if (selectedStickerIndex.value !== null) {
    stickers.value.splice(selectedStickerIndex.value, 1);
    selectedStickerIndex.value = null;
  }
};

// 监听键盘事件
const handleKeyDown = (event) => {
  if (event.key === "Delete" || event.key === "Backspace") {
    deleteSelectedSticker();
  }
};

// 组件挂载时监听键盘事件
onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
});

// 组件卸载时移除事件监听
onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
});

// 生成 3D 建模
const generate3DModel = () => {
  show3DModel.value = true;
  console.log("生成 3D 建模");
};
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.upload-section {
  margin-bottom: 20px;
}

.upload-label {
  display: inline-block;
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  cursor: pointer;
  border-radius: 5px;
}

.upload-input {
  display: none;
}

.workspace {
  position: relative;
  width: 500px;
  height: 500px;
  border: 2px dashed #ccc;
  margin-bottom: 20px;
}

.clothing-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.clothing-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.sticker {
  position: absolute;
  cursor: move;
}

.sticker-image {
  width: 50px;
  height: 50px;
}

.sticker-library {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.sticker-item {
  cursor: grab;
}

.generate-button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.model-container {
  margin-top: 20px;
  padding: 20px;
  border: 2px solid #ccc;
  width: 500px;
  height: 500px;
}
</style>
