import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Plus,
  Package,
  DollarSign,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  BarChart3,
  ShoppingBag,
  AlertCircle,
  Loader2,
  X,
} from "lucide-react";
import ProductForm from "./ProductForm";
import { image } from "@cloudinary/url-gen/qualifiers/source";
import { toast } from "sonner";
import { Cloudinary } from "@cloudinary/url-gen";

const Backend_API = import.meta.env.VITE_ADMIN_BACKEND_URL;

const MedicalAdminPanel = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [publicId, setPublicId] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(null);

   //Cloudinary config
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = "zee-hospital-upload";

  // Cloudinary configuration
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  // Upload Widget Configuration
  const uwConfig = {
    cloudName,
    uploadPreset,
    // Uncomment and modify as needed:
    // cropping: true,
    // showAdvancedOptions: true,
    // sources: ['local', 'url'],
    // multiple: false,
    // folder: 'user_images',
    // tags: ['users', 'profile'],
    // context: { alt: 'user_uploaded' },
    // clientAllowedFormats: ['images'],
    // maxImageFileSize: 2000000,
    // maxImageWidth: 2000,
    // theme: 'purple',
  };

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    originalPrice: "",
    discountedPrice: "",
    quantity: 0,
    image: "",
    inStock: true,
    totalSales: 0,
    totalRevenue: 0,
  });

  const categories = [
    "Diagnostic Tools",
    "Monitoring Devices", 
    "Emergency Care",
    "Mobility Aids",
    "Medical Supplies",
    "Rehabilitation Equipment",
    "Others",
  ];

  // Mock data for demonstration

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
    
      
     const response = await axios.get(`${Backend_API}/store/products`);
      setProducts(response.data.products);
      
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? e.target.checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: val,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      showNotification("Product name is required", "error");
      return false;
    }
    if (!formData.category) {
      showNotification("Category is required", "error");
      return false;
    }
    if (!formData.originalPrice || parseFloat(formData.originalPrice) <= 0) {
      showNotification("Valid original price is required", "error");
      return false;
    }
    if (!formData.discountedPrice || parseFloat(formData.discountedPrice) <= 0) {
      showNotification("Valid discounted price is required", "error");
      return false;
    }
    if (parseFloat(formData.discountedPrice) > parseFloat(formData.originalPrice)) {
      showNotification("Discounted price cannot be higher than original price", "error");
      return false;
    }
    if (formData.quantity < 0) {
      showNotification("Quantity cannot be negative", "error");
      return false;
    }
    return true;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {   
       const quantity = parseInt(formData.quantity);
      if (isNaN(quantity) || quantity < 0) {
        toast.error("Quantity must be a number and not less than 0.");
        return;
      }
      setLoading(true);
      const inStock = quantity > 0;
      // Create FormData for file upload
      const payload = {
        ...formData,
        image: publicId,
      };
      //API Call
      const res = await axios.post(
        `${Backend_API}/store/addproduct`,
        payload,{
          headers: {
             "Content-Type": "application/json",
         },
        }
      );

      const newProduct =  res.data.product;
      setProducts(prev => [ ...prev, newProduct]);
      resetForm();
      setShowAddForm(false);
      showNotification("Product added successfully!", "success");
      
    } catch (error) {
      console.error("Error adding product:", error);
      showNotification("Failed to add product. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      setDeleteLoading(productId);
      
        await axios.delete(
        `${Backend_API}/store/deleteproduct/${productId}`
      );
      
      setProducts(prev => prev.filter(product => product._id !== productId));
      showNotification("Product deleted successfully!", "success");
      
    } catch (error) {
      console.error("Error deleting product:", error);
      showNotification("Failed to delete product. Please try again.", "error");
    } finally {
      setDeleteLoading(null);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      category: "",
      originalPrice: "",
      discountedPrice: "",
      quantity: 0,
      image: "",
      inStock: true,
      totalSales: 0,
      totalRevenue: 0,
    });
    setPublicId("");
  };

  // Notification system
  const [notification, setNotification] = useState(null);
  
  const showNotification = (message, type = "info") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Calculate analytics
  const totalProducts = products.length;
  const totalRevenue =  products.reduce((sum, product) => sum + (product.totalRevenue || 0), 0);
const totalSales =  products.reduce((sum, product) => sum + (product.totalSales || 0), 0);
const averageRevenuePerProduct = totalProducts > 0 ? totalRevenue / totalProducts : 0;


  // Notification Component
  const Notification = ({ message, type, onClose }) => (
    <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
      type === 'success' ? 'bg-green-500' : 
      type === 'error' ? 'bg-red-500' : 'bg-blue-500'
    } text-white`}>
      <div className="flex items-center gap-2">
        {type === 'error' && <AlertCircle size={20} />}
        <span>{message}</span>
        <button onClick={onClose} className="ml-2">
          <X size={16} />
        </button>
      </div>
    </div>
  );


 

  // Dashboard Tab
  const DashboardTab = () => (
    <div className="space-y-6">
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 mt-16 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">{totalProducts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">₹{(totalRevenue || 0).toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <ShoppingBag className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Sales</p>
              <p className="text-2xl font-bold text-gray-900">{totalSales}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Revenue/Product</p>
              <p className="text-2xl font-bold text-gray-900">₹{(averageRevenuePerProduct || 0).toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Product Performance</h2>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <Loader2 className="animate-spin h-8 w-8 text-blue-600 mx-auto" />
            <p className="mt-2 text-gray-600">Loading products...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <AlertCircle className="h-8 w-8 text-red-500 mx-auto" />
            <p className="mt-2 text-red-600">{error}</p>
            <button
              onClick={fetchProducts}
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        ) : products.length === 0 ? (
          <div className="p-8 text-center">
            <Package className="h-8 w-8 text-gray-400 mx-auto" />
            <p className="mt-2 text-gray-600">No products found</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Your First Product
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sales
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <Package className="h-5 w-5 text-gray-500" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {product.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            Added {product.createdAt}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        ₹{product.discountedPrice}
                      </div>
                      {product.originalPrice > product.discountedPrice && (
                        <div className="text-sm text-gray-500 line-through">
                          ₹{product.originalPrice}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.totalSales}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                      ₹{product.totalRevenue.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          product.quantity > 0
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye size={16} />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => deleteProduct(product._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Notification */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto mt-15 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">MedStore Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors"
              >
                <Plus size={18} />
                Add Product
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "dashboard"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-2">
                <BarChart3 size={18} />
                Dashboard
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "dashboard" && <DashboardTab />}
      </main>

      {/* Add Product Modal */}
       <div className={showAddForm ? "block" : "hidden"}>
        <ProductForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          setShowAddForm={setShowAddForm}
          publicId={publicId}
          setPublicId={setPublicId}
          loading={loading}
          uwConfig={uwConfig}
          categories={categories}
        />
      </div>

    </div>
  );
};

export default MedicalAdminPanel;