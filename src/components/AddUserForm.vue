<template>
  <form class="add-user-form" @submit.prevent="onFormSubmit">
    <h2 class="add-user-form__title">Добавить <br>пользователя</h2>

    <div class="add-user-form__input">
      <label for="name">Имя:</label>
      <input v-model="formData.name" type="text" id="name" name="name">
    </div>

    <div class="add-user-form__input">
      <label for="phone">Телефон:</label>
      <input v-model="formData.phone" type="tel" id="phone" name="phone">
    </div>

    <div class="add-user-form__input">
      <label for="parent">Начальник:</label>
      <select
        v-model="formData.parent"
        id="parent"
        name="parent"
        :disabled="flatUsers.length === 0"
      >
        <option v-for="user in flatUsers" :value="user.id">{{ user.name }}</option>
      </select>
    </div>

    <custom-button type="submit" :disabled="isEmpty" class="add-user-form__button">Добавить</custom-button>
  </form>
</template>

<script>
import CustomButton from "./ui/CustomButton";

export default {
  name: "AddUserForm",
  components: {CustomButton},
  props: {
    flatUsers: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      formData: {
        id: null,
        name: null,
        phone: null,
        parent: null,
        children: []
      }
    }
  },
  computed: {
    isEmpty() {
      return this.formData.name === null || this.formData.phone === null;
    }
  },
  methods: {
    onFormSubmit() {
      this.$emit('add-user', this.formData)
    },
  }
}
</script>

<style scoped>
.add-user-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.add-user-form__title {
  margin-bottom: 20px;
}

.add-user-form__input {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: center;
}

.add-user-form__button {
  margin: 20px auto 0;
}

input,
select {
  padding: 5px;
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

@media (max-width: 768px) {
  .add-user-form {
    gap: 10px;
  }

  input,
  select {
    width: 160px;
  }
}
</style>
