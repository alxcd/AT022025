import dataJson from '../../data/dataseries.json';
import { Sensor, Chart } from '../types';

const getAll = async (): Promise<{ sensors: Sensor[]; charts: Chart[] }> => {
	const sensorsWithId = dataJson.map((sensor, index) => ({
		...sensor,
		id: `${index}-${sensor.name}`,
	}));
	return { sensors: sensorsWithId, charts: [] };
};

export default { getAll };
