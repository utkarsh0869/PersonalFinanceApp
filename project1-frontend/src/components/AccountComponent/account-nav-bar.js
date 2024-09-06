export default function AccountNavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Finance App</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                    <a className="nav-link" href="#">Accounts Home</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="#">Credit</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="#">Debit</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="#">Loan</a>
                    </li>
                </ul>
            </div>             
        </nav>
    );
}