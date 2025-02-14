<template>
  <div class="home-container">
    <div class="content">
      <div class="button-container">
        <a-button @click="moveToLoginPage">로그아웃</a-button>
      </div>
    <ag-grid-vue :row-data="rowData" :column-defs="colDefs" style="height: 100%;"/>
    </div>
  </div>
</template>
<script setup lang="ts">
import { AgGridVue } from 'ag-grid-vue3';
import { onMounted, ref } from 'vue';
import { getUserList } from '../../services/fetchers';
import type { UserInfo } from '../SignUpView.vue';
import router from '../../router';

const colDefs  = ref([
  { field: "id" },
  { field: "password" },
  { field: "name" },
  { field: "phone" },
  { field: "email" },
  { field: "birthday" },
]);

const rowData = ref<UserInfo[]>([]);

const moveToLoginPage = () => {
  router.push("login");
};

onMounted(async() => {
  const users = await getUserList();
  rowData.value = users.data;
});

</script>

<style scoped>
.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  padding: 20px;
  background-color: #f9f9f9;
}

.button-container {
  display: flex;
  justify-content: end;
  padding: 0 0 20px 0;
}

.content {
  padding: 0 24px;
  width: 100%;
  height: 100%;
}

</style>
