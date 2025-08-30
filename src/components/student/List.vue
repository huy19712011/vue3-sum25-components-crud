<script setup>
const props = defineProps({
  students: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["edit-student", "delete-student"]);

const editStudent = (student) => {
  emit("edit-student", student);
};
/*
 * It's generally better to keep this component presentational and use emits,
 * so the parent manages the store logic. This keeps the component reusable and decoupled.
 * If you want to update the store directly here, you would need to import the store
 * and call the mutation/action, but that tightly couples this component to your store.
 *
 * Recommended: Keep using emit.
 */
const deleteStudent = (student) => {
  emit("delete-student", student);
};
</script>
<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h2>
          Students<span>: {{ students.length }}</span>
        </h2>
      </div>
      <div class="card-body">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(student, index) in students"
              :key="student.id"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ student.id }}</td>
              <td>{{ student.name }}</td>
              <td>{{ student.email }}</td>
              <td>{{ student.phone }}</td>
              <td>{{ student.created_at }}</td>
              <td>
                <!-- <button
                  class="btn btn-success"
                  @click="editStudent(student)"
                >
                  Edit
                </button> -->
                <RouterLink
                  class="btn btn-success"
                  :to="{ name: 'student-details', params: { id: student.id } }"
                >
                  <span>Edit</span>
                </RouterLink>
                <button
                  class="btn btn-danger"
                  @click="deleteStudent(student)"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
