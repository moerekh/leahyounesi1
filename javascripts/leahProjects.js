(
	fetch(my_spreadsheet_url)
	.then(response => {
		return response.json()
	})
	.then(
		(json) => {
			let featuredvids = [];
			let entry = json.feed.entry;
			const projects_div = document.getElementById("projectContent");

			// Sort all objects into their own arrays based on myPosition.
			for ( let item in entry ) {
				if (entry[item].gsx$featuredhome.$t != 0) {
					featuredvids.push(entry[item]);
				}
			}
			//order of projects to display
			featuredvids.sort(function (a, b) {
				return a.gsx$featuredhome.$t - b.gsx$featuredhome.$t;
			});

			//post movies
			for ( let vid in featuredvids ) {
				let newvidurl = featuredvids[vid].gsx$vidlink.$t;
				let newimgref = 'https://www.leahyounesi.com/images/' + featuredvids[vid].gsx$picthumbnail.$t;

				let newvidcontainer = projects_div.appendChild(document.createElement("div"));
				newvidcontainer.setAttribute('class', 'four column video');

				let newanchor = newvidcontainer.appendChild(document.createElement("a"));
				newanchor.href = newvidurl;
				newanchor.setAttribute('rel', "shadowbox;width=800;height=450");

				let newframe = newanchor.appendChild(document.createElement('div'));

				let newimgelem = newframe.appendChild(document.createElement("img"));
				newimgelem.src = newimgref;
				newimgelem.setAttribute('alt', featuredvids[vid].gsx$artist.$t + featuredvids[vid].gsx$projecttitle.$t);

				let newp1 = newvidcontainer.appendChild(document.createElement("p"));
				newp1.textContent = featuredvids[vid].gsx$artist.$t + " -";
				let newp2 = newvidcontainer.appendChild(document.createElement("p"));
				newp2.textContent = featuredvids[vid].gsx$projecttitle.$t;
				/** .append('<div class="four column video"><a href="' + featuredvids[vid].gsx$vidlink.$t + '" rel="shadowbox;width=800;height=450"><div><img src="https://www.leahyounesi.com/images/' + featuredvids[vid].gsx$picthumbnail.$t + '" alt="' + featuredvids[vid].gsx$artist.$t + featuredvids[vid].gsx$projecttitle.$t + '" /></div></a><p><a href="' + featuredvids[vid].gsx$vidlink.$t + '" rel="shadowbox;width=800;height=450">' + featuredvids[vid].gsx$artist.$t + ' -<br />"' + featuredvids[vid].gsx$projecttitle.$t + '"</a></p></div>');
				 */
			}
		}
	)
	.catch((err) => {console.log(err)})
)