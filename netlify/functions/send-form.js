export async function handler(event, context) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: JSON.stringify({ message: "Method Not Allowed" }) };
    }

    const { name, email, message } = JSON.parse(event.body);

    const payload = {
        name,
        email,
        message,
        access_key: process.env.PORTFOLIO_FORM_ACCESS_KEY
    };

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const contentType = response.headers.get("content-type") || "";
        let data;

        if (contentType.includes("application/json")) {
            data = await response.json();
        } else {
            const text = await response.text();
            console.error("Expected JSON, got:", text);
            return {
                statusCode: 500,
                body: JSON.stringify({ success: false, message: "Invalid response from Web3Form" })
            };
        }

        if (response.ok) {
            return { statusCode: 200, body: JSON.stringify({ success: true }) };
        } else {
            return { statusCode: 400, body: JSON.stringify({ success: false, message: data.message }) };
        }
    } catch (error) {
        console.error(error);
        return { statusCode: 500, body: JSON.stringify({ success: false, message: "Server error" }) };
    }
}
