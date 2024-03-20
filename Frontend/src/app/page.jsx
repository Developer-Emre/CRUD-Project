
import Navbar from "./components/Navbar";
import Calendar from "./components/Calendar"



export default function Home() {
  return (
<div>
  <Navbar />
  <div className="container mx-auto flex justify-center">
     <div className="calendar bg-white p-5">
      <Calendar />
    </div>
  </div>
</div>
  );
}
