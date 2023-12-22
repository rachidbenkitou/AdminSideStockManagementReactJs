import React, {useEffect, useState} from "react";
import {deleteClients, getClients} from "../../services/clientService.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faPlus, faSearch, faTrash} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import NewClient from "./NewClient.jsx";
import {useDispatch, useSelector} from "react-redux";

import {fetchClients, removeClient, searchClient, selectClients, totalPages} from "../../store/ClientSlice.jsx";
import EditClient from "./EditClient";
import {fetchFournisseurs} from "../../store/FournisseurSlice.jsx";
import {BarLoader} from "react-spinners";
export default function Clients() {
    const dispatch = useDispatch()
    const clients = useSelector(selectClients);
    const totalPage = useSelector(totalPages);
    const [currentPage, setCurrentPage] = useState(1);
    const [firstName ,setFirstName]= useState("")
    const [lastName ,setLastName]= useState("")
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(fetchClients(1));
    }, [dispatch]);
    const handleDeleteClient =  (client) => {
        console.log(client);
        dispatch(removeClient(client));
        if(clients.length<=1) {
            setCurrentPage(currentPage-1)
            dispatch(fetchClients(currentPage-1))
        }else{
            dispatch(fetchClients(currentPage))
        }

    };
    const handelPaginate = (page) => {

        if(currentPage>=totalPage){
            setCurrentPage(1);
            dispatch(fetchClients(1));
        }else{
            dispatch(fetchClients(page));
            setCurrentPage(page);
        }

    };
    const renderPaginationLinks = () => {
        if (totalPage < 5)
            return Array.from({ length: totalPage }, (_, index) => index + 1);
        const maxLinksToShow = 5;
        const halfMaxLinksToShow = Math.floor(maxLinksToShow / 2);

        let startIdx = currentPage - halfMaxLinksToShow;
        let endIdx = currentPage + halfMaxLinksToShow;

        if (startIdx < 1) {
            startIdx = 1;
            endIdx = maxLinksToShow;
        }

        if (endIdx > totalPage) {
            endIdx = totalPage;
            startIdx = totalPage - maxLinksToShow + 1;
        }

        return Array.from(
            { length: endIdx - startIdx + 1 },
            (_, index) => startIdx + index
        );
    };
    const handleSearch = (e) => {
        e.preventDefault()
        if(firstName==="" && lastName===""){
            dispatch(fetchClients(1))
        }else{
        // console.log(firstName+" "+lastName)
        dispatch(searchClient({firstName,lastName}));}
    };

    return (
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Gestion des clients</h1>
                <div className="btn-toolbar mb-2 mb-md-0">

                    <NewClient info={{page:currentPage}}/>
                </div>
            </div>

                <>
            <div className="card-body">

                <form onSubmit={handleSearch}>
                    <div className="row g-2">
                        <div className="col-auto">
                            <input
                                value={lastName}
                                onChange={(e)=>setLastName(e.target.value)}
                                className="form-control"
                                placeholder="Nom"
                            />
                        </div>
                        <div className="col-auto">
                            <input
                                value={firstName}
                                onChange={(e)=>setFirstName(e.target.value)}
                                className="form-control"
                                placeholder="Prénom"
                            />
                        </div>
                        <div className="col-auto">
                            <button
                                className="btn btn-primary">
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                        </div>
                    </div>
                </form>

            </div>

            <br/>
                    {clients.length <= 0 && (
                        <div>
                            <BarLoader color="#0d6efd" className="w-100" />
                        </div>
                    )}
            <div className="table-responsive small">
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Prénom</th>
                        <th scope="col">Email</th>
                        <th scope="col">Téléphone</th>
                        <th scope="col">Address</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {clients === undefined &&(
                        <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
                            <symbol id="check-circle-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                            </symbol>
                            <symbol id="info-fill" viewBox="0 0 16 16">
                                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                            </symbol>
                            <symbol id="exclamation-triangle-fill" viewBox="0 0 16 16">
                                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                            </symbol>
                        </svg>
                    )}
                    {clients.length > 0 && Array.isArray(clients) && clients.slice(0,5).map((client)=>(
                        client && (
                        <tr  key={client && client.id}>
                            {client && <td>{client.id}</td>}
                            {client &&<td>{client.lastName}</td>}
                            {client &&<td>{client.firstName}</td>}
                            {client &&<td>{client.email}</td>}
                            {client &&<td>{client.phone}</td>}
                            {client &&<td>{client.adresse}</td>}
                            {/*<td>*/}
                            {/*    <button onClick={()=> handleCheckProduct(product)} className={"btn btn-outline-success"}>*/}
                            {/*        <FontAwesomeIcon icon={product.checked ? faCheckCircle:faCircle}>*/}
                            {/*        </FontAwesomeIcon>*/}
                            {/*    </button>*/}
                            {/*</td>*/}
                            <td>
                                <button
                                    onClick={()=>handleDeleteClient(client)}
                                    className={"btn btn-outline-danger"}>
                                    <FontAwesomeIcon icon={faTrash}>
                                    </FontAwesomeIcon>
                                </button>
                            </td>
                            <td>

                                <EditClient
                                    infoClient={{
                                        id: client.id,
                                        lastName: client.lastName,
                                        firstName: client.firstName,
                                        email: client.email,
                                        phone: client.phone,
                                        adresse: client.adresse,
                                    }}
                                />
                            </td>

                        </tr>)
                    ))}
                    </tbody>

                </table>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li
                            className="page-item"
                            onClick={() => handelPaginate(currentPage - 1)}
                        >
                            <a className="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        {renderPaginationLinks().map((page) => (
                            <li
                                onClick={() => handelPaginate(page)}
                                key={page}
                                className={
                                    page === currentPage ? "page-item active" : "page-item"
                                }
                            >
                                <a href="#" className="page-link">
                                    {page}
                                </a>
                            </li>
                        ))}
                        <li
                            className={
                                currentPage === totalPage ? "page-item disabled" : "page-item"
                            }
                            onClick={() => handelPaginate(currentPage + 1)}
                        >
                            <a
                                class={
                                    currentPage === totalPage ? "page-link disabled" : "page-link"
                                }
                                href="#"
                                aria-label="Next"
                            >
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
                </>
        </main>







    );
}
