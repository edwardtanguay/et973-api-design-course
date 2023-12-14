import http from 'http';

const port = 3002;

const server = http.createServer((req, res) => {
	if (req.method === 'GET' && req.url === '/') {
		res.statusCode = 200;
		res.end();
	}
});

server.listen(port, () => {
	console.log(`server listening on http://localhost:${port}`);
});