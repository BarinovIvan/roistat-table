<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <h2 v-if="users.length === 0" class="not-found-message">Ничего не найдено</h2>

      <users-table
        v-else
        :users="users"
        @header-is-clicked="changeSortingOption"
      />
    </transition>

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
import {findUserById, generateId, getDataFromLS, saveDataToLS, unwrapArray} from "./helpers/usersTableHeader";

export default {
  name: 'App',
  components: {CustomButton, AddUserForm, CustomDialog, UsersTable},
  data() {
    return {
      showDialog: false,
      users: [],
      flatUsers: [],
      sortingOption: '',
      sortingOrder: 1
    }
  },
  created() {
    const users = getDataFromLS('users')
    if (users) this.users = users;

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

      if (this.sortingOption !== '') this.sortUsers()

      this.unwrapUserArray()
      saveDataToLS('users', JSON.stringify(this.users));
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
