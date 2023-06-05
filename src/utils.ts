import { FileType } from "./type";

export function createElementForFileType(fileType: FileType, filePath: string) {
  let element: HTMLElement;

  switch (fileType.toLowerCase()) {
    // Audio Formats
    case "mp3":
    case "aac":
    case "flac":
    case "wav":
    case "wma":
    case "weba":
    case "ogg":
    case "opus":
    case "m4a":
      element = document.createElement("audio");
      element.setAttribute("controls", '');
      break;

    // Video Formats
    case "mp4":
    case "webm":
    case "ogg":
    case "avi":
    case "wmv":
    case "flv":
    case "mov":
    case "m4v":
      element = document.createElement("video");
      element.setAttribute("controls", '');
      break;

    // Image Formats
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
    case "bmp":
    case "webp":
    case "svg":
    case "ico":
    case "tif":
    case "tiff":
      element = document.createElement("img");
      break;

    // Document Formats
    case "pdf":
      let pdfElement = document.createElement("embed") as HTMLEmbedElement;
      pdfElement.type = "application/pdf";
      element = pdfElement;
      break;
    case "doc":
    case "docx":
      let wordElement = document.createElement("embed") as HTMLEmbedElement;
      wordElement.type = "application/msword";
      element = wordElement;
      break;
    case "xls":
    case "xlsx":
      let excelElement = document.createElement("embed") as HTMLEmbedElement;
      excelElement.type = "application/vnd.ms-excel";
      element = excelElement;
      break;
    case "ppt":
    case "pptx":
      let pptElement = document.createElement("embed") as HTMLEmbedElement;
      pptElement.type = "application/vnd.ms-powerpoint";
      element = pptElement;
      break;
    case "txt":
      let aElement = document.createElement("a") as HTMLAnchorElement;
      aElement.href = filePath;
      element = aElement;
      element.innerText = "点击查看文件";
      break;

    // 更多的文件类型，例如 zip, rar, csv...
    default:
      let downElement = document.createElement("a") as HTMLAnchorElement;
      downElement.href = filePath;
      element = downElement;
      element.innerText = "点击下载文件";
  }

  return element;
}

export const imgExt = [
  ".jpe",
  ".jpg",
  ".jpeg",
  ".gif",
  ".png",
  ".bmp",
  ".ico",
  ".svg",
  ".webp",
];

export const isImgType = (ext: string) =>
  ext && imgExt.some((i) => i.includes(ext.toLowerCase()));
