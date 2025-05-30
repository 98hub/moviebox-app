import { NextResponse } from "next/server"

// Contoh menggunakan API external

export async function GET() {
const response = await fetch('http://103.167.137.108:3000/api/movies')
  const data = await response.json()
  return NextResponse.json(data)
}
