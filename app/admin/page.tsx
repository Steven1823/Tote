"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Plus,
  Edit,
  Trash2,
  Package,
  ShoppingBag,
  MapPin,
  Phone,
  Lock,
  Upload,
  TrendingUp,
  DollarSign,
  Camera,
  X,
} from "lucide-react"

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

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [authError, setAuthError] = useState("")
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    price: "",
    image: "",
    description: "",
    category: "Handbag",
    isSold: false,
  })

  // Check authentication on mount
  useEffect(() => {
    const authToken = localStorage.getItem("adminAuth")
    if (authToken === "admin-authenticated") {
      setIsAuthenticated(true)
      fetchProducts()
    }
  }, [])

  const handleAuthentication = async () => {
    try {
      setLoading(true)
      setAuthError("")

      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber }),
      })

      const data = await response.json()

      if (data.success) {
        localStorage.setItem("adminAuth", data.token)
        setIsAuthenticated(true)
        fetchProducts()
      } else {
        setAuthError(data.message)
      }
    } catch (error) {
      setAuthError("Authentication failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products")
      const data = await response.json()
      setProducts(data.products || [])
    } catch (error) {
      console.error("Failed to fetch products:", error)
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, isEdit = false) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        if (isEdit && editingProduct) {
          setEditingProduct({ ...editingProduct, image: result })
        } else {
          setNewProduct({ ...newProduct, image: result })
          setImagePreview(result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleToggleSold = async (id: number) => {
    try {
      const product = products.find((p) => p.id === id)
      if (!product) return

      const response = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isSold: !product.isSold }),
      })

      if (response.ok) {
        setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, isSold: !p.isSold } : p)))
      }
    } catch (error) {
      console.error("Failed to update product:", error)
    }
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setIsEditDialogOpen(true)
  }

  const handleUpdateProduct = async () => {
    if (!editingProduct) return

    try {
      const response = await fetch(`/api/products/${editingProduct.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingProduct),
      })

      if (response.ok) {
        const data = await response.json()
        setProducts((prev) => prev.map((p) => (p.id === editingProduct.id ? data.product : p)))
        setIsEditDialogOpen(false)
        setEditingProduct(null)
      }
    } catch (error) {
      console.error("Failed to update product:", error)
    }
  }

  const handleAddProduct = async () => {
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      })

      if (response.ok) {
        const data = await response.json()
        setProducts((prev) => [...prev, data.product])
        setNewProduct({
          name: "",
          price: "",
          image: "",
          description: "",
          category: "Handbag",
          isSold: false,
        })
        setImagePreview("")
        setIsAddDialogOpen(false)
      }
    } catch (error) {
      console.error("Failed to add product:", error)
    }
  }

  const handleDeleteProduct = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id))
      }
    } catch (error) {
      console.error("Failed to delete product:", error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    setIsAuthenticated(false)
    setPhoneNumber("")
    setProducts([])
  }

  // Authentication screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-2">
              <div className="w-20 h-20 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Lock className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                Admin Access
              </CardTitle>
              <p className="text-gray-600 mt-2">Enter your phone number to access the admin panel</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="254753323940"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAuthentication()}
                  className="h-12 text-lg border-2 focus:border-rose-500 transition-colors"
                />
              </div>

              {authError && (
                <Alert variant="destructive" className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-700">{authError}</AlertDescription>
                </Alert>
              )}

              <Button
                onClick={handleAuthentication}
                className="w-full h-12 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold shadow-lg transition-all duration-200 transform hover:scale-105"
                disabled={loading || !phoneNumber}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Authenticating...
                  </div>
                ) : (
                  "Access Admin Panel"
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const availableProducts = products.filter((p) => !p.isSold)
  const soldProducts = products.filter((p) => p.isSold)
  const totalRevenue = soldProducts.reduce((sum, product) => {
    const price = Number.parseFloat(product.price.replace(/[^\d.]/g, ""))
    return sum + (isNaN(price) ? 0 : price)
  }, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-rose-50/30 to-pink-50/30">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                Bag Inventory Management
              </h1>
              <p className="text-gray-600 mt-1">Manage your bag collection, update prices, and track sales</p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-rose-500" />
                  <span>Nakuru, near Egerton University</span>
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4 text-rose-500" />
                  <span>+254753323940 / 0718963886</span>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="border-rose-200 text-rose-600 hover:bg-rose-50 self-start sm:self-auto bg-transparent"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-lg">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Package className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-blue-700">Total Products</p>
                  <p className="text-2xl font-bold text-blue-900">{products.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow-lg">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shadow-lg">
                  <ShoppingBag className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-green-700">Available</p>
                  <p className="text-2xl font-bold text-green-900">{availableProducts.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 shadow-lg">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center shadow-lg">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-red-700">Sold</p>
                  <p className="text-2xl font-bold text-red-900">{soldProducts.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 shadow-lg">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-purple-700">Revenue</p>
                  <p className="text-2xl font-bold text-purple-900">KSH {totalRevenue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add New Product Button */}
        <div className="mb-6">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white shadow-lg transition-all duration-200 transform hover:scale-105">
                <Plus className="w-4 h-4 mr-2" />
                Add New Bag
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-gray-900">Add New Bag</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {/* Image Upload */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Product Image</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-rose-400 transition-colors">
                    {imagePreview || newProduct.image ? (
                      <div className="relative">
                        <Image
                          src={imagePreview || newProduct.image || "/placeholder.svg"}
                          alt="Preview"
                          width={200}
                          height={200}
                          className="mx-auto rounded-lg object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => {
                            setImagePreview("")
                            setNewProduct({ ...newProduct, image: "" })
                          }}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="py-8">
                        <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600 mb-2">Upload product image</p>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e)}
                          className="hidden"
                          id="image-upload"
                        />
                        <Label
                          htmlFor="image-upload"
                          className="inline-flex items-center px-4 py-2 bg-rose-500 text-white rounded-lg cursor-pointer hover:bg-rose-600 transition-colors"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Choose Image
                        </Label>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                      Bag Name
                    </Label>
                    <Input
                      id="name"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g., Classic Leather Handbag"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="price" className="text-sm font-medium text-gray-700">
                      Price
                    </Label>
                    <Input
                      id="price"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct((prev) => ({ ...prev, price: e.target.value }))}
                      placeholder="e.g., KSH 1,500"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                    Category
                  </Label>
                  <Select
                    value={newProduct.category}
                    onValueChange={(value) => setNewProduct((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Handbag">Handbag</SelectItem>
                      <SelectItem value="Tote">Tote</SelectItem>
                      <SelectItem value="Clutch">Clutch</SelectItem>
                      <SelectItem value="Crossbody">Crossbody</SelectItem>
                      <SelectItem value="Shoulder Bag">Shoulder Bag</SelectItem>
                      <SelectItem value="Backpack">Backpack</SelectItem>
                      <SelectItem value="Wallet">Wallet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Brief description of the bag"
                    className="mt-1 min-h-[80px]"
                  />
                </div>

                <Button
                  onClick={handleAddProduct}
                  className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white"
                  disabled={!newProduct.name || !newProduct.price}
                >
                  Add Bag
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Products Tabs */}
        <Tabs defaultValue="available" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white shadow-sm border">
            <TabsTrigger
              value="available"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-green-600 data-[state=active]:text-white"
            >
              Available Bags ({availableProducts.length})
            </TabsTrigger>
            <TabsTrigger
              value="sold"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-red-600 data-[state=active]:text-white"
            >
              Sold Bags ({soldProducts.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="space-y-4 mt-6">
            {availableProducts.length === 0 ? (
              <Card className="bg-white shadow-lg border-0">
                <CardContent className="text-center py-16">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No bags available</h3>
                  <p className="text-gray-600 mb-6">Start by adding your first bag to the inventory</p>
                  <Button
                    onClick={() => setIsAddDialogOpen(true)}
                    className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white shadow-lg"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Bag
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {availableProducts.map((product) => (
                  <Card
                    key={product.id}
                    className="bg-white shadow-lg border-0 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="aspect-square relative bg-gray-100">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                      <Badge className="absolute top-3 right-3 bg-green-500 text-white shadow-lg">Available</Badge>
                      <Badge className="absolute top-3 left-3 bg-blue-500 text-white shadow-lg">ID: {product.id}</Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg mb-1 text-gray-900 line-clamp-1">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                      <p className="text-rose-600 font-bold text-xl mb-3">{product.price}</p>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>

                      <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
                        <Label htmlFor={`sold-${product.id}`} className="text-sm font-medium">
                          Mark as Sold
                        </Label>
                        <Switch
                          id={`sold-${product.id}`}
                          checked={product.isSold}
                          onCheckedChange={() => handleToggleSold(product.id)}
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditProduct(product)}
                          className="flex-1 border-rose-200 text-rose-600 hover:bg-rose-50"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteProduct(product.id)}
                          className="border-red-200 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="sold" className="space-y-4 mt-6">
            {soldProducts.length === 0 ? (
              <Card className="bg-white shadow-lg border-0">
                <CardContent className="text-center py-16">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No sold items yet</h3>
                  <p className="text-gray-600">Sold items will appear here</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {soldProducts.map((product) => (
                  <Card key={product.id} className="bg-white shadow-lg border-0 overflow-hidden opacity-75">
                    <div className="aspect-square relative bg-gray-100">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover grayscale"
                      />
                      <Badge className="absolute top-3 right-3 bg-red-500 text-white shadow-lg">Sold</Badge>
                      <Badge className="absolute top-3 left-3 bg-gray-500 text-white shadow-lg">ID: {product.id}</Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg mb-1 text-gray-900 line-clamp-1">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                      <p className="text-rose-600 font-bold text-xl mb-4">{product.price}</p>

                      <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
                        <Label htmlFor={`available-${product.id}`} className="text-sm font-medium">
                          Mark as Available
                        </Label>
                        <Switch
                          id={`available-${product.id}`}
                          checked={!product.isSold}
                          onCheckedChange={() => handleToggleSold(product.id)}
                        />
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteProduct(product.id)}
                        className="w-full border-red-200 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Edit Product Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-gray-900">Edit Bag</DialogTitle>
            </DialogHeader>
            {editingProduct && (
              <div className="space-y-4">
                {/* Image Upload for Edit */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Product Image</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-rose-400 transition-colors">
                    {editingProduct.image ? (
                      <div className="relative">
                        <Image
                          src={editingProduct.image || "/placeholder.svg"}
                          alt="Preview"
                          width={200}
                          height={200}
                          className="mx-auto rounded-lg object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => setEditingProduct({ ...editingProduct, image: "" })}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="py-8">
                        <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600 mb-2">Upload product image</p>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, true)}
                          className="hidden"
                          id="edit-image-upload"
                        />
                        <Label
                          htmlFor="edit-image-upload"
                          className="inline-flex items-center px-4 py-2 bg-rose-500 text-white rounded-lg cursor-pointer hover:bg-rose-600 transition-colors"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Choose Image
                        </Label>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-name" className="text-sm font-medium text-gray-700">
                      Bag Name
                    </Label>
                    <Input
                      id="edit-name"
                      value={editingProduct.name}
                      onChange={(e) => setEditingProduct((prev) => (prev ? { ...prev, name: e.target.value } : null))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-price" className="text-sm font-medium text-gray-700">
                      Price
                    </Label>
                    <Input
                      id="edit-price"
                      value={editingProduct.price}
                      onChange={(e) => setEditingProduct((prev) => (prev ? { ...prev, price: e.target.value } : null))}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="edit-category" className="text-sm font-medium text-gray-700">
                    Category
                  </Label>
                  <Select
                    value={editingProduct.category}
                    onValueChange={(value) => setEditingProduct((prev) => (prev ? { ...prev, category: value } : null))}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Handbag">Handbag</SelectItem>
                      <SelectItem value="Tote">Tote</SelectItem>
                      <SelectItem value="Clutch">Clutch</SelectItem>
                      <SelectItem value="Crossbody">Crossbody</SelectItem>
                      <SelectItem value="Shoulder Bag">Shoulder Bag</SelectItem>
                      <SelectItem value="Backpack">Backpack</SelectItem>
                      <SelectItem value="Wallet">Wallet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="edit-description" className="text-sm font-medium text-gray-700">
                    Description
                  </Label>
                  <Textarea
                    id="edit-description"
                    value={editingProduct.description}
                    onChange={(e) =>
                      setEditingProduct((prev) => (prev ? { ...prev, description: e.target.value } : null))
                    }
                    className="mt-1 min-h-[80px]"
                  />
                </div>

                <Button
                  onClick={handleUpdateProduct}
                  className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white"
                >
                  Update Bag
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
