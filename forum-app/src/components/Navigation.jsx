import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Navigation() {
    return (
        <div className="navbar">
            <h1>Aplikasi Note</h1>
            <ul>
                <li className="dropdown">
                    <Link className="dropdown-title">
                        <div>Nama</div>
                        <div className="material-symbols-outlined">expand_more</div>
                    </Link>
                    <div className="dropdown-content">
                        <Link to={"/"}>Home</Link>
                        <button>Logout</button>
                    </div>
                </li>
            </ul>
        </div>
    )
}

Navigation.propTypes = {
    logout: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
}

export default Navigation;