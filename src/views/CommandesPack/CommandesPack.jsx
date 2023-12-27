import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartShopping, faSearch, faTrash, faUser, faUserAlt} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";



import {updateClient} from "../../store/ClientSlice.jsx";
import {searchPack} from "../../store/PackSlice.jsx";
import {BarLoader} from "react-spinners";
import {
    fetchCommandePack, searchCommandePack,
    selectCommandePacks,
    totalPages,
    updateCommandePackStatus
} from "../../store/CommandePackSlice.jsx";
import {updateCommandeStatus} from "../../store/CommandeSlice.jsx";
import emailjs from "@emailjs/browser";
export default function CommandesPack() {
    const dispatch = useDispatch()
    const commandPacks = useSelector(selectCommandePacks);
    const totalPage = useSelector(totalPages);
    const [currentPage, setCurrentPage] = useState(1);
    // const [status ,setStatus]= useState()
    const [date ,setDate]= useState()
    // const navigate = useNavigate();
    useEffect(() => {
        console.log(totalPage)
        dispatch(fetchCommandePack(1));
    }, [dispatch]);
    // const handleDeleteClient =  (client) => {
    //     console.log(client);
    //     dispatch(removeClient(client));
    //
    // };
    const handleUpdateCommandePackStatus = (command)=>{
        if (command.orderStatus_id === 1){
            let commande1 = {id:command.id,date_commande:command.date_commande,
                prix:command.prix,client_id:command.client_id,orderStatus_id:2,discount_id:command.discount_id};
            dispatch(updateCommandePackStatus(commande1))
            console.log(commande1)
        }else{
            let commande2 = {id:command.id,date_commande:command.date_commande,
                prix:command.prix,client_id:command.client_id,orderStatus_id:1,discount_id:command.discount_id};
            dispatch(updateCommandePackStatus(commande2))
            console.log(commande2)
        }
        emailjs.send('service_y5sor1o', 'template_bmn80r3', command, '6kWWEfmvXWn8foyKd')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });

    }
    const handelPaginate = (page) => {

        if(currentPage>=totalPage){
            setCurrentPage(1);
            dispatch(fetchCommandePack(1));
        }else{
            dispatch(fetchCommandePack(page));
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
    // const handle = (e) => {
    //     e.preventDefault()
    //     if(firstName==="" && lastName===""){
    //         dispatch(fetchClients(1))
    //     }else{
    //         // console.log(firstName+" "+lastName)
    //         dispatch(searchClient({firstName,lastName}));}
    // };
    const handleSearch = (e) => {
        e.preventDefault()
        console.log(date)
        dispatch(searchCommandePack(date));
        console.log(commandPacks)
    };

    return (

        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Suivis des commandes</h1>
                <div className="btn-toolbar mb-2 mb-md-0">

                    {/*<NewClient/>*/}
                </div>
            </div>

            <div className="card-body">
                <form onSubmit={handleSearch}>
                    <div className="row g-2">
                        <div className="col-auto">
                            <input
                                value={date}
                                onChange={(e)=>setDate(e.target.value)}
                                className="form-control"
                                placeholder="Date de Commande"
                                type="date"
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

            {commandPacks.length <=0  && (
                <div>
                    <BarLoader color="#0d6efd" className="w-100" />
                </div>
            )}
            <div className="table-responsive small">
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Date de commande</th>
                        <th scope="col">Client</th>
                        <th scope="col">Prix</th>
                        <th scope="col">Status</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {commandPacks.length > 0 && Array.isArray(commandPacks) && commandPacks.map((commandPack)=>(
                        commandPack.packs.length > 0 && (
                            <tr  key={commandPack && commandPack.id}>
                                {commandPack && <td>{commandPack.id}</td>}
                                {commandPack && <td>{commandPack.date_commande}</td>}
                                {commandPack && <td>{commandPack.client.firstName} {commandPack.client.lastName}
                                    <button
                                        style={{marginLeft: '10px',width: '20px',height:'20px'}}
                                        type="button" className="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target={"#exampleModal"+commandPack.client.id}>
                                        <FontAwesomeIcon icon={faUser}  style={{width:'12',height:'12',marginLeft:'-6px',marginBottom:'10px',marginTop:'-5px'}} />
                                    </button>
                                    <div className="modal fade" id={"exampleModal"+commandPack.client.id} tabIndex="-1" aria-labelledby={"exampleModal"+commandPack.client.id} aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Informations sur le client</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    <div className="row">
                                                        <div className="col">
                                                            <p><strong>ID:</strong> <span style={{marginLeft:'5px'}}>{commandPack.client.id}</span></p>
                                                        </div>
                                                        <div className="col">
                                                            <p><strong>Prénom:</strong><span style={{marginLeft:'5px'}}>{commandPack.client.firstName}</span></p>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col">
                                                            <p><strong>Nom:</strong><span style={{marginLeft:'5px'}}>{commandPack.client.lastName}</span></p>
                                                        </div>
                                                        <div className="col">
                                                            <p><strong>Email:</strong><span style={{marginLeft:'5px'}}>{commandPack.client.email}</span></p>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col">
                                                            <p><strong>Téléphone:</strong><span style={{marginLeft:'5px'}}>{commandPack.client.phone}</span></p>
                                                        </div>
                                                        <div className="col">
                                                            <p><strong>Adresse:</strong><span style={{marginLeft:'5px'}}>{commandPack.client.adresse}</span></p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </td>}

                                {commandPack &&<td>{commandPack.prix}</td>}
                                {commandPack &&<td>
                                    { commandPack.orderStatus_id===1?<button  onClick={()=> handleUpdateCommandePackStatus(commandPack)} className={"btn btn-warning"}>
                                        en cours
                                    </button>:<button  disabled className={"btn btn-success"}>
                                        Livré
                                    </button>}
                                </td>}

                                {commandPack&&<td>
                                    <div className="dropdown">
                                        <button className="btn btn-outline-success dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <FontAwesomeIcon icon={faCartShopping} />
                                        </button>
                                        <ul className="dropdown-menu">
                                            {Array.isArray(commandPack.packs) && commandPack.packs.map((pack)=>(
                                                <li  key={pack && pack.id} ><a className="dropdown-item" href="#">{pack.codePack}</a></li>
                                            ))}
                                        </ul>
                                    </div></td>}

                                {/*<td>*/}
                                {/*    <button onClick={()=> handleCheckProduct(product)} className={"btn btn-outline-success"}>*/}
                                {/*        <FontAwesomeIcon icon={product.checked ? faCheckCircle:faCircle}>*/}
                                {/*        </FontAwesomeIcon>*/}
                                {/*    </button>*/}
                                {/*</td>*/}

                                <td>

                                    {/*<EditClient*/}
                                    {/*    infoClient={{*/}
                                    {/*        id: client.id,*/}
                                    {/*        lastName: client.lastName,*/}
                                    {/*        firstName: client.firstName,*/}
                                    {/*        email: client.email,*/}
                                    {/*        phone: client.phone,*/}
                                    {/*        adresse: client.adresse,*/}
                                    {/*    }}*/}
                                    {/*/>*/}
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
        </main>







    );
}
