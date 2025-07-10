import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Package, Shield, Award, Truck, Loader2 } from 'lucide-react';
import { useProduct } from '../hooks/useProducts';
import { QuotesAPI } from '../lib/api/quotes';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { product, relatedProducts, loading, error } = useProduct(id || '');
  const [selectedPackage, setSelectedPackage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quoteLoading, setQuoteLoading] = useState(false);

  // Set default package when product loads
  React.useEffect(() => {
    if (product?.packages?.length && !selectedPackage) {
      const defaultPkg = product.packages.find(pkg => pkg.is_default) || product.packages[0];
      setSelectedPackage(defaultPkg.weight);
    }
  }, [product, selectedPackage]);

  const handleQuoteRequest = async () => {
    if (!product || !selectedPackage) return;
    
    try {
      setQuoteLoading(true);
      // In a real app, you'd collect customer info first
      await QuotesAPI.submitQuoteRequest({
        product_id: product.id,
        customer_name: 'Sample Customer',
        customer_email: 'customer@example.com',
        quantity,
        package_size: selectedPackage,
        message: `Quote request for ${product.name}`
      });
      alert('Quote request submitted successfully!');
    } catch (err) {
      console.error('Error submitting quote:', err);
      alert('Failed to submit quote request. Please try again.');
    } finally {
      setQuoteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <Loader2 className="animate-spin text-[#b9a779]" size={48} />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#edebe0] pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">
            {error || 'Product not found'}
          </p>
          <Link 
            to="/products"
            className="text-[#b9a779] hover:text-[#054239] font-medium"
          >
            ← Back to Products
          </Link>
        </div>
      </div> 
    );
  }

  return (
    <div className="min-h-screen bg-[#edebe0] pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link 
          to="/products"
          className="inline-flex items-center text-[#b9a779] hover:text-[#054239] font-medium mb-8 transition-colors duration-300"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div>
            <div className="mb-4">
              <img 
                src={product.images?.[currentImageIndex]?.image_url || 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=800&h=600'} 
                alt={product.name}
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="flex space-x-4">
                {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    currentImageIndex === index ? 'border-[#b9a779]' : 'border-gray-200'
                  }`}
                >
                  <img src={image.image_url} alt={image.alt_text || `${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div>
            <div className="mb-6">
              <span className="text-[#b9a779] font-medium">{product.category?.name || 'Product'}</span>
              <h1 className="text-4xl font-bold text-[#054239] mt-2 mb-4">{product.name}</h1>
              <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
            </div>

            {/* Packaging Options */}
            {product.packages && product.packages.length > 0 && (
              <div className="mb-6">
              <h3 className="text-xl font-semibold text-[#054239] mb-4">Packaging Options</h3>
                <div className="grid grid-cols-3 gap-4">
                  {product.packages.map((pkg) => (
                  <button
                    key={pkg.weight}
                    onClick={() => setSelectedPackage(pkg.weight)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      selectedPackage === pkg.weight
                        ? 'border-[#b9a779] bg-[#b9a779]/10'
                        : 'border-gray-200 hover:border-[#b9a779]/50'
                    }`}
                  >
                    <div className="text-center">
                      <Package size={24} className="mx-auto mb-2 text-[#b9a779]" />
                      <div className="font-semibold text-[#054239]">{pkg.weight}</div>
                      <div className="text-[#b9a779] font-bold">${pkg.price}</div>
                    </div>
                  </button>
                ))}
                </div>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="mb-8">
              <div className="flex items-center space-x-4 mb-4">
                <label className="text-lg font-medium text-[#054239]">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-100 transition-colors duration-200"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-gray-100 transition-colors duration-200"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex space-x-4">
                <button 
  className="flex-1 bg-[#b9a779] hover:bg-[#054239] text-white py-4 px-6 rounded-full font-semibold transition-all duration-300"
  onClick={handleQuoteRequest}
  disabled={quoteLoading || !selectedPackage}
>
  {quoteLoading ? 'Submitting...' : 'Request Quote'}
</button>

                <button className="flex-1 border-2 border-[#b9a779] text-[#b9a779] hover:bg-[#b9a779] hover:text-white py-4 px-6 rounded-full font-semibold transition-all duration-300">
                  Contact Supplier
                </button>
              </div>
            </div>

            {/* Product Features */}
            {product.features && product.features.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-[#054239] mb-4 flex items-center">
                <Award size={24} className="mr-2 text-[#b9a779]" />
                Additional Information
              </h3>
              <ul className="space-y-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Shield size={16} className="text-[#b9a779] mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
          <h2 className="text-3xl font-bold text-[#054239] mb-8">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map(relatedProduct => (
              <Link
                key={relatedProduct.id}
                to={`/product/${relatedProduct.id}`}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={relatedProduct.images?.[0]?.image_url || 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=400&h=300'} 
                    alt={relatedProduct.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#054239] mb-2">{relatedProduct.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#b9a779]">
                      ${relatedProduct.packages?.[0]?.price || relatedProduct.base_price}
                    </span>
                    <span className="text-[#b9a779] font-medium">View Details →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsPage;