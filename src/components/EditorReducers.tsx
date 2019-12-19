import { TOGGLE_DRAW_POLYGON_MODE } from "./EditorActions";

const initialState = {
	drawPolygonMode: false,
}

function editor(state = initialState, action: any) {
	switch (action.type) {
		case TOGGLE_DRAW_POLYGON_MODE:
			return Object.assign({}, state, { drawPolygonMode: !state.drawPolygonMode });
		default:
			return state;
	}
}

export default editor;