import { save } from "@tauri-apps/api/dialog";
import { invoke } from "@tauri-apps/api/tauri";
import { documentDir } from "@tauri-apps/api/path";

export const exportFile = async (content, filename) => {
  if (typeof window.rpc === "undefined") {
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
  } else {
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
  }
};
