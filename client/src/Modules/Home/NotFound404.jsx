import Topbar from "./Topbar"
import Footer from "./Footer"
import "../HojaDeEstilos/NotFound404.css"

const NotFound404 = () => {
    return (
        <div class="scrollable-page">
            <Topbar/>
            <div class="not-found-404-container">
                <p class="not-found-404-text not-found-header">404</p>
                <p class="not-found-404-text">
                    Lo sentimos, la página que está buscando no existe
                </p>
            </div>
            <Footer/>
        </div>
    )
}

export default NotFound404