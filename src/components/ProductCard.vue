<template>
  <div class="product-card glass" @click="$emit('click')">
    <div class="image-wrapper">
      <img :src="item.img" ref="imgRef" loading="lazy" />
      <div class="hover-actions" v-if="!isMobile">
        <a-button type="primary" shape="circle" size="large" @click.stop="onAdd">
          <template #icon><PlusOutlined /></template>
        </a-button>
      </div>
      <div class="mobile-add" v-else @click.stop="onAdd">
        <PlusOutlined />
      </div>
    </div>
    <div class="card-info">
      <div class="meta">
        <span class="category">{{ item.category }}</span>
        <div class="rating"><StarFilled /> 4.9</div>
      </div>
      <h3 class="name">{{ item.name }}</h3>
      <div class="price">{{ item.price.toLocaleString() }}đ</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { PlusOutlined, StarFilled } from '@ant-design/icons-vue';

const props = defineProps(['item']);
const emit = defineEmits(['add', 'click']);
const imgRef = ref(null);
const isMobile = ref(false);

const onAdd = () => {
  const rect = imgRef.value.getBoundingClientRect();
  emit('add', { rect, img: props.item.img, product: props.item });
};

const checkMobile = () => { isMobile.value = window.innerWidth <= 768; };
onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
});
onUnmounted(() => window.removeEventListener('resize', checkMobile));
</script>

<style scoped>
.product-card {
  padding: 10px;
  border-radius: 28px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.product-card:hover {
  transform: translateY(-8px);
  background: var(--bg-card); /* Đậm hơn một chút khi hover */
}
.image-wrapper {
  position: relative;
  aspect-ratio: 1;
  border-radius: 20px;
  overflow: hidden;
  background: rgba(0,0,0,0.03);
}
.image-wrapper img { width: 100%; height: 100%; object-fit: cover; transition: 0.6s ease; }
.product-card:hover img { transform: scale(1.1); }

.hover-actions {
  position: absolute; inset: 0; background: rgba(0,0,0,0.1);
  display: flex; align-items: center; justify-content: center;
  opacity: 0; transition: 0.3s;
}
.product-card:hover .hover-actions { opacity: 1; }

.mobile-add {
  position: absolute; bottom: 10px; right: 10px;
  width: 36px; height: 36px; background: var(--primary);
  color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center;
}

.card-info { padding: 12px 6px; }
.meta { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
.category { font-size: 11px; font-weight: 700; color: var(--primary); text-transform: uppercase; }
.rating { font-size: 11px; color: #fadb14; font-weight: 600; }
.name { font-size: 16px; font-weight: 700; margin: 0; color: var(--text-main); }
.price { font-size: 18px; font-weight: 800; margin-top: 4px; color: var(--text-main); }
</style>