/**
 * This function calls the backend api and returns a set response
 * 
 * @param currentBlocks 
 * @param currentClause 
 * @returns 
 */
const BASE_URL = "http://127.0.0.1:5000";
export async function fetchModel(currentBlocks, currentClause) {
    const BODY = new URLSearchParams({
        text: currentClause,
        lrml: currentBlocks,
    });

    // Development
    console.log(currentBlocks);
    console.log(currentClause);

    try {
        const response = await fetch(BASE_URL + '/predict', {
            method: "POST",
            body: BODY,
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (err) {
        console.error('Fetch error:', err);
        throw err;
    }
}