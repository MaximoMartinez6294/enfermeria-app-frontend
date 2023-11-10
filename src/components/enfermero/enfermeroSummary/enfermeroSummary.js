import React, { useEffect } from "react";
import "../../../components/enfermero/enfermeroSummary/enfermeroSummary.scss";
import {  BsPeopleFill, BsHospitalFill  } from "react-icons/bs";
import { BiCategory, BiPlusMedical } from "react-icons/bi";
import InfoBox from "../../infobox/InfoBox";
import { useDispatch, useSelector,} from "react-redux";
import {
    selectCategory3,
    CALC_CATEGORY3
  
  } from "../../../redux/features/enfermero/enfermeroSlice";
  import {
    CALC_CATEGORY2
  
  } from "../../../redux/features/cuidadores/cuidadorSlice";
  import {
    CALC_CATEGORY,
  
  } from "../../../redux/features/product/productSlice";




// Icons
const earningIcon = <BsHospitalFill size={40} color="#fff" />;
const productIcon = <BsPeopleFill size={40} color="#fff" />;
const categoryIcon = <BiCategory size={40} color="#fff" />;
const outOfStockIcon = <BiPlusMedical size={40} color="#fff" />;

// Format Amount
export const formatNumbers = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const EnfermeroSummary = ({cuidadores,enfermeros, products}) => {
  const dispatch = useDispatch();
  const category = useSelector(selectCategory3);

  useEffect(() => {

    dispatch(CALC_CATEGORY2(cuidadores));
  }, [dispatch, cuidadores]);

  useEffect(() => {
    // Verificar si 'products' es un arreglo válido antes de llamar a CALC_CATEGORY2
    if (Array.isArray(enfermeros)) {
      dispatch(CALC_CATEGORY3(enfermeros));
    } else {
      console.error("El argumento de CALC_CATEGORY2 no es un arreglo válido.");
    }
  }, [dispatch, enfermeros]);

  useEffect(() => {
    dispatch(CALC_CATEGORY(products));
  }, [dispatch, products]);

  return (
    <div className="enfermero-summary">
      <h3 className="--mt2">GENERAL</h3>
      <div className="info-summary">
        <InfoBox
          icon={productIcon}
          title={"Pacientes"}
          count={products.length}
          bgColor="card1"
        />
        <InfoBox
          icon={earningIcon}
          title={"Enfermeros"}
          count={enfermeros.length}
          bgColor="card2"
        />
        <InfoBox
          icon={outOfStockIcon}
          title={"Cuidadores"}
          count={cuidadores ? cuidadores.length : 0}
          bgColor="card3"
        />
        <InfoBox
          icon={categoryIcon}
          title={"Todas"}
          count={category.length}
          bgColor="card4"
        />
      </div>
    </div>
  );
};

export default EnfermeroSummary;