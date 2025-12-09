export async function handler(event, context) {
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: "Method Not Allowed" })
        };
    }

    const { name, email, message } = JSON.parse(event.body);
    
    const formData = new URLSearchParams();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);
    formData.append("access_key", process.env.PORTFOLIO_FORM_ACCESS_KEY); // Netlify env variable
    
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);


    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: json
        });

        const data = await response.json();

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
        console.log("Response is not ok 560");
        return {
            
            statusCode: 500,
            body: JSON.stringify({ success: false, message: "Server error" })
        };
    }
}
