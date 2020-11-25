<template>
  <div class="my-2">
    <button class="button is-danger" @click="generateJSONExport()">
      Export Annotations
    </button>
  </div>
</template>
<script>
import {mapState} from "vuex";
export default {
  name: "Export",
  computed: {
    ...mapState(["annotations", "classes"]),
  },
  methods: {
    generateJSONExport() {
      const filename = "training_data.json";
      const output = {
        "classes": this.classes.map(c => c.name),
        "annotations": this.annotations
      }
      const jsonStr = JSON.stringify(output);

      let element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(jsonStr)
      );
      element.setAttribute("download", filename);

      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    },
  },
};
</script>
