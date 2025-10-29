export let students = [
  { id: 1, name: "John Doe", email: "john@example.com", major: "Computer Science" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", major: "Mathematics" },
];

export function setStudents(newData) {
  students = newData;
}
