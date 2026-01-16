<template>
  <div class="success-screen">
    <div class="glass-box glass">
      <div class="icon-check">
        <CheckOutlined />
      </div>
      <h1>Đặt hàng thành công</h1>
      <p>Cảm ơn bạn! Đơn hàng #GEM-2026 đã được hệ thống ghi nhận và đang chuẩn bị giao đến bạn.</p>
      <a-button type="primary" size="large" @click="$emit('go-home')" class="home-btn">
        Tiếp tục mua sắm
      </a-button>
    </div>
  </div>
</template>

<script setup>
import { CheckOutlined } from '@ant-design/icons-vue';
defineEmits(['go-home']);
</script>

<style scoped>
.success-screen { display: flex; justify-content: center; align-items: center; padding: 40px 20px; }
.glass-box { padding: 60px 40px; border-radius: 40px; text-align: center; max-width: 500px; }
.icon-check { 
  width: 72px; height: 72px; background: #22c55e; color: white; 
  border-radius: 50%; display: flex; align-items: center; justify-content: center; 
  font-size: 32px; margin: 0 auto 24px;
}
.home-btn { height: 52px; padding: 0 40px; border-radius: 14px; font-weight: 700; }
</style>