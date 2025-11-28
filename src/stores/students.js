import { defineStore } from "pinia";

export const useStudentsStore = defineStore("students", {
  // state
  // getters
  // actions
  state: () => ({
    students: [],
    student: {
      // id: "",
      // name: "",
      // email: "",
      // phone: "",
      // created_at: "",
      // updated_at: "",
    },
  }),
  actions: {
    async getStudents() {
      const result = await fetch("http://localhost:8080/students");
      const response = await result.json();
      this.students = response;
    },
    async addStudent(student) {
      const formattedDate = new Date().toISOString().split("T")[0];
      student.id = String(this.students.length + 1);
      student.created_at = formattedDate;
      student.updated_at = formattedDate;

      try {
        const response = await fetch("http://localhost:8080/students", {
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
        this.students = [...this.students, savedStudent];

        // Other way: Refresh the students list from backend
        // const refreshed = await fetch("http://localhost:3000/students");
        // this.students = await refreshed.json();
      } catch (error) {
        console.error("Failed to save student:", error);
      }
    },
    async updateStudent(student) {
      try {
        student.updated_at = new Date().toISOString().split("T")[0];
        const response = await fetch(`http://localhost:8080/students/${student.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(student),
        });

        if (!response.ok) throw new Error("Failed to update student");
        const updatedStudent = await response.json();

        const index = this.students.findIndex((s) => s.id === updatedStudent.id);
        if (index !== -1) {
          // this.students[index] = { ...updatedStudent };

          this.students = this.students.map((s, i) => (i === index ? { ...updatedStudent } : s));
        }
      } catch (error) {
        console.error("Failed to update student:", error);
      }
    },
    async deleteStudent(student) {
      try {
        const response = await fetch(`http://localhost:8080/students/${student.id}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete student");
        this.students = this.students.filter((s) => s.id !== student.id);
      } catch (error) {
        console.error("Failed to delete student:", error);
      }
    },
    async editStudent(student) {
      this.student = { ...student }; // if using directly student here => list not change after editing form!!!

      // w2: deep copy with nested object
      // this.student = JSON.parse(JSON.stringify(student));
      // w3 OR using lodash library
      // this.student = structuredClone(student);
    },
  },
});
