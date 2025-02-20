import { Box, Typography, Button } from '@mui/material';
import HighchartsReact from 'highcharts-react-official';
import * as Highcharts from 'highcharts/highstock';
import 'highcharts/modules/accessibility';
import { useAppSelector } from '../hooks';
import { selectDataSeriesById } from '../reducers/dataReducer';

const SelectedChart = () => {
	// const theme = useTheme();
	// const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const chart = useAppSelector(({ data }) =>
		data.charts.find((chart) => chart.id === data.selectedChartId),
	);
	const dataseries = useAppSelector((state) =>
		chart ? selectDataSeriesById(chart.sensorId)(state) : [],
	);

	if (!chart) {
		return null;
	}

	console.log(chart);

	const mappedDataseries = dataseries.map((item) => [item.date, item.value]);
	console.log(mappedDataseries);

	const options = {
		title: { text: chart.name },
		xAxis: { type: 'datetime', title: { text: 'Date' } },
		yAxis: { title: { text: '°C' }, opposite: false },
		series: [
			{
				data: mappedDataseries,
				color: chart.color,
				type: chart.type,
			},
		],
		navigator: { enabled: false },
		scrollbar: { enabled: false },
		rangeSelector: { buttons: [] },
	};

	return (
		<Box sx={{ p: 3, textAlign: 'center' }}>
			{options ? (
				<HighchartsReact
					highcharts={Highcharts}
					options={options}
					constructorType={'stockChart'}
				/>
			) : (
				<Typography gutterBottom>No charts created yet.</Typography>
			)}
			<Button variant="contained" color="primary">
				+ ADD CHART
			</Button>
		</Box>
	);
};

export default SelectedChart;
