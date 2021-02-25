import { checkStock } from './index';

const checkStocks = async() => {
    try {
        console.log(await checkStock('LTV719449/39/39'));
    } catch (e) {
        console.log(e);
    }
}

checkStocks();
