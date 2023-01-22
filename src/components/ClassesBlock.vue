<template>
  <div class="q-pa-md" style="border-bottom: 1px solid #ccc;">
    <div class="row">
      <div class="tags">
        <q-chip
          v-for="cl in classes"
          :key="cl.id"
          square
          :color="cl.id === currentClass.id ? cl.color : 'grey-3'"
          clickable
          @click="setCurrentClass(cl.id)"
          :removable="showDeleteButtons"
          @remove="handleRemoveClass(cl.id, cl.name)"
        >
          <q-avatar
            :color="cl.color.replace('11', '12')"
            text-color="white"
            :icon="cl.id === currentClass.id ? 'fa fa-check' : ''"
          ></q-avatar>
          {{ cl.name }}
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
        <q-btn-group>
          <q-btn outline @click="showNewClassInput = true" label="New Tag" />
          <q-btn
            outline
            @click="showDeleteButtons = !showDeleteButtons"
            :label="showDeleteButtons ? 'Lock Tags' : 'Edit Tags'"
          />
        </q-btn-group>
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
    ...mapMutations(["setCurrentClass"]),
    ...mapActions(["createNewClass", "deleteClass"]),
    handleRemoveClass(class_id, className) {
      let sure = confirm(
        "Are you sure you want to remove the tag `" +
          className +
          "`?\nNOTE: This will NOT affect previously tagged entities."
      );
      if (sure) {
        this.deleteClass(class_id);
      }
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
