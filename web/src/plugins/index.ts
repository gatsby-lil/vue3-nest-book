import type { App } from "vue";
import acroDesign from "./acroDesign";

const modules = [acroDesign]
export default (app:App) => {
    modules.forEach(m => m(app));
}