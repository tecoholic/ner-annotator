<template>
  <div class="field is-grouped is-grouped-multiline">

      <div class="control" v-for="cl in classes" :key="cl.id">
    <div class="tags is-large has-addons">
      <a class="tag is-large is-link">
        {{ cl.name }}
      </a>
      <a class="tag is-large is-delete" @click="removeClass(cl.id)"></a>
    </div>
  </div>


    <p class="control" v-if="showNewClassInput">
      <input type="text" class="input is-inline" v-model="newClassName">
      <button class="button is-info is-inline" @click="saveNewClass">Add</button>
    </p>

    <p class="control">
      <button class="button is-outlined" @click="showNewClassInput = true">
        <font-awesome-icon icon="plus-square" />
      </button>
    </p>

  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "ClassesBlock",
  data() {
    return {
      showNewClassInput: false,
      newClassName: '',
    }
  },
  computed: {
    ...mapState(["classes"]),
  },
  methods: {
    ...mapMutations(["removeClass"]),
    saveNewClass() {
      this.$store.commit('addClass', this.newClassName);
      this.showNewClassInput = false;
      this.newClassName = '';
    },
  }
};
</script>