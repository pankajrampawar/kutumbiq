
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


export function provideFilteredItem() {
    return (
        <div>

        </div>
    )
}


export const getCurrentTimeStatus = (filter) => {
    const now = new Date();
    const currentHour = now.getHours();

    if (filter === "7PM") {
        // Allow clicks only between 5 PM and 7 PM
        return currentHour >= 17 && currentHour < 19;
    } else if (filter === "12PM") {
        // Allow clicks only between 5 PM and 12 AM
        return currentHour >= 17 || currentHour < 12;
    }

    return true; // Default to clickable if no filter matches
};