import { save } from "@tauri-apps/plugin-dialog";
import { invoke } from "@tauri-apps/api/core";
import { documentDir } from "@tauri-apps/api/path";

export const exportFile = async (content, filename) => {
  if (window.__TAURI_INTERNALS__) {
    save({
      defaultPath: await documentDir(),
      filters: [
        { extensions: ["json"], name: "JSON Files (*.json)" },
        { name: "All files (*.*)", extensions: ["*"] },
      ],
    })
      .then((path) => {
        if (!path) return;
        if (!path.match(/.*\.json$/)) path += ".json";

        invoke("save_file", { filepath: path, contents: content })
          .then((msg) => alert(msg))
          .catch((e) => alert(e));
      })
      .catch(() => {});
  } else {
    let element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(content)
    );
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
};
