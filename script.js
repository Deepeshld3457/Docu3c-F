
const API_KEY = '75d9aa8808e5791ce47aecb671e06c7d';
const CITY = 'New York';
const ctx = document.getElementById('temperatureChart').getContext('2d');
let temperatureChart;

function initializeChart() {
    temperatureChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [], 
            datasets: [
                {
                    label: 'Room Temperature (°C)',
                    data: [],
                    borderColor: 'blue',
                    fill: false,
                },
                {
                    label: 'Battery Temperature (°C)',
                    data: [],
                    borderColor: 'red',
                    fill: false,
                },
            ],
        },
        options: {
            scales: {
                x: { title: { display: true, text: 'Time' } },
                y: { title: { display: true, text: 'Temperature (°C)' } },
            },
        },
    });
}

async function fetchRoomTemperature() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`);
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
       
        return data.main.temp; 
    } catch (error) 
    {
        console.error(error);
        return null;
    }
}
function simulateBatteryTemperature() {
    
    return Math.floor(Math.random() * (30 - 25 + 1)) + 25; 
   
}

async function updateChartData() {
    const now = new Date().toLocaleTimeString(); 
    const roomTemp = await fetchRoomTemperature();
    const batteryTemp = simulateBatteryTemperature();

    if (roomTemp !== null) {
        
        temperatureChart.data.labels.push(now);
        temperatureChart.data.datasets[0].data.push(roomTemp);
        temperatureChart.data.datasets[1].data.push(batteryTemp);

        
        if (temperatureChart.data.labels.length > 10) {
            temperatureChart.data.labels.shift();
            temperatureChart.data.datasets[0].data.shift();
            temperatureChart.data.datasets[1].data.shift();
        }

        
        temperatureChart.update();
    }
}

document.getElementById('refresh-button').addEventListener('click', updateChartData);
initializeChart();
updateChartData();

async function fetchRoomTemperature1() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`);
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        const roomTemp = data.main.temp; 
        document.getElementById('roomtemp').textContent = `Room Temperature (${CITY}): ${roomTemp}°C`;
    } catch (error) {
        console.error(error);
        document.getElementById('roomtemp').textContent = 'Error loading room temperature.';
    }
}

function simulateBatteryTemperature1() {
    const batteryTemp = Math.floor(Math.random() * (40 - 25 + 1)) + 25; 
    document.getElementById('batterytemp').textContent = `Phone Battery Temperature: ${batteryTemp}°C`;
}


function refreshTemperatures() {
    fetchRoomTemperature1();
    simulateBatteryTemperature1();
}


fetchRoomTemperature1();
simulateBatteryTemperature1();
document.getElementById('refresh-button').addEventListener('click', refreshTemperatures);