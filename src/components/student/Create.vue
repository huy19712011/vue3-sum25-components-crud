<script setup>
import { reactive } from "vue";

const model = reactive({
  student: {
    id: "",
    name: "",
    email: "",
    phone: "",
    created_at: "",
    updated_at: "",
  },
});

const emit = defineEmits(["add-student"]);

function saveStudent() {
  emit("add-student", model.student);
  // model.student = {};

  // model.student.id = "";
  // model.student.name = "";
  // model.student.email = "";
  // model.student.phone = "";
  // model.student.created_at = "";
  // model.student.updated_at = "";

  model.student = { id: "", name: "", email: "", phone: "", created_at: "", updated_at: "" };
}
</script>
<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h4>Add Student</h4>
      </div>
      <div class="card-body">
        <div class="mb-3">
          <label for="create-student-form-name">Name</label>
          <input
            id="create-student-form-name"
            type="text"
            class="form-control"
            v-model="model.student.name"
          />
        </div>
        <div class="mb-3">
          <label for="create-student-form-email">Email</label>
          <input
            id="create-student-form-email"
            type="text"
            class="form-control"
            v-model="model.student.email"
          />
        </div>
        <div class="mb-3">
          <label for="create-student-form-phone">Phone</label>
          <input
            id="create-student-form-phone"
            type="text"
            class="form-control"
            v-model="model.student.phone"
          />
        </div>
        <div class="mb3">
          <button
            type="button"
            class="btn btn-primary"
            @click="saveStudent"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
