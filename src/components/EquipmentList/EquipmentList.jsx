import Image from 'react-bootstrap/Image';

export default function EquipmentList({ equipmentList }) {
  return (
    <div className="col-12 text-center mx-2">
      <div className="row d-flex align-items-end justify-content-around">
        <h2 className="text-center">Equipment Needed</h2>
        {equipmentList.map((equipment, i) => {
          return (
            <div className="col-auto text-center" key={i}>
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
