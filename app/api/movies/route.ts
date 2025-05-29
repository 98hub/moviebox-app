import { NextResponse } from "next/server"

// Contoh menggunakan API external
const response = await fetch('http://localhost:3001/api/movies')

export async function GET() {
  return NextResponse.json(response)
}
