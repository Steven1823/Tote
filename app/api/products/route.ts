import { type NextRequest, NextResponse } from "next/server"

// Simulated database - in production, this would connect to MySQL
const products: any[] = []

export async function GET() {
  try {
    // In production, this would be: SELECT * FROM products
    return NextResponse.json({ products })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, price, category, description, image } = body

    // In production, this would be: INSERT INTO products (name, price, category, description, image, is_sold, created_at) VALUES (?, ?, ?, ?, ?, false, NOW())
    const newProduct = {
      id: Date.now(), // In production, this would be auto-increment
      name,
      price,
      category,
      description,
      image: image || "/placeholder.svg?height=300&width=300",
      isSold: false,
      dateAdded: new Date().toISOString(),
    }

    products.push(newProduct)

    return NextResponse.json({ product: newProduct }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
