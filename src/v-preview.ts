import type { ObjectDirective } from "vue";
import { createElementForFileType } from "./utils";
import { PluginOptions, FileData, isImgType } from "./type";

const dialogId = "vue-media-play-plugin-dialog";
const eventHandlers = new WeakMap<HTMLElement, (event: MouseEvent) => void>();

const vPlay: ObjectDirective<HTMLElement, FileData | FileData[]> = {
  bind(el, binding, vnode) {
    const options: PluginOptions =
      vnode.context && vnode.context.$vueMediaPlayPluginOptions;

    const handleClick = function handleClick() {
      const files: FileData | FileData[] = binding.value;
      if (!files || (Array.isArray(files) && files.length === 0)) {
        console.warn("vue-media-play-plugin:传入的文件数据为空");
        return;
      }

      // 如果有旧的对话框存在，则先移除
      const oldDialog = document.getElementById(dialogId);
      if (oldDialog) document.body.removeChild(oldDialog);

      // 创建一个全局对话框并添加到DOM中
      const dialog = document.createElement("div");
      dialog.id = dialogId;
      dialog.style.position = "fixed";
      dialog.style.top = "0";
      dialog.style.right = "0";
      dialog.style.bottom = "0";
      dialog.style.left = "0";
      dialog.style.backgroundColor = "white";
      dialog.style.display = "flex";
      dialog.style.flexFlow = "column nowrap";

      if (options?.dialogClassName) {
        dialog.className = options.dialogClassName;
      }

      // 添加一个关闭按钮
      const closeButton = document.createElement("div");
      closeButton.innerText = "关闭";
      closeButton.style.position = "absolute";
      closeButton.style.top = "10px";
      closeButton.style.right = "10px";
      closeButton.addEventListener("click", () => {
        document.body.removeChild(dialog);
        el.removeEventListener("click", handleClick);
      });
      if (options?.closeButtonStyle) {
        closeButton.className = options.closeButtonStyle;
      }

      // 创建标题区域
      const titleArea = document.createElement("div");
      titleArea.style.position = "relative";
      closeButton.style.left = "0";
      closeButton.style.top = "0";
      closeButton.style.right = "0";
      closeButton.style.height = "50px";
      closeButton.style.lineHeight = "50px";
      closeButton.style.background = "#757eff";
      closeButton.style.color = "white";
      closeButton.style.padding = "0 16px";
      closeButton.style.flex = "none";
      closeButton.style.display = "flex";
      closeButton.style.alignItems = "center";
      closeButton.style.justifyContent = "space-between";
      // 标题内容
      const title = document.createElement("h2");
      title.innerText = "文件预览";

      titleArea.appendChild(title);
      titleArea.append(closeButton);
      dialog.append(titleArea);

      // 创建列表区域
      const listArea = document.createElement("div");
      listArea.style.flex = "none";
      listArea.style.overflowY = "auto";
      listArea.style.maxHeight = "200px";
      listArea.style.padding = "16px";
      dialog.append(listArea);

      // 创建内容区域
      const contentArea = document.createElement("div");
      contentArea.style.flexGrow = "1";
      contentArea.style.display = "flex";
      contentArea.style.justifyContent = "center";
      contentArea.style.alignItems = "center";
      dialog.append(contentArea);

      if (Array.isArray(files) && files.length > 1) {
        files.forEach((file, index) => {
          const li = document.createElement("li");
          li.style.height = "40px";
          li.style.lineHeight = "40px";
          li.textContent = `${file.fileName} (${file.fileSize})`;

          // 预览图像或默认图标
          if (isImgType(file.fileType)) {
            const img = document.createElement("img");
            img.src = file.filePath;
            li.prepend(img);
          }

          li.addEventListener("click", () => {
            const mediaElement = createElementForFileType(
              file.fileType,
              file.filePath
            );
            if (mediaElement instanceof HTMLMediaElement) {
              mediaElement.src = file.filePath;
            }
            contentArea.innerHTML = ""; // 移除旧
            contentArea.appendChild(mediaElement);
          });

          listArea.appendChild(li);
        });
      } else {
        const file = Array.isArray(files) ? files[0] : files;
        const mediaElement = createElementForFileType(
          file.fileType,
          file.filePath
        );
        if (mediaElement instanceof HTMLMediaElement) {
          mediaElement.src = file.filePath;
        }
        contentArea.appendChild(mediaElement);
      }

      document.body.append(dialog);
    };
    eventHandlers.set(el, handleClick);
    el.addEventListener("click", handleClick);
  },

  update(el: HTMLElement, binding) {
    const files: FileData | FileData[] = binding.value;
    const mediaElement = document.getElementById("v-play-element");

    // 判断files是数组还是单个对象
    let singleFile;
    if (Array.isArray(files)) {
      if (files.length === 1) {
        singleFile = files[0];
      } else {
        console.error("Multiple media files found in the provided data");
        return;
      }
    } else {
      singleFile = files;
    }

    if (singleFile && mediaElement instanceof HTMLMediaElement) {
      mediaElement.src = singleFile.filePath;
    } else {
      console.error("No media file found in the provided data");
    }
  },

  unbind(el: HTMLElement) {
    // 移除click事件监听器
    const handler = eventHandlers.get(el);
    if (handler) {
      el.removeEventListener("click", handler);
      eventHandlers.delete(el);
    }
    // 移除全局对话框
    const dialog = document.getElementById(dialogId);
    if (dialog) document.body.removeChild(dialog);
  },
};

export default vPlay;
