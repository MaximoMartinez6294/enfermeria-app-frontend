import React, { useEffect, useState } from "react";
import { SpinnerImg } from "../../loader/Loader";
import "./ProductList2.scss";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import Search from "../../search/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_PRODUCTS,
  selectFilteredPoducts,
} from "../../../redux/features/product/filterSlice";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  deleteProduct,
  getProducts,
} from "../../../redux/features/product/productSlice";
import { Link } from "react-router-dom";

const ProductList = ({ products, isLoading }) => {
  const [search, setSearch] = useState("");
  const filteredProducts = useSelector(selectFilteredPoducts);

  const dispatch = useDispatch();

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const delProduct = async (id) => {
    console.log(id);
    await dispatch(deleteProduct(id));
    await dispatch(getProducts());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Eliminar",
      message: "Estas seguro que desea eliminar?",
      buttons: [
        {
          label: "Eliminar",
          onClick: () => delProduct(id),
        },
        {
          label: "Cancelar",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };

  //   Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredProducts]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    setItemOffset(newOffset);
  };
  //   End Pagination

  useEffect(() => {
    dispatch(FILTER_PRODUCTS({ products, search }));
  }, [products, search, dispatch]);

  return (
    <div className="product-list">
      <div className="table" id="no-more-tables">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>PACIENTES</h3>
          </span>
          <span>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </span>
        </div>

        {isLoading && <SpinnerImg />}

        <div className="table">
          {!isLoading && products.length === 0 ? (
            console.log("a"),
            <p>-- Porfavor agregar un nuevo paciente.</p>
          ) : (
            <table>
              <thead >
                <tr className="A">
                  <th>s/n</th>
                  <th>Name</th>
                  <th>Estado</th>
                  <th>Direccion</th>
                  <th>Telefono</th>
                  <th>HorasDeCuidador</th>
                  <th>Turnos</th>
                  <th>Cuidadores</th>
                  <th>Ved</th>
                  <th>Enfermeros</th>
                  <th>Observaciones</th>
                  <th>Insumos</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((product, index) => {
                  const { 
                    _id, 
                    name,
                    estado,
                    direccion,
                    telefono,
                    horasDeCuidador, 
                    turnos, 
                    cuidadores, 
                    ved, 
                    enfermeros,
                    observaciones,
                    insumos, 
                  } = product;
                  
                  return (
                    <tr key={_id}>
                      <td data-title="S/N" >{index + 1}</td>
                      <td data-title="Nombre"> <b>{shortenText(name, 16)}</b></td>
                      <td data-title="Estado">{estado}</td>
                      <td data-title="Direccion">{direccion}</td>
                      <td data-title="Telefono">{telefono}</td>
                      <td data-title="Horas De Cuidador">
                        {horasDeCuidador}
                      </td>
                      <td data-title="Turnos">
                        {turnos}
                      </td >
                      <td data-title="Cuidadores">{cuidadores.map((cuidador) => cuidador.name).join(', ')}</td>
                      <td data-title="Ved">{ved}</td>
                      <td data-title="Enfermeros">{enfermeros.map((enfermero) => enfermero.name).join(', ')}</td>
                      <td data-title="Observaciones">{observaciones}</td>
                      <td data-title="Insumos">{insumos}</td>

                      <td className="icons">
                        <span>
                          <Link to={`/product-detail/${_id}`}>
                            <AiOutlineEye size={25} color={"purple"} />
                          </Link>
                        </span>
                        <span>
                          <Link to={`/edit-product/${_id}`}>
                            <FaEdit size={20} color={"green"} />
                          </Link>
                        </span>
                        <span>
                          <FaTrashAlt
                            size={20}
                            color={"red"}
                            onClick={() => confirmDelete(_id)}
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Siguiente"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="Anterior"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
      </div>
    </div>
  );
};

export default ProductList;