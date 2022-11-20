import React from "react";
import Hero from "../components/home/Hero";
import Process from "../components/home/Process";
import Work from "../components/home/Work";
import Reasons from "../components/home/Reasons";
import Feedback from "../components/home/Feedback";
import Footer from "../components/footer/Footer";
import Map from "../components/map/FindingStore";

const Home = () => {
	document.title = "WASHAHOLIC";

	return (
		<div className="text-gray-800">
			<Hero />
			<Process />
			<Work />
			<Reasons />
			<Feedback />
			<Map />
			<Footer />
		</div>
	);
};

export default Home;
