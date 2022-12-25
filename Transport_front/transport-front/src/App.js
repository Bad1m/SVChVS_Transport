import Layout from "./components/Layout/Layout";
import React from "react";
import HomePage from "./components/Home/Home";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import asyncComponent from "./hoc/AsyncComponent/AsyncComponent";
import CreateClient from "./containers/ClientList/CreateClient";
import CreateTransport from "./containers/TransportList/CreateTransport";
import CreateOrder from "./containers/OrderList/CreateOrder";
import InternalServer from "./components/ErrorPages/InternalServer/InternalServer";
import UpdateClient from "./containers/ClientList/UpdateClient";
import DeleteClient from "./containers/ClientList/DeleteClient";
import UpdateTransport from "./containers/TransportList/UpdateTransport";
import DeleteTransport from "./containers/TransportList/DeleteTransport";

const AsyncClientList = asyncComponent(() => {
  return import("./containers/ClientList/ClientList");
});

const AsyncTransportList = asyncComponent(() => {
  return import("./containers/TransportList/TransportList");
});

const AsyncOrderList = asyncComponent(() => {
  return import("./containers/OrderList/OrderList");
});

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/clients" element={<AsyncClientList />} />
          <Route path="/transport" element={<AsyncTransportList />} />
          <Route path="/orders" element={<AsyncOrderList />} />
          <Route path="/createClient" element={<CreateClient />} />
          <Route path="/createOrder" element={<CreateOrder />} />
          <Route path="/createTransport" element={<CreateTransport />} />
          <Route path="*" element={<HomePage />} />
          <Route path="/500" element={<InternalServer />} />
          <Route path="/updateClient:id" element={<UpdateClient />} />
          <Route path="/deleteClient:id" element={<DeleteClient />} />
          <Route path="/updateTransport:id" element={<UpdateTransport />} />
          <Route path="/deleteTransport:id" element={<DeleteTransport />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
