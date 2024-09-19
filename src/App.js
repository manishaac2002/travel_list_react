import {useState} from 'react'

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
// ];

//this shoulb be merged

export default function App() {

  const [items, setItems] =useState([])

  function handelAddItem(item) {
    setItems((items)=>[...items,item])
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handelAddItem}/>
      <PackingLists items={items}/>
      <Stats />
    </div>
  );
}

function Logo() {
  return (
    <h1>
      🌲 Far away
    </h1>
    
  )
}

 

function Form({onAddItems}) {

  const [description, setDescription] = useState("")
  const [quantity, setQuantity] = useState(1)

  function handleSubmit(e) {
    e.preventDefault()

    if (!description) return  
    const newItem = {id: Date.now(), description, quantity, packed: false}
    console.log(newItem);

    onAddItems(newItem)

    setDescription("")
    setQuantity(1)
    
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>

      <h3>What do you need for your trip ?</h3>

      <select value={quantity} onChange={(e)=>setQuantity(Number(e.target.value))}>
        {Array.from({length: 20},(_,i)=>i+1).map((num)=>(
          <option value={num} key={num}>{num}</option>
          ))}
      </select>

      <input type="text" placeholder="Add item..." value={description}
      onChange={(e)=>setDescription(e.target.value)}/>

      <button>Add</button>
    </form>
    )

}

function PackingLists({items}) {
  return (
    <div className="list">

      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id} />))}
      </ul>

    </div>
  )
}

function Item({ item }) {
  return (
  <li>
    <span style={ item.packed ? { textDecoration: "line-through" } : {}}>
      {item.description} {item.quantity}
    </span>
    <button>&times;</button>
  </li>
  )

}

function Stats() {
  return (
    <footer className="stats">
      <em>
        You have X items on your list, and you already packed x (X %)
      </em>
    </footer >)
}