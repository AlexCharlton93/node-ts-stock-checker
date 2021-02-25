import * as fs from "fs";
import { Stock, Stocks, Transaction, REFUND } from "./constants";

export const checkStock = async(sku: string) => {
    const stock: Stock = JSON.parse(fs.readFileSync("data/stock.json", "utf-8")).find(
        (stock: Stock) => stock.sku === sku,
    );

    const transactions: Transaction[] = JSON.parse(fs.readFileSync("data/transactions.json", "utf-8")).filter(
        (transaction: Transaction) => transaction.sku === sku,
    );

    if (!stock && !transactions.length) {
        return new Promise((resolve, reject) => { 
            reject(`No records found for ${sku}`);
        });
    }

    let qty: number = _calculateStock(stock ? stock.stock : 0, transactions);

    return await new Promise<Stocks>((resolve) => {
        resolve({
            sku,
            qty
        });
    });
}

const _calculateStock = (currentQuantity: number, transactions: Transaction[]) => {
    transactions.forEach((transaction: Transaction) => {
        transaction.type === REFUND
            ? (currentQuantity += transaction.qty)
            : (currentQuantity -= transaction.qty);
    });

    return currentQuantity;
};
