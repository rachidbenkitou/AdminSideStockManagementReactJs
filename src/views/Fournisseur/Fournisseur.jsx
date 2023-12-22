import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import AddFournisseur from "./AddFournisseur";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFournisseurs,
  removeFournisseur,
  searchFournisseur,
  selectFournisseurs,
  totalPages,
} from "../../store/FournisseurSlice";
import EditFournisseur from "./EditFournisseur";
import { BarLoader } from "react-spinners";
export default function Fournisseur() {
  const dispatch = useDispatch();
  const fournisseurs = useSelector(selectFournisseurs);
  const totalPage = useSelector(totalPages);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchFournisseurs(1))
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des fournisseurs :", error);
        setLoading(false);
      });
  }, [dispatch]);

  const handleDeleteFournisseur = (fournisseur) => {
    dispatch(removeFournisseur(fournisseur));
    if(fournisseurs.length<=1) {
      setCurrentPage(currentPage-1)
      dispatch(fetchFournisseurs(currentPage-1))
    }else{
      dispatch(fetchFournisseurs(currentPage))
    }
  };
  const handelPaginate = (page) => {
    if (search !== "") {
      dispatch(searchFournisseur({ words: search, page: page }));

      setCurrentPage(page);
    } else {
      if (currentPage >= totalPage) {
        setCurrentPage(1);
        dispatch(fetchFournisseurs(1));
      } else {
        dispatch(fetchFournisseurs(page));
        setCurrentPage(page);
      }
    }
  };
  const handleSearch = (e) => {
    e.preventDefault()
    if (search === "") {
      dispatch(fetchFournisseurs(1));
    } else {
      setCurrentPage(1);
      dispatch(searchFournisseur({ words: search, page: 1 }));
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
  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Gestion des fournisseurs</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
            <AddFournisseur info={{page:currentPage}} />
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
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
            onClick={(e)=>handleSearch(e)}
            className="btn btn-outline-primary"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
      {fournisseurs.length <= 0 && (
        <div>
          <BarLoader color="#0d6efd" className="w-100" />
        </div>
      )}
      
        <div className="table-responsive small">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Code</th>
                <th scope="col">Nom</th>
                <th scope="col">Téléphone</th>
                <th scope="col">Email</th>
                <th scope="col">Fax</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            {fournisseurs.length>0 && ( <tbody>
              {Array.isArray(fournisseurs) &&
                fournisseurs &&
                fournisseurs.slice(0, 5).map((fournisseur) => (
                  <tr key={fournisseur.id}>
                    <td>{fournisseur.id}</td>
                    <td>{fournisseur.code_fournisseur}</td>
                    <td>{fournisseur.nom}</td>
                    <td>{fournisseur.tel}</td>
                    <td>{fournisseur.mail}</td>
                    <td>{fournisseur.fax}</td>
                    <td>
                      <button
                        onClick={() => handleDeleteFournisseur(fournisseur)}
                        className="btn btn-outline-danger"
                      >
                        <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                      </button>
                    </td>
                    <td>
                      <EditFournisseur
                        fournisseurInfo={{
                          id: fournisseur.id,
                          nom: fournisseur.nom,
                          code_fournisseur: fournisseur.code_fournisseur,
                          tel: fournisseur.tel,
                          fax: fournisseur.fax,
                          mail: fournisseur.mail,
                          adresse: fournisseur.adresse,
                        }}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
      )}

          </table>
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
                  totalPage && currentPage === totalPage
                    ? "page-item disabled"
                    : "page-item"
                }
                onClick={() => handelPaginate(currentPage + 1)}
              >
                <a
                  class={
                    totalPage && currentPage === totalPage
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
        </div>
    </main>
  );
}
