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

    // Fetch data when document is ready
    fetchData();
});
