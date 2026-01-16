<template>
  <div class="product-detail">
    <a-button type="text" @click="$emit('back')" class="back-btn glass">
      <template #icon><ArrowLeftOutlined /></template>
      <span>Trở lại bộ sưu tập</span>
    </a-button>

    <a-row :gutter="[64, 40]" align="middle">
      <a-col :xs="24" :md="12">
        <div class="image-showcase glass">
          <div class="main-img-wrap">
            <img :src="product.img" :alt="product.name" />
          </div>
          <div class="thumbnails">
            <div v-for="i in 3" :key="i" class="thumb-box" :class="{active: i===1}">
              <img :src="product.img" />
            </div>
          </div>
        </div>
      </a-col>

      <a-col :xs="24" :md="12">
        <div class="info-panel">
          <div class="breadcrumb">{{ product.category }} / Mới nhất</div>
          <h1 class="product-title">{{ product.name }}</h1>
          
          <div class="price-tag">
            <span class="currency">đ</span>
            <span class="value">{{ product.price.toLocaleString() }}</span>
          </div>

          <p class="description">
            Được thiết kế với sự tỉ mỉ đến từng chi tiết, sản phẩm mang lại trải nghiệm 
            vượt trội về cả hiệu năng lẫn thẩm mỹ. Phù hợp cho phong cách sống tối giản 
            và hiện đại của tương lai.
          </p>

          <a-divider />

          <div class="purchase-actions">
            <div class="qty-control glass">
              <button @click="qty > 1 ? qty-- : null">-</button>
              <span>{{ qty }}</span>
              <button @click="qty++">+</button>
            </div>
            
            <a-button 
              type="primary" 
              size="large" 
              block 
              class="add-btn"
              @click="onAddToCart"
            >
              Thêm vào bộ sưu tập — {{ (product.price * qty).toLocaleString() }}đ
            </a-button>
          </div>

          <div class="features-grid">
            <div class="f-item"><CheckCircleOutlined /> Bảo hành 12 tháng</div>
            <div class="f-item"><RocketOutlined /> Giao hàng siêu tốc</div>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { 
  ArrowLeftOutlined, 
  CheckCircleOutlined, 
  RocketOutlined 
} from '@ant-design/icons-vue';
import { useCartStore } from '../stores/cart';
import { message } from 'ant-design-vue';

const props = defineProps(['product']);
const emit = defineEmits(['back']);
const cartStore = useCartStore();
const qty = ref(1);

const onAddToCart = () => {
  cartStore.addToCart(props.product, qty.value);
  message.success({
    content: `Đã thêm ${qty.value} ${props.product.name} vào giỏ hàng`,
    style: { marginTop: '10vh' }
  });
};
</script>

<style scoped>
.product-detail {
  animation: slideInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  padding: 20px 0;
}

.back-btn {
  margin-bottom: 40px;
  border-radius: 12px;
  padding: 8px 16px;
  font-weight: 600;
  color: var(--text-sub);
}

/* IMAGE SECTION */
.image-showcase {
  border-radius: 40px;
  padding: 40px;
  text-align: center;
}
.main-img-wrap img {
  width: 100%;
  max-width: 450px;
  filter: drop-shadow(0 20px 40px rgba(0,0,0,0.1));
  transition: transform 0.5s;
}
.main-img-wrap:hover img { transform: scale(1.05); }

.thumbnails {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 30px;
}
.thumb-box {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  border: 2px solid transparent;
  padding: 5px;
  cursor: pointer;
  background: white;
}
.thumb-box.active { border-color: var(--primary); }
.thumb-box img { width: 100%; height: 100%; object-fit: cover; }

/* INFO SECTION */
.breadcrumb {
  font-size: 12px;
  font-weight: 700;
  color: var(--primary);
  text-transform: uppercase;
  letter-spacing: 1px;
}
.product-title {
  font-size: clamp(32px, 5vw, 56px);
  font-weight: 900;
  margin: 10px 0 20px;
  line-height: 1.1;
  color: var(--text-main);
}
.price-tag {
  margin-bottom: 30px;
  color: var(--text-main);
}
.currency { font-size: 24px; font-weight: 600; margin-right: 5px; }
.value { font-size: 42px; font-weight: 800; }

.description {
  font-size: 17px;
  line-height: 1.8;
  color: var(--text-sub);
  max-width: 500px;
}

/* ACTIONS */
.purchase-actions {
  display: flex;
  gap: 20px;
  margin-top: 30px;
}
.qty-control {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 0 15px;
  border-radius: 16px;
  height: 56px;
}
.qty-control button {
  background: none; border: none; font-size: 20px; cursor: pointer; color: var(--text-main);
}
.qty-control span { font-weight: 800; font-size: 18px; width: 30px; text-align: center; }

.add-btn {
  height: 56px;
  border-radius: 16px;
  font-weight: 700;
  font-size: 16px;
  box-shadow: 0 10px 25px rgba(99, 102, 241, 0.3);
}

.features-grid {
  display: flex;
  gap: 30px;
  margin-top: 40px;
  color: var(--text-sub);
  font-size: 14px;
}
.f-item { display: flex; align-items: center; gap: 8px; }

/* RESPONSIVE */
@media (max-width: 768px) {
  .purchase-actions { flex-direction: column; }
  .qty-control { justify-content: space-between; }
  .image-showcase { padding: 20px; }
  .product-title { font-size: 36px; }
}

@keyframes slideInUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>