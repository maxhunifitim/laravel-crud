import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";

export default function Edit() {
    const navigate = useNavigate();
    let { id } = useParams();
    const [product, setProduct] = useState({
        id: null,
        name: "",
        price: "",
    });
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);

    if (id) {
        useEffect(() => {
            setLoading(true);
            axiosClient
                .get(`/get_edit_product/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setProduct(data.product);
                })
                .catch(() => {
                    setLoading(false);
                });
        }, []);
    }

    const onSubmit = (ev) => {
        ev.preventDefault();
        if (product.id) {
            axiosClient
                .put(`/update_product/${product.id}`, product)
                .then(() => {
                    navigate("/products");
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        }
    };

    return (
        <>
            <div className="login-signup-form animated fadeIndDown">
                <div className="form">
                    {product.id && <h1>Update product: {product.name}</h1>}
                    <div className="card animated fadeInDown">
                        {loading && (
                            <div className="text-center">Loading...</div>
                        )}
                        {errors && (
                            <div className="alert">
                                {Object.keys(errors).map((key) => (
                                    <p key={key}>{errors[key][0]}</p>
                                ))}
                            </div>
                        )}
                        {!loading && (
                            <form onSubmit={onSubmit}>
                                <input
                                    value={product.name}
                                    onChange={(ev) =>
                                        setProduct({
                                            ...product,
                                            name: ev.target.value,
                                        })
                                    }
                                    placeholder="Name"
                                />
                                <input
                                    value={product.price}
                                    onChange={(ev) =>
                                        setProduct({
                                            ...product,
                                            price: ev.target.value,
                                        })
                                    }
                                    placeholder="Price"
                                />

                                <button className="btn">Save</button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
