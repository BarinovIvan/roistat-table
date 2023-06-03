<template>
  <div id="app">
    <users-table :users="users" class="users-table" />
  </div>
</template>

<script>
  import UsersTable from "./components/UsersTable";

  export default {
    name: 'App',
    components: {UsersTable},
    data() {
      return {
        users: [
          {
            "id": 1001,
            "name": "Иван Иванов",
            "phone": "8-800-555-35-35",
            "children": [
              {
                "id": 2001,
                "name": "Петр Иванов",
                "phone": "8-800-555-35-36",
                "children": []
              },
              {
                "id": 2002,
                "name": "Сергей Иванов",
                "phone": "8-800-555-35-37",
                "children": [
                  {
                    "id": 3001,
                    "name": "Ирина Иванова",
                    "phone": "8-800-555-35-40",
                    "children": []
                  }
                ]
              }
            ]
          },
          {
            "id": 1002,
            "name": "Ольга Петрова",
            "phone": "8-800-555-35-38",
            "children": [
              {
                "id": 2003,
                "name": "Никита Петров",
                "phone": "8-800-555-35-39",
                "children": []
              }
            ]
          },
          {
            "id": 1003,
            "name": "Марина Сидорова",
            "phone": "8-800-555-35-41",
            "children": [
              {
                "id": 2004,
                "name": "Андрей Сидоров",
                "phone": "8-800-555-35-42",
                "children": [
                  {
                    "id": 3002,
                    "name": "Александр Сидоров",
                    "phone": "8-800-555-35-43",
                    "children": []
                  },
                  {
                    "id": 3003,
                    "name": "Елена Сидорова",
                    "phone": "8-800-555-35-44",
                    "children": []
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  }
</script>

<style scoped>
#app {
  padding: 20px 0;
}
</style>
