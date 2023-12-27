import React, {useEffect, useState} from "react";
import {saveClient} from "../../services/clientService.jsx";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addFournisseur} from "../../store/FournisseurSlice.jsx";
import {addClient, fetchClients} from "../../store/ClientSlice.jsx";
import {faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
export default function NewClient({info}){
    const [firstName,setFirstName]= useState("");
    const [lastName,setLastName]= useState("");
    const [email,setEmail]= useState("");
    const [phone,setPhone]= useState("");
    const [adresse,setAdresse]= useState("");
    const [password,setPassword]= useState("");

    const dispatch = useDispatch();
    const  handleSaveClient = () => {
        const client = {firstName,lastName, email, phone, adresse,password};
        dispatch(addClient(client));
        dispatch(fetchClients(info.page));
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
                </FontAwesomeIcon> Ajouter Client
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
                                Ajouter un client
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
                                                    <label  className="form-label">Nom :</label>
                                                    <input
                                                        onChange={(e)=> setLastName(e.target.value)}
                                                        value={lastName}
                                                        className="form-control" ></input>
                                                </div>
                                                <div className="mb-3">
                                                    <label  className="form-label">Prénom :</label>
                                                    <input
                                                        onChange={(e)=> setFirstName(e.target.value)}
                                                        value={firstName}
                                                        className="form-control" ></input>
                                                </div>
                                                <div className="mb-3">
                                                    <label  className="form-label">Email :</label>
                                                    <input
                                                        onChange={(e)=> setEmail(e.target.value)}
                                                        value={email}
                                                        className="form-control" type="email" ></input>
                                                </div>
                                                <div className="mb-3">
                                                    <label  className="form-label">Mot de pass :</label>
                                                    <input
                                                        onChange={(e)=> setPassword(e.target.value)}
                                                        value={password}
                                                        className="form-control" type= "password" ></input>
                                                </div>
                                                <div className="mb-3">
                                                    <label  className="form-label">Num.Télephone :</label>
                                                    <input
                                                        onChange={(e)=> setPhone(e.target.value)}
                                                        value={phone}
                                                        className="form-control" ></input>
                                                </div>
                                                <div className="mb-3">
                                                    <label  className="form-label">Address :</label>
                                                    <input
                                                        onChange={(e)=> setAdresse(e.target.value)}
                                                        value={adresse}
                                                        className="form-control" ></input>
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
                                onClick={()=>handleSaveClient()}
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