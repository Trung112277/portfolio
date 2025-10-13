import { NextResponse } from 'next/server'
import { IntroductionService } from '@/services/introduction.service'

export async function GET() {
  try {
    const introduction = await IntroductionService.get()
    
    return NextResponse.json({ introduction })
  } catch (error) {
    console.error('Error fetching introduction:', error)
    return NextResponse.json(
      { error: 'Failed to fetch introduction' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const introductionData = await request.json()
    
    const introduction = await IntroductionService.create(introductionData)
    
    return NextResponse.json({ introduction })
  } catch (error) {
    console.error('Error creating/updating introduction:', error)
    return NextResponse.json(
      { error: 'Failed to create/update introduction' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const introductionData = await request.json()
    
    const introduction = await IntroductionService.update(introductionData)
    
    return NextResponse.json({ introduction })
  } catch (error) {
    console.error('Error updating introduction:', error)
    return NextResponse.json(
      { error: 'Failed to update introduction' },
      { status: 500 }
    )
  }
}
