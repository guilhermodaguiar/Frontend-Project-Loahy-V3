import './OrderOverview.css';

import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../../context/AuthContext";
import {IoCloseSharp} from "react-icons/io5";
import {FaRegListAlt} from "react-icons/fa";
import {useHistory} from "react-router-dom";
import {BsFillPatchCheckFill} from "react-icons/bs";

function OrderOverview() {
    const history = useHistory();
    const token = localStorage.getItem('token');
    const {user} = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [addSuccess, toggleAddSuccess] = useState(false);


    useEffect(() => {
        async function fetchOrders() {
            try {
                const response = await axios.get(`http://localhost:8080/orders/all`, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        }
                    }
                );
                setOrders(response.data);
                console.log(response.data);
            } catch (e) {
                console.error('Error: Er is iets misgegaan!', e);
            }
        }

        fetchOrders();
    }, [token]);

    async function deleteOrder(id) {
        try {
            await axios.delete(`http://localhost:8080/orders/delete/${id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                });
            toggleAddSuccess(true);
            history.push('/admin/profile/#admin_product_overview');
        } catch (e) {
            console.error(e, 'er is iets misgegaan')
        }
    }


    return (
        <>
            {user.roles !== "ROLE_ADMIN" ?
                    <h3>Moet ingelogd zijn als Admin</h3>
                :
                <section className="history-orders" id="all_orders">
                        <div>
                            <h2>
                                Orders&nbsp;<FaRegListAlt/>
                            </h2>
                        </div>
                        <table>
                            <thead>
                            <tr>
                                <th></th>
                                <th>Naam</th>
                                <th>Achternaam</th>
                                <th>order#</th>
                                <th>Order</th>

                                <th>Datum</th>
                                <th>AddressId</th>
                            </tr>
                            </thead>
                            <tbody className="order_tbody">

                            {orders.map((order) => {
                                return <tr key={order.id}>
                                    <td>
                                        <button>
                                            <IoCloseSharp
                                                size={20}
                                                onClick={() => deleteOrder(order.id)}
                                            />
                                        </button>
                                        {addSuccess === true &&
                                            <p><BsFillPatchCheckFill size={25}/> Gelukt met het verwijderen, refresh
                                                pagina</p>}
                                    </td>
                                    <td>{order.user_first_name}</td>
                                    <td>{order.user_last_name}</td>
                                    <td>{order.id}</td>
                                    <td>{JSON.stringify(order.productList)}</td>
                                    <td className="order-datum">{order.orderDate}</td>
                                    <td>{user.address_id}</td>
                                </tr>
                            })}
                            </tbody>
                        </table>
                </section>}
        </>
    )
}

export default OrderOverview;