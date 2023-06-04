<template>
  <button :disabled="disabled" @click="$emit('click')">
    <slot />
  </button>
</template>

<script>
export default {
  name: "CustomButton",
  props: {
    disabled: {
      type: Boolean,
      default: null
    }
  }
}
</script>

<style scoped>
button {
  display: block;
  padding: 10px 20px;
  font-size: 16px;
  color: #FFFFFF;
  background-color: #009600;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:disabled {
  background: #808080;
}
</style>
