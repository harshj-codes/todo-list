//Update progress
function updateProgress() {

    const progressBarFill = document.getElementById('progressBarFill');
    const progressCount = document.getElementById('progressCount');

    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;

    const percentage = total === 0 ? 0 : Math.round((completed/total) * 100);

    progressBarFill.style.width = percentage + '%';

    progressCount.textContent = `${completed} of ${total} done`;

    const progressBarTrack = document.getElementById('progressBarTrack');
    progressBarTrack.setAttribute('aria-valuenow', percentage);
}