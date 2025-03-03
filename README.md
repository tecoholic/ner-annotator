> [!WARNING]
> NER Annotator should be considered deprecated as it is no longer maintained actively.
> However, the version hosted online and the desktop applications are perfectly usable.
>
> If you are looking for an actively maintained NER tagging software, try [Label Studio](https://github.com/HumanSignal/label-studio)


# NER Annotator for Spacy

NER Annotator for SpaCy allows you to create training data for creating a custom NER Model with custom tags.

- Web Application: [https://tecoholic.github.io/ner-annotator/](https://tecoholic.github.io/ner-annotator/)
- Linux: [Debian Packages & AppImage](https://github.com/tecoholic/ner-annotator/releases)
- Windows: [Installers](https://github.com/tecoholic/ner-annotator/releases)

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

1. NodeJS v21.x
2. Yarn Package Manager
3. Rust toolchain (for building desktop versions)

### Running it locally for development

1. Open another terminal and start the server for the UI

```sh
yarn install
yarn dev
```

Now go to [http://localhost:5173](http://localhost:5173)

### Developing the desktop application

The desktop applications have been created using [Tauri](https://v2.tauri.app/).

```sh
yarn tauri dev
```

To build the final binaries run

```sh
yarn tauri build
```

## Credits

1. App Icon - <a href="https://www.flaticon.com/free-icons/ornithology" title="ornithology icons">Ornithology icons created by Freepik - Flaticon</a>
