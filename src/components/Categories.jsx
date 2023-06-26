import { useState } from 'react';

function Categories() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  const onClickCategory = (index) => {
    setActiveCategoryIndex(index);
  };
  return (
    <div className="categories">
      <ul>
        <li onClick={() => onClickCategory(0)} className={activeCategoryIndex === 0 ? 'active' : ''}>
          Все
        </li>
        <li onClick={() => onClickCategory(1)} className={activeCategoryIndex === 1 ? 'active' : ''}>
          Мясные
        </li>
        <li onClick={() => onClickCategory(2)} className={activeCategoryIndex === 2 ? 'active' : ''}>
          Вегетарианская
        </li>
        <li onClick={() => onClickCategory(3)} className={activeCategoryIndex === 3 ? 'active' : ''}>
          Гриль
        </li>
        <li onClick={() => onClickCategory(4)} className={activeCategoryIndex === 4 ? 'active' : ''}>
          Острые
        </li>
        <li onClick={() => onClickCategory(5)} className={activeCategoryIndex === 5 ? 'active' : ''}>
          Закрытые
        </li>
      </ul>
    </div>
  );
}

export default Categories;
