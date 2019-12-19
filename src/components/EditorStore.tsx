import { createStore } from "redux";
import editor from "./EditorReducers";

export const store = createStore(editor);