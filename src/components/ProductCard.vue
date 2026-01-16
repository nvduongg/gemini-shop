<template>
  <div class="product-card glass" @click="$emit('click')">
    <div class="image-container">
      <img :src="item.img" ref="productImg" alt="product" />
      <div class="badge" v-if="item.price > 20000000">Premium</div>
      <div class="card-overlay">
        <a-button type="primary" shape="circle" size="large" @click.stop="onAddToCart">
          <template #icon><PlusOutlined /></template>
        </a-button>
      </div>
    </div>
    <div class="product-info">
      <span class="category">{{ item.category || 'Technology' }}</span>
      <h3 class="name">{{ item.name }}</h3>
      <div class="footer">
        <span class="price">{{ item.price.toLocaleString() }}đ</span>
        <div class="rating"><StarFilled /> 4.9</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { PlusOutlined, StarFilled } from '@ant-design/icons-vue';

const props = defineProps(['item']);
const emit = defineEmits(['add', 'click']);
const productImg = ref(null);

const onAddToCart = () => {
  const rect = productImg.value.getBoundingClientRect();
  emit('add', { rect, img: props.item.img, product: props.item });
};
</script>

<style scoped>
.product-card {
  padding: 12px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  position: relative;
}
.product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}
.image-container {
  position: relative;
  aspect-ratio: 1;
  border-radius: 18px;
  overflow: hidden;
  background: #f1f5f9;
}
.image-container img { width: 100%; height: 100%; object-fit: cover; transition: 0.5s; }
.product-card:hover img { transform: scale(1.1); }

.card-overlay {
  position: absolute; inset: 0; background: rgba(0,0,0,0.2);
  display: flex; align-items: center; justify-content: center;
  opacity: 0; transition: 0.3s;
}
.product-card:hover .card-overlay { opacity: 1; }

.badge {
  position: absolute; top: 10px; left: 10px; background: var(--primary);
  color: white; padding: 4px 12px; border-radius: 20px; font-size: 10px; font-weight: 800;
}

.product-info { padding: 15px 5px 5px; }
.category { font-size: 10px; color: var(--primary); font-weight: 700; text-transform: uppercase; }
.name { font-size: 16px; font-weight: 700; color: var(--text-main); margin: 4px 0; }
.footer { display: flex; justify-content: space-between; align-items: center; margin-top: 8px; }
.price { font-size: 18px; font-weight: 800; color: var(--text-main); }
.rating { font-size: 12px; color: #fadb14; font-weight: 600; }
</style>