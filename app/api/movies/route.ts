import { NextResponse } from "next/server"

// Contoh menggunakan API external

export async function GET() {
const response = await fetch('http://103.185.38.29/api/movies')
  const data = await response.json()
  return NextResponse.json(data)
}
