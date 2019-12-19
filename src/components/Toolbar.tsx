import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { toggleDrawPolygonMode } from './EditorActions';
import { useDispatch } from 'react-redux';

const Toolbar: React.FC = () => {
	const dispatch = useDispatch();
	return (
		<div style={{ width: "160px", padding: "8px", backgroundColor: "grey" }}>
			<Grid item container direction="column" alignItems="stretch">
				<Button variant="contained" onClick={() => {
					dispatch(toggleDrawPolygonMode());
				}}>
					Polygon
				</Button>
			</Grid>
		</div>
	);
};
export default Toolbar;