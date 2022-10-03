import { React, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import * as model from "../../service/model";
import Menu from "../../components/menu";
import DisplayPicture from "../../components/displayPicture";
import UpdateProduct from "../../components/updateProduct";

import "./administrar.css";
import '../../index.css';



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
    window.location.replace("/#/");
  }
});
}

function Administrar(){
  const [productInputs, setProductInputs] = useState({0: "https://s2.glbimg.com/mYgwlPa7vtIiUk6kROUxJUi2yyo=/0x0:620x413/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2020/a/4/Ik8J1fQYirf6wYRvRJ8Q/2020-03-20-novo-tracker-1.jpg"});
  const [imgURL, setImgURL] = useState([]);
  const [progressPorcent, setPorgessPorcent] = useState([]);
  const [productList, setProductList] = useState([]);

  useEffect(()=>{
    model.getAllProducts(setProductList);
  }, []);

  
  const handleProductChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setProductInputs(values => ({...values, [name]: value}));
  }

  const handleSubmitProduct = (event) => {
    event.preventDefault();
    model.saveProduct(productInputs, setPorgessPorcent, progressPorcent);
    model.getAllProducts(setProductList);
  }
  
  const handleSubmitPicturesProductChange = (event) => {
    let files = event.target.files;
    let inputs = productInputs;
    inputs["files"] = files;
    setProductInputs(inputs);
    let linksList = [];
    [].forEach.call(event.target.files, function(file) {
      if (/image\/.*/.test(file.type)) {   // use any image format the browser can read
        linksList.push((URL || window.webkitURL).createObjectURL(file));
      }
    });
    
    setImgURL(linksList); 
  };

  return (
    <div>
      <Menu />
    <div className="adminContainer">
      <h1> Entrei no administrador </h1>

      <div>
        <h2> Cadastrar Produtos</h2>
        <button value="saveProductsHolder" onClick={ v => model.openOrHide(v.target.value)}>
          Esconder/Mostrar Cadastrar Produtos
        </button>
        <div id="saveProductsHolder">
          <div>
          <label> Escolha as fotos:
            <input id="fotos" type="file" multiple="multiple" onChange={handleSubmitPicturesProductChange}/>
              </label>
              <div className="selectedImageList">{imgURL.map((link, index) => <DisplayPicture key={index} imgLink={link} containerClassName="admImgContainer" imgClassName="admImg"/>)}</div>
          </div>
          <div>
              <label>Nome do produto: <br />
                <input 
                  type="text" 
                  name="productName" 
                  value={productInputs.productName || ""} 
                  onChange={handleProductChange}
                />
              </label>
            </div>

            <div>
              <label>Descrição curta: <br />
                <textarea 
                  name="productShortDescription" 
                  value={productInputs.productShortDescription || ""} 
                  onChange={handleProductChange}
                />
              </label>
            </div>

            <div>
              <label>Descrição Longa: <br />
                <textarea 
                  name="producLongDescription" 
                  value={productInputs.producLongDescription || ""} 
                  onChange={handleProductChange}
                />
              </label>
            </div>

            <div>
              <label>Área útil: <br />
                <input 
                  type="number" 
                  name="usefulArea" 
                  value={productInputs.usefulArea || ""} 
                  onChange={handleProductChange}
                />
              </label>
            </div>

            <div>
              <label>Área bruta: <br />
                <input  
                  type="number" 
                  name="grossArea" 
                  value={productInputs.grossArea || ""} 
                  onChange={handleProductChange}
                />
              </label>
            </div>

            <div>
              <label>Área do terreno: <br />
                <input 
                  type="number" 
                  name="landArea" 
                  value={productInputs.landArea || ""} 
                  onChange={handleProductChange}
                />
              </label>
            </div>

            <div>
              <label>Endereço: <br />
                <textarea 
                  name="address" 
                  value={productInputs.address || ""} 
                  onChange={handleProductChange}
                />
              </label>
            </div>

            <div>
              <label>Preço: <br />
              <input 
                type="number" 
                name="price" 
                value={productInputs.price || ""} 
                onChange={handleProductChange}
              />
              </label>
            </div>

            <div>
              <label>Google Map link: <br />
                <input 
                  type="text" 
                  name="mapLink" 
                  value={productInputs.mapLink || ""} 
                  onChange={handleProductChange}
                />
              </label>
            </div>

            <div>
              <label> Tipo de casa: <br />
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
            </div>

            <div>
              <label> Venda ou aluguel: <br />
              <select name="saleOrRent"
                onChange={handleProductChange}
              > 
                <option value="">Escolha</option>
                <option value="venda">Venda</option>
                <option value="aluguel">Aluguel</option>
              </select>                
              </label>
            </div>

            <div>
              <button onClick={handleSubmitProduct}> Salvar Imovel </button>
            </div>
        </div>

        <h2>Marcar Produto Como Principais / Deletar Produto</h2>
        <button value="updateProductsHolder" onClick={ v => model.openOrHide(v.target.value)}>
          Esconder/Mostrar Atualizar Produto
        </button>
        <div className="updateProductsHolder" id="updateProductsHolder">
          {productList.map((product, index) => <UpdateProduct key={index} product={product}/>)}
        </div>
      </div>
    </div>
    </div>
    );
}
export default Administrar;