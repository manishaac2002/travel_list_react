import { useState } from 'react'


export default function App() {

  const [items, setItems] = useState([])

  function handelAddItem(item) {
    setItems((items) => [...items, item])
  }

  function handleDeleteItems(id) {
    setItems((items) => (items.filter(item => item.id !== id)))
  }

  function handleToggleItem(id) {
    setItems((items) => items.map((item) => item.id === id
      ? { ...item, packed: !item.packed }
      : item
    ))
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handelAddItem} />
      <PackingLists items={items}
        onDeleteItems={handleDeleteItems}
        onToggleItem={handleToggleItem} />
      <Stats items={items} />
    </div>
  )
}

function Logo() {
  return (
    <h1>
      Far away
    </h1>

  )
}



function Form({ onAddItems }) {

  const [description, setDescription] = useState("")
  const [quantity, setQuantity] = useState(1)

  function handleSubmit(e) {
    e.preventDefault()

    if (!description) return
    const newItem = { id: Date.now(), description, quantity, packed: false }


    onAddItems(newItem)

    setDescription("")
    setQuantity(1)

  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>

      <h3>What do you need for your trip ?</h3>

      <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>{num}</option>
        ))}
      </select>

      <input type="text" placeholder="Add item..." value={description}
        onChange={(e) => setDescription(e.target.value)} />

      <button>Add</button>
    </form>
  )

}

function PackingLists({ items, onDeleteItems, onToggleItem }) {
  return (
    <div className="list">

      <ul>
        {items.map((item) => (

          <Item item={item}
            key={item.id}
            onDeleteItems={onDeleteItems}
            onToggleItem={onToggleItem}
          />))}
      </ul>

    </div>
  )
}

function Item({ item, onDeleteItems, onToggleItem }) {

  return (

    <li>
      <input type="checkbox" value={item.packed}
        onChange={() => onToggleItem(item.id)} />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.description} {item.quantity}
      </span>
      <button onClick={() => onDeleteItems(item.id)}>&times;</button>
    </li>

  )

}

function Stats({ items }) {
  if (!items.length) return( 
     <p className='stats'>
    <em>Start adding items to your packing list</em>
  </p>
  )

  const numItems = items.length
  const numPacked = items.filter(item => item.packed).length
  const percentage = Math.round(numPacked / numItems * 100)

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything! Ready to go"
          : `You have ${numItems} items on your list, and you already packed 
           ${numPacked} (${percentage} %)`
        }
      </em>
    </footer >
  )
}