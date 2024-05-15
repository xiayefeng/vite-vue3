<script setup>
import { ref } from "vue"
import { getInfo } from '@/api/test.js'
import { useFetch } from '@/hooks/fetch.js'

const list = ref([])

function changeList () {
  list.value = [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }]
}
const { data, error } = await useFetch({ url: '/api/userInfo', params: { a: 3, b: 4 }, useMemo: 1 })
if (error.value) {
  console.log(error.value.message)
} else {
  console.log(data.value)
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
    <el-button @click="changeList">改变list</el-button>
    <el-button @click="getData">获取数据</el-button>
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