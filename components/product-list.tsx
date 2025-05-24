'use client';

import { apiClient } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import * as React from 'react';

type Product = {
  id: number;
  name: string;
  price: number;
  color: string;
};

async function getProducts() {
  try {
    const response = await apiClient.get<Product[]>('/products');
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error('Server Error');
    }
  }
}

function ListContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 flex-1 shrink-0">
      <p className="mb-3 font-bold">List of Products</p>
      {children}
    </div>
  );
}

export function ProductList() {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    retry: false, // disable retry
  });

  if (isLoading)
    return (
      <ListContainer>
        <p>Loading...</p>
      </ListContainer>
    );

  if (error)
    return (
      <ListContainer>
        <p>Error: {error.message}</p>
      </ListContainer>
    );

  if (!products?.length)
    return (
      <ListContainer>
        <p>No products to display.</p>
      </ListContainer>
    );

  return (
    <ListContainer>
      <ul className="space-y-4">
        {products?.map((product) => (
          <li key={product.id}>
            <div className="p-4 bg-card">
              <h2 className="font-semibold">{product.name}</h2>
              <p className="text-sm">{product.color}</p>
              <p className="text-sm text-muted-foreground">{product.price}</p>
            </div>
          </li>
        ))}
      </ul>
    </ListContainer>
  );
}
