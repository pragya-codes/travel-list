import { useState } from 'react';

const initialItems = [
	{
		descp: 'Charger',
		quantity: 1,
		packed: false,
		id: 567,
	},
	{
		descp: 'Maggi',
		quantity: 10,
		packed: false,
		id: 123,
	},
	{
		descp: 'Shirts',
		quantity: 5,
		packed: false,
		id: 423,
	},
];

function App() {
	const [items, setItems] = useState(initialItems);

	function handleAddItem(newItem) {
		setItems((items) => [...items, newItem]);
	}

	function handleDeleteItem(id) {
		setItems((items) => items.filter((item) => item.id !== id));
	}

	function handleChecked(id) {
		setItems((items) =>
			items.map((item) =>
				item.id !== id ? item : { ...item, packed: !item.packed }
			)
		);
	}

	function handleClear() {
		setItems([]);
	}
	return (
		<div className="app">
			<Logo />
			<Form handleAddItem={handleAddItem} />
			<List
				items={items}
				onDelete={handleDeleteItem}
				onChecked={handleChecked}
				onClear={handleClear}
			/>
			<Stat items={items} />
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
		// console.log(newItem); //just to check what we are submitting to form. we can take this out of the form and display in the list. we will learn later.
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
				{ length: 5 } is an object, not an array. However, in JavaScript, you can use this object 
				in conjunction with Array.from() to create an array of a specified length. When you pass an object with a length property to Array.from(), it creates a new array with the specified 
				length, and you can also provide a callback function to generate the values for each element in the array. 

				(_, index) is a callback function that's being used inside the Array.from() method. 
				It's a common convention to use an underscore (_) as a placeholder for a parameter you don't intend to use. In this case, you are not using the first parameter (which represents the value of each element), but you are using the second parameter, which represents the index of each element within the array.
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

function List({ items, onDelete, onChecked, onClear }) {
	const [sortBy, setSortBy] = useState('packed');
	let sorted;

	if (sortBy === 'input') sorted = items;

	if (sortBy === 'description')
		sorted = items.slice().sort((a, b) => a.descp.localeCompare(b.descp));

	if (sortBy === 'packed')
		sorted = items.slice().sort((a, b) => a.packed - b.packed);

	return (
		<div className="list">
			<ul>
				{sorted.map((item) => (
					<Item
						i={item}
						onDelete={onDelete}
						onChecked={onChecked}
						key={item.id}
					/>
				))}
			</ul>
			<div className="actions">
				<select
					value={sortBy}
					onChange={(e) => setSortBy(e.target.value)}
				>
					<option value="input">Sort by input</option>
					<option value="packed">Sort by packed items</option>
					<option value="description">Sort by description</option>
				</select>
				<button
					onClick={() => {
						onClear(items);
					}}
				>
					CLEAR
				</button>
			</div>
		</div>
	);
}

function Item({ i, onDelete, onChecked }) {
	return (
		<li>
			<input
				type="checkbox"
				value={i.packed}
				onChange={() => onChecked(i.id)}
			/>
			<span style={i.packed ? { textDecoration: 'line-through' } : {}}>
				{i.quantity + ' '}
				{i.descp}
			</span>
			<button onClick={() => onDelete(i.id)}>❌</button>
		</li>
	);
}

function Stat({ items }) {
	const num = items.length;

	const numPacked = items.filter((item) => item.packed === true).length;
	return (
		<footer className="stats">
			{numPacked === 0
				? `You have ${num} items on your list, and you have packed nothing...🙁`
				: `You have ${num} items on your list, and you have packed 
				${numPacked} (${Math.round((numPacked / num) * 100)}%) items!😃`}
		</footer>
	);
}
export default App;
