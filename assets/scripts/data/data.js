import users from '../../../assets/json/users.json';
import sessions from '../../json/sessions.json';

class Table {
    constructor(session) {
        this.table = document.querySelector('#table');
        this.session = 'session1';
        this.tableBody = document.querySelector('.table-body');
        this.data = this.collectData();
        this.createTableHeader();
        this.createTableBody();
    }

    collectData() {
        let data = {
            puzzles: [],
            users: {}
        };

        sessions[this.session].puzzles.forEach(puzzle => {
            data.puzzles.push(puzzle.name);
        });

        users.users.forEach(user => {
            data.users[user.displayName] = {};
            data.users[user.displayName].scores = [];
            sessions[this.session].rounds.forEach(round => {
                if(round.solutions[user.uid]) {
                    data.users[user.displayName].scores.push(+round.solutions[user.uid].time['$numberLong']);
                } else {
                    data.users[user.displayName].scores.push(150);
                }
            });
        });

        return data;
    }

    createTableHeader() {
        let row = document.createElement('tr');
        let displayNameCell = document.createElement('th');
        displayNameCell.innerHTML = 'Display Name';
        row.appendChild(displayNameCell);
        sessions[this.session].puzzles.forEach(puzzle => {
            let th = document.createElement('th');
            th.innerHTML = puzzle.name;
            row.appendChild(th);
        });
        let totalTimeCell = document.createElement('th');
        totalTimeCell.innerHTML = 'Total Time';
        let checkboxCell = document.createElement('th');
        checkboxCell.innerHTML = 'Include in Chart';
        row.appendChild(totalTimeCell);
        row.appendChild(checkboxCell);
        this.table.appendChild(row);
    }

    createTableBody() {
        users.users.forEach(user => {
            let row = document.createElement('tr');
            let td = document.createElement('td');
            td.innerHTML = user.displayName;
            row.appendChild(td);
            let totalTime = 0;
            sessions[this.session].rounds.forEach(round => {
                let td = document.createElement('td');
                let toolTip = document.createElement('span');
                toolTip.classList.add('tooltip');
                if(round.solutions[user.uid]) {
                    toolTip.innerHTML = round.solutions[user.uid].code; 
                    td.innerHTML = round.solutions[user.uid].time['$numberLong'];
                    totalTime += +round.solutions[user.uid].time['$numberLong'];
                } else {
                    toolTip.innerHTML = 'didn\'t decide';;
                    td.innerHTML = '150';
                    totalTime += 150;
                }
                td.appendChild(toolTip);
                row.appendChild(td);
            });
            let totalTimeCell = document.createElement('td');
            totalTimeCell.innerHTML = totalTime;
            row.appendChild(totalTimeCell);
            let checkboxCell = document.createElement('td');
            let checkbox = document.createElement('input');
            checkbox.className = 'checkboxUser';
            checkbox.type = 'checkbox';
            checkbox.name = user.displayName;
            checkboxCell.appendChild(checkbox);
            row.appendChild(checkboxCell);
            this.table.appendChild(row);
        });
    }
}

export default Table;