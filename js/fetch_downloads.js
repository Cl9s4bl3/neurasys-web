const today = new Date();
today_day = today.getDate();
today_month = today.getMonth()+1;
today_year = today.getFullYear();
today_date = `${today_year}-${today_month}-${today_day}`;

document.addEventListener('DOMContentLoaded', function() {
    const projectName = 'neurasys';
    const startDate = '2024-08-31';
    const endDate = `${today_date}`;
    const url = `https://sourceforge.net/projects/${projectName}/files/stats/json?start_date=${startDate}&end_date=${endDate}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const downloads = data.downloads;
            
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(today.getDate() - 7);

            let totalDownloadsThisWeek = 0;

            downloads.forEach(download => {
                const downloadDate = new Date(download[0]);
                if (downloadDate >= oneWeekAgo && downloadDate <= today) {
                    totalDownloadsThisWeek += download[1];
                }
            });

            const statsDiv = document.getElementById('stats');
            statsDiv.innerHTML = `<h3 align="center" class="mt-5">Total downloads this week: ${totalDownloadsThisWeek}</p>`;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});

