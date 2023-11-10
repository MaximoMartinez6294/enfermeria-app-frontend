import React, { useEffect, useState } from "react";
import { SpinnerImg } from "../../loader/Loader";
import "../cuidadorList/cuidadorList.scss"
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import Search from "../../search/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_CUIDADORES,
  selectFilteredCuidadores,
} from "../../../redux/features/cuidadores/filterSlice2";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  deleteCuidador,
  getCuidadores,
} from "../../../redux/features/cuidadores/cuidadorSlice";
import { Link } from "react-router-dom";

const CuidadorList = ({ cuidadores, isLoading }) => {
  const [search, setSearch] = useState("");
  const filteredCuidadores = useSelector(selectFilteredCuidadores);

  const dispatch = useDispatch();

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  console.log("cuidadores:", cuidadores); // Agrega este console.log

  const delCuidador = async (id) => {
    console.log(id);
    await dispatch(deleteCuidador(id));
    await dispatch(getCuidadores());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Eliminar",
      message: "Estas seguro que desea eliminar?",
      buttons: [
        {
          label: "Eliminar",
          onClick: () => delCuidador(id),
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
    console.log("filteredCuidadores:", filteredCuidadores); // Agrega este console.log

    const endOffset = itemOffset + itemsPerPage;
    if (filteredCuidadores && Array.isArray(filteredCuidadores) && filteredCuidadores.length > 0) {
      setCurrentItems(filteredCuidadores.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(filteredCuidadores.length / itemsPerPage));
    } else {
      // En caso de que filteredCuidadores no sea válido, puedes manejarlo aquí
      setCurrentItems([]);
      setPageCount(0);
    }
  }, [itemOffset, itemsPerPage, filteredCuidadores]);
  console.log("currentItems:", currentItems); // Agrega este console.log

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredCuidadores.length;
    setItemOffset(newOffset);
  };
  //   End Pagination

  useEffect(() => {
    dispatch(FILTER_CUIDADORES({ cuidadores, search }));
  }, [cuidadores, search, dispatch]);

  return (
    <div className="cuidador-list">
      <div className="table" id="no-more-tables">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>CUIDADORES</h3>
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
          {!isLoading && cuidadores.length === 0 ? (
            console.log("arranca"),
            <p>-- Porfavor agregar un nuevo cuidador.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Name</th>
                  <th>Telefono</th>
                  <th>Observaciones</th>
                  <th>Paciente</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((cuidador, index) => {
                  const { 
                    _id, 
                    name,
                    telefono,
                    observaciones,
                    paciente, 
                  } = cuidador;
                  return (
                    <tr key={_id}>
                      <td data-title="S/N">{index + 1}</td>
                      <td data-title="Nombre"><b>{shortenText(name, 16)}</b></td>
                      <td data-title="Telefono">{telefono}</td>
                      <td data-title="Observaciones">{observaciones}</td>
                      <td data-title="Paciente">{paciente}</td>
                      <td className="icons">
                        <span>
                          <Link to={`/cuidador-detail/${_id}`}>
                            <AiOutlineEye size={25} color={"purple"} />
                          </Link>
                        </span>
                        <span>
                          <Link to={`/edit-cuidador/${_id}`}>
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

export default CuidadorList;