import Topbar from "./Topbar"
import Footer from "./Footer"
import "../HojaDeEstilos/NotFound404.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLock } from "@fortawesome/free-solid-svg-icons"

const Forbidden = () => {
    return (
        <div class="scrollable-page">
            <Topbar/>
            <div class="not-found-404-container">
                <div class='forbidden-icon-header-container'>
                    <FontAwesomeIcon icon={faLock} class="forbidden-page-element" />
                    <p class="not-found-404-text not-found-header forbidden-page-element">403</p>
                </div>
                <p class="not-found-404-text">
                    Lo sentimos, pero usted no tiene los permisos suficientes para acceder esa página o recurso.
                </p>
            </div>
            <Footer/>
        </div>
    )
}

export default Forbidden