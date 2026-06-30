"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { MessageCircle, Heart, Star, MapPin, Phone, ShoppingBag, Sparkles, Play, Pause } from "lucide-react"
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

// Sample products with the specified prices and real generated images
const sampleProducts = [
  {
    id: 1,
    name: "Classic Leather Handbag",
    price: "KSH 1,750",
    image: "/bags/bag-1.png",
    description: "Elegant leather handbag perfect for professional settings",
    category: "Handbag",
    isSold: false,
  },
  {
    id: 2,
    name: "Stylish Tote Bag",
    price: "KSH 1,500",
    image: "/bags/bag-2.png",
    description: "Spacious tote bag ideal for daily use and shopping",
    category: "Tote",
    isSold: false,
  },
  {
    id: 3,
    name: "Elegant Crossbody",
    price: "KSH 1,500",
    image: "/bags/bag-3.png",
    description: "Compact crossbody bag for hands-free convenience",
    category: "Crossbody",
    isSold: false,
  },
  {
    id: 4,
    name: "Mini Clutch",
    price: "KSH 750",
    image: "/bags/bag-4.png",
    description: "Perfect evening clutch for special occasions",
    category: "Clutch",
    isSold: false,
  },
  {
    id: 5,
    name: "Premium Shoulder Bag",
    price: "KSH 1,850",
    image: "/bags/bag-5.png",
    description: "Luxurious shoulder bag with premium materials",
    category: "Shoulder Bag",
    isSold: false,
  },
  {
    id: 6,
    name: "Casual Day Bag",
    price: "KSH 1,500",
    image: "/bags/bag-6.png",
    description: "Perfect for casual outings and everyday use",
    category: "Handbag",
    isSold: false,
  },
  {
    id: 7,
    name: "Work Tote",
    price: "KSH 1,500",
    image: "/bags/bag-7.png",
    description: "Professional tote bag for work and business",
    category: "Tote",
    isSold: false,
  },
  {
    id: 8,
    name: "Evening Handbag",
    price: "KSH 1,500",
    image: "/bags/bag-8.png",
    description: "Sophisticated handbag for evening events",
    category: "Handbag",
    isSold: false,
  },
  {
    id: 9,
    name: "Travel Companion",
    price: "KSH 1,500",
    image: "/bags/bag-9.png",
    description: "Durable bag perfect for travel adventures",
    category: "Travel Bag",
    isSold: false,
  },
  {
    id: 10,
    name: "Chic Crossbody",
    price: "KSH 1,500",
    image: "/bags/bag-10.png",
    description: "Trendy crossbody bag for modern lifestyle",
    category: "Crossbody",
    isSold: false,
  },
  {
    id: 11,
    name: "Designer Handbag",
    price: "KSH 1,500",
    image: "/bags/bag-1.png",
    description: "Designer-inspired handbag with premium finish",
    category: "Handbag",
    isSold: false,
  },
  {
    id: 12,
    name: "Vintage Style Bag",
    price: "KSH 1,500",
    image: "/bags/bag-2.png",
    description: "Classic vintage-style bag with modern functionality",
    category: "Handbag",
    isSold: false,
  },
  {
    id: 13,
    name: "Urban Backpack",
    price: "KSH 1,500",
    image: "/bags/bag-3.png",
    description: "Stylish backpack for urban adventures",
    category: "Backpack",
    isSold: false,
  },
  {
    id: 14,
    name: "Luxury Tote",
    price: "KSH 1,500",
    image: "/bags/bag-4.png",
    description: "Luxury tote bag with exquisite craftsmanship",
    category: "Tote",
    isSold: false,
  },
  {
    id: 15,
    name: "Executive Collection",
    price: "KSH 2,300",
    image: "/bags/bag-5.png",
    description: "Premium executive bag for business professionals",
    category: "Executive",
    isSold: false,
  },
  {
    id: 16,
    name: "Casual Crossbody",
    price: "KSH 1,500",
    image: "/bags/bag-6.png",
    description: "Comfortable crossbody for casual wear",
    category: "Crossbody",
    isSold: false,
  },
  {
    id: 17,
    name: "Weekend Bag",
    price: "KSH 1,500",
    image: "/bags/bag-7.png",
    description: "Perfect companion for weekend getaways",
    category: "Weekend Bag",
    isSold: false,
  },
  {
    id: 18,
    name: "Fashion Forward",
    price: "KSH 1,500",
    image: "/bags/bag-8.png",
    description: "Trendy bag for fashion-conscious individuals",
    category: "Fashion Bag",
    isSold: false,
  },
  {
    id: 19,
    name: "Classic Elegance",
    price: "KSH 1,500",
    image: "/bags/bag-9.png",
    description: "Timeless elegant bag for any occasion",
    category: "Handbag",
    isSold: false,
  },
  {
    id: 20,
    name: "Premium Leather",
    price: "KSH 1,950",
    image: "/bags/bag-10.png",
    description: "High-quality leather bag with superior craftsmanship",
    category: "Leather Bag",
    isSold: false,
  },
  {
    id: 21,
    name: "Artisan Crafted",
    price: "KSH 1,950",
    image: "/bags/bag-1.png",
    description: "Handcrafted bag by skilled artisans",
    category: "Artisan Bag",
    isSold: false,
  },
  {
    id: 22,
    name: "Signature Collection",
    price: "KSH 1,750",
    image: "/bags/bag-2.png",
    description: "Signature design from our exclusive collection",
    category: "Signature",
    isSold: false,
  },
  {
    id: 23,
    name: "Limited Edition",
    price: "KSH 1,950",
    image: "/bags/bag-3.png",
    description: "Limited edition bag with unique design",
    category: "Limited Edition",
    isSold: false,
  },
  {
    id: 24,
    name: "Everyday Essential",
    price: "KSH 1,500",
    image: "/bags/bag-4.png",
    description: "Essential bag for everyday activities",
    category: "Essential",
    isSold: false,
  },
  {
    id: 25,
    name: "Luxury Shoulder",
    price: "KSH 1,850",
    image: "/bags/bag-5.png",
    description: "Luxury shoulder bag with premium features",
    category: "Shoulder Bag",
    isSold: false,
  },
  {
    id: 26,
    name: "Compact Clutch",
    price: "KSH 750",
    image: "/bags/bag-6.png",
    description: "Compact clutch perfect for minimalists",
    category: "Clutch",
    isSold: false,
  },
  {
    id: 27,
    name: "Statement Piece",
    price: "KSH 1,850",
    image: "/bags/bag-7.png",
    description: "Bold statement bag that stands out",
    category: "Statement",
    isSold: false,
  },
]

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [isVideoPlaying, setIsVideoPlaying] = useState(true)

  const whatsappNumbers = ["+254753323940", "0718963886"]

  const createWhatsappUrl = (productName?: string, productId?: number, productPrice?: string) => {
    let message = "Hi! I'm interested in your bags from The Bag Boutique located in Nakuru near Egerton University."

    if (productName && productId && productPrice) {
      message = `Hi! I'm interested in the *${productName}* (Bag ID: ${productId}) priced at *${productPrice}* from The Bag Boutique. 

📍 Location: Nakuru, near Egerton University
💰 Price: ${productPrice}
🆔 Bag ID: ${productId}

Is this bag still available? I would like to know more details about it.`
    }

    return `https://wa.me/${whatsappNumbers[0]}?text=${encodeURIComponent(message)}`
  }

  // Fetch products from API and merge with sample products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products")
        const data = await response.json()
        const apiProducts = data.products || []

        // Merge API products with sample products, giving priority to API products
        const allProducts = [
          ...apiProducts,
          ...sampleProducts.filter((sample) => !apiProducts.some((api: Product) => api.id === sample.id)),
        ]

        setProducts(allProducts)
      } catch (error) {
        console.error("Failed to fetch products:", error)
        // If API fails, use sample products
        setProducts(sampleProducts)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const toggleVideo = () => {
    const video = document.getElementById("showcase-video") as HTMLVideoElement
    if (video) {
      if (isVideoPlaying) {
        video.pause()
      } else {
        video.play()
      }
      setIsVideoPlaying(!isVideoPlaying)
    }
  }

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
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Image
                  src="/logo.jpg"
                  alt="The Bag Boutique Logo"
                  width={50}
                  height={50}
                  className="sm:w-[60px] sm:h-[60px] rounded-full shadow-lg ring-2 ring-rose-200"
                />
                <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                  The Bag Boutique
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 font-medium">Premium bags for every occasion</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
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
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-xl border-0 font-bold transition-all duration-200 transform hover:scale-105 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
                >
                  <Link href={createWhatsappUrl()} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">WhatsApp Us</span>
                    <span className="sm:hidden">WhatsApp</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Video Showcase Section */}
      <section className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] overflow-hidden">
        <video
          id="showcase-video"
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202025-07-12%20at%2018.15.44_727e4e0c-D4if7tgWwKmxLQhzSdDscPWLzQroaZ.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Video Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Video Content */}
        <div className="absolute inset-0 flex items-center justify-center text-center text-white z-10">
          <div className="max-w-4xl mx-auto px-4">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-lg">
              <Sparkles className="w-4 h-4" />
              Watch Our Collection in Action
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Discover Your Perfect
              <span className="block bg-gradient-to-r from-rose-300 to-pink-300 bg-clip-text text-transparent">
                Bag Collection
              </span>
            </h2>

            <p className="text-lg lg:text-xl mb-8 max-w-2xl mx-auto leading-relaxed opacity-90">
              Premium quality bags crafted for style, comfort, and durability. See our collection come to life.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 text-lg shadow-xl transition-all duration-200 transform hover:scale-105 font-bold"
              >
                <Link href={createWhatsappUrl()} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Order Now on WhatsApp
                </Link>
              </Button>

              <Button
                onClick={toggleVideo}
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg bg-white/10 backdrop-blur-sm shadow-xl font-semibold transition-all duration-200 transform hover:scale-105"
              >
                {isVideoPlaying ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
                {isVideoPlaying ? "Pause Video" : "Play Video"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-8 sm:py-12 lg:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-100/50 to-pink-100/50"></div>
        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Elegant Bags for Every Occasion
            </h3>

            <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
              Discover our curated collection of premium bags that blend style, functionality, and elegance.
            </p>

            <div className="flex items-center justify-center gap-2 text-gray-600 mb-6 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full inline-flex shadow-sm">
              <MapPin className="h-4 w-4 text-rose-500" />
              <span className="text-sm sm:text-base">Located in Nakuru, near Egerton University</span>
            </div>

            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 text-lg shadow-xl transition-all duration-200 transform hover:scale-105 font-bold"
            >
              <Link href="#products">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Shop Collection
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products Preview */}
      {availableProducts.length > 0 && (
        <section className="py-8 sm:py-12 lg:py-16 bg-white/60 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 sm:mb-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Featured Collection</h3>
              <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                A glimpse of our most popular bags, crafted with attention to detail and designed for the modern
                lifestyle.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6 max-w-7xl mx-auto">
              {availableProducts.slice(0, 10).map((product) => (
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
                      <Badge className="absolute top-2 right-2 bg-green-500 text-white shadow-lg text-xs">
                        Available
                      </Badge>
                      <Badge className="absolute top-2 left-2 bg-blue-500 text-white shadow-lg text-xs">
                        ID: {product.id}
                      </Badge>
                    </div>
                    <div className="p-2 sm:p-4 text-center">
                      <h4 className="font-bold text-gray-900 mb-1 text-xs sm:text-sm lg:text-base line-clamp-1">
                        {product.name}
                      </h4>
                      <p className="text-xs text-gray-600 mb-1 font-medium">{product.category}</p>
                      <p className="font-bold text-rose-600 mb-2 sm:mb-3 text-sm sm:text-lg">{product.price}</p>
                      <Button
                        asChild
                        size="sm"
                        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg transition-all duration-200 transform hover:scale-105 text-xs sm:text-sm font-bold"
                      >
                        <Link
                          href={createWhatsappUrl(product.name, product.id, product.price)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          <span className="hidden sm:inline">Order This Bag</span>
                          <span className="sm:hidden">Order</span>
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
      <section id="products" className="py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Complete Collection</h3>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Browse our entire range of beautiful bags. Each piece is carefully selected to ensure quality and style.
            </p>
          </div>

          {availableProducts.length === 0 ? (
            <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border-0 max-w-2xl mx-auto">
              <CardContent className="text-center py-12 sm:py-16">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-rose-500" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">New Collection Coming Soon!</h3>
                <p className="text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
                  We're updating our inventory with beautiful new bags. Check back soon or contact us directly for the
                  latest arrivals!
                </p>
                <div className="space-y-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-xl transition-all duration-200 transform hover:scale-105 font-bold"
                  >
                    <Link href={createWhatsappUrl()} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Contact Us for Updates
                    </Link>
                  </Button>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm text-gray-500">
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
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
                      <Badge className="absolute top-1.5 right-1.5 bg-green-500 text-white text-xs shadow-lg">
                        Available
                      </Badge>
                      <Badge className="absolute top-1.5 left-1.5 bg-blue-500 text-white text-xs shadow-lg">
                        ID: {product.id}
                      </Badge>
                    </div>
                    <div className="p-2 sm:p-3 text-center">
                      <h4 className="font-bold text-gray-900 mb-1 text-xs sm:text-sm line-clamp-1">{product.name}</h4>
                      <p className="text-xs text-gray-600 mb-1 font-medium">{product.category}</p>
                      <p className="font-bold text-rose-600 mb-2 text-sm sm:text-base">{product.price}</p>
                      <Button
                        asChild
                        size="sm"
                        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-xs shadow-lg transition-all duration-200 transform hover:scale-105 font-bold py-1.5 sm:py-2"
                      >
                        <Link
                          href={createWhatsappUrl(product.name, product.id, product.price)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageCircle className="w-3 h-3 mr-1" />
                          <span className="hidden sm:inline">Order Now</span>
                          <span className="sm:hidden">Order</span>
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
      <section className="py-8 sm:py-12 lg:py-16 bg-white/60 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Why Choose Our Boutique?</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
            <Card className="text-center border-0 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-6 sm:p-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                  <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Curated Selection</h4>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  Each bag is carefully selected for quality, style, and functionality to meet your needs.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-6 sm:p-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                  <Star className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Premium Quality</h4>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  We ensure every bag meets our high standards for durability, design, and craftsmanship.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-6 sm:p-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                  <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Personal Service</h4>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  Direct communication with our team for personalized assistance and quick responses.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-r from-rose-600 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 text-center relative">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Find Your Perfect Bag?</h3>
          <p className="text-rose-100 mb-4 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Contact us directly on WhatsApp to inquire about any of our beautiful bags. We're here to help you find the
            perfect match for your style and needs.
          </p>
          <div className="flex items-center justify-center gap-2 text-rose-100 mb-6 sm:mb-8 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full inline-flex">
            <MapPin className="h-4 w-4" />
            <span className="text-sm sm:text-base">Visit us in Nakuru, near Egerton University</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg shadow-xl border-0 font-bold transition-all duration-200 transform hover:scale-105"
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
              className="border-2 border-white text-white hover:bg-white hover:text-rose-600 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg bg-transparent backdrop-blur-sm font-bold transition-all duration-200 transform hover:scale-105"
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
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
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
                <h4 className="font-bold text-lg sm:text-xl bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
                  The Bag Boutique
                </h4>
                <p className="text-gray-400 text-sm">Premium bags for every occasion</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm text-gray-400 mb-6 sm:mb-8 max-w-md mx-auto">
              <div className="flex items-center justify-center gap-2 bg-gray-800 px-3 sm:px-4 py-2 rounded-lg">
                <MapPin className="h-4 w-4 text-rose-400" />
                <span className="text-xs sm:text-sm">Nakuru, near Egerton University</span>
              </div>
              <div className="flex items-center justify-center gap-2 bg-gray-800 px-3 sm:px-4 py-2 rounded-lg">
                <Phone className="h-4 w-4 text-rose-400" />
                <span className="text-xs sm:text-sm">{whatsappNumbers.join(" / ")}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-green-400 text-green-400 hover:bg-green-400 hover:text-white bg-transparent shadow-lg font-bold transition-all duration-200 transform hover:scale-105"
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
                className="border-green-400 text-green-400 hover:bg-green-400 hover:text-white bg-transparent shadow-lg font-bold transition-all duration-200 transform hover:scale-105"
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

            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
              <p>&copy; 2024 The Bag Boutique. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
