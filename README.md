# NER Annotator for Spacy

NER Annotator for SpaCy allows you to create training data for creating a custome NER Model with custom tags. It can either be access as a web application directly from [https://tecoholic.github.io/ner-annotator/](https://tecoholic.github.io/ner-annotator/) or can be installed in Linux systems as a desktop application.

## Desktop application (experimental)

An experimental version of the annotator is also available for Linux as:

- [Debian Package](https://github.com/tecoholic/ner-annotator/releases/download/0.1.0/ner-annotator_0.1.0_amd64.deb)
- [AppImage](https://github.com/tecoholic/ner-annotator/releases/download/0.1.0/ner-annotator_0.1.0_amd64.AppImage)

## Screenshots of the process


![Homepage](assets/start_page.png?raw=true)
![Annotation Page](assets/tagging.png?raw=true)
![JSON output](assets/output.png?raw=true)

## Development

### Running it locally for development

1. Open another terminal and start the server for the UI

```sh
cd ui
yarn install
yarn serve
```

Now go to [http://localhost:8081/ner-annotator/](http://localhost:8081/ner-annotator/)

### Developing the desktop application

The desktop applications have been created using [Tauri](https://tauri.studio).

```sh
yarn tauri:serve
```

## Credits

1. App Icon - <a href="https://www.flaticon.com/free-icons/ornithology" title="ornithology icons">Ornithology icons created by Freepik - Flaticon</a>
