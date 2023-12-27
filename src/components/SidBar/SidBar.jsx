import React from "react";
import {Link, useNavigate} from "react-router-dom";
import Cookie from 'cookie-universal'
import axios from "axios";
import { instance } from "../../apis/AxiosInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faBoxOpen, faBoxesPacking, faCab, faCarBattery, faCaretDown, faCartPlus, faCartShopping, faDashboard, faFileAlt, faFileArchive, faTractor, faTruck, faUser, faUserFriends } from "@fortawesome/free-solid-svg-icons";
export default function SidBar() {
  const cookies = Cookie()
  const navigate = useNavigate();
  const handleLogout = async() => {
    await instance.post("/logout").then((response)=>{
      cookies.remove('login_token', { path: '/' });
    }).then(()=>{
      navigate('/');
    })
    
  }
  return (
    <>
      <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
        <div
          className="offcanvas-md offcanvas-end bg-body-tertiary"
          tabindex="-1"
          id="sidebarMenu"
          aria-labelledby="sidebarMenuLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="sidebarMenuLabel">
              RYA Admin
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              data-bs-target="#sidebarMenu"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
            <ul className="nav flex-column">
              <li className="nav-item">
                <a
                  className="nav-link d-flex align-items-center gap-2 active"
                  aria-current="page"
                  href="#"
                >
                  <FontAwesomeIcon icon={faDashboard}/>
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link d-flex align-items-center gap-2" to="categorie">
                  <FontAwesomeIcon icon={faFileAlt}/>
                  Categories
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link d-flex align-items-center gap-2" to="fournisseur">
                  <FontAwesomeIcon icon={faTruck}/>
                  Fournisseurs
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link d-flex align-items-center gap-2" to="produit">
                  <FontAwesomeIcon icon={faCartShopping}/>
                  Produits
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link d-flex align-items-center gap-2" to="client">
                  <FontAwesomeIcon icon={faUserFriends}/>
                  Clients
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link d-flex align-items-center gap-2" to="pack">
                  <FontAwesomeIcon icon={faBoxOpen}/>
                  Packs
                </Link>
              </li>

              <li className="nav-item">

                <div className="btn-group">
                  <button type="button" className="btn btn-light">   <svg className="bi">
                    <use xlinkHref="#graph-up" />
                  </svg> <span >commande</span></button>
                  <button type="button" className="btn  btn-light dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                    <span className="visually-hidden">commande</span>
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="nav-link d-flex align-items-center gap-2" to="commande">
                        Produits
                      </Link>
                    </li>
                    <li>
                      <Link className="nav-link d-flex align-items-center gap-2" to="commandePack">
                        Packs
                      </Link>
                    </li>
                  </ul>
                </div>


              </li>
            </ul>
            <hr className="my-3" />

            <ul className="nav flex-column mb-auto">
              <li className="nav-item">
                <a onClick={handleLogout} className="nav-link d-flex align-items-center gap-2" href="#">
                  <svg className="bi">
                    <use xlinkHref="#door-closed" />
                  </svg>
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
