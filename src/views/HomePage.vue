<script setup>
import { ref } from "vue"
import { getInfo } from '@/api/test.js'

const list = ref([])

function changeList () {
  list.value = [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }]
}

function getData () {
  /* reqGet('/api/userInfo', { a: 3, b: 4 }).then(res => {
    console.log(res)
  }).catch(err => {
    console.log(err)
  }) */
  getInfo('/api/userInfo', { a: 3, b: 4 }).then(res => {
    console.log(res)
  })
  getInfo('/api/userInfo', { a: 3, b: 4 }).then(res => {
    console.log(res)
  })
  setTimeout(() => {
    getInfo('/api/userInfo', { a: 3, b: 4 }).then(res => {
      console.log(res)
    })
  }, (1000));
}
</script>
<template>
  <main class="main-wrap">
    <button @click="changeList">改变list</button>
    <button @click="getData">获取数据</button>
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