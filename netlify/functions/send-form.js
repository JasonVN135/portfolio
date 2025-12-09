export async function handler(event, context) {
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: "Method Not Allowed" })
        };
    }

    const { name, email, message } = JSON.parse(event.body);

    const payload = {
        name,
        email,
        message,
        access_key: process.env.PORTFOLIO_FORM_ACCESS_KEY
    };
    console.log(payload);
    console.log(JSON.stringify(payload));
    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        console.log(data);

        if (response.ok) {
            console.log("Response is ok");
            return {

                statusCode: 200,
                body: JSON.stringify({ success: true })
            };
        } else {
            console.log("Response is not ok 400");
            return {
                statusCode: 400,
                body: JSON.stringify({ success: false, message: data.message })
            };
        }
    } catch (error) {
        console.log(error);
        return {

            statusCode: 500,
            body: JSON.stringify({ success: false, message: "Server error" })
        };
    }
}
