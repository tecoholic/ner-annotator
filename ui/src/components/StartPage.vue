<template>
  <div>
    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">NER Text Annotator</h1>
          <h2 class="subtitle">Annotate text for SpaCy NER Model training</h2>
        </div>
      </div>
    </section>

    <section class="hero">
      <div class="container">
        <div class="columns">
          <div class="column">
            <LoadTextFile class="pt-6" v-on:file-loaded="onFileLoaded" />
          </div>
          <div class="column">
            <figure class="image" style="max-height: 15rem;">
              <img src="../assets/undraw_annotation.svg" />
            </figure>
          </div>
        </div>
      </div>
    </section>

    <section id="explanation" class="hero is-light">
      <div class="hero-body">
        <div class="container">

          <h1 class="title">How to use?</h1>

          <div class="columns">
            <div class="column is-narrow">
              <button class="button is-rounded is-small is-dark">1</button>
            </div>
            <div class="column">
              <p class="is-size-5"><strong>Prepare and upload the input file</strong></p>
              <p>Put all the text that needs to be annotated into a text file. If the corpus is large, split it into multiple files.</p>
              <p>Each line will be presented as an entry for annotating one by one.</p>
            </div>
          </div>
          <div class="columns">
            <div class="column is-narrow">
              <button class="button is-rounded is-small is-dark">2</button>
            </div>
            <div class="column">
              <p class="is-size-5"><strong>Create Tags and annotate</strong></p>
              <p>You can create any number of custom tags to annotate your text. The text will be presented as tokens for easy tagging.</p>
              <p>You can start your selection anywhere on a word and end anywhere to tag a word. No character level accuracy is needed.</p>
            </div>
          </div>
          <div class="columns">
            <div class="column is-narrow">
              <button class="button is-rounded is-small is-dark">3</button>
            </div>
            <div class="column">
              <p class="is-size-5"><strong>Export your annotations as JSON</strong></p>
              <p>The annotations are exported into a JSON array with the format:</p>
              <pre><code>
{
  "classes": [...],
  "annotations": [
    ["raw_text", {"entities": [(start, end, class),....]}],
    ...
  ]
}
              </code></pre>
            </div>
          </div>
          <div class="columns">
            <div class="column is-narrow">
              <button class="button is-rounded is-small is-dark">4</button>
            </div>
            <div class="column">
              <p class="is-size-5"><strong>Use the JSON for training your model</strong></p>
              <pre><code>
import json
import spacy

# load the training data
with open('your-annotations.json') as fp:
  training_data = json.load(fp)

# prepare an empty model to train
nlp = spacy.blank('en')
nlp.vocab.vectors.name = 'demo'
ner = nlp.create_pipe('ner')
nlp.add_pipe(ner, last=True)

# Add the custome NER Tags as entities into the model
for label in training_data["classes"]:
  nlp.entity.add_label(label)

# Train the model
optimizer = nlp.begin_training()

for text, annotations in training_data["annotations"]:
    if len(text) > 0: # in case an empty sentence was saved while annotating
        nlp.update([text], [annotations], sgd=optimizer)
             </code></pre>

            </div>
          </div>
        </div>
      </div>

    </section>
  </div>
</template>

<script>
import LoadTextFile from "./LoadTextFile";

export default {
  name: "StartPage",
  emits: ["file-loaded"],
  components: {
    LoadTextFile,
  },
  methods: {
    onFileLoaded() {
      this.$emit("file-loaded");
    },
  },
};
</script>
