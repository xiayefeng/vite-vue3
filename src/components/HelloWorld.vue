<script setup>
import { ref } from "vue";

defineProps({
  msg: String,
});

const count = ref(0);
const list = ref([{ a: 1 }, { a: 2 }, { a: 3 }]);
const obj = ref({ a: 0 });

function chageList() {
  // console.log(b);
  list.value[1] = { a: 9 };
}

function changeObj() {
  if (!obj.value.b) {
    obj.value.b = 1;
  } else {
    obj.value.b++;
  }
}
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <button type="button" @click="chageList">改变数组</button>
    <button type="button" @click="changeObj">改变对象</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
    <p>{{ obj.a + obj.b || 0 }}</p>
    <ul>
      <li v-for="item in list" :key="item.a">{{ item.a }}</li>
    </ul>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
