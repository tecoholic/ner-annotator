<template>
  <section>
    <br />
    <q-toggle
      v-model="enableKeyboardShortcuts"
      label="Keyboard Shortcuts"
      @click="enableKeyboardShortcutsChanged"
    />
  </section>
</template>
  
<script>
export default {
  name: "KeyboardShortcuts",
  data: function() {
    return {
      enableKeyboardShortcuts: false,
    };
  },
  methods: {
    enableKeyboardShortcutsChanged() {
      this.$store.commit("setKeyboardShortcuts", this.enableKeyboardShortcuts);
    },
  },
};
</script>
  