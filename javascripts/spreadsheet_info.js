function spreadsheet_info() {
    const my_api_key = "AIzaSyA6PwTh_DNd5TJr7fYaqMIN-eS_kY13aLw";
    const my_spreadsheet_id = "1h_knrClp8EsDQfNJvjwzaWcvJNnzCYd7gr8UJ-Bd9Cs";

    // Make sure it is public or set to Anyone with link can view 
    const my_spreadsheet_url = `https://sheets.googleapis.com/v4/spreadsheets.readonly/${my_spreadsheet_id}/values/ProductionCoordinator?alt=json&key=${my_api_key}`;

    return my_spreadsheet_url;
};