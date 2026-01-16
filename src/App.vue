<template>
  <div class="app-wrapper">
    <nav class="glass floating-nav">
      <div class="nav-container">
        <div class="logo" @click="currentView = 'list'">
          FUTURE<span>.</span>SHOP
        </div>

        <div class="nav-right">
          <button class="icon-btn theme-toggle" @click="toggleDark">
            <transition name="scale" mode="out-in">
              <BulbFilled v-if="isDark" :key="'dark'" style="color: #fbbf24" />
              <BulbOutlined v-else :key="'light'" />
            </transition>
          </button>

          <div id="cart-target" class="cart-anchor" @click="currentView = 'checkout'">
            <a-badge :count="cartStore.totalCount" :offset="[-2, 2]" color="#6366f1">
              <ShoppingOutlined class="cart-icon" />
            </a-badge>
          </div>

          <a-avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" class="user-avatar" />
        </div>
      </div>
    </nav>

    <main class="main-content">
      <transition name="view-slide" mode="out-in">
        <div :key="currentView">
          
          <div v-if="currentView === 'list'" class="fade-in">
            <header class="hero">
              <h1>The New Standard</h1>
              <p>Khám phá bộ sưu tập công nghệ tối giản cho tương lai.</p>
            </header>
            
            <a-row :gutter="[20, 20]">
              <a-col :xs="12" :sm="12" :md="8" :lg="6" v-for="p in products" :key="p.id">
                <ProductCard 
                  :item="p" 
                  @add="animateToCart" 
                  @click="openDetail(p)"
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

    <transition name="fade">
      <div v-if="flyingGhost" class="flying-ghost" :style="ghostStyle">
        <img :src="flyingGhost.img" />
      </div>
    </transition>

    <div class="mobile-bottom-nav glass" v-if="isMobile">
      <div class="tab" @click="currentView = 'list'" :class="{active: currentView === 'list'}">
        <HomeOutlined />
      </div>
      <div class="tab" @click="currentView = 'checkout'" :class="{active: currentView === 'checkout'}">
        <ShoppingOutlined />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { 
  ShoppingOutlined, BulbOutlined, BulbFilled, 
  HomeOutlined 
} from '@ant-design/icons-vue';
import { useCartStore } from './stores/cart';

// Components
import ProductCard from './components/ProductCard.vue';
import ProductDetail from './components/ProductDetail.vue';
import CheckoutView from './components/CheckoutView.vue';
import SuccessView from './components/SuccessView.vue';

const cartStore = useCartStore();
const currentView = ref('list');
const isDark = ref(localStorage.getItem('theme') === 'dark');
const selectedProduct = ref(null);
const isMobile = ref(window.innerWidth <= 768);

// Dữ liệu mẫu hoàn chỉnh
const products = [
  { id: 1, name: 'Vision Pro G2', price: 85000000, img: 'https://picsum.photos/600/600?r=10', category: 'Wearable' },
  { id: 2, name: 'Studio Display', price: 45000000, img: 'https://picsum.photos/600/600?r=21', category: 'Display' },
  { id: 3, name: 'Keychron K2', price: 2500000, img: 'https://picsum.photos/600/600?r=32', category: 'Gear' },
  { id: 4, name: 'Magic Mouse', price: 2200000, img: 'https://picsum.photos/600/600?r=43', category: 'Gear' },
  { id: 5, name: 'AirPods Max', price: 13500000, img: 'https://picsum.photos/600/600?r=54', category: 'Audio' },
  { id: 6, name: 'iPad Pro M4', price: 28900000, img: 'https://picsum.photos/600/600?r=65', category: 'Tablet' },
];

const toggleDark = () => {
  isDark.value = !isDark.value;
  document.body.classList.toggle('dark-theme', isDark.value);
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
};

const openDetail = (product) => {
  selectedProduct.value = product;
  currentView.value = 'detail';
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// --- LOGIC HIỆU ỨNG BAY ---
const flyingGhost = ref(null);
const ghostStyle = reactive({});

const animateToCart = (data) => {
  const { rect, img, product } = data;
  const cartIcon = document.getElementById('cart-target')?.getBoundingClientRect();
  
  if (!cartIcon) return;

  flyingGhost.value = { img };
  Object.assign(ghostStyle, {
    top: `${rect.top}px`,
    left: `${rect.left}px`,
    width: `${rect.width}px`,
    opacity: 1,
    transition: 'none'
  });

  setTimeout(() => {
    Object.assign(ghostStyle, {
      top: `${cartIcon.top}px`,
      left: `${cartIcon.left}px`,
      width: '20px',
      opacity: 0,
      transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
    });
  }, 50);

  setTimeout(() => {
    flyingGhost.value = null;
    cartStore.addToCart(product);
  }, 850);
};

onMounted(() => {
  if (isDark.value) document.body.classList.add('dark-theme');
});
</script>

<style scoped>
.floating-nav {
  position: fixed;
  top: 20px; left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 1200px;
  height: 70px;
  z-index: 1000;
  border-radius: 35px;
  padding: 0 30px;
  display: flex;
  align-items: center;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.logo { font-size: 20px; font-weight: 900; cursor: pointer; color: var(--text-main); }
.logo span { color: var(--primary); }

.nav-right { display: flex; align-items: center; gap: 20px; }
.cart-icon { font-size: 24px; color: var(--text-main); }
.icon-btn { background: none; border: none; cursor: pointer; display: flex; font-size: 22px; }

.hero { text-align: center; margin-bottom: 60px; }
.hero h1 { font-size: clamp(32px, 6vw, 56px); margin: 0; }

/* Ghost Flyer */
.flying-ghost {
  position: fixed;
  z-index: 9999;
  pointer-events: none;
  border-radius: 12px;
  overflow: hidden;
}
.flying-ghost img { width: 100%; height: 100%; object-fit: cover; }

/* Transitions */
.view-slide-enter-active, .view-slide-leave-active { transition: all 0.4s ease; }
.view-slide-enter-from { opacity: 0; transform: translateY(20px); }
.view-slide-leave-to { opacity: 0; transform: translateY(-20px); }

.scale-enter-active, .scale-leave-active { transition: all 0.3s ease; }
.scale-enter-from, .scale-leave-to { transform: scale(0); opacity: 0; }

/* Mobile Bottom Nav */
.mobile-bottom-nav {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 60px;
  border-radius: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 1000;
}
.tab { font-size: 24px; color: var(--text-sub); cursor: pointer; }
.tab.active { color: var(--primary); }

@media (max-width: 768px) {
  .floating-nav { top: 10px; padding: 0 20px; }
  .logo { font-size: 16px; }
}
</style>