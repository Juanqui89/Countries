import axios from "axios";
import { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

interface Country {
  altSpellings: string;
  borders: string;
  capital: string;
  car: {
    side: string;
  };
  coatOfArms: {
    png: string;
    svg: string;
  };
  continents: string;
  currencies: { [code: string]: { name: string; symbol: string } };
  demonyms: string;
  flags: { svg: string };
  independent: boolean;
  landLocked: string;
  maps: [];
  name: {
    common: string;
    official: string;
  };
  population: number;
  region: string;
  startOfWeek: string;
  status: string;
  subregion: string;
  timezones: [];
  languages: string;
}

const App = () => {
  const apiKey = "https://restcountries.com/v3.1/all";

  const [countries, setCountries] = useState<Country[]>([]);

  const fetchCountry = async () => {
    try {
      const resp = await axios.get(`${apiKey}`);
      const result: Country[] = resp.data;
      setCountries(result);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCountry();
  }, []);

  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1 className="title">Countries</h1>
            <section className="cards-grid">
              {countries.map((items) => (
                <Card key={items.name.common}>
                  <Card.Body>
                    <Card.Title> Country: {items.name.common}</Card.Title>
                    <Card.Subtitle>
                      Capital:{" "}
                      {Array.isArray(items.capital)
                        ? items.capital.join(", ")
                        : items.capital}
                    </Card.Subtitle>
                    <Card.Text>
                      <p>Continents: {items.continents}</p>
                      <p>Independent: {items.independent ? "Yes" : "No"}</p>
                      <p>LandLocked: {items.landLocked ? "Yes" : "No"}</p>
                      <p>Populations: {items.population}</p>
                      <p>
                        Currencies:{" "}
                        {items.currencies
                          ? Object.values(items.currencies)
                              .map(
                                (currency) =>
                                  `${currency.name} (${currency.symbol})`
                              )
                              .join(", ")
                          : "N/A"}
                      </p>
                      <p>Region: {items.region}</p>
                      <p>Subregion: {items.subregion}</p>
                      {items.flags && (
                        <article className="flags">
                          <h3>Flags:</h3>
                          <br />
                          <img src={items.flags.svg} alt="Flag" />
                        </article>
                      )}
                      <br />
                      {items.coatOfArms && (
                        <article>
                          <h3>Coat of Arms:</h3>
                          <img src={items.coatOfArms.svg} alt="Coat of Arms" />
                        </article>
                      )}
                      <br />
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </section>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default App;
