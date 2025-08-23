<script setup>
import List from "@/components/student/List.vue";
import { ref } from "vue";

const students = ref([
  {
    id: 1,
    name: "student 1",
    email: "email 1",
    phone: "phone 1",
    created_at: "2024-10-17",
    updated_at: "2024-10-18",
  },
  {
    id: 2,
    name: "student 2",
    email: "email 2",
    phone: "phone 2",
    created_at: "2024-10-17",
    updated_at: "2024-10-18",
  },
  {
    id: 3,
    name: "student 3",
    email: "email 3",
    phone: "phone 3",
    created_at: "2024-10-17",
    updated_at: "2024-10-18",
  },
]);
</script>

<template>
  <div class="container">
    <List :students="students"></List>
  </div>
</template>
