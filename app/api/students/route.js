import { students, setStudents } from "./data";

export async function GET() {
  return Response.json(students);
}

export async function POST(req) {
  const data = await req.json();
  const newStudent = { id: Date.now(), ...data };
  setStudents([...students, newStudent]);
  return Response.json(newStudent, { status: 201 });
}
