<template>
  <section class="users-table">
    <header class="users-table__header users-table__row">
      <h3>Имя</h3>
      <h3>Телефон</h3>
    </header>
  </section>
</template>

<script>
export default {
  name: "UsersTable"
}
</script>

<style scoped>
.users-table {
  width: 100%;
  padding: 40px;
}

.users-table__header {
  display: flex;
  justify-content: space-around;
}

.users-table__row > * {
  width: 100%;
  border: 1px solid red;
  padding: 10px 20px;
}
</style>
