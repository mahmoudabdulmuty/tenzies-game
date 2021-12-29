import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import Die from './components/Die';

export default function App() {
	const [dice, setDice] = useState(generateRandomArrNums());
	const [tenzies, setTenzies] = useState(false);

	useEffect(() => {
		const allHeld = dice.every((die) => die.isHeld);
		const firstValue = dice[0].value;
		const allValuesEqual = dice.every((die) => die.value === firstValue);
		if (allHeld && allValuesEqual) {
			setTenzies(true);
		}
	}, [dice]);

	function generateNewDie() {
		const min = 1;
		const max = 6;
		const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
		return {
			value: randomNum,
			isHeld: false,
			id: nanoid()
		};
	}

	function generateRandomArrNums() {
		const arrOfRandomNums = [];
		for (let i = 0; i < 10; i++) {
			arrOfRandomNums.push(generateNewDie());
		}
		return arrOfRandomNums;
	}
	const rollDice = () => {
		setDice((oldDice) =>
			oldDice.map((die) => {
				return die.isHeld ? die : generateNewDie();
			})
		);
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
			{tenzies && <Confetti />}
			<main className="main">
				<h1 className="title">Tenzies</h1>
				<p className="instructions">
					Roll until all dice are the same. Click each die to freeze it at its
					current value between rolls.
				</p>
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
					{tenzies ? 'New Game' : 'Roll'}
				</button>
			</main>
		</div>
	);
}
