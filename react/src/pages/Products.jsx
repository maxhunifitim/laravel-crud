import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axiosClient from "../axios-client";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getProducts();
    }, []);

    const onDeleteClick = (product) => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }
        axiosClient.delete(`/delete_product/${product.id}`).then(() => {
            getProducts();
        });
    };

    const getProducts = () => {
        setLoading(true);
        axiosClient
            .get("/get_all_products")
            .then(({ data }) => {
                setLoading(false);
                setProducts(data.products);
            })
            .catch(() => {
                setLoading(false);
            });
    };
    return (
        <div>
            <div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <h1>Products</h1>
                    <Link className="btn-add" to="/products/add_new">
                        Add new
                    </Link>
                </div>
                <div className="card animated fadeInDown">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Create Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        {loading && (
                            <tbody>
                                <tr>
                                    <td colSpan="5" className="text-center">
                                        Loading...
                                    </td>
                                </tr>
                            </tbody>
                        )}
                        {!loading && (
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.name}</td>
                                        <td>${product.price}</td>
                                        <td>{product.created_at}</td>
                                        <td>
                                            <Link
                                                className="btn-edit"
                                                to={
                                                    "/products/edit/" +
                                                    product.id
                                                }
                                            >
                                                Edit
                                            </Link>
                                            &nbsp;
                                            <button
                                                className="btn-delete"
                                                onClick={(ev) =>
                                                    onDeleteClick(product)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        )}
                    </table>
                </div>
            </div>
        </div>
    );
}
