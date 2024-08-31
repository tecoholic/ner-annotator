# NER Annotator for Spacy

NER Annotator for SpaCy allows you to create training data for creating a custom NER Model with custom tags.

- Web Application: [https://tecoholic.github.io/ner-annotator/](https://tecoholic.github.io/ner-annotator/)
- Linux: [Debian Package or an AppImage](https://github.com/tecoholic/ner-annotator/releases)
- Windows: [x64 MSI Installer](https://github.com/tecoholic/ner-annotator/releases)

## Features

- Easy to use UI for labelling entities in text
- Custom labels with color-coding
- Word-level and character-level annotation
- Keyboard shortcuts
- Import existing annotations for review
- Light and dark themes

## Screenshots

![NER Annotator Screenshot](./src/assets/step-2.png)

## FAQ

#### How do I import the annotations to spaCy?

A guide is available [here](https://github.com/tecoholic/ner-annotator/issues/44#issuecomment-1159235765).

#### I have multiple exported annotations. How do I combined them into one file?

A guide is available [here](https://github.com/tecoholic/ner-annotator/discussions/81#discussioncomment-5287891).

#### What tagging format does the tool use?

The JSON file created by the tool is generic and simply lists the start and end of each entity. As such, the annotations are independent of the tagging format you intend to use (IO, IOB, IOBES, etc.).

## Development

### Requirements

1. Node JS 14.x
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
