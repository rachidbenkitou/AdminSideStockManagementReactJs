import React, { useEffect, useState } from "react";
import "./produit.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProduits,
  removeProduit,
  searchProduits,
  selectProduits,
  totalPages,
} from "../../store/ProduitSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollar,
  faSearch,
  faTrash,
  faTruck,
  faUsd,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import AddProduit from "./AddProduit";
import AddQuantite from "./addQuantite";
import EditProduit from "./EditProduit";
import {
  fetchAllFournisseurs,
  selectFournisseurs,
} from "../../store/FournisseurSlice";
import {
  fetchAllCategories,
  selectCategories,
} from "../../store/CategorieSlice";
export default function Produit() {
  const dispatch = useDispatch();
  const fournisseurs = useSelector(selectFournisseurs);
  const categories = useSelector(selectCategories);
  const produits = useSelector(selectProduits);
  const totalPage = useSelector(totalPages);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    dispatch(fetchProduits(1))
      .then(() => {
        dispatch(fetchAllFournisseurs());
        dispatch(fetchAllCategories());
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des fournisseurs :", error);
        setLoading(false);
      });
  }, [dispatch]);

  const handleDelete = (produit) => {
    dispatch(removeProduit(produit));
    if (produits.length <= 1) {
      setCurrentPage(currentPage - 1);
      dispatch(fetchProduits(currentPage - 1));
    } else {
      dispatch(fetchProduits(currentPage));
    }
  };
  const handelPaginate = (page) => {
    if (search !== "") {
      dispatch(searchProduits({ words: search, page: page }));

      setCurrentPage(page);
    } else {
      if (currentPage >= totalPage) {
        setCurrentPage(1);
        dispatch(fetchProduits(1));
      } else {
        dispatch(fetchProduits(page));
        setCurrentPage(page);
      }
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
    e.preventDefault();
    if (search === "") {
      setLoading(true);
      dispatch(fetchProduits(1));
      setLoading(false);
    } else {
      setLoading(true);
      setCurrentPage(1);
      dispatch(searchProduits({ words: search, page: 1 }));
      setLoading(false);
    }
  };
  return (
    <>
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Gestion des produits</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group me-2">
              <AddProduit
                produitInfo={{
                  categories: categories,
                  fournisseurs: fournisseurs,
                  page: currentPage,
                }}
              />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              onClick={(e) => handleSearch(e)}
              className="btn btn-outline-primary"
              type="submit"
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>
        </div>
        {/* {produits.length <= 0 && (
          <div className="spiner">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        )} */}
        {/* Statr */}
        {produits.length > 0 && (
          <>
            <div class="customContanier">
              {produits &&
                Array.isArray(produits) &&
                produits.length > 0 &&
                produits.map((produit, index) => (
                  <div class="card" key={index}>
                    <span
                      className="percent"
                      style={{
                        background:
                          produit.quantite > 50
                            ? "green"
                            : produit.quantite > 10
                            ? "orange"
                            : "red",
                      }}
                    >
                      {produit.quantite}
                    </span>
                    <div class="card-image">
                      <img
                         src={"/images/"+produit.image}
                        width="120"
                        height="150"  
                        alt="image"
                      />
                    </div>

                    <div class="card-inner">
                      <div className="d-flex justify-content-between  align-items-center">
                        <div>
                          <span>{produit.categorie_nom}
                          </span>
                          <h5 class="mb-0">{produit.nom}</h5>
                        </div>
                        <div class="price">
                          <span>
                            {produit.prix_unitaire}
                            <FontAwesomeIcon icon={faDollar} />
                          </span>
                        </div>
                      </div>
                      <div class="mt-3 d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                          <button
                            type="button"
                            class="btn btn-outline-success btn-sm dropdown-toggle"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <FontAwesomeIcon icon={faTruck} /> Fournisseur
                          </button>
                          <ul class="dropdown-menu">
                            {Array.isArray(produit.fournisseurs) &&
                              produit.fournisseurs.map((fournisseur, index) => (
                                <li key={index}>
                                  <a class="dropdown-item" href="#">
                                    <FontAwesomeIcon icon={faUser} />{" "}
                                    {fournisseur.nom}: {fournisseur.qte_entree}
                                  </a>
                                </li>
                              ))}
                          </ul>
                        </div>
                        <div class="d-flex test flex-row justify-content-between">
                          <span class="wishlist bg-success">
                            <AddQuantite
                              produitInfo={{
                                id: produit.id,
                                code_produit: produit.code_produit,
                                nom: produit.nom,
                                fournisseurs: fournisseurs,
                              }}
                            />
                          </span>
                          {/* <span class="wishlist bg-primary"> */}
                          <EditProduit
                            produitInfo={{
                              id: produit.id,
                              prix_unitaire: produit.prix_unitaire,
                              code_produit: produit.code_produit,
                              nom: produit.nom,
                              quantite: produit.quantite,
                              description: produit.description,
                              categories: categories,
                            }}
                          />
                          {/* </span> */}
                          <span
                            class="wishlist bg-danger"
                            onClick={() => handleDelete(produit)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <nav aria-label="Page navigation example">
              <ul class="pagination">
                <li
                  class="page-item"
                  onClick={() => handelPaginate(currentPage - 1)}
                >
                  <a class="page-link" href="#" aria-label="Previous">
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
                  class={
                    currentPage === totalPage
                      ? "page-item disabled"
                      : "page-item"
                  }
                  onClick={() => handelPaginate(currentPage + 1)}
                >
                  <a
                    class={
                      currentPage === totalPage
                        ? "page-link disabled"
                        : "page-link"
                    }
                    href="#"
                    aria-label="Next"
                  >
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </>
        )}
        {/* End */}
      </main>
    </>
  );
}
