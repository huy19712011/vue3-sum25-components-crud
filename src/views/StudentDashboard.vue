<script setup>
import Create from "@/components/student/Create.vue";
import Edit from "@/components/student/Edit.vue";
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

const model = ref({
  student: {
    id: "",
    name: "",
    email: "",
    phone: "",
  },
});

const addStudent = (student) => {
  student.id = students.value.length + 1;
  const formattedDate = new Date().toISOString().split("T")[0];
  student.created_at = formattedDate;
  student.updated_at = formattedDate;
  students.value.push(student);
};

const editStudent = (student) => {
  model.value.student = { ...student }; // if using directly student here => list change during editing form!!!
};

const updateStudent = (student) => {
  const index = students.value.findIndex((s) => s.id === student.id);
  if (index !== -1) {
    student.updated_at = new Date().toISOString().split("T")[0];
    students.value[index] = { ...student };
  }

  model.student = {
    id: "",
    name: "",
    email: "",
    phone: "",
  };
};

const deleteStudent = (student) => {
  students.value = students.value.filter((s) => s.id !== student.id);
};
</script>

<template>
  <div class="container">
    <Create @add-student="addStudent"></Create>
    <List
      :students="students"
      @edit-student="editStudent"
      @delete-student="deleteStudent"
    ></List>
    <Edit
      :student="model.student"
      @update-student="updateStudent"
    ></Edit>
  </div>
</template>
