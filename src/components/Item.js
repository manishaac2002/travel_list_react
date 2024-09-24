export default function Item({ item, onDeleteItems, onToggleItem }) {

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