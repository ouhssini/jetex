import { useSelector } from "react-redux";
import VolReservation from "./component/VolReservation";
import VolsList from "./component/VolsList";
import Loading from "./component/Loading";

const App = () => {
  const {status} = useSelector(state => state.vols)
  if(status === "loading") return <Loading />
  return (
    <div className="w-[90%]  my-8 mx-auto flex flex-col gap-10">
      <header className="">
        <h1 className="logo text-orange-500 text-6xl font-black uppercase">
          Jetex
        </h1>
        <h2 className="text-orange-400 text-2xl font-semibold -m-1 capitalize">
          Jetex Private Jet experience
        </h2>
      </header>
     <main className="flex  gap-10">
     <VolsList />
     <VolReservation />
     </main>
    </div>
  );
};

export default App;
