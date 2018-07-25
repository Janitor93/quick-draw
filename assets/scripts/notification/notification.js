class Notification {
    constructor() {
        this.notification = document.querySelector('.notification');
        this.notificationMessage = document.querySelector('.notification__message');
    }

    showNotification(message) {
        this.notification.classList.remove('hidden');
        this.notification.classList.add('visible');
        this.notificationMessage.innerHTML = message;
    }

    hideNotificatoin() {
        this.notification.classList.remove('visible');
        this.notification.classList.add('hidden');
    }
}

export default Notification;