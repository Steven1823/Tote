import Image from "next/image"
import Link from "next/link"
import { MessageCircle, Heart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const products = [
  { id: 1, price: "KSH 1,750", image: "/placeholder.svg?height=300&width=300" },
  { id: 2, price: "KSH 1,500", image: "/placeholder.svg?height=300&width=300" },
  { id: 3, price: "KSH 1,500", image: "/placeholder.svg?height=300&width=300" },
  { id: 4, price: "KSH 750", image: "/placeholder.svg?height=300&width=300" },
  { id: 5, price: "KSH 1,850", image: "/placeholder.svg?height=300&width=300" },
  { id: 6, price: "KSH 1,500", image: "/placeholder.svg?height=300&width=300" },
  { id: 7, price: "KSH 1,500", image: "/placeholder.svg?height=300&width=300" },
  { id: 8, price: "KSH 1,500", image: "/placeholder.svg?height=300&width=300" },
  { id: 9, price: "KSH 1,500", image: "/placeholder.svg?height=300&width=300" },
  { id: 10, price: "KSH 1,500", image: "/placeholder.svg?height=300&width=300" },
  { id: 11, price: "KSH 1,500", image: "/placeholder.svg?height=300&width=300" },
  { id: 12, price: "KSH 1,500", image: "/placeholder.svg?height=300&width=300" },
  { id: 13, price: "KSH 1,500", image: "/placeholder.svg?height=300&width=300" },
  { id: 14, price: "KSH 1,500", image: "/placeholder.svg?height=300&width=300" },
  { id: 15, price: "KSH 2,300", image: "/placeholder.svg?height=300&width=300" },
  { id: 16, price: "KSH 1,500", image: "/placeholder.svg?height=300&width=300" },
  { id: 17, price: "KSH 1,500", image: "/placeholder.svg?height=300&width=300" },
  { id: 18, price: "KSH 1,500", image: "/placeholder.svg?height=300&width=300" },
  { id: 19, price: "KSH 1,500", image: "/placeholder.svg?height=300&width=300" },
  { id: 20, price: "KSH 1,950", image: "/placeholder.svg?height=300&width=300" },
  { id: 21, price: "KSH 1,950", image: "/placeholder.svg?height=300&width=300" },
  { id: 22, price: "KSH 1,750", image: "/placeholder.svg?height=300&width=300" },
  { id: 23, price: "KSH 1,950", image: "/placeholder.svg?height=300&width=300" },
  { id: 24, price: "KSH 1,500", image: "/placeholder.svg?height=300&width=300" },
  { id: 25, price: "KSH 1,850", image: "/placeholder.svg?height=300&width=300" },
  { id: 26, price: "KSH 750", image: "/placeholder.svg?height=300&width=300" },
  { id: 27, price: "KSH 1,850", image: "/placeholder.svg?height=300&width=300" },
]

export default function HomePage() {
  const whatsappNumber = "+254700000000" // Replace with actual WhatsApp number
  const whatsappMessage = "Hi! I'm interested in your tote bags from The Tote Bag Boutique."
  const whatsappUrl = `https://wa.me/${254718963886}?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-rose-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image src="/logo.jpg" alt="The Tote Bag Boutique Logo" width={60} height={60} className="rounded-full" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">The Tote Bag</h1>
                <p className="text-sm text-rose-600 font-medium">BOUTIQUE</p>
              </div>
            </div>
            <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
              <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 mr-2" />
                Contact on WhatsApp
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Elegant Tote Bags for
              <span className="text-rose-600 block">Every Occasion</span>
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover our curated collection of premium tote bags that blend style, functionality, and elegance.
              Perfect for work, travel, or everyday adventures.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-3">
                <Link href="#products">Shop Collection</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-rose-600 text-rose-600 hover:bg-rose-50 px-8 py-3 bg-transparent"
              >
                <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Get in Touch
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Preview */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Featured Collection</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A glimpse of our most popular tote bags, crafted with attention to detail and designed for the modern
              lifestyle.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {products.slice(0, 8).map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300 border-rose-100">
                <CardContent className="p-4">
                  <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={`Tote Bag ${product.id}`}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-lg text-rose-600 mb-2">{product.price}</p>
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="w-full border-rose-600 text-rose-600 hover:bg-rose-50 bg-transparent"
                    >
                      <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="w-3 h-3 mr-1" />
                        Inquire
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Full Product Collection */}
      <section id="products" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Complete Collection</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse our entire range of beautiful tote bags. Each piece is carefully selected to ensure quality and
              style.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300 border-rose-100">
                <CardContent className="p-3">
                  <div className="aspect-square mb-3 overflow-hidden rounded-lg bg-gray-100">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={`Tote Bag ${product.id}`}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-rose-600 mb-2">{product.price}</p>
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="w-full border-rose-600 text-rose-600 hover:bg-rose-50 text-xs bg-transparent"
                    >
                      <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="w-3 h-3 mr-1" />
                        Order Now
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Boutique?</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-rose-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Curated Selection</h4>
              <p className="text-gray-600">
                Each tote bag is carefully selected for quality, style, and functionality.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-rose-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Premium Quality</h4>
              <p className="text-gray-600">We ensure every bag meets our high standards for durability and design.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-rose-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Personal Service</h4>
              <p className="text-gray-600">Direct communication with our team for personalized assistance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-rose-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Tote?</h3>
          <p className="text-rose-100 mb-8 max-w-2xl mx-auto">
            Contact us directly on WhatsApp to inquire about any of our beautiful tote bags. We're here to help you find
            the perfect match for your style and needs.
          </p>
          <Button asChild size="lg" className="bg-white text-rose-600 hover:bg-rose-50 px-8 py-3">
            <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-5 h-5 mr-2" />
              Start Shopping on WhatsApp
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Image src="/logo.jpg" alt="The Tote Bag Boutique Logo" width={40} height={40} className="rounded-full" />
            <div>
              <h4 className="font-bold">The Tote Bag Boutique</h4>
            </div>
          </div>
          <p className="text-gray-400 mb-4">Elegant tote bags for every occasion</p>
          <Button
            asChild
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-gray-900 bg-transparent"
          >
            <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-4 h-4 mr-2" />
              Contact Us
            </Link>
          </Button>
        </div>
      </footer>
    </div>
  )
}
