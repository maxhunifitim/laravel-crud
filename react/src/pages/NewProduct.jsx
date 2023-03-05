import axios from "axios";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";

export default function NewProduct() {
    const nameRef = useRef();
    const priceRef = useRef();
    const navigate = useNavigate();

    const [errors, setErrors] = useState(null);

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            name: nameRef.current.value,
            price: priceRef.current.value,
        };

        console.log("PayLoad: ", payload);

        axiosClient
            .post("/add_new", payload)
            .then(({ data }) => {
                navigate("/products");
            })
            .catch((err) => {
                console.log("Error");
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    };
    return (
        <div className="login-signup-form animated fadeIndDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">Add Product</h1>
                    {errors && (
                        <div className="alert">
                            {Object.keys(errors).map((key) => (
                                // console.log(errors[key][0]);

                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    )}
                    <input
                        ref={nameRef}
                        type="text"
                        placeholder="Product Name"
                    />
                    <input ref={priceRef} type="number" placeholder="Price" />

                    <button className="btn btn-block">Add</button>
                </form>
            </div>
        </div>
    );
}
