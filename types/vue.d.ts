import Vue from "vue";
import { PluginOptions } from "../src/type";

declare module "vue/types/vue" {
  interface Vue {
    $vueMediaPlayPluginOptions: PluginOptions;
  }
}
