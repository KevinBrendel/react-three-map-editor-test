import { TOGGLE_DRAW_POLYGON_MODE, SET_CAMERA_POSITION, SET_CAMERA_ZOOM } from "./EditorActions";
import * as Three from 'three';

const initialState = {
	drawPolygonMode: false,
	cameraPosition: new Three.Vector3(0, 100, 0),
	cameraZoom: 20
}

function editor(state = initialState, action: any) {
	switch (action.type) {
		case TOGGLE_DRAW_POLYGON_MODE:
			return Object.assign({}, state, { drawPolygonMode: !state.drawPolygonMode });
		case SET_CAMERA_POSITION:
			return Object.assign({}, state, { cameraPosition: action.position });
		case SET_CAMERA_ZOOM:
			return Object.assign({}, state, { cameraZoom: action.zoom });
		default:
			return state;
	}
}

export default editor;