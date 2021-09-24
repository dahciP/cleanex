import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

import Spinner from "../loading/Spinner";

const GraphDeliveryCard = ({ graphNames }) => {
	const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
	const [pendingData, setPendingData] = useState([]);
	const [completedData, setCompletedData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const getGraphInfo = async () => {
		days.map(async (day) => {
			const res = await axios.get(
				`/order/delivery/${graphNames[0].toLowerCase()}/${day}`
			);
			setPendingData((prevData) => {
				return [...prevData, res.data.total];
			});
		});

		days.map(async (day) => {
			const res = await axios.get(
				`/order/delivery/${graphNames[2].toLowerCase()}/${day}`
			);
			setCompletedData((prevData) => {
				return [...prevData, res.data.total];
			});
		});
	};

	const series = [
		{
			name: graphNames[0],
			data: pendingData,
		},
		{
			name: graphNames[2],
			data: completedData,
		},
	];

	const options = {
		chart: {
			height: 350,
			type: "area",
			width: "100%",
		},
		dataLabels: {
			enabled: false,
		},
		stroke: {
			curve: "smooth",
		},
		xaxis: {
			categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
		},
		tooltip: {
			x: {
				format: "dd/MM/yy HH:mm",
			},
		},
	};

	useEffect(() => {
		getGraphInfo();
		setIsLoading(false);
	}, []);

	return (
		<>
			{isLoading ? (
				<Spinner />
			) : (
				<div className="w-1/2 shadow-lg rounded-xl p-8 bg-white m-8 flex justify-between flex-wrap -z-2">
					<p className="text-lg font-medium pt-2 text-gray-500">
						Deliveries Summary Based on Day
					</p>
					<ReactApexChart
						options={options}
						series={series}
						type="area"
						height={350}
						width={600}
					/>
				</div>
			)}
		</>
	);
};

export default GraphDeliveryCard;