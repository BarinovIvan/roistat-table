<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <h2 v-if="sortedUsers.length === 0" class="not-found-message">Ничего не найдено</h2>

      <users-table
        v-else
        :users="sortedUsers"
        @header-is-clicked="changeSortingOption"
      />
    </transition>

    <custom-button @click="toggleDialog" class="add-user-button">Добавить пользователя</custom-button>

    <transition name="fade">
      <custom-dialog v-if="showDialog" @close-dialog="toggleDialog">
        <add-user-form :flat-users="flatUsers" @add-user="createUser($event)" />
      </custom-dialog>
    </transition>
  </div>
</template>

<script>
import UsersTable from "./components/UsersTable";
import CustomDialog from "./components/ui/CustomDialog";
import AddUserForm from "./components/AddUserForm";
import CustomButton from "./components/ui/CustomButton";
import {findUserById, generateId, getDataFromLS, saveDataToLS, unwrapArray} from "./helpers/usersTableHeader";

export default {
  name: 'App',
  components: {CustomButton, AddUserForm, CustomDialog, UsersTable},
  data() {
    return {
      showDialog: false,
      users: [],
      sortedUsers: [],
      flatUsers: [],
      sortingOption: null,
      sortingOrder: 1
    }
  },
  watch: {
    users() {
      this.sortedUsers = JSON.parse(JSON.stringify(this.users));

      if (this.sortingOption !== null) this.sortUsers();
    }
  },
  created() {
    const users = getDataFromLS('users')
    if (users) this.users = users;

    this.unwrapUserArray();
  },
  methods: {
    createUser(formData) {
      this.toggleDialog();

      this.addUser(formData, this.users);

      this.unwrapUserArray()
      saveDataToLS('users', JSON.stringify(this.users));

    },
    addUser(formData, users) {
      const areAllPropertiesEmpty = Object.values(formData).every(value => value === null);
      if (areAllPropertiesEmpty) return;

      formData.id = generateId();

      if (formData.parent) {
        const parentId = formData.parent;
        const parentUser = findUserById(parentId, users);

        if (parentUser) {
          parentUser.children.push(formData);
        }
      } else {
        users.push(formData);
      }
    },
    changeSortingOption(option) {
      if (this.sortingOption === option) {
        this.sortingOrder *= -1;
      } else {
        this.sortingOrder = 1;
        this.sortingOption = option;
      }

      this.sortUsers();
    },
    sortUsers() {
      this.users.sort((a, b) => {
        const optionA = a[this.sortingOption];
        const optionB = b[this.sortingOption];

        const comparisonValue = optionA.localeCompare(optionB);
        return comparisonValue * this.sortingOrder;
      });
    },
    unwrapUserArray() {
      this.flatUsers = unwrapArray(this.users);
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

.not-found-message {
  text-align: center;
  color: #FFFFFF;
}
</style>
