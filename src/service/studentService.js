import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Basic " + btoa("user:123456"),
  },
});

export default {
  getStudents() {
    return apiClient.get("/students");
  },
  getStudent(id) {
    return apiClient.get("/students/" + id);
  },
  updateStudent(id, student) {
    return apiClient.put(`/students/${id}`, student);
  },
};
