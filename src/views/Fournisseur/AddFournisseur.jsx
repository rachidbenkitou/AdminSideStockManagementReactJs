import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addFournisseur,
  fetchFournisseurs,
} from "../../store/FournisseurSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
export default function AddFournisseur({ info }) {
  const [code_fournisseur, setCodeFournisseur] = useState("");
  const [nom, setNom] = useState("");
  const [mail, setMail] = useState("");
  const [tel, setTel] = useState("");
  const [fax, setFax] = useState("");
  const [adresse, setAdresse] = useState("");
  const dispatch = useDispatch();
  const handleAdd = () => {
    const fournisseur = { code_fournisseur, nom, adresse, tel, mail, fax };
    dispatch(addFournisseur(fournisseur));
    dispatch(fetchFournisseurs(info.page));
    setCodeFournisseur("")
    setNom("")
    setMail("")
    setTel("")
    setFax("")
    setAdresse("")
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
        Ajouter Fournisseur
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
                Ajouter Fournisseur
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
                      <label className="form-label">Code Fournisseur :</label>
                      <input
                        onChange={(e) => setCodeFournisseur(e.target.value)}
                        value={code_fournisseur}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Nom :</label>
                      <input
                        onChange={(e) => setNom(e.target.value)}
                        value={nom}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Telephone :</label>
                      <input
                        onChange={(e) => setTel(e.target.value)}
                        value={tel}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Email :</label>
                      <input
                        onChange={(e) => setMail(e.target.value)}
                        value={mail}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Fax :</label>
                      <input
                        onChange={(e) => setFax(e.target.value)}
                        value={fax}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Adresse :</label>
                      <input
                        onChange={(e) => setAdresse(e.target.value)}
                        value={adresse}
                        className="form-control"
                      />
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
                Ajouter Fournisseur
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
