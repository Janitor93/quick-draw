import Chart from "chart.js";

const visualisation = data => {
    let dataset = [];
    return new Chart(document.getElementById("line-chart"), {
        type: "line",
        data: {
            labels: [...data.puzzles],
            datasets: Object.values(data.users)
        },
        options: {
            scales: {
                xAxes: [
                    {
                        display: true,
                        scaleLabel: {
                            display: true
                        }
                    }
                ],
                yAxes: [
                    {
                        display: true,
                        ticks: {
                            beginAtZero: true,
                            steps: 10,
                            stepValue: 5,
                            max: 200
                        }
                    }
                ]
            }
        }
    });
};

export default visualisation;
