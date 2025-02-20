import { Dialog, DialogTitle, DialogContent, Divider, Typography } from '@mui/material';
import ChartForm from './ChartForm';
import { useAppSelector } from '../../hooks';

interface Props {
	id?: string;
	modalOpen: boolean;
	onClose: () => void;
}

const ChartModal = ({ id, modalOpen, onClose }: Props) => {
	const chart = useAppSelector(({ data }) =>
		data.charts.find((chart) => chart.id === id),
	);

	return (
		<Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
			<DialogTitle>
				<Typography>{id ? 'Edit Chart' : 'Add Chart'}</Typography>
			</DialogTitle>
			<Divider />
			<DialogContent>
				<ChartForm chart={chart} onCancel={onClose} />
			</DialogContent>
		</Dialog>
	);
};

export default ChartModal;
