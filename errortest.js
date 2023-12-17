setTimeout(() => {
	throw new Error('an error');
}, 300);

process.on('uncaughtException', () => {
	console.log('error 001');
})