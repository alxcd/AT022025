import { ListItemButton, ListItemText, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppSelector, useAppDispatch } from '../hooks';
import { MouseEvent, useState } from 'react';
import { deleteChart, setSelectedChartId, selectCharts } from '../reducers/dataReducer';

interface Props {
	id: string;
	primaryText: string;
	openModal: (id: string) => void;
}

const ChartListItem = ({ id, primaryText, openModal }: Props) => {
	const dispatch = useAppDispatch();
	const selectedSensorId = useAppSelector(({ data }) => data.selectedChartId);
	const sensors = useAppSelector(selectCharts);

	const handleListItemClick = (_event: MouseEvent<HTMLDivElement>, index: string) => {
		dispatch(setSelectedChartId(index));
	};

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const handleMenuClick = (event: MouseEvent<HTMLElement>) => {
		event.stopPropagation();
		setAnchorEl(event.currentTarget);
	};
	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleEdit = () => {
		console.log(`Edit chart with id: ${id}`);
		openModal(id);
		handleMenuClose();
	};

	const handleDelete = () => {
		console.log(`Delete chart with id: ${id}`);
		dispatch(deleteChart(id));
		if (selectedSensorId === id) {
			const newSelectedId = sensors[0].id === id ? sensors[1].id : sensors[0].id;
			dispatch(setSelectedChartId(newSelectedId));
		}
		handleMenuClose();
	};

	return (
		<>
			<ListItemButton
				selected={selectedSensorId === id}
				onClick={(event) => handleListItemClick(event, id)}>
				<ListItemText primary={primaryText} />
				<IconButton
					aria-label="more"
					aria-controls="long-menu"
					aria-haspopup="true"
					onClick={handleMenuClick}
					className={anchorEl ? 'active' : ''}>
					<MoreVertIcon />
				</IconButton>
			</ListItemButton>
			<Menu
				id="long-menu"
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleMenuClose}>
				<MenuItem onClick={handleEdit}>
					<EditIcon />
					Edit
				</MenuItem>
				<MenuItem onClick={handleDelete}>
					<DeleteIcon />
					Delete
				</MenuItem>
			</Menu>
		</>
	);
};

export default ChartListItem;
