import { bulkWrite } from '../models/product';
import { stateTaxRate } from '../config/tax';

export function disableProducts(products) {
    let bulkOptions = products.map(item => {
        return {
            updateOne: {
                filter: { _id: item._id },
                update: { isActive: false }
            }
        };
    });

    bulkWrite(bulkOptions);
}

// calculate order tax amount
export function caculateTaxAmount(order) {
    try {
        const taxRate = stateTaxRate;

        order.totalTax = 0;
        if (order.products && order.products.length > 0) {
            order.products.map(item => {
                const price = item.purchasePrice || (item?.product?.price ?? 0);
                const quantity = item.quantity;
                item.totalPrice = price * quantity;
                item.purchasePrice = price;

                if (item.status !== 'Cancelled') {
                    if (item.product?.taxable && item.priceWithTax === 0) {
                        const taxAmount = price * (taxRate / 100) * 100;
                        item.totalTax = parseFloat(
                            Number((taxAmount * quantity).toFixed(2))
                        );

                        order.totalTax += item.totalTax;
                    } else {
                        order.totalTax += item.totalTax;
                    }
                }

                item.priceWithTax = parseFloat(
                    Number((item.totalPrice + item.totalTax).toFixed(2))
                );
            });
        }

        const hasCancelledItems = order.products.filter(
            item => item.status === 'Cancelled'
        );

        if (hasCancelledItems.length > 0) {
            order.total = this.caculateOrderTotal(order);
        }

        const currentTotal = this.caculateOrderTotal(order);

        if (currentTotal !== order.total) {
            order.total = this.caculateOrderTotal(order);
        }

        order.totalWithTax = order.total + order.totalTax;
        order.total = parseFloat(Number(order.total.toFixed(2)));
        order.totalTax = parseFloat(
            Number(order.totalTax && order.totalTax.toFixed(2))
        );
        order.totalWithTax = parseFloat(Number(order.totalWithTax.toFixed(2)));
        return order;
    } catch (error) {
        return order;
    }
}

export function caculateOrderTotal(order) {
    const total = order.products
        .filter(item => item.status !== 'Cancelled')
        .reduce((sum, current) => sum + current.totalPrice, 0);

    return total;
}

// calculate order tax amount
export function caculateItemsSalesTax(items) {
    const taxRate = stateTaxRate;

    const products = items.map(item => {
        item.priceWithTax = 0;
        item.totalPrice = 0;
        item.totalTax = 0;
        item.purchasePrice = item.price;

        const price = item.purchasePrice;
        const quantity = item.quantity;
        item.totalPrice = parseFloat(Number((price * quantity).toFixed(2)));

        if (item.taxable) {
            const taxAmount = price * (taxRate / 100) * 100;

            item.totalTax = parseFloat(Number((taxAmount * quantity).toFixed(2)));
            item.priceWithTax = parseFloat(
                Number((item.totalPrice + item.totalTax).toFixed(2))
            );
        }

        return item;
    });

    return products;
}

export function formatOrders(orders) {
    const newOrders = orders.map(order => {
        return {
            _id: order._id,
            total: parseFloat(Number(order.total.toFixed(2))),
            created: order.created,
            products: order?.cart?.products
        };
    });

    return newOrders.map(order => {
        return order?.products ? this.caculateTaxAmount(order) : order;
    });
}
