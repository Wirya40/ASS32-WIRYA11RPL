import { students, setStudents } from "../data";

export async function PUT(req, { params }) {
  const id = Number(params.id);
  const data = await req.json();

  const index = students.findIndex((s) => s.id === id);
  if (index === -1) {
    return Response.json({ error: "Student not found" }, { status: 404 });
  }

  const updatedStudent = { ...students[index], ...data };
  const updatedList = [...students];
  updatedList[index] = updatedStudent;

  setStudents(updatedList);
  return Response.json(updatedStudent);
}

export async function DELETE(req, { params }) {
  const id = Number(params.id);
  const filtered = students.filter((s) => s.id !== id);
  setStudents(filtered);
  return Response.json({ message: "Deleted" });
}
