import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Card, Avatar} from 'antd';
import {Navbar, Container} from 'react-bootstrap';

const {Meta} = Card;

class Stats extends React.Component {

    state = {users: []};

    componentDidMount() {
        axios.get('/api/stats')
            .then(res => this.setState({users: res.data}))
            .catch(err => console.log(err));
    }

    render() {
        const {users} = this.state;

        return <React.Fragment>
            <Navbar collapseOnSelect fixed="top">
                <Container>
                    <Navbar.Toggle/>
                </Container>
            </Navbar>
            <div className="row">
                {users.map(user => {
                    return <div className="col-md-4">
                        <Card className="m-2" style={{border: '1px solid', boxShadow: '5px'}}>
                            <Meta avatar={<Avatar src={user.avatar}>{user.name.charAt(0)}</Avatar>}
                                  title={user.name}
                                  description={user.occupation}/>
                            <React.Fragment>
                                {/*<div>This is a chart</div>*/}
                                <div className="float-right text-right">
                                    <strong>{user.impressions}</strong><br/><span
                                    className="text-muted">impressions</span><br/>
                                    <strong>{user.conversions}</strong><br/><span
                                    className="text-muted">conversions</span><br/>
                                    <strong>${user.revenue}</strong><br/><span className="text-muted">revenue</span>
                                </div>
                            </React.Fragment>
                        </Card>
                    </div>
                })}
            </div>
        </React.Fragment>
    }
}

export default Stats;

if (document.getElementById('root')) {
    ReactDOM.render(<Stats/>, document.getElementById('root'));
}
