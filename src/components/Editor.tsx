import React, { useEffect, useRef } from 'react';
import * as Three from 'three';
import { OrthographicCamera, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Grid, Button } from '@material-ui/core';

const Editor: React.FC = () => {
	let drawPolygonMode = false;

	let canvasElement = useRef<HTMLCanvasElement>(null);
	let material = useRef<Three.MeshBasicMaterial>();
	let cube = useRef<Three.Mesh>();

	var redColor = new Three.Color("red");
	var blueColor = new Three.Color("blue");

	useEffect(() => {
		var scene = new Three.Scene();
		let width = canvasElement.current?.clientWidth!;
		let height = canvasElement.current?.clientHeight!;
		var camera = new OrthographicCamera(width, - width, height, -height, 1, 1000);
		camera.position.y = 100;
		camera.rotation.set(90, 0, 0);
		camera.zoom = 20;
		var renderer = new Three.WebGLRenderer({ canvas: canvasElement.current! });
		renderer.setClearColor("dimgrey")
		var controls = new OrbitControls(camera, renderer.domElement);
		controls.mouseButtons = { LEFT: Three.MOUSE.PAN, MIDDLE: Three.MOUSE.DOLLY, RIGHT: Three.MOUSE.PAN };
		controls.touches = { ONE: Three.TOUCH.PAN, TWO: Three.TOUCH.DOLLY_PAN };
		controls.enableRotate = false;

		var geometry = new Three.BoxGeometry(10, 10, 10);
		material.current = new Three.MeshBasicMaterial({ color: drawPolygonMode ? redColor : blueColor });
		cube.current = new Three.Mesh(geometry, material.current);
		scene.add(cube.current);

		canvasElement.current!.onkeypress = (event: KeyboardEvent) => {
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

			material.current!.color = drawPolygonMode ? redColor : blueColor;
			cube.current!.material = material.current!;

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
		<Grid container direction="row" alignItems="stretch" style={{ width: "100%", height: "100%" }}>
			<Grid item style={{ width: "160px", padding: "8px", backgroundColor: "lightgrey" }}>
			</Grid>
			<div style={{ width: "160px", padding: "8px", backgroundColor: "grey" }}>
				<Grid item container direction="column" alignItems="stretch">
					<Button variant="contained" onClick={() => {
						drawPolygonMode = !drawPolygonMode;
					}}>
						Polygon
				</Button>
				</Grid>
			</div>
			<Grid item style={{ flexGrow: 1 }}>
				<canvas ref={canvasElement} style={{ width: "100%", height: "100%", display: "block" }} />
			</Grid>
		</Grid >
	);
};
export default Editor;