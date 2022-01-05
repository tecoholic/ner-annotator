# NER Annotator for Spacy

![Homepage](assets/start_page.png?raw=true)
![Annotation Page](assets/tagging.png?raw=true)
![JSON output](assets/output.png?raw=true)

## Running it locally for development

1. Open another terminal and start the server for the UI

```sh
cd ui
yarn install
yarn serve
```

Now go to [http://localhost:8081/ner-annotator/](http://localhost:8081/ner-annotator/)

## Desktop application (experimental)

An experimental version of the annotator is also available for Linux as:

- [Debian Package](https://github.com/tecoholic/ner-annotator/releases/download/0.1.0/ner-annotator_0.1.0_amd64.deb)
- [AppImage](https://github.com/tecoholic/ner-annotator/releases/download/0.1.0/ner-annotator_0.1.0_amd64.AppImage)

The desktop applications have been created using [Tauri](https://tauri.studio). The source code for this is available in the `desktop-tauri` branch.
