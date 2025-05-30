
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

export async function updateExistingVendor() {
    try {

    } catch (error) {

    }
}


export const getCurrentTimeStatus = (filter) => {
    const now = new Date();
    const currentHour = now.getHours();

    if (filter === "7PM") {
        // Allow clicks only between 5 PM and 7 PM
        if (currentHour >= 16 && currentHour < 19) {
            return { isActive: true, alert: null }
        } else {
            return { isActive: false, alert: "This vendor accepts order from 4pm to 7pm" }
        }
    } else if (filter === "12PM") {
        // Allow clicks only between 5 PM and 12 AM
        if (currentHour >= 16 && currentHour < 23) {
            return { isActive: true, alert: null };
        } else {
            return { isActive: false, alert: "This vendor accepts orders from 7:30 PM to 11:30 PM" };
        }

    } else if (filter === "CLOSED") {
        return { isActive: false, alert: "Closed Today" }
    } else if (filter === "PENDING") {
        return { isActive: false, alert: "Updating Menu" }
    } else if (filter === "Lunch") {
        if (currentHour >= 11 && currentHour < 13) {
            return { isActive: true, alert: null }
        } else {
            return { isActive: false, alert: "This vendor accepts Lunch orders from 11am to 1pm" }
        }
    } else if (filter === "10PM") {
        if ((currentHour >= 16 && currentHour < 22) || (currentHour === 22 && currentMinutes <= 30)) {
            return { isActive: true, alert: null };
        } else {
            return { isActive: false, alert: "This vendor accepts orders from 4:00 PM to 10:30 PM" };
        }
    }
    return { isActive: true } // Default to clickable if no filter matches
};