<template>
  <div class="q-pa-md" style="border-bottom: 1px solid #ccc;">
    <div class="row">
      <div class="tags">
        <q-chip
          v-for="(cl, index) in classes"
          :key="cl.id"
          outline
          square
          style="height: 2rem;"
          :color="cl.color"
          clickable
          @click="setCurrentClass(cl.id)"
          :removable="showDeleteButtons"
          @remove="handleRemoveClass(cl.id, cl.name)"
        >
          <q-avatar
            v-if="cl.id === currentClass.id"
            :color="cl.color"
            style="height: 2rem"
            text-color="white"
            :icon="'fa fa-check'"
          ></q-avatar>
          <q-avatar
            v-if="cl.id !== currentClass.id"
            :color="cl.color"
            style="height: 2rem"
            text-color="white"
            font-size="16px"
          >{{ !!cl.key ? cl.key : index + 1 }}</q-avatar>
          <p :class="['q-mb-none', $q.dark.isActive ? 'text-grey-3' : 'text-grey-9']">{{ cl.name }}</p>
        </q-chip>
      </div>
      <q-space></q-space>
      <div class="q-mx-md">
        <q-input
          bottom-slots
          v-model="newClassName"
          v-if="showNewClassInput || classes.length === 0"
          hint="Enter a NER Tag and click [+] to add it"
          dense
          autofocus
        >
          <template v-slot:append>
            <q-btn
              round
              dense
              flat
              color="green-4"
              icon="fa fa-plus"
              @click="saveNewClass"
            />
            <q-btn
              round
              color="red-4"
              dense
              flat
              icon="fa fa-times"
              @click="showNewClassInput = false"
            />
          </template>
        </q-input>
      </div>
      <div class="buttons">
        <q-btn
          outline
          @click="showNewClassInput = true"
          label="New Tag"
          class="q-mr-sm"
          :color="$q.dark.isActive ? 'grey-3' : 'grey-9'"
        />
        <q-btn
          outline
          @click="showDeleteButtons = !showDeleteButtons"
          :label="showDeleteButtons ? 'Lock Tags' : 'Edit Tags'"
          :color="$q.dark.isActive ? 'grey-3' : 'grey-9'"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
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
    ...mapState(["classes", "currentClass", "enableKeyboardShortcuts"]),
  },
  created() {
    document.addEventListener('keydown', this.keypress);
  },
  watch: {
    newClassName(now, then) {
      if (now != then) {
        this.newClassName = now.toUpperCase();
      }
    },
  },
  methods: {
    ...mapMutations(["setCurrentClass"]),
    ...mapActions(["createNewClass", "deleteClass"]),
    keypress(event) {
      if (!this.enableKeyboardShortcuts) {
        return
      }
      // can now be any key on the board
      var key = event.key
      const results = this.classes.filter(tag => tag.key === key);
      if (results.length === 0) return;

      this.setCurrentClass(results[0].id);
      return
    },
    async handleRemoveClass(class_id, className) {
      let sure = await this.confirmAction(className);
      if (sure) {
        this.deleteClass(class_id);
      }
    },
    async confirmAction(className) {
      return new Promise((resolve) => {
        const result = confirm(
          "Are you sure you want to remove the tag `" +
            className +
            "`?\nNOTE: This will NOT affect previously tagged entities."
        );
        resolve(result);
      });
    },
    saveNewClass() {
      if (!this.newClassName) {
        return;
      }
      const self = this;
      this.createNewClass(this.newClassName).then(() => {
        self.showNewClassInput = false;
        self.newClassName = "";
      });
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
