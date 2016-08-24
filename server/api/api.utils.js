module.exports =  {
	regresarError: function (err, status, res) {
		console.log(err);
		res.status(status);
	}
};
