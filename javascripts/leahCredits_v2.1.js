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

(() => {
    const my_headers = new Headers({
        "Content-Type": "text/plain"
    });
    const sheet_url = "https://leah-credits-api-ihj4a.ondigitalocean.app/api/credits";

    function create_table_cell (el, content, current_row) {
        let tc = document.createElement(el);
        let c = document.createTextNode(content);
        tc.appendChild(c);
        current_row.appendChild(tc);
    }

    function create_job_table(newTableId, jobTitle){
        const table_section = document.getElementById('credits_tables');
        const table_block = document.createElement('div');
        const currentTable = document.createElement('table');
        const thead = currentTable.createTHead();
        const row = thead.insertRow();
        const thead_names = [jobTitle, "Production Company", "Director", "Year"];
        
        table_block.setAttribute('class', 'row');
        currentTable.setAttribute('id', newTableId);

        thead_names.map((h_name) => create_table_cell('th', h_name, row));

        thead.appendChild(row);
        table_block.appendChild(currentTable);
        table_section.appendChild(table_block);
    }

    fetch(sheet_url, {
        method: 'GET',
        mode: 'cors',
        headers: my_headers    
    })
    .then(response => response.json())
    .then((data) => {
        data.values.map((d) => new MyJob(d[0], d[1], d[2], d[3], d[4], d[5]))
        .filter(j => {
            if (Number(j.year) > 0) {
                return true;
            }
            return false;
        })
        .sort((j1, j2) => {
            // requested job title order
            const titles = [
                "CONTENT MANAGER/PRODUCER",
                "EXECUTIVE PRODUCER",
                "PRODUCER",
                "DIRECTOR'S REP",
                "PRODUCTION SUPERVISOR",
                "PRODUCTION MANAGER",
                "PRODUCTION COORDINATOR",
                "ASSISTANT TO PRODUCER",
                "ASSISTANT TO DIRECTOR"
            ]
            .map((t) => t.toLowerCase());

            return titles.indexOf(j1.my_title.toLowerCase()) - titles.indexOf(j2.my_title.toLowerCase()) || j2.year - j1.year
        }).map((j) => {
            const row_entry = [`${j.artist} - "${j.project_title}"`, j.producer, j.director, j.year];
            const tableName = j.my_title.toLowerCase();
            const tableID = tableName.replace(/\W/g, '');
    
            if(!document.getElementById(tableID)) {
                create_job_table(tableID, j.my_title);
            }
    
            const currentTable = document.getElementById(tableID);
            const row = currentTable.insertRow();
    
            row_entry.map((entry) => create_table_cell('td', entry, row));
    
            currentTable.appendChild(row);
        });
    })
    .catch((err) => {
        console.log(err);
    });
})();