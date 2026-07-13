import ListedHomeCard from "./ListedHomeCard";
import "./CitySection.css";

function CitySection() {
  return (
    <section className="city-section">

      <h2 className="city-title"> Popular homes in city</h2>

      <div className="city-card-container">
           <ListedHomeCard></ListedHomeCard>
           <ListedHomeCard></ListedHomeCard>
           <ListedHomeCard></ListedHomeCard>
           <ListedHomeCard></ListedHomeCard>
           <ListedHomeCard></ListedHomeCard>
           <ListedHomeCard></ListedHomeCard>
      </div>

    </section>
  );
}

export default CitySection;