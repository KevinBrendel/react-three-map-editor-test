import React from 'react';
import { Grid } from '@material-ui/core';
import Editor from './components/Editor';
import { store } from './components/EditorStore';
import Toolbar from "./components/Toolbar";
import { Provider, ReactReduxContext } from 'react-redux';

const App: React.FC = () => {
	return (
		<Provider store={store}>
			<div style={{ height: "100vh" }}>
				<Grid container direction="row" alignItems="stretch" style={{ width: "100%", height: "100%" }}>
					<Grid item style={{ width: "160px", padding: "8px", backgroundColor: "lightgrey" }}>
					</Grid>
					<Toolbar />
					<Grid item style={{ flexGrow: 1 }}>
						<ReactReduxContext.Consumer>
							{({ store }) => {
								return <Editor cameraPosition={store.getState().cameraPosition} cameraZoom={store.getState().cameraZoom} draw={store.getState().drawPolygonMode} />
							}}
						</ReactReduxContext.Consumer>
					</Grid>
				</Grid >
			</div >
		</Provider>
	);
}

export default App;
