// Create a helper function for rendering the last updated object field in a human readable format
/**
 * Converts a date string to a human-readable "time ago" format.
 * @param {string} lastedUpdatedDate - The ISO date string.
 * @returns {string} A human-readable time difference like "3 days ago".
 */
export function lastUpdated (lastedUpdatedDate) {
    // Modify the data data to be human readable in a last update x days ago format
    // Get the current date object
    const currentDate = new Date();
    // Convert the ISO date from the podcast array and convert it back to a date object
    const updatedDate = new Date(lastedUpdatedDate);
    // Subtract the date object millisecond times to find the difference
    const dateDiffMil = currentDate - updatedDate;
    // Convert the difference in milliseconds to min/hours/days/months/years.
    const diffSec = Math.floor(dateDiffMil / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);
    // Return the difference and the x time ago string for each time period
    // Refine this
    if (diffSec < 60) return 'Just Now';
    if (diffMin < 60) return `${diffMin} minute/s ago`;
    if (diffHours < 24) return `${diffHours} hour/s ago`;
    if (diffDays < 30) return `${diffDays} day/s ago`;
    if (diffMonths < 12) return `${diffMonths} month/s ago`;
    return `${diffYears} year/s ago`;
};

export function updatedDate (dateString) {
    const isoString = dateString;
    const date = new Date(isoString);

    const formatted = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });
    return formatted;
};

