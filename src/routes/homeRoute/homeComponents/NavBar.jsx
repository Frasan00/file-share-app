const NavBar = ({userName, handleLogOut}) =>{
    return (
        <nav class="navbar bg-primary" data-bs-theme="light">
            <div class="container-fluid">
                <a class="navbar-brand">Welcome {userName} <button class="btn btn-danger" onClick={() => handleLogOut()}>Log Out</button></a>
                <form class="d-flex" role="search">
                <input class="form-control me-2" type="search" placeholder="Search file..." aria-label="Search"/>
                <button type="button" class="btn btn-outline-success btn-lg">Search</button>
                </form>
            </div>
        </nav>
    );
};

export default NavBar;