<script setup>
import { ref } from "vue"

const list = ref([])

function changeList () {
  list.value = [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }]
}
</script>
<template>
  <main class="main-wrap">
    <button @click="changeList">改变list</button>
    <ul class="box">
      <li class="box-item" v-for="item in list" :key="item.a">{{ item.a }}</li>
    </ul>
  </main>
</template>
<style lang="scss" scoped>
.main-wrap {
  height: 100%;
  overflow: auto;

  .box {
    .box-item {
      height: 300px;
      position: relative;
      margin: 0;
      padding: 0;
    }
  }
}
</style>