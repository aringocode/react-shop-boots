import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import Card from './components/Card'
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";


function App() {
    const [items, setItems] = React.useState([]);
    const [cartItems, setCartItems] = React.useState([]);
    const [favorites, setFavorites] = React.useState([]);
    const [searchValue, setSearchValue] = React.useState('');
    const [cartOpened, setCartOpened] = React.useState(false);

    React.useEffect(() => {
        axios.get('https://623475ebdebd056201e599c9.mockapi.io/items').then(res => {
            setItems(res.data);
        });
        axios.get('https://623475ebdebd056201e599c9.mockapi.io/cart').then(res => {
            setCartItems(res.data);
        });
        axios.get('https://623475ebdebd056201e599c9.mockapi.io/Favorites').then(res => {
            setFavorites(res.data);
        });

    }, []);


    const onAddToCart = (obj) => {
        axios.post('https://623475ebdebd056201e599c9.mockapi.io/cart', obj);
        setCartItems((prev) => [...prev, obj]);
    };

    const onRemoveItem = (id) => {
        axios.delete(`https://623475ebdebd056201e599c9.mockapi.io/cart/${id}`);
        setCartItems((prev) => prev.filter(item => item.id !== id ));
    }

    const onAddToFavorite = async (obj) => {
        console.log(obj);
        if (favorites.find((favObj) => favObj.id == obj.id)) {
            axios.delete(`https://623475ebdebd056201e599c9.mockapi.io/Favorites/${obj.id}`);
        } else {
            const resp = await axios.post('https://623475ebdebd056201e599c9.mockapi.io/Favorites', obj);
            setFavorites((prev) => [...prev, obj]);
        }

    }

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    }


    return (
        <div className="wrapper clear">
            {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem}/>}
            <Header
                onClickCart={() => setCartOpened(true)}
            />
            <Routes>
                <Route path="/" exact element={
                    <Home
                        items={items}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        onChangeSearchInput={onChangeSearchInput}
                        onAddToFavorite={onAddToFavorite}
                        onAddToCart={onAddToCart}
                    />
                }/>
                <Route path="/favorites" exact element={
                    <Favorites items={favorites} onAddToFavorite={onAddToFavorite}/>
                }/>
            </Routes>

        </div>
    );
}

export default App;
