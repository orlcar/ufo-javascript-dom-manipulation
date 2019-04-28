// Set variable for data array in data.js
var tableData = data;

// ## Append UFO table to the web page and then add new rows ##
// ## of data for each UFO sighting based on tableData array ##

// Set variable for selecting tbody
var tbody = d3.select("tbody");

// Function to create table
function createTable(data) {

	data.forEach((rowData) => {
		var row = tbody.append("tr");
		Object.entries(rowData).forEach(([key, value]) => {
			var cell = row.append("td");
			cell.text(value);
		});
	});

}

// Create table based on UFO data
createTable(tableData);

// ## Create one or more filters and search through at least one of the ##
// ## searchable columns to find rows that match the user's search criteria ##

// Set up searchable categories
var categories = ["datetime", "city", "state", "country", "shape"];

// Set variable to select filter button
var submit = d3.select("#filter-btn");

// ## Change table based on filled input fields when filter button is clicked ##
submit.on("click", function() {

	// Prevent the webpage from refreshing
	d3.event.preventDefault();

	// Set up dictionary to hold user filters
	var userFilters = {};

	// Get user input for input fields
	for (var i = 0; i < categories.length; i++) {

		var category = categories[i];
		var newText = d3.select("#" + category).property("value");

		// Add input field value to userFilters dictionary if input field is not empty
		if (newText != "") {
			userFilters[category] = newText;
		}
	}

	// Set up filter search
	var filteredArray = tableData.filter(filterData, userFilters);

	// Function to get filtered data by getting array of keys for userFilters,
	// and using keys to compare every userFilters value with tableData values
	function filterData(tableData) {
		return Object.keys(userFilters).every((key) => tableData[key] === userFilters[key]);
	}

	// Remove all rows in table body
	var selectRows = d3.select("tbody").selectAll("tr");
	selectRows.remove();

	// Recreate table with rows based on filtered data array	
	createTable(filteredArray);

});