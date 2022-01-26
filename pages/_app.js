import "../styles/globals.css";
import Layout from "../components/layout/Layout";
//Este archivo es especial ya que sirve como el archivo en el cual se renderiza todas las páginas. Por lo que si queremos que todas las páginas tengan un wrapper, en lugar de a cada una envolverla en un wrapper, solamente se utiliza el wrapper en esta página y así todas lo tendrán.

function MyApp({ Component, pageProps }) {
  return (
    <Layout /*Este es el wrapper */>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
