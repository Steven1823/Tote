import { type NextRequest, NextResponse } from "next/server"

const ADMIN_PHONE = "254753323940"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { phoneNumber } = body

    // Simple authentication - in production, you'd want more secure authentication
    if (phoneNumber === ADMIN_PHONE) {
      return NextResponse.json({
        success: true,
        message: "Authentication successful",
        token: "admin-authenticated", // In production, use proper JWT tokens
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized access",
        },
        { status: 401 },
      )
    }
  } catch (error) {
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}
