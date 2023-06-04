<template>
  <div class="users-table__list">
    <div class="users-table__row" @click="toggleExpand">
      <span :style="userNamePadding">
        {{ toggleIcon }}
        {{ user.name }}
      </span>
      <span style="width: fit-content;">{{ user.phone }}</span>
    </div>

    <transition-group name="fade">
      <template v-if="isExpanded && hasChildren">
        <users-list
          v-for="childUser in user.children"
          :user="childUser"
          :key="childUser.id"
          :level="level + 1"
        />
      </template>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: "UsersList",
  props: {
    user: {
      type: Object,
      default: {}
    },
    level: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      isExpanded: false,
      userNamePadding: null,
      MOBILE_PADDING_MULTIPLIER: 10,
      DESKTOP_PADDING_MULTIPLIER: 20,
    };
  },
  computed: {
    hasChildren() {
      return this.user.children && this.user.children.length > 0;
    },
    toggleIcon() {
      if (!this.hasChildren) return null;

      return this.isExpanded ? "-" : "+";
    },
  },
  mounted() {
    this.getUserNamePadding()
    window.addEventListener('resize', this.getUserNamePadding)
  },
  methods: {
    toggleExpand() {
      if (!this.hasChildren) return;

      this.isExpanded = !this.isExpanded;
    },

    getUserNamePadding: function() {
      const PADDING_MULTIPLIER = this.getPaddingMultiplier();

      this.userNamePadding = { paddingLeft: `${this.level * PADDING_MULTIPLIER}px` };
    },
    getPaddingMultiplier() {
      return window.innerWidth > 768 ?
        this.DESKTOP_PADDING_MULTIPLIER :
        this.MOBILE_PADDING_MULTIPLIER;
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getUserNamePadding)
  }
}
</script>

<style scoped>
.users-table__list {
  cursor: pointer;
}
</style>
