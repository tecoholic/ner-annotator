 <!-- TODO: I have only updated the drag method and click method on start page. I haven't hardly touched this file. -->

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
    // TODO: UPDATE THIS function based off of StartPage.vue's function onFileSelected()
    onFileSelected(e) {
      console.log("OnFileSelected in LoadTextFile.vue")
      let files = e.target.files;
      if (!files.length) return;

      let reader = new FileReader();
      reader.addEventListener("load", (event) => {
        this.setInputSentences(event.target.result);
        this.$emit("text-file-loaded");
      });
      reader.readAsText(files[0]);
    },
  },
};
</script>