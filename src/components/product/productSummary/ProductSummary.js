import React, { useEffect } from "react";
import "./ProductSummary.scss";
import {  BsPeopleFill, BsHospitalFill  } from "react-icons/bs";
import { BiCategory, BiPlusMedical } from "react-icons/bi";
import InfoBox from "../../infobox/InfoBox";
import { useDispatch, useSelector,} from "react-redux";
import {
  CALC_CATEGORY,

  selectCategory,

} from "../../../redux/features/product/productSlice";
import {
  CALC_CATEGORY2,
} from "../../../redux/features/cuidadores/cuidadorSlice";
import {
  CALC_CATEGORY3,
} from "../../../redux/features/enfermero/enfermeroSlice";

// Icons
const earningIcon = <BsHospitalFill size={40} color="#fff" />;
const productIcon = <BsPeopleFill size={40} color="#fff" />;
const categoryIcon = <BiCategory size={40} color="#fff" />;
const outOfStockIcon = <BiPlusMedical size={40} color="#fff" />;

// Format Amount
export const formatNumbers = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const ProductSummary = ({ products, cuidadores, enfermeros }) => {
  const dispatch = useDispatch();
  const category = useSelector(selectCategory);

  useEffect(() => {
    dispatch(CALC_CATEGORY(products));
  }, [dispatch, products]);

  useEffect(() => {
    // Verificar si 'products' es un arreglo válido antes de llamar a CALC_CATEGORY2
    if (Array.isArray(cuidadores)) {
      dispatch(CALC_CATEGORY2(cuidadores));
    } else {
      console.error("El argumento de CALC_CATEGORY2 no es un arreglo válido.");
    }
  }, [dispatch, cuidadores]);

  useEffect(() => {
    // Verificar si 'products' es un arreglo válido antes de llamar a CALC_CATEGORY2
    if (Array.isArray(enfermeros)) {
      dispatch(CALC_CATEGORY3(enfermeros));
    } else {
      console.error("El argumento de CALC_CATEGORY2 no es un arreglo válido.");
    }
  }, [dispatch, enfermeros]);

  return (
    <div className="product-summary">
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
          count={enfermeros ? enfermeros.length : 0}
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

export default ProductSummary;