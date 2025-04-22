$(document).ready(function() {
    // Function to add a bug
    $('#bug-form').on('submit', function(e) {
        e.preventDefault();

        const bugName = $('#bug-name').val();
        const bugDescription = $('#bug-description').val();
        const bugCategory = $('#bug-category').val();

        if (bugName && bugDescription) {
            const bugItem = `
                <li class="list-group-item bug-item">
                    <div>
                        <strong>${bugName}</strong><br>
                        <small>${bugDescription}</small><br>
                        <span class="badge bg-secondary">${bugCategory}</span>
                    </div>
                    <div>
                        <button class="status-btn open">Open</button>
                        <button class="delete-btn">Delete</button>
                    </div>
                </li>`;

            $('#bug-list').append(bugItem);

            // Clear the form
            $('#bug-name').val('');
            $('#bug-description').val('');
        }
    });

    // Toggle status (Open/Closed)
    $('#bug-list').on('click', '.status-btn', function() {
        if ($(this).hasClass('open')) {
            $(this).removeClass('open').addClass('closed').text('Closed');
        } else {
            $(this).removeClass('closed').addClass('open').text('Open');
        }
    });

    // Delete a bug
    $('#bug-list').on('click', '.delete-btn', function() {
        $(this).closest('.bug-item').remove();
    });

    // Filter bugs by category or status
    $('#filter-category, #filter-status').on('change', function() {
        const categoryFilter = $('#filter-category').val();
        const statusFilter = $('#filter-status').val();

        $('#bug-list .bug-item').each(function() {
            const bugCategory = $(this).find('.badge').text();
            const bugStatus = $(this).find('.status-btn').text();

            if ((categoryFilter === 'All' || categoryFilter === bugCategory) &&
                (statusFilter === 'All' || statusFilter === bugStatus)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
});
