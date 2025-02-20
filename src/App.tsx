/**
 * TODO:
 * - Search
 * - Mobile?
 */

import { useEffect, useState } from 'react';
import { initializeData, selectCharts, setSelectedChartId } from './reducers/dataReducer';
import { useAppDispatch, useAppSelector } from './hooks';
import { Route, Routes, useMatch } from 'react-router-dom';
import NotFoundPage from './components/NotFoundPage';
import { Container, Box, CircularProgress } from '@mui/material';
import SelectedChart from './components/SelectedChart';
import ChartList from './components/ChartList';
import Header from './components/Header';

const App = () => {
	const dispatch = useAppDispatch();
	const [loading, setLoading] = useState(true);

	const charts = useAppSelector(selectCharts);
	const matchChart = useMatch('/:id');
	const selectedChartId = matchChart?.params.id;
	console.log('selected', selectedChartId);

	useEffect(() => {
		const fetchData = async () => {
			await dispatch(initializeData());
			setLoading(false);
			console.log('refetch happened');
		};
		fetchData();
	}, [dispatch]);

	useEffect(() => {
		if (selectedChartId && charts.length > 0) {
			const chartExists = charts.some((chart) => chart.id === selectedChartId);
			console.log('chartExists?', chartExists);
			if (chartExists) {
				dispatch(setSelectedChartId(selectedChartId));
			}
		}
	}, [selectedChartId, charts, dispatch]);

	if (loading) {
		return (
			<Box>
				<CircularProgress />
			</Box>
		);
	}

	return (
		<Container>
			<Box sx={{ display: 'flex', height: '100vh' }}>
				<Box sx={{ width: '250px', backgroundColor: 'lightgray' }}>
					<Header />
					<ChartList />
				</Box>
				<Box sx={{ flexGrow: 1, backgroundColor: '#fafafa', padding: '10px' }}>
					<Box sx={{ flexGrow: 1, borderRadius: '8px', border: '2px' }}>
						<Routes>
							<Route path="/" element={<SelectedChart />} />
							<Route
								path="/:id"
								element={
									charts.some((chart) => chart.id === selectedChartId) ? (
										<SelectedChart />
									) : (
										<NotFoundPage />
									)
								}
							/>
							<Route path="*" element={<NotFoundPage />} />
						</Routes>
					</Box>
				</Box>
			</Box>
		</Container>
	);
};

export default App;
