function InputWidget({defaultName, title}) {
	const [name, setName] = React.useState(defaultName);
       
	function sayHello() {
		alert(`Hello ${name}`);
	} 
    
	return (
		<div>
		<h1>{title}</h1>
		<fieldset>
		<input type='text' id='name' value={name}/>
		<input type='button' id='btn1' value='Go!' onClick={sayHello} />
		</fieldset>
		</div>
	);
}

const root = ReactDOM.createRoot(
	document.getElementById('root')
);

root.render(
    <InputWidget title='Please enter your name:' defaultName='Tim Berners-Lee'/>
);
