import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
	const navigate = useNavigate();
	return (
		<Box sx={{ textAlign: 'center', mt: 10 }}>
			<Box component="img" alt="Not Found" src="/404.png" />
			<Typography variant="h6" gutterBottom>
				Page not found. Please try again later.
			</Typography>
			<Button variant="contained" color="primary" onClick={() => navigate('/')}>
				Go Home
			</Button>
		</Box>
	);
};

export default NotFound;
