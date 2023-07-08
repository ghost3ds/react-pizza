import { useState } from 'react';

function Sort({ value, onClickSort, setOrderType }) {
  const [open, setOpen] = useState(false);

  const list = [
    { name: 'популярности', sortProperty: 'rating' },
    { name: 'цене', sortProperty: 'price' },
    { name: 'алфавиту', sortProperty: 'title' },
  ];

  const onClickListItem = (i) => {
    onClickSort(i);
    setOpen(false);
  };

  return (
    <div className="sort">
      <div className="sort__label">
        <button onClick={() => setOrderType('asc')}> ↑ </button>
        <button onClick={() => setOrderType('desc')}> ↓ </button>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{value.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {list.map((obj, i) => (
              <li key={i} onClick={() => onClickListItem(obj)} className={value.sortProperty === obj.sortProperty ? 'active' : ''}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;
