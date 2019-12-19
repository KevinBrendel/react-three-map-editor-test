import * as Three from 'three';

export const TOGGLE_DRAW_POLYGON_MODE = "TOGGLE_DRAW_POLYGON_MODE";
export const SET_CAMERA_POSITION = "SET_CAMERA_POSITION";
export const SET_CAMERA_ZOOM = "SET_CAMERA_ZOOM";

export function toggleDrawPolygonMode() {
	return { type: TOGGLE_DRAW_POLYGON_MODE };
}

export function setCameraPosition(position: Three.Vector3) {
	return { type: SET_CAMERA_POSITION, position };
}

export function setCameraZoom(zoom: number) {
	return { type: SET_CAMERA_ZOOM, zoom };
}