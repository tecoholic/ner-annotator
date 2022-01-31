# NER Annotator for Spacy

NER Annotator for SpaCy allows you to create training data for creating a custome NER Model with custom tags. It can either be access as a web application directly from [https://tecoholic.github.io/ner-annotator/](https://tecoholic.github.io/ner-annotator/) or can be installed in Linux systems as a desktop application.

## Desktop application (experimental)

An experimental version of the annotator is also available for Linux as a [Debian Package or an AppImage](https://github.com/tecoholic/ner-annotator/releases)

## Development

### Requirements

1. Node JS 12.x or 14.x
2. Yarn Package Manager
3. Rust (for building desktop versions)

### Running it locally for development

1. Open another terminal and start the server for the UI

```sh
yarn
yarn serve
```

Now go to [http://localhost:8081/ner-annotator/](http://localhost:8081/ner-annotator/)

### Developing the desktop application

The desktop applications have been created using [Tauri](https://tauri.studio).

```sh
yarn tauri:serve
```

To build the final binaries run

```sh
yarn tauri:build
```

## Credits

1. App Icon - <a href="https://www.flaticon.com/free-icons/ornithology" title="ornithology icons">Ornithology icons created by Freepik - Flaticon</a>

## Changelog

#### Version 1.0.0

- Rewritten UI using [Quasar](https://quasar.dev) framework
- Export and Import tags

##### Version 0.1.1

- [#14](issues/14) - Remembers tags across sessions
- [#3](issues/3) - Adds a button to enable/disable removing of tags to prevent accidental removal of tags

##### Version 0.1.0

- Adds the desktop application
