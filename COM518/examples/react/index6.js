function AppWidget({title, defaultName}) {
    const [name, setName] = React.useState(defaultName);
    

    function updateState(name) {
        setName(name);
    }

    return (
        <div>
        <InputWidget title={title} passBackUserInput={updateState} name={name}/>
        <ResultsWidget name={name} />
        </div>
    )
    
}

function InputWidget({title, passBackUserInput}) {


    function updateName() {
        const n =  document.getElementById('name').value;
        passBackUserInput(n);
    }

    return (
        <div style={{backgroundColor: 'blue', color: 'white'}}>
        <h1>{title}</h1>
        <fieldset>
        <input type='text' id='name' onChange={updateName} />
        </fieldset>
        </div>
    )
}

function ResultsWidget({name}) {
    return (
        <div style={{border: '1px solid black', color: 'black', backgroundColor: 'yellow'}}>Hello {name}!</div>
    )
}

const root = ReactDOM.createRoot(
    document.getElementById('root')
);

root.render(
    <AppWidget title='Enter your name' defaultName='Fred'  />
)
