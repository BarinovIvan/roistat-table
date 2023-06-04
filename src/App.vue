<template>
  <div id="app">
    <users-table :users="users" />

    <custom-button @click="showDialog = true" class="add-user-button">Добавить пользователя</custom-button>

    <transition name="fade">
      <custom-dialog v-if="showDialog" @close-dialog="toggleDialog">
        <add-user-form :flat-users="flatUsers" @add-user="addUser($event)" />
      </custom-dialog>
    </transition>
  </div>
</template>

<script>
  import UsersTable from "./components/UsersTable";
  import CustomDialog from "./components/ui/CustomDialog";
  import AddUserForm from "./components/AddUserForm";
  import CustomButton from "./components/ui/CustomButton";
  import {findUserById, generateId, unwrapArray} from "./helpers/usersTableHeader";

  export default {
    name: 'App',
    components: {CustomButton, AddUserForm, CustomDialog, UsersTable},
    data() {
      return {
        showDialog: false,
        flatUsers: [],
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
    },
    created() {
      this.unwrapUserArray();
    },
    methods: {
      addUser(formData) {
        this.toggleDialog();

        const areAllPropertiesEmpty = Object.values(formData).every(value => value === null);
        if (areAllPropertiesEmpty) return;

        formData.id = generateId();

        if (formData.parent) {
          const parentId = formData.parent;
          const parentUser = findUserById(parentId, this.users);

          if (parentUser) {
            parentUser.children.push(formData);
          }
        } else {
          this.users.push(formData);
        }

        this.unwrapUserArray()
      },
      unwrapUserArray() {
        this.flatUsers = unwrapArray(this.users)
      },
      toggleDialog() {
        this.showDialog = !this.showDialog;
      },
    }
  }
</script>

<style scoped>
#app {
  height: 100vh;
  padding: 20px 0;
}

.add-user-button {
  margin: 20px auto 0;
}
</style>
