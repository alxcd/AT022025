import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { Chart } from '../../types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { createChart, editChart, selectSensors } from '../../reducers/dataReducer';
import {
	Box,
	TextField,
	Grid2,
	Button,
	Typography,
	FormControl,
	InputLabel,
} from '@mui/material';
import { MenuItem, Select } from '@mui/material';
interface Props {
	chart?: Chart;
	onCancel: () => void;
}

const chartTypes = [
	'line',
	'spline',
	'area',
	'areaspline',
	'column',
	'bar',
	'pie',
	'scatter',
	'gauge',
	'arearange',
	'areasplinerange',
	'columnrange',
];
const colors = ['red', 'blue', 'green', 'yellow', 'purple'];

const ChartForm = ({ chart, onCancel }: Props) => {
	const { control, handleSubmit, reset } = useForm<Chart>({
		defaultValues: {
			name: chart?.name || '',
			type: chart?.type || chartTypes[0],
			color: chart?.color || colors[0],
			sensorId: chart?.sensorId || '',
			xAxisName: chart?.xAxisName || '',
			yAxisName: chart?.yAxisName || '',
			description: chart?.description || '',
		},
	});
	const dispatch = useAppDispatch();

	const sensors = useAppSelector(selectSensors);
	const sensorOptions = sensors.map((sensor) => ({
		label: sensor.name,
		value: sensor.id,
	}));

	const onSubmit: SubmitHandler<Chart> = async (data) => {
		try {
			console.log('onSubmit data', data);
			if (chart) {
				await dispatch(editChart({ ...data, id: chart.id }));
			} else {
				await dispatch(createChart(data));
			}
			reset();
			onCancel();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
			<Controller
				name="name"
				control={control}
				rules={{ required: true }}
				render={({ field }) => <TextField {...field} label="Name" fullWidth />}
			/>
			<FormControl fullWidth>
				<InputLabel id="type-select-label">Type</InputLabel>
				<Controller
					name="type"
					control={control}
					rules={{ required: true }}
					render={({ field }) => (
						<Select {...field} labelId="type-select-label" id="type-select" label="Type">
							{chartTypes.map((type) => (
								<MenuItem key={type} value={type}>
									{type.charAt(0).toUpperCase() + type.slice(1)}
								</MenuItem>
							))}
						</Select>
					)}
				/>
			</FormControl>
			<FormControl fullWidth>
				<InputLabel id="color-select-label">Color</InputLabel>
				<Controller
					name="color"
					control={control}
					rules={{ required: true }}
					render={({ field }) => (
						<Select
							{...field}
							labelId="color-select-label"
							id="color-select"
							label="Color">
							{colors.map((color) => (
								<MenuItem key={color} value={color}>
									{color.charAt(0).toUpperCase() + color.slice(1)}
								</MenuItem>
							))}
						</Select>
					)}
				/>
			</FormControl>
			<FormControl fullWidth>
				<InputLabel id="dataseries-select-label">Dataseries</InputLabel>
				<Controller
					name="sensorId"
					control={control}
					rules={{ required: true }}
					render={({ field }) => (
						<Select
							{...field}
							labelId="dataseries-select-label"
							id="dataseries-select"
							label="Dataseries">
							{sensorOptions.map((option) => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</Select>
					)}
				/>
			</FormControl>
			<Controller
				name="xAxisName"
				control={control}
				render={({ field }) => <TextField {...field} label="X Axis Name" fullWidth />}
			/>
			<Controller
				name="yAxisName"
				control={control}
				render={({ field }) => <TextField {...field} label="Y Axis Name" fullWidth />}
			/>
			<Controller
				name="description"
				control={control}
				render={({ field }) => <TextField {...field} label="Description" fullWidth />}
			/>
			<Grid2>
				<Grid2>
					<Button
						style={{
							float: 'right',
						}}
						type="submit"
						variant="text">
						<Typography>{chart ? 'SAVE CHART' : 'CREATE CHART'}</Typography>
					</Button>
				</Grid2>
				<Grid2>
					<Button
						color="primary"
						variant="text"
						style={{ float: 'right' }}
						type="button"
						onClick={onCancel}>
						<Typography>CANCEL</Typography>
					</Button>
				</Grid2>
			</Grid2>
		</Box>
	);
};

export default ChartForm;
