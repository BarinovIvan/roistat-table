<template>
  <section class="users-table">
    <users-table-header
      :headers="headers"
      class="users-table__row"
      @header-is-clicked="onHeaderClick"
    />

    <main>
      <users-list v-for="user in users" :key="user.id" :user="user" />
    </main>
  </section>
</template>

<script>
import UsersTableHeader from "./UsersTableHeader";
import UsersList from "./UsersList";

export default {
  name: "UsersTable",
  components: {UsersList, UsersTableHeader},
  props: {
    users: {
      type: Array,
      default: []
    },
  },
  data() {
    return {
      headers: [
        { name: 'Имя', value: 'name', checked: null },
        { name: 'Телефон', value: 'phone', checked: null }
      ]
    }
  },
  methods: {
    onHeaderClick(headerValue) {
    this.uncheckAllHeadersExcept(headerValue);
    this.toggleHeaderCheckedStatus(headerValue);
    this.emitHeaderClickedEvent(headerValue);
    },
    uncheckAllHeadersExcept(headerValue) {
      this.headers.forEach(header => {
        if (header.value !== headerValue) {
          header.checked = null
        }
      });
    },
    toggleHeaderCheckedStatus(headerValue) {
      const header = this.headers.find(((header) => header.value === headerValue));
      header.checked = !header.checked;
    },
    emitHeaderClickedEvent(headerValue) {
      this.$emit('header-is-clicked', headerValue);
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
