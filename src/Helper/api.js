export const apiRequest = async (url, method = "POST", data = {}, token = "", isFormData = false) => {
    try {
        const headers = {
            ...(token && { Authorization: `Bearer ${token}` }),
            ...(!isFormData && { "Content-Type": "application/json" }),
        };

        const response = await fetch(url, {
            method,
            headers,
            body: isFormData ? data : JSON.stringify(data),
        });

        const result = await response.json();

        return {
            success: response.ok,
            data: result,
        };
    } catch (error) {
        console.error("API Error:", error);
        return {
            success: false,
            data: { message: "Something went wrong" },
        };
    }
};
