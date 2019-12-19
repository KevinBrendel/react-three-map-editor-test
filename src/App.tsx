import React, { useState } from 'react';
import Editor from './components/Editor';
import { Grid, Button } from '@material-ui/core';

const App: React.FC = () => {

	let [draw, setDraw] = useState(false);

	return (
		<div style={{ height: "100vh" }}>
			<Grid container direction="row" alignItems="stretch" style={{ width: "100%", height: "100%" }}>
				<Grid item style={{ width: "160px", padding: "8px", backgroundColor: "lightgrey" }}>

				</Grid>
				<div style={{ width: "160px", padding: "8px", backgroundColor: "grey" }}>
					<Grid item container direction="column" alignItems="stretch">
						<Button variant="contained" onClick={() => {
							setDraw(!draw);
						}}>
							Polygon
						</Button>
					</Grid>
				</div>
				<Grid item style={{ flexGrow: 1 }}>
					<Editor draw={draw} />
				</Grid>
			</Grid >
		</div >

	);
}

export default App;
