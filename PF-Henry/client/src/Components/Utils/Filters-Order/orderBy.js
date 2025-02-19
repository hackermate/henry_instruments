////Orden por ID////

export function orderID(array) {
    let result = array?.sort((a, b) => {
        if (parseInt(a.id) > parseInt(b.id)) {
            return 1;
        }
        if (parseInt(a.id) < parseInt(b.id)) {
            return -1;
        }

        return 0;
    });
    return result;
}

////ORDEN POR ALPHA////

export function orderAlphaAZ(array) {
    let result = array?.sort((a, b) => {
        if (a.name > b.name) {
            return 1;
        }
        if (a.name < b.name) {
            return -1;
        }

        return 0;
    });
    return result;
}

export function orderAlphaZA(array) {
    let result = array
        .sort((a, b) => {
            if (a.name > b.name) {
                return 1;
            }
            if (a.name < b.name) {
                return -1;
            }

            return 0;
        })
        .reverse();
    return result;
}

/////ORDER PRICE ////

export function orderPriceAsc(array) {
    let result = array.sort((a, b) => {
        if (parseFloat(a.price) > parseFloat(b.price)) {
            return 1;
        }
        if (parseFloat(a.price) < parseFloat(b.price)) {
            return -1;
        }

        return 0;
    });
    return result;
}

export function orderPriceDesc(array) {
    let result = array.sort((a, b) => {
        if (parseFloat(a.price) < parseFloat(b.price)) {
            return 1;
        }
        if (parseFloat(a.price) > parseFloat(b.price)) {
            return -1;
        }

        return 0;
    });
    return result;
}
////ORDER RATING////
export function orderRatingAsc(array) {
    let result = array.sort((a, b) => {
        if (parseFloat(a.rating) > parseFloat(b.rating)) {
            return 1;
        }
        if (parseFloat(a.rating) < parseFloat(b.rating)) {
            return -1;
        }

        return 0;
    });
    return result;
}

export function orderRatingDesc(array) {
    let result = array.sort((a, b) => {
        if (parseFloat(a.rating) < parseFloat(b.rating)) {
            return 1;
        }
        if (parseFloat(a.rating) > parseFloat(b.rating)) {
            return -1;
        }

        return 0;
    });
    return result;
}

export function orderBy(e, array, localProducts) {
    let sorted = [];
    if (localProducts === undefined) {
        sorted = [];
    }
    if (localProducts[0] === "Product Not Found") {
        sorted = array;
    }
    if (e === "-") {
        sorted = orderID(array);
    }
    if (e === "A-Z") {
        sorted = orderAlphaAZ(array);
    }
    if (e === "Z-A") {
        sorted = orderAlphaZA(array);
    }
    if (e === "priceAsc") {
        sorted = orderPriceAsc(array);
    }
    if (e === "priceDesc") {
        sorted = orderPriceDesc(array);
    }
    if (e === "ratingAsc") {
        sorted = orderRatingAsc(array);
    }
    if (e === "ratingDesc") {
        sorted = orderRatingDesc(array);
    }

    return sorted;
}
