import type { App } from "vue";
import element  from "./element";

const modules = [element]
export default (app:App) => {
    modules.forEach(m => m(app));
}