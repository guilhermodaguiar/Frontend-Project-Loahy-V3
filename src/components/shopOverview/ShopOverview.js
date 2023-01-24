import './ShopOverview.css';

import React, {useEffect, useState} from "react";
import ShopItem from "../shopItem/ShopItem";
import axios from "axios";


function ShopOverview() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        async function getItemData() {
            try {
                const itemData = await axios.get(`http://localhost:8080/products/`);
                console.log(itemData.data);
                setItems(itemData.data);
            } catch (e) {
                console.error('er is iets misgegaan', e);
            }
        }
        getItemData();
    }, []);


    console.log(items);

    return (
        <>
            <main>
                <div id="shop">
                    <div className="outer-container">
                        <h1 className="title-products-header" id="products">Onze producten</h1>
                        <div className="product-overview-inner-container">
                            <div className="product-container">
                                <div className="product-list">
                                    <div className="product-item-info">
                                        <div className="photo-wrapper">
                                            {items.map((item) => {
                                                return <ShopItem
                                                    key={item.productId}
                                                    item={item}
                                                />
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default ShopOverview;
