import React, { useCallback, useRef } from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';
import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
  initialState,
  selectFilter,
} from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzaSlice';
import { selectPizzaData } from '../redux/slices/cartSlice';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, status } = useSelector(selectPizzaData);
  const { sort, categoryId, orderType, currentPage } = useSelector(selectFilter);
  const { searchValue } = React.useContext(SearchContext);
  const isMounted = useRef('false');
  const isSearch = useRef('false');

  const onClickCategory = useCallback((id) => {
    dispatch(setCategoryId(id));
  }, []);

  const getPizzas = async () => {
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(fetchPizzas({ currentPage, categoryId, orderType, search, sort }));

    window.scrollTo(0, 0);
  };

  // Если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, orderType, currentPage]);

  // Если был перый рендер, то проверяем URL-параметры и сохраняем в Redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      if (
        initialState.categoryId === Number(params.categoryId) &&
        initialState.selectedSort === params.selectedSort &&
        initialState.currentPage === Number(params.currentPage)
      ) {
        getPizzas();
      }
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );

      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, orderType, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status == 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка.</h2>
          <p>Попробуйте повторить попытку позже</p>
        </div>
      ) : (
        <div className="content__items">
          {status == 'loading'
            ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
            : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        onChangePage={(number) => dispatch(setCurrentPage(number))}
      />
    </div>
  );
};
export default Home;
