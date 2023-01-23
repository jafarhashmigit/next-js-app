import style from"./navbar.module.css"
import Link from 'next/link';
function Navbar() {
    return (
        <>
            <nav className={`navbar navbar-expand-lg navbar-light ${style.site_navbar} mb-3`}>
                <div className="container">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link href="/" className="ml-2">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item active" >
                                    <Link href="/post" className="ml-2">
                                        Post
                                    </Link>
                            </li>
                            {/* <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Category
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="/category/react">React</a>
                                    <a className="dropdown-item" href="/category/js">JavaScript</a>
                                    <a className="dropdown-item" href="/category/node">Node</a>
                                    <a className="dropdown-item" href="/category/ts">TypeScript</a>

                                </div>
                            </li> */}
                        </ul>
                        <form className="form-inline my-2 my-lg-0" method="POST" action="{{ route('search.custom') }}">
                            
                            <input className="form-control mr-sm-2" type="text" name="search" placeholder="Search"
                                aria-label="Search" />
                            <button className="btn my-2 my-sm-0" type="submit">
                                <i className="fa fa-search" aria-hidden="true"></i>
                            </button>
                        </form>
                        {/* <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Other Sites
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="https://picelixir.com/">Free Picture For Website</a>
                                    <a className="dropdown-item" href="https://seoauditsystem.com/">Check Website SEO</a>
                                </div>
                            </li>
                        </ul> */}

                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;