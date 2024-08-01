export default function NavBar() {
    return(
        <nav className="navbar">
            <div className="navbar-left">
                <a href="/" className="navbar-brand">tcgdex</a>
            </div>
            <div className="navbar-center">
                <form className="navbar-search">
                    <input type="text" placeholder="Search..." />
                    <button type="submit">Search</button>
                </form>
            </div>
            <div className="navbar-right">
                <ul className="navbar-links">
                    <li>
                        <a href="/about">About</a>
                    </li>
                    <li>
                        <a href="/create-account">Create Account</a>
                    </li>
                    <li>
                        <a href="/sign-in">Sign In</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};