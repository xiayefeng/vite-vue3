<script setup>
import { ref, onMounted } from 'vue'
import { imgList } from '@/container'
import { preloadImg } from '@/utils'
const list = ref([])

onMounted(() => {
  console.log(`the component is now mounted.`)
  preloadImg(imgList)
})

function addImg () {
  list.value.push(...imgList)
}


</script>
<template>
  <main class="main-wrap">
    <el-button @click="addImg">添加图片</el-button>
    <ul class="box">
      <li class="box-item" v-for="item of list" :key="item">
        <img class="img" :src="item" alt="图片">
      </li>
    </ul>
  </main>
</template>
<style lang="scss" scoped>
.main-wrap {
  height: 100%;
  overflow: auto;

  .box {
    display: flex;
    flex-wrap: wrap;

    .box-item {
      width: 25%;

      .img {
        width: 100%;
      }
    }
  }
}
</style>