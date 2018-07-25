import Table from './data/data';
import visualisation from './visualisation/visualisation';
import Notification from './notification/notification';

const table = new Table();
const notification = new Notification();
let visual = null;
let chartData = {
    users: {},
    puzzles: table.data.puzzles
};
let checkedUsers = {};
const checkboxes = document.querySelectorAll('.checkboxUser');
let initCounter = 10;

checkboxes.forEach(checkbox => {
    if(initCounter !== 0) {
        checkedUsers[checkbox.name] = {
            data: [...table.data.users[checkbox.name].scores],
            label: checkbox.name,
            borderColor: '#'+Math.random().toString(16).slice(-6),
            fill: false
        };
        checkbox.checked = true;
        initCounter -= 1;
    }
    checkbox.addEventListener('click', event => {
        if(event.target.checked) {
            if(Object.keys(checkedUsers).length > 9) {
                event.preventDefault();
                notification.showNotification('Can not select many than 10 elements');
                setTimeout(() => {
                    notification.hideNotificatoin();
                }, 10000);
            } else {
                checkedUsers[event.target.name] = {
                    data: [...table.data.users[event.target.name].scores],
                    label: event.target.name,
                    borderColor: '#'+Math.random().toString(16).slice(-6),
                    fill: false
                };
            }
        } else {
            delete checkedUsers[event.target.name];
        }
        visual.data.datasets = Array.from(Object.keys(checkedUsers), x => checkedUsers[x]);;
        visual.update();
    });
});

chartData.users = checkedUsers;
visual = visualisation(chartData);