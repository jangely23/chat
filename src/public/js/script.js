const socket = io();

const send = document.querySelector("#send-message");
const allMessages = document.querySelector("#all-messages");

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}


// Envia el mensaje a el server a traves del socket
send.addEventListener("click", (e) => {
    const message = document.querySelector("#message");
    const dataMessage = message.value

    socket.emit("message", { dataMessage });
    message.value = "";
})

// Recibe el mensaje desde el server a traves del socket
socket.on("message", ({ user, message, date }) => {
    const userCookie = getCookie("username");
    let style = 'self-start';
    let styleBubble = 'border-gray-200 bg-gray-100 dark:bg-gray-700 rounded-tr-xl rounded-b-xl text-left';
    let styleText = "justify-start";

    if(userCookie === user) {
        style = 'self-end flex-row-reverse';
        styleBubble = 'border-blue-200 bg-blue-100 dark:bg-blue-700 rounded-tl-xl rounded-b-xl  text-right';
        styleText = "justify-end";
    }


    const msg = document.createRange().createContextualFragment(`
        <div class="flex ${style} gap-2.5 mt-2 ">
            <img class="w-8 h-8 rounded-full" src="/images/user.png" alt="user image">
            <div class="flex flex-col w-full max-w-[320px] leading-1.5 p-4 ${styleBubble}">
                <div class="flex items-center ${styleText} space-x-2 rtl:space-x-reverse ">
                    <span class="text-sm font-semibold text-gray-900 dark:text-white">${user}</span>
                </div>
    
                <p class="text-sm font-normal py-2.5 text-gray-900 dark:text-white">${message}</p>
                <span class="text-xs font-light text-gray-500 dark:text-gray-400">${date}</span>
            </div>
        </div>
    `);

    allMessages.appendChild(msg);
})
