import Remainders from "./Remainders"

function App() {
	localStorage.setItem("username", "Tharun");
	console.log(localStorage.getItem("username"))
	return <>
	<Remainders/>
	</>
}

export default App
