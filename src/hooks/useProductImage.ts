import { useState, useEffect } from 'react';
import { ProductImageService, ProductImageResult } from '@/services/productImageService';

interface UseProductImageResult {
  imageUrl: string | null;
  isLoading: boolean;
  error: string | null;
  source: 'mock' | null;
  retry: () => void;
}

export const useProductImage = (productName: string): UseProductImageResult => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<'mock' | null>(null);

  const fetchImage = async () => {
    if (!productName) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result: ProductImageResult = await ProductImageService.getProductImage(productName);
      
      setImageUrl(result.imageUrl);
      setSource(result.source);
      setError(null);
    } catch (err) {
      setError('Failed to load product image');
      setImageUrl(null);
      setSource(null);
    } finally {
      setIsLoading(false);
    }
  };

  const retry = () => {
    fetchImage();
  };

  useEffect(() => {
    fetchImage();
  }, [productName]);

  return {
    imageUrl,
    isLoading,
    error,
    source,
    retry
  };
}; 