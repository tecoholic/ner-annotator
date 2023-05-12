# NER Annotator for Spacy

NER Annotator for SpaCy allows you to create training data for creating a custom NER Model with custom tags.

- Web Application: [https://tecoholic.github.io/ner-annotator/](https://tecoholic.github.io/ner-annotator/)
- Linux: [Debian Package or an AppImage](https://github.com/tecoholic/ner-annotator/releases)
- Windows: [x64 MSI Installer](https://github.com/tecoholic/ner-annotator/releases)

## Screenshots

![NER Annotator Screenshot](./assets/tagging-2.png)

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

#### Version 1.3.0
- Drag and drop to upload files
- Support for character level annotations
- Added error messages and confirmation dialogs
- Even more bug fixes

#### Version 1.2.0
- Import annotations.
- Open a new file while one is already open.
- Keyboard shortcuts
- Lots and lots of bug fixes.

#### Version 1.1.0

- Adds "Back" button that allows navigating back to sentences/text blocks that's already been tagged and make changes.

#### Version 1.0.0

- Rewritten UI using [Quasar](https://quasar.dev) framework
- Export and Import tags

##### Version 0.1.1

- [#14](../../issues/14) - Remembers tags across sessions
- [#3](../../issues/3) - Adds a button to enable/disable removing of tags to prevent accidental removal of tags

##### Version 0.1.0

- Adds the desktop application
