class MyJob {
    constructor(my_title, artist, project_title, producer, director, year){
        this.my_title = my_title,
        this.artist = artist,
        this.project_title = project_title,
        this.producer = producer,
        this.director = director,
        this.year = year
    }
}

$(function(){
    let job;
        let this_job;
        let tableID;
        let tableName;
        let table_section = document.getElementById('credits_tables');
        let my_jobs = [];

        const create_table_cell = (el, content, current_row) => {
            let tc = document.createElement(el);
            let c = document.createTextNode(content);
            tc.appendChild(c);
            current_row.appendChild(tc);
        }

    const create_jobs_table = (jobs) => {
        jobs.map((job) => {
            let this_table;
            let thead;
            let row;
            let project_name;

            tableName = job.my_title.toLowerCase();
            tableID = tableName.replace(/\W/g, '');

            if(!document.getElementById(tableID)) {
                table_block = document.createElement('div');
                table_block.setAttribute('class', 'row');

                this_table = document.createElement('table');
                thead = this_table.createTHead();
                row = thead.insertRow();

                this_table.setAttribute('id', tableID);

                create_table_cell('th', job.my_title, row);
                create_table_cell('th', "Production Company", row);
                create_table_cell('th', "Director", row);
                create_table_cell('th', "Year", row);

                thead.appendChild(row);
                table_block.appendChild(this_table);
                table_section.appendChild(table_block);
            }

            this_table = document.getElementById(tableID);
            row = this_table.insertRow();

            project_name = job.artist + ' - ' + '"' + job.project_title + '"';

            create_table_cell('td', project_name, row);
            create_table_cell('td', job.producer, row);
            create_table_cell('td', job.director, row);
            create_table_cell('td', job.year, row);

            this_table.appendChild(row);
        });
    };

    const ly_sort_credits = () => {

        
        
        $.getJSON(my_spreadsheet_url, function(data) {
            let entry = data.feed.entry;

            // Sort all objects into their own arrays.
            for (let item in entry ) {
                if (entry[item].gsx$credits.$t) {
                    this_job = entry[item];

                    try {
                        job = new MyJob(this_job.gsx$myposition.$t, 
                                        this_job.gsx$artist.$t, 
                                        this_job.gsx$projecttitle.$t, 
                                        this_job.gsx$producer.$t, 
                                        this_job.gsx$director.$t, 
                                        this_job.gsx$year.$t
                        );
                        my_jobs.push(job);
                    } catch (e) {
                        console.log(e.message);
                    }
                }
            }

            // sort jobs by year
            my_jobs.sort(function(a, b) {
                return b.year - a.year;
            });

            // requested job title order
            let job_sort_order = [
                "EXECUTIVE PRODUCER",
                "PRODUCER",
                "DIRECTOR'S REP",
                "PRODUCTION SUPERVISOR",
                "PRODUCTION MANAGER",
                "PRODUCTION COORDINATOR",
                "ASSISTANT TO PRODUCER",
                "ASSISTANT TO DIRECTOR",
                "CONTENT MANAGER"
            ];

            
            // create tables based on job title order
            job_sort_order.forEach(jt => {
                let sorted = my_jobs.filter(job => {
                    if (job.my_title.toLowerCase() === jt.toLocaleLowerCase()) {
                        return job;
                    }
                });

                create_jobs_table(sorted);
            });            
        });
        
    }
    ly_sort_credits();
});