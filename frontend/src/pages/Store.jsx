
import Carousel from "../components/Carousel.jsx";
import slides from "../data/store-carousel.json";
import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Star, Plus } from 'lucide-react';
import { toast } from "sonner"

import { useNavigate } from 'react-router-dom';
import axios  from 'axios';


const MedicalStorePage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Mock data for demonstration - replace with actual API call
  const mockProducts = [
    {
      _id: '1',
      name: 'Digital Thermometer',
      description: 'High precision digital thermometer with fast reading and memory function',
      originalPrice: 799.99,
      discountedPrice: 549.99,
      imagePublicId: 'medical/thermometer',
      category: 'Diagnostic Tools',
      inStock: true,
      rating: 4.5
    },
    {
      _id: '2',
      name: 'Blood Pressure Monitor',
      description: 'Automatic digital blood pressure monitor with large display and memory storage',
      originalPrice: 2500.99,
      discountedPrice: 2249.99,
      imagePublicId: 'medical/bp-monitor',
      category: 'Monitoring Devices',
      inStock: true,
      rating: 4.7
    },
    {
      _id: '3',
      name: 'First Aid Kit',
      description: 'Complete first aid kit with essential medical supplies for emergencies',
      originalPrice: 1599.99,
      discountedPrice: 1099.99,
      imagePublicId: 'medical/first-aid',
      category: 'Emergency Care',
      inStock: true,
      rating: 4.3
    },
    {
      _id: '4',
      name: 'Pulse Oximeter',
      description: 'Fingertip pulse oximeter for measuring blood oxygen saturation and pulse rate',
      originalPrice: 1200.99,
      discountedPrice: 950.99,
      imagePublicId: 'medical/oximeter',
      category: 'Diagnostic Tools',
      inStock: false,
      rating: 4.6
    },
    {
      _id: '5',
      name: 'Stethoscope',
      description: 'Professional quality stethoscope for accurate heart and lung sound detection',
      originalPrice: 3399.99,
      discountedPrice: 2999.99,
      imagePublicId: 'medical/stethoscope',
      category: 'Diagnostic Tools',
      inStock: true,
      rating: 4.8
    },
    {
      _id: '6',
      name: 'Wheelchair',
      description: 'Lightweight, foldable wheelchair with comfortable padding and safety features',
      originalPrice: 29999.99,
      discountedPrice: 24999.99,
      imagePublicId: 'medical/wheelchair',
      category: 'Mobility Aids',
      inStock: true,
      rating: 4.4
    }
  ];

  // Fetch products from MongoDB - replace with actual API endpoint
  const fetchProducts = async () => {
    try {
      setLoading(true);
    
      const response = await axios.get('http://localhost:3000/api/v1/admin/products');
      const data = await response.data.products;
      console.log(data);
      
  
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
   
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Search functionality
  useEffect(() => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  // Generate Cloudinary URL from public ID
  
  const getCloudinaryUrl = (publicId) => {
    // Replace 'your_cloud_name' with your actual Cloudinary cloud name
    return `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/w_300,h_300,c_fill,f_auto,q_auto/${publicId}`;
  };

  // Add to cart function
  const addToCart = (product) => {
    if (!product.inStock) return;
    
    // Here you would typically add the product to cart state or send to backend
    console.log('Adding to cart:', product);
    setCartCount(prev => prev + 1);
    
    // You can add toast notification here
    toast(`${product.name} added to cart`, {
          description: `${ product.description} `,
          
        })
  };

  // Product Card Component
  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      {/* Product Image */}
      <div className="relative overflow-hidden h-64 bg-gray-100">
        <img
          src={getCloudinaryUrl(product.image)}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            // Fallback image if Cloudinary image fails to load
            e.target.src = `https://via.placeholder.com/300x300/e5e7eb/6b7280?text=${encodeURIComponent(product.name)}`;
          }}
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">Out of Stock</span>
          </div>
        )}
        {product.originalPrice > product.discountedPrice && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
            {Math.round(((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100)}% OFF
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4">
        {/* Product Name */}
        <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-1">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">({product.rating})</span>
        </div>

        {/* Product Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Pricing */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-green-600">
              ₹{product.discountedPrice.toFixed(2)}
            </span>
            {product.originalPrice > product.discountedPrice && (
              <span className="text-lg text-gray-500 line-through">
                ₹{product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => addToCart(product)}
          disabled={!product.inStock}
          className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2 ${
            product.inStock
              ? 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <Plus size={18} />
          <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen relative mt-12 bg-gray-50">
      {/* Header with Search and Cart */}
      <header className="bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center ">
              <h1 className="text-2xl font-bold text-blue-600 ">MedStore</h1>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search medical products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            {/* Cart Button */}
            <button  onClick={() => navigate("/cart")} className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="min-w-screen mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Carousel Placeholder */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Latest Offers & Promotions</h2>
           
            <div className=" text-sm text-blue-200">
              <Carousel slides={slides}
              />
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Medical Products</h2>
            <p className="text-gray-600">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                  <div className="h-64 bg-gray-300"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded mb-4"></div>
                    <div className="h-6 bg-gray-300 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {/* Products Grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              ) : (
                /* No Products Found */
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Search size={64} className="mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
                  <p className="text-gray-500">
                    {searchTerm 
                      ? `No products match "${searchTerm}". Try a different search term.`
                      : 'No products available at the moment.'
                    }
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default MedicalStorePage;