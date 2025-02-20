export interface DataPoint {
	value: number;
	date: string;
}

export interface Sensor {
	name: string;
	dataseries: DataPoint[];
	id: string;
}

export interface Chart {
	id: string;
	name: string;
	type: string;
	color: string;
	dataseries: string;
	xAxisName?: string;
	yAxisName?: string;
	description?: string;
	sensorId: Sensor['id'];
}
