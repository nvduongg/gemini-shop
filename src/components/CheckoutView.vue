<template>
  <div class="checkout-grid">
    <a-row :gutter="[40, 40]">
      <a-col :xs="24" :lg="14">
        <div class="glass-form glass">
          <h2>Shipping Intelligence</h2>
          <a-form layout="vertical" :model="form" @finish="onOrder">
            <a-form-item label="Full Name" name="name" :rules="[{required: true}]">
              <a-input v-model:value="form.name" size="large" />
            </a-form-item>
            <a-form-item label="Shipping Address" name="address" :rules="[{required: true}]">
              <a-textarea v-model:value="form.address" :rows="3" />
            </a-form-item>
            <a-button type="primary" html-type="submit" block size="large" :loading="loading" class="confirm-btn">
              Complete Order
            </a-button>
          </a-form>
        </div>
      </a-col>
      <a-col :xs="24" :lg="10">
        <div class="summary-box glass">
          <h3>Order Summary</h3>
          <div v-for="item in cartStore.items" :key="item.id" class="item-summary">
            <span>{{ item.name }} (x{{ item.quantity }})</span>
            <span>{{ (item.price * item.quantity).toLocaleString() }}đ</span>
          </div>
          <a-divider />
          <div class="total">
            <span>Total Amount</span>
            <span>{{ cartStore.totalPrice.toLocaleString() }}đ</span>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useCartStore } from '../stores/cart';

const cartStore = useCartStore();
const loading = ref(false);
const emit = defineEmits(['order-success']);
const form = reactive({ name: '', address: '' });

const onOrder = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    cartStore.clearCart();
    emit('order-success');
  }, 1500);
};
</script>

<style scoped>
.glass-form { padding: 40px; }
.summary-box { padding: 30px; }
h2, h3 { font-weight: 800; color: var(--text-main); margin-bottom: 25px; }
.item-summary { display: flex; justify-content: space-between; margin-bottom: 12px; color: var(--text-sub); }
.total { display: flex; justify-content: space-between; font-weight: 800; font-size: 20px; color: #ff4d4f; }
.confirm-btn { height: 55px; border-radius: 16px; font-weight: 700; margin-top: 20px; }
</style>