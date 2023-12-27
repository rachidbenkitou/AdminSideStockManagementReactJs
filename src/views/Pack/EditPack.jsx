import React, {useEffect, useState} from "react";

import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {getClient} from "../../services/clientService.jsx";
import {updateClient} from "../../store/ClientSlice.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {updatePack} from "../../store/PackSlice.jsx";
export default function EditPack({infoPack}){
    // const {id}= useParams();
    const [id,setId]= useState(infoPack.id);
    const [codePack,setCodePack]= useState(infoPack.codePack);
    const [nbrProduits,setnbrProduits]= useState(infoPack.nbrProduits);
    const [disponible,setDisponible]= useState(infoPack.disponible);
    const [qte,setQte]= useState(infoPack.qte);
    const [prix,setPrix]= useState(infoPack.prix);
    const [description,setDescription]= useState(infoPack.description);
    const [imagePath,setImagePath]= useState("");


    const dispatch = useDispatch();

    const handleUpdatePack= (event)=>{
        const basePath = "C:\\fakepath\\";
        const image = imagePath.replace(basePath, "");
        let pack = {id,codePack,nbrProduits,description,image,disponible,qte,prix};

        dispatch(updatePack(pack))

    }

    return(
        <>
            <button


                type="button"
                className={"btn btn-outline-success"}
                data-bs-toggle="modal"
                data-bs-target={"#editModal"+infoPack.id}
            >

                <FontAwesomeIcon icon={faEdit}>
                </FontAwesomeIcon>
            </button>


            <div
                class="modal fade"
                id={"editModal"+infoPack.id}
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                                Modifier pack
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
                                    <label  className="form-label">Code de pack:</label>
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
                                    <label className="form-label">Description :</label>
                                    <input
                                        type="text-aria"
                                        onChange={(e) => setDescription(e.target.value)}
                                        value={description}
                                        className="form-control"
                                    ></input>
                                </div>
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
                                onClick={()=>handleUpdatePack()}
                                type="button" class="btn btn-primary"
                                data-bs-dismiss="modal">

                                Modifier un pack
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}