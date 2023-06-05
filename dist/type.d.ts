export type FileType = "mp3" | "aac" | "flac" | "wav" | "wma" | "weba" | "ogg" | "opus" | "m4a" | "mp4" | "webm" | "avi" | "wmv" | "flv" | "mov" | "m4v" | "jpg" | "jpeg" | "png" | "gif" | "bmp" | "webp" | "svg" | "ico" | "tif" | "tiff" | "pdf" | "doc" | "docx" | "xls" | "xlsx" | "ppt" | "pptx" | "txt";
export type PluginOptions = undefined | {
    dialogClassName?: string;
    titleStyle?: string;
    closeButtonStyle?: string;
};
export interface FileData {
    id: number;
    fileName: string;
    filePath: string;
    fileType: FileType;
    fileSize: string;
    dataFlag?: number;
    delFlag?: number;
}
