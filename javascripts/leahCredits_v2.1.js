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

const my_headers = new Headers({
    "Content-Type": "application/json"
});

(() => {
    const sheet_url = spreadsheet_info();

    fetch(sheet_url, {
        method: 'GET',
        headers: my_headers
    })
    .then((result) => {
        return result.json();
    })
    .then((data) => {
        let job;
        let this_job;
        let tableID;
        let tableName;
        const table_section = document.getElementById('credits_tables');
        let my_jobs = [];

        function create_table_cell (el, content, current_row) {
            let tc = document.createElement(el);
            let c = document.createTextNode(content);
            tc.appendChild(c);
            current_row.appendChild(tc);
        }
        
        function create_jobs_table (jobs){
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

        // requested job title order
        let job_title_sort_order = [
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

        let titles = job_title_sort_order.map((t) => {
            return t.toLowerCase();
        });

        let job_entry = data.values.map((d) => {
            // Sort all objects into their own arrays.
            let myposition = d[0],
                myartist = d[1],
                myprojecttitle = d[2],
                myproducer = d[3],
                mydirector = d[4],
                myyear = d[5];

            job = new MyJob(
                myposition, 
                myartist, 
                myprojecttitle, 
                myproducer, 
                mydirector, 
                myyear
            );

           return job;
        })
        .filter(job => {
            if (Number(job.year) > 0) {
                return true;
            }
            return false;
        })
        .sort((je1, je2) => {
            return titles.indexOf(je1.my_title.toLowerCase()) - titles.indexOf(je2.my_title.toLowerCase()) || je2.year - je1.year
        });

        create_jobs_table(job_entry);
    })
    .catch((err) => {
        console.log(err);
    });
})();