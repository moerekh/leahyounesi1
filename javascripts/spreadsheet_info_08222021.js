function spreadsheet_info() {
// ID of the Google Spreadsheet OLD WAY
const my_api_key = "AIzaSyA6PwTh_DNd5TJr7fYaqMIN-eS_kY13aLw";
const my_spreadsheet_id = "2PACX-1vSnk5a78099VKJ_aUbCI8WKSHh4SnH3qqK7fRboW5l7DQYUnQO5gEeRbexFt8pVVDiFbwl7eyGV5hh6";

// Make sure it is public or set to Anyone with link can view 
// const my_spreadsheet_url = "https://spreadsheets.google.com/feeds/list/" + my_spreadsheet_id + "/od6/public/values?alt=json";
const my_spreadsheet_url = `https://sheets.googleapis.com/v4/spreadsheets/${my_spreadsheet_id}/values/ProductionCoordinator?alt=json&key=${my_api_key}`;

    return my_spreadsheet_url;
};