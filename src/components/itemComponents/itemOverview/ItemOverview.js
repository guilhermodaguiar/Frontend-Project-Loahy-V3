import './ItemOverview.css';

import React from "react";
import ItemComponent from "../itemComponent/ItemComponent";
import {ItemsState} from "../../../context/ItemsContext";


function ItemOverview() {
    const {state4: {items}} = ItemsState();

    return (<>
        <main>
            <article className="outer-container">
                <h1 className="title-products-header" id="shop">Onze producten</h1>
                <article className="photo-wrapper">
                    {items && items.map((item) => {
                        return <ItemComponent key={item.productId}
                                              item={item}
                        />
                    })}
                </article>
            </article>
        </main>
    </>);
}

export default ItemOverview;
