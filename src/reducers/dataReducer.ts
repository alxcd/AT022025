import dataService from '../services/dataService';
import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { Sensor, Chart } from '../types';
import { createSelector } from 'reselect';

export interface DataState {
	sensors: Sensor[];
	charts: Chart[];
	selectedChartId: Chart['id'];
}

const initialState: DataState = {
	sensors: [],
	charts: [],
	selectedChartId: '',
};

const dataSlice = createSlice({
	name: 'data',
	initialState,
	reducers: {
		fetchData(_state, action: PayloadAction<DataState>) {
			return action.payload;
		},
		updateChartId(state, action: PayloadAction<string>) {
			state.selectedChartId = action.payload;
		},
		deleteChart(state, action: PayloadAction<string>) {
			state.charts = state.charts.filter((chart) => chart.id !== action.payload);
		},
		addChart(state, action: PayloadAction<Chart>) {
			action.payload.id = `${state.charts.length}-${action.payload.name}`;
			state.charts.push(action.payload);
		},
		updateChart(state, action: PayloadAction<Chart>) {
			console.log("payload", action.payload)
			const index = state.charts.findIndex((chart) => chart.id === action.payload.id);
			console.log(index);
			if (index !== -1) {
				state.charts[index] = action.payload;
			}
		},
	},
});

export const { fetchData, updateChartId, deleteChart, addChart, updateChart } =
	dataSlice.actions;

export const initializeData = () => {
	return async (dispatch: Dispatch) => {
		const { sensors, charts } = await dataService.getAll();
		const selectedChartId = charts[0]?.id;
		dispatch(fetchData({ sensors, charts, selectedChartId }));
	};
};

export const setSelectedChartId = (selectedChartId: Chart['id']) => {
	return async (dispatch: Dispatch) => {
		dispatch(updateChartId(selectedChartId));
	};
};

export const removeSensor = (id: Chart['id']) => {
	return async (dispatch: Dispatch) => {
		dispatch(deleteChart(id));
	};
};

export const createChart = (chart: Chart) => {
	return async (dispatch: Dispatch) => {
		dispatch(addChart(chart));
	};
};

export const editChart = (chart: Chart) => {
	return async (dispatch: Dispatch) => {
		// const updatedSensor = await dataService.update(sensor);
		dispatch(updateChart(chart));
	};
};

export const selectCharts = createSelector(
	(state: { data: DataState }) => state.data.charts,
	(charts) => charts.map(({ name, id }) => ({ name, id })),
);

export const selectSensors = createSelector(
	(state: { data: DataState }) => state.data.sensors,
	(sensors) => sensors.map(({ name, id }) => ({ name, id })),
);

export const selectDataSeriesById = (sensorId: string) =>
	createSelector(
		(state: { data: DataState }) => state.data.sensors,
		(sensors) => {
			const sensor = sensors.find(({ id }) => id === sensorId);
			return sensor ? sensor.dataseries : [];
		},
	);

export default dataSlice.reducer;
