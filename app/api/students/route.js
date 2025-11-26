import { NextResponse } from "next/server";

const API_URL = "https://course.summitglobal.id/students";

// =========================
// GET ALL STUDENTS
// =========================
export async function GET() {
  try {
    const res = await fetch(API_URL, { cache: "no-store" });
    const data = await res.json();

    return NextResponse.json(data.body?.data || []);
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch students" },
      { status: 500 }
    );
  }
}

// =========================
// ADD STUDENT
// =========================
export async function POST(req) {
  try {
    const body = await req.json();

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const json = await res.json();

    // FIX → kirim langsung student baru
    return NextResponse.json(json.body?.data || json);
  } catch (err) {
    console.error("POST Error:", err);
    return NextResponse.json(
      { error: "Failed to add student" },
      { status: 500 }
    );
  }
}

// =========================
// UPDATE STUDENT
// =========================
export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, ...updateData } = body;

    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    });

    const json = await res.json();
    return NextResponse.json(json.body?.data || json);
  } catch (err) {
    console.error("PUT Error:", err);
    return NextResponse.json(
      { error: "Failed to update student" },
      { status: 500 }
    );
  }
}

// =========================
// DELETE STUDENT
// =========================
export async function DELETE(req) {
  try {
    const { id } = await req.json();

    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete");

    return NextResponse.json({ message: "Student deleted successfully" });
  } catch (err) {
    console.error("DELETE Error:", err);
    return NextResponse.json(
      { error: "Failed to delete student" },
      { status: 500 }
    );
  }
}
