<template>
  <div class="field is-grouped is-grouped-multiline">
    <div class="control" v-for="cl in classes" :key="cl.id">
      <div class="tags is-medium has-addons">
        <a
          class="tag is-medium"
          :class="{ 'is-link': cl.id === currentClass.id }"
          @click="setCurrentClass(cl.id)"
        >
          <span class="color-box" :style="{ backgroundColor: cl.color }"></span>
          {{ cl.name }}
        </a>
        <a
          v-if="showDeleteButtons"
          class="tag is-medium is-delete"
          @click="handleRemoveClass(cl.id, cl.name)"
        ></a>
      </div>
    </div>

    <div class="control" v-if="showNewClassInput || classes.length === 0">
      <input
        type="text"
        class="input is-inline"
        v-model="newClassName"
        @keyup="onInputKeyup"
        placeholder="NER TAG"
      />
      <button class="button is-info is-inline" @click="saveNewClass">
        Add
      </button>
    </div>

    <div class="control">
      <button class="button is-primary" @click="showNewClassInput = true">
        <span class="icon">
          <font-awesome-icon class="fa-lg" icon="plus-square" />
        </span>
      </button>
      <button
        :class="['button', showDeleteButtons ? 'is-danger' : 'is-secondary']"
        @click="showDeleteButtons = !showDeleteButtons"
      >
        <span class="icon">
          <font-awesome-icon class="fa" icon="edit" />
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "ClassesBlock",
  data() {
    return {
      showNewClassInput: false,
      newClassName: "",
      showDeleteButtons: false,
    };
  },
  computed: {
    ...mapState(["classes", "currentClass"]),
  },
  watch: {
    newClassName(now, then) {
      if (now != then) {
        this.newClassName = now.toUpperCase();
      }
    },
  },
  methods: {
    ...mapMutations(["removeClass", "setCurrentClass"]),
    handleRemoveClass(class_id, className) {
      let sure = confirm(
        "Are you sure you want to remove the tag `" +
          className +
          "`?\nNOTE: This will NOT affect previously tagged entities."
      );
      if (sure) {
        this.removeClass(class_id);
      }
    },
    saveNewClass() {
      this.$store.commit("addClass", this.newClassName);
      this.showNewClassInput = false;
      this.newClassName = "";
    },
    onInputKeyup(e) {
      if (e.key === "Enter") {
        this.saveNewClass();
      }
    },
  },
};
</script>

<style lang="css" scoped>
.color-box {
  width: 1rem;
  height: 1rem;
  margin-right: 1rem;
}
</style>
