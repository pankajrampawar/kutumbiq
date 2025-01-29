
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