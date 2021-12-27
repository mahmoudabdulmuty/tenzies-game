import { nanoid } from 'nanoid';
import { useState } from 'react';
import Die from './components/Die';

export default function App() {
	const [dice, setDice] = useState(generateRandomArrNums());
	function generateRandomArrNums() {
		const arrOfRandomNums = [];
		for (let i = 0; i < 10; i++) {
			const min = 1;
			const max = 6;
			const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
			arrOfRandomNums.push({
				value: randomNum,
				isHeld: false,
				id: nanoid()
			});
		}
		return arrOfRandomNums;
	}
	const rollDice = () => {
		setDice(generateRandomArrNums());
	};
	const holdDice = (id) => {
		setDice((oldDice) =>
			oldDice.map((die) => {
				return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
			})
		);
	};
	return (
		<div className="container">
			<main className="main">
				<div className="dice-container">
					{dice.map((randomNum) => (
						<Die
							key={randomNum.id}
							value={randomNum.value}
							isHeld={randomNum.isHeld}
							holdDice={() => holdDice(randomNum.id)}
						/>
					))}
				</div>
				<button onClick={rollDice} className="roll-dice">
					Roll
				</button>
			</main>
		</div>
	);
}
