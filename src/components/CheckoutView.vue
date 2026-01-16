<template>
  <div class="checkout-container">
    <a-button type="text" @click="$emit('back')" class="back-link">
      <template #icon><ArrowLeftOutlined /></template> Quay lại
    </a-button>

    <a-row :gutter="[32, 32]" class="checkout-content">
      <a-col :xs="24" :lg="14">
        <div class="checkout-form glass">
          <h2>Thông tin nhận hàng</h2>
          <a-form layout="vertical" @finish="$emit('order-success')">
            <a-form-item label="Họ tên">
              <a-input size="large" placeholder="Nhập tên của bạn" />
            </a-form-item>
            <a-form-item label="Địa chỉ">
              <a-textarea :rows="3" placeholder="Địa chỉ giao hàng chi tiết" />
            </a-form-item>
            <a-button type="primary" block size="large" html-type="submit" class="submit-btn">
              Xác nhận đặt hàng — {{ cartStore.totalPrice.toLocaleString() }}đ
            </a-button>
          </a-form>
        </div>
      </a-col>

      <a-col :xs="24" :lg="10">
        <div class="order-summary glass">
          <h3>Tóm tắt đơn hàng</h3>
          <div class="summary-list">
            <div v-for="item in cartStore.items" :key="item.id" class="summary-item">
              <div class="item-info">
                <img :src="item.img" />
                <span>{{ item.name }} <b>x{{ item.quantity }}</b></span>
              </div>
              <span>{{ (item.price * item.quantity).toLocaleString() }}đ</span>
            </div>
          </div>
          <a-divider />
          <div class="total-row">
            <span>Tổng cộng</span>
            <span class="total-val">{{ cartStore.totalPrice.toLocaleString() }}đ</span>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { ArrowLeftOutlined } from '@ant-design/icons-vue';
import { useCartStore } from '../stores/cart';
const cartStore = useCartStore();
defineEmits(['back', 'order-success']);
</script>

<style scoped>
.checkout-container { animation: fadeIn 0.5s ease; }
.back-link { margin-bottom: 20px; color: var(--text-sub); font-weight: 600; }
.checkout-form, .order-summary { padding: 32px; border-radius: 32px; }
h2, h3 { font-weight: 800; color: var(--text-main); margin-bottom: 24px; }

.summary-item { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.item-info { display: flex; align-items: center; gap: 12px; }
.item-info img { width: 44px; height: 44px; border-radius: 10px; object-fit: cover; }
.item-info span { color: var(--text-main); }

.total-row { display: flex; justify-content: space-between; font-weight: 800; font-size: 20px; }
.total-val { color: var(--primary); }

.submit-btn { height: 56px; border-radius: 16px; font-weight: 700; margin-top: 10px; }

@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>