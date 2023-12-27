import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduit, fetchProduits } from "../../store/ProduitSlice";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function AddProduit({ produitInfo }) {
  const [code_produit, setCodeProduit] = useState("");
  const [nom, setNom] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [qte_entree, setQteEntree] = useState("");
  const [prix_unitaire, setPrixUnitaire] = useState("");
  const [description, setDescription] = useState("");
  const [categorie_id, setCategorieId] = useState("");
  const [fournisseur_id, setFournisseurId] = useState("");
  const dispatch = useDispatch();
  const handleAdd = () => {
    const basePath = "C:\\fakepath\\";
    const image = imagePath.replace(basePath, "");

    const produit = {
      code_produit,
      nom,
      image,
      qte_entree,
      prix_unitaire,
      description,
      categorie_id,
      fournisseur_id,
    };
    dispatch(addProduit(produit));
    dispatch(fetchProduits(produitInfo.page));
    setCodeProduit("");
    setNom("");
    setQteEntree("");
    setImagePath("");
    setPrixUnitaire("");
    setDescription("");
    setCategorieId("");
    setFournisseurId("");
  };

  return (
    <>
      <button
        type="button"
        class="btn btn-outline-secondary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <FontAwesomeIcon icon={faPlus} />
        Ajouter Produit
      </button>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Ajouter Produit
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
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Code Produit :</label>
                      <input
                        onChange={(e) => setCodeProduit(e.target.value)}
                        value={code_produit}
                        className="form-control"
                      ></input>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Nom :</label>
                      <input
                        onChange={(e) => setNom(e.target.value)}
                        value={nom}
                        className="form-control"
                      ></input>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Quantite Entree :</label>
                      <input
                        onChange={(e) => setQteEntree(e.target.value)}
                        value={qte_entree}
                        className="form-control"
                      ></input>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Prix Unitaire :</label>
                      <input
                        onChange={(e) => setPrixUnitaire(e.target.value)}
                        value={prix_unitaire}
                        className="form-control"
                      ></input>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
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
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Fournisseur :</label>
                      <select
                        onChange={(e) => setFournisseurId(e.target.value)}
                        value={fournisseur_id}
                        className="form-select"
                      >
                        <option value="">Sélectionner un Fournisseur</option>
                        {produitInfo.fournisseurs.map((fournisseur) => (
                          <option key={fournisseur.id} value={fournisseur.id}>
                            {fournisseur.nom}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Image :</label>
                      <input
                        type="file"
                        onChange={(e) => setImagePath(e.target.value)}
                        value={imagePath}
                        className="form-control"
                        id="customFile"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Description :</label>
                      <input
                        type="text-aria"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        className="form-control"
                      ></input>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Fermer
              </button>
              <button
                data-bs-dismiss="modal"
                onClick={handleAdd}
                type="button"
                class="btn btn-primary"
              >
                Ajouter Produit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
