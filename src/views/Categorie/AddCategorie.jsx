import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCategorie, fetchCategories } from "../../store/CategorieSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function AddCategorie({info}) {
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const handleAdd = () => {
    const categorie = {nom, description};
    dispatch(addCategorie(categorie));
    dispatch(fetchCategories(info.page))
  };
  
  return (
    <>
      <button
        type="button"
        class="btn btn-outline-secondary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <FontAwesomeIcon icon={faPlus}/>
        Ajouter Categorie
      </button>

      <div
        class="modal fade"
        id="exampleModal"
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
                  <label className="form-label">Nom :</label>
                  <input
                    onChange={(e) => setNom(e.target.value)}
                    value={nom}
                    className="form-control"
                  ></input>
                </div>
                <div className="mb-3">
                  <label className="form-label">Description :</label>
                  <input
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
              onClick={handleAdd} type="button" class="btn btn-primary">
                Ajouter Categorie
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
