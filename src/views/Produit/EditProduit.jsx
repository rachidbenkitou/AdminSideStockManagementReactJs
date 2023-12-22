import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduit, updateProduit } from "../../store/ProduitSlice";
import {
  fetchAllFournisseurs,
  selectFournisseurs,
} from "../../store/FournisseurSlice";
import {
  fetchAllCategories,
  selectCategories,
} from "../../store/CategorieSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
export default function EditProduit({ produitInfo }) {
  // const categories = useSelector(selectCategories);
  const [code_produit, setCodeProduit] = useState(produitInfo.code_produit);
  const [nom, setNom] = useState(produitInfo.nom);
  const [imagePath, setImagePath] = useState("");
  const [quantite, setQuantite] = useState(produitInfo.quantite);
  const [prix_unitaire, setPrixUnitaire] = useState(produitInfo.prix_unitaire);
  const [description, setDescription] = useState(produitInfo.description);
  const [categorie_id, setCategorieId] = useState("");
  const [id, setId] = useState(produitInfo.id);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchAllFournisseurs());
  //   dispatch(fetchAllCategories());
  // }, [dispatch]);
  const handleAdd = () => {
    const basePath = "C:\\fakepath\\";
    const image = imagePath.replace(basePath, "");

    const produit = {
        "id": id,
        "code_produit": code_produit,
        "nom": nom,
        "image": image,
        "quantite": quantite,
        "prix_unitaire": prix_unitaire,
        "description": description,
        "categorie_id": categorie_id
    };
    console.log(produit);
    dispatch(updateProduit({produit}));
  };

  return (
    <>
      <button
        type="button"
        class="bg-light outline-non border-0"
        data-bs-toggle="modal"
        data-bs-target={"#exampleModal" + produitInfo.code_produit}
      >
        <span class="wishlist bg-primary">
          <FontAwesomeIcon icon={faEdit} />
        </span>
      </button>

      <div
        class="modal fade"
        id={"exampleModal" + produitInfo.code_produit}
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Code Produit :</label>
                  <input
                    onChange={(e) => setCodeProduit(e.target.value)}
                    value={code_produit}
                    className="form-control"
                  ></input>
                </div>
                <div className="mb-3">
                  <label className="form-label">Nom :</label>
                  <input
                    onChange={(e) => setNom(e.target.value)}
                    value={nom}
                    className="form-control"
                  ></input>
                </div>
                <div className="mb-3">
                  <label className="form-label">Prix Unitaire :</label>
                  <input
                    onChange={(e) => setPrixUnitaire(e.target.value)}
                    value={prix_unitaire}
                    className="form-control"
                  ></input>
                </div>
                <div className="mb-3">
                  <label className="form-label">Quantite :</label>
                  <input
                    value={quantite}
                    className="form-control"
                    disabled
                  ></input>
                </div>
                <div className="mb-3">
                  <label className="form-label">Catégorie :</label>
                  <select
                    onChange={(e) => setCategorieId(e.target.value)}
                    value={categorie_id}
                    className="form-select"
                  >
                    <option value="">Sélectionner une catégorie</option>
                    {produitInfo.categories.map((categorie) => (
                      <option key={categorie.id} value={categorie.id}>
                        {categorie.nom}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Image :</label>
                  {/* <input
                    type="text-aria"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    className="form-control"
                  ></input> */}
                  <input
                    type="file"
                    onChange={(e) => setImagePath(e.target.value)}
                    value={imagePath}
                    class="form-control"
                    id="customFile"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description :</label>
                  <input
                    type="text-aria"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    className="form-control"
                  ></input>
                </div>
              </form>
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                data-bs-dismiss="modal"
                onClick={handleAdd}
                type="button"
                class="btn btn-primary"
              >
                Modifier Produit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
