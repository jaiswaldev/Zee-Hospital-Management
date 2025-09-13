import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingCart,
  ArrowLeft,
  CreditCard,
} from "lucide-react";
import axios from "axios";

const MedicalCartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Mock cart data for demonstration - replace with actual cart state/API
  // const mockCartItems = [
  //   {
  //     _id: "1",
  //     productId: "1",
  //     name: "Digital Thermometer",
  //     description:
  //       "High precision digital thermometer with fast reading and memory function",
  //     originalPrice: 999.99,
  //     discountedPrice: 549.99,
  //     imagePublicId: "medical/thermometer",
  //     quantity: 2,
  //     inStock: true,
  //   },
  //   {
  //     _id: "2",
  //     productId: "2",
  //     name: "Blood Pressure Monitor",
  //     description:
  //       "Automatic digital blood pressure monitor with large display and memory storage",
  //     originalPrice: 2500.99,
  //     discountedPrice: 2249.99,
  //     imagePublicId: "medical/bp-monitor",
  //     quantity: 1,
  //     inStock: true,
  //   },
  //   {
  //     _id: "3",
  //     productId: "5",
  //     name: "Stethoscope",
  //     description:
  //       "Professional quality stethoscope for accurate heart and lung sound detection",
  //     originalPrice: 3399.99,
  //     discountedPrice: 2999.99,
  //     imagePublicId: "medical/stethoscope",
  //     quantity: 1,
  //     inStock: true,
  //   },
  // ];

  // Load cart items on component mount
  useEffect(() => {
    const loadCartItems = async () => {
      try {
        setLoading(true);
        
        const CartItems = await axios.get("http://localhost:3000/api/v1/user/cart");
        setCartItems(CartItems.data.cartItems);
        setLoading(false);

      } catch (error) {
        console.error("Error loading cart items:", error);
        setLoading(false);
      }
    };

    loadCartItems();
  }, []);

  // Generate Cloudinary URL from public ID
  const getCloudinaryUrl = (publicId) => {
    return `https://res.cloudinary.com/your_cloud_name/image/upload/w_150,h_150,c_fill,f_auto,q_auto/${publicId}`;
  };

  // Update quantity function
  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      await fetch("http://localhost:3000/api/v1/user/cart/add", {
        method : "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: itemId, quantity: newQuantity })
      });

      // Update local state
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item._id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    try {
      // API call to remove item
      await fetch("http://localhost:3000/api/v1/user/cart/remove", {
        method : "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: itemId })
      })

      // Update local state
      setCartItems((prevItems) =>
        prevItems.filter((item) => item._id !== itemId)
      );
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // Calculate totals
  const calculateItemTotal = (item) => {
    return (item.discountedPrice * item.quantity).toFixed(2);
  };

  const calculateCartTotal = () => {
    return cartItems
      .reduce((total, item) => {
        return total + item.discountedPrice * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const finalCartTotal = () => {
    const total = parseFloat(calculateCartTotal());
    const finalTotal = total < 1000 ? total + 40 : total;
    return finalTotal.toFixed(2);
  };

  const calculateOriginalTotal = () => {
    return cartItems
      .reduce((total, item) => {
        return total + item.originalPrice * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const calculateTotalSavings = () => {
    const original = parseFloat(calculateOriginalTotal());
    const discounted = parseFloat(calculateCartTotal());
    return (original - discounted).toFixed(2);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Proceed to checkout
  const proceedToCheckout = () => {
    // Handle checkout logic here
    console.log("Proceeding to checkout with items:", cartItems);
    alert("Proceeding to checkout...");
  };

  // Cart Item Component
  const CartItem = ({ item }) => (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center gap-6">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={getCloudinaryUrl(item.imagePublicId)}
              alt={item.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null; // ✅ prevents infinite loop
               e.target.src = `https://dummyimage.com/150x150/e5e7eb/6b7280&text=${encodeURIComponent(item.name || 'Image')}`;

              }}
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-grow">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            {/* Name and Description */}
            <div className="flex-grow">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {item.name}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2">
                {item.description}
              </p>
              <div className="flex items-center mt-2 gap-2">
                <span className="text-green-600 font-semibold">
                  ₹{item.discountedPrice.toFixed(2)}
                </span>
                {item.originalPrice > item.discountedPrice && (
                  <span className="text-gray-500 line-through text-sm">
                    ₹{item.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="p-2 text-gray-600 hover:text-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 py-2 text-center min-w-[3rem] font-semibold">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeFromCart(item._id)}
                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                title="Remove from cart"
              >
                <Trash2 size={18} />
              </button>
            </div>

            {/* Item Total */}
            <div className="text-right">
              <div className="text-lg font-bold text-gray-800">
                ₹{calculateItemTotal(item)}
              </div>
              <div className="text-sm text-gray-500">
                ₹{item.discountedPrice.toFixed(2)} × {item.quantity}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Empty Cart Component
  const EmptyCart = () => (
    <div className="text-center py-16">
      <div className="text-gray-400 mb-6">
        <ShoppingCart size={80} className="mx-auto" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        No items in the cart
      </h2>
      <p className="text-gray-500 mb-8">
        Your cart is empty. Add some medical products to get started!
      </p>
      <button
        onClick={() => navigate("/store")}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
      >
        <ArrowLeft size={20} />
        Continue Shopping
      </button>
    </div>
  );

  // Loading Component
  const LoadingCart = () => (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-lg shadow-md p-6 animate-pulse"
        >
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-gray-300 rounded-lg"></div>
            <div className="flex-grow">
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-3 bg-gray-300 rounded mb-4 w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            </div>
            <div className="h-8 bg-gray-300 rounded w-32"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => window.history.back()}
                className="p-2 text-gray-600 hover:text-gray-800 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-2xl font-bold text-gray-800">
                Shopping Cart
              </h1>
            </div>
            {cartItems.length > 0 && (
              <div className="text-sm text-gray-600">
                {getTotalItems()} item{getTotalItems() !== 1 ? "s" : ""} in cart
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <LoadingCart />
        ) : cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Cart Items ({getTotalItems()})
              </h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <CartItem key={item._id} item={item} />
                ))}
              </div>
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">
                  Order Summary
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({getTotalItems()} items)</span>
                    <span>₹{calculateOriginalTotal()}</span>
                  </div>

                  {parseFloat(calculateTotalSavings()) > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Savings</span>
                      <span>-₹{calculateTotalSavings()}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    {calculateCartTotal() < 1000 ? (
                      <span>+ ₹{40}</span>
                    ) : (
                      <span className="text-green-600">Free</span>
                    )}
                  </div>

                  <hr className="border-gray-200" />

                  <div className="flex justify-between text-lg font-bold text-gray-800">
                    <span>Total</span>
                    <span>₹{finalCartTotal()}</span>
                  </div>
                </div>

                <button
                  onClick={proceedToCheckout}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2"
                >
                  <CreditCard size={20} />
                  Proceed to Checkout
                </button>

                <div className="mt-4 text-center">
                  <button
                    onClick={() => navigate("/store")}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default MedicalCartPage;
