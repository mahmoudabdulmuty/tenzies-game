import { useState } from 'react';
import Die from './components/Die';
export default function App() {
	const [randomArrOfNums] = useState(generateRandomArrNums());

	function generateRandomArrNums() {
		const arrOfRandomNums = [];
		for (let i = 0; i < 10; i++) {
			const min = 1;
			const max = 6;
			const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
			arrOfRandomNums.push(randomNum);
		}
		return arrOfRandomNums;
	}
	return (
		<div className="container">
			<main className="main">
				<div className="dice-container">
					{randomArrOfNums.map((randomNum, index) => (
						<Die key={index} value={randomNum} />
					))}
				</div>
			</main>
		</div>
	);
}
