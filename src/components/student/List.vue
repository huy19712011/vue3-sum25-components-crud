<script setup>
const props = defineProps({
  students: {
    type: Array,
    required: true,
  },
});
</script>
<template>
  <div class="card">
    <div class="card-header">
      <h2>Students</h2>
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
          <tr v-for="(student, index) in students" :key="student.id">
            <td>{{ index + 1 }}</td>
            <td>{{ student.id }}</td>
            <td>{{ student.name }}</td>
            <td>{{ student.email }}</td>
            <td>{{ student.phone }}</td>
            <td>{{ student.created_at }}</td>
            <td>
              <button class="btn btn-success" @click="editStudent(student)">Edit</button>
              <button class="btn btn-danger" @click="deleteStudent(student.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
