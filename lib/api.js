export async function getUserOrders(id) {
    if (!id) {
        throw new Error("Login as email is required");
    }

    console.log(id)
    const userId = id;
    try {
        const response = await fetch("/api/tiffin/getUserOrder", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to fetch orders");
        }

        const data = await response.json();
        return data
    } catch (error) {
        console.log(error)
        throw new Error("Unexpeceted error occured, please try again later.")
    }
}