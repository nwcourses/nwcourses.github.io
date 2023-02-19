function InputWidget() {
    return (
            <div>
            <h1>Input your name</h1>
            <fieldset>
            <input type='text' id='name' />
            <input type='button' value='Go!' />
            </fieldset>
            </div>
    );
}

const root = ReactDOM.createRoot(
    document.getElementById('root')
);

root.render(<InputWidget />);
