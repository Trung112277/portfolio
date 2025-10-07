import { NextResponse } from 'next/server'
import { UsersService } from '@/services/users.service'

export async function GET() {
  try {
    const users = await UsersService.getAll()
    return NextResponse.json({ users })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const userData = await request.json()
    const user = await UsersService.create(userData)
    return NextResponse.json({ user })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}
