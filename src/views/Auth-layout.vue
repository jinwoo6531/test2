<template>
  <v-app class="auth">
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {};
</script>

<style>
.auth-loading {
  display: flex;
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  height: 100%;
  pointer-events: none !important;
  z-index: 20;
}

.auth-sub-wrap {
  width: 100%;
}

.auth-title {
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  color: #262626;
}

.auth-content {
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: #828282;
}

.auth-next {
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  text-align: center;
  border-radius: 2px !important;
  color: #ffffff !important;
}
</style>
