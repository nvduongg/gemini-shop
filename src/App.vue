<template>
  <div class="app-container" :class="{ 'dark-theme': isDark }">
    <nav class="floating-nav glass">
      <div class="nav-inner">
        <div class="logo" @click="currentView = 'list'">
          FUTURE<span>STATION</span>
        </div>
        
        <div class="nav-actions">
          <button class="icon-btn" @click="toggleDark">
            <BulbFilled v-if="isDark" style="color: #fbbf24" />
            <BulbOutlined v-else />
          </button>

          <div id="cart-target" class="cart-trigger" @click="currentView = 'checkout'">
            <a-badge :count="cartStore.totalCount" :offset="[-2, 2]">
              <ShoppingOutlined class="nav-icon" />
            </a-badge>
          </div>
        </div>
      </div>
    </nav>

    <main class="main-content">
      <transition name="page-fade" mode="out-in">
        <div :key="currentView">
          
          <div v-if="currentView === 'list'" class="product-grid-view">
            <header class="hero-section">
              <h1>The New Standard</h1>
              <p>Khám phá bộ sưu tập công nghệ tương lai.</p>
            </header>
            
            <a-row :gutter="[24, 24]">
              <a-col :xs="12" :sm="12" :md="8" :lg="6" v-for="p in products" :key="p.id">
                <ProductCard 
                  :item="p" 
                  @add="handleFlyEffect" 
                  @click="showDetail(p)"
                />
              </a-col>
            </a-row>
          </div>

          <ProductDetail 
            v-else-if="currentView === 'detail'" 
            :product="selectedProduct" 
            @back="currentView = 'list'" 
          />

          <CheckoutView 
            v-else-if="currentView === 'checkout'" 
            @order-success="currentView = 'success'" 
            @back="currentView = 'list'" 
          />

          <SuccessView 
            v-else-if="currentView === 'success'" 
            @go-home="currentView = 'list'" 
          />

        </div>
      </transition>
    </main>

    <div v-if="ghostItem" class="ghost-flyer" :style="ghostStyle">
      <img :src="ghostItem.img" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { ShoppingOutlined, BulbOutlined, BulbFilled } from '@ant-design/icons-vue';
import { useCartStore } from './stores/cart';

// Import các components đã hoàn thiện
import ProductCard from './components/ProductCard.vue';
import ProductDetail from './components/ProductDetail.vue';
import CheckoutView from './components/CheckoutView.vue';
import SuccessView from './components/SuccessView.vue';

const cartStore = useCartStore();
const currentView = ref('list');
const isDark = ref(false);
const selectedProduct = ref(null);

// Dữ liệu mẫu
const products = [
  { id: 1, name: 'Vision Pro G2', price: 85000000, img: 'https://picsum.photos/600/600?random=1', category: 'Smart VR' },
  { id: 2, name: 'Sonic Pro Max', price: 12500000, img: 'https://picsum.photos/600/600?random=2', category: 'Audio' },
  { id: 3, name: 'Cyber Mouse 3', price: 3200000, img: 'https://picsum.photos/600/600?random=3', category: 'Gaming' },
  { id: 4, name: 'Neo Mechanical', price: 5800000, img: 'https://picsum.photos/600/600?random=4', category: 'Keyboard' },
];

// Logic xử lý Dark Mode
const toggleDark = () => {
  isDark.value = !isDark.value;
  document.body.classList.toggle('dark-theme', isDark.value);
};

// Logic chuyển sang trang chi tiết
const showDetail = (product) => {
  selectedProduct.value = product;
  currentView.ref = 'detail';
};

/** * Logic Hiệu ứng Bay (Khắc phục lỗi undefined bằng cách kiểm tra data)
 */
const ghostItem = ref(null);
const ghostStyle = reactive({});

const handleFlyEffect = (payload) => {
  // Kiểm tra an toàn để tránh lỗi "destructured parameter is undefined"
  if (!payload || !payload.rect) return;

  const { rect, img, product } = payload;
  const target = document.getElementById('cart-target')?.getBoundingClientRect();
  
  if (!target) {
    cartStore.addToCart(product);
    return;
  }

  // Khởi tạo vị trí bắt đầu của ghost item
  ghostItem.value = { img };
  Object.assign(ghostStyle, {
    top: `${rect.top}px`,
    left: `${rect.left}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    opacity: 1,
    transition: 'none'
  });

  // Chạy hiệu ứng chuyển động tới giỏ hàng
  setTimeout(() => {
    Object.assign(ghostStyle, {
      top: `${target.top + 5}px`,
      left: `${target.left + 5}px`,
      width: '20px',
      height: '20px',
      opacity: 0.2,
      transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
    });
  }, 50);

  // Sau khi bay xong thì biến mất và thêm vào store
  setTimeout(() => {
    ghostItem.value = null;
    cartStore.addToCart(product);
  }, 850);
};
</script>

<style>
/* CSS Reset & App Layout */
.app-container {
  min-height: 100vh;
  padding-top: 100px; /* Tránh bị che bởi nav */
}

/* Navbar Floating Style */
.floating-nav {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 92%;
  max-width: 1100px;
  height: 70px;
  z-index: 1000;
  display: flex;
  align-items: center;
  padding: 0 30px;
}

.nav-inner {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 22px;
  font-weight: 900;
  letter-spacing: -1.5px;
  cursor: pointer;
}

.logo span { color: var(--primary); }

.nav-actions {
  display: flex;
  align-items: center;
  gap: 25px;
}

.nav-icon {
  font-size: 24px;
  color: var(--text-main);
}

.icon-btn {
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
  display: flex;
}

/* Content Area */
.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.hero-section {
  text-align: center;
  margin-bottom: 50px;
}

.hero-section h1 {
  font-size: 48px;
  font-weight: 900;
  margin: 0;
}

/* Ghost Animation */
.ghost-flyer {
  position: fixed;
  z-index: 9999;
  pointer-events: none;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.ghost-flyer img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Page Transitions */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: all 0.4s ease;
}

.page-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>