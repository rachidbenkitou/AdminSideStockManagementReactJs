import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateCategorie } from "../../store/CategorieSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
export default function EditCategorie({categorieInfo}) {
  const [nom, setNom] = useState(categorieInfo.nom);
  const [description, setDescription] = useState(categorieInfo.description);
  const dispatch = useDispatch();
  const handleUpdate = () => {
    const id = categorieInfo.id
    const categorie = {id, nom, description};
    dispatch(updateCategorie(categorie));
  };
  return (
    <>
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target={"#editModal"+categorieInfo.id}
      >
        <FontAwesomeIcon icon={faEdit} size="sm" />
      </button>

      <div
        class="modal fade"
        id={"editModal"+categorieInfo.id}
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
              Modifer Categorie
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
                Fermer
              </button>
              <button 
              data-bs-dismiss="modal"
              onClick={handleUpdate} type="button" class="btn btn-primary">
                Modifier Categorie
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
