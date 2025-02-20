import { Box, List, Button, Typography } from '@mui/material';
import { useAppSelector } from '../hooks';
import ChartListItem from './ChartListItem';
import { selectCharts } from '../reducers/dataReducer';
import { useState } from 'react';
import ChartModal from './ChartModal';

const ChartList = () => {
	const sensors = useAppSelector(selectCharts);
	console.log('chartlist sensors', sensors);

	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [id, setId] = useState('');

	const openModal = (id?: string): void => {
		if (id) {
			setId(id);
		}
		console.log(id);
		setModalOpen(true);
	};
	const closeModal = (): void => {
		setModalOpen(false);
		setId('');
	};

	return (
		<Box
			sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', height: '100%' }}>
			<Box display="flex" justifyContent="center" mb={2} sx={{ width: '100%' }}>
				<ChartModal modalOpen={modalOpen} onClose={closeModal} id={id} />
				<Button
					variant="contained"
					color="primary"
					sx={{ width: '100%' }}
					onClick={() => openModal()}>
					<Typography>+ ADD CHART</Typography>
				</Button>
			</Box>
			<List component="nav">
				{sensors.map((sensor) => (
					<ChartListItem
						key={sensor.id}
						id={sensor.id}
						primaryText={sensor.name}
						openModal={openModal}
					/>
				))}
			</List>
		</Box>
	);
};

export default ChartList;
