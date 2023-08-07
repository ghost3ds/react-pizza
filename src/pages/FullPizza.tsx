import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const FullPizza: FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://636f5291f2ed5cb047daa480.mockapi.io/items/' + id);
        setPizza(data);
      } catch (error) {
        alert('Ошибка при получении пиццы...');
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return 'Загрузка...';
  }

  return (
    <div className="container pizza-block">
      <img className="pizza-block__image" src={pizza.imageUrl} alt="pizza" />
      <h2 className="pizza-block__title">{pizza.title}</h2>
      <h4 className="pizza-block__price">{pizza.price}₽</h4>
    </div>
  );
};

export default FullPizza;
