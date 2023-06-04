<template>
  <header class="table-header">
    <h3
      v-for="(header, index) in headers"
      :key="index"
      class="table-header__item"
      @click="$emit('header-is-clicked', header.value)"
    >
      {{ header.name }}
      <horizontal-arrow-icon v-if="header.checked !== null" :reversed="header.checked" />
    </h3>
  </header>
</template>

<script>
import HorizontalArrowIcon from "./ui/HorizontalArrowIcon";

export default {
  name: "UsersTableHeader",
  components: {HorizontalArrowIcon},
  props: {
    headers: {
      type: Array,
      default: []
    }
  },
}
</script>

<style scoped>
.table-header {
  display: flex;
  justify-content: space-between;
  color: #ffffff;
  font-size: 1.2rem;
  cursor: pointer;
}

.table-header__item {
  display: flex;
  align-items: center;
  gap: 4px;
}

@media (max-width: 768px) {
  .table-header {
    font-size: 1rem;
  }
}
</style>
