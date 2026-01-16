import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCartStore = defineStore('cart', () => {
  const items = ref([]);
  const totalCount = computed(() => items.value.reduce((sum, i) => sum + i.quantity, 0));
  const totalPrice = computed(() => items.value.reduce((sum, i) => sum + (i.price * i.quantity), 0));

  const addToCart = (product) => {
    const found = items.value.find(i => i.id === product.id);
    found ? found.quantity++ : items.value.push({ ...product, quantity: 1 });
  };
  
  const clearCart = () => items.value = [];
  return { items, totalCount, totalPrice, addToCart, clearCart };
});