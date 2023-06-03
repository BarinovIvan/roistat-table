<template>
  <header class="table-header">
    <h3>Имя</h3>
    <h3>Телефон</h3>
  </header>
</template>

<script>
export default {
  name: "TableHeader"
}
</script>

<style scoped>
.table-header {
  display: flex;
  justify-content: space-between;
  color: #ffffff;
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .table-header {
    font-size: 1rem;
  }
}
</style>
