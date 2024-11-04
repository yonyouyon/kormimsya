import React, { useState, useEffect, useCallback } from 'react';
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import { useTelegram } from "../hooks/useTelegram";

// Подключаем библиотеку sqlite3
const sqlite3 = require('sqlite3').verbose();
const dbPath = './beats.db';  // Укажите путь к базе данных

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => acc + item.price, 0);
}

const ProductList = () => {
    const [products, setProducts] = useState([]); // Список аудиофайлов из базы данных
    const [addedItems, setAddedItems] = useState([]);
    const { tg, queryId } = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        };
        fetch('http://85.119.146.179:8000/web-data', { // Замените на URL вашего сервера
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
    }, [addedItems]);

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData);
        return () => {
            tg.offEvent('mainButtonClicked', onSendData);
        };
    }, [onSendData]);

    // Функция для загрузки данных из базы данных SQLite
    const fetchBeats = () => {
        const db = new sqlite3.Database(dbPath);
        db.all('SELECT id, genre, file_path AS title FROM beats', [], (err, rows) => {
            if (err) {
                console.error("Ошибка при чтении из базы данных:", err.message);
                return;
            }

            const beats = rows.map(row => ({
                id: row.id.toString(),
                title: row.title,
                genre: row.genre,
                price: 5000, // Фиксированная цена, можно заменить на любое значение
                description: `Genre: ${row.genre}`
            }));

            setProducts(beats); // Сохраняем в состояние
        });
        db.close();
    };

    // Загружаем данные при первом рендере компонента
    useEffect(() => {
        fetchBeats();
    }, []);

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if (alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems);

        if (newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить за ${getTotalPrice(newItems)}`
            });
        }
    }

    return (
        <div className="list">
            {products.map(item => (
                <ProductItem
                    key={item.id}
                    product={item}
                    onAdd={onAdd}
                    className="item"
                />
            ))}
        </div>
    );
};

export default ProductList;