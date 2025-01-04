import React, { useState } from "react";
import { useSelector } from "react-redux";

const VolReservation = () => {
  const { selectedVol } = useSelector((state) => state.vols);
  const services = [
    { name: "Repas", price: 200 },
    { name: "Bagages supplémentaires", price: 500 },
    { name: "Siège premium", price: 1000 },
    { name: "Wifi-à-bord", price: 150 },
  ];
  const [selectedServices, setSelectedServices] = useState({});
  const [total, setTotal] = useState(selectedVol?.prix || 0);

  const addService = (service) => {
    setSelectedServices((prev) => {
      const newServices = { ...prev };
      if (newServices[service.name]) {
        newServices[service.name] = {
          ...newServices[service.name],
          count: newServices[service.name].count + 1,
        };
      } else {
        newServices[service.name] = { ...service, count: 1 };
      }
      return newServices;
    });
    setTotal((prevTotal) => prevTotal + service.price);
  };

  return (
    <div className="border border-gray-200 py-10 rounded-sm  px-4 flex-1">
      {selectedVol ? (
        <>
          <h1 className="text-2xl font-semibold text-orange-500">
            Réservation Details{" "}
          </h1>
          <p className="text-gray-500 my-3 pl-4">
            <span className="font-semibold capitalize">Depart :</span>{" "}
            {selectedVol.villedepart}{" "}
          </p>
          <p className="text-gray-500 my-3 pl-4">
            <span className="font-semibold capitalize">Arrivee :</span>{" "}
            {selectedVol.villearrivee}{" "}
          </p>
          <p className="text-gray-500 my-3 pl-4">
            <span className="font-semibold capitalize">Date Depart :</span>{" "}
            {selectedVol.date}{" "}
          </p>
          <p className="text-gray-500 my-3 pl-4">
            <span className="font-semibold capitalize">Prix :</span>{" "}
            {selectedVol.prix}
            {" DH"}
          </p>
          <h2 className="text-2xl font-semibold font-mono text-orange-500 print:hidden">
            Services Disponible :{" "}
          </h2>
          <ul className="flex flex-col gap-2 print:hidden">
            {services.map((service, index) => (
              <li className="flex justify-between" key={index}>
                {service.name} - {service.price} DH
                <button
                  className="bg-orange-500 text-white px-2 py-1 rounded-md ml-2"
                  onClick={() => addService(service)}
                >
                  Ajouter
                </button>
              </li>
            ))}
          </ul>
          {Object.keys(selectedServices).length !== 0 && (
            <h2 className="text-2xl font-semibold font-mono text-orange-500 ">
              Services selectioner :{" "}
            </h2>
          )}

          <ul>
            {Object.entries(selectedServices).map(([name, service], index) => (
              <li key={index}>
                {name} x {service.count} - {service.price * service.count} DH
              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-semibold font-mono text-orange-500">
            Total : {total ? total + selectedVol.prix : selectedVol.prix} DH{" "}
          </h2>
          <h2></h2>
          <button
            className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 print:hidden"
            onClick={() => window.print()}
          >
            Effectuer Réservation
          </button>
          <p className="text-gray-500 my-3 pl-4 hidden print:block text-end mt-4 italic capitalize pr-4-">
            Merci Pour la reservation et bon voyage
          </p>
        </>
      ): <h1 className="text-2xl font-semibold text-orange-500">Selectionner un vol pour reserver</h1>}
    </div>
  );
};

export default VolReservation;
