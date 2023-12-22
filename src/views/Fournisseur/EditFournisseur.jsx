import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateFournisseur } from "../../store/FournisseurSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
export default function EditFournisseur({fournisseurInfo}) {
  const [code_fournisseur, setCodeFournisseur] = useState(fournisseurInfo.code_fournisseur);
  const [nom, setNom] = useState(fournisseurInfo.nom);
  const [mail, setMail] = useState(fournisseurInfo.mail);
  const [tel, setTel] = useState(fournisseurInfo.tel);
  const [fax, setFax] = useState(fournisseurInfo.fax);
  const [adresse, setAdresse] = useState(fournisseurInfo.adresse);
  const dispatch = useDispatch();
  const handleAdd = () => {
    const id = fournisseurInfo.id
    const fournisseur = {id,code_fournisseur, nom, adresse, tel, mail,fax};
    // console.log(fournisseur)
    dispatch(updateFournisseur(fournisseur));
  };
  return (
    <>
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target={"#editModal"+fournisseurInfo.id}
      >
        <FontAwesomeIcon icon={faEdit} size="sm" />
      </button>

      <div
        class="modal fade"
        id={"editModal"+fournisseurInfo.id}
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
                  <label className="form-label">Code Fournisseur :</label>
                  <input
                    onChange={(e) => setCodeFournisseur(e.target.value)}
                    value={code_fournisseur}
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
                  <label className="form-label">Telephone :</label>
                  <input
                    onChange={(e) => setTel(e.target.value)}
                    value={tel}
                    className="form-control"
                  ></input>
                </div>
                <div className="mb-3">
                  <label className="form-label">Email :</label>
                  <input
                    onChange={(e) => setMail(e.target.value)}
                    value={mail}
                    className="form-control"
                  ></input>
                </div>
                <div className="mb-3">
                  <label className="form-label">Fax :</label>
                  <input
                    onChange={(e) => setFax(e.target.value)}
                    value={fax}
                    className="form-control"
                  ></input>
                </div>
                <div className="mb-3">
                  <label className="form-label">Adresse :</label>
                  <input
                    onChange={(e) => setAdresse(e.target.value)}
                    value={adresse}
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
                Modifier Fournisseur
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
