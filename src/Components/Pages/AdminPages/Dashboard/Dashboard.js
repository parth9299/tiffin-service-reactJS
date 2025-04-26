import React from 'react';
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser, faTv, faMoneyBill } from '@fortawesome/free-solid-svg-icons'; // Import necessary icons
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const barData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                type: 'bar',
                label: 'Actual',
                data: [2400, 1398, 9800, 3908, 4800, 3800],
                backgroundColor: '#4CAF50',
            },
            {
                type: 'bar',
                label: 'Progress',
                data: [3500, 1000, 7500, 2500, 5800, 3100],
                backgroundColor: '#f5cb42',
            },
        ],
    };

    const barOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Actual Sales',
            },
        },
        scales: {
            y: {
                type: 'linear',
                position: 'left',
                ticks: {
                    callback: (value) => `${value}`,
                },
            },
        },
    };

    const lineData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                type: 'line',
                label: 'Total Transactions',
                data: [1000, 3000, 1500, 6900, 4300, 7500],
                borderColor: '#FF5722',
                borderWidth: 2,
            },
            {
                type: 'line',
                label: 'Total Revenu',
                data: [5000, 3800, 4500, 2800, 5000, 4500],
                borderColor: '#4245f5',
                borderWidth: 2,
            },
        ],
    };

    const lineOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Total Transactions',
            },
        },
        scales: {
            y: {
                type: 'linear',
                position: 'left',
                ticks: {
                    callback: (value) => `$${value}`,
                },
            },
        },
    };

    return (
        <>
            <div className='admin-dashboard-container'>
                <h1>Welcome to Dashboard</h1>
                <br />
                <div className="dashboard-stats">
                    <div className="stat-card purple">
                        <div className="stat-content">
                            <div className="stat-number">101.1K</div>
                            <div className="stat-title">Revenue</div>
                            <div className="stat-change">+3% from last month</div>
                        </div>
                        <div className="stat-icon">
                            <FontAwesomeIcon icon={faMoneyBill} />
                        </div>
                    </div>

                    <div className="stat-card orange">
                        <div className="stat-content">
                            <div className="stat-number">12.2K</div>
                            <div className="stat-title">Purchases</div>
                            <div className="stat-change">+3% from last month</div>
                        </div>
                        <div className="stat-icon">
                            <FontAwesomeIcon icon={faShoppingCart} />
                        </div>
                    </div>

                    <div className="stat-card purple">
                        <div className="stat-content">
                            <div className="stat-number">5.3K</div>
                            <div className="stat-title">Customers</div>
                            <div className="stat-change">+3% from last month</div>
                        </div>
                        <div className="stat-icon">
                            <FontAwesomeIcon icon={faUser} />
                        </div>
                    </div>

                    <div className="stat-card green">
                        <div className="stat-content">
                            <div className="stat-number">740</div>
                            <div className="stat-title">Subscribe</div>
                            <div className="stat-change">+3% from last month</div>
                        </div>
                        <div className="stat-icon">
                            <FontAwesomeIcon icon={faTv} />
                        </div>
                    </div>
                </div>
                <div className="charts-container">
                    <div className="chart-section">
                        <Chart type="bar" data={barData} options={barOptions} height={200} />
                    </div>
                    <div className="chart-section">
                        <Chart type="line" data={lineData} options={lineOptions} height={200} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
