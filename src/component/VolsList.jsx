import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVols, volSelected } from "../redux/slicers";

const VolsList = () => {
  const { vols, status, error } = useSelector((state) => state.vols);
  const dispatch = useDispatch();
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [filteredVols, setFilteredVols] = useState(vols);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchVols());
    }
  }, [status, dispatch]);

const Rechercher = () => {
    const startDate = new Date(dateDebut);
    const endDate = new Date(dateFin);
    const filtered = vols.filter((vol) => {
        const volDateParts = vol.date.split('-');
        if (volDateParts.length === 3) {
            const validDate = new Date(`${volDateParts[1]}-${volDateParts[0]}-${volDateParts[2]}`);
            return (!dateDebut || validDate >= startDate) && (!dateFin || validDate <= endDate);
        }
        console.warn(`Invalid date format for vol: ${vol.date}`);
        return false;
    });

    setFilteredVols(filtered);
};

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex-[3] print:hidden">
      <h1 className="text-4xl uppercase bg-blue-200 px-10 py-5 rounded-md text-center font-semibold text-orange-500">
        Liste des Vols
      </h1>
      <div className="filter flex gap-5 mt-5 items-end">
        <div className="flex flex-col flex-1">
          <label
            htmlFor="dateDebut"
            className="mb-2 text-sm font-medium text-gray-700"
          >
            Date de début
          </label>
          <input
            type="date"
            name="dateDebut"
            id="dateDebut"
            value={dateDebut}
            onChange={(e) => setDateDebut(e.target.value)}
            className="px-4 py-3 rounded-md border border-gray-300 flex-1"
          />
        </div>
        <div className="flex flex-col flex-1">
          <label
            htmlFor="dateFin"
            className="mb-2 text-sm font-medium text-gray-700"
          >
            Date de fin
          </label>
          <input
            type="date"
            name="dateFin"
            id="dateFin"
            value={dateFin}
            onChange={(e) => setDateFin(e.target.value)}
            className="px-4 py-3 rounded-md border border-gray-300 flex-1"
          />
        </div>
        <button
          className="bg-yellow-500 text-white px-4 py-3 rounded-md"
          onClick={Rechercher}
        >
          Rechercher
        </button>
      </div>
      <div className="flex gap-8 flex-wrap justify-start mt-10 flex-none">
        {filteredVols.map((vol) => (
          <div
            className="rounded-md overflow-hidden shadow-md basis-96"
            key={vol.id}
          >
            <img src="image.jpg" alt={vol.depart} className="w-full" />
            <h2 className="text-lg font-semibold text-black bg-slate-200 w-fit px-5 py-3 rounded-md mx-auto my-4">
              {vol.villedepart} {"->"} {vol.villearrivee}
            </h2>
            <p className="text-gray-500 my-3 pl-4">
              <span className="font-semibold capitalize">Prix:</span> {vol.prix}{" "}
              DH
            </p>
            <p className="text-gray-500 my-3 pl-4">
              <span className="font-semibold capitalize">Date:</span> {vol.date}
            </p>
            <button
              className="bg-yellow-500 text-white px-4 py-3 rounded-md mx-auto block my-4"
              onClick={() => dispatch(volSelected(vol))}
            >
              Réserver
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VolsList;
