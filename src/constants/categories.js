/**
 * E-commerce Categories Configuration
 * Defines all product categories and their subcategories
 */

export const CATEGORIES = {
  ELECTRONICS: {
    id: 'electronics',
    name: 'Electronics & Tech',
    slug: 'electronics',
    icon: '💻',
    color: 'from-blue-500 to-cyan-500',
    description: 'Latest gadgets and technology',
    subcategories: [
      { id: 'smartphones', name: 'Smartphones', slug: 'smartphones' },
      { id: 'laptops', name: 'Laptops & Computers', slug: 'laptops' },
      { id: 'tablets', name: 'Tablets', slug: 'tablets' },
      { id: 'audio', name: 'Audio & Headphones', slug: 'audio' },
      { id: 'cameras', name: 'Cameras & Photography', slug: 'cameras' },
      { id: 'gaming', name: 'Gaming Devices', slug: 'gaming' },
      { id: 'smartwatch', name: 'Smartwatches', slug: 'smartwatch' },
      { id: 'accessories', name: 'Tech Accessories', slug: 'accessories' }
    ]
  },
  FASHION: {
    id: 'fashion',
    name: 'Fashion',
    slug: 'fashion',
    icon: '👔',
    color: 'from-pink-500 to-purple-500',
    description: 'Trendy clothing and apparel',
    subcategories: [
      { id: 'mens-clothing', name: "Men's Clothing", slug: 'mens-clothing' },
      { id: 'womens-clothing', name: "Women's Clothing", slug: 'womens-clothing' },
      { id: 'kids-clothing', name: "Kids' Clothing", slug: 'kids-clothing' },
      { id: 'traditional', name: 'Traditional Wear', slug: 'traditional' },
      { id: 'activewear', name: 'Activewear & Sports', slug: 'activewear' },
      { id: 'accessories', name: 'Fashion Accessories', slug: 'fashion-accessories' }
    ]
  },
  SHOES: {
    id: 'shoes',
    name: 'Shoes & Footwear',
    slug: 'shoes',
    icon: '👟',
    color: 'from-orange-500 to-red-500',
    description: 'Footwear for every occasion',
    subcategories: [
      { id: 'sneakers', name: 'Sneakers', slug: 'sneakers' },
      { id: 'formal', name: 'Formal Shoes', slug: 'formal-shoes' },
      { id: 'casual', name: 'Casual Shoes', slug: 'casual-shoes' },
      { id: 'sports', name: 'Sports Shoes', slug: 'sports-shoes' },
      { id: 'boots', name: 'Boots', slug: 'boots' },
      { id: 'sandals', name: 'Sandals & Slippers', slug: 'sandals' },
      { id: 'heels', name: 'Heels & Wedges', slug: 'heels' }
    ]
  },
  BOOKS: {
    id: 'books',
    name: 'Books & Stationery',
    slug: 'books',
    icon: '📚',
    color: 'from-green-500 to-teal-500',
    description: 'Knowledge and creativity',
    subcategories: [
      { id: 'fiction', name: 'Fiction', slug: 'fiction' },
      { id: 'non-fiction', name: 'Non-Fiction', slug: 'non-fiction' },
      { id: 'educational', name: 'Educational', slug: 'educational' },
      { id: 'comics', name: 'Comics & Manga', slug: 'comics' },
      { id: 'magazines', name: 'Magazines', slug: 'magazines' },
      { id: 'stationery', name: 'Stationery', slug: 'stationery' },
      { id: 'ebooks', name: 'E-Books', slug: 'ebooks' }
    ]
  }
};

// Flatten all categories for easy access
export const ALL_CATEGORIES = Object.values(CATEGORIES);

// Get category by slug
export const getCategoryBySlug = (slug) => {
  return ALL_CATEGORIES.find(cat => cat.slug === slug);
};

// Get subcategory by slug and category
export const getSubcategoryBySlug = (categorySlug, subcategorySlug) => {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return null;
  return category.subcategories.find(sub => sub.slug === subcategorySlug);
};

// Get all subcategories as flat array
export const getAllSubcategories = () => {
  return ALL_CATEGORIES.flatMap(cat => 
    cat.subcategories.map(sub => ({
      ...sub,
      categoryId: cat.id,
      categoryName: cat.name
    }))
  );
};

