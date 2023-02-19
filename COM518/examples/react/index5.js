function InputWidget({title, defaultName}) {

	const [name, setName] = React.useState(defaultName);
       
	return (
            <div>
            <h1>{title}</h1>
            <fieldset>
            <input type='text' id='name' value={name} onChange={updateState}/>
            <input type='button' id='btn1' value='Go!' onClick={sayHello} />
            </fieldset>
            </div>
        );
    
    
	function sayHello() {
		alert(`Hello ${name}`);
	} 

    function updateState() {
		setName(document.getElementById('name').value);
    }
}

const root = ReactDOM.createRoot(
	document.getElementById('root')
);

root.render(
    <InputWidget title='Please enter your name:' defaultName='Tim Berners-Lee'/>
);
