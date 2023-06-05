# Vue2 预览插件

Vue2 预览插件是一个 Vue2 插件，它提供了文本、文档、音频和视频文件的在线预览功能。对于不支持预览的格式，它提供了一种方式将它们下载到本地。

## 安装

通过 npm 安装：

```bash
npm install vue2-file-preview-plugin
```

或者通过 yarn 安装：

```bash
yarn add vue2-file-preview-plugin
```

## 使用

首先，你需要在你的 Vue2 项目中引入并使用该插件：

```javascript
import Vue from "vue";
import VuePreview from "vue2-file-preview-plugin";

Vue.use(VuePreview);
```

然后，你可以在你的 Vue 组件中使用 `v-preview` 指令来预览文件：

```html
<template>
  <div>
    <button v-preview="fileData">预览文件</button>
  </div>
</template>
```

`fileData` 是一个对象，或者包含多个 fileData 对象的数组。它的格式如下：

```typescript
interface FileData {
  id: number;
  fileName: string;
  filePath: string;
  fileType: FileType;
  fileSize: string;
  dataFlag?: number;
  delFlag?: number;
}
```

你可以动态地改变 `fileData` 来预览不同的文件。

## 贡献

如果你在使用过程中发现了任何问题，或者你有任何建议或者需求，欢迎通过 Github 提交 issue 或者 pull request。

## 许可

本项目采用 MIT 许可。详情请参见 [LICENSE](LICENSE) 文件。
