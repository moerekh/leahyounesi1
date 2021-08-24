(() => {
	const my_headers = new Headers({
		"Content-Type": "application/json"
	});
	const sheet_url = spreadsheet_info();

    fetch(sheet_url, {
        method: 'GET',
		mode: 'cors',
        headers: my_headers
    })
    .then((response) => {
        return response.json();
    })
	.then((data) => {
		const projects_div = document.getElementById("projectContent");
		let featuredvids = data.values.filter((d) => {
			if (Number(d[9]) > 0 && Number(d[9]) < 7) {
				return true;
			}
			return false;
		})
		.sort((d1 , d2) => {
			return d1[9] - d2[9];
		})
		.map((vid) => {
			let newvidurl = vid[6];
			let newimgref = 'https://www.leahyounesi.com/images/' + vid[7];

			let newvidcontainer = projects_div.appendChild(document.createElement("div"));
			newvidcontainer.setAttribute('class', 'four column video');

			let newanchor = newvidcontainer.appendChild(document.createElement("a"));
			newanchor.href = newvidurl;
			newanchor.setAttribute('rel', "shadowbox;width=800;height=450");

			let newframe = newanchor.appendChild(document.createElement('div'));

			let newimgelem = newframe.appendChild(document.createElement("img"));
			newimgelem.src = newimgref;
			newimgelem.setAttribute('alt', vid[1] + vid[2]);

			let panchor = newvidcontainer.appendChild(document.createElement("a"));
			panchor.href = newvidurl;

			let newp1 = panchor.appendChild(document.createElement("p"));
			newp1.textContent = vid[1] + " -";
			let newp2 = panchor.appendChild(document.createElement("p"));
			newp2.textContent = '"' + vid[2] + '"';
		});
		
	})
	.catch((err) => {console.log(err)})
})();