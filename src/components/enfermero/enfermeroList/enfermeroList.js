import React, { useEffect, useState } from "react";
import { SpinnerImg } from "../../loader/Loader";
import "../enfermeroList/enfermeroList.scss"
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import Search from "../../search/Search";
import { useDispatch, useSelector } from "react-redux";

import {
    FILTER_ENFERMEROS,
    selectFilteredEnfermeros,
} from "../../../redux/features/enfermero/filterSlice3"
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
    deleteEnfermero,
    getEnfermeros,
} from "../../../redux/features/enfermero/enfermeroSlice"
import { Link } from "react-router-dom";

const EnfermeroList = ({ enfermeros, isLoading }) => {
  const [search, setSearch] = useState("");
  const filteredEnfermeros = useSelector(selectFilteredEnfermeros);

  const dispatch = useDispatch();

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  console.log("enfermeros:", enfermeros); // Agrega este console.log

  const delEnfermero = async (id) => {
    console.log(id);
    await dispatch(deleteEnfermero(id));
    await dispatch(getEnfermeros());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Eliminar",
      message: "Estas seguro que desea eliminar?",
      buttons: [
        {
          label: "Eliminar",
          onClick: () => delEnfermero(id),
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
    console.log("filteredEnfermeros:", filteredEnfermeros); // Agrega este console.log

    const endOffset = itemOffset + itemsPerPage;
    if (filteredEnfermeros && Array.isArray(filteredEnfermeros) && filteredEnfermeros.length > 0) {
      setCurrentItems(filteredEnfermeros.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(filteredEnfermeros.length / itemsPerPage));
    } else {
      // En caso de que filteredCuidadores no sea válido, puedes manejarlo aquí
      setCurrentItems([]);
      setPageCount(0);
    }
  }, [itemOffset, itemsPerPage, filteredEnfermeros]);
  console.log("currentItems:", currentItems); // Agrega este console.log

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredEnfermeros.length;
    setItemOffset(newOffset);
  };
  //   End Pagination

  useEffect(() => {
    dispatch(FILTER_ENFERMEROS({ enfermeros, search }));
  }, [enfermeros, search, dispatch]);

  return (
    <div className="enfermero-list">
      <div className="table" id="no-more-tables">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>ENFERMEROS</h3>
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
          {!isLoading && enfermeros.length === 0 ? (
            console.log("arranca"),
            <p>-- Porfavor agregar un nuevo enfermero.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Name</th>
                  <th>Telefono</th>
                  <th>Paciente</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((enfermero, index) => {
                  const { 
                    _id, 
                    name,
                    telefono,
                    paciente, 
                  } = enfermero;
                  return (
                    <tr key={_id}>
                      <td data-title="S/N">{index + 1}</td>
                      <td data-title="Nombre"><b>{shortenText(name, 16)}</b></td>
                      <td data-title="Telefono">{telefono}</td>
                      <td data-title="Paciente">{paciente}</td>
                      <td className="icons">
                        <span>
                          <Link to={`/enfermero-detail/${_id}`}>
                            <AiOutlineEye size={25} color={"purple"} />
                          </Link>
                        </span>
                        <span>
                          <Link to={`/edit-enfermero/${_id}`}>
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

export default EnfermeroList;