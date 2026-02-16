import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ status: 'callback route is reachable' })
}
