<script setup>
import Create from "@/components/student/Create.vue";
import Edit from "@/components/student/Edit.vue";
import List from "@/components/student/List.vue";
import { ref } from "vue";
import { onMounted } from "vue";

const students = ref([]);

// onMounted(() => {
//   // This code runs when the component is mounted (similar to 'created' in Vue 2)
//   // For example, you can fetch students from an API here
//   // Example:
//   fetch("http://localhost:3000/students")
//     .then((response) => response.json())
//     .then((data) => {
//       students.value = data;
//     });
// });

onMounted(async () => {
  // Using async/await makes asynchronous code easier to read and maintain.
  // It avoids "callback hell" and makes error handling simpler with try/catch.
  try {
    const response = await fetch("http://localhost:3000/students");
    students.value = await response.json();
  } catch (error) {
    console.error("Failed to fetch students:", error);
  }
});

const model = ref({
  student: {
    id: "",
    name: "",
    email: "",
    phone: "",
    created_at: "",
    updated_at: "",
  },
});

const addStudent = async (student) => {
  const formattedDate = new Date().toISOString().split("T")[0];
  student.id = String(students.value.length + 1);
  student.created_at = formattedDate;
  student.updated_at = formattedDate;

  try {
    const response = await fetch("http://localhost:3000/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    });
    if (!response.ok) throw new Error("Failed to save student");
    // Optionally, you can use the returned student data
    const savedStudent = await response.json();
    // students.value.push(savedStudent);
    students.value = [...students.value, savedStudent];

    // students.value.push(student); // will not work propertly!!! => need use savedStudent!!!

    // Other way: Refresh the students list from backend
    // const refreshed = await fetch("http://localhost:3000/students");
    // students.value = await refreshed.json();
  } catch (error) {
    console.error("Failed to save student:", error);
  }
};

const editStudent = (student) => {
  model.value.student = { ...student }; // if using directly student here => list change during editing form!!!
};

const updateStudent = async (student) => {
  try {
    student.updated_at = new Date().toISOString().split("T")[0];
    const response = await fetch(`http://localhost:3000/students/${student.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    });

    if (!response.ok) throw new Error("Failed to update student");
    const updatedStudent = await response.json();

    const index = students.value.findIndex((s) => s.id === updatedStudent.id);
    if (index !== -1) {
      // students.value[index] = { ...updatedStudent };

      students.value = students.value.map((s, i) => (i === index ? { ...updatedStudent } : s));
    }
  } catch (error) {
    console.error("Failed to update student:", error);
  } finally {
    model.value.student = {
      id: "",
      name: "",
      email: "",
      phone: "",
      created_at: "",
      updated_at: "",
    };
  }
};

const deleteStudent = async (student) => {
  try {
    const response = await fetch(`http://localhost:3000/students/${student.id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete student");
    students.value = students.value.filter((s) => s.id !== student.id);
  } catch (error) {
    console.error("Failed to delete student:", error);
  }
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
