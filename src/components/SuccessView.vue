<template>
  <div class="success-screen">
    <div class="icon-wrap">
      <CheckCircleFilled />
    </div>
    <h1>Thank You for Choosing Us</h1>
    <p>Your order #GEM-2026 has been successfully placed. We'll notify you when it's on the way.</p>
    <a-button type="primary" size="large" @click="$emit('go-home')" class="back-home">
      Continue Shopping
    </a-button>
  </div>
</template>

<script setup>
import { CheckCircleFilled } from '@ant-design/icons-vue';
</script>

<style scoped>
.success-screen { text-align: center; padding: 60px 20px; max-width: 600px; margin: 0 auto; }
.icon-wrap { font-size: 80px; color: #22c55e; margin-bottom: 24px; animation: pop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
h1 { font-size: 32px; font-weight: 800; color: var(--text-main); }
p { font-size: 16px; color: var(--text-sub); margin-bottom: 40px; }
.back-home { height: 50px; border-radius: 12px; padding: 0 40px; font-weight: 700; }

@keyframes pop {
  0% { transform: scale(0); }
  100% { transform: scale(1); }
}
</style>