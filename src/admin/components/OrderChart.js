import React, { useState, useEffect, useRef } from 'react';
import { fetchOrders } from '../../FirebaseConfig';
import Chart from 'chart.js/auto';

const OrderChart = ({ type }) => {
    const [orderData, setOrderData] = useState([]);
    const chartRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            const orders = await fetchOrders();
            setOrderData(orders);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (orderData.length > 0) {
            renderChart();
        }
    }, [orderData, type]); // Make sure to include type in the dependency array

    const renderChart = () => {
        if (chartRef.current !== null) {
            chartRef.current.destroy(); // Destroy existing chart if it exists
        }

        // Filter orders for the last 7 days
        const currentDate = new Date();
        const sevenDaysAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);

        const filteredOrders = orderData.filter(order => {
            const orderDate = new Date(order.date);
            return orderDate >= sevenDaysAgo && orderDate <= currentDate;
        });

        const orderCountByDate = filteredOrders.reduce((acc, order) => {
            const date = order.date.split('T')[0]; // Extract date without time
            acc[date] = (acc[date] || 0) + 1;
            return acc;
        }, {});

        // Sort dates in ascending order
        const sortedDates = Object.keys(orderCountByDate).sort((a, b) => new Date(a) - new Date(b));
        const labels = sortedDates;
        const data = sortedDates.map(date => orderCountByDate[date]);

        const colors = generateDarkColors(data.length); // Generate random colors

        const ctx = document.getElementById('orderChart').getContext('2d');
        chartRef.current = new Chart(ctx, {
            type: type || 'bar', // Use the provided type or default to 'bar'
            data: {
                labels: labels,
                datasets: [{
                    label: 'Number of Orders',
                    data: data,
                    backgroundColor: colors,
                    borderColor: colors,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        precision: 0
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    };

    // Function to generate random colors
    const generateDarkColors = (numColors) => {
        const colors = [];
    for (let i = 0; i < numColors; i++) {
        const r = Math.floor(Math.random() * 156) + 100; // Values between 100 and 255 for brighter colors
        const g = Math.floor(Math.random() * 156) + 100;
        const b = Math.floor(Math.random() * 156) + 100;
        const color = `rgba(${r}, ${g}, ${b}, 1)`; // Full opacity for maximum visibility
        colors.push(color);
    }
    return colors;
    };

    return (
        <div className="order-chart">
            <canvas id="orderChart" width="400" height="400"></canvas>
        </div>
    );
};

export default OrderChart;
