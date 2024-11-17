export class CartService {
    static calculateCartTotal(cartItems, products) {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product.id === items);
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {
                    console.error('Error calculating cart total:', error);
                }
            }
        }
        return totalAmount;
    }

    static calculateCartCount(cartItems) {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    console.error('Error calculating cart count:', error);
                }
            }
        }
        return totalCount;
    }
}