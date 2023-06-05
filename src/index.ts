import { VueConstructor, ObjectDirective } from "vue";
import vPlay from "./v-preview";
import type { PluginOptions } from "./type";

const plugin = {
  install(Vue: VueConstructor, options: PluginOptions = {}) {
    Vue.prototype.$vueMediaPlayPluginOptions = options;
    Vue.directive("preview", vPlay as ObjectDirective);
  },
};

export * from "./type";
export default plugin;
