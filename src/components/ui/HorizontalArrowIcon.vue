<template>
  <svg
    :class="{ reversed: reversed }"
    width="18"
    height="18"
    fill="none"
    stroke="#fff"
    stroke-linecap="round"
    stroke-linejoin="arcs"
    stroke-width="2"
    viewBox="0 0 24 24"
    @click="$emit('click')"
  >
    <path d="m9 18 6-6-6-6"/>
  </svg>
</template>

<script>
export default {
  name: "HorizontalArrowIcon",
  props: {
    reversed: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
svg {
  transform: rotate(270deg);
}

.reversed {
  transform: rotate(90deg);
}
</style>
