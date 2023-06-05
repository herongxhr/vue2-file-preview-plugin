import { VueConstructor } from "vue";
import type { PluginOptions } from "../types/type";
declare const plugin: {
    install(Vue: VueConstructor, options?: PluginOptions): void;
};
export * from "../types/type";
export default plugin;
