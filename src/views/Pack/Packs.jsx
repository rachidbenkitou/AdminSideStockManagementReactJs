import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBagShopping,
    faCheck,
    faCheckCircle, faCircle, faCircleDot,
    faCircleStop, faCross, faDollar,
    faEdit,
    faPlus,
    faSearch, faStopCircle,
    faTrash, faWarning
} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    addProduitToPack,
    fetchPacks,
    removePack,
    removeProduitFromPack,
    searchPack, selectError,
    selectPacks,
    totalPages
} from "../../store/PackSlice.jsx";
import EditClient from "../Client/EditClient.jsx";
import {fetchClients, removeClient} from "../../store/ClientSlice.jsx";
import NewPack from "./NewPack.jsx";
import EditPack from "./EditPack.jsx";
import {fetchAllProduits, fetchProduits, selectProduits} from "../../store/ProduitSlice.jsx";

export default function Packs() {
    const dispatch = useDispatch()
    const packs = useSelector(selectPacks);
    const produits = useSelector(selectProduits);
    const totalPage = useSelector(totalPages);
    const [currentPage, setCurrentPage] = useState(1);
    const [query ,setQuery]= useState("")
    const [produit_id ,setProduitId]= useState()
    // const [lastName ,setLastName]= useState("")
    const navigate = useNavigate();
    useEffect(() => {
        console.log(totalPage)
        dispatch(fetchPacks(1));
        dispatch(fetchAllProduits());

    }, [dispatch]);
    const handleDeleteProductFromPack =  (packId,produitId) => {
        console.log(packId,produitId)

        dispatch(removeProduitFromPack({packId, produitId}));

    };
    const handleDeletePack =  (pack) => {
        console.log(pack);
        dispatch(removePack(pack));
        if(packs.length<=1) {
            setCurrentPage(currentPage-1)
            dispatch(fetchPacks(currentPage-1))
        }else{
            dispatch(fetchPacks(currentPage))
        }

    };
    const handleAjouterProduitToPack =  (pack_id) => {
        let pack = {pack_id,produit_id}
        dispatch(addProduitToPack(pack));
        // console.log(errorM)
    };
    const handelPaginate = (page) => {

        if(currentPage>=totalPage){
            setCurrentPage(1);
            dispatch(fetchPacks(1));
        }else{
            dispatch(fetchPacks(page));
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
        dispatch(searchPack(query));
        console.log(packs)
    };

    return (
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Gestion des packs</h1>
                <div className="btn-toolbar mb-2 mb-md-0">

                    <NewPack info={{page:currentPage}}/>
                </div>
            </div>
            {packs.length <= 0  ? <div  style={{display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '75vh',}}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
                :
        <>
                <form onSubmit={handleSearch} className='ms-4'>
                    <div className="row g-2">
                        <div className="col-auto">
                            <input
                                onChange={(e)=>setQuery(e.target.value)}
                                value={query}
                                className="form-control"
                                placeholder="Code"
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


            <br/>
            <div className="row d-flex align-items-center justify-content-center  ">
            {Array.isArray(packs) && packs.map((pack)=>(
                pack && (

                    <div className="card m-2  h-50" style={{ width: '17rem' }}  key={pack && pack.id}>
                         <span
                             className="percent"
                             style={{
                                 background: "green",
                             }}
                         >
                                      {pack.nbrProduits}
                         </span>
                        <div className="card-image">
                            <img
                                src="https://www.zenpack.us/wp-content/uploads/2022/03/consumer_electronic_07.jpg"
                                width="270"
                                style={{borderTopRightRadius: '10px'}}
                            />
                        </div>
                        <div className="card-body">
                        <div className="d-flex align-items-center justify-content-between">
                            <h5 className="card-title" style={{ marginRight: '50px' }}>{pack.codePack} </h5>
                            <span style={{ marginRight: '10px' }}>{pack.prix} <FontAwesomeIcon icon={faDollar}  style={{color: 'darkgoldenrod'}} /></span>
                            {pack.disponible !== 0 ? (
                                <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green',marginRight: '0px' }} />
                            ) : (
                                <FontAwesomeIcon icon={faCircle} style={{ color: 'gray',marginRight: '0px' }} />
                            )}


                        </div>
                            <br/>
                    {/*<h6 className="card-subtitle mb-2 text-body-secondary">Quantité: {pack.nbrProduits}</h6>*/}
                    <div className="d-flex align-items-center justify-content-between">
                    <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target={"#staticBackdrop"+pack.id}>
                        Produits

                    </button>
                        <div style={{marginRight: '0px' }}>
                        <button style={{marginRight: '10px' }}
                            onClick={()=>handleDeletePack(pack)}
                            className={"btn btn-outline-danger"}>
                            <FontAwesomeIcon icon={faTrash}>
                            </FontAwesomeIcon>
                        </button>


                            <EditPack
                                infoPack={{
                                    id: pack.id,
                                    codePack: pack.codePack,
                                    nbrProduits: pack.nbrProduits,
                                    disponible: pack.disponible,
                                    qte: pack.qte,
                                    prix: pack.prix,
                                }}
                            />
                        </div>
                    </div>
                    <div className="modal fade" id={"staticBackdrop"+pack.id} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Pack: {pack.codePack} </h1>

                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <p>

                                        <button className="btn btn-outline-secondary" type="button" data-bs-toggle="collapse" data-bs-target={"#collapseWidthExample"+pack.id} aria-expanded="false" aria-controls="collapseWidthExample">
                                            <FontAwesomeIcon icon={faPlus} /> Ajouter Produit
                                        </button>
                                    </p>
                                    <div >
                                        <div className="collapse collapse-horizontal" id={"collapseWidthExample"+pack.id}>
                                            <div className="card card-body" style={{width: '470px'}}>
                                                <div class="form-floating">

                                                </div>
                                                <div className="d-flex align-items-center ">
                                                    <div>

                                                    </div>
                                                    <select
                                                        onChange={(e) => setProduitId(e.target.value)}
                                                        value={produit_id}
                                                        className="form-select form-select-sm" aria-label="Small select example" style={{ width:'300px',marginRight: '3px' }}>
                                                        {Array.isArray(produits) && produits.map((produit1,index) => (

                                                                produit1 && (
                                                                    <option key={index} value={produit1.id}>{produit1.nom}</option>

                                                            )
                                                        ))}
                                                    </select>


                                                    <button
                                                    onClick={()=>{handleAjouterProduitToPack(pack.id)}}
                                                    className="btn btn-outline-success" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample" style={{ height:'33px'}}>
                                                    <FontAwesomeIcon icon={faPlus} style={{ marginBottom:'2px'}} />
                                                </button>
                                                    </div>

                                            </div>
                                        </div>
                                    </div>


                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Code</th>
                                            <th scope="col">Nom</th>
                                            <th scope="col"></th>
                                        </tr>
                                        </thead>
                                        <tbody>

                                        {Array.isArray(pack.produits) && pack.produits.map((produit,index)=>(
                                            produit && (
                                                <tr  key={index}>
                                                    {produit && <td>{produit.id}</td>}
                                                    {produit &&<td>{produit.code_produit}</td>}
                                                    {produit &&<td>{produit.nom}</td>}
                                                    <td>
                                                        <button
                                                            onClick={()=>handleDeleteProductFromPack(pack.id,produit.id)}
                                                            className={"btn btn-outline-danger"}>
                                                            <FontAwesomeIcon icon={faTrash}>
                                                            </FontAwesomeIcon>
                                                        </button>
                                                    </td>
                                                    {/*<td>*/}
                                                    {/*    <button onClick={()=> handleCheckProduct(product)} className={"btn btn-outline-success"}>*/}
                                                    {/*        <FontAwesomeIcon icon={product.checked ? faCheckCircle:faCircle}>*/}
                                                    {/*        </FontAwesomeIcon>*/}
                                                    {/*    </button>*/}
                                                    {/*</td>*/}


                                                </tr>)
                                        ))}
                                        </tbody>

                                    </table>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                                </div>
                            </div>
                        </div>
                    </div>




                </div>
            </div>
                )
            ))}
            </div>
            <div className="w-100 d-flex align-items-center justify-content-center ">
            <div>

                <nav aria-label="Page navigation example ">
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
            </div>
            </>}
        </main>







    );
}
