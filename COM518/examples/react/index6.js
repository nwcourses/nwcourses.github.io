let itemId = 1;

function CartWidget({store}) {
	const [cart, setCart] = React.useState([]);


    const cartHtml = cart.map ( item => <li key={item.id}>{item.name}</li> ); 
       
	return (
            <div>
            <h1>{store}</h1>

            <div>
            <h2>Add an item to your cart</h2>
            <fieldset>
            <input type='text' id='item' />
            <input type='button' id='btn1' value='Go!' onClick={addItem} />
            </fieldset>
            </div>

            Here are your items:
            <ul style={{backgroundColor: 'yellow'}}>
            {cartHtml}
            </ul>

            </div>
        );
    
    

    function addItem() {
        const items = structuredClone(cart);
        const newItem = { 
            id: itemId++, 
            name: document.getElementById('item').value 
        };
        items.push(newItem);
        setCart(items);
    }
}

const root = ReactDOM.createRoot(
	document.getElementById('root')
);

root.render(
    <CartWidget store='Solent E-Stores'/>
);
