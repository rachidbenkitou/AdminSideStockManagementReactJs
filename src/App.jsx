import Login from "./authentication/Login/Login";
import SignUp from "./authentication/SignUp/SignUp";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import Home from "./views/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from "./views/Main";
import "./App.css";
import Fournisseur from "./views/Fournisseur/Fournisseur";
import Clients from "./views/Client/Clients.jsx";
import RequireAuth from "./authentication/RequireAuth";
import Categorie from "./views/Categorie/Categorie";
import Produit from "./views/Produit/Produit";
import EditClient from "./views/Client/EditClient.jsx";
import Packs from "./views/Pack/Packs";
import Commande from "./views/Commande/Commande.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<Login />} />
          {/* <Route path="/register" element={<SignUp />} /> */}
          {/* <Route path="/main" element={<Main />} /> */}
          <Route element={<RequireAuth />}>
            <Route path="/dashboard/" element={<ProtectedRoutes />}>
              <Route path="fournisseur" element={<Fournisseur />} />
              <Route path="categorie" element={<Categorie />} />
              <Route path="produit" element={<Produit />} />
              <Route path="client" element={<Clients/>} />
              <Route path="pack" element={<Packs/>} />
              <Route path="commande" element={<Commande/>} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
