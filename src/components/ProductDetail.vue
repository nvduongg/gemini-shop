<template>
  <div class="detail-container">
    <a-button type="link" @click="$emit('back')" class="back-btn">
      <template #icon><ArrowLeftOutlined /></template> Back to Gallery
    </a-button>
    
    <a-row :gutter="[60, 40]" align="middle">
      <a-col :xs="24" :md="12">
        <div class="main-image-wrapper glass">
          <img :src="product.img" alt="main" />
        </div>
      </a-col>
      <a-col :xs="24" :md="12">
        <div class="info-content">
          <div class="tag">New Arrival</div>
          <h1>{{ product.name }}</h1>
          <div class="price-big">{{ product.price.toLocaleString() }}đ</div>
          <p class="description">
            Experience the next generation of technology with our latest masterpiece. 
            Crafted for performance and designed for elegance.
          </p>
          
          <a-divider />
          
          <div class="actions">
            <a-space size="large">
              <a-input-number v-model:value="qty" :min="1" size="large" />
              <a-button type="primary" size="large" block @click="onAdd" class="add-cart-btn">
                Add to Cart — {{ (product.price * qty).toLocaleString() }}đ
              </a-button>
            </a-space>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ArrowLeftOutlined } from '@ant-design/icons-vue';
import { useCartStore } from '../stores/cart';
import { message } from 'ant-design-vue';

const props = defineProps(['product']);
const cartStore = useCartStore();
const qty = ref(1);

const onAdd = () => {
  cartStore.addToCart(props.product, qty.value);
  message.success(`Added ${qty.value} item(s) to your collection`);
};
</script>

<style scoped>
.detail-container { animation: slideUp 0.6s ease; }
.back-btn { margin-bottom: 30px; color: var(--text-sub); font-weight: 600; }
.main-image-wrapper { border-radius: 40px; overflow: hidden; aspect-ratio: 1; padding: 20px; }
.main-image-wrapper img { width: 100%; height: 100%; object-fit: contain; }

.info-content .tag { color: var(--primary); font-weight: 800; letter-spacing: 1px; margin-bottom: 10px; }
.info-content h1 { font-size: clamp(32px, 4vw, 48px); font-weight: 800; color: var(--text-main); line-height: 1.1; }
.price-big { font-size: 32px; font-weight: 800; color: #ff4d4f; margin: 20px 0; }
.description { font-size: 16px; color: var(--text-sub); line-height: 1.8; }

.add-cart-btn { height: 50px; border-radius: 12px; padding: 0 40px; font-weight: 700; }

@keyframes slideUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>