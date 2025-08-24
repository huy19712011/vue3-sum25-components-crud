<script setup>
const props = defineProps({
  student: {
    type: Object,
    default: () => ({
      id: "",
      name: "",
      email: "",
      phone: "",
    }),
  },
});

const emit = defineEmits(["update-student"]);
const updateStudent = (student) => {
  emit("update-student", student);
  student.id = "";
  student.name = "";
  student.email = "";
  student.phone = "";
};
</script>
<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h4>Edit Student</h4>
      </div>
      <form
        class="card-body"
        @submit.prevent="updateStudent(student)"
      >
        <div class="mb-3">
          <label for="name">Id</label>
          <input
            id="id"
            type="text"
            readonly
            class="form-control"
            v-model="student.id"
          />
        </div>
        <div class="mb-3">
          <label for="name">Name</label>
          <input
            id="name"
            type="text"
            class="form-control"
            v-model.lazy="student.name"
          />
        </div>
        <div class="mb-3">
          <label for="email">Email</label>
          <input
            id="email"
            type="text"
            class="form-control"
            v-model.lazy="student.email"
          />
        </div>
        <div class="mb-3">
          <label for="phone">Phone</label>
          <input
            id="phone"
            type="text"
            class="form-control"
            v-model.lazy="student.phone"
          />
        </div>
        <div class="mb3">
          <button
            type="submit"
            class="btn btn-primary"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
