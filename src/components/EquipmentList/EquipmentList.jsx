import React, { useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useEffect } from 'react';
import Image from 'react-bootstrap/Image';

export default function EquipmentList({ equipmentList }) {
  console.log(equipmentList, '<--equipmentList');
  return (
    <div className="col-12 text-center mx-2">
      <div className="row d-flex align-items-end justify-content-around">
        <h2 className="text-center">Equipment Needed</h2>
        {equipmentList.map((equipment, index) => {
          return (
            <div className="col-auto text-center" key={index}>
              <Image
                fluid
                src={`https://spoonacular.com/cdn/equipment_100x100/${equipment.image}`}
                alt=""
              />
              <br />
              {equipment.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}
