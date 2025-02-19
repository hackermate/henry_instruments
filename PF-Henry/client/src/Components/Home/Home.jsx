import React from "react";
import Carousel from "../Carousel/Carousel";
import SearchBar from "../SearchBar/SearchBar.jsx";
import { getProducts, getCategories } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CardGrid from "../CardGrid/CardGrid";

//import ShoppingCart from "../ShoppingCart/ShoppingCart.jsx";
//let styleCard = { width: "18rem" };

export default function Home() {
    //// DISPATCH ////
    const dispatch = useDispatch();

    //// ESTADOS GLOBALES ////
    const { allProducts, allCategories } = useSelector((state) => state);

    //// ESTADOS LOCALES ////
    const [localProducts, setLocalProducts] = useState([]);
    const [localOrder, setLocalOrder] = useState("-");

    ////HOOKS////
    useEffect(() => {
        dispatch(getProducts());
        dispatch(getCategories());
    }, [dispatch]);

    useEffect(() => {
        setLocalProducts(allProducts);
    }, [allProducts]);

    /*
    useEffect(() => {
        let arr = orderBy(localOrder, [...localPokemons]);
        setLocalPokemons(arr);
    }, [localOrder]);
    */

    return (
        <div>
            <Carousel />

            <div className="container  tw-rounded-lg">
                <SearchBar
                    localProducts={localProducts}
                    setLocalproducts={setLocalProducts}
                    localOrder={localOrder}
                    setLocalOrder={setLocalOrder}
                    allProducts={allProducts}
                    allCategories={allCategories}
                />
            </div>
            <div>
                <CardGrid localProducts={localProducts} />
            </div>
        </div>
    );
}
