module.exports =  (temp, product)=>{

    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName) ;  
    output = output.replace(/{%IMAGE%}/g, product.image) ;
    output = output.replace(/{%PRICE%}/g, product.price) ;
    output = output.replace(/{%FROM%}/g, product.from) ;
    output = output.replace(/{%MATERIAL%}/g, product.material) ;
    output = output.replace(/{%QUANTITY%}/g, product.quantity) ;
    output = output.replace(/{%DESCRIPTION%}/g, product.description) ;
    output = output.replace(/{%ID%}/g, product.id) ;

    if(!product.available) output = output.replace(/{%UNAVAILABLE%}/g, 'unavailable') ;
    return output;
    
}