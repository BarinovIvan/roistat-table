<template>
  <section class="users-table">
    <table-header class="users-table__row" />

    <main>
      <users-list v-for="user in users" :key="user.id" :user="user" />
    </main>
  </section>
</template>

<script>
import TableHeader from "./TableHeader";
import UsersList from "./UsersList";

export default {
  name: "UsersTable",
  components: {UsersList, TableHeader},
  props: {
    users: {
      type: Array,
      default: []
    },
  }
}
</script>

<style scoped>
.users-table {
  max-width: 600px;
  margin: 0 auto;
  padding: 10px;
}
</style>
