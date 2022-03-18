import React from "react";
import Card from './components/Card'
import Header from "./components/Header";
import Drawer from "./components/Drawer";


function App() {
    const [items, setItems] = React.useState([])
    const [cartOpened, setCartOpened] = React.useState(false);

    fetch('https://623475ebdebd056201e599c9.mockapi.io/items').then(res => {
        return res.json();
    }).then(json => {
        console.log(json)
    });

    return (
        <div className="wrapper clear">
            {cartOpened && <Drawer onClose={() => setCartOpened(false)}/>}
            <Header
                onClickCart={() => setCartOpened(true)}
            />

            <div className="content p-40">
                <div className="d-flex align-center justify-between mb-40">
                    <h1>All sneakers</h1>
                    <div className="search-block d-flex">
                        <img src="/img/search.svg" alt="Search"/>
                        <input placeholder="Search..." type="text"/>
                    </div>
                </div>
                <div className="d-flex flex-wrap">

                    {
                        items.map((obj) => (
                            <Card
                                title={obj.title}
                                price={obj.price}
                                imgUrl={obj.imageUrl}
                                onFavorit={() => console.log("add to keep")}
                                onPlus={() => console.log('click on plus')}
                            />
                        ))
                    }

                </div>
            </div>
        </div>
    );
}

export default App;
