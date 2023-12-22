import React from "react";
import {Link, useNavigate} from "react-router-dom";
import Cookie from 'cookie-universal'
import axios from "axios";
import { instance } from "../../apis/AxiosInstance";
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
              Company name
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
                  <svg className="bi">
                    <use xlinkHref="#house-fill" />
                  </svg>
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link d-flex align-items-center gap-2" to="categorie">
                  <svg className="bi">
                    <use xlinkHref="#file-earmark" />
                  </svg>
                  Categories
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link d-flex align-items-center gap-2" to="fournisseur">
                  <svg className="bi">
                    <use xlinkHref="#file-earmark" />
                  </svg>
                  Fournisseurs
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link d-flex align-items-center gap-2" to="produit">
                  <svg className="bi">
                    <use xlinkHref="#cart" />
                  </svg>
                  Produits
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link d-flex align-items-center gap-2" to="client">
                  <svg className="bi">
                    <use xlinkHref="#people" />
                  </svg>
                  Clients
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link d-flex align-items-center gap-2" to="pack">
                  <svg className="bi">
                    <use xlinkHref="#graph-up" />
                  </svg>
                  Packs
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link d-flex align-items-center gap-2" to="commande">
                  <svg className="bi">
                    <use xlinkHref="#graph-up" />
                  </svg>
                  Commandes
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link d-flex align-items-center gap-2" href="#">
                  <svg className="bi">
                    <use xlinkHref="#puzzle" />
                  </svg>
                  Integrations
                </a>
              </li>
            </ul>
            <hr className="my-3" />

            <ul className="nav flex-column mb-auto">
              <li className="nav-item">
                <a className="nav-link d-flex align-items-center gap-2" href="#">
                  <svg className="bi">
                    <use xlinkHref="#gear-wide-connected" />
                  </svg>
                  Settings
                </a>
              </li>
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
