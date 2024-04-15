 <template>
  <div class="field">
    <div class="file is-centered is-primary has-name is-boxed my-4">
      <label class="file-label">
        <input
          class="file-input"
          type="file"
          name="textfile"
          accept=".txt, .json"
          @change="onFileSelected"
        />
        <span class="file-cta">
          <span class="file-icon">
            <font-awesome-icon icon="file-alt" />
          </span>
          <span class="file-label">
            Select file to start annotating
          </span>
        </span>
      </label>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "LoadTextFile",
  emits: ["text-file-loaded", "json-file-loaded"],
  methods: {
    ...mapMutations(["setInputSentences"]),
    onFileSelected(file) {
      // onFileSelected() is called if the user clicks and manually
      //    selects a file. If they drag and drop, that is handled in
      //    App.vue. If you modify this function, you may also want to
      //    modify App#onDrop(), App#processFileDrop(), and
      //    StartPage#onFileSelected() to match
      let fileType = file.name.split('.').pop();
      try {
        let reader = new FileReader();
        reader.addEventListener("load", (event) => {
          this.setInputSentences(event.target.result);
          reader.readAsText(file);
          if (fileType === "txt") {
            this.$emit("text-file-loaded");
          }
          else if (fileType === "json") {
            this.$emit("json-file-loaded")
          }
          else {
            alert('Please upload either a .txt or a .json file.');
          }
        });
      } catch(e) {
        this.fileSelectionError();
      }
    },
    fileSelectionError() {
      this.$q.notify({
        icon: "fas fa-exclamation-circle",
        message: "Invalid file",
        color: "red-6",
        position: "top",
        timeout: 2000,
        actions: [{label: "Dismiss", color: "white"}],
      });
    },
  },
};
</script>