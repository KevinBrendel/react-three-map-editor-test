import React, { useEffect } from 'react';
import * as Three from 'three';
import { OrthographicCamera, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { store } from './EditorStore';

const Editor: React.FC = () => {
	let canvasElement = {} as HTMLCanvasElement;

	useEffect(() => {
		var scene = new Three.Scene();
		var camera = new OrthographicCamera(canvasElement.width, - canvasElement.clientWidth, canvasElement.clientHeight, -canvasElement.clientHeight, 1, 1000);
		camera.position.y = 100;
		camera.rotation.set(90, 0, 0);
		camera.zoom = 20;
		var renderer = new Three.WebGLRenderer({ canvas: canvasElement });
		renderer.setClearColor("dimgrey")
		var controls = new OrbitControls(camera, renderer.domElement);
		controls.mouseButtons = { LEFT: Three.MOUSE.PAN, MIDDLE: Three.MOUSE.DOLLY, RIGHT: Three.MOUSE.PAN };
		controls.touches = { ONE: Three.TOUCH.PAN, TWO: Three.TOUCH.DOLLY_PAN };
		controls.enableRotate = false;

		var redColor = new Three.Color("red");
		var blueColor = new Three.Color("blue");
		var geometry = new Three.BoxGeometry(10, 10, 10);
		var material = new Three.MeshBasicMaterial({ color: blueColor });
		var cube = new Three.Mesh(geometry, material);
		scene.add(cube);

		canvasElement.onkeypress = (event: KeyboardEvent) => {
			console.log(event.keyCode);
		};

		store.subscribe(() => {
			material.color = store.getState().drawPolygonMode ? redColor : blueColor;
			cube.material = material;
		});

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
			cube.geometry.dispose();
			scene.dispose();
			material.dispose();
			renderer.dispose();
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
		<canvas ref={ref => (canvasElement = ref!)} style={{ width: "100%", height: "100%", display: "block" }} />
	);
};
export default Editor;