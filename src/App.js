import { useState } from 'react';

const initialItems = [
	{ id: 1, description: 'Passports', quantity: 2, packed: false },
	{ id: 2, description: 'Socks', quantity: 12, packed: true },
];

function App() {
	return (
		<div className="app">
			<Logo />
			<Form />
			<List />
			<Stat />
		</div>
	);
}
function Logo() {
	return <h1> 🌴 FAR AWAY 🚗 </h1>;
}

function Form() {
	const [descp, setDescp] = useState('');
	const [quantity, setQuantity] = useState('1');

	function handleSubmit(e) {
		e.preventDefault();

		if (!descp) return;

		const newItem = {
			descp,
			quantity,
			packed: false,
			id: Date.now(),
		};
		console.log(newItem);

		setDescp('');
		setQuantity(1);
	}

	return (
		<div className="add-form" onSubmit={handleSubmit}>
			<h3>What do you want for your 😍 trip? </h3>
			<select
				value={quantity}
				onChange={(e) => setQuantity(Number(e.target.value))}
			>
				{Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
					<option value={num} key={num}>
						{num}
					</option>
				))}
			</select>
			<input
				type="text"
				placeholder="Item..."
				value={descp}
				onChange={(e) => setDescp(e.target.value)}
			></input>
			<button>Add</button>
		</div>
	);
}

function List() {
	return (
		<div className="list">
			<ul>
				{initialItems.map((item) => (
					<Item i={item} key={item.id} />
				))}
			</ul>
		</div>
	);
}

function Item({ i }) {
	return (
		<li>
			<span style={i.packed ? { textDecoration: 'line-through' } : {}}>
				{i.quantity + ' '}
				{i.description}
			</span>
			<button>❌</button>
		</li>
	);
}

function Stat() {
	return (
		<footer className="stats">
			You have X items on your list, and you already packed X (X%)
		</footer>
	);
}
export default App;
