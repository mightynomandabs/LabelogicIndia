// Product Image Service - Mock images only
export interface ProductImageResult {
  imageUrl: string;
  source: 'mock';
  timestamp: number;
}

export class ProductImageService {
  private static readonly CACHE_KEY = 'labelogic_product_images';
  private static readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

  // Mock images for different brands
  private static readonly MOCK_IMAGES = {
    'samsung': 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
    'xiaomi': 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
    'redmi': 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
    'oneplus': 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
    'realme': 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
    'oppo': 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
    'vivo': 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
    'default': 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop'
  };

  /**
   * Get product image with smart caching
   */
  static async getProductImage(productName: string): Promise<ProductImageResult> {
    try {
      // Check cache first
      const cached = this.getCachedImage(productName);
      if (cached) {
        return { ...cached, source: 'mock' as const };
      }

      // Get mock image based on product brand
      const mockImage = this.getMockImage(productName);
      this.cacheImage(productName, mockImage);
      
      return { 
        imageUrl: mockImage, 
        source: 'mock', 
        timestamp: Date.now() 
      };

    } catch (error) {
      console.error('Failed to get product image:', error);
      const mockImage = this.getMockImage(productName);
      return { 
        imageUrl: mockImage, 
        source: 'mock', 
        timestamp: Date.now() 
      };
    }
  }

  /**
   * Get cached image if available and not expired
   */
  private static getCachedImage(productName: string): ProductImageResult | null {
    try {
      const cache = localStorage.getItem(this.CACHE_KEY);
      if (!cache) return null;

      const cacheData = JSON.parse(cache);
      const cached = cacheData[productName.toLowerCase()];

      if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
        return cached;
      }

      return null;
    } catch (error) {
      console.warn('Cache read failed:', error);
      return null;
    }
  }

  /**
   * Cache image URL with timestamp
   */
  private static cacheImage(productName: string, imageUrl: string): void {
    try {
      const cache = localStorage.getItem(this.CACHE_KEY);
      const cacheData = cache ? JSON.parse(cache) : {};

      cacheData[productName.toLowerCase()] = {
        imageUrl,
        timestamp: Date.now()
      };

      localStorage.setItem(this.CACHE_KEY, JSON.stringify(cacheData));
    } catch (error) {
      console.warn('Cache write failed:', error);
    }
  }

  /**
   * Get mock image based on product brand
   */
  private static getMockImage(productName: string): string {
    const name = productName.toLowerCase();
    
    if (name.includes('samsung')) return this.MOCK_IMAGES.samsung;
    if (name.includes('xiaomi')) return this.MOCK_IMAGES.xiaomi;
    if (name.includes('redmi')) return this.MOCK_IMAGES.redmi;
    if (name.includes('oneplus')) return this.MOCK_IMAGES.oneplus;
    if (name.includes('realme')) return this.MOCK_IMAGES.realme;
    if (name.includes('oppo')) return this.MOCK_IMAGES.oppo;
    if (name.includes('vivo')) return this.MOCK_IMAGES.vivo;
    
    return this.MOCK_IMAGES.default;
  }

  /**
   * Preload images for better UX
   */
  static preloadImages(productNames: string[]): void {
    productNames.forEach(async (name) => {
      const result = await this.getProductImage(name);
      if (result.imageUrl) {
        const img = new Image();
        img.src = result.imageUrl;
      }
    });
  }

  /**
   * Clear image cache
   */
  static clearCache(): void {
    try {
      localStorage.removeItem(this.CACHE_KEY);
    } catch (error) {
      console.warn('Cache clear failed:', error);
    }
  }
} 