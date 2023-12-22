import React, {useEffect, useState} from "react";
import {saveClient} from "../../services/clientService.jsx";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addFournisseur} from "../../store/FournisseurSlice.jsx";
import {addClient, fetchClients} from "../../store/ClientSlice.jsx";
import {faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {addPack, fetchPacks} from "../../store/PackSlice.jsx";
export default function NewPack({info}){
    const [codePack,setCodePack]= useState("");
    const [nbrProduits,setnbrProduits]= useState(1);
    const [disponible,setDisponible]= useState(0);
    const [qte,setQte]= useState(1);
    const [prix,setPrix]= useState(1);

    const dispatch = useDispatch();
    const  handleSavePack = () => {
        setQte(2)
        const pack = {codePack,nbrProduits,disponible,qte,prix};
        dispatch(addPack(pack));
        dispatch(fetchPacks(info.page));
    };

    return(
        <>
            <button

                type="button"
                class="btn btn-outline-secondary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"

            >
                <FontAwesomeIcon icon={faPlus}>
                </FontAwesomeIcon> Créer un pack
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
                                Ajouter pack
                            </h5>
                            <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div class="modal-body">

                            <form >
                                <div className="mb-3">
                                    <label  className="form-label">Code de produit:</label>
                                    <input
                                        onChange={(e)=> setCodePack(e.target.value)}
                                        value={codePack}
                                        className="form-control" ></input>
                                </div>
                                <div className="mb-3">
                                    <label  className="form-label"> Nbr.produits Max:</label>
                                    <input
                                        onChange={(e)=> setnbrProduits(e.target.value)}
                                        value={nbrProduits}
                                        type={"number"}
                                        className="form-control" ></input>
                                </div>
                                <div className="mb-3">
                                    <label  className="form-label">Prix :</label>
                                    <input
                                        onChange={(e)=> setPrix(e.target.value)}
                                        value={prix}
                                        type={"number"}
                                        className="form-control" ></input>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Disponible :</label>
                                    <div className="d-flex">
                                        <div className="form-check me-3">
                                            <input
                                                type="radio"
                                                className="form-check-input"
                                                id="disponible-oui"
                                                value={1}
                                                checked={disponible === 1}
                                                onChange={() => setDisponible(1)}
                                            />
                                            <label className="form-check-label" htmlFor="disponible-oui">
                                                Oui
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                type="radio"
                                                className="form-check-input"
                                                id="disponible-non"
                                                value={0}
                                                checked={disponible === 0}
                                                onChange={() => setDisponible(0)}
                                            />
                                            <label className="form-check-label" htmlFor="disponible-non">
                                                Non
                                            </label>
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
                                onClick={()=>handleSavePack()}
                                type="button" class="btn btn-primary"
                                data-bs-dismiss="modal">

                                Ajouter
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}