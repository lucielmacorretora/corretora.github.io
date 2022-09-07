import React from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import * as model from "../../service/model";
import '../../index.css';

import Menu from "../../components/menu";

const auth = getAuth();
var currentUrl = window.location.href.toLowerCase();
if(currentUrl.includes("administrar")){
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    if(uid !== "AQ6y7NrXvMRQR1iOqmQZ4cGsNFk1"){
        model.logout();
    }
  } else {
    window.location.replace("/");
  }
});
}

function Administrar(){
  const [productInputs, setProductInputs] = useState({});

  const handleProductChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setProductInputs(values => ({...values, [name]: value}))
  }

  const handleSubmitProduct = (event) => {
    event.preventDefault();
    console.log(productInputs);
  }
  
  const handleSubmitPicturesProductChange = (event) => {
    event.preventDefault();
    let firstFile = event.target.files[0];
    console.log(firstFile);

    console.log(event.target.files);
  }

  return (
    <div>
      <Menu />
      <h1> Entrei no administrador </h1>

      <div>
        <h2> Cadastrar Produto</h2>
          <button value="saveProductsHolder" onClick={ v => model.openOrHide(v.target.value)}>
            Esconder/Mostrar Cadastrar Produtos
          </button>
          <div id="saveProductsHolder">
            <form onSubmit={handleSubmitProduct}>
              <label>Nome do produto:
              <input 
                type="text" 
                name="productName" 
                value={productInputs.productName || ""} 
                onChange={handleProductChange}
              />
              </label>
              <br />

              <label>Descrição curta:
              <textarea 
                name="productShortDescription" 
                value={productInputs.productShortDescription || ""} 
                cols="50"
                onChange={handleProductChange}
              />
              </label>
              <br />

              <label>Descrição Longa:
              <textarea 
                name="producLongDescription" 
                value={productInputs.producLongDescription || ""} 
                cols="50"
                onChange={handleProductChange}
              />
              </label>
              <br />

              <label>Área útil:
              <input 
                type="number" 
                name="usefulArea" 
                value={productInputs.usefulArea || ""} 
                onChange={handleProductChange}
              />
              </label>
              <br />

              <label>Área bruta:
              <input 
                type="number" 
                name="grossArea" 
                value={productInputs.grossArea || ""} 
                onChange={handleProductChange}
              />
              </label>
              <br />

              <label>Área do terreno:
              <input 
                type="number" 
                name="landArea" 
                value={productInputs.landArea || ""} 
                onChange={handleProductChange}
              />
              </label>
              <br />

              <label>Endereço:
              <textarea 
                name="address" 
                value={productInputs.address || ""} 
                cols="50"
                onChange={handleProductChange}
              />
              </label>
              <br />

              <label>Preço:
              <input 
                type="number" 
                name="price" 
                value={productInputs.price || ""} 
                onChange={handleProductChange}
              />
              </label>
              <br />

              <label>Google Map link:
              <input 
                type="text" 
                name="mapLink" 
                value={productInputs.mapLink || ""} 
                onChange={handleProductChange}
              />
              </label>
              <br />

              <label> Tipo de casa:
              <select name="type"
                onChange={handleProductChange}
              > 
                <option value="">Escolha</option>
                <option value="terreno">Terreno</option>
                <option value="casa">Casa</option>
                <option value="apartamento">Apartamento</option>
                <option value="kitnet">Kitnet</option>
              </select>
              </label>
              <br />

              <label> Venda ou aluguel:
              <select name="saleOrRent"
                onChange={handleProductChange}
              > 
                <option value="">Escolha</option>
                <option value="venda">Venda</option>
                <option value="aluguel">Aluguel</option>
              </select>                
              </label>
              <br />

              <label> Escolha as fotos:
                <input type="file" name="pictures"
                  id="pictures"
                  value={productInputs.pictures || ""}
                  onChange={(e) =>handleSubmitPicturesProductChange(e)}
                  accept="image/png, image/jpeg" 
                  multiple="multiple"
                  />
              </label>
              <br />
              <input type="submit" />
            </form>
          </div>
        </div>
      </div>
    );
}
export default Administrar;