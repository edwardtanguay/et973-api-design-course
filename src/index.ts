import { app } from './server';

const port = 4044;

app.listen(port, () => {
	console.log(`listening on http://localhost:${port}`);
}); 