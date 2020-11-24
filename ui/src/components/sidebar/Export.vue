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
    ...mapState(["annotations"]),
  },
  methods: {
    generateJSONExport() {
      const filename = "data.json";
      const jsonStr = JSON.stringify(this.annotations);

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
