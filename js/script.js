// Função para copiar o PIX
async function copyPix() {
    const pixNumber = "+5547999675698";
    try {
        await navigator.clipboard.writeText(pixNumber);
        showNotification("PIX copiado para a área de transferência!", "success");
    } catch (err) {
        fallbackCopyTextToClipboard(pixNumber);
    }
}

// Função fallback para copiar texto (para navegadores mais antigos ou contextos não seguros)
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed"; // Evita scroll para o topo da página
    textArea.style.opacity = "0"; // Torna invisível
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand("copy");
        if (successful) {
            showNotification("PIX copiado para a área de transferência!", "success");
        } else {
            showNotification("Não foi possível copiar o PIX", "error");
        }
    } catch (err) {
        showNotification("Não foi possível copiar o PIX", "error");
    }
    
    document.body.removeChild(textArea);
}

// Função para mostrar notificações
function showNotification(message, type = "success") {
    const notificationContainer = document.getElementById("notification-container");
    if (!notificationContainer) {
        console.error("Elemento #notification-container não encontrado.");
        return;
    }

    // Remove notificação existente se houver
    const existingNotification = notificationContainer.querySelector(".notification");
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Cria nova notificação
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notificationContainer.appendChild(notification);
    
    // Anima a entrada
    setTimeout(() => {
        notification.classList.add("show");
    }, 10);
    
    // Remove após 3 segundos
    setTimeout(() => {
        notification.classList.remove("show");
        notification.classList.add("hide");
        notification.addEventListener("transitionend", () => {
            notification.remove();
        }, { once: true });
    }, 3000);
}

// Adiciona efeitos de hover e ripple nos botões
document.addEventListener("DOMContentLoaded", function() {
    // Cria um container para notificações no body
    const notificationContainer = document.createElement("div");
    notificationContainer.id = "notification-container";
    document.body.appendChild(notificationContainer);

    const linkButtons = document.querySelectorAll(".link-button");
    
    linkButtons.forEach(button => {
        // Efeitos de hover mais suaves (já tratados via CSS com transition)
        // button.addEventListener("mouseenter", function() { this.style.transform = "translateY(-3px) scale(1.02)"; });
        // button.addEventListener("mouseleave", function() { this.style.transform = "translateY(0) scale(1)"; });

        // Adiciona efeito de ripple nos botões
        button.addEventListener("click", function(e) {
            const ripple = document.createElement("span");
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Adiciona suporte para toque em dispositivos móveis
document.addEventListener("touchstart", function() {}, {passive: true});


