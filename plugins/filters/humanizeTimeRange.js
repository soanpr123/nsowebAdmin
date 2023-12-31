export default function humanizeTimeRange(seconds) {
    seconds = parseInt(seconds, 10);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds - (hours * 3600)) / 60);
    seconds = seconds - (hours * 3600) - (minutes * 60);
    if (hours) {
        if (minutes) {
            return `${hours}h ${minutes}m ${seconds}s`;
        }
        return `${hours}h ${seconds}s`;
    }
    if (minutes) {
        return `${minutes}m ${seconds}s`;
    }
    return `${seconds}s`;
}
