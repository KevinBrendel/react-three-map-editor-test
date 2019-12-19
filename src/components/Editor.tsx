import React, { useEffect, useLayoutEffect } from 'react';
import * as Three from 'three';
import { OrthographicCamera, WebGLRenderer, BoxGeometry } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Canvas, Renderer, useThree, extend, useFrame } from 'react-three-fiber';
//extend({ OrbitControls });

interface EditorProps {
	draw: boolean;
}

const Editor: React.FC<EditorProps> = (props) => {
	let canvasElement = {} as HTMLCanvasElement;

	useEffect(() => {
		var scene = new Three.Scene();
		var camera = new OrthographicCamera(canvasElement.width, - canvasElement.clientWidth, canvasElement.clientHeight, -canvasElement.clientHeight, 1, 1000);
		camera.position.y = 100;
		camera.rotation.set(90, 0, 0);
		camera.zoom = 20;
		var renderer = new Three.WebGLRenderer({ canvas: canvasElement });
		renderer.setClearColor("dimgrey");
		var controls = new OrbitControls(camera, renderer.domElement);
		controls.mouseButtons = { LEFT: Three.MOUSE.PAN, MIDDLE: Three.MOUSE.DOLLY, RIGHT: Three.MOUSE.PAN };
		controls.touches = { ONE: Three.TOUCH.PAN, TWO: Three.TOUCH.DOLLY_PAN };
		controls.enableRotate = false;

		var geometry = new Three.BoxGeometry(10, 10, 10);
		var material = new Three.MeshBasicMaterial({ color: props.draw ? "red" : "blue" });
		var cube = new Three.Mesh(geometry, material);
		scene.add(cube);

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

		return (() => {
			controls.dispose();
		});
	});

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


	// function Stuff() {
	// 	const { gl, size } = useThree();

	// 	gl.setClearColor("dimgrey");
	// 	gl.setSize(size.width, size.height);
	// 	// var controls = new OrbitControls(camera, gl.domElement);
	// 	// controls.mouseButtons = { LEFT: Three.MOUSE.PAN, MIDDLE: Three.MOUSE.DOLLY, RIGHT: Three.MOUSE.PAN };
	// 	// controls.touches = { ONE: Three.TOUCH.PAN, TWO: Three.TOUCH.DOLLY_PAN };
	// 	// controls.enableRotate = false;

	// 	// controls.update();

	// 	return (
	// 		<mesh>
	// 			<boxBufferGeometry attach="geometry" args={[10, 10, 10]} />
	// 			<meshBasicMaterial attach="material" color={props.draw ? "red" : "blue"} />
	// 		</mesh>
	// 	);
	// }

	// const Controls = () => {
	// 	const { camera, gl } = useThree();
	// 	var controls = new OrbitControls(camera, gl.domElement);
	// 	controls.mouseButtons = { LEFT: Three.MOUSE.PAN, MIDDLE: Three.MOUSE.DOLLY, RIGHT: Three.MOUSE.PAN };
	// 	controls.touches = { ONE: Three.TOUCH.PAN, TWO: Three.TOUCH.DOLLY_PAN };
	// 	controls.enableRotate = false;

	// 	useFrame(_ => controls.update());
	// 	return <mesh></mesh>;
	// }

	// return (
	// 	<Canvas orthographic={true} camera={{ position: new Three.Vector3(0, 100, 0), rotation: new Three.Euler(90, 0, 0), zoom: 20 }} style={{ width: "100%", height: "100%", display: "block" }}>
	// 		<Controls />
	// 		<Stuff />
	// 	</Canvas>
	// );
};
export default Editor;