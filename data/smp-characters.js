 const fetchJson = () => {

 	const myHeaders = new Headers({
 		"Content-Type": "application/json",
 		Accept: "application/json"
 	});

 	fetch("http://localhost:3000", {
 			headers: myHeaders,

 		})
 		.then(response => {
 			console.log(response);
 			return response.json();
 		})
 		.then(data => {
 			console.log(data);
 			// this.setState({ data });
 		});
 };