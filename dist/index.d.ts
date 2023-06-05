import { VueConstructor } from "vue";
import type { PluginOptions } from "./type";
declare const plugin: {
    install(Vue: VueConstructor, options?: PluginOptions): void;
};
export * from "./type";
export default plugin;
