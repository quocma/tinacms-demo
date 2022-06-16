import Tina from '../../.tina/components/TinaDynamicProvider.js'
import 'assets/css/react-slick.css';
import 'rc-drawer/assets/index.css';

const App = ({ Component, pageProps }) => {
  return (
    <Tina>
      <Component {...pageProps} />
    </Tina>
  )
}

export default App
