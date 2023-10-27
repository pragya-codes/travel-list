import { useState } from 'react';

// const initialItems = [
// 	{ id: 1, description: 'Passports', quantity: 2, packed: false },
// 	{ id: 2, description: 'Socks', quantity: 12, packed: true },
// ];

function App() {
	const [items, setItems] = useState([]);
	function handleAddItem(newItem) {
		setItems((items) => [...items, newItem]);
	}
	return (
		<div className="app">
			<Logo />
			<Form handleAddItem={handleAddItem} />
			<List items={items} />
			<Stat />
		</div>
	);
}
function Logo() {
	return <h1> 🌴 FAR AWAY 🚗 </h1>;
}

function Form({ handleAddItem }) {
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
		console.log(newItem); //just to check what we are submitting to form. we can take this out of the form and display in the list. we will learn later.
		handleAddItem(newItem);
		setDescp('');
		setQuantity(1);
	}

	return (
		<form className="add-form" onSubmit={handleSubmit}>
			<h3>What do you want for your 😍 trip? </h3>
			<select
				value={quantity}
				onChange={(e) => setQuantity(Number(e.target.value))}
			>
				{/* Array.from takes 2 params -> 1st iterable thing 2nd a cb. 
				To create an arr of range of numbers:
				const range = Array.from({ length: 5 }, (_, index) => index + 1); // Generates an array of numbers from 1 to 5: [1, 2, 3, 4, 5]
				
				{ length: 5 } is an object, not an array. However, in JavaScript, you can use this object in conjunction with Array.from() to create an array of a specified length. When you pass an object with a length property to Array.from(), it creates a new array with the specified length, and you can also provide a callback function to generate the values for each element in the array. 

				(_, index) is a callback function that's being used inside the Array.from() method. It's a common convention to use an underscore (_) as a placeholder for a parameter you don't intend to use. In this case, you are not using the first parameter (which represents the value of each element), but you are using the second parameter, which represents the index of each element within the array.
				
				
*/}
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
		</form>
	);
}

function List({ items }) {
	return (
		<div className="list">
			<ul>
				{items.map((item) => (
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
