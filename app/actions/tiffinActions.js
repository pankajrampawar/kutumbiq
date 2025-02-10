
export async function getMenuItemsFromServer() { // function to get menu items from the server
    try {

        const response = await fetch("/api/tiffin/getAllVendors", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData);
            throw new Error(errorData || "Unable to fetch the menu items");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching menu items:", error);
    }
}


export const getCurrentTimeStatus = (filter) => {
    const now = new Date();
    const currentHour = now.getHours();

    if (filter === "7PM") {
        // Allow clicks only between 5 PM and 7 PM
        if (currentHour >= 12 && currentHour < 19) {
            return { isActive: true, alert: null }
        } else {
            return { isActive: false, alert: "This vendor accepts order from 4pm to 7pm" }
        }
    } else if (filter === "12PM") {
        // Allow clicks only between 5 PM and 12 AM
        if (currentHour >= 17 && currentHour < 23) {
            return { isActive: true, alert: null }
        } else {
            return { isActive: false, alert: "This vendor accepts order from 5pm to 11:30pm" }
        }

    }
    return true; // Default to clickable if no filter matches
};