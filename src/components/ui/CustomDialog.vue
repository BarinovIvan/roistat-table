<template>
  <div class="dialog" @click="$emit('close-dialog')">
    <div class="dialog__wrapper" @click.stop>
      <close-button class="dialog__close" @click="$emit('close-dialog')" />
      <slot />
    </div>
  </div>
</template>

<script>

import CloseButton from "./CloseButton";

export default {
  name: 'CustomDialog',
  components: {CloseButton},
  props: {
    value: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.dialog {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
}

.dialog__wrapper {
  position: relative;
  padding: 40px;
  margin: 0 auto;
  background: white;
  border-radius: 5px;
}

.dialog__close {
  position: absolute;
  right: 10px;
  top: 10px;
}

@media (max-width: 768px) {
  .dialog__wrapper {
    padding: 40px 20px;
  }
}
</style>
