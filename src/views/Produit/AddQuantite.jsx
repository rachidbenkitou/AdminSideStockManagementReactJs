import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { addproductQuantite } from "../../store/ProduitSlice";

export default function AddQuantite({ produitInfo }) {
  const [code_produit, setCodeProduit] = useState(produitInfo.code_produit);
  const [nom, setNom] = useState(produitInfo.nom);
  const [produitId, setProduitId] = useState(produitInfo.id);
  const [qte_entree, setQteEntree] = useState("");
  const [fournisseur_id, setFournisseurId] = useState("");
  const dispatch = useDispatch();
  const handleAdd = () => {
    dispatch(addproductQuantite({ qte_entree, produitId, fournisseur_id }));
  };

  return (
    <>
      <button
        type="button"
        class="bg-light outline-non border-0"
        data-bs-toggle="modal"
        data-bs-target={"#exampleModal" + produitInfo.id}
      >
        <span class="wishlist bg-success">
          <FontAwesomeIcon icon={faPlus} />
        </span>
      </button>

      <div
        class="modal fade"
        id={"exampleModal" + produitInfo.id}
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
              Ajouter Quantite
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
                    value={code_produit}
                    className="form-control"
                    disabled
                  ></input>
                </div>
                <div className="mb-3">
                  <label className="form-label">Nom :</label>
                  <input value={nom} className="form-control" disabled></input>
                </div>
                <div className="mb-3">
                  <label className="form-label">Quantite Entree :</label>
                  <input
                    onChange={(e) => setQteEntree(e.target.value)}
                    value={qte_entree}
                    className="form-control"
                  ></input>
                </div>
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
              onClick={handleAdd} type="button" class="btn btn-primary">
                Ajouter Qauntite
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
