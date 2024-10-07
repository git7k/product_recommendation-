import Purchase from '../models/purchase';
import Product from '../models/product';
 
export const getRecommendations = async (userId: string) => {
  // to get purchases by all the users
  const allPurchases = await Purchase.find();
  const userPurchases = await Purchase.find({ userId });
    
  // to get all the product
  const allProducts = await Product.find();
  
  // Extract product IDs that the user has purchased
  const purchasedProductIds = new Set(userPurchases.map(p => p.productId));
  
  // finding users with similar purchases
  const recommendProducts = new Set<string>();

  allPurchases.forEach(purchase => {
    if (purchase.userId !== userId && !purchasedProductIds.has(purchase.productId)) {
      recommendProducts.add(purchase.productId);
    }
  });

  // recommending products based on same categories of past orders
  const purchasedCategories = new Set<string>();
  for (const purchase of userPurchases) {
    const product = allProducts.find(p => p.id === purchase.productId);
    if (product) {
      purchasedCategories.add(product.category);
    }
  }

  // Add products from purchased categories to recommendations
  allProducts.forEach(product => {
    if (purchasedCategories.has(product.category) && !purchasedProductIds.has(product.id)) {
      recommendProducts.add(product.id);
    }
  });

  // Recommendation based on popularity
  const productPopularity = new Map<string, number>();
  allPurchases.forEach(p => {
    productPopularity.set(p.productId, (productPopularity.get(p.productId) || 0) + 1);
  });

  // sorting product by popularity/times purchased
  const popularProducts = Array.from(productPopularity.entries())
    .sort((a, b) => b[1] - a[1])
    .map(entry => entry[0]); 

  // removing duplicates
  recommendProducts.forEach(id => popularProducts.unshift(id)); // Add user-based recommendations

  //limiting to 5 recommendaitons
  return Array.from(new Set(popularProducts)).slice(0, 5);
};