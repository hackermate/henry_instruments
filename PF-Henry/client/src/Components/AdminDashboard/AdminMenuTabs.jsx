import React /*useState*/ from "react";
// import { useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
import AdminManageCategories from "./ManageComponents/Categories/AdminManageCategories";
import AdminManageUsers from "./ManageComponents/Users/AdminManageUsers";
import AdminManageOrders from "./ManageComponents/Orders/AdminManageOrders";
import AdminManageProducts from "./ManageComponents/Products/AdminManageProducts";
import AdminManageStore from "./ManageComponents/Store/AdminManageStore";

export default function AdminMenuTabs() {
    // const dispatch = useDispatch();

    ////ESTADOS/////

    ////RENDER////
    return (
        <div>
            <ul
                className="nav nav-tabs justify-content-center"
                id="myTab"
                role="tablist"
            >
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link active"
                        id="store-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#store-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="store-tab-pane"
                        aria-selected="true"
                    >
                        Store
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link"
                        id="products-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#products-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="products-tab-pane"
                        aria-selected="false"
                    >
                        Products
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link"
                        id="categories-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#categories-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="categories-tab-pane"
                        aria-selected="true"
                    >
                        Categories
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link"
                        id="users-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#users-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="users-tab-pane"
                        aria-selected="true"
                    >
                        Users
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link"
                        id="orders-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#orders-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="orders-tab-pane"
                        aria-selected="true"
                    >
                        Orders
                    </button>
                </li>
            </ul>
            <div
                className="tab-content  justify-content-center"
                id="myTabContent"
            >
                <div
                    className="tab-pane fade show active  justify-content-center"
                    id="store-tab-pane"
                    role="tabpanel"
                    aria-labelledby="store-tab"
                    tabIndex={0}
                >
                    <div className="">
                        <h2 className="text-center">EDIT STORE</h2>
                        <hr />
                        <br />
                        <AdminManageStore />
                    </div>
                </div>
                <div
                    className="tab-pane fade justify-content-center"
                    id="products-tab-pane"
                    role="tabpanel"
                    aria-labelledby="products-tab"
                    tabIndex={0}
                >
                    <h2 className="text-center">MANAGE PRODUCTS</h2>

                    <hr />

                    <AdminManageProducts />
                </div>
                <div
                    className="tab-pane fade"
                    id="categories-tab-pane"
                    role="tabpanel"
                    aria-labelledby="categories-tab"
                    tabIndex={0}
                >
                    <h2 className="text-center">EDIT CATEGORIES</h2>

                    <hr />
                    <br />
                    <AdminManageCategories />
                </div>
                <div
                    className="tab-pane fade justify"
                    id="users-tab-pane"
                    role="tabpanel"
                    aria-labelledby="users-tab"
                    tabIndex={0}
                >
                    <h2 className="text-center">USERS MANAGEMENT</h2>

                    <hr />
                    <br />
                    <AdminManageUsers />
                </div>
                <div
                    className="tab-pane fade"
                    id="orders-tab-pane"
                    role="tabpanel"
                    aria-labelledby="orders-tab"
                    tabIndex={0}
                >
                    <h2 className="text-center">ORDERS MANAGEMENT</h2>

                    <hr />
                    <br />
                    <AdminManageOrders />
                </div>
            </div>
        </div>
    );
}
