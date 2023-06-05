import type { ObjectDirective } from "vue";
import { createElementForFileType, isImgType } from "./utils";
import { PluginOptions, FileData } from "./type";

const dialogId = "vue2-file-preview-plugin-dialog";
const titleAreaHeight = 50;
const listAreaHeight = 200;
const eventHandlers = new WeakMap<HTMLElement, (event: MouseEvent) => void>();

const vPlay: ObjectDirective<HTMLElement, FileData | FileData[]> = {
  bind(el, binding, vnode) {
    const options: PluginOptions =
      vnode.context && vnode.context.$vueMediaPlayPluginOptions;
    const url = options?.globalSettings?.frontDeployUrl;
    console.log("插件选项", options);

    const handleClick = function handleClick() {
      const files: FileData | FileData[] = binding.value;
      if (!files || (Array.isArray(files) && files.length === 0)) {
        console.warn("vue2-file-preview-plugin:传入的文件数据为空");
        return;
      }

      // 如果有旧的对话框存在，则先移除
      const oldDialog = document.getElementById(dialogId);
      if (oldDialog) document.body.removeChild(oldDialog);

      // 创建一个全局对话框并添加到DOM中
      const dialog = document.createElement("div");
      dialog.id = dialogId;
      dialog.style.position = "fixed";
      dialog.style.top = "0px";
      dialog.style.right = "0px";
      dialog.style.bottom = "0px";
      dialog.style.left = "0px";
      dialog.style.backgroundColor = "white";
      dialog.style.zIndex = "999999999";

      if (options?.dialogClassName) {
        dialog.className = options.dialogClassName;
      }

      // 添加一个关闭按钮
      const removeDialog = function () {
        const dialog = document.getElementById(dialogId);
        if (dialog) {
          closeButton.removeEventListener("click", removeDialog);
          document.body.removeChild(dialog);
        }
      };

      const closeButton = document.createElement("div");
      closeButton.innerText = "关闭";
      closeButton.style.cursor = "pointer";
      closeButton.addEventListener("click", removeDialog);
      eventHandlers.set(closeButton, handleClick);

      if (options?.closeButtonStyle) {
        closeButton.className = options.closeButtonStyle;
      }

      // 标题内容
      const title = document.createElement("h2");
      title.innerText = "文件预览";

      // 创建标题区域
      const titleArea = document.createElement("div");
      titleArea.style.height = titleAreaHeight + "px";
      titleArea.style.lineHeight = titleAreaHeight + "px";
      titleArea.style.background = "#757eff";
      titleArea.style.color = "white";
      titleArea.style.display = "flex";
      titleArea.style.alignItems = "center";
      titleArea.style.justifyContent = "space-between";
      titleArea.style.padding = "0 16px";
      titleArea.style.flex = "none";

      // 预览容器
      const previewArea = document.createElement("div");
      previewArea.style.border = "1px solid #999";
      previewArea.style.flex = "1";
      previewArea.style.marginTop = "16px";
      previewArea.style.display = "flex";
      previewArea.style.justifyContent = "center";
      previewArea.style.alignItems = "center";

      // 创建主区域
      const bodyArea = document.createElement("div");
      bodyArea.style.height = `calc(100% - ${titleAreaHeight}px)`;
      bodyArea.style.display = "flex";
      bodyArea.style.flexFlow = "column nowrap";
      bodyArea.style.padding = "16px";

      if (Array.isArray(files) && files.length > 1) {
        // 创建列表区域
        const listArea = document.createElement("div");
        listArea.style.flex = "none";
        listArea.style.overflowY = "auto";

        files.forEach((file, index) => {
          const li = document.createElement("li");
          li.style.height = "40px";
          li.style.lineHeight = "40px";
          li.style.cursor = "pointer";
          listArea.style.borderBottom = "1px solid #ccc";
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
              mediaElement.src = url + file.filePath;
            }
            previewArea.innerHTML = ""; // 移除旧
            previewArea.appendChild(mediaElement);
          });

          listArea.appendChild(li);
        });
        previewArea.style.height = `calc(100% - ${listAreaHeight}px)`;
        bodyArea.append(listArea);
      } else {
        const file = Array.isArray(files) ? files[0] : files;
        const mediaElement = createElementForFileType(
          file.fileType,
          file.filePath
        );
        if (mediaElement instanceof HTMLMediaElement) {
          mediaElement.src = file.filePath;
        }
        previewArea.style.height = `100%`;
        previewArea.appendChild(mediaElement);
      }

      titleArea.appendChild(title);
      titleArea.append(closeButton);
      dialog.append(titleArea);
      bodyArea.append(previewArea);
      dialog.append(bodyArea);
      document.body.append(dialog);
    };
    eventHandlers.set(el, handleClick);
    el.addEventListener("click", handleClick);
  },

  update(el: HTMLElement, binding) {
    const files: FileData | FileData[] = binding.value;
    const mediaElement = document.getElementById(dialogId);

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
    // 移除全局对话框
    const dialog = document.getElementById(dialogId);
    if (dialog) document.body.removeChild(dialog);
  },
};

export default vPlay;
