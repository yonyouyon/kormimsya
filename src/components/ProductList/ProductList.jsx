import React, {useState} from 'react';
import './ProductList.css';
import ProductItem from "./ProductItem/ProductItem";
import {useTelegram} from "../hooks/useTelegram";
import {useCallback, useEffect} from "react";


// БД добавить
const products = [
    {id: '1', title: 'beat 1', price: 5000, description: 'встал забыл'},
    {id: '2', title: 'beat 2', price: 12000, description: 'защитил отечество'},
    {id: '3', title: 'beat 3', price: 5000, description: 'пукнул и не испугался'},
    {id: '4', title: 'beat 4', price: 122, description: 'поднасрал врагам'},
    {id: '5', title: 'beat 5', price: 5000, description: 'потрахался в автобусе'},
    {id: '6', title: 'Куртка 7', price: 600, description: 'почистил глок'}
]



const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);
    const {tg, queryId} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }
        fetch('http://85.119.146.179:8000/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [addedItems])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if(alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems)

        if(newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `купить ${getTotalPrice(newItems)}`
            })
        }
    }

    return (
        <div className={'list'}>
            {products.map(item => (
                <ProductItem
                    product={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            ))}
        </div>
    );
};

export default ProductList;