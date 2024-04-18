import { Link } from "react-router-dom"

const Nav = (props) => {
    console.log(props.isLoggedIn)

    //user is logged in - show them only the logout
    const loggedInLink = (
        <div>
            <button id="logout-btn" onClick={props.handleLogout}>Logout</button>
        </div>
    )
    // user is NOT logged in - show them signup/login nav links
    const noAuthLinks = (
        <div>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
        </div>
    )

    return (
        <nav className="navbar">
            <div>
                <Link to="/">Home</Link>
            </div>
            <div>
                {props.isLoggedIn ? loggedInLink : noAuthLinks}
            </div>
        </nav>
    )
}

export default Nav