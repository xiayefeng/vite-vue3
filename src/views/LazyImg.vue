<script setup>
import { ref, onMounted } from "vue";
import { useInView } from "@/hooks/lazy-img.js";
import { getImgSize } from '@/utils'

const imgRef = ref(null);

useInView(imgRef);

onMounted(async () => {
  const { width, height } = await getImgSize('https://picsum.photos/200/183')
  console.log(width)
  console.log(height)
})

</script>

<template>
  <div v-for="(_, idx) in new Array(200).fill(11)" :key="idx" style="width: 200px; height: 200px;">
    <img ref="imgRef" style="height: 100%" src="https://via.placeholder.com/200"
      :data-src="`https://picsum.photos/200/${180 + idx}`" alt="b" />
  </div>
</template>

<style scoped>
/* 定义淡入动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

/* 应用淡入动画到元素 */
.fade-in {
  animation: fadeIn 0.6s ease-in;
}
</style>