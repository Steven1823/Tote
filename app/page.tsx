"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { MessageCircle, Heart, Star, MapPin, Phone, ShoppingBag, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Product {
  id: number
  name: string
  price: string
  image: string
  description: string
  isSold: boolean
  category: string
  dateAdded: string
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const whatsappNumbers = ["+254753323940", "0718963886"]

  const createWhatsappUrl = (productName?: string, productId?: number) => {
    let message = "Hi! I'm interested in your bags from The Bag Boutique located in Nakuru near Egerton University."

    if (productName && productId) {
      message = `Hi! I'm interested in the ${productName} (Bag ID: ${productId}) from The Bag Boutique. Is it still available? I saw it on your website.`
    }

    return `https://wa.me/${whatsappNumbers[0]}?text=${encodeURIComponent(message)}`
  }

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products")
        const data = await response.json()
        setProducts(data.products || [])
      } catch (error) {
        console.error("Failed to fetch products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Filter only available products for display
  const availableProducts = products.filter((product) => !product.isSold)

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-rose-200 border-t-rose-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading our beautiful bags...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-rose-100 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Image
                  src="/logo.jpg"
                  alt="The Bag Boutique Logo"
                  width={60}
                  height={60}
                  className="rounded-full shadow-lg ring-2 ring-rose-200"
                />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                  The Bag Boutique
                </h1>
                <p className="text-sm text-gray-600 font-medium">Premium bags for every occasion</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="hidden lg:flex flex-col text-xs text-gray-600 space-y-1">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-rose-500" />
                  <span>Nakuru, near Egerton University</span>
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="h-3 w-3 text-rose-500" />
                  <span>{whatsappNumbers.join(" / ")}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="hidden sm:flex border-rose-200 text-rose-600 hover:bg-rose-50 bg-transparent"
                >
                  <Link href="/admin">Admin</Link>
                </Button>
                <Button
                  asChild
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg border-0 font-semibold transition-all duration-200 transform hover:scale-105"
                >
                  <Link href={createWhatsappUrl()} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp Us
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-100/50 to-pink-100/50"></div>
        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-rose-600 font-medium mb-6 shadow-lg">
              <Sparkles className="w-4 h-4" />
              Premium Quality Bags
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Elegant Bags for
              <span className="block bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                Every Occasion
              </span>
            </h2>

            <p className="text-lg lg:text-xl text-gray-600 mb-4 max-w-2xl mx-auto leading-relaxed">
              Discover our curated collection of premium bags that blend style, functionality, and elegance. Perfect for
              work, travel, or everyday adventures.
            </p>

            <div className="flex items-center justify-center gap-2 text-gray-600 mb-8 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full inline-flex shadow-sm">
              <MapPin className="h-4 w-4 text-rose-500" />
              <span className="text-sm sm:text-base">Located in Nakuru, near Egerton University</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-8 py-4 text-lg shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                <Link href="#products">
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Shop Collection
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-green-500 text-green-600 hover:bg-green-50 px-8 py-4 text-lg bg-white/80 backdrop-blur-sm shadow-xl font-semibold transition-all duration-200 transform hover:scale-105"
              >
                <Link href={createWhatsappUrl()} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Contact on WhatsApp
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Preview */}
      {availableProducts.length > 0 && (
        <section className="py-12 sm:py-16 bg-white/60 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Featured Collection</h3>
              <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                A glimpse of our most popular bags, crafted with attention to detail and designed for the modern
                lifestyle.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {availableProducts.slice(0, 8).map((product) => (
                <Card
                  key={product.id}
                  className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm overflow-hidden"
                >
                  <CardContent className="p-0">
                    <div className="aspect-square overflow-hidden bg-gray-100 relative">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <Badge className="absolute top-3 right-3 bg-green-500 text-white shadow-lg">Available</Badge>
                      <Badge className="absolute top-3 left-3 bg-blue-500 text-white shadow-lg">ID: {product.id}</Badge>
                    </div>
                    <div className="p-4 text-center">
                      <h4 className="font-bold text-gray-900 mb-1 text-lg line-clamp-1">{product.name}</h4>
                      <p className="text-sm text-gray-600 mb-2 font-medium">{product.category}</p>
                      <p className="font-bold text-xl text-rose-600 mb-3">{product.price}</p>
                      <Button
                        asChild
                        size="sm"
                        className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white shadow-lg transition-all duration-200 transform hover:scale-105"
                      >
                        <Link
                          href={createWhatsappUrl(product.name, product.id)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Inquire About This Bag
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Full Product Collection */}
      <section id="products" className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Complete Collection</h3>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Browse our entire range of beautiful bags. Each piece is carefully selected to ensure quality and style.
            </p>
          </div>

          {availableProducts.length === 0 ? (
            <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border-0 max-w-2xl mx-auto">
              <CardContent className="text-center py-16">
                <div className="w-24 h-24 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Heart className="w-12 h-12 text-rose-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">New Collection Coming Soon!</h3>
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                  We're updating our inventory with beautiful new bags. Check back soon or contact us directly for the
                  latest arrivals!
                </p>
                <div className="space-y-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-xl transition-all duration-200 transform hover:scale-105"
                  >
                    <Link href={createWhatsappUrl()} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Contact Us for Updates
                    </Link>
                  </Button>
                  <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      <span>{whatsappNumbers[0]}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      <span>{whatsappNumbers[1]}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
              {availableProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm overflow-hidden"
                >
                  <CardContent className="p-0">
                    <div className="aspect-square overflow-hidden bg-gray-100 relative">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <Badge className="absolute top-2 right-2 bg-green-500 text-white text-xs shadow-lg">
                        Available
                      </Badge>
                      <Badge className="absolute top-2 left-2 bg-blue-500 text-white text-xs shadow-lg">
                        ID: {product.id}
                      </Badge>
                    </div>
                    <div className="p-3 text-center">
                      <h4 className="font-bold text-gray-900 mb-1 text-sm line-clamp-1">{product.name}</h4>
                      <p className="text-xs text-gray-600 mb-1 font-medium">{product.category}</p>
                      <p className="font-bold text-rose-600 mb-2 text-sm">{product.price}</p>
                      <Button
                        asChild
                        size="sm"
                        className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white text-xs shadow-lg transition-all duration-200 transform hover:scale-105"
                      >
                        <Link
                          href={createWhatsappUrl(product.name, product.id)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageCircle className="w-3 h-3 mr-1" />
                          Order Now
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 sm:py-16 bg-white/60 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Why Choose Our Boutique?</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center border-0 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Curated Selection</h4>
                <p className="text-gray-600 leading-relaxed">
                  Each bag is carefully selected for quality, style, and functionality to meet your needs.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Premium Quality</h4>
                <p className="text-gray-600 leading-relaxed">
                  We ensure every bag meets our high standards for durability, design, and craftsmanship.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Personal Service</h4>
                <p className="text-gray-600 leading-relaxed">
                  Direct communication with our team for personalized assistance and quick responses.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-rose-600 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 text-center relative">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Find Your Perfect Bag?</h3>
          <p className="text-rose-100 mb-4 max-w-2xl mx-auto text-lg leading-relaxed">
            Contact us directly on WhatsApp to inquire about any of our beautiful bags. We're here to help you find the
            perfect match for your style and needs.
          </p>
          <div className="flex items-center justify-center gap-2 text-rose-100 mb-8 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full inline-flex">
            <MapPin className="h-4 w-4" />
            <span>Visit us in Nakuru, near Egerton University</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg shadow-xl border-0 font-semibold transition-all duration-200 transform hover:scale-105"
            >
              <Link href={createWhatsappUrl()} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp: {whatsappNumbers[0]}
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-rose-600 px-8 py-4 text-lg bg-transparent backdrop-blur-sm font-semibold transition-all duration-200 transform hover:scale-105"
            >
              <Link
                href={`https://wa.me/${whatsappNumbers[1]}?text=${encodeURIComponent("Hi! I'm interested in your bags from The Bag Boutique located in Nakuru near Egerton University.")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp: {whatsappNumbers[1]}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="relative">
                <Image
                  src="/logo.jpg"
                  alt="The Bag Boutique Logo"
                  width={50}
                  height={50}
                  className="rounded-full shadow-lg ring-2 ring-gray-700"
                />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900"></div>
              </div>
              <div>
                <h4 className="font-bold text-xl bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
                  The Bag Boutique
                </h4>
                <p className="text-gray-400 text-sm">Premium bags for every occasion</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-400 mb-8 max-w-md mx-auto">
              <div className="flex items-center justify-center gap-2 bg-gray-800 px-4 py-2 rounded-lg">
                <MapPin className="h-4 w-4 text-rose-400" />
                <span>Nakuru, near Egerton University</span>
              </div>
              <div className="flex items-center justify-center gap-2 bg-gray-800 px-4 py-2 rounded-lg">
                <Phone className="h-4 w-4 text-rose-400" />
                <span>{whatsappNumbers.join(" / ")}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-green-400 text-green-400 hover:bg-green-400 hover:text-white bg-transparent shadow-lg font-semibold transition-all duration-200 transform hover:scale-105"
              >
                <Link href={createWhatsappUrl()} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {whatsappNumbers[0]}
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-green-400 text-green-400 hover:bg-green-400 hover:text-white bg-transparent shadow-lg font-semibold transition-all duration-200 transform hover:scale-105"
              >
                <Link
                  href={`https://wa.me/${whatsappNumbers[1]}?text=${encodeURIComponent("Hi! I'm interested in your bags from The Bag Boutique located in Nakuru near Egerton University.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {whatsappNumbers[1]}
                </Link>
              </Button>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
              <p>&copy; 2024 The Bag Boutique. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
