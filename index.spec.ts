import * as fs from "fs";
import { checkStock } from "./index";

let input = "LTV719449/39/39";

describe("checkStock", () => {
    test("Should call to read the data from stock.json and transactions.json", async () => {
        const spy = jest.spyOn(fs, "readFileSync");

        await checkStock(input);
        expect(spy.mock.calls).toEqual([["data/stock.json", "utf-8"], ["data/transactions.json", "utf-8"]]);
    });

    test("Should return the correct qty and sku code", async () => {
        const expected = {
            "qty": 8510, "sku": "LTV719449/39/39"
        };

        const res = await checkStock("LTV719449/39/39");
        expect(res).toEqual(expected);
    });

    test("Should log an error if the SKU does not exist", async () => {
        const sku = "NoSKU";
        expect(async() => await checkStock(sku)).rejects.toThrow(`No records found for ${sku}`);
    });
});
