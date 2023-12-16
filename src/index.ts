import * as dotenv from 'dotenv';
import { app } from "./server";

dotenv.config();

const port = 4044;

app.listen(port, () => {
	console.log(`listening on http://localhost:${port}`);
});
