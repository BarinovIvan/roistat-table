<template>
  <button @click="$emit('click')">
    <span>X</span>
  </button>
</template>

<script>
export default {
  name: "CloseButton",
}
</script>

<style scoped>
button {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background: red;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid transparent;

  transition: all .3s ease;
}

button:hover {
  color: red;
  background: white;
  border: 1px solid red;
}

</style>
