function InputWidget({title, defaultName})
{
    return (
            <div>
            <h1>{title}</h1>
            <fieldset>
            <input type='text' id='name' defaultValue={defaultName}/>
            <input type='button' value='Go!' />
            </fieldset>
            </div>
        );
}


const root = ReactDOM.createRoot(
    document.getElementById('root')
);
root.render(
    <InputWidget title='Please enter your name:' defaultName='Tim Berners-Lee'/>
)
