<template>
  <div id="app">
    <users-table />
  </div>
</template>

<script>
  import UsersTable from "./components/UsersTable";

  export default {
    name: 'App',
    components: {UsersTable},
  }
</script>
