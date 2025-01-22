import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import React from 'react';

async function shopnow() {
  const res = await client.fetch(`*[_type == "product"] {
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
    <div>
      <div>
        {res.map((item: any) => (
          <div key={item._id}>
            {item.image?.asset ? (
              <Image
                src={urlFor(item.image).url()}
                alt={item.name}
                width={200}
                height={200}
              />
            ) : (
              <p>No Image Available</p>
            )}
            <h1>{item.name}</h1>
            <h1>${item.price}</h1>
            <p>{item.description}</p>
            <p>{item.discountPercentage}%</p>
            <p>{item.isFeaturedProduct ? 'Yes' : 'No'}</p>
            <p>{item.stockLevel}</p>
            <p>{item.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default shopnow;


