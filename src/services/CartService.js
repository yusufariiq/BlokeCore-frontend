export class CartService {
    static calculateDiscountedPrice(price, discount) {
        if (!discount || discount <= 0) return price;
        return price * (1 - discount / 100);
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

    static calculateCartTotal(cartItems, products) {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product.id === items);
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        const basePrice = itemInfo.price;
                        const discountedPrice = this.calculateDiscountedPrice(basePrice, itemInfo.discount);
                        totalAmount += discountedPrice * cartItems[items][item];
                    }
                } catch (error) {
                    console.error('Error calculating cart total:', error);
                }
            }
        }
        return totalAmount;
    }
}