$(function(){

	$.getJSON(my_spreadsheet_url, function(data) {
		//declare variables
		var featuredvids = [];
		var entry = data.feed.entry;

		// Sort all objects into their own arrays based on myPosition.
		for ( var item in entry ) {
			if (entry[item].gsx$featuredhome.$t != 0) {
				featuredvids.push(entry[item]);
			}
		}
		//order of projects to display
		featuredvids.sort(function (a, b) {
			return a.gsx$featuredhome.$t - b.gsx$featuredhome.$t;
		});

		//post movies
		for ( var vid in featuredvids ) {
			$('#projectContent').append('<div class="four column video"><a href="' + featuredvids[vid].gsx$vidlink.$t + '" rel="shadowbox;width=800;height=450"><div><img src="https://www.leahyounesi.com/images/' + featuredvids[vid].gsx$picthumbnail.$t + '" alt="' + featuredvids[vid].gsx$artist.$t + featuredvids[vid].gsx$projecttitle.$t + '" /></div></a><p><a href="' + featuredvids[vid].gsx$vidlink.$t + '" rel="shadowbox;width=800;height=450">' + featuredvids[vid].gsx$artist.$t + ' -<br />"' + featuredvids[vid].gsx$projecttitle.$t + '"</a></p></div>');
		}
	});
});
