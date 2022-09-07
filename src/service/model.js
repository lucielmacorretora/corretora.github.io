import { getAuth, onAuthStateChanged } from "firebase/auth";

export class ProductFeatures{
    constructor(name, type, quantity){
        this.name = name;
        this.type = type;
        this.quantity = quantity;
    }
}

export class Product{
    constructor(name, shortDescription, longDescription,
         featuresList, usefulArea, grossArea, landArea, type, address, price, mapLink, saleOrRent){
        this.name = name;
        this.shortDescription = shortDescription;
        this.longDescription = longDescription;
        this.featuresList = featuresList;
        this.usefulArea = usefulArea;
        this.grossArea = grossArea;
        this.landArea = landArea;
        this.type = type;
        this.address = address;
        this.price = price;
        this.mapLink = mapLink;
        this.saleOrRent = saleOrRent;
    }
}

export function logout(){
    const auth = getAuth();
    auth.signOut();
    window.location.replace("/");
}

export function getCarouselImages(){
    
}

export function saveProduct(product){

}

export function hideTag(id){
    document.getElementById(id).classList.add('hide');
}
  
export function appearTag(id){
    document.getElementById(id).classList.remove('hide');
}

export function hasHide(id){
    return document.getElementById(id).classList.contains('hide');
}

export function openOrHide(id){
    console.log(id);
    if(hasHide(id)){
        appearTag(id);
        return;
    }
    hideTag(id);
}

export function getInputValue(id){
    return  document.getElementById(id).value;
}


export default {
    logout, openOrHide, 
    Product, ProductFeatures, getInputValue
};