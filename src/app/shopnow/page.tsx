import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

async function shopnow() {
  const res = await client.fetch(`*[_type == "product" && image.asset != null] {
    _id,
    name,
    image,
    price,
    description,
    discountPercentage,
    isFeaturedProduct,
    stockLevel,
    category
  }`);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Shop Now</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {res.map((item: any) => {
          // Image URL Validation
          const imageUrl = item.image?.asset ? urlFor(item.image).url() : null;

          if (!imageUrl) return null; // Skip this product if no valid image URL

          return (
            <div key={item._id} className="bg-white shadow-md rounded-lg p-4 transition-transform hover:scale-105">
              <Image
                src={imageUrl}
                alt={item.name}
                width={300}
                height={300}
                className="w-full h-48 object-cover rounded-md"
              />
              <div className="mt-4">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-lg font-bold text-green-600">${item.price}</p>
                <p className="text-gray-700 mt-2">{item.description}</p>
                {item.discountPercentage > 0 && (
                  <p className="text-red-500 font-semibold mt-1">{item.discountPercentage}% Off</p>
                )}
                <p className={`mt-2 text-sm font-semibold ${item.isFeaturedProduct ? 'text-blue-500' : 'text-gray-500'}`}>
                  Featured: {item.isFeaturedProduct ? 'Yes' : 'No'}
                </p>
                <p className="text-sm text-gray-600">Stock: {item.stockLevel}</p>
                <p className="text-sm text-gray-600">Category: {item.category}</p>

        {/* 🔹 View Details Button with Dynamic Link */}
        <Link 
          href={`/shop/${item._id}`} 
          className="block text-center bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600 transition">
          View Details
        </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default shopnow;
