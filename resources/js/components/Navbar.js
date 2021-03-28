export default function Navbar() {
    return <section className="nav-section clearfix">
        <a className="fa fa-lg fa-bars float-left" style={{color: 'white'}}>
            <span className="ml-5">User Dashboard</span>
        </a>
        <input className="float-right" placeholder="Search"/>
    </section>
};