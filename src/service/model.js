import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref as ref_storage, getDownloadURL, uploadBytesResumable, listAll, deleteObject } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { getDatabase, ref as ref_database, set, get, child} from "firebase/database";

const  storage = getStorage();
const db = getDatabase();
const dbRef  = ref_database(db);

export class ProductFeatures{
    constructor(name, type, quantity){
        this.name = name;
        this.type = type;
        this.quantity = quantity;
    }
}

export class Product{
    constructor(name, shortDescription, longDescription,
         usefulArea, grossArea, landArea, type, address,
         price, mapLink, saleOrRent, imagesLink, id, isOnCarousel){
        this.name = name;
        this.shortDescription = shortDescription;
        this.longDescription = longDescription;
        this.usefulArea = usefulArea;
        this.grossArea = grossArea;
        this.landArea = landArea;
        this.type = type;
        this.address = address;
        this.price = price;
        this.mapLink = mapLink;
        this.saleOrRent = saleOrRent;
        this.imagesLink = imagesLink;
        this.id = id;
        this.isOnCarousel = isOnCarousel;
    }
}

export function logout(){
    const auth = getAuth();
    auth.signOut();
    window.location.replace("/");
}

export function getCarouselImages(id, setImages){
    let pathToFile =  "images/"+ id;
    let i = 0;
    const reference = ref_storage(storage, pathToFile);
        listAll(reference)
        .then((res) => {
            res.items.forEach((itemRef) => {
                getDownloadURL(itemRef)
                .then((url) => {
                  console.log( i +": " + url);
                  i++;
                })
            });
        }).catch((error) =>{
            console.log(error);
    }); 
}

export function saveImagesLink(id){
    let pathToFile =  "images/"+ id;
    let i = 0;
    const reference = ref_storage(storage, pathToFile);
        listAll(reference)
        .then((res) => {
            res.items.forEach((itemRef) => {
                getDownloadURL(itemRef)
                .then((url) => {
                  let referenceLink = "products/" +  id + '/imagesLink/' + i;
                  saveProductImageLink(referenceLink, url);
                  i++;
                })
            });
        }).catch((error) =>{
            console.log(error);
    }); 
}


async function deleteImagesLink(id){
    let referenceText = "products/" + id + "/imagesLink";
    set(ref_database(db, referenceText), {});    
}

async function deleteAllUpdateImages(id){
    await deleteImagesLink(id);
    let pathToFile =  "images/"+ id;
    const reference = ref_storage(storage, pathToFile);
        listAll(reference)
        .then((res) => {
            res.items.forEach((itemRef) => {
                deleteObject(itemRef).then(()=>{
                    console.log("Image deleted");
                })
                .catch((error) => {
                    console.log(error);
                })
            });
        }).catch((error) =>{
            console.log(error);
    }); 
 
}

export async function updateProductImages(product, files){
    const metadata = {
        contentType: 'image/jpeg'
    };
    await deleteAllUpdateImages(product.id);
   
    if (files.length !== 0) {
    for (let i = 0; i < files.length; i++) {
        let referenceText =  "images/"+ product.id + "/" + files[i].name;
        //create a storage reference
        var storageReference = ref_storage(storage, referenceText);

        //upload file
        var upload = uploadBytesResumable(storageReference, files[i], metadata)
        //storage.put(product.files[i]);

        //update progress bar
        upload.on(
          "state_changed",
          function progress(snapshot) {
            //var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          },

          function error() {
            console.log("error uploading file");
          },

          function complete() {
              getDownloadURL(upload.snapshot.ref).then((downloadURL) => {
                  let reference = "products/" +  product.id + '/imagesLink/' + i;
                  saveProductImageLink(reference, downloadURL);
              });
              if(i === files.length){
                  saveImagesLink(product.id);
                  alert("Fotos Atualizadas");
              }
          }
        );}

    } else {
        alert("No file chosen");
    } 
}

export function saveProductImages(product, setProgress, progressState){
    const metadata = {
        contentType: 'image/jpeg'
    };
      
    let progressList = progressState;
    if (product.files.length !== 0) {    
        //Loops through all the selected files
        for (let i = 0; i < product.files.length; i++) {
          let referenceText =  "images/"+ product.id + "/" + product.files[i].name;
          //create a storage reference
          var storageReference = ref_storage(storage, referenceText);
  
          //upload file
          var upload = uploadBytesResumable(storageReference, product.files[i], metadata)
          //storage.put(product.files[i]);
  
          //update progress bar
          upload.on(
            "state_changed",
            function progress(snapshot) {
              var percentage =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                progressList.push(percentage);
                setProgress(progressList);
            },
  
            function error() {
              alert("error uploading file");
            },
  
            function complete() {
                getDownloadURL(upload.snapshot.ref).then((downloadURL) => {
                    let reference = "products/" + product.id + '/imagesLink/' + i;
                    saveProductImageLink(reference, downloadURL);
                });
                if(i === product.files.length){
                    alert("Produto Salvo");
                }
            }
          );
        }
    } else {
        alert("No file chosen");
    }
}

export function saveProduct(product, setProgress, progressState){
    let uid  = uuidv4();
    let productInfo;
    try{
        productInfo = new Product(product.productName, product.productShortDescription,product.producLongDescription,
        product.usefulArea, product.grossArea,
        product.landArea, product.type, product.address,
        product.price, product.mapLink, product.saleOrRent, [], uid, "no");

    }catch(err){
        alert("FALTOU Preencher algo");
        console.log(err);
    }
    saveProductImages(product, setProgress, progressState);

    let reference = "products/" + uid;
    set(ref_database(db, reference), productInfo).then(()=>{
        alert("Produto Salvo");
    });
   
}

export function updateProduct(product){
    let reference = "products/" + product.id;
    set(ref_database(db, reference), product).then(()=>{
        alert("Produto " + product.name + " Atualizado");
    });
}

export function deleteAllImages(id){
    let pathToFile =  "images/"+ id;
    const reference = ref_storage(storage, pathToFile);
    listAll(reference)
        .then((res) => {
            res.items.forEach((itemRef) => {
                console.log(itemRef._location.path_);
                deleteObject(itemRef).then(()=>{
                    console.log("Image deleted");
                }).catch((error) => {
                    console.log(error);
                })
            });
        }).catch((error) =>{
            console.log(error);
    });
}

export function deleteProduct(product){
    let reference = "products/" + product.id;
    const id = product.id;
    set(ref_database(db, reference), {}).then(()=>{
        alert("Produto " + product.name + " Deletado");
    });
    deleteAllImages(id);
}

function saveProductImageLink(referenceText, link){
    set(ref_database(db, referenceText), link);
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

export function getAllProducts(setProducts){
    get(child(dbRef, "products/")).then((snapshot) => {
        if (snapshot.exists()) {
            let result = [];
            snapshot.forEach((child)=>{
                result.push(child.val());
            })
            setProducts(result);
        } else {
          console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}

export default {
    logout, openOrHide, saveProductImages, getAllProducts,
    Product, ProductFeatures, getInputValue, saveProduct, getCarouselImages,
    updateProduct, deleteProduct, deleteAllImages, updateProductImages
};