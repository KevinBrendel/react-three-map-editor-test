import React, { useEffect, useRef } from 'react';
import * as Three from 'three';
import { OrthographicCamera, WebGLRenderer, CubeCamera } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ReactReduxContext } from 'react-redux';

interface EditorProps {
	cameraPosition: Three.Vector3,
	cameraZoom: number,
	draw: boolean,
}

const Editor: React.FC<EditorProps> = (props) => {
	let canvasElement = {} as HTMLCanvasElement;

	let material = useRef<Three.MeshBasicMaterial>();
	let cube = useRef<Three.Mesh>();

	var redColor = new Three.Color("red");
	var blueColor = new Three.Color("blue");

	useEffect(() => {
		var scene = new Three.Scene();
		var camera = new OrthographicCamera(canvasElement.width, - canvasElement.clientWidth, canvasElement.clientHeight, -canvasElement.clientHeight, 1, 1000);
		camera.position.x = props.cameraPosition.x;
		camera.position.y = props.cameraPosition.y;
		camera.position.z = props.cameraPosition.z;
		camera.rotation.set(90, 0, 0);
		camera.zoom = props.cameraZoom;
		var renderer = new Three.WebGLRenderer({ canvas: canvasElement });
		renderer.setClearColor("dimgrey")
		var controls = new OrbitControls(camera, renderer.domElement);
		controls.mouseButtons = { LEFT: Three.MOUSE.PAN, MIDDLE: Three.MOUSE.DOLLY, RIGHT: Three.MOUSE.PAN };
		controls.touches = { ONE: Three.TOUCH.PAN, TWO: Three.TOUCH.DOLLY_PAN };
		controls.enableRotate = false;

		var geometry = new Three.BoxGeometry(10, 10, 10);
		material.current = new Three.MeshBasicMaterial({ color: props.draw ? redColor : blueColor });
		cube.current = new Three.Mesh(geometry, material.current);
		scene.add(cube.current);

		canvasElement.onkeypress = (event: KeyboardEvent) => {
			console.log(event.keyCode);
		};

		var render = function () {
			if (resizeRendererToDisplaySize(renderer)) {
				const canvas = renderer.domElement;
				camera.left = canvas.width;
				camera.right = - canvas.clientWidth;
				camera.top = canvas.clientHeight;
				camera.bottom = -canvas.clientHeight;
				camera.updateProjectionMatrix();
			}

			controls.update();

			renderer.render(scene, camera);
			requestAnimationFrame(render);
		};

		render();

		return () => {
			cube.current?.geometry.dispose();
			scene.dispose();
			material.current?.dispose();
			renderer.dispose();
			controls.dispose();
		};
	}, []);

	const resizeRendererToDisplaySize = (renderer: WebGLRenderer) => {
		const canvas = renderer.domElement;
		// Might want to consider window.devicePixelRatio here for high dpi displays
		const width = canvas.clientWidth;
		const height = canvas.clientHeight;
		const needResize = canvas.width !== width || canvas.height !== height;
		if (needResize) {
			renderer.setSize(width, height, false);
		}
		return needResize;
	}

	return (
		<ReactReduxContext.Consumer>
			{({ store }) => {
				store.subscribe(() => {
					material.current!.color = store.getState().drawPolygonMode ? redColor : blueColor;
					cube.current!.material = material.current!;
				});
				return <canvas ref={ref => (canvasElement = ref!)} style={{ width: "100%", height: "100%", display: "block" }} />
			}}
		</ReactReduxContext.Consumer>
	);
};
export default Editor;