import { React, useState } from "react";
import * as model from "../service/model";
import DisplayPicture from "./displayPicture";

import "./updateProduct.css";
function UpdateProduct({product}){
    const [productInfo, setProductInfo] = useState(product);
    const [imgURL, setImgURL] = useState([]);
    const [sendFiles, setSendFiles] = useState({});

    const handleProductChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setProductInfo(values => ({...values, [name]: value}))
    }

    const handleSubmitImages = (event) => {
        event.preventDefault();
        model.updateProductImages(productInfo, sendFiles);
    }

    const handleSubmitProduct = (event) => {
        event.preventDefault();
        model.updateProduct(productInfo);
    }

    const handleDeleteProduct = (event) => {
        event.preventDefault();
        model.deleteProduct(productInfo);
    }

    const handleSubmitPicturesProductChange = (event) => {
        let files = event.target.files;
        setSendFiles(files);
        let linksList = [];
        [].forEach.call(event.target.files, function(file) {
          if (/image\/.*/.test(file.type)) {   // use any image format the browser can read
            linksList.push((URL || window.webkitURL).createObjectURL(file));
          }
        });
        setImgURL(linksList); 
      };

    return(
        <div className="updateProductContainer">
            <div className="updateProductElement">
                <label>
                    Está no carrosel: <br />
                    <select name="isOnCarousel"
                    onChange={handleProductChange}
                    value = {productInfo.isOnCarousel}
                > 
                    <option value="no">Não</option>
                    <option value="yes">Sim</option>
                </select>  
                </label>
            </div>

            <div className="updateProductElement">
                <label>
                    Nome: <br />
                    <input 
                        type = "text" 
                        id = {"name" + productInfo.id}
                        name="name" 
                        value = {productInfo.name}
                        onChange={handleProductChange}
                    />
                </label>
            </div>

            <div className="updateProductElement">
                <label>
                    Descrição curta:
                    <br />
                    <textarea 
                        id = {"shortDescription" + productInfo.id}
                        name = "shotDescription"
                        value = {productInfo.shortDescription}
                        onChange = {handleProductChange}
                    />
                </label>
            </div>

            <div className="updateProductElement">
                <label>
                    Descrição Longa
                    <br />
                    <textarea
                        name="productLongDescript"
                        value={productInfo.longDescription}
                        onChange={handleProductChange}
                    />
                      
                </label>
            </div>

            <div className="updateProductElement">
                <label>
                    Área útil:
                    <br />
                    <input 
                    type="number" 
                    name="usefulArea" 
                    value={productInfo.usefulArea} 
                    onChange={handleProductChange}
                    />
              </label>
            </div>

            <div className="updateProductElement">
                <label>
                    Área bruta:
                    <br />
                    <input 
                    type="number" 
                    name="grossArea" 
                    value={productInfo.grossArea} 
                    onChange={handleProductChange}
                    />
                </label>
            </div>

            <div className="updateProductElement">
                <label>
                    Área do terreno:
                    <br />
                    <input 
                    type="number" 
                    name="landArea" 
                    value={productInfo.landArea} 
                    onChange={handleProductChange}
                    />
                </label> 
            </div>

            <div className="updateProductElement">        
                <label>
                    Endereço:
                    <br />
                    <textarea 
                    name="address" 
                    value={productInfo.address} 
                    onChange={handleProductChange}
                    />
                </label>
            </div>

            <div className="updateProductElement">
            <label>
                Preço:
                <br />
              <input 
                type="number" 
                name="price" 
                value={productInfo.price} 
                onChange={handleProductChange}
              />
              </label>
            </div>

            <div className="updateProductElement">
                <label>
                    Google Map link:
                    <br />
                    <input 
                    type="text" 
                    name="mapLink" 
                    value={productInfo.mapLink} 
                    onChange={handleProductChange}
                    />
                </label>
            </div>

            <div className="updateProductElement">
                <label> 
                    Tipo de casa:
                    <br />
                    <select name="type"
                    onChange={handleProductChange}
                    value = {productInfo.type}
                    > 
                    <option value="">Escolha</option>
                    <option value="terreno">Terreno</option>
                    <option value="casa">Casa</option>
                    <option value="apartamento">Apartamento</option>
                    <option value="kitnet">Kitnet</option>
                    </select>
                </label>
            </div>

            <div className="updateProductElement">
                <label> 
                    Venda ou aluguel:
                    <br />
                <select name="saleOrRent"
                    onChange={handleProductChange}
                    value = {productInfo.saleOrRent}
                > 
                    <option value="">Escolha</option>
                    <option value="venda">Venda</option>
                    <option value="aluguel">Aluguel</option>
                </select>                
                </label>
            </div>
            
            <div className="updateProductElement">
                <button onClick={handleSubmitProduct}> Atualizar o Produto</button>
            </div>

            <div className="updateProductElement">
                <button onClick={handleDeleteProduct}> DELETAR PRODUTO</button>
            </div>

            <div className="updateProductElement">
                <label> Escolha as fotos:
                <input id="fotos" type="file" multiple="multiple" onChange={handleSubmitPicturesProductChange}/>

                <button onClick={handleSubmitImages}> CONFIRMAR MUDAR FOTOS</button>
              </label>
              <div className="selectedImageList">{imgURL.map((link, index) => <DisplayPicture key={index} imgLink={link} containerClassName="admImgContainer" imgClassName="admImg"/>)}</div>
            </div>


        </div>
    );
}

export default UpdateProduct;