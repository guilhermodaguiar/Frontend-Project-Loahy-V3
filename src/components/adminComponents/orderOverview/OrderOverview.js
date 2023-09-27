import './OrderOverview.css';

import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../../context/AuthContext";
import {FaRegListAlt} from "react-icons/fa";
import {useHistory} from "react-router-dom";
import {BsFillPatchCheckFill} from "react-icons/bs";
import RemoveButton from "../../buttonComponents/removeButton/RemoveButton";

function OrderOverview() {
    const history = useHistory();
    const token = localStorage.getItem('token');
    const {user} = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [addSuccess, toggleAddSuccess] = useState(false);


    useEffect(() => {
        const controller = new AbortController();

        async function fetchOrders() {
            try {
                const response = await axios.get(`http://localhost:8080/orders`, {
                    headers: {
                        "Content-Type": "application/json", "Authorization": `Bearer ${token}`,
                    }
                });
                setOrders(response.data);
                console.log(response.data);
            } catch (e) {
                console.error('Error: Er is iets misgegaan met het ophalen van order data!', e);
            }
        }

        fetchOrders();
        return function cleanup() {
            controller.abort();
        }

    }, [token]);

    async function deleteOrder(orderId) {
        try {
            await axios.delete(`http://localhost:8080/orders/${orderId}`, {
                headers: {
                    "Content-Type": "application/json", "Authorization": `Bearer ${token}`,
                }
            });
            toggleAddSuccess(true);
            history.push('/admin/profile/#admin_product_overview');
        } catch (e) {
            console.error(e, 'er is iets misgegaan')
        }
    }

    function removeOrder(order) {
        const newOrders = orders.filter((i) => i.orderId !== order.orderId);
        setOrders(newOrders);
    }


    return (<>
        {user.roles !== "ROLE_ADMIN" ? <h3>Moet ingelogd zijn als Admin</h3> : <section id="all_orders">
            <div>
                <h2>
                    Orders&nbsp;<FaRegListAlt/>
                </h2>
            </div>
            <table>
                <thead>
                <tr>
                    <th></th>
                    <th>Email</th>
                    <th>order#</th>
                    <th>Order</th>
                    <th>Datum</th>
                    <th>Comment</th>
                    <th>Verzend adres</th>
                </tr>
                </thead>
                <tbody>

                {orders.map((order) => {
                    return <tr key={order.orderId}>
                        <td>
                            <RemoveButton onClick={() => {
                                deleteOrder(order.orderId).then();
                                removeOrder(order)
                            }}/>
                            {addSuccess === true &&
                                <p><BsFillPatchCheckFill size={25}/> Gelukt met het verwijderen</p>}
                        </td>
                        <td>{order.email.email}</td>
                        <td>{order.orderId}</td>
                        <td>{order.productList}</td>
                        <td>{order.orderDate}</td>
                        <td>{order.comment}</td>
                        <td>{order.email.address.streetName + ", "}
                            {order.email.address.houseNumber + ", "}
                            {order.email.address.houseNumberAddition + ", "}
                            {order.email.address.city + ", "}
                            {order.email.address.zipcode}
                        </td>
                    </tr>
                })}
                </tbody>
            </table>
        </section>}
    </>)
}

export default OrderOverview;