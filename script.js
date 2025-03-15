const apiKey = "tgp_v1_gifyYWvn2TL0k74LP3OUY71vQH1hfs9unN0NTwRNYlQ"; // Вставьте ваш API-ключ

async function sendMessage() {
    let userMessage = document.getElementById("user-input").value.trim();
    if (!userMessage) return; // Проверка на пустой ввод

    let chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += `<div class="user-message">${userMessage}</div>`;

    try {
        let response = await fetch("https://api.together.xyz/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
                messages: [{ role: "user", content: userMessage }]
            })
        });

        let data = await response.json();

        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
            throw new Error("Ошибка в формате ответа API");
        }

        let botMessage = data.choices[0].message.content;
        chatBox.innerHTML += `<div class="bot-message">${botMessage}</div>`;
    } catch (error) {
        chatBox.innerHTML += `<div class="error-message">Ошибка: ${error.message}</div>`;
    }
}
