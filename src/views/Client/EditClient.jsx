import React, {useEffect, useState} from "react";

import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {getClient} from "../../services/clientService.jsx";
import {updateClient} from "../../store/ClientSlice.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
export default function EditClient({infoClient}){
    // const {id}= useParams();
    const [id,setId]= useState(infoClient.id);
    const [firstName,setFirstName]= useState(infoClient.firstName);
    const [lastName,setLastName]= useState(infoClient.lastName);
    const [email,setEmail]= useState(infoClient.email);
    const [phone,setPhone]= useState(infoClient.phone);
    const [adresse,setAdresse]= useState(infoClient.adresse);


    const dispatch = useDispatch();

    const handleUpdateClient = (event)=>{

        let client = {id,firstName,lastName,email,phone,adresse};

        dispatch(updateClient(client))

    }

    return(
        <>
            <button


                type="button"
                className={"btn btn-outline-success"}
                data-bs-toggle="modal"
                data-bs-target={"#editModal"+infoClient.id}
            >

                <FontAwesomeIcon icon={faEdit}>
                </FontAwesomeIcon>
            </button>

            <div
                class="modal fade"
                id={"editModal" + infoClient.id}
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                                Modifier un client
                            </h5>
                            <button
                                // onClick={()=>handleEmpty()}
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
                                        className="form-control" ></input>
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
                                // onClick={()=>handleEmpty()}
                                type="button"
                                class="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                onClick={()=>handleUpdateClient()}
                                type="button" class="btn btn-primary"
                                data-bs-dismiss="modal">

                                Modifier
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}