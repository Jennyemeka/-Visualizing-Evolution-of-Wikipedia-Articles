$(document).ready(function () {
    // Initialize DataTable
    const table = $('#example').DataTable({
        paging: true,
        searching: true,
        columns: [
            { title: 'Page ID' },
            { title: 'revision_id' },
            { title: 'revision_timestamp' },
            { title: 'page_length' },
            { title: 'num_refs' },
            { title: 'num_wikilinks' },
            { title: 'num_categories' },
            { title: 'num_media' },
            { title: 'num_headings' },
            { title: 'item_id' },
            { title: 'pred_qual' },
            { title: 'page_title' },
            { title: 'quality_class' },
            { title: 'importance_class' }
        ]
    });

    const fetchData = async () => {
        try {
            // Fetch data from data.json file
            const response = await fetch('data.json');
            const data = await response.json();

            // Iterate over each object in data array
            for (let i = 0; i < 400; i++) {
                const rowData = data[i];
                // Map object properties to DataTable columns and add row
                table.row.add([
                    rowData.page_id,
                    rowData.revision_id,
                    rowData.revision_timestamp,
                    rowData.page_length,
                    rowData.num_refs,
                    rowData.num_wikilinks,
                    rowData.num_categories,
                    rowData.num_media,
                    rowData.num_headings,
                    rowData.item_id,
                    rowData.pred_qual,
                    rowData.page_title,
                    rowData.quality_class,
                    rowData.importance_class
                ]).draw();
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
});


$(document).ready(function () {
    // Function to fetch data from JSON and create pie chart
    const fetchDataAndCreatePieChart = async () => {
        try {
            const response = await fetch('data.json'); // Assuming you have a JSON file named data.json
            const data = await response.json();

            // Extracting required data for the pie chart
            const pageLengthData = data.map(row => row.page_length).slice(0, 20);
            const dates = data.map(row => new Date( row.revision_timestamp));

            const formattedDates = dates.map(date => {
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                return date.toLocaleDateString('en-US', options);
            });

            new Chart('pageviewsPieChart', {
                type: 'line',
                data: {
                    labels:[
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December",
                      ],
                    datasets: [{
                        labels:"pageLengthData",
                        data: pageLengthData,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.5)', 
                            'rgba(54, 162, 235, 0.5)', 
                            'rgba(255, 206, 86, 0.5)',
                            'rgba(75, 192, 192, 0.5)',
                            'rgba(153, 102, 255, 0.5)', 
                            'rgba(255, 159, 64, 0.5)' 
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        x: {
                          type: 'category',
                          title: {
                            display: true,
                            text: 'Month'
                          }
                        },
                        y: {
                          title: {
                            display: true,
                            text: 'Page Length'
                          }
                        }
                      }
                    }
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchDataAndCreatePieChart();
});




