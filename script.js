document.addEventListener('DOMContentLoaded', () => {
    const jobsContainer = document.getElementById('jobs-container');
    const searchInput = document.getElementById('job-search');
    const locationInput = document.getElementById('location-search');
    const searchBtn = document.getElementById('search-btn');

    // Function to render job cards
    function renderJobs(jobsToRender) {
        jobsContainer.innerHTML = ''; // Clear container

        if (jobsToRender.length === 0) {
            jobsContainer.innerHTML = `
                <div style="text-align: center; padding: 40px; color: var(--text-muted);">
                    <i class="ph ph-magnifying-glass" style="font-size: 48px; margin-bottom: 16px;"></i>
                    <p>No jobs found matching your criteria.</p>
                </div>
            `;
            return;
        }

        jobsToRender.forEach(job => {
            const isRemote = job.remote ? '<span class="tag remote">Remote</span>' : '';

            const card = document.createElement('div');
            card.className = 'job-card';
            card.innerHTML = `
                <div class="company-logo" style="background: ${job.bgStyle};">
                    <img src="${job.logo}" alt="${job.company} logo">
                </div>
                <div class="job-content">
                    <div class="job-header">
                        <div>
                            <h3 class="job-title">${job.title}</h3>
                            <div class="company-info">
                                <span>${job.company}</span>
                                <span class="dot"></span>
                                <span>${job.location}</span>
                            </div>
                        </div>
                        <button class="save-btn" title="Save Job">
                            <i class="ph ph-bookmark-simple"></i>
                        </button>
                    </div>
                    <div class="job-tags">
                        ${isRemote}
                        <span class="tag type">${job.type}</span>
                        <span class="tag level">${job.level}</span>
                    </div>
                </div>
                <div class="job-actions">
                    <div class="salary">${job.salary}</div>
                    <button class="btn-primary apply-btn">Apply Now</button>
                    <div class="posted-time">${job.posted}</div>
                </div>
            `;
            jobsContainer.appendChild(card);
        });

        // Update count
        document.getElementById('job-count-display').textContent = `Showing ${jobsToRender.length} jobs`;
    }

    // Initial render
    renderJobs(jobListings);

    // Simple Search Functionality
    function performSearch() {
        const titleQuery = searchInput.value.toLowerCase();
        const locationQuery = locationInput.value.toLowerCase();

        const filteredJobs = jobListings.filter(job => {
            const matchesTitle = job.title.toLowerCase().includes(titleQuery) ||
                job.company.toLowerCase().includes(titleQuery);
            const matchesLocation = job.location.toLowerCase().includes(locationQuery) ||
                (job.remote && 'remote'.includes(locationQuery));
            return matchesTitle && matchesLocation;
        });

        renderJobs(filteredJobs);
    }

    searchBtn.addEventListener('click', performSearch);

    // Allow searching on Enter key
    [searchInput, locationInput].forEach(input => {
        input.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    });

    // Pill Toggle Logic
    const pills = document.querySelectorAll('.pill');
    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            pill.classList.toggle('active');
        });
    });
});
